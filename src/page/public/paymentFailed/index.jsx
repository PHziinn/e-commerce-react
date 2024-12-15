import { Box, Typography } from '@mui/material';
import { MdCancel } from 'react-icons/md';

export const PaymentFailed = () => {
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
        <MdCancel
          style={{
            color: 'red',
            fontSize: '230px',
          }}
        />
      </Box>
      <Typography
        variant="h5"
        gutterBottom
        sx={{ fontWeight: 500, mt: 5 }}>
        PAGAMENTO RECUSADO
      </Typography>
    </Box>
  );
};
