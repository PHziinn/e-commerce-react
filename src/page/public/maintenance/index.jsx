import { Box, LinearProgress, Stack, Typography } from '@mui/material';
import { FcServices } from 'react-icons/fc';
import { FooterMaintenance } from './components/FooterMaintenance';

export const MaintenancePage = () => {
  return (
    <Box component="main">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          textAlign: 'center',
          fontFamily: 'Arial',
        }}>
        <FcServices size={150} />
        <Typography sx={{ mb: 2, fontSize: '42px', fontWeight: 'bold' }}>
          Estamos em Manutenção
        </Typography>

        <Typography
          sx={{
            color: '#555555',
            fontWeight: 400,
            lineHeight: 1.6,
          }}>
          Nosso site está passando por manutenção neste momento.
        </Typography>
        <Typography
          sx={{
            color: '#555555',
            marginBottom: 4,
            fontWeight: 400,
            lineHeight: 1.6,
          }}>
          Estamos trabalhando para melhorar a sua experiência.
        </Typography>

        <Stack
          sx={{ width: '500px', mb: 3 }}
          spacing={2}>
          <LinearProgress color="inherit" />
        </Stack>
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
      <FooterMaintenance />
    </Box>
  );
};
