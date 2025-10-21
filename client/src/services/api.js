import axios from 'axios';

// Cria uma instância do Axios com configurações pré-definidas
const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  withCredentials: true,
});

/**
 * Função para procurar músicas através do nosso back-end.
 * @param {string} query O termo de busca para a música.
 * @returns {Promise<Array>} Uma promessa que resolve para um array de músicas.
 */
export const searchTracks = async (query) => {
  const response = await api.get('/spotify/search', {
    params: {
      q: query,
    },
  });
  return response.data;
};

// Esta linha é a exportação padrão
export default api;

