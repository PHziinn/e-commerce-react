import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import { useMediaQuery, useTheme } from '@mui/material';

export const PrivateRoute = ({ requiredRole }) => {
  const { signed, user } = useContext(AuthContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const role = user?.role || null;

  if (!signed) {
    return <Navigate to="/" />;
  }

  if (role === 'ADMIN' && isMobile) {
    return <Navigate to="/restricted" />;
  }

  if (requiredRole && !requiredRole.includes(role)) {
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />;
};
