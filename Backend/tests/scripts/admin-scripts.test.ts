import { DatabaseFactory } from '../../src/database/DatabaseFactory';
import { ControllerFactory } from '../../src/factories/ControllerFactory';

describe('Admin Scripts Integration', () => {
  let db: any;

  beforeEach(async () => {
    db = DatabaseFactory.create({ type: 'memory' });
    await db.connect();
    await ControllerFactory.initializeDatabase(db);
  });

  afterEach(async () => {
    if (db) {
      await db.disconnect();
    }
  });

  describe('Scripts functionality through database verification', () => {
    test('deve permitir registro de admin via lógica do script', async () => {
      // Simular o que o script register-admin.js faz
      const adminController = ControllerFactory.createAdminController(db);
      const result = await adminController.registerAdmin('scriptadmin', 'ScriptPass123!');

      expect(result.success).toBe(true);

      // Verificar se admin foi criado (como o script faria)
      const admin = await db.get('SELECT id FROM admins WHERE username = ?', ['scriptadmin']);
      expect(admin).toBeDefined();
    });

    test('deve permitir listagem de usuários via lógica do script', async () => {
      // Criar usuários como o script faria
      const userController = ControllerFactory.createUserController(db);
      await userController.registerUser('scriptuser1', 'Pass123!');
      await userController.registerUser('scriptuser2', 'Pass123!');

      // Simular listagem como o script list-users.js faz
      const users = await db.all('SELECT id, username, created_at FROM users ORDER BY id');

      expect(users).toHaveLength(2);
      expect(users[0].username).toBe('scriptuser1');
      expect(users[1].username).toBe('scriptuser2');
    });

    test('deve permitir gerenciamento de usuários via lógica do script', async () => {
      // Criar usuário
      const userController = ControllerFactory.createUserController(db);
      await userController.registerUser('manageuser', 'OldPass123!');
      const user = await db.get('SELECT id FROM users WHERE username = ?', ['manageuser']);

      // Simular atualização de senha como manage-users.js faz
      const adminController = ControllerFactory.createAdminController(db);
      const result = await adminController.updateUserPassword(user.id, 'NewPass456!', 1);

      expect(result.success).toBe(true);

      // Verificar se senha foi atualizada
      const authResult = await userController.authenticateUser('manageuser', 'NewPass456!');
      expect(authResult.success).toBe(true);
    });

    test('deve permitir visualização de hashes via lógica do script', async () => {
      // Criar usuários
      const userController = ControllerFactory.createUserController(db);
      await userController.registerUser('hashuser1', 'Pass123!');
      await userController.registerUser('hashuser2', 'Pass123!');

      // Simular visualização de hashes como show-hashes.js faz
      const adminController = ControllerFactory.createAdminController(db);
      const result = await adminController.getUserHashes(1);

      expect(result.success).toBe(true);
      expect(result.users).toHaveLength(2);
      expect(result.users![0]).toHaveProperty('password_hash');

      // Verificar se log foi criado
      const log = await db.get('SELECT * FROM admin_logs WHERE action = ?', ['VIEW_HASHES']);
      expect(log).toBeDefined();
    });
  });
});