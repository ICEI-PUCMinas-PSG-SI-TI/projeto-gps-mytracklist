import axios from 'axios';

// Define a URL base: usa a variável de ambiente em produção, ou localhost em desenvolvimento
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';

const api = axios.create({
  baseURL: baseURL, // <--- CORREÇÃO: Agora usa a variável, não o texto fixo
  withCredentials: true,
});

export default api;