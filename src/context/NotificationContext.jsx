import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const NotificationContext = createContext();

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  // Mock real-time notifications
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate random notifications
      const mockNotifications = [
        {
          id: Date.now(),
          type: 'info',
          title: 'New Appointment',
          message: 'A new appointment has been scheduled',
          timestamp: new Date(),
          read: false
        }
      ];

      // Randomly add notifications for demo
      if (Math.random() > 0.95) {
        const notification = mockNotifications[0];
        setNotifications(prev => [notification, ...prev.slice(0, 9)]);
        
        // Show toast notification
        toast(notification.message, {
          icon: '🔔',
          duration: 4000
        });
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now(),
      timestamp: new Date(),
      read: false,
      ...notification
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    
    // Show toast
    const icon = {
      success: '✅',
      error: '❌',
      warning: '⚠️',
      info: '💡'
    }[notification.type] || '📢';
    
    toast(notification.message, {
      icon,
      duration: 4000
    });
  };

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const removeNotification = (id) => {
    setNotifications(prev =>
      prev.filter(notification => notification.id !== id)
    );
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const value = {
    notifications,
    unreadCount: notifications.filter(n => !n.read).length,
    addNotification,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAllNotifications
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};