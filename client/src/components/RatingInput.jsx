 
import React from 'react';
import { Rating, Box, Typography } from '@mui/material';

/**
 * Componente para input de avaliação por estrelas (0-10).
 * @param {Object} props
 * @param {number | null} props.value - A nota atual (0-10).
 * @param {function(number | null): void} props.onChange - Função chamada quando a nota muda.
 * @param {boolean} [props.readOnly=false] - Se o componente é apenas para exibição.
 */
function RatingInput({ value, onChange, readOnly = false }) {
  // O componente Rating do MUI trabalha com valores como 0, 0.5, 1, 1.5, ..., 5.
  // Precisamos converter a nossa escala 0-10 para esta escala e vice-versa.
  const muiRatingValue = value !== null ? value / 2 : null;

  const handleChange = (event, newValue) => {
    // newValue vem como 0.5, 1, 1.5, etc. Convertêmo-lo de volta para 0-10.
    onChange(newValue !== null ? newValue * 2 : null);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', my: 2 }}>
      <Typography component="legend">Avaliação (0-10):</Typography>
      <Rating
        name="track-rating"
        value={muiRatingValue}
        onChange={handleChange}
        precision={0.5} // Permite meias estrelas (representando 1 ponto na nossa escala)
        max={5} // Máximo de 5 estrelas
        size="large"
        readOnly={readOnly}
      />
      {/* Exibe a nota numérica correspondente */}
      {value !== null && (
        <Typography variant="h6" sx={{ mt: 1 }}>
          {value}/10
        </Typography>
      )}
    </Box>
  );
}

export default RatingInput;
