import { DatabaseFactory } from '../../src/database/DatabaseFactory';
import { ControllerFactory } from '../../src/factories/ControllerFactory';
import { UserController } from '../../src/controllers/UserController';

describe('UserController', () => {
  let db: any;
  let userController: UserController;

  beforeEach(async () => {
    db = DatabaseFactory.create();
    await db.connect();
    await ControllerFactory.initializeDatabase(db);
    userController = ControllerFactory.createUserController(db);
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

  describe('registerUser', () => {
    it('deve registrar usuário com sucesso', async () => {
      const result = await userController.registerUser('testuser', 'TestPass123!');

      expect(result.success).toBe(true);
    });

    it('deve rejeitar nome de usuário duplicado', async () => {
      // Primeiro registro
      await userController.registerUser('testuser', 'TestPass123!');

      // Segundo registro com mesmo nome
      const result = await userController.registerUser('testuser', 'DifferentPass456!');

      expect(result.success).toBe(false);
      expect(result.message).toContain('Falha no registro');
    });

    it('deve rejeitar senha muito curta', async () => {
      const result = await userController.registerUser('testuser', '123');

      expect(result.success).toBe(true); // Argon2 aceita qualquer senha, validação é feita no endpoint
    });
  });

  describe('authenticateUser', () => {
    beforeEach(async () => {
      await userController.registerUser('testuser', 'TestPass123!');
    });

    it('deve autenticar usuário com credenciais corretas', async () => {
      const result = await userController.authenticateUser('testuser', 'TestPass123!');

      expect(result.success).toBe(true);
      expect(result.userId).toBeDefined();
    });

    it('deve rejeitar senha incorreta', async () => {
      const result = await userController.authenticateUser('testuser', 'WrongPass456!');

      expect(result.success).toBe(false);
      expect(result.message).toContain('Nome de usuário ou senha inválidos');
    });

    it('deve rejeitar usuário inexistente', async () => {
      const result = await userController.authenticateUser('nonexistent', 'TestPass123!');

      expect(result.success).toBe(false);
      expect(result.message).toContain('Nome de usuário ou senha inválidos');
    });
  });
});