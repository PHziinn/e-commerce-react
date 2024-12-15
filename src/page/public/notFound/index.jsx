import { Typography, Button, Box } from '@mui/material';

export const NotFound = () => {
  return (
    <Box
      component={'main'}
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}>
      <Typography
        variant="h1"
        sx={{ fontWeight: 'bold', color: '#000', fontSize: '96px', mb: 2 }}>
        404
      </Typography>
      <Typography
        variant="h5"
        sx={{ color: '#333', mb: 4 }}>
        Oops! Página não encontrada.
      </Typography>
      <Button
        variant="contained"
        sx={{
          backgroundColor: '#000000',
          color: '#fff',
          ':hover': {
            backgroundColor: '#000',
          },
        }}
        href="/">
        Voltar à página inicial
      </Button>
    </Box>
  );
};
