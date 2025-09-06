import request from 'supertest';
import express from 'express';
import { DatabaseFactory } from '../../src/database/DatabaseFactory';
import { ControllerFactory } from '../../src/factories/ControllerFactory';

// Criar app de teste
const createTestApp = async () => {
  const app = express();
  app.use(express.json());

  // Simular sessão para testes
  app.use((req: any, _res, next) => {
    req.session = {};
    next();
  });

  // Inicializar banco de dados para testes
  const db = DatabaseFactory.create({ type: 'memory' });
  await db.connect();
  await ControllerFactory.initializeDatabase(db);

  // Instâncias dos controllers
  const userController = ControllerFactory.createUserController(db);

  // Rotas de teste
  app.post('/api/v1/auth/register', async (req: any, res: any) => {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Nome de usuário e senha são obrigatórios' });
    }

    if (username.length < 3 || password.length < 6) {
      return res.status(400).json({ error: 'Nome de usuário deve ter pelo menos 3 caracteres e senha pelo menos 6 caracteres' });
    }

    const result = await userController.registerUser(username, password);
    if (result.success) {
      res.status(201).json({ message: 'Usuário registrado com sucesso' });
    } else {
      res.status(400).json({ error: result.message });
    }
  });

  app.post('/api/v1/auth/login', async (req: any, res: any) => {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Nome de usuário e senha são obrigatórios' });
    }

    const result = await userController.authenticateUser(username, password);
    if (result.success) {
      req.session.userId = result.userId;
      res.json({ message: 'Login realizado com sucesso' });
    } else {
      res.status(401).json({ error: result.message });
    }
  });

  return { app, db };
};

describe('Auth API', () => {
  let app: express.Application;
  let db: any;

  beforeAll(async () => {
    const { app: testApp, db: testDb } = await createTestApp();
    app = testApp;
    db = testDb;
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

  describe('POST /api/v1/auth/register', () => {
    it('deve registrar usuário com sucesso', async () => {
      const response = await request(app)
        .post('/api/v1/auth/register')
        .send({ username: 'testuser', password: 'TestPass123!' })
        .expect(201);
      expect(response.body.message).toBe('Usuário registrado com sucesso');
    });

    it('deve rejeitar dados inválidos', async () => {
      const response = await request(app)
        .post('/api/v1/auth/register')
        .send({ username: 'ab', password: '123' })
        .expect(400);
      expect(response.body.error).toContain('caracteres');
    });

    it('deve rejeitar nome de usuário duplicado', async () => {
      // Primeiro registro
      await request(app)
        .post('/api/v1/auth/register')
        .send({ username: 'testuser', password: 'TestPass123!' });

      // Segundo registro
      const response = await request(app)
        .post('/api/v1/auth/register')
        .send({ username: 'testuser', password: 'DifferentPass456!' })
        .expect(400);
      expect(response.body.error).toContain('Nome de usuário já existe');
    });
  });

  describe('POST /api/v1/auth/login', () => {
    beforeEach(async () => {
      await request(app)
        .post('/api/v1/auth/register')
        .send({ username: 'testuser', password: 'TestPass123!' });
    });

    it('deve fazer login com credenciais corretas', async () => {
      const response = await request(app)
        .post('/api/v1/auth/login')
        .send({ username: 'testuser', password: 'TestPass123!' })
        .expect(200);
      expect(response.body.message).toBe('Login realizado com sucesso');
    });

    it('deve rejeitar credenciais inválidas', async () => {
      const response = await request(app)
        .post('/api/v1/auth/login')
        .send({ username: 'testuser', password: 'WrongPass456!' })
        .expect(401);
      expect(response.body.error).toContain('Nome de usuário ou senha inválidos');
    });
  });
});
