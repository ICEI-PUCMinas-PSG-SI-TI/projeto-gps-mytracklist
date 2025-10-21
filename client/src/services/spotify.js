import api from './api';

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

/**
 * Função para obter os detalhes de uma única música.
 * @param {string} trackId O ID da música no Spotify.
 * @returns {Promise<Object>} Uma promessa que resolve para um objeto com os detalhes da música.
 */
export const getTrackDetails = async (trackId) => {
  const response = await api.get(`/spotify/tracks/${trackId}`);
  return response.data;
};
