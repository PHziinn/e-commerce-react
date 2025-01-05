import { useState } from 'react';

export const useAlert = () => {
  const [alert, closeAlert] = useState({ open: false, message: '', severity: 'success', top: 70 });

  const showAlert = (message, severity = 'success', top = 70, time = 6000) => {
    closeAlert({ open: true, message, severity, top });
    setTimeout(() => closeAlert({ open: false, message: '', severity: 'success', top: 70 }), time);
  };

  return {
    alert,
    showAlert,
    closeAlert,
  };
};
