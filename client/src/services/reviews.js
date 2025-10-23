import api from './api';

/**
 * Obtém a avaliação de um utilizador para uma música específica.
 * @param {string} trackId O ID da música no Spotify.
 * @returns {Promise<Object | null>} Uma promessa que resolve para o objeto da avaliação ou null.
 */
export const getUserReviewForTrack = async (trackId) => {
  try {
    const response = await api.get(`/reviews/${trackId}`);
    return response.data; // Retorna a avaliação ou null se não houver
  } catch (error) {
    // Se der 404 (não encontrado) ou outro erro, assumimos que não há avaliação
    console.error('Erro ao buscar avaliação existente:', error);
    return null;
  }
};

/**
 * Cria ou atualiza uma avaliação para uma música.
 * @param {string} trackId O ID da música no Spotify.
 * @param {number} rating A nota (0-10).
 * @param {number | null} [existingReviewId=null] O ID da avaliação existente, se houver.
 * @returns {Promise<Object>} A resposta da API.
 */
export const saveReview = async (trackId, rating, existingReviewId = null) => {
  if (existingReviewId) {
    // Atualiza a avaliação existente
    const response = await api.put(`/reviews/${existingReviewId}`, { rating });
    return response.data;
  } else {
    // Cria uma nova avaliação
    const response = await api.post('/reviews', { trackId, rating });
    return response.data;
  }
};

/**
 * Obtém todas as avaliações do utilizador autenticado.
 * @returns {Promise<Array>} Uma promessa que resolve para um array de avaliações.
 */
export const getMyReviews = async () => {
  const response = await api.get('/users/me/reviews');
  return response.data;
};

// Não precisamos de 'export default' neste ficheiro, pois exportamos várias funções nomeadas.

