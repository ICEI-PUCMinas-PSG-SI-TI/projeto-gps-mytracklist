import React, { useState, useEffect } from 'react';
import { getMyReviews } from '../services/reviews';
import { useAuth } from '../context/AuthContext';
import {
  Container,
  Typography,
  Box,
  List,
  CircularProgress,
  Alert,
  Paper,
  Divider
} from '@mui/material';
import ReviewItem from '../components/ReviewItem'; // <-- Importar o novo componente

function ProfilePage() {
  const { user } = useAuth();
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
  }, []);

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
              // <-- AQUI: Usamos o mesmo componente inteligente
              <ReviewItem key={review.id} review={review} />
            ))}
          </List>
        )}
      </Paper>
    </Container>
  );
}

export default ProfilePage;