import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  // Check if dark mode is enabled from localStorage (consistent with global state)
  isDarkMode() {
    if (typeof window !== 'undefined') {
      try {
        // Try to get the state from localStorage (same as global state persistence)
        const savedState = localStorage.getItem('study-guide-app-state');
        if (savedState) {
          const parsedState = JSON.parse(savedState);
          if (parsedState.theme?.theme) {
            const theme = parsedState.theme.theme;
            if (theme === 'dark') return true;
            if (theme === 'light') return false;
            if (theme === 'system') {
              return window.matchMedia('(prefers-color-scheme: dark)').matches;
            }
          }
        }
        
        // Fallback to legacy localStorage
        const legacyTheme = localStorage.getItem('theme');
        if (legacyTheme === 'dark') return true;
        if (legacyTheme === 'light') return false;
        
        // System preference fallback
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
      } catch (error) {
        console.error('Error reading theme from localStorage:', error);
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
      }
    }
    return false;
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      const isDark = this.isDarkMode();
      
      return (
        <div className={`min-h-screen flex items-center justify-center transition-colors ${isDark ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-gradient-to-br from-blue-50 to-indigo-100'}`}>
          <div className={`rounded-lg shadow-lg p-8 max-w-md mx-4 transition-colors ${isDark ? 'bg-gray-800 text-white border border-gray-700' : 'bg-white text-gray-800'}`}>
            <div className="text-center">
              <div className={`text-6xl mb-4 ${isDark ? 'text-red-400' : 'text-red-500'}`}>⚠️</div>
              <h2 className={`text-2xl font-bold mb-4 transition-colors ${isDark ? 'text-red-300' : 'text-red-600'}`}>
                Oops! Something went wrong
              </h2>
              <p className={`mb-6 leading-relaxed transition-colors ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                We encountered an unexpected error. Don't worry - your progress has been saved. Please refresh the page to continue studying.
              </p>
              <div className="space-y-3">
                <button
                  onClick={() => window.location.reload()}
                  className={`w-full px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 ${
                    isDark 
                      ? 'bg-indigo-600 hover:bg-indigo-500 focus:ring-4 focus:ring-indigo-800' 
                      : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300'
                  } text-white shadow-lg`}
                >
                  🔄 Refresh Page
                </button>
                <p className={`text-xs transition-colors ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Your study progress is automatically saved
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;