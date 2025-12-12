import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Alert, // Importe o componente de Alerta
} from '@mui/material';
// 1. Importe o nosso serviço de API que criámos
import api from '../services/api';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // 2. Crie estados para gerir o feedback ao utilizador
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // 3. Transforme a função handleSubmit em assíncrona
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    // Validação simples no front-end
    if (!username || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    try {
      // 4. Use o nosso serviço 'api' para fazer um pedido POST
      const response = await api.post('/auth/register', {
        username: username,
        password: password,
      });

      // 5. Se o pedido for bem-sucedido, mostre uma mensagem de sucesso
      setSuccess(response.data.message || 'Conta criada com sucesso! Pode fazer o login.');
      // Limpa o formulário
      setUsername('');
      setPassword('');

    } catch (err) {
      // 6. Se ocorrer um erro, capture-o e mostre a mensagem de erro da API
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError('Ocorreu um erro inesperado. Tente novamente.');
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper
        elevation={6}
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 4,
        }}
      >
        <Typography component="h1" variant="h5">
          Criar Conta
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          {/* 7. Adicione os Alertas para mostrar o feedback */}
          {error && <Alert severity="error" sx={{ width: '100%', mb: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ width: '100%', mb: 2 }}>{success}</Alert>}

          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Nome de Utilizador"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Palavra-passe"
            type="password"
            id="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Registar
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default RegisterPage;