import api from './api';

/**
 * Pesquisa utilizadores pelo nome (parcial).
 * @param {string} query O termo de pesquisa.
 * @returns {Promise<Array>} Lista de utilizadores encontrados.
 */
export const searchUsers = async (query) => {
  if (!query) return [];
  const response = await api.get(`/users/search?q=${encodeURIComponent(query)}`);
  return response.data;
};