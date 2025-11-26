import React, { createContext, useContext, useState } from "react";

// Context creation
const NotificationContext = createContext();

// Custom hook to use notification anywhere
export const useNotification = () => useContext(NotificationContext);

// Provider component
export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState({
    open: false,
    type: 'info', // 'success' | 'error' | 'warning' | 'info'
    message: ''
  });

  // Show notification
  const showNotification = (type = "info", message = "") => {
    setNotification({ open: true, type, message });

    // Auto-close after 4 seconds
    setTimeout(() => {
      setNotification((prev) => ({ ...prev, open: false }));
    }, 4000);
  };

  // Hide notification manually
  const hideNotification = () => {
    setNotification((prev) => ({ ...prev, open: false }));
  };

  return (
    <NotificationContext.Provider value={{ notification, showNotification, hideNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};
