import { Box, Button, Typography } from '@mui/material';
import { FcLockPortrait } from 'react-icons/fc';
import { Navigate, useLocation } from 'react-router-dom';

export const PaginaRestritaMobiles = () => {
  const location = useLocation();
  const fromInternal = location.state?.from === 'internal';

  if (!fromInternal) {
    return <Navigate to="/" />;
  }

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
          color: '#b71c1c',
        }}>
        <FcLockPortrait size={150} />
        <Typography sx={{ mt: 2, mb: 2, fontSize: '42px', fontWeight: 'bold' }}>
          Acesso Restrito
        </Typography>

        <Box sx={{ padding: 1 }}>
          <Typography
            sx={{
              color: '#555555',
              fontWeight: 400,
              lineHeight: 1.6,
              mb: 1,
            }}>
            Infelizmente, este conteúdo não está disponível para dispositivos móveis. Por favor,
            para uma melhor experiência, acesse esta página através de um desktop.
          </Typography>
          <Button
            variant="contained"
            sx={{ backgroundColor: '#000000', mt: 5 }}
            href="/">
            Voltar para a Página Inicial
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
