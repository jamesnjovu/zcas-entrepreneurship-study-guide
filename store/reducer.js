import { 
  THEME_ACTIONS, 
  PROGRESS_ACTIONS, 
  STUDY_ACTIONS, 
  OFFLINE_ACTIONS, 
  APP_ACTIONS 
} from './actions.js';
import { studyData } from '../data/studyData.js';

// Initial state
export const initialState = {
  theme: {
    theme: 'system',
    isDark: false,
    mounted: false,
  },
  progress: {
    completedTopics: [],
    quizResults: [],
    readingTime: {},
    lastActivity: null,
  },
  study: {
    currentView: 'home',
    selectedUnit: null,
    selectedTopic: null,
    quizAnswers: {},
    quizSubmitted: false,
    quizScore: null,
  },
  offline: {
    isOnline: true,
    hasBeenOffline: false,
  },
  initialized: false,
};

// Theme reducer
const themeReducer = (state, action) => {
  switch (action.type) {
    case THEME_ACTIONS.SET_THEME:
      return {
        ...state,
        theme: action.payload,
      };
    case THEME_ACTIONS.SET_IS_DARK:
      return {
        ...state,
        isDark: action.payload,
      };
    case THEME_ACTIONS.SET_MOUNTED:
      return {
        ...state,
        mounted: action.payload,
      };
    case THEME_ACTIONS.TOGGLE_THEME:
      const newTheme = state.isDark ? 'light' : 'dark';
      return {
        ...state,
        theme: newTheme,
      };
    default:
      return state;
  }
};

// Progress reducer
const progressReducer = (state, action) => {
  switch (action.type) {
    case PROGRESS_ACTIONS.LOAD_PROGRESS:
      return {
        ...state,
        ...action.payload,
      };
    case PROGRESS_ACTIONS.MARK_TOPIC_COMPLETED: {
      const { unitId, topicId } = action.payload;
      const topicKey = `${unitId}-${topicId}`;
      const newCompletedTopics = state.completedTopics.includes(topicKey)
        ? state.completedTopics
        : [...state.completedTopics, topicKey];
      
      return {
        ...state,
        completedTopics: newCompletedTopics,
        lastActivity: new Date().toISOString(),
      };
    }
    case PROGRESS_ACTIONS.SAVE_QUIZ_RESULT: {
      const { unitId, score, totalQuestions, answers } = action.payload;
      const quizResult = {
        id: Date.now(),
        unitId,
        score,
        totalQuestions,
        percentage: Math.round((score / totalQuestions) * 100),
        answers,
        completedAt: new Date().toISOString(),
      };
      
      return {
        ...state,
        quizResults: [...state.quizResults, quizResult],
        lastActivity: new Date().toISOString(),
      };
    }
    case PROGRESS_ACTIONS.TRACK_READING_TIME: {
      const { unitId, topicId, timeSpent } = action.payload;
      if (!unitId || !topicId || timeSpent <= 0) return state;
      
      const topicKey = `${unitId}-${topicId}`;
      return {
        ...state,
        readingTime: {
          ...state.readingTime,
          [topicKey]: (state.readingTime[topicKey] || 0) + timeSpent,
        },
        lastActivity: new Date().toISOString(),
      };
    }
    case PROGRESS_ACTIONS.CLEAR_PROGRESS:
      return {
        completedTopics: [],
        quizResults: [],
        readingTime: {},
        lastActivity: null,
      };
    default:
      return state;
  }
};

// Study reducer
const studyReducer = (state, action) => {
  switch (action.type) {
    case STUDY_ACTIONS.SET_CURRENT_VIEW:
      return {
        ...state,
        currentView: action.payload,
      };
    case STUDY_ACTIONS.SELECT_UNIT:
      return {
        ...state,
        selectedUnit: action.payload,
        currentView: 'topics',
      };
    case STUDY_ACTIONS.SELECT_TOPIC:
      return {
        ...state,
        selectedTopic: action.payload,
        currentView: 'content',
      };
    case STUDY_ACTIONS.SET_QUIZ_ANSWER:
      const { questionIndex, answerIndex } = action.payload;
      return {
        ...state,
        quizAnswers: {
          ...state.quizAnswers,
          [questionIndex]: answerIndex,
        },
      };
    case STUDY_ACTIONS.SUBMIT_QUIZ: {
      // Calculate score
      const answers = action.payload;
      const quiz = state.selectedUnit?.quiz?.questions || [];
      let score = 0;
      
      quiz.forEach((question, idx) => {
        if (answers[idx] === question.correct) {
          score++;
        }
      });
      
      return {
        ...state,
        quizAnswers: answers,
        quizSubmitted: true,
        quizScore: score,
      };
    }
    case STUDY_ACTIONS.RESET_QUIZ:
      return {
        ...state,
        quizAnswers: {},
        quizSubmitted: false,
        quizScore: null,
        currentView: 'quiz',
      };
    case STUDY_ACTIONS.NAVIGATE_TOPIC: {
      const direction = action.payload; // 'next' or 'previous'
      if (!state.selectedUnit || !state.selectedTopic) return state;
      
      const currentTopicIndex = state.selectedUnit.topics.findIndex(
        topic => topic.id === state.selectedTopic.id
      );
      
      let newTopic = null;
      if (direction === 'next' && currentTopicIndex < state.selectedUnit.topics.length - 1) {
        newTopic = state.selectedUnit.topics[currentTopicIndex + 1];
      } else if (direction === 'previous' && currentTopicIndex > 0) {
        newTopic = state.selectedUnit.topics[currentTopicIndex - 1];
      }
      
      return newTopic ? { ...state, selectedTopic: newTopic } : state;
    }
    case STUDY_ACTIONS.NAVIGATE_TO_NEXT_UNIT: {
      if (!state.selectedUnit) return state;
      
      // Find next unit in studyData
      const currentUnitIndex = studyData.units.findIndex(
        unit => unit.id === state.selectedUnit.id
      );
      
      if (currentUnitIndex >= 0 && currentUnitIndex < studyData.units.length - 1) {
        const nextUnit = studyData.units[currentUnitIndex + 1];
        const firstTopicOfNextUnit = nextUnit.topics[0];
        
        return {
          ...state,
          selectedUnit: nextUnit,
          selectedTopic: firstTopicOfNextUnit,
        };
      }
      
      return state;
    }
    default:
      return state;
  }
};

// Offline reducer
const offlineReducer = (state, action) => {
  switch (action.type) {
    case OFFLINE_ACTIONS.SET_ONLINE_STATUS:
      return {
        ...state,
        isOnline: action.payload,
        hasBeenOffline: state.hasBeenOffline || !action.payload,
      };
    case OFFLINE_ACTIONS.SET_HAS_BEEN_OFFLINE:
      return {
        ...state,
        hasBeenOffline: action.payload,
      };
    default:
      return state;
  }
};

// Main reducer
export const appReducer = (state, action) => {
  switch (action.type) {
    case APP_ACTIONS.INITIALIZE_APP:
      return {
        ...state,
        initialized: true,
      };
    case APP_ACTIONS.HYDRATE_STATE:
      return {
        ...state,
        ...action.payload,
      };
    // Theme actions
    case THEME_ACTIONS.SET_THEME:
    case THEME_ACTIONS.SET_IS_DARK:
    case THEME_ACTIONS.SET_MOUNTED:
    case THEME_ACTIONS.TOGGLE_THEME:
      return {
        ...state,
        theme: themeReducer(state.theme, action),
      };
    // Progress actions
    case PROGRESS_ACTIONS.LOAD_PROGRESS:
    case PROGRESS_ACTIONS.MARK_TOPIC_COMPLETED:
    case PROGRESS_ACTIONS.SAVE_QUIZ_RESULT:
    case PROGRESS_ACTIONS.TRACK_READING_TIME:
    case PROGRESS_ACTIONS.CLEAR_PROGRESS:
      return {
        ...state,
        progress: progressReducer(state.progress, action),
      };
    // Study actions
    case STUDY_ACTIONS.SET_CURRENT_VIEW:
    case STUDY_ACTIONS.SELECT_UNIT:
    case STUDY_ACTIONS.SELECT_TOPIC:
    case STUDY_ACTIONS.SET_QUIZ_ANSWER:
    case STUDY_ACTIONS.SUBMIT_QUIZ:
    case STUDY_ACTIONS.RESET_QUIZ:
    case STUDY_ACTIONS.NAVIGATE_TOPIC:
    case STUDY_ACTIONS.NAVIGATE_TO_NEXT_UNIT:
      return {
        ...state,
        study: studyReducer(state.study, action),
      };
    // Offline actions
    case OFFLINE_ACTIONS.SET_ONLINE_STATUS:
    case OFFLINE_ACTIONS.SET_HAS_BEEN_OFFLINE:
      return {
        ...state,
        offline: offlineReducer(state.offline, action),
      };
    default:
      return state;
  }
};