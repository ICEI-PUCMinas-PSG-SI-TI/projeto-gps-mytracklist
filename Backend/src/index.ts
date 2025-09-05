const express = require('express');
const session = require('express-session');
const { ControllerFactory } = require('./factories/ControllerFactory');

const app = express();
const PORT = process.env.PORT || 3000;

// Instâncias dos controllers
const userController = ControllerFactory.createUserController();
const adminController = ControllerFactory.createAdminController();

// Configuração do middleware
app.use(express.json());

// Configuração da sessão
app.use(session({ // TODO: temos que lembrar de redefinir o abaixo em produção!
  secret: process.env.SESSION_SECRET || 'sua-chave-secreta-altere-em-producao',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // TODO: lembrar de definir como true em produção com HTTPS!
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 horas
  }
}));

// Middleware de autenticação
const requireAuth = (req: any, res: any, next: any) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Autenticação necessária' });
  }
  next();
};

// Middleware de autenticação para administradores
const requireAdminAuth = (req: any, res: any, next: any) => {
  if (!req.session.adminId) {
    return res.status(401).json({ error: 'Autenticação de administrador necessária' });
  }
  next();
};

// Inicializa o banco de dados
ControllerFactory.initializeDatabase().then(() => {
  console.log('Banco de dados inicializado');
}).catch((error: any) => {
  console.error('Falha ao inicializar banco de dados:', error);
});

// Rotas da API
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

app.post('/api/v1/auth/logout', (req: any, res: any) => {
  req.session.destroy((err: any) => {
    if (err) {
      return res.status(500).json({ error: 'Não foi possível fazer logout' });
    }
    res.clearCookie('connect.sid');
    res.json({ message: 'Logout realizado com sucesso' });
  });
});

// Login de administrador
app.post('/api/v1/admin/login', async (req: any, res: any) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Nome de administrador e senha são obrigatórios' });
  }

  const result = await adminController.authenticateAdmin(username, password);
  if (result.success) {
    req.session.adminId = result.adminId;
    res.json({ message: 'Login de administrador realizado com sucesso' });
  } else {
    res.status(401).json({ error: result.message });
  }
});

// Logout de administrador
app.post('/api/v1/admin/logout', (req: any, res: any) => {
  req.session.destroy((err: any) => {
    if (err) {
      return res.status(500).json({ error: 'Não foi possível fazer logout' });
    }
    res.clearCookie('connect.sid');
    res.json({ message: 'Logout de administrador realizado com sucesso' });
  });
});

// Exemplo de rota protegida
app.get('/api/v1/user/profile', requireAuth, (req: any, res: any) => {
  res.json({ message: 'Bem-vindo ao seu perfil!', userId: req.session.userId });
});

// Endpoints administrativos
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

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor executando na porta ${PORT}`);
});
