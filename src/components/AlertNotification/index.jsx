import { Box, Alert as MuiAlert, Slide } from '@mui/material';

export const AlertNotification = ({ alert, closeAlert }) => {
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
          onClose={() => closeAlert({ open: false, message: '', severity: 'success', top: 70 })}>
          {alert.message}
        </MuiAlert>
      </Slide>
    </Box>
  );
};
