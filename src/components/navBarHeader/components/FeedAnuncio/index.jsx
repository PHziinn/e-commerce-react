import { Alert, Box, useMediaQuery, useTheme } from '@mui/material';

import { GrAnnounce } from 'react-icons/gr';

export const FeedAnuncio = ({ isFeedAnuncio, message }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      {isFeedAnuncio && (
        <Box
          sx={{
            position: 'fixed',
            top: isMobile ? 136 : 66,
            left: 0,
            width: '100%',
            zIndex: 9999,
          }}>
          <Alert
            severity="info"
            icon={<GrAnnounce sx={{ color: 'white', fontSize: 30 }} />}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              backgroundColor: '#363636',
              color: 'white',
              transition: 'opacity 0.5s ease-in-out',
              zIndex: 9999,
              opacity: isFeedAnuncio ? 1 : 0,
              '& .MuiAlert-message': {
                fontSize: '1rem',
              },
            }}>
            {message}
          </Alert>
        </Box>
      )}
    </>
  );
};
