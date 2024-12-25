import { Box, Typography, CircularProgress, Paper, Fade } from '@mui/material';

export const MaintenancePage = () => {
  return (
    <Box
      component="main"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
        fontFamily: 'Arial',
      }}>
      <Typography sx={{ mb: 2, fontSize: '42px', fontWeight: 'bold' }}>
        Estamos em Manutenção
      </Typography>
      <Typography
        sx={{
          color: '#555555',
          marginBottom: 4,
          fontWeight: 400,
          lineHeight: 1.6,
        }}>
        Nosso site está em processo de melhorias. Pedimos desculpas pelo transtorno. Por favor,
        volte mais tarde.
      </Typography>
      <CircularProgress
        sx={{
          color: '#3f51b5',
          marginTop: 2,
          animationDuration: '800ms',
          marginBottom: 2,
        }}
      />
      <Typography
        variant="body2"
        sx={{
          color: '#999999',
          fontSize: '0.875rem',
          fontWeight: 300,
        }}>
        Agradecemos pela sua paciência.
      </Typography>
    </Box>
  );
};
