import React, { useState, useEffect } from 'react';
import { useSearchParams, Link as RouterLink } from 'react-router-dom';
import { searchTracks } from '../services/spotify';
import { 
  Container, 
  Typography, 
  Box, 
  List, 
  ListItemAvatar, 
  Avatar, 
  ListItemText, 
  CircularProgress,
  Alert,
  ListItemButton
} from '@mui/material';
import SearchBar from '../components/SearchBar';
import { useNavigate } from 'react-router-dom';

function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
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

  const handleSearch = (newQuery) => {
    navigate(`/search?q=${encodeURIComponent(newQuery)}`);
  };

  return (
    <Container>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2, mb: 4 }}>
        <SearchBar onSearch={handleSearch} />
      </Box>

      {query && (
        <Typography variant="h4" gutterBottom>
          Resultados para: "{query}"
        </Typography>
      )}

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {error && <Alert severity="error">{error}</Alert>}

      {!loading && !error && tracks.length === 0 && query && (
        <Typography>Nenhuma música encontrada.</Typography>
      )}

      {!loading && !error && tracks.length > 0 && (
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {tracks.map((track) => (
            <ListItemButton 
              key={track.id} 
              component={RouterLink} 
              to={`/music/${track.id}`}
            >
              <ListItemAvatar>
                <Avatar variant="square" src={track.imageUrl} alt={track.name} sx={{ width: 56, height: 56, mr: 2 }} />
              </ListItemAvatar>
              <ListItemText
                primary={track.name}
                secondary={track.artist}
              />
            </ListItemButton>
          ))}
        </List>
      )}
    </Container>
  );
}

export default SearchResultsPage;

