import { DatabaseFactory } from '../../src/database/DatabaseFactory';
import { ControllerFactory } from '../../src/factories/ControllerFactory';
import { AdminController } from '../../src/controllers/AdminController';

describe('AdminController', () => {
  let db: any;
  let adminController: AdminController;

  beforeEach(async () => {
    db = DatabaseFactory.create();
    await db.connect();
    await ControllerFactory.initializeDatabase(db);
    adminController = ControllerFactory.createAdminController(db);
  });

  afterEach(async () => {
    if (db && typeof db.clearAll === 'function') {
      await db.clearAll();
    }
  });

  afterAll(async () => {
    if (db) {
      await db.disconnect();
    }
  });

  describe('registerAdmin', () => {
    it('deve registrar administrador com sucesso', async () => {
      const result = await adminController.registerAdmin('adminuser', 'AdminPass123!');

      expect(result.success).toBe(true);
    });

    it('deve rejeitar nome de administrador duplicado', async () => {
      // Primeiro registro
      await adminController.registerAdmin('adminuser', 'AdminPass123!');

      // Segundo registro com mesmo nome
      const result = await adminController.registerAdmin('adminuser', 'DifferentPass456!');

      expect(result.success).toBe(false);
      expect(result.message).toBeDefined();
    });
  });

  describe('authenticateAdmin', () => {
    beforeEach(async () => {
      await adminController.registerAdmin('adminuser', 'AdminPass123!');
    });

    it('deve autenticar administrador com credenciais corretas', async () => {
      const result = await adminController.authenticateAdmin('adminuser', 'AdminPass123!');

      expect(result.success).toBe(true);
      expect(result.adminId).toBeDefined();
    });

    it('deve rejeitar senha incorreta', async () => {
      const result = await adminController.authenticateAdmin('adminuser', 'WrongPass456!');

      expect(result.success).toBe(false);
      expect(result.message).toContain('Nome de administrador ou senha inválidos');
    });

    it('deve rejeitar administrador inexistente', async () => {
      const result = await adminController.authenticateAdmin('nonexistent', 'AdminPass123!');

      expect(result.success).toBe(false);
      expect(result.message).toContain('Nome de administrador ou senha inválidos');
    });
  });

  describe('listUsers', () => {
    beforeEach(async () => {
      // Criar alguns usuários para testar listagem
      const userController = ControllerFactory.createUserController(db);
      await userController.registerUser('user1', 'Pass123!');
      await userController.registerUser('user2', 'Pass123!');
      await userController.registerUser('user3', 'Pass123!');
    });

    it('deve listar usuários com paginação padrão', async () => {
      const result = await adminController.listUsers();

      expect(result.success).toBe(true);
      expect(result.users).toHaveLength(3);
      expect(result.total).toBe(3);
      expect(result.page).toBe(1);
      expect(result.limit).toBe(10);
    });

    it('deve listar usuários com paginação customizada', async () => {
      const result = await adminController.listUsers(1, 2);

      expect(result.success).toBe(true);
      expect(result.users).toHaveLength(2);
      expect(result.total).toBe(3);
      expect(result.page).toBe(1);
      expect(result.limit).toBe(2);
    });

    it('deve listar usuários na página 2', async () => {
      const result = await adminController.listUsers(2, 2);

      expect(result.success).toBe(true);
      expect(result.users).toHaveLength(1);
      expect(result.total).toBe(3);
      expect(result.page).toBe(2);
      expect(result.limit).toBe(2);
    });
  });

  describe('updateUserPassword', () => {
    let userId: number;
    let adminId: number;

    beforeEach(async () => {
      // Criar usuário e admin para teste
      const userController = ControllerFactory.createUserController(db);
      await userController.registerUser('testuser', 'OldPass123!');

      // Buscar ID do usuário criado
      const user = await db.get('SELECT id FROM users WHERE username = ?', ['testuser']);
      userId = user.id;

      await adminController.registerAdmin('adminuser', 'AdminPass123!');
      adminId = 1; // Admin ID será 1
    });

    it('deve atualizar senha do usuário com sucesso', async () => {
      const result = await adminController.updateUserPassword(userId, 'NewPass456!', adminId);

      expect(result.success).toBe(true);

      // Verificar se a nova senha funciona
      const userController = ControllerFactory.createUserController(db);
      const authResult = await userController.authenticateUser('testuser', 'NewPass456!');
      expect(authResult.success).toBe(true);
    });

    it('deve aceitar atualização mesmo para usuário inexistente (comportamento atual)', async () => {
      const result = await adminController.updateUserPassword(999, 'NewPass456!', adminId);

      expect(result.success).toBe(true);
    });
  });

  describe('updateUsername', () => {
    let userId: number;
    let adminId: number;

    beforeEach(async () => {
      // Criar usuário e admin para teste
      const userController = ControllerFactory.createUserController(db);
      await userController.registerUser('testuser', 'Pass123!');

      // Buscar ID do usuário criado
      const user = await db.get('SELECT id FROM users WHERE username = ?', ['testuser']);
      userId = user.id;

      await adminController.registerAdmin('adminuser', 'AdminPass123!');
      adminId = 1; // Admin ID será 1
    });

    it('deve atualizar nome de usuário com sucesso', async () => {
      const result = await adminController.updateUsername(userId, 'newusername', adminId);

      expect(result.success).toBe(true);

      // Verificar se o novo nome funciona
      const userController = ControllerFactory.createUserController(db);
      const authResult = await userController.authenticateUser('newusername', 'Pass123!');
      expect(authResult.success).toBe(true);
    });

    it('deve rejeitar nome de usuário duplicado', async () => {
      // Criar outro usuário
      const userController = ControllerFactory.createUserController(db);
      await userController.registerUser('otheruser', 'Pass123!');

      // Tentar alterar para nome já existente
      const result = await adminController.updateUsername(userId, 'otheruser', adminId);

      expect(result.success).toBe(false);
      expect(result.message).toBeDefined();
    });

    it('deve aceitar atualização mesmo para usuário inexistente (comportamento atual)', async () => {
      const result = await adminController.updateUsername(999, 'newusername', adminId);

      expect(result.success).toBe(true);
    });
  });

  describe('deleteUser', () => {
    let userId: number;
    let adminId: number;

    beforeEach(async () => {
      // Criar usuário e admin para teste
      const userController = ControllerFactory.createUserController(db);
      await userController.registerUser('testuser', 'Pass123!');

      // Buscar ID do usuário criado
      const user = await db.get('SELECT id FROM users WHERE username = ?', ['testuser']);
      userId = user.id;

      await adminController.registerAdmin('adminuser', 'AdminPass123!');
      adminId = 1; // Admin ID será 1
    });

    it('deve deletar usuário com sucesso', async () => {
      const result = await adminController.deleteUser(userId, adminId);

      expect(result.success).toBe(true);

      // Verificar se usuário foi realmente deletado
      const userController = ControllerFactory.createUserController(db);
      const authResult = await userController.authenticateUser('testuser', 'Pass123!');
      expect(authResult.success).toBe(false);
    });

    it('deve rejeitar exclusão de usuário inexistente', async () => {
      const result = await adminController.deleteUser(999, adminId);

      expect(result.success).toBe(false);
      expect(result.message).toBe('Usuário não encontrado.');
    });
  });

  describe('getUserHashes', () => {
    let adminId: number;

    beforeEach(async () => {
      // Criar alguns usuários para teste
      const userController = ControllerFactory.createUserController(db);
      await userController.registerUser('user1', 'Pass123!');
      await userController.registerUser('user2', 'Pass456!');

      await adminController.registerAdmin('adminuser', 'AdminPass123!');
      adminId = 1; // Admin ID será 1
    });

    it('deve retornar hashes de todos os usuários', async () => {
      const result = await adminController.getUserHashes(adminId);

      expect(result.success).toBe(true);
      expect(result.users).toBeDefined();
      expect(result.users!).toHaveLength(2);
      expect(result.users![0]).toHaveProperty('id');
      expect(result.users![0]).toHaveProperty('username');
      expect(result.users![0]).toHaveProperty('password_hash');
      expect(result.users![0].password_hash).toBeDefined();
    });

    it('deve registrar log de auditoria ao visualizar hashes', async () => {
      await adminController.getUserHashes(adminId);

      // Verificar se log foi criado
      const log = await db.get('SELECT * FROM admin_logs WHERE admin_id = ? AND action = ?', [adminId, 'VIEW_HASHES']);
      expect(log).toBeDefined();
      expect(log.details).toBe('Hashes de senha visualizadas');
    });
  });
});