import {
  AppBar,
  Avatar,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { FaCircleUser } from 'react-icons/fa6';
import { MdAdminPanelSettings, MdOutlineShoppingCart } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import TechDev from '../../../public/logoWhite.svg';
import { useUser } from '../../context/authContext';
import { getAllSettings, getByUsuario } from '../../service/api';
import { SearchResult } from '../Search';
import { CarrinhdoDeCompras } from './components/carrinhoDeCompras';
import { FeedAnuncio } from './components/FeedAnuncio';

export const PrimarySearchBar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  const [cartOpen, setCartOpen] = useState(false);
  const [messageSocket, setMessageSocket] = useState();
  const [isFeedAnuncio, setIsFeedAnuncio] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const { user } = useUser();

  const { data } = useQuery({
    queryKey: ['settings'],
    queryFn: getAllSettings,
    keepPreviousData: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });

  const { data: userData } = useQuery({
    queryKey: ['usuarios', user?.id],
    queryFn: () => getByUsuario(user?.id),
    enabled: !!user?.id,
    keepPreviousData: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });

  useEffect(() => {
    if (data && Array.isArray(data) && data[0]?.hasOwnProperty('isFeedDesconto', 'message')) {
      const isFeedDesconto = data[0].isFeedDesconto;
      const message = data[0].message;
      setIsFeedAnuncio(isFeedDesconto);
      setMessageSocket(message);
    }
  }, [data]);

  useEffect(() => {
    const serverUrls = import.meta.env.VITE_SOCKET_SERVER_URLS.split(',');
    const serverUrl =
      serverUrls.find((url) => url.includes(window.location.hostname)) || serverUrls[0];

    const socketInstance = io(serverUrl);

    socketInstance.on('settingsUpdated', (updatedSettings) => {
      setIsFeedAnuncio(updatedSettings.isFeedDesconto);
      setMessageSocket(updatedSettings.message);
    });

    return () => {
      socketInstance.off('settingsUpdated');
      socketInstance.disconnect();
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
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
            height: '65px',
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'space-around',
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
                onClick={() => navigate(`/`)}
                sx={{
                  mb: isMobile ? 2 : null,
                  width: isMobile ? '150px' : '200px',
                }}
              />
            </Typography>

            <Box
              sx={{
                display: isMobile ? 'none' : 'block',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <SearchResult />
            </Box>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: isMobile ? 1 : 3,
                flexDirection: isMobile ? 'row-reverse' : null,
              }}>
              <Box sx={{ textAlign: 'center', mb: isMobile ? 2 : null }}>
                {user ? (
                  <>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Avatar
                        alt={userData?.user?.name || 'Avatar'}
                        src={userData?.user?.avatar || '/placeholder.svg'}
                        sx={{
                          cursor: 'pointer',
                          border: '2px solid rgba(204, 204, 204, 0.2)',
                          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                          width: 45,
                          height: 45,
                        }}
                        onClick={() => navigate(`/perfil`)}
                      />
                      {!isMobile && (
                        <Typography
                          sx={{ color: '#fff', fontSize: '0.865rem' }}
                          variant="p">
                          {userData?.user.name.split(' ').slice(0, 2).join(' ')}
                        </Typography>
                      )}
                    </Box>
                  </>
                ) : (
                  <>
                    <Box
                      sx={{
                        gap: 1,
                        display: 'flex',
                        alignItems: 'center',
                      }}>
                      <FaCircleUser style={{ color: '#fff', fontSize: '35px' }} />
                      <Typography
                        component="p"
                        onClick={() => navigate('/login')}
                        sx={{
                          cursor: 'pointer',
                          textDecoration: 'underline',
                          color: '#fff',
                          fontSize: '0.865rem',
                        }}>
                        Entrar
                      </Typography>
                      <Typography
                        component="p"
                        sx={{
                          color: '#fff',
                        }}>
                        ou
                      </Typography>

                      <Typography
                        component="p"
                        onClick={() => navigate('/cadastrar')}
                        sx={{
                          cursor: 'pointer',
                          textDecoration: 'underline',
                          color: '#fff',
                          fontSize: '0.865rem',
                        }}>
                        Cadastrar
                      </Typography>
                    </Box>
                  </>
                )}
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                {!isMobile && user?.role === 'ADMIN' && (
                  <IconButton
                    sx={{ mr: 1 }}
                    onClick={() => navigate('/admin/dashboard')}>
                    <MdAdminPanelSettings
                      style={{
                        fontSize: '1.8rem',
                        color: '#8B96A5',
                        marginBottom: isMobile ? 10 : null,
                      }}
                    />
                  </IconButton>
                )}
                {user && (
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
                )}
              </Box>

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
      <FeedAnuncio
        isFeedAnuncio={isFeedAnuncio && scrollY < 100}
        message={messageSocket}
      />
    </>
  );
};
