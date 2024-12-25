import React, { createContext, useState, useCallback } from 'react';

export const MaintenanceContext = createContext();

export const MaintenanceProvider = ({ children }) => {
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(() => {
    try {
      // Recupera o estado inicial do localStorage
      const storedState = localStorage.getItem('isMaintenanceMode');
      return storedState ? JSON.parse(storedState) : false;
    } catch (error) {
      console.error('Erro ao acessar o localStorage:', error);
      return false;
    }
  });

  const toggleMaintenanceMode = useCallback(() => {
    try {
      setIsMaintenanceMode((prev) => {
        const newState = !prev;
        localStorage.setItem('isMaintenanceMode', JSON.stringify(newState)); // Atualiza no localStorage
        return newState;
      });
    } catch (error) {
      console.error('Erro ao salvar no localStorage:', error);
    }
  }, []);

  return (
    <MaintenanceContext.Provider value={{ isMaintenanceMode, toggleMaintenanceMode }}>
      {children}
    </MaintenanceContext.Provider>
  );
};
