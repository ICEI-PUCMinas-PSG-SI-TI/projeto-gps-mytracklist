import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Box } from '@mui/material';
import SearchBar from '../components/SearchBar';

function HomePage() {
  const navigate = useNavigate();

  const handleSearch = (query) => {
    // Navega para a página de resultados, passando a busca como um parâmetro de URL
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Bem-vindo ao MyTrackList
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
        Procure e avalie as suas músicas favoritas.
      </Typography>
      <SearchBar onSearch={handleSearch} />
    </Box>
  );
}

export default HomePage;