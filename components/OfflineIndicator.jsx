import { Wifi, WifiOff } from 'lucide-react';
import { useOffline } from '../hooks/useOffline';
import { useTheme } from '../hooks/useTheme';

const OfflineIndicator = () => {
  const { isOnline } = useOffline();
  const { isDark } = useTheme();

  if (isOnline) return null;

  return (
    <div className={`fixed bottom-4 right-4 z-50 p-3 rounded-lg shadow-lg border ${isDark ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-200 text-gray-800'}`}>
      <div className="flex items-center gap-2">
        <WifiOff size={16} className="text-red-500" />
        <span className="text-sm font-medium">You're offline</span>
      </div>
      <p className="text-xs text-gray-500 mt-1">
        Some features may be limited
      </p>
    </div>
  );
};

export default OfflineIndicator;