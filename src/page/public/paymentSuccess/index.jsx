import { Box, Typography } from '@mui/material';
import { FaCheckCircle } from 'react-icons/fa';

export const PaymentSuccess = () => {
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
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <FaCheckCircle
          style={{
            color: 'green',
            fontSize: '200px',
          }}
        />
      </Box>
      <Typography
        variant="h5"
        gutterBottom
        sx={{ fontWeight: 500, mt: 5 }}>
        COMPRA CONCLUIDA COM SUCESSO
      </Typography>
    </Box>
  );
};
