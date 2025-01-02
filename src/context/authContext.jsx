import { Box, CircularProgress } from '@mui/material';
import { jwtDecode } from 'jwt-decode';
import { createContext, useContext, useEffect, useState } from 'react';
import { AlertNotification } from '../components/AlertNotification/index.jsx';
import { useAlert } from '../hooks/ShowAlert';
import { axiosClient } from '../service/api.js';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { alert, showAlert } = useAlert();

  const [token, setToken] = useState(localStorage.getItem('@Auth:token') || null);
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('@Auth:user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [isInitialized, setIsInitialized] = useState(false);

  const signed = !!token;

  const isValidToken = (token) => {
    if (!token) return false;

    const parts = token.split('.');
    if (parts.length !== 3) {
      console.warn('Token com estrutura incorreta');
      return false;
    }

    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decoded.exp && decoded.exp < currentTime) {
        console.warn('Token expirado');
        return false;
      }

      if (decoded.isBanned) {
        showAlert('Sua conta está banida. Contate o suporte.', 'info', 20, 9000);
        return false;
      }

      setUser(decoded);
      localStorage.setItem('@Auth:user', JSON.stringify(decoded));
      return true;
    } catch (error) {
      console.error('Erro ao decodificar o token:', error);
      return false;
    }
  };

  useEffect(() => {
    const loadStoredToken = () => {
      const storedToken = localStorage.getItem('@Auth:token');

      if (storedToken && isValidToken(storedToken)) {
        setToken(storedToken);
        axiosClient.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
      } else {
        signOut();
      }
      // Marca o estado como inicializado
      setIsInitialized(true);
    };

    loadStoredToken();
  }, []);

  const signIn = async ({ email, password }) => {
    try {
      const response = await axiosClient.post('/login', { email, password });

      if (response.status === 200) {
        showAlert('Login realizado com sucesso.', 'success', 70, 10000);
      }

      if (response.data.error) {
        console.error(response.data.error);
      } else {
        const accessToken = response.data.access_token || response.data.token;

        if (isValidToken(accessToken)) {
          setToken(accessToken);
          axiosClient.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
          localStorage.setItem('@Auth:token', accessToken);
        } else {
          signOut();
        }
      }
    } catch (error) {
      showAlert('Email ou Senha incorreto.', 'error', 20);
    }
  };

  const signOut = () => {
    localStorage.removeItem('@Auth:token');
    localStorage.removeItem('@Auth:user');
    setToken(null);
    setUser(null);
    delete axiosClient.defaults.headers.common['Authorization'];
  };

  if (!isInitialized) {
    return (
      <Box
        sx={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        signIn,
        signOut,
        signed,
      }}>
      <AlertNotification alert={alert} />
      {children}
    </AuthContext.Provider>
  );
};

export const useUser = () => useContext(AuthContext);
