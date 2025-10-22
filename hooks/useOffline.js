import { useState, useEffect } from 'react';

export const useOffline = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [serviceWorkerRegistered, setServiceWorkerRegistered] = useState(false);

  // Register service worker
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('Service Worker registered successfully:', registration);
          setServiceWorkerRegistered(true);
        })
        .catch((error) => {
          console.log('Service Worker registration failed:', error);
        });
    }
  }, []);

  // Monitor online/offline status
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleOnline = () => setIsOnline(true);
      const handleOffline = () => setIsOnline(false);

      setIsOnline(navigator.onLine);

      window.addEventListener('online', handleOnline);
      window.addEventListener('offline', handleOffline);

      return () => {
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
      };
    }
  }, []);

  return {
    isOnline,
    serviceWorkerRegistered
  };
};