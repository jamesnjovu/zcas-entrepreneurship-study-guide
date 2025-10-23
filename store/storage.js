/**
 * Centralized localStorage management
 */

// Storage keys
const STORAGE_KEYS = {
  THEME: 'theme',
  PROGRESS: 'studyProgress',
  SETTINGS: 'appSettings',
};

// Storage utilities
export const storage = {
  // Get data from localStorage
  get: (key) => {
    if (typeof window === 'undefined') return null;
    
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.warn(`Error reading from localStorage (${key}):`, error);
      return null;
    }
  },

  // Set data to localStorage
  set: (key, value) => {
    if (typeof window === 'undefined') return false;
    
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.warn(`Error writing to localStorage (${key}):`, error);
      return false;
    }
  },

  // Remove data from localStorage
  remove: (key) => {
    if (typeof window === 'undefined') return false;
    
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.warn(`Error removing from localStorage (${key}):`, error);
      return false;
    }
  },

  // Clear all app data
  clear: () => {
    if (typeof window === 'undefined') return false;
    
    try {
      Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key);
      });
      return true;
    } catch (error) {
      console.warn('Error clearing localStorage:', error);
      return false;
    }
  },
};

// Specific storage functions
export const themeStorage = {
  get: () => storage.get(STORAGE_KEYS.THEME),
  set: (theme) => storage.set(STORAGE_KEYS.THEME, theme),
};

export const progressStorage = {
  get: () => storage.get(STORAGE_KEYS.PROGRESS),
  set: (progress) => storage.set(STORAGE_KEYS.PROGRESS, progress),
  clear: () => storage.remove(STORAGE_KEYS.PROGRESS),
};

export const settingsStorage = {
  get: () => storage.get(STORAGE_KEYS.SETTINGS),
  set: (settings) => storage.set(STORAGE_KEYS.SETTINGS, settings),
};

// State persistence manager
export const statePersistence = {
  // Save app state to localStorage
  saveState: (state) => {
    const success = {
      theme: themeStorage.set(state.theme.theme),
      progress: progressStorage.set(state.progress),
    };
    
    return Object.values(success).every(Boolean);
  },

  // Load app state from localStorage
  loadState: () => {
    const savedTheme = themeStorage.get();
    const savedProgress = progressStorage.get();
    
    return {
      theme: savedTheme ? { theme: savedTheme } : {},
      progress: savedProgress || {},
    };
  },

  // Clear all persisted state
  clearState: () => {
    const success = [
      themeStorage.set('system'), // Reset to system theme instead of clearing
      progressStorage.clear(),
    ];
    
    return success.every(Boolean);
  },
};

// Auto-save functionality
export const createAutoSave = (dispatch) => {
  let saveTimeout = null;
  
  return (state) => {
    // Debounce saves to avoid excessive localStorage writes
    if (saveTimeout) {
      clearTimeout(saveTimeout);
    }
    
    saveTimeout = setTimeout(() => {
      statePersistence.saveState(state);
    }, 500); // Save 500ms after last state change
  };
};