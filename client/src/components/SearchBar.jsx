import React, { useState } from 'react';
import { Box, TextField, Button, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

/**
 * Componente de barra de busca reutilizável.
 * @param {Object} props
 * @param {function(string): void} props.onSearch - Função a ser chamada quando a busca é submetida. Recebe o termo da busca como argumento.
 */
function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSearch = (event) => {
    event.preventDefault();
    if (query.trim()) { // Apenas procura se o texto não estiver vazio
      onSearch(query.trim());
    }
  };

  return (
    <Paper 
      component="form" 
      onSubmit={handleSearch}
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%', maxWidth: 600, mb: 4 }}
    >
      <TextField
        sx={{ ml: 1, flex: 1 }}
        placeholder="Procurar por uma música..."
        inputProps={{ 'aria-label': 'procurar por uma música' }}
        variant="standard"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        InputProps={{
          disableUnderline: true, // Remove a linha por baixo para um visual mais limpo dentro do Paper
        }}
      />
      <Button type="submit" variant="contained" aria-label="search" sx={{ p: '10px' }}>
        <SearchIcon />
      </Button>
    </Paper>
  );
}

export default SearchBar;
