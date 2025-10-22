import { Home } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const Header = ({ currentView, onBackToHome }) => {
  const { isDark } = useTheme();
  
  return (
    <div className={`${isDark ? 'bg-gray-800 text-white' : 'bg-white'} rounded-lg shadow-lg p-6 mb-6`}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-3xl font-bold ${isDark ? 'text-indigo-300' : 'text-indigo-900'}`}>Innovation & Entrepreneurship</h1>
          <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mt-2`}>ZCAS University Study Guide</p>
        </div>
        {currentView !== 'home' && (
          <button
            onClick={onBackToHome}
            className={`flex items-center gap-2 px-4 py-2 ${isDark ? 'bg-indigo-500 hover:bg-indigo-600' : 'bg-indigo-600 hover:bg-indigo-700'} text-white rounded-lg transition`}
          >
            <Home size={20} />
            Home
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;