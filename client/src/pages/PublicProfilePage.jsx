import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getUserReviewsByUsername } from '../services/reviews';
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
  Divider,
  Button
} from '@mui/material';
import RatingInput from '../components/RatingInput';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function PublicProfilePage() {
  const { username } = useParams(); // Obtém o nome da URL
  const [profileData, setProfileData] = useState(null); // Guarda { user, reviews }
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await getUserReviewsByUsername(username);
        setProfileData(data);
      } catch (err) {
        console.error(err);
        if (err.response && err.response.status === 404) {
             setError('Utilizador não encontrado.');
        } else {
             setError('Falha ao carregar o perfil.');
        }
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchProfile();
    }
  }, [username]);

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}><CircularProgress /></Box>;
  }

  if (error) {
    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Alert severity="error">{error}</Alert>
            <Button component={Link} to="/" startIcon={<ArrowBackIcon />} sx={{ mt: 2 }}>
                Voltar ao Início
            </Button>
        </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Button component={Link} to="/" startIcon={<ArrowBackIcon />} sx={{ mt: 2, mb: 2 }}>
        Voltar
      </Button>
      
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Perfil de {profileData?.user.username}
        </Typography>
        
        <Divider sx={{ my: 3 }} />

        <Typography variant="h5" gutterBottom>
          Avaliações Recentes
        </Typography>

        {profileData?.reviews.length === 0 ? (
          <Typography sx={{ mt: 2, fontStyle: 'italic', color: 'text.secondary' }}>
            Este utilizador ainda não avaliou nenhuma música.
          </Typography>
        ) : (
          <List sx={{ width: '100%' }}>
            {profileData?.reviews.map((review) => (
              <ListItem key={review.id} divider>
                <ListItemText
                  primary={
                    <Link to={`/music/${review.trackId}`} style={{ textDecoration: 'none', color: 'inherit', fontWeight: 'bold' }}>
                        Música ID: {review.trackId}
                    </Link>
                  }
                  secondary={
                    <Box sx={{ mt: 1 }}>
                        <RatingInput value={review.rating} readOnly={true} />
                        <Typography variant="caption" display="block" color="text.secondary">
                            Avaliado em: {new Date(review.createdAt).toLocaleDateString()}
                        </Typography>
                    </Box>
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

export default PublicProfilePage;