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
  const adminController = ControllerFactory.createAdminController(db);

  // Middleware de autenticação para administradores
  const requireAdminAuth = (req: any, res: any, next: any) => {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token || token !== 'admin-token') {
      return res.status(401).json({ error: 'Autenticação de administrador necessária' });
    }
    req.adminId = 1; // Simular admin ID
    next();
  };

  // Rotas de teste
  app.post('/api/v1/admin/login', async (req: any, res: any) => {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Nome de administrador e senha são obrigatórios' });
    }

    const result = await adminController.authenticateAdmin(username, password);
    if (result.success) {
      res.json({ message: 'Login de administrador realizado com sucesso', token: 'admin-token' });
    } else {
      res.status(401).json({ error: result.message });
    }
  });

  app.get('/api/v1/admin/users', requireAdminAuth, async (req: any, res: any) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const result = await adminController.listUsers(page, limit);
    if (result.success) {
      res.json(result);
    } else {
      res.status(500).json({ error: result.message });
    }
  });

  app.put('/api/v1/admin/users/:id/password', requireAdminAuth, async (req: any, res: any) => {
    const { id } = req.params;
    const { password } = req.body;

    if (!password || password.length < 6) {
      return res.status(400).json({ error: 'Senha deve ter pelo menos 6 caracteres' });
    }

    const result = await adminController.updateUserPassword(parseInt(id), password, req.session.adminId);
    if (result.success) {
      res.json({ message: 'Senha do usuário atualizada com sucesso' });
    } else {
      res.status(400).json({ error: result.message });
    }
  });

  app.put('/api/v1/admin/users/:id/username', requireAdminAuth, async (req: any, res: any) => {
    const { id } = req.params;
    const { username } = req.body;

    if (!username || username.length < 3) {
      return res.status(400).json({ error: 'Nome de usuário deve ter pelo menos 3 caracteres' });
    }

    const result = await adminController.updateUsername(parseInt(id), username, req.session.adminId);
    if (result.success) {
      res.json({ message: 'Nome de usuário atualizado com sucesso' });
    } else {
      res.status(400).json({ error: result.message });
    }
  });

  app.delete('/api/v1/admin/users/:id', requireAdminAuth, async (req: any, res: any) => {
    const { id } = req.params;

    const result = await adminController.deleteUser(parseInt(id), req.session.adminId);
    if (result.success) {
      res.json({ message: 'Usuário deletado com sucesso' });
    } else {
      res.status(400).json({ error: result.message });
    }
  });

  app.get('/api/v1/admin/users/hashes', requireAdminAuth, async (req: any, res: any) => {
    const result = await adminController.getUserHashes(req.session.adminId);
    if (result.success) {
      res.json(result);
    } else {
      res.status(500).json({ error: result.message });
    }
  });

  return { app, db };
};

describe('Admin API', () => {
  let app: express.Application;
  let db: any;

  beforeAll(async () => {
    const { app: testApp, db: testDb } = await createTestApp();
    app = testApp;
    db = testDb;

  });

  beforeEach(async () => {
    // Registrar admin para cada teste
    const adminController = ControllerFactory.createAdminController(db);
    await adminController.registerAdmin('admintest', 'AdminPass123!');
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

  describe('POST /api/v1/admin/login', () => {
    it('deve rejeitar dados inválidos', async () => {
      const response = await request(app)
        .post('/api/v1/admin/login')
        .send({ username: '', password: '' })
        .expect(400);
      expect(response.body.error).toBe('Nome de administrador e senha são obrigatórios');
    });

    it('deve rejeitar credenciais inválidas', async () => {
      const response = await request(app)
        .post('/api/v1/admin/login')
        .send({ username: 'nonexistent', password: 'WrongPass456!' })
        .expect(401);
      expect(response.body.error).toContain('Nome de administrador ou senha inválidos');
    });

    it('deve fazer login com sucesso', async () => {
      const response = await request(app)
        .post('/api/v1/admin/login')
        .send({ username: 'admintest', password: 'AdminPass123!' })
        .expect(200);
      expect(response.body.message).toBe('Login de administrador realizado com sucesso');
    });
  });

  describe('GET /api/v1/admin/users', () => {
    it('deve rejeitar acesso sem autenticação', async () => {
      const response = await request(app)
        .get('/api/v1/admin/users')
        .expect(401);
      expect(response.body.error).toBe('Autenticação de administrador necessária');
    });

    it('deve permitir acesso com autenticação', async () => {
      const loginResponse = await request(app)
        .post('/api/v1/admin/login')
        .send({ username: 'admintest', password: 'AdminPass123!' })
        .expect(200);

      const token = loginResponse.body.token;

      const response = await request(app)
        .get('/api/v1/admin/users')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
      expect(response.body).toHaveProperty('users');
    });
  });
});
