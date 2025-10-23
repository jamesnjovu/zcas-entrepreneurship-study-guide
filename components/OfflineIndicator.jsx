import { Wifi, WifiOff } from 'lucide-react';
import { useApp } from '../store';

const OfflineIndicator = () => {
  const { 
    theme: { isDark },
    offline: { isOnline }
  } = useApp();

  if (isOnline) return null;

  return (
    <div className={`fixed bottom-4 right-4 z-50 p-3 rounded-lg shadow-lg border ${isDark ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-200 text-gray-800'}`}>
      <div className="flex items-center gap-2">
        <WifiOff size={16} className="text-red-500" />
        <span className="text-sm font-medium">You're offline</span>
      </div>
      <p className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
        Some features may be limited
      </p>
    </div>
  );
};

export default OfflineIndicator;