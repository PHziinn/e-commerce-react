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
import { useState } from 'react';
import { MdAccountCircle, MdOutlineShoppingCart } from 'react-icons/md';
import TechDev from '../../../public/logoWhite.svg';
import { SearchResult } from '../Search';
import { CarrinhdoDeCompras } from './components/carrinhoDeCompras';
import { FeedDesconto } from './components/feedDesconto';

export const PrimarySearchBar = ({ showAppBar = true }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          color="inherit"
          position="fixed"
          sx={{
            background: '#000000',
            boxShadow: 'none',
            height: '65px',
            display: 'flex',
            justifyContent: 'center',
          }}>
          <Toolbar sx={{ mt: isMobile ? 2 : null }}>
            <Typography
              sx={{
                flexGrow: 1,
                display: 'flex',
              }}>
              <Box
                component={'img'}
                src={TechDev}
                alt={TechDev}
                sx={{
                  ml: isMobile ? 2.5 : null,
                  mb: isMobile ? 2 : null,
                  width: isMobile ? '60%' : '16%',
                }}
              />
            </Typography>

            <Box sx={{ display: isMobile ? 'none' : 'block' }}>
              <SearchResult />
            </Box>

            <Box>
              <IconButton
                sx={{ mr: 2 }}
                onClick={() => setCartOpen(!cartOpen)}>
                <Badge
                  badgeContent={3}
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

              <CarrinhdoDeCompras cartOpen={cartOpen} />
            </Box>
          </Toolbar>
        </AppBar>
      </Box>

      <AppBar
        sx={{
          marginTop: 8,
          width: '100%',
          background: '#DCDCDC',
          boxShadow: 'none',
          height: '70px',
          display: isMobile ? 'flex' : 'none',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 999,
        }}>
        <Box sx={{ width: '90%' }}>
          <SearchResult />
        </Box>
      </AppBar>
      <FeedDesconto showAppBar={showAppBar} />
    </>
  );
};
