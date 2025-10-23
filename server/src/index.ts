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
const PORT = process.env.PORT || 3000;

// Controllers (serão inicializados após o banco de dados)
let userController: UserController;
let adminController: AdminController;
let reviewController: ReviewController; 

// Instanciar serviços
const spotifyService = new SpotifyService();

// Configuração do CORS
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? process.env.ALLOWED_ORIGINS?.split(',') || false
    : true, // Permite qualquer origem em desenvolvimento
  credentials: true, // Permite cookies/sessões
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Configuração do Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Limite de 100 requisições por janela
  message: {
    error: 'Muitas requisições. Tente novamente em 15 minutos.',
    retryAfter: 15 * 60 * 1000
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limiting mais restritivo para autenticação
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // Limite de 5 tentativas de login por janela
  message: {
    error: 'Muitas tentativas de login. Tente novamente em 15 minutos.',
    retryAfter: 15 * 60 * 1000
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Aplicar rate limiting geral
app.use(limiter);

// Aplicar rate limiting específico para rotas de autenticação
app.use('/api/v1/auth/login', authLimiter);
app.use('/api/v1/admin/login', authLimiter);

// Configuração do Helmet para headers de segurança
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}));

// Configuração do middleware
app.use(express.json());

// Validação obrigatória da chave secreta da sessão
if (!process.env.SESSION_SECRET) {
  console.error('❌ ERRO CRÍTICO: SESSION_SECRET não definida!');
  console.error('Defina a variável de ambiente SESSION_SECRET com uma chave segura.');
  console.error('Exemplo: SESSION_SECRET=uma-chave-muito-segura-aqui');
  process.exit(1);
}

// Configuração da sessão
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production', // HTTPS apenas em produção
    httpOnly: true,
    sameSite: 'strict', // Proteção CSRF
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

// Inicializa o banco de dados e depois inicia o servidor
async function startServer() {
  try {
    await ControllerFactory.initializeDatabase();
    console.log('Banco de dados inicializado');

    // Instâncias dos controllers (após inicialização do banco)
    userController = ControllerFactory.createUserController();
    adminController = ControllerFactory.createAdminController();
    reviewController = ControllerFactory.createReviewController(); 

    // Inicia o servidor
    app.listen(PORT, () => {
      console.log(`Servidor executando na porta ${PORT}`);
    });
  } catch (error: any) {
    console.error('Falha ao inicializar banco de dados:', error);
    process.exit(1);
  }
}

startServer();

// ===========================================
// ROTAS DE AVALIAÇÕES (REVIEWS)
// ===========================================

// Obter a avaliação de um utilizador para uma música específica
app.get('/api/v1/reviews/:trackId', requireAuth, async (req: any, res: any) => {
  const { trackId } = req.params;
  const userId = req.session.userId;

  const result = await reviewController.getReviewForTrack(userId, trackId);
  if (result.success) {
    res.json(result.review); // Retorna a avaliação ou null
  } else {
    res.status(500).json({ error: result.message });
  }
});

// Criar uma nova avaliação
app.post('/api/v1/reviews', requireAuth, async (req: any, res: any) => {
  const { trackId, rating } = req.body;
  const userId = req.session.userId;

  if (!trackId || rating === undefined) {
    return res.status(400).json({ error: 'trackId e rating são obrigatórios.' });
  }

  const result = await reviewController.createReview(userId, trackId, Number(rating));
  if (result.success) {
    res.status(201).json({ message: 'Avaliação criada com sucesso.', reviewId: result.reviewId });
  } else {
    res.status(400).json({ error: result.message });
  }
});

// Atualizar uma avaliação existente
app.put('/api/v1/reviews/:reviewId', requireAuth, async (req: any, res: any) => {
  const { reviewId } = req.params;
  const { rating } = req.body;
  const userId = req.session.userId;

  if (rating === undefined) {
    return res.status(400).json({ error: 'O campo rating é obrigatório.' });
  }

  const result = await reviewController.updateReview(Number(reviewId), userId, Number(rating));
  if (result.success) {
    res.json({ message: 'Avaliação atualizada com sucesso.' });
  } else {
    res.status(400).json({ error: result.message });
  }
});

// Apagar uma avaliação
app.delete('/api/v1/reviews/:reviewId', requireAuth, async (req: any, res: any) => {
  const { reviewId } = req.params;
  const userId = req.session.userId;

  const result = await reviewController.deleteReview(Number(reviewId), userId);
  if (result.success) {
    res.json({ message: 'Avaliação apagada com sucesso.' });
  } else {
    res.status(400).json({ error: result.message });
  }
});
// ===========================================
// FIM DAS ROTAS DE AVALIAÇÕES
// ===========================================


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
    const sessionId = crypto.randomUUID();
    req.session.sessionId = sessionId;
    req.session.userId = result.userId;
    res.json({ message: 'Login realizado com sucesso', sessionId });
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

// Rota para verificar a sessão atual do utilizador
app.get('/api/v1/auth/me', requireAuth, async (req: any, res: any) => {
  // A função requireAuth já garante que temos um req.session.userId
  // Agora, vamos buscar as informações do utilizador para retornar
  try {
    const user = await userController.getUserById(req.session.userId);
    if (user) {
      // Retornamos apenas os dados seguros (sem a hash da palavra-passe)
      res.json({ id: user.id, username: user.username });
    } else {
      res.status(404).json({ error: 'Utilizador não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Login de administrador
app.post('/api/v1/admin/login', async (req: any, res: any) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Nome de administrador e senha são obrigatórios' });
  }

  const result = await adminController.authenticateAdmin(username, password);
  if (result.success) {
    const sessionId = crypto.randomUUID();
    req.session.sessionId = sessionId;
    req.session.adminId = result.adminId;
    res.json({ message: 'Login de administrador realizado com sucesso', sessionId });
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
  res.json({
    message: 'Bem-vindo ao seu perfil!',
    userId: req.session.userId,
    sessionId: req.session.sessionId
  });
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

// Rota temporária para testar a obtenção do token
// http://localhost:3000/api/v1/spotify/test-token
app.get('/api/v1/spotify/test-token', async (req: any, res: any) => {
    try {
        const token = await spotifyService.getAccessToken();
        res.json({ message: 'Token obtido com sucesso!', accessToken: token });
    } catch (error) {
        res.status(500).json({ error: 'Falha ao obter o token do Spotify.' });
    }
});

// rota de teste do token do Spotify
app.get('/api/v1/spotify/search', requireAuth, async (req: any, res: any) => {
  const { q } = req.query; // 'q' vem de "query" (busca)

  if (!q) {
    return res.status(400).json({ error: 'O parâmetro de busca "q" é obrigatório.' });
  }

  try {
    const results = await spotifyService.searchTracks(q as string);
    res.json(results);
  } catch (error) {
    console.error('Erro na rota de busca do Spotify:', error);
    res.status(500).json({ error: 'Erro ao comunicar com o Spotify.' });
  }
});

// nova rota para obter detalhes de uma música específica
app.get('/api/v1/spotify/tracks/:id', requireAuth, async (req: any, res: any) => {
  const { id } = req.params;

  try {
    const trackDetails = await spotifyService.getTrackDetails(id);
    res.json(trackDetails);
  } catch (error) {
    console.error(`Erro na rota de detalhes da música ${id}:`, error);
    res.status(500).json({ error: 'Erro ao obter detalhes da música.' });
  }
});

