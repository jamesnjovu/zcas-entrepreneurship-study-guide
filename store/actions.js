// Theme Actions
export const THEME_ACTIONS = {
  SET_THEME: 'THEME/SET_THEME',
  TOGGLE_THEME: 'THEME/TOGGLE_THEME',
  SET_MOUNTED: 'THEME/SET_MOUNTED',
  SET_IS_DARK: 'THEME/SET_IS_DARK',
};

// Progress Actions
export const PROGRESS_ACTIONS = {
  LOAD_PROGRESS: 'PROGRESS/LOAD_PROGRESS',
  MARK_TOPIC_COMPLETED: 'PROGRESS/MARK_TOPIC_COMPLETED',
  SAVE_QUIZ_RESULT: 'PROGRESS/SAVE_QUIZ_RESULT',
  TRACK_READING_TIME: 'PROGRESS/TRACK_READING_TIME',
  CLEAR_PROGRESS: 'PROGRESS/CLEAR_PROGRESS',
};

// Study Actions
export const STUDY_ACTIONS = {
  SET_CURRENT_VIEW: 'STUDY/SET_CURRENT_VIEW',
  SELECT_UNIT: 'STUDY/SELECT_UNIT',
  SELECT_TOPIC: 'STUDY/SELECT_TOPIC',
  SET_QUIZ_ANSWER: 'STUDY/SET_QUIZ_ANSWER',
  SUBMIT_QUIZ: 'STUDY/SUBMIT_QUIZ',
  RESET_QUIZ: 'STUDY/RESET_QUIZ',
  NAVIGATE_TOPIC: 'STUDY/NAVIGATE_TOPIC',
  NAVIGATE_TO_NEXT_UNIT: 'STUDY/NAVIGATE_TO_NEXT_UNIT',
};

// Offline Actions
export const OFFLINE_ACTIONS = {
  SET_ONLINE_STATUS: 'OFFLINE/SET_ONLINE_STATUS',
  SET_HAS_BEEN_OFFLINE: 'OFFLINE/SET_HAS_BEEN_OFFLINE',
};

// App Actions
export const APP_ACTIONS = {
  INITIALIZE_APP: 'APP/INITIALIZE_APP',
  HYDRATE_STATE: 'APP/HYDRATE_STATE',
};

// Action Creators
export const themeActions = {
  setTheme: (theme) => ({ type: THEME_ACTIONS.SET_THEME, payload: theme }),
  toggleTheme: () => ({ type: THEME_ACTIONS.TOGGLE_THEME }),
  setMounted: (mounted) => ({ type: THEME_ACTIONS.SET_MOUNTED, payload: mounted }),
  setIsDark: (isDark) => ({ type: THEME_ACTIONS.SET_IS_DARK, payload: isDark }),
};

export const progressActions = {
  loadProgress: (progress) => ({ type: PROGRESS_ACTIONS.LOAD_PROGRESS, payload: progress }),
  markTopicCompleted: (unitId, topicId) => ({ 
    type: PROGRESS_ACTIONS.MARK_TOPIC_COMPLETED, 
    payload: { unitId, topicId } 
  }),
  saveQuizResult: (unitId, score, totalQuestions, answers) => ({ 
    type: PROGRESS_ACTIONS.SAVE_QUIZ_RESULT, 
    payload: { unitId, score, totalQuestions, answers } 
  }),
  trackReadingTime: (unitId, topicId, timeSpent) => ({ 
    type: PROGRESS_ACTIONS.TRACK_READING_TIME, 
    payload: { unitId, topicId, timeSpent } 
  }),
  clearProgress: () => ({ type: PROGRESS_ACTIONS.CLEAR_PROGRESS }),
};

export const studyActions = {
  setCurrentView: (view) => ({ type: STUDY_ACTIONS.SET_CURRENT_VIEW, payload: view }),
  selectUnit: (unit) => ({ type: STUDY_ACTIONS.SELECT_UNIT, payload: unit }),
  selectTopic: (topic) => ({ type: STUDY_ACTIONS.SELECT_TOPIC, payload: topic }),
  setQuizAnswer: (questionIndex, answerIndex) => ({ 
    type: STUDY_ACTIONS.SET_QUIZ_ANSWER, 
    payload: { questionIndex, answerIndex } 
  }),
  submitQuiz: (answers) => ({ type: STUDY_ACTIONS.SUBMIT_QUIZ, payload: answers }),
  resetQuiz: () => ({ type: STUDY_ACTIONS.RESET_QUIZ }),
  navigateTopic: (direction) => ({ type: STUDY_ACTIONS.NAVIGATE_TOPIC, payload: direction }),
  navigateToNextUnit: () => ({ type: STUDY_ACTIONS.NAVIGATE_TO_NEXT_UNIT }),
};

export const offlineActions = {
  setOnlineStatus: (isOnline) => ({ type: OFFLINE_ACTIONS.SET_ONLINE_STATUS, payload: isOnline }),
  setHasBeenOffline: (hasBeenOffline) => ({ type: OFFLINE_ACTIONS.SET_HAS_BEEN_OFFLINE, payload: hasBeenOffline }),
};

export const appActions = {
  initializeApp: () => ({ type: APP_ACTIONS.INITIALIZE_APP }),
  hydrateState: (state) => ({ type: APP_ACTIONS.HYDRATE_STATE, payload: state }),
};