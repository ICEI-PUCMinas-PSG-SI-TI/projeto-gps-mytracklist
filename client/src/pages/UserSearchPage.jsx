import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { searchUsers } from '../services/userService';
import {
  Container,
  Typography,
  Box,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Paper,
  InputAdornment,
  CircularProgress
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';

function UserSearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  // Função chamada ao escrever (podemos adicionar debounce no futuro)
  const handleSearch = async (event) => {
    const query = event.target.value;
    setSearchTerm(query);

    if (query.length < 2) {
      setResults([]);
      setSearched(false);
      return;
    }

    setLoading(true);
    try {
      const users = await searchUsers(query);
      setResults(users);
      setSearched(true);
    } catch (error) {
      console.error("Erro na pesquisa:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Paper sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Encontrar Pessoas
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Pesquise por nome de utilizador para ver os seus perfis e avaliações.
        </Typography>

        <Box sx={{ mb: 4 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Digite o nome de utilizador..."
            value={searchTerm}
            onChange={handleSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        )}

        {!loading && searched && results.length === 0 && (
          <Typography align="center" color="text.secondary">
            Nenhum utilizador encontrado com "{searchTerm}".
          </Typography>
        )}

        <List>
          {results.map((user) => (
            <ListItem 
              key={user.id} 
              button 
              component={Link} 
              to={`/user/${user.username}`}
              divider
            >
              <ListItemAvatar>
                <Avatar>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText 
                primary={user.username} 
                secondary={`Membro desde ${new Date(user.created_at).toLocaleDateString()}`}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
}

export default UserSearchPage;