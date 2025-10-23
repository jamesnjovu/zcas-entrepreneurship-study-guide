import React from 'react';
import { useApp, useThemeColors } from '../store';

/**
 * Example component demonstrating different ways to use centralized theme colors
 * This component shows all the different patterns for using the theme system
 */
const ThemeExample = () => {
  const { theme: { isDark } } = useApp();
  const colors = useThemeColors(isDark);

  return (
    <div className={`p-6 ${colors.backgroundPrimary}`}>
      <h1 className={`text-2xl font-bold mb-4 ${colors.primary}`}>
        Theme System Examples
      </h1>
      
      {/* Method 1: Direct property access */}
      <div className={`p-4 mb-4 rounded ${colors.backgroundSecondary}`}>
        <h2 className={colors.primary}>Method 1: Direct Properties</h2>
        <p className={colors.secondary}>Using colors.primary, colors.secondary, etc.</p>
        <p className={colors.muted}>This is muted text</p>
      </div>

      {/* Method 2: Using the get() function with dot notation */}
      <div className={`p-4 mb-4 rounded ${colors.get('background.secondary')}`}>
        <h2 className={colors.get('primary')}>Method 2: Get Function</h2>
        <p className={colors.get('secondary')}>Using colors.get('path.to.color')</p>
        <button className={`px-4 py-2 rounded ${colors.get('button.primary')}`}>
          Primary Button
        </button>
        <button className={`px-4 py-2 rounded ml-2 ${colors.get('button.secondary')}`}>
          Secondary Button
        </button>
      </div>

      {/* Method 3: Using conditional helper */}
      <div className={`p-4 mb-4 rounded ${colors.conditional('bg-gray-100', 'bg-gray-700')}`}>
        <h2 className={colors.conditional('text-gray-800', 'text-gray-200')}>
          Method 3: Conditional Helper
        </h2>
        <p className={colors.conditional('text-gray-600', 'text-gray-300')}>
          Using colors.conditional(lightClasses, darkClasses)
        </p>
      </div>

      {/* Method 4: Status colors */}
      <div className="space-y-4">
        <div className={`p-4 rounded border-l-4 ${colors.get('status.info.background')} ${colors.get('status.info.border')}`}>
          <h3 className={colors.get('status.info.text')}>Info Status</h3>
          <p className={colors.get('status.info.text')}>This is an info message</p>
        </div>

        <div className={`p-4 rounded border-l-4 ${colors.get('status.warning.background')} ${colors.get('status.warning.border')}`}>
          <h3 className={colors.get('status.warning.text')}>Warning Status</h3>
          <p className={colors.get('status.warning.textSecondary')}>This is a warning message</p>
        </div>

        <div className={`p-4 rounded border-l-4 ${colors.get('status.success.background')} ${colors.get('status.success.border')}`}>
          <h3 className={colors.get('status.success.text')}>Success Status</h3>
          <p className={colors.get('status.success.textSecondary')}>This is a success message</p>
        </div>
      </div>

      {/* Method 5: Gradients */}
      <div className={`p-6 mt-4 rounded text-white ${colors.get('gradient.header.exam')}`}>
        <h2>Gradient Example</h2>
        <p>Using predefined gradients from the theme system</p>
      </div>

      {/* Method 6: Interactive elements */}
      <div className="mt-4 space-x-2">
        <button className={`p-2 rounded transition ${colors.get('interactive.hover')}`}>
          Hover Button
        </button>
        <input 
          className={`p-2 border rounded ${colors.get('border.primary')} ${colors.get('interactive.focus')}`}
          placeholder="Focus me for ring effect"
        />
      </div>

      {/* Progress bar example */}
      <div className="mt-4">
        <div className={`w-full h-2 rounded ${colors.get('progress.background')}`}>
          <div className={`w-1/2 h-2 rounded ${colors.get('progress.bar')}`}></div>
        </div>
        <p className={`text-sm mt-1 ${colors.get('progress.text')}`}>Progress: 50%</p>
      </div>
    </div>
  );
};

export default ThemeExample;