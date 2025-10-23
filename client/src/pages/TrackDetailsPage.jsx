import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getTrackDetails } from '../services/spotify';
import { getUserReviewForTrack, saveReview } from '../services/reviews'; // 1. Importe os novos serviços
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Paper,
  Grid,
  Snackbar // 2. Importe o Snackbar para feedback
} from '@mui/material';
import RatingInput from '../components/RatingInput';

function TrackDetailsPage() {
  const { id: trackId } = useParams(); // Renomeado para clareza
  const [track, setTrack] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Estados para a avaliação
  const [currentReview, setCurrentReview] = useState(null); // Guarda o objeto da avaliação (com id)
  const [isSubmitting, setIsSubmitting] = useState(false); // Para feedback visual

  // Estado para o Snackbar de feedback
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');


  // Efeito para buscar detalhes da música E a avaliação existente
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError('');
        // Busca os detalhes da música e a avaliação em paralelo
        const [details, review] = await Promise.all([
          getTrackDetails(trackId),
          getUserReviewForTrack(trackId)
        ]);
        setTrack(details);
        setCurrentReview(review); // Guarda a avaliação existente (pode ser null)
      } catch (err) {
        setError('Falha ao carregar os dados da música ou avaliação.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [trackId]); // Refaz a busca se o ID no URL mudar

  // Função chamada quando o utilizador clica nas estrelas
  const handleRatingChange = async (newRating) => {
    setIsSubmitting(true);
    try {
      const existingReviewId = currentReview ? currentReview.id : null;
      const response = await saveReview(trackId, newRating, existingReviewId);

      // Atualiza o estado local da avaliação após sucesso da API
      setCurrentReview({
        ...currentReview, // Mantém outros dados se houver
        id: existingReviewId || response.reviewId, // Usa o ID existente ou o novo
        rating: newRating,
        trackId: trackId // Garante que temos o trackId
      });

      setSnackbarMessage('Avaliação salva com sucesso!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);

    } catch (err) {
      console.error('Falha ao salvar avaliação:', err);
      let errorMessage = 'Falha ao salvar avaliação. Tente novamente.';
      if (err.response && err.response.data && err.response.data.error) {
        errorMessage = err.response.data.error;
      }
      setSnackbarMessage(errorMessage);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };


  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}><CircularProgress /></Box>;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (!track) {
    return <Typography>Música não encontrada.</Typography>;
  }

  // Obtém a nota do estado 'currentReview' ou define como null se não houver
  const displayRating = currentReview ? currentReview.rating : null;

  return (
    <Container>
      <Paper sx={{ p: 4, mt: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box
              component="img"
              sx={{ width: '100%', height: 'auto', borderRadius: 2 }}
              alt={track.name}
              src={track.imageUrl}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h3" component="h1" gutterBottom>{track.name}</Typography>
            <Typography variant="h5" component="h2" color="text.secondary" gutterBottom>{track.artist}</Typography>
            <Typography variant="body1" color="text.secondary">Álbum: {track.album}</Typography>

            {/* Componente de Avaliação */}
            <RatingInput
              value={displayRating}
              onChange={handleRatingChange}
              readOnly={isSubmitting} // Desativa enquanto envia
            />
             {isSubmitting && <CircularProgress size={24} sx={{ ml: 2 }} />}

            {/* Adicionar mais detalhes aqui no futuro */}
          </Grid>
        </Grid>
      </Paper>

      {/* Snackbar para feedback */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default TrackDetailsPage;

