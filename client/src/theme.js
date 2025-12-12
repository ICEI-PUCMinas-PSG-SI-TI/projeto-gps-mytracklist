 
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark', // Tema escuro
    primary: {
      main: '#1DB954', // Um verde inspirado no Spotify (temporario ate definir a cor oficial do app)
    },
    background: {
      default: '#121212',
      paper: '#242424',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

export default theme;