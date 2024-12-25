import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterManager } from './routes/RouterManager';
import { AuthProvider } from './context/authContext';
import './styles/globalStyles.css';
import { MaintenanceProvider } from './context/maintenanceContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MaintenanceProvider>
      <AuthProvider>
        <RouterManager />
      </AuthProvider>
    </MaintenanceProvider>
  </StrictMode>
);
