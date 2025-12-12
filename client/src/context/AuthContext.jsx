import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';

// Cria o Contexto
const AuthContext = createContext();

// Cria o Provedor do Contexto
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Estado de carregamento para verificar a sessão

  // Função para verificar se existe uma sessão ativa no back-end ao carregar a app
  useEffect(() => {
    async function checkSession() {
      try {
        const response = await api.get('/auth/me');
        setUser(response.data);
      } catch (error) {
        // Se der erro (ex: 401 não autorizado), significa que não há sessão
        setUser(null);
      } finally {
        // Termina o carregamento, independentemente do resultado
        setLoading(false);
      }
    }
    checkSession();
  }, []); // O array vazio [] garante que isto corre apenas uma vez

  const login = async (username, password) => {
    const response = await api.post('/auth/login', { username, password });
    setUser(response.data); // Guarda as informações do utilizador no estado
    return response;
  };

  const logout = async () => {
    await api.post('/auth/logout');
    setUser(null); // Limpa as informações do utilizador
  };

  const isAuthenticated = !!user; // Converte o objeto 'user' para um booleano

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

// Cria um hook customizado para facilitar o uso do contexto noutros componentes
export function useAuth() {
  return useContext(AuthContext);
}
