// ... imports (Mantenha os imports existentes)
import express from 'express';
import session from 'express-session';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import crypto from 'crypto';
import { ControllerFactory } from './factories/ControllerFactory';
import { UserController } from './controllers/UserController';
import { AdminController } from './controllers/AdminController';
import { ReviewController } from './controllers/ReviewController';
import { SpotifyService } from './services/SpotifyService';

const app = express();
// O Render fornece a porta na variável PORT. Se não, usa 3000.
const PORT = Number(process.env.PORT) || 3000;

// Controllers
let userController: UserController;
let adminController: AdminController;
let reviewController: ReviewController;

// Instanciar serviços
const spotifyService = new SpotifyService();

// ... (Configurações de Middleware: CORS, RateLimit, Helmet, JSON, Session - Mantenha igual)
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? process.env.ALLOWED_ORIGINS?.split(',') || false
    : true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 5 });
app.use(limiter);
app.use('/api/v1/auth/login', authLimiter);
app.use('/api/v1/admin/login', authLimiter);

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  hsts: { maxAge: 31536000, includeSubDomains: true, preload: true }
}));

app.use(express.json());

if (!process.env.SESSION_SECRET) {
  if (process.env.NODE_ENV === 'production') console.warn('⚠️ AVISO: SESSION_SECRET não definida.');
}

app.use(session({
  secret: process.env.SESSION_SECRET || 'fallback-secret-dev-only',
  resave: false,
  saveUninitialized: false,
  proxy: true,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: 24 * 60 * 60 * 1000
  }
}));

const requireAuth = (req: any, res: any, next: any) => {
  if (!req.session.userId) return res.status(401).json({ error: 'Autenticação necessária' });
  next();
};

const requireAdminAuth = (req: any, res: any, next: any) => {
  if (!req.session.adminId) return res.status(401).json({ error: 'Autenticação de admin necessária' });
  next();
};

async function startServer() {
  try {
    await ControllerFactory.initializeDatabase();
    console.log('Banco de dados inicializado');
    userController = ControllerFactory.createUserController();
    adminController = ControllerFactory.createAdminController();
    reviewController = ControllerFactory.createReviewController();
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Servidor executando na porta ${PORT}`);
    });
  } catch (error: any) {
    console.error('Falha ao inicializar:', error);
    process.exit(1);
  }
}
startServer();

// ... (Rotas de Auth - register, login, logout, me - Mantenha igual)
app.post('/api/v1/auth/register', async (req: any, res: any) => {
  const { username, password } = req.body;
  const result = await userController.registerUser(username, password);
  if (result.success) res.status(201).json({ message: 'Registado com sucesso' });
  else res.status(400).json({ error: result.message });
});

app.post('/api/v1/auth/login', async (req: any, res: any) => {
  const { username, password } = req.body;
  const result = await userController.authenticateUser(username, password);
  if (result.success) {
    req.session.userId = result.userId;
    res.json({ message: 'Login com sucesso', sessionId: req.session.id });
  } else res.status(401).json({ error: result.message });
});

app.post('/api/v1/auth/logout', (req: any, res: any) => {
  req.session.destroy(() => { res.clearCookie('connect.sid'); res.json({ message: 'Logout realizado' }); });
});

app.get('/api/v1/auth/me', requireAuth, async (req: any, res: any) => {
  const user = await userController.getUserById(req.session.userId);
  if (user) res.json({ id: user.id, username: user.username });
  else res.status(404).json({ error: 'Utilizador não encontrado' });
});

// ===========================================
// ROTAS DE UTILIZADORES
// ===========================================

app.get('/api/v1/users/me/reviews', requireAuth, async (req: any, res: any) => {
  const result = await userController.getUserReviews(req.session.userId);
  if (result.success) res.json(result.reviews);
  else res.status(500).json({ error: result.message });
});

// <-- NOVA ROTA DE PESQUISA DE UTILIZADORES -->
app.get('/api/v1/users/search', requireAuth, async (req: any, res: any) => {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ error: 'Termo de pesquisa obrigatório.' });
  }
  
  const result = await userController.searchUsers(q as string);
  
  if (result.success) {
    res.json(result.users);
  } else {
    res.status(500).json({ error: result.message });
  }
});

app.get('/api/v1/users/:username/reviews', requireAuth, async (req: any, res: any) => {
  const { username } = req.params;
  const targetUser = await userController.getUserByUsername(username);
  if (!targetUser) return res.status(404).json({ error: 'Utilizador não encontrado.' });
  const result = await userController.getUserReviews(targetUser.id);
  if (result.success) {
    res.json({ user: { id: targetUser.id, username: targetUser.username }, reviews: result.reviews });
  } else res.status(500).json({ error: result.message });
});

// ... (Rotas de Reviews, Spotify e Admin - Mantenha igual)
// (Para poupar espaço, assumo que o resto do ficheiro se mantém igual ao anterior, 
// apenas adicionei a rota /users/search acima)

// Rotas de Reviews
app.get('/api/v1/reviews/:trackId', requireAuth, async (req: any, res: any) => {
  const result = await reviewController.getReviewForTrack(req.session.userId, req.params.trackId);
  if (result.success) res.json(result.review); else res.status(500).json({ error: result.message });
});
app.post('/api/v1/reviews', requireAuth, async (req: any, res: any) => {
  const result = await reviewController.createReview(req.session.userId, req.body.trackId, Number(req.body.rating));
  if (result.success) res.status(201).json(result); else res.status(400).json({ error: result.message });
});
app.put('/api/v1/reviews/:reviewId', requireAuth, async (req: any, res: any) => {
  const result = await reviewController.updateReview(Number(req.params.reviewId), req.session.userId, Number(req.body.rating));
  if (result.success) res.json({ message: 'Atualizado' }); else res.status(400).json({ error: result.message });
});
app.delete('/api/v1/reviews/:reviewId', requireAuth, async (req: any, res: any) => {
  const result = await reviewController.deleteReview(Number(req.params.reviewId), req.session.userId);
  if (result.success) res.json({ message: 'Apagado' }); else res.status(400).json({ error: result.message });
});

// Rotas Spotify
app.get('/api/v1/spotify/search', requireAuth, async (req: any, res: any) => {
    try { const results = await spotifyService.searchTracks(req.query.q as string); res.json(results); } 
    catch (err) { res.status(500).json({ error: 'Erro Spotify' }); }
});
app.get('/api/v1/spotify/tracks/:id', requireAuth, async (req: any, res: any) => {
    try { const details = await spotifyService.getTrackDetails(req.params.id); res.json(details); }
    catch (err) { res.status(500).json({ error: 'Erro Spotify' }); }
});

// Rotas Admin (Login, Logout, CRUD Users) - Mantenha igual
app.post('/api/v1/admin/login', async (req: any, res: any) => {
  const result = await adminController.authenticateAdmin(req.body.username, req.body.password);
  if(result.success) { req.session.adminId = result.adminId; res.json({message: 'Login OK'}); } else res.status(401).json({error: result.message});
});
app.post('/api/v1/admin/logout', (req: any, res: any) => {
  req.session.destroy((err: any) => {
    if (err) {
      return res.status(500).json({ error: 'Não foi possível fazer logout' });
    }
    res.clearCookie('connect.sid');
    res.json({ message: 'Logout de administrador realizado com sucesso' });
  });
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