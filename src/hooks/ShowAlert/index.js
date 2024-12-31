import { useState } from 'react';

export const useAlert = () => {
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });

  const showAlert = (message, severity = 'success') => {
    setAlert({ open: true, message, severity });
    setTimeout(() => setAlert({ open: false, message: '', severity: 'success' }), 6000);
  };

  return {
    alert,
    showAlert,
    setAlert,
  };
};
