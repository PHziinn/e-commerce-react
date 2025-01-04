import { Box, CircularProgress } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { createContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { AlertNotification } from '../components/AlertNotification';
import { useAlert } from '../hooks/ShowAlert';
import { getAllSettings } from '../service/api';

export const MaintenanceContext = createContext();

export const MaintenanceProvider = ({ children }) => {
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);
  const [socket, setSocket] = useState(null);
  const { alert, showAlert } = useAlert();

  const { data, isLoading } = useQuery({
    queryKey: ['settings'],
    queryFn: getAllSettings,
    keepPreviousData: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });

  useEffect(() => {
    if (data && Array.isArray(data) && data[0]?.hasOwnProperty('isManutencion')) {
      const isMaintenance = data[0].isManutencion;
      setIsMaintenanceMode(isMaintenance);
    }
  }, [data]);

  useEffect(() => {
    const serverUrls = import.meta.env.VITE_SOCKET_SERVER_URLS.split(',');
    const serverUrl =
      serverUrls.find((url) => url.includes(window.location.hostname)) || serverUrls[0];

    const socketInstance = io(serverUrl);
    setSocket(socketInstance);

    socketInstance.on('settingsUpdated', (updatedSettings) => {
      if (updatedSettings.isManutencion !== undefined && updatedSettings.isManutencion === true) {
        showAlert('Estamos em Manuntenção Voltaremos em Breve!', 'info', 20, 15000);
      }

      if (updatedSettings && updatedSettings.isManutencion !== undefined) {
        setIsMaintenanceMode(updatedSettings.isManutencion);
      }
    });

    return () => {
      socketInstance.off('connect');
      socketInstance.off('settingsUpdated');
      socketInstance.disconnect();
    };
  }, []);

  const toggleMaintenanceMode = () => {
    setIsMaintenanceMode((prev) => !prev);
    if (socket) {
      socket.emit('maintenanceToggle', { isMaintenanceMode: !isMaintenanceMode });
    }
  };

  return (
    <MaintenanceContext.Provider value={{ isMaintenanceMode, toggleMaintenanceMode }}>
      <AlertNotification alert={alert} />

      {isLoading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}>
          <CircularProgress />
        </Box>
      ) : (
        children
      )}
    </MaintenanceContext.Provider>
  );
};
