import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Este componente recebe 'children', que representa a página que queremos proteger.
function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  // Se ainda estivermos a verificar a sessão, não renderizamos nada ainda
  // para evitar um piscar de ecrã (mostrar a página de login por um instante).
  if (loading) {
    return null; // Ou pode retornar um spinner de carregamento aqui
  }

  // Se não estiver autenticado, redireciona para a página de login.
  // 'replace' impede que o utilizador volte à página anterior no histórico do navegador.
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Se estiver autenticado, renderiza a página filha que foi passada.
  return children;
}

export default ProtectedRoute;
