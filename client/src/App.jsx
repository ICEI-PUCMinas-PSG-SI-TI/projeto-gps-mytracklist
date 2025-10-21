import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Container, Box, Button, Typography, CircularProgress } from '@mui/material';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import SearchResultsPage from './pages/SearchResultsPage'; // 1. Importa a nova página
import { useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const { isAuthenticated, user, logout, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container>
      <Box sx={{ mb: 4, borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1 }}>
        <nav>
          <Button component={Link} to="/" sx={{ mr: 2 }}>
            Início
          </Button>
        </nav>
        <Box>
          {isAuthenticated ? (
            <>
              <Typography component="span" sx={{ mr: 2 }}>
                Olá, {user.username}!
              </Typography>
              <Button variant="outlined" onClick={handleLogout}>
                Sair
              </Button>
            </>
          ) : (
            <>
              <Button component={Link} to="/login" sx={{ mr: 2 }}>
                Login
              </Button>
              <Button component={Link} to="/register" variant="contained">
                Registar
              </Button>
            </>
          )}
        </Box>
      </Box>

      <Routes>
        <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* 2. Adiciona a nova rota para a busca, também protegida */}
        <Route path="/search" element={<ProtectedRoute><SearchResultsPage /></ProtectedRoute>} />
      </Routes>
    </Container>
  );
}

export default App;

