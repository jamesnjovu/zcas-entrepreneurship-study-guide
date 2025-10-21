// Type definitions for the study guide application

/**
 * @typedef {Object} ContentSection
 * @property {string} heading - The section heading
 * @property {string[]} points - Array of content points
 */

/**
 * @typedef {Object} Topic
 * @property {number} id - Topic identifier
 * @property {string} title - Topic title
 * @property {ContentSection[]} content - Array of content sections
 */

/**
 * @typedef {Object} QuizQuestion
 * @property {string} question - The quiz question
 * @property {string[]} options - Array of answer options
 * @property {number} correct - Index of the correct answer
 */

/**
 * @typedef {Object} Unit
 * @property {number} id - Unit identifier
 * @property {string} title - Unit title
 * @property {Topic[]} topics - Array of topics in the unit
 * @property {QuizQuestion[]} quiz - Array of quiz questions
 */

/**
 * @typedef {Object} StudyData
 * @property {Unit[]} units - Array of study units
 */

export {};