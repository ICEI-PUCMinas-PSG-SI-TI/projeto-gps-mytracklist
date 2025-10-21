import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchTracks } from '../services/api';
import { 
  Container, 
  Typography, 
  Box, 
  List, 
  ListItem, 
  ListItemAvatar, 
  Avatar, 
  ListItemText, 
  CircularProgress,
  Alert
} from '@mui/material';

function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q'); // Lê o parâmetro 'q' do URL

  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Esta função é chamada sempre que a página carrega ou o 'query' muda
    const fetchTracks = async () => {
      if (!query) {
        setTracks([]);
        return;
      }

      setLoading(true);
      setError('');
      try {
        const results = await searchTracks(query);
        setTracks(results);
      } catch (err) {
        setError('Falha ao procurar pelas músicas. Tente novamente.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTracks();
  }, [query]); // A dependência [query] garante que a busca é refeita se o URL mudar

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Resultados para: "{query}"
      </Typography>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {error && <Alert severity="error">{error}</Alert>}

      {!loading && !error && tracks.length === 0 && (
        <Typography>Nenhuma música encontrada.</Typography>
      )}

      {!loading && !error && tracks.length > 0 && (
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {tracks.map((track) => (
            <ListItem key={track.id} alignItems="flex-start">
              <ListItemAvatar>
                <Avatar variant="square" src={track.imageUrl} alt={track.name} sx={{ width: 56, height: 56, mr: 2 }} />
              </ListItemAvatar>
              <ListItemText
                primary={track.name}
                secondary={track.artist}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
}

export default SearchResultsPage;
