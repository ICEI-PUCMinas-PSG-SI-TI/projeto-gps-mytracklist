import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ThemeProvider } from '@mui/material/styles'; // ThemeProvider: Disponibiliza o tema para todos os componentes filhos.
import CssBaseline from '@mui/material/CssBaseline'; // CssBaseline: Reseta o CSS padrão do navegador para garantir consistência.
import theme from './theme';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)