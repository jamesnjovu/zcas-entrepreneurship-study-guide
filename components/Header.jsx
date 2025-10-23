import { Home } from 'lucide-react';
import { useApp, useThemeColors } from '../store';

const Header = ({ currentView, onBackToHome }) => {
  const { theme: { isDark } } = useApp();
  const colors = useThemeColors(isDark);
  
  return (
    <div className={`${colors.backgroundPrimary} ${colors.primary} rounded-lg shadow-lg p-6 mb-6`}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-3xl font-bold ${colors.conditional('text-indigo-900', 'text-indigo-300')}`}>Innovation & Entrepreneurship</h1>
          <p className={`${colors.secondary} mt-2`}>ZCAS University Study Guide</p>
        </div>
        {currentView !== 'home' && (
          <button
            onClick={onBackToHome}
            className={`flex items-center gap-2 px-4 py-2 ${colors.get('button.primary')} rounded-lg transition`}
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