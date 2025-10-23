import { useApp } from '../store';

const LoadingSpinner = ({ message = "Loading..." }) => {
  const { theme: { isDark, mounted } } = useApp();

  // Apply theme even when not mounted
  if (!mounted) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-gradient-to-br from-blue-50 to-indigo-100'}`}>
        <div className={`rounded-lg shadow-lg p-8 text-center ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
          <div className={`animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4 ${isDark ? 'border-indigo-400' : 'border-indigo-600'}`}></div>
          <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>{message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-gradient-to-br from-blue-50 to-indigo-100'}`}>
      <div className={`rounded-lg shadow-lg p-8 text-center ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
        <div className={`animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4 ${isDark ? 'border-indigo-400' : 'border-indigo-600'}`}></div>
        <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>{message}</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;