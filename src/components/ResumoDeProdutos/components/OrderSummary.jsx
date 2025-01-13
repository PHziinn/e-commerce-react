import React from 'react';
import { Paper, Typography, Button, Box, Divider } from '@mui/material';
import { useConvertValues } from '../../../utils/ConvertValues';
import { useNavigate } from 'react-router-dom';

export const OrderSummary = ({ total }) => {
  const { convertValues } = useConvertValues();
  const navigate = useNavigate();

  return (
    <Paper
      elevation={3}
      sx={{ p: 3 }}>
      <Typography
        variant="h6"
        gutterBottom>
        Resumo do Pedido
      </Typography>
      <Box sx={{ my: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography>Subtotal</Typography>
          <Typography>{convertValues(total)}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography>Frete</Typography>
          <Typography sx={{ color: 'green', fontWeight: 'bold' }}>Grátis</Typography>
        </Box>
      </Box>
      <Divider sx={{ my: 2 }} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h6">Total</Typography>
        <Typography variant="h6">{convertValues(total)}</Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Button
          variant="contained"
          fullWidth
          sx={{
            boxshadow: 'none',
            color: '#fff',
            background: 'black',
            fontWeight: 'bold',
            height: '45px',
            transition: 'background-color 0.3s',
            '&:hover': { backgroundColor: '#282828', color: '#fff', boxShadow: 'none' },
            '&:active': {
              backgroundColor: '#282828',
              color: '#fff',
              boxShadow: 'none',
            },
          }}>
          Finalizar Compra
        </Button>
        <Button
          onClick={() => {
            navigate('/');
          }}
          variant="contained"
          fullWidth
          sx={{
            boxShadow: 'none',
            color: 'black',
            background: '#bcbcbc',
            height: '45px',
            fontWeight: 'bold',
            transition: 'background-color 0.3s',
            '&:hover': { backgroundColor: '#a9a9a9', color: 'black', boxShadow: 'none' },
            '&:active': {
              backgroundColor: '#a9a9a9',
              color: 'black',
              boxShadow: 'none',
            },
          }}>
          Continuar Comprando
        </Button>
      </Box>
    </Paper>
  );
};
