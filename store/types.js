/**
 * @typedef {Object} ThemeState
 * @property {'light' | 'dark' | 'system'} theme - Current theme setting
 * @property {boolean} isDark - Whether dark mode is currently active
 * @property {boolean} mounted - Whether component has mounted (for hydration)
 */

/**
 * @typedef {Object} ProgressState
 * @property {string[]} completedTopics - Array of completed topic IDs (format: "unitId-topicId")
 * @property {QuizResult[]} quizResults - Array of quiz results
 * @property {Object<string, number>} readingTime - Reading time per topic (topicKey: seconds)
 * @property {string|null} lastActivity - ISO timestamp of last activity
 */

/**
 * @typedef {Object} QuizResult
 * @property {number} id - Unique quiz result ID
 * @property {number} unitId - Unit ID
 * @property {number} score - Number of correct answers
 * @property {number} totalQuestions - Total number of questions
 * @property {number} percentage - Percentage score
 * @property {Object} answers - User's answers
 * @property {string} completedAt - ISO timestamp when completed
 */

/**
 * @typedef {Object} StudyState
 * @property {'home' | 'topics' | 'content' | 'quiz' | 'pastExam' | 'settings' | 'progress'} currentView
 * @property {Object|null} selectedUnit - Currently selected unit
 * @property {Object|null} selectedTopic - Currently selected topic
 * @property {Object<number, number>} quizAnswers - Quiz answers (questionIndex: answerIndex)
 * @property {boolean} quizSubmitted - Whether quiz has been submitted
 * @property {number|null} quizScore - Current quiz score
 */

/**
 * @typedef {Object} OfflineState
 * @property {boolean} isOnline - Whether the app is online
 * @property {boolean} hasBeenOffline - Whether the app has been offline during this session
 */

/**
 * @typedef {Object} AppState
 * @property {ThemeState} theme - Theme state
 * @property {ProgressState} progress - Progress tracking state
 * @property {StudyState} study - Study navigation state
 * @property {OfflineState} offline - Offline state
 * @property {boolean} initialized - Whether the store has been initialized
 */

/**
 * @typedef {Object} AppAction
 * @property {string} type - Action type
 * @property {*} payload - Action payload
 */