import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import { useMediaQuery, useTheme } from '@mui/material';

export const PrivateRoute = ({ requiredRole }) => {
  const { signed, user } = useContext(AuthContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const restrictedRoutesForMobile = [
    '/admin/dashboard',
    '/admin/usuarios',
    '/admin/produtos',
    '/admin/settings',
  ];

  const role = user?.role || null;

  if (!signed) {
    return <Navigate to="/" />;
  }

  if (
    requiredRole?.includes('ADMIN') &&
    isMobile &&
    restrictedRoutesForMobile.includes(location.pathname)
  ) {
    return (
      <Navigate
        to="/restricted"
        state={{ from: 'internal' }}
      />
    );
  }

  if (requiredRole && !requiredRole.includes(role)) {
    return (
      <Navigate
        to="/unauthorized"
        state={{ from: 'internal' }}
      />
    );
  }

  return <Outlet />;
};
