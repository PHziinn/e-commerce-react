import { AppBar, useMediaQuery, useTheme } from '@mui/material';

export const FeedDesconto = ({ showAppBar }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <>
      {showAppBar && (
        <AppBar
          sx={{
            display: 'flex',
            alignItems: 'center',
            marginTop: isMobile ? 17 : 8.5,
            background: '#363636',
            color: 'white',
            padding: 1,
            transition: 'opacity 0.5s ease-in-out',
            opacity: showAppBar ? 1 : 0,
            zIndex: 999,
          }}>
          Frete Grátis nas Comprar acima de R$ 100
        </AppBar>
      )}
    </>
  );
};
