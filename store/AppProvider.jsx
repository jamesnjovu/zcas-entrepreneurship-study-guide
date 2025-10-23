import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { appReducer, initialState } from './reducer.js';
import { 
  themeActions, 
  progressActions, 
  studyActions, 
  offlineActions, 
  appActions 
} from './actions.js';
import { statePersistence, createAutoSave } from './storage.js';
import { studyData } from '../data/studyData.js';

// Create context
const AppContext = createContext();

// App Provider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const autoSave = useCallback(createAutoSave(dispatch), [dispatch]);

  // Initialize app on mount
  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Load persisted state
        const persistedState = statePersistence.loadState();
        
        // Mark as mounted first to prevent hydration issues
        dispatch(themeActions.setMounted(true));
        
        // Apply theme after mount
        if (persistedState.theme?.theme) {
          dispatch(themeActions.setTheme(persistedState.theme.theme));
          // Use a small delay to ensure DOM is ready
          setTimeout(() => applyThemeToDOM(persistedState.theme.theme), 0);
        } else {
          // Detect system theme
          const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          dispatch(themeActions.setIsDark(systemDark));
          setTimeout(() => applyThemeToDOM('system'), 0);
        }
        
        // Load progress data
        if (persistedState.progress && Object.keys(persistedState.progress).length > 0) {
          dispatch(progressActions.loadProgress(persistedState.progress));
        }
        
        // Set up online/offline listeners
        const handleOnline = () => dispatch(offlineActions.setOnlineStatus(true));
        const handleOffline = () => dispatch(offlineActions.setOnlineStatus(false));
        
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);
        
        // Set initial online status
        dispatch(offlineActions.setOnlineStatus(navigator.onLine));
        
        // Mark as initialized (mounted was set earlier)
        dispatch(appActions.initializeApp());
        
        // Cleanup listeners
        return () => {
          window.removeEventListener('online', handleOnline);
          window.removeEventListener('offline', handleOffline);
        };
      } catch (error) {
        console.error('Error initializing app:', error);
        // Fallback initialization
        dispatch(themeActions.setMounted(true));
        dispatch(appActions.initializeApp());
      }
    };
    
    initializeApp();
  }, []);

  // Apply theme to DOM
  const applyThemeToDOM = useCallback((theme) => {
    if (typeof window === 'undefined') return;
    
    const root = document.documentElement;
    
    if (theme === 'dark') {
      root.classList.add('dark');
      dispatch(themeActions.setIsDark(true));
    } else if (theme === 'light') {
      root.classList.remove('dark');
      dispatch(themeActions.setIsDark(false));
    } else {
      // System theme
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (systemDark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
      dispatch(themeActions.setIsDark(systemDark));
    }
  }, []);

  // Auto-save state changes
  useEffect(() => {
    if (state.initialized) {
      autoSave(state);
    }
  }, [state, autoSave]);

  // Enhanced action dispatchers
  const actions = {
    // Theme actions
    setTheme: useCallback((theme) => {
      dispatch(themeActions.setTheme(theme));
      applyThemeToDOM(theme);
    }, [applyThemeToDOM]),

    toggleTheme: useCallback(() => {
      const newTheme = state.theme.isDark ? 'light' : 'dark';
      dispatch(themeActions.setTheme(newTheme));
      applyThemeToDOM(newTheme);
    }, [state.theme.isDark, applyThemeToDOM]),

    // Progress actions
    markTopicCompleted: useCallback((unitId, topicId) => {
      dispatch(progressActions.markTopicCompleted(unitId, topicId));
    }, []),

    saveQuizResult: useCallback((unitId, score, totalQuestions, answers) => {
      dispatch(progressActions.saveQuizResult(unitId, score, totalQuestions, answers));
    }, []),

    trackReadingTime: useCallback((unitId, topicId, timeSpent) => {
      dispatch(progressActions.trackReadingTime(unitId, topicId, timeSpent));
    }, []),

    clearProgress: useCallback(() => {
      dispatch(progressActions.clearProgress());
    }, []),

    // Study actions
    setCurrentView: useCallback((view) => {
      dispatch(studyActions.setCurrentView(view));
    }, []),

    selectUnit: useCallback((unit) => {
      dispatch(studyActions.selectUnit(unit));
    }, []),

    selectTopic: useCallback((topic) => {
      dispatch(studyActions.selectTopic(topic));
    }, []),

    setQuizAnswer: useCallback((questionIndex, answerIndex) => {
      dispatch(studyActions.setQuizAnswer(questionIndex, answerIndex));
    }, []),

    submitQuiz: useCallback((answers) => {
      return dispatch(studyActions.submitQuiz(answers));
    }, []),

    resetQuiz: useCallback(() => {
      dispatch(studyActions.resetQuiz());
    }, []),

    navigateToNextTopic: useCallback(() => {
      dispatch(studyActions.navigateTopic('next'));
    }, []),

    navigateToPreviousTopic: useCallback(() => {
      dispatch(studyActions.navigateTopic('previous'));
    }, []),

    navigateToNextUnit: useCallback(() => {
      dispatch(studyActions.navigateToNextUnit());
    }, []),

    // Navigation helpers
    goHome: useCallback(() => {
      dispatch(studyActions.setCurrentView('home'));
    }, []),

    goToSettings: useCallback(() => {
      dispatch(studyActions.setCurrentView('settings'));
    }, []),

    goToProgress: useCallback(() => {
      dispatch(studyActions.setCurrentView('progress'));
    }, []),

    goToPastExams: useCallback(() => {
      dispatch(studyActions.setCurrentView('pastExam'));
    }, []),

    startQuiz: useCallback(() => {
      dispatch(studyActions.resetQuiz());
    }, []),

    backToTopics: useCallback(() => {
      dispatch(studyActions.setCurrentView('topics'));
    }, []),
  };

  // Computed values
  const computed = {
    // Progress computed values
    getProgressStats: useCallback(() => {
      const progress = state.progress;
      const totalReadingTime = Object.values(progress.readingTime).reduce((sum, time) => sum + time, 0);
      const averageQuizScore = progress.quizResults.length > 0
        ? progress.quizResults.reduce((sum, result) => sum + result.percentage, 0) / progress.quizResults.length
        : 0;
      
      return {
        completedTopicsCount: progress.completedTopics.length,
        totalQuizzesTaken: progress.quizResults.length,
        averageQuizScore: Math.round(averageQuizScore),
        totalReadingTime: Math.round(totalReadingTime / 60), // Convert to minutes
        lastActivity: progress.lastActivity,
      };
    }, [state.progress]),

    isTopicCompleted: useCallback((unitId, topicId) => {
      const topicKey = `${unitId}-${topicId}`;
      return state.progress.completedTopics.includes(topicKey);
    }, [state.progress.completedTopics]),

    getQuizResults: useCallback((unitId = null) => {
      if (unitId) {
        return state.progress.quizResults.filter(result => result.unitId === unitId);
      }
      return state.progress.quizResults;
    }, [state.progress.quizResults]),

    // Study computed values
    isFirstTopic: useCallback(() => {
      if (!state.study.selectedUnit || !state.study.selectedTopic) return true;
      return state.study.selectedUnit.topics.findIndex(
        topic => topic.id === state.study.selectedTopic.id
      ) === 0;
    }, [state.study.selectedUnit, state.study.selectedTopic]),

    isLastTopic: useCallback(() => {
      if (!state.study.selectedUnit || !state.study.selectedTopic) return true;
      const topics = state.study.selectedUnit.topics;
      return topics.findIndex(
        topic => topic.id === state.study.selectedTopic.id
      ) === topics.length - 1;
    }, [state.study.selectedUnit, state.study.selectedTopic]),

    hasNextUnit: useCallback(() => {
      if (!state.study.selectedUnit) return false;
      const currentUnitIndex = studyData.units.findIndex(
        unit => unit.id === state.study.selectedUnit.id
      );
      return currentUnitIndex >= 0 && currentUnitIndex < studyData.units.length - 1;
    }, [state.study.selectedUnit]),

    getNextUnit: useCallback(() => {
      if (!state.study.selectedUnit) return null;
      const currentUnitIndex = studyData.units.findIndex(
        unit => unit.id === state.study.selectedUnit.id
      );
      if (currentUnitIndex >= 0 && currentUnitIndex < studyData.units.length - 1) {
        return studyData.units[currentUnitIndex + 1];
      }
      return null;
    }, [state.study.selectedUnit]),
  };

  const contextValue = {
    // State
    ...state,
    
    // Actions
    ...actions,
    
    // Computed values
    ...computed,
    
    // Raw dispatch for advanced usage
    dispatch,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

// Hook to use the app context
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};