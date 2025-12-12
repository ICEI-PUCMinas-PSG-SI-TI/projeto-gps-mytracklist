import React, { useState, useEffect } from 'react';
import { getMyReviews } from '../services/reviews';
import { useAuth } from '../context/AuthContext';
import {
  Container,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Alert,
  Paper,
  Divider
} from '@mui/material';
import RatingInput from '../components/RatingInput'; // Reutilizamos para mostrar a nota

function ProfilePage() {
  const { user } = useAuth(); // Obtemos o utilizador logado para exibir o nome
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        setError('');
        const myReviews = await getMyReviews();
        setReviews(myReviews);
      } catch (err) {
        setError('Falha ao carregar as suas avaliações.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []); // Executa apenas uma vez ao montar o componente

  return (
    <Container maxWidth="md">
      <Paper sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Meu Perfil
        </Typography>
        <Typography variant="h6" component="h2" color="text.secondary" gutterBottom>
          {user?.username}
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h5" gutterBottom>
          Minhas Avaliações
        </Typography>

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        )}

        {error && <Alert severity="error">{error}</Alert>}

        {!loading && !error && reviews.length === 0 && (
          <Typography sx={{ mt: 2 }}>Você ainda não avaliou nenhuma música.</Typography>
        )}

        {!loading && !error && reviews.length > 0 && (
          <List sx={{ width: '100%' }}>
            {reviews.map((review) => (
              <ListItem key={review.id} divider>
                <ListItemText
                  primary={`ID da Música: ${review.trackId}`}
                  // Poderíamos adicionar um link para /music/:trackId aqui
                  secondary={
                    <RatingInput value={review.rating} readOnly={true} />
                  }
                />
              </ListItem>
            ))}
          </List>
        )}
      </Paper>
    </Container>
  );
}

export default ProfilePage;
