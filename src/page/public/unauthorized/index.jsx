import { Box, Button, Container, Typography, useMediaQuery, useTheme } from '@mui/material';
import { FcLock } from 'react-icons/fc';
import { Navigate, useLocation } from 'react-router-dom';

export const Unauthorized = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const location = useLocation();
  const fromInternal = location.state?.from === 'internal';

  if (!fromInternal) {
    return <Navigate to="/" />;
  }

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100dvh',
          textAlign: 'center',
        }}>
        <FcLock size={150} />

        <Typography sx={{ mt: 2, mb: 2, fontSize: isMobile ? '29px' : '42px', fontWeight: 'bold' }}>
          Acesso Não Autorizado
        </Typography>
        <Typography
          sx={{
            color: '#555555',
            fontWeight: 400,
            lineHeight: 1.6,
            mb: 1,
          }}>
          Desculpe, você não tem permissão para acessar esta página. Por favor, verifique suas
          credenciais ou entre em contato com o administrador.
        </Typography>
        <Button
          variant="contained"
          sx={{ backgroundColor: '#000000', mt: 5 }}
          href="/">
          Voltar para a Página Inicial
        </Button>
      </Box>
    </Container>
  );
};
