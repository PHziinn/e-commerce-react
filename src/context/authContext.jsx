import { createContext, useState, useEffect, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';
import { axiosClient } from '../service/api.js';
import { Box, CircularProgress } from '@mui/material';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
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
      if (response.data.error) {
        alert(response.data.error);
      } else {
        const accessToken = response.data.access_token;

        if (isValidToken(accessToken)) {
          setToken(accessToken);
          axiosClient.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
          localStorage.setItem('@Auth:token', accessToken);
        } else {
          alert('Token inválido ou expirado.');
          signOut();
        }
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
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
      {children}
    </AuthContext.Provider>
  );
};

export const useUser = () => useContext(AuthContext);
