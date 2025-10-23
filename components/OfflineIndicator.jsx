import { useState, useEffect } from 'react';
import { WifiOff, Wifi, AlertTriangle } from 'lucide-react';
import { useApp, useThemeColors } from '../store';

const OfflineIndicator = () => {
  const { 
    theme: { isDark, mounted },
    offline: { isOnline, hasBeenOffline }
  } = useApp();
  
  const colors = useThemeColors(isDark);
  const [showReconnected, setShowReconnected] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Handle online/offline transitions with animations
  useEffect(() => {
    if (!mounted) return;
    
    if (!isOnline) {
      setIsVisible(true);
      setShowReconnected(false);
    } else if (hasBeenOffline && isOnline) {
      // Show reconnected message briefly
      setShowReconnected(true);
      setIsVisible(true);
      
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => setShowReconnected(false), 300); // Wait for fade out
      }, 3000);
      
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [isOnline, hasBeenOffline, mounted]);

  // Don't render anything during SSR or if never been offline and online
  if (!mounted || (!isVisible && !showReconnected)) return null;

  return (
    <div 
      className={`fixed bottom-4 right-4 z-50 transition-all duration-300 transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
      }`}
    >
      <div className={`p-4 rounded-lg shadow-lg border backdrop-blur-sm ${
        colors.get('card.background')} ${colors.get('card.border')}
      `}>
        {showReconnected ? (
          // Reconnected state
          <>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Wifi size={18} className={colors.get('status.success')} />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              </div>
              <span className={`text-sm font-semibold ${colors.get('status.success')}`}>
                Back online!
              </span>
            </div>
            <p className={`text-xs mt-2 ${colors.secondary}`}>
              All features are now available
            </p>
          </>
        ) : (
          // Offline state
          <>
            <div className="flex items-center gap-3">
              <div className="relative">
                <WifiOff size={18} className={colors.get('status.error')} />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              </div>
              <span className={`text-sm font-semibold ${colors.primary}`}>
                You're offline
              </span>
            </div>
            <div className={`flex items-start gap-2 mt-2`}>
              <AlertTriangle size={12} className={`${colors.get('status.warning')} mt-0.5 flex-shrink-0`} />
              <p className={`text-xs ${colors.secondary}`}>
                Some features may be limited. Content already loaded will still work.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OfflineIndicator;