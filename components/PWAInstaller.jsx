'use client';

import { useEffect, useState } from 'react';
import { Download, X } from 'lucide-react';
import { useApp, useThemeColors } from '../store';

const PWAInstaller = () => {
  const { theme: { isDark } } = useApp();
  const colors = useThemeColors(isDark);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Only run in browser environment
    if (typeof window === 'undefined') return;
    
    let timeoutId;
    
    // Register service worker with retry logic
    if ('serviceWorker' in navigator) {
      const registerSW = async () => {
        try {
          const registration = await navigator.serviceWorker.register('/sw.js', {
            scope: '/'
          });
          
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
          console.log('Service Worker registration failed:', error);
        }
      };
      
      registerSW();
    }

    // Handle PWA install prompt
    const handleBeforeInstallPrompt = (e) => {
      console.log('beforeinstallprompt fired');
      e.preventDefault();
      setDeferredPrompt(e);
      
      // Don't show immediately, wait a bit for better UX
      timeoutId = setTimeout(() => {
        if (!localStorage.getItem('pwa-install-dismissed')) {
          setShowInstallPrompt(true);
        }
      }, 2000);
    };

    // Check if app is already installed
    const handleAppInstalled = () => {
      console.log('App installed successfully');
      setIsInstalled(true);
      setShowInstallPrompt(false);
      setDeferredPrompt(null);
      localStorage.removeItem('pwa-install-dismissed');
    };

    // Check various ways the app might be installed
    const checkIfInstalled = () => {
      // Check if running in standalone mode
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
      // Check iOS Safari standalone
      const isIOSStandalone = (window.navigator as any).standalone === true;
      // Check if launched from home screen (Android)
      const isHomeScreen = window.location.search.includes('source=pwa');
      
      if (isStandalone || isIOSStandalone || isHomeScreen) {
        setIsInstalled(true);
      }
    };
    
    // Listen for install events
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    
    // Initial check
    checkIfInstalled();
    
    // For browsers that don't support beforeinstallprompt but support PWAs
    // Show manual install instructions after a delay if criteria are met
    const fallbackTimer = setTimeout(() => {
      if (!deferredPrompt && !isInstalled && !localStorage.getItem('pwa-install-dismissed')) {
        // Check if we have a valid manifest and service worker
        if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
          setShowInstallPrompt(true);
        }
      }
    }, 5000);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      if (timeoutId) clearTimeout(timeoutId);
      if (fallbackTimer) clearTimeout(fallbackTimer);
    };
  }, [deferredPrompt, isInstalled]);

  const handleInstall = async () => {
    if (deferredPrompt) {
      try {
        // Use the deferred prompt
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        
        console.log('User response to install prompt:', outcome);
        
        if (outcome === 'accepted') {
          setShowInstallPrompt(false);
        } else {
          // User dismissed, remember for this session
          handleDismiss();
        }
        
        setDeferredPrompt(null);
      } catch (error) {
        console.log('Install prompt error:', error);
        // Fallback to manual instructions
        showManualInstallInstructions();
      }
    } else {
      // No deferred prompt available, show manual instructions
      showManualInstallInstructions();
    }
  };
  
  const showManualInstallInstructions = () => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isAndroid = /Android/.test(navigator.userAgent);
    
    let instructions = 'To install this app:\n\n';
    
    if (isIOS) {
      instructions += '1. Tap the Share button (square with arrow)\n';
      instructions += '2. Select "Add to Home Screen"\n';
      instructions += '3. Tap "Add" to install';
    } else if (isAndroid) {
      instructions += '1. Tap the menu (⋮) in your browser\n';
      instructions += '2. Select "Add to Home screen" or "Install app"\n';
      instructions += '3. Follow the prompts to install';
    } else {
      instructions += '1. Look for an install button in your browser\'s address bar\n';
      instructions += '2. Or check your browser\'s menu for "Install" option\n';
      instructions += '3. Follow the prompts to install';
    }
    
    alert(instructions);
    handleDismiss();
  };

  const handleDismiss = () => {
    setShowInstallPrompt(false);
    // Remember user dismissed the prompt for 7 days
    const dismissedUntil = Date.now() + (7 * 24 * 60 * 60 * 1000);
    localStorage.setItem('pwa-install-dismissed', dismissedUntil.toString());
  };

  // Check if user dismissed recently
  const dismissedUntil = localStorage.getItem('pwa-install-dismissed');
  const isDismissed = dismissedUntil && Date.now() < parseInt(dismissedUntil);
  
  // Don't show if already installed, not prompted, or recently dismissed
  if (isInstalled || !showInstallPrompt || isDismissed) {
    return null;
  }

  return (
    <div className={`fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-50 ${
      colors.conditional(
        'bg-white text-gray-800 border-gray-200',
        'bg-gray-800 text-white border-gray-700'
      )
    } border rounded-lg shadow-lg p-4`}>
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-lg ${
          colors.conditional('bg-indigo-100', 'bg-indigo-600')
        }`}>
          <Download size={20} className={colors.conditional('text-indigo-600', 'text-white')} />
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
                colors.get('button.primary')
              }`}
            >
              Install
            </button>
            <button
              onClick={handleDismiss}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition ${
                colors.get('button.secondary')
              }`}
            >
              Maybe Later
            </button>
          </div>
        </div>
        
        <button
          onClick={handleDismiss}
          className={`p-1 rounded-md transition ${
            colors.conditional(
              'hover:bg-gray-100 text-gray-500',
              'hover:bg-gray-700 text-gray-400'
            )
          }`}
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default PWAInstaller;