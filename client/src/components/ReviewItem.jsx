import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTrackDetails } from '../services/spotify';
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Box,
  Skeleton
} from '@mui/material';
import RatingInput from './RatingInput';

/**
 * Componente que exibe uma avaliação individual com dados enriquecidos do Spotify.
 */
function ReviewItem({ review }) {
  const [track, setTrack] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchTrack = async () => {
      try {
        // Busca os detalhes (Capa, Nome, Artista) usando o ID que está na review
        const details = await getTrackDetails(review.trackId);
        if (isMounted) setTrack(details);
      } catch (error) {
        console.error("Erro ao carregar detalhes da música:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchTrack();

    return () => { isMounted = false; };
  }, [review.trackId]);

  // Estado de carregamento (Skeleton) enquanto busca no Spotify
  if (loading) {
    return (
      <ListItem divider>
        <ListItemAvatar>
          <Skeleton variant="rectangular" width={64} height={64} sx={{ borderRadius: 1 }} />
        </ListItemAvatar>
        <ListItemText
          primary={<Skeleton variant="text" width="60%" />}
          secondary={<Skeleton variant="text" width="40%" />}
        />
      </ListItem>
    );
  }

  // Se falhou ao carregar ou música não existe
  if (!track) {
    return null; 
  }

  return (
    <ListItem divider alignItems="flex-start" sx={{ py: 2 }}>
      <ListItemAvatar sx={{ mr: 2 }}>
        <Avatar
          variant="rounded"
          src={track.imageUrl}
          alt={track.name}
          sx={{ width: 64, height: 64 }}
        />
      </ListItemAvatar>
      
      <ListItemText
        primary={
          <Link to={`/music/${review.trackId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography variant="h6" component="span" sx={{ '&:hover': { textDecoration: 'underline' } }}>
              {track.name}
            </Typography>
          </Link>
        }
        secondary={
          <Box component="span" sx={{ display: 'flex', flexDirection: 'column', mt: 0.5 }}>
            <Typography variant="body2" color="text.primary" fontWeight="bold">
              {track.artist}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {track.album}
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
               {/* As estrelas agora aparecem pequenas e alinhadas */}
               <RatingInput value={review.rating} readOnly={true} size="small" />
               <Typography variant="caption" sx={{ ml: 1, color: 'text.secondary' }}>
                 • Avaliado em {new Date(review.createdAt).toLocaleDateString()}
               </Typography>
            </Box>
          </Box>
        }
      />
    </ListItem>
  );
}

export default ReviewItem;