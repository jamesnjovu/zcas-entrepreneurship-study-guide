import React, { Component } from 'react';
import { getThemeColor } from '../store';

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
        <div className={`min-h-screen flex items-center justify-center transition-colors ${getThemeColor(isDark, 'gradient.appBackground')}`}>
          <div className={`rounded-lg shadow-lg p-8 max-w-md mx-4 transition-colors ${getThemeColor(isDark, 'card.background')} ${isDark ? 'text-white border border-gray-700' : 'text-gray-800'}`}>
            <div className="text-center">
              <div className={`text-6xl mb-4 ${getThemeColor(isDark, 'status.error.text')}`}>⚠️</div>
              <h2 className={`text-2xl font-bold mb-4 transition-colors ${getThemeColor(isDark, 'status.error.text')}`}>
                Oops! Something went wrong
              </h2>
              <p className={`mb-6 leading-relaxed transition-colors ${getThemeColor(isDark, 'secondary')}`}>
                We encountered an unexpected error. Don't worry - your progress has been saved. Please refresh the page to continue studying.
              </p>
              <div className="space-y-3">
                <button
                  onClick={() => window.location.reload()}
                  className={`w-full px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 ${getThemeColor(isDark, 'button.primary')} text-white shadow-lg`}
                >
                  🔄 Refresh Page
                </button>
                <p className={`text-xs transition-colors ${getThemeColor(isDark, 'muted')}`}>
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