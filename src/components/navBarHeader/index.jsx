import {
  AppBar,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { MdAccountCircle, MdOutlineShoppingCart } from 'react-icons/md';
import TechDev from '../../../public/logoWhite.svg';
import { SearchResult } from '../Search';

export const PrimarySearchBar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [showAppBar, setShowAppBar] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const fadeOutThreshold = 15;

      const opacity = 1 - Math.min(1, scrollTop / fadeOutThreshold);
      setShowAppBar(opacity > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          color="inherit"
          position="fixed"
          sx={{
            background: '#000000',
            boxShadow: 'none',
            height: '70px',
            display: 'flex',
            justifyContent: 'center',
          }}>
          <Toolbar>
            <Typography
              sx={{
                flexGrow: 1,
                display: 'flex',
                justifyContent: 'flex-start',
              }}>
              <Box
                component={'img'}
                src={TechDev}
                alt={TechDev}
                sx={{
                  ml: isMobile ? 2.5 : null,
                  mb: isMobile ? 2 : null,
                  width: isMobile ? '50%' : '16%',
                }}
              />
            </Typography>

            <Box sx={{ display: isMobile ? 'none' : 'block' }}>
              <SearchResult />
            </Box>

            <Box>
              <IconButton sx={{ mr: 2 }}>
                <Badge
                  badgeContent={4}
                  color="error"
                  sx={{
                    '& .MuiBadge-badge': {
                      fontSize: '0.7rem',
                    },
                  }}>
                  <MdOutlineShoppingCart
                    style={{
                      fontSize: '1.8rem',
                      color: '#8B96A5',
                      marginBottom: isMobile ? 10 : null,
                    }}
                  />
                </Badge>
              </IconButton>
              <IconButton>
                <Badge
                  badgeContent={1}
                  color="error"
                  sx={{
                    '& .MuiBadge-badge': {
                      fontSize: '0.7rem',
                    },
                  }}>
                  <MdAccountCircle
                    style={{
                      fontSize: '1.8rem',
                      color: '#778899',
                      marginBottom: isMobile ? 10 : null,
                    }}
                  />
                </Badge>
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      <AppBar
        sx={{
          marginTop: 7,
          width: '100%',
          background: '#DCDCDC',
          boxShadow: 'none',
          height: '70px',
          display: isMobile ? 'flex' : 'none',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Box sx={{ width: '90%' }}>
          <SearchResult />
        </Box>
      </AppBar>

      {showAppBar && (
        <AppBar
          sx={{
            display: 'flex',
            alignItems: 'center',
            marginTop: isMobile ? 16.5 : 9.5,
            background: '#363636',
            color: 'white',
            padding: 1,
            transition: 'opacity 0.5s ease-in-out',
            opacity: showAppBar ? 1 : 0,
          }}>
          Frete Grátis nas Comprar acima de R$ 100
        </AppBar>
      )}
    </>
  );
};
