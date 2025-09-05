import { DatabaseFactory } from '../../src/database/DatabaseFactory';
import { ControllerFactory } from '../../src/factories/ControllerFactory';
import { UserController } from '../../src/controllers/UserController';

describe('UserController', () => {
  let db: any;
  let userController: UserController;

  beforeEach(async () => {
    // For parallel execution, each test gets its own memory DB instance
    db = DatabaseFactory.create({ type: 'memory' });
    await db.connect();
    await ControllerFactory.initializeDatabase(db);
    userController = ControllerFactory.createUserController(db);
  });

  afterEach(async () => {
    if (db) {
      await db.disconnect();
    }
  });

  describe('registerUser', () => {
    test('deve registrar usuário com sucesso', async () => {
      const result = await userController.registerUser('testuser', 'TestPass123!');

      expect(result.success).toBe(true);
    });

    test('deve rejeitar nome de usuário duplicado', async () => {
      // Primeiro registro
      await userController.registerUser('testuser', 'TestPass123!');

      // Segundo registro com mesmo nome
      const result = await userController.registerUser('testuser', 'DifferentPass456!');

      expect(result.success).toBe(false);
      expect(result.message).toBe('Nome de usuário já existe.');
    });
  });

  describe('authenticateUser', () => {
    beforeEach(async () => {
      await userController.registerUser('testuser', 'TestPass123!');
    });

    test('deve autenticar usuário com credenciais corretas', async () => {
      const result = await userController.authenticateUser('testuser', 'TestPass123!');

      expect(result.success).toBe(true);
      expect(result.userId).toBeDefined();
    });

    test('deve rejeitar senha incorreta', async () => {
      const result = await userController.authenticateUser('testuser', 'WrongPass456!');

      expect(result.success).toBe(false);
      expect(result.message).toBe('Nome de usuário ou senha inválidos.');
    });

    test('deve rejeitar usuário inexistente', async () => {
      const result = await userController.authenticateUser('nonexistent', 'TestPass123!');

      expect(result.success).toBe(false);
      expect(result.message).toBe('Nome de usuário ou senha inválidos.');
    });
  });
});