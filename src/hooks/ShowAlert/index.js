import { useState } from 'react';

export const useAlert = () => {
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success', top: 70 });

  const showAlert = (message, severity = 'success', top = 70, time = 6000) => {
    setAlert({ open: true, message, severity, top });
    setTimeout(() => setAlert({ open: false, message: '', severity: 'success', top: 70 }), time);
  };

  return {
    alert,
    showAlert,
    setAlert,
  };
};
