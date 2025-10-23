import { useApp, useThemeColors } from '../store';

const LoadingSpinner = ({ message = "Loading..." }) => {
  const { theme: { isDark, mounted } } = useApp();
  const colors = useThemeColors(isDark);

  // Apply theme even when not mounted
  if (!mounted) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${colors.get('gradient.appBackground')}`}>
        <div className={`rounded-lg shadow-lg p-8 text-center ${colors.get('card.background')}`}>
          <div className={`animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4 ${colors.conditional('border-indigo-600', 'border-indigo-400')}`}></div>
          <p className={colors.get('secondary')}>{message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex items-center justify-center ${colors.get('gradient.appBackground')}`}>
      <div className={`rounded-lg shadow-lg p-8 text-center ${colors.get('card.background')}`}>
        <div className={`animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4 ${colors.conditional('border-indigo-600', 'border-indigo-400')}`}></div>
        <p className={colors.get('secondary')}>{message}</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;