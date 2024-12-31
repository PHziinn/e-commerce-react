import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterManager } from './routes/RouterManager';
import { AuthProvider } from './context/authContext';
import './styles/globalStyles.css';
import { MaintenanceProvider } from './context/maintenanceContext';
import { ReactQueryClientProvider } from './service/ReactQueryProvider';
import { Provider } from 'react-redux';
import store from './redux-store/store';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ReactQueryClientProvider>
      <Provider store={store}>
        <MaintenanceProvider>
          <AuthProvider>
            <RouterManager />
          </AuthProvider>
        </MaintenanceProvider>
      </Provider>
    </ReactQueryClientProvider>
  </StrictMode>
);
