import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getTrackDetails } from '../services/spotify';
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Paper,
  Grid
} from '@mui/material';
import RatingInput from '../components/RatingInput'; // 1. Importe o novo componente

function TrackDetailsPage() {
  const { id } = useParams();
  const [track, setTrack] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 2. Estado para guardar a avaliação (valor inicial nulo)
  const [currentRating, setCurrentRating] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        setError('');
        const details = await getTrackDetails(id);
        setTrack(details);
        // Aqui, numa tarefa futura, vamos buscar a avaliação existente do utilizador
        setCurrentRating(null); // Por agora, começa sempre como nulo
      } catch (err) {
        setError('Falha ao carregar os detalhes da música.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  const handleRatingChange = (newValue) => {
    // Numa tarefa futura, isto irá enviar a avaliação para a API
    console.log('Nova avaliação selecionada:', newValue);
    setCurrentRating(newValue);
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

  return (
    <Container>
      <Paper sx={{ p: 4, mt: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box
              component="img"
              sx={{
                width: '100%',
                height: 'auto',
                borderRadius: 2,
              }}
              alt={track.name}
              src={track.imageUrl}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h3" component="h1" gutterBottom>
              {track.name}
            </Typography>
            <Typography variant="h5" component="h2" color="text.secondary" gutterBottom>
              {track.artist}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Álbum: {track.album}
            </Typography>

            {/* 3. Adicione o componente de avaliação */}
            <RatingInput
              value={currentRating}
              onChange={handleRatingChange}
            />

            {/* Adicionar mais detalhes aqui no futuro */}
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default TrackDetailsPage;

