import { useApp } from '../store';

const InitialLoader = () => {
  const { theme: { isDark, mounted } } = useApp();
  
  // Apply dark mode classes even when not mounted
  if (!mounted) {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-colors ${isDark ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-gradient-to-br from-blue-50 to-indigo-100'}`}>
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className={`rounded-lg shadow-lg p-8 text-center transition-colors ${isDark ? 'bg-gray-800 text-white border border-gray-700' : 'bg-white text-gray-800'}`}>
            <div className="flex items-center justify-center mb-4">
              <div className={`animate-spin rounded-full h-12 w-12 border-b-2 transition-colors ${isDark ? 'border-indigo-400' : 'border-indigo-600'}`}></div>
            </div>
            <h2 className={`text-2xl font-bold mb-2 transition-colors ${isDark ? 'text-indigo-300' : 'text-indigo-900'}`}>
              Innovation & Entrepreneurship
            </h2>
            <p className={`transition-colors ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              ZCAS University Study Guide
            </p>
            <div className={`mt-4 text-sm transition-colors ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Loading your study materials...
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex items-center justify-center transition-colors ${isDark ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-gradient-to-br from-blue-50 to-indigo-100'}`}>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className={`rounded-lg shadow-lg p-8 text-center transition-colors ${isDark ? 'bg-gray-800 text-white border border-gray-700' : 'bg-white text-gray-800'}`}>
          <div className="flex items-center justify-center mb-4">
            <div className={`animate-spin rounded-full h-12 w-12 border-b-2 transition-colors ${isDark ? 'border-indigo-400' : 'border-indigo-600'}`}></div>
          </div>
          <h2 className={`text-2xl font-bold mb-2 transition-colors ${isDark ? 'text-indigo-300' : 'text-indigo-900'}`}>
            Innovation & Entrepreneurship
          </h2>
          <p className={`transition-colors ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            ZCAS University Study Guide
          </p>
          <div className={`mt-4 text-sm transition-colors ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Loading your study materials...
          </div>
        </div>
      </div>
    </div>
  );
};

export default InitialLoader;