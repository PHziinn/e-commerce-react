import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useContext, useMemo } from 'react';
import { AdminRoutesPath, PrivateRoutesPath, RoutesPath, MaintenancePath } from './RoutesPath';
import { PrivateRoute } from './PrivateRoutes';
import { MaintenanceContext } from '../context/maintenanceContext';
import { MaintenancePage } from '../page/public/maintenance';

export const RouterManager = () => {
  const { isMaintenanceMode } = useContext(MaintenanceContext);
  const adminRoutes = useMemo(
    () =>
      Object.keys(AdminRoutesPath).map((path) => {
        const RouteComponent = AdminRoutesPath[path];
        return (
          <Route
            key={path}
            element={<PrivateRoute requiredRole={['ADMIN']} />}>
            <Route
              path={path}
              element={<RouteComponent />}
            />
          </Route>
        );
      }),
    []
  );

  const privateRoutes = useMemo(
    () =>
      Object.keys(PrivateRoutesPath).map((path) => {
        const RouteComponent = PrivateRoutesPath[path];
        return (
          <Route
            key={path}
            element={<PrivateRoute requiredRole={['USER', 'ADMIN']} />}>
            <Route
              path={path}
              element={<RouteComponent />}
            />
          </Route>
        );
      }),
    []
  );
  const publicRoutes = useMemo(
    () =>
      Object.keys(RoutesPath).map((path) => {
        const RouteComponent = RoutesPath[path];
        return (
          <Route
            key={path}
            path={path}
            element={<RouteComponent />}
          />
        );
      }),
    []
  );

  const MaintenanceRoutes = useMemo(
    () =>
      Object.keys(MaintenancePath).map((path) => {
        const RouteComponent = MaintenancePath[path];
        return (
          <Route
            key={path}
            path={path}
            element={<RouteComponent />}
          />
        );
      }),
    []
  );

  return (
    <BrowserRouter
      future={{
        v7_relativeSplatPath: true,
        v7_startTransition: true,
      }}>
      <Routes>
        {adminRoutes}
        {isMaintenanceMode ? (
          MaintenanceRoutes
        ) : (
          <>
            {privateRoutes}
            {publicRoutes}
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};
