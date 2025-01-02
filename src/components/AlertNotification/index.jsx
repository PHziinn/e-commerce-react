import { Box, Alert as MuiAlert, Slide } from '@mui/material';
import { useAlert } from '../../hooks/ShowAlert';

export const AlertNotification = ({ alert }) => {
  const { setAlert } = useAlert();

  return (
    <Box
      sx={{
        position: 'fixed',
        top: alert.top,
        right: 20,
        zIndex: 9999,
        width: 'auto',
        display: alert.open ? 'flex' : 'none',
        flexDirection: 'column',
        gap: 10,
      }}>
      <Slide
        direction="down"
        in={alert.open}
        mountOnEnter
        unmountOnExit>
        <MuiAlert
          severity={alert.severity}
          onClose={() => setAlert({ open: false, message: '', severity: 'success' })}>
          {alert.message}
        </MuiAlert>
      </Slide>
    </Box>
  );
};
