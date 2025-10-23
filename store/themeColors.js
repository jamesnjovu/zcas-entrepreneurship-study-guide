/**
 * Centralized theme color management
 * This file contains all theme-specific colors used throughout the application
 * to maintain consistency and enable easy theme updates
 */

export const themeColors = {
  // Primary colors
  primary: {
    light: 'text-indigo-900',
    dark: 'text-indigo-300'
  },
  
  // Secondary text colors
  secondary: {
    light: 'text-gray-600',
    dark: 'text-gray-300'
  },
  
  // Muted text colors
  muted: {
    light: 'text-gray-500',
    dark: 'text-gray-400'
  },
  
  // Background colors
  background: {
    primary: {
      light: 'bg-white',
      dark: 'bg-gray-800'
    },
    secondary: {
      light: 'bg-gray-50',
      dark: 'bg-gray-700'
    },
    tertiary: {
      light: 'bg-gray-100',
      dark: 'bg-gray-600'
    }
  },
  
  // Border colors
  border: {
    primary: {
      light: 'border-gray-200',
      dark: 'border-gray-600'
    },
    secondary: {
      light: 'border-gray-100',
      dark: 'border-gray-700'
    }
  },
  
  // Button colors
  button: {
    primary: {
      light: 'bg-indigo-600 text-white hover:bg-indigo-700',
      dark: 'bg-indigo-600 text-white hover:bg-indigo-500'
    },
    secondary: {
      light: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
      dark: 'bg-gray-700 text-gray-200 hover:bg-gray-600'
    },
    accent: {
      light: 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200',
      dark: 'bg-indigo-900 bg-opacity-50 text-indigo-300 hover:bg-indigo-800 hover:bg-opacity-60'
    },
    success: {
      light: 'bg-green-600 text-white hover:bg-green-700',
      dark: 'bg-green-700 text-white hover:bg-green-600'
    }
  },
  
  // Card/Container gradients
  gradient: {
    card: {
      light: 'bg-gradient-to-br from-indigo-50 to-purple-50',
      dark: 'bg-gradient-to-br from-gray-700 to-gray-600'
    },
    cardHover: {
      light: 'hover:bg-gradient-to-br hover:from-indigo-100 hover:to-purple-100',
      dark: 'hover:bg-gradient-to-br hover:from-gray-600 hover:to-gray-500'
    },
    header: {
      exam: {
        light: 'bg-gradient-to-r from-indigo-500 to-purple-600',
        dark: 'bg-gradient-to-r from-indigo-600 to-purple-700'
      },
      section: {
        light: 'bg-gradient-to-r from-purple-500 to-pink-600',
        dark: 'bg-gradient-to-r from-purple-600 to-pink-700'
      }
    }
  },
  
  // Interactive element colors
  interactive: {
    hover: {
      light: 'hover:bg-blue-100 text-blue-600',
      dark: 'hover:bg-gray-700 text-blue-400'
    },
    focus: {
      light: 'focus:ring-2 focus:ring-indigo-500',
      dark: 'focus:ring-2 focus:ring-indigo-400'
    }
  },

  // Exam card specific colors
  examCard: {
    year: {
      light: 'text-indigo-700',
      dark: 'text-indigo-300'
    },
    yearIcon: {
      light: 'text-indigo-600',
      dark: 'text-indigo-400'
    },
    title: {
      light: 'text-gray-800 group-hover:text-indigo-700',
      dark: 'text-gray-100 group-hover:text-indigo-300'
    },
    actionText: {
      light: 'text-gray-500',
      dark: 'text-gray-400'
    },
    chevron: {
      light: 'text-indigo-400 group-hover:text-indigo-600',
      dark: 'text-indigo-400 group-hover:text-indigo-300'
    },
    border: {
      light: 'border-indigo-100 hover:border-indigo-300',
      dark: 'border-gray-600 hover:border-indigo-400'
    }
  },
  
  // Status/notification colors
  status: {
    info: {
      background: {
        light: 'bg-blue-50',
        dark: 'bg-blue-900 bg-opacity-30'
      },
      text: {
        light: 'text-blue-800',
        dark: 'text-blue-200'
      },
      border: {
        light: 'border-blue-400',
        dark: 'border-blue-500'
      }
    },
    warning: {
      background: {
        light: 'bg-yellow-50',
        dark: 'bg-yellow-900 bg-opacity-30'
      },
      text: {
        light: 'text-yellow-800',
        dark: 'text-yellow-200'
      },
      textSecondary: {
        light: 'text-yellow-700',
        dark: 'text-yellow-100'
      },
      border: {
        light: 'border-yellow-400',
        dark: 'border-yellow-500'
      }
    },
    success: {
      background: {
        light: 'bg-green-50',
        dark: 'bg-green-900 bg-opacity-30'
      },
      text: {
        light: 'text-green-800',
        dark: 'text-green-300'
      },
      textSecondary: {
        light: 'text-green-700',
        dark: 'text-green-200'
      },
      border: {
        light: 'border-green-200',
        dark: 'border-green-600'
      }
    },
    error: {
      background: {
        light: 'bg-red-50',
        dark: 'bg-red-900 bg-opacity-30'
      },
      text: {
        light: 'text-red-800',
        dark: 'text-red-300'
      },
      border: {
        light: 'border-red-200',
        dark: 'border-red-600'
      }
    },
    purple: {
      background: {
        light: 'bg-purple-50',
        dark: 'bg-purple-900 bg-opacity-30'
      },
      text: {
        light: 'text-gray-800',
        dark: 'text-purple-200'
      },
      textSecondary: {
        light: 'text-gray-700',
        dark: 'text-purple-100'
      },
      border: {
        light: 'border-purple-400',
        dark: 'border-purple-500'
      }
    },
    indigo: {
      background: {
        light: 'bg-indigo-50',
        dark: 'bg-indigo-900 bg-opacity-30'
      },
      text: {
        light: 'text-indigo-800',
        dark: 'text-indigo-200'
      },
      border: {
        light: 'border-indigo-400',
        dark: 'border-indigo-500'
      }
    }
  },
  
  // Progress bar colors
  progress: {
    background: {
      light: 'bg-gray-200',
      dark: 'bg-gray-600'
    },
    bar: 'bg-indigo-600', // Same for both themes
    text: {
      light: 'text-gray-700',
      dark: 'text-gray-200'
    },
    textSecondary: {
      light: 'text-gray-600',
      dark: 'text-gray-300'
    }
  },

  // Common component patterns
  card: {
    background: {
      light: 'bg-white',
      dark: 'bg-gray-800'
    },
    border: {
      light: 'border-gray-200',
      dark: 'border-gray-600'
    },
    shadow: 'shadow-lg' // Same for both themes
  },

  // Input/form colors
  input: {
    background: {
      light: 'bg-white',
      dark: 'bg-gray-700'
    },
    border: {
      light: 'border-gray-300',
      dark: 'border-gray-600'
    },
    text: {
      light: 'text-gray-900',
      dark: 'text-gray-100'
    },
    placeholder: {
      light: 'placeholder-gray-500',
      dark: 'placeholder-gray-400'
    }
  }
};

/**
 * Helper function to get theme-specific color classes
 * @param {boolean} isDark - Whether dark mode is active
 * @param {string} colorPath - Dot notation path to the color (e.g., 'primary.light')
 * @returns {string} The appropriate CSS classes for the current theme
 */
export const getThemeColor = (isDark, colorPath) => {
  const keys = colorPath.split('.');
  let current = themeColors;
  
  // Navigate to the color object
  for (let i = 0; i < keys.length; i++) {
    if (current[keys[i]]) {
      current = current[keys[i]];
    } else {
      console.warn(`Theme color path not found: ${colorPath}`);
      return '';
    }
  }
  
  // If we have light/dark variants, return the appropriate one
  if (current.light && current.dark) {
    return isDark ? current.dark : current.light;
  }
  
  // If it's a single color (like progress.bar), return it directly
  if (typeof current === 'string') {
    return current;
  }
  
  console.warn(`Invalid theme color structure at: ${colorPath}`);
  return '';
};

/**
 * Hook-like helper for components to use theme colors
 * @param {boolean} isDark - Whether dark mode is active
 * @returns {object} Object with helper functions for getting theme colors
 */
export const useThemeColors = (isDark) => {
  return {
    /**
     * Get a theme color by path
     * @param {string} path - Dot notation path to the color
     * @returns {string} CSS classes for the color
     */
    get: (path) => getThemeColor(isDark, path),
    
    /**
     * Get multiple theme colors at once
     * @param {string[]} paths - Array of color paths
     * @returns {string[]} Array of CSS classes
     */
    getMultiple: (paths) => paths.map(path => getThemeColor(isDark, path)),
    
    /**
     * Conditional theme classes helper
     * @param {string} lightClasses - Classes for light theme
     * @param {string} darkClasses - Classes for dark theme
     * @returns {string} Appropriate classes for current theme
     */
    conditional: (lightClasses, darkClasses) => isDark ? darkClasses : lightClasses,
    
    // Direct access to common color patterns
    primary: isDark ? themeColors.primary.dark : themeColors.primary.light,
    secondary: isDark ? themeColors.secondary.dark : themeColors.secondary.light,
    muted: isDark ? themeColors.muted.dark : themeColors.muted.light,
    backgroundPrimary: isDark ? themeColors.background.primary.dark : themeColors.background.primary.light,
    backgroundSecondary: isDark ? themeColors.background.secondary.dark : themeColors.background.secondary.light
  };
};