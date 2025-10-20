import axios from 'axios';

// Cria uma instância do Axios com configurações pré-definidas
const api = axios.create({
  // URL base de todas as requisições para a nossa API
  baseURL: 'http://localhost:3000/api/v1',
  
  // MUITO IMPORTANTE: Esta opção permite que o Axios envie os cookies
  // recebidos do back-end (como o cookie de sessão) em cada requisição.
  // Sem isto, a autenticação baseada em sessão não funciona.
  withCredentials: true,
});

export default api;