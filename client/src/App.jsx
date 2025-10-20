import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Container, Box, Button, Typography, CircularProgress } from '@mui/material';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { useAuth } from './context/AuthContext';

function App() {
  const { isAuthenticated, user, logout, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  // Enquanto o contexto verifica a sessão, mostramos um indicador de carregamento
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
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Container>
  );
}

export default App;
