'use client';

import { useEffect, useState } from 'react';
import { Download, X } from 'lucide-react';
import { useApp } from '../store';

const PWAInstaller = () => {
  const { theme: { isDark } } = useApp();
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Register service worker
    if ('serviceWorker' in navigator && typeof window !== 'undefined') {
      const registerSW = async () => {
        try {
          const registration = await navigator.serviceWorker.register('/sw.js');
          
          // Handle service worker updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // New version available, prompt user to refresh
                  if (confirm('New version available! Refresh to update?')) {
                    window.location.reload();
                  }
                }
              });
            }
          });
        } catch (error) {
          // Silently handle service worker registration errors
        }
      };
      
      registerSW();
    }

    // Handle PWA install prompt
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallPrompt(true);
    };

    // Check if app is already installed
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowInstallPrompt(false);
      setDeferredPrompt(null);
    };

    // Listen for install events
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // Check if running in standalone mode (already installed)
    if (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    try {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        setShowInstallPrompt(false);
      }
      
      setDeferredPrompt(null);
    } catch (error) {
      // Handle install error silently
    }
  };

  const handleDismiss = () => {
    setShowInstallPrompt(false);
    // Remember user dismissed the prompt
    localStorage.setItem('pwa-install-dismissed', 'true');
  };

  // Don't show if already installed or user previously dismissed
  if (isInstalled || !showInstallPrompt || localStorage.getItem('pwa-install-dismissed')) {
    return null;
  }

  return (
    <div className={`fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-50 ${
      isDark ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-800 border-gray-200'
    } border rounded-lg shadow-lg p-4`}>
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-lg ${
          isDark ? 'bg-indigo-600' : 'bg-indigo-100'
        }`}>
          <Download size={20} className={isDark ? 'text-white' : 'text-indigo-600'} />
        </div>
        
        <div className="flex-1">
          <h3 className="font-semibold text-sm mb-1">Install Study Guide</h3>
          <p className="text-xs opacity-75 mb-3">
            Install this app on your device for offline access and better performance.
          </p>
          
          <div className="flex gap-2">
            <button
              onClick={handleInstall}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition ${
                isDark 
                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white' 
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
              }`}
            >
              Install
            </button>
            <button
              onClick={handleDismiss}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition ${
                isDark 
                  ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
              }`}
            >
              Maybe Later
            </button>
          </div>
        </div>
        
        <button
          onClick={handleDismiss}
          className={`p-1 rounded-md transition ${
            isDark 
              ? 'hover:bg-gray-700 text-gray-400' 
              : 'hover:bg-gray-100 text-gray-500'
          }`}
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default PWAInstaller;