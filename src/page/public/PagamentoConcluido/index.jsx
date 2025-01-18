import { Box, Button, Typography } from '@mui/material';
import { useEffect } from 'react';
import { FcCheckmark } from 'react-icons/fc';
import { useLocation, useNavigate } from 'react-router-dom';
import { Footer } from '../../../components/layout/Footer';

export const PagamentoConcluido = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const sessionId = new URLSearchParams(location.search).get('session_id');

  useEffect(() => {
    if (sessionId) {
      const userIdLocalStorage = localStorage.getItem('@Auth:user');

      if (userIdLocalStorage) {
        const userData = JSON.parse(userIdLocalStorage);
        const userId = userData.id;

        if (userId) {
          localStorage.removeItem(`cartState_${userId}`);
        }
      }
    } else {
      navigate('/');
    }
  }, [sessionId, navigate]);

  return (
    <Box component="main">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100dvh',
          textAlign: 'center',
          fontFamily: 'Arial',
          color: '#4caf50',
        }}>
        <FcCheckmark size={150} />
        <Typography sx={{ mt: 2, mb: 2, fontSize: '42px', fontWeight: 'bold' }}>
          Pagamento Concluído com Sucesso
        </Typography>

        <Box sx={{ padding: 1 }}>
          <Typography
            sx={{
              color: '#555555',
              fontWeight: 400,
              lineHeight: 1.6,
              mb: 1,
            }}>
            Obrigado por sua compra! Seu pagamento foi processado com sucesso. Você receberá um
            e-mail de confirmação em breve.
          </Typography>
          <Button
            variant="contained"
            sx={{ backgroundColor: '#000000', mt: 5 }}
            href="/">
            Voltar para a Página Inicial
          </Button>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};
