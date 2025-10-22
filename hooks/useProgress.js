import { useState, useEffect, useCallback } from 'react';

export const useProgress = () => {
  const [progress, setProgress] = useState({
    completedTopics: [],
    quizResults: [],
    readingTime: {},
    lastActivity: null,
  });

  // Load progress from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedProgress = localStorage.getItem('studyProgress');
        if (savedProgress) {
          const parsed = JSON.parse(savedProgress);
          setProgress({
            completedTopics: parsed.completedTopics || [],
            quizResults: parsed.quizResults || [],
            readingTime: parsed.readingTime || {},
            lastActivity: parsed.lastActivity || null,
          });
        }
      } catch (error) {
        console.log('Error loading progress:', error);
      }
    }
  }, []);

  // Save progress to localStorage
  const saveProgress = useCallback((newProgress) => {
    if (typeof window !== 'undefined') {
      try {
        const progressData = {
          ...newProgress,
          lastActivity: new Date().toISOString(),
        };
        localStorage.setItem('studyProgress', JSON.stringify(progressData));
        // Don't call setProgress here to avoid infinite loops
        // setProgress will be called by the calling function
      } catch (error) {
        console.log('Error saving progress:', error);
      }
    }
  }, []);

  // Mark topic as completed
  const markTopicCompleted = useCallback((unitId, topicId) => {
    const topicKey = `${unitId}-${topicId}`;
    setProgress(current => {
      const newCompletedTopics = current.completedTopics.includes(topicKey)
        ? current.completedTopics
        : [...current.completedTopics, topicKey];
      
      const newProgress = {
        ...current,
        completedTopics: newCompletedTopics,
        lastActivity: new Date().toISOString(),
      };
      
      // Save to localStorage
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('studyProgress', JSON.stringify(newProgress));
        } catch (error) {
          console.log('Error saving progress:', error);
        }
      }
      
      return newProgress;
    });
  }, []);

  // Save quiz result
  const saveQuizResult = useCallback((unitId, score, totalQuestions, answers) => {
    const quizResult = {
      id: Date.now(),
      unitId,
      score,
      totalQuestions,
      percentage: Math.round((score / totalQuestions) * 100),
      answers,
      completedAt: new Date().toISOString(),
    };

    setProgress(current => {
      const newQuizResults = [...current.quizResults, quizResult];
      
      const newProgress = {
        ...current,
        quizResults: newQuizResults,
        lastActivity: new Date().toISOString(),
      };
      
      // Save to localStorage
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('studyProgress', JSON.stringify(newProgress));
        } catch (error) {
          console.log('Error saving progress:', error);
        }
      }
      
      return newProgress;
    });
  }, []);

  // Track reading time for a topic
  const trackReadingTime = useCallback((unitId, topicId, timeSpent) => {
    if (!unitId || !topicId || timeSpent <= 0) return;
    
    const topicKey = `${unitId}-${topicId}`;
    
    // Update progress state directly without causing re-renders
    setProgress(current => {
      const currentTime = current.readingTime[topicKey] || 0;
      const newTime = currentTime + timeSpent;
      
      // Only update if there's a meaningful change (avoid micro-updates)
      if (timeSpent < 1) return current;
      
      const newReadingTime = {
        ...current.readingTime,
        [topicKey]: newTime,
      };
      
      const newProgress = {
        ...current,
        readingTime: newReadingTime,
        lastActivity: new Date().toISOString(),
      };
      
      // Save to localStorage directly
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('studyProgress', JSON.stringify(newProgress));
        } catch (error) {
          console.log('Error saving progress:', error);
        }
      }
      
      return newProgress;
    });
  }, []);

  // Get progress statistics
  const getProgressStats = useCallback(() => {
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
  }, [progress]);

  // Check if topic is completed
  const isTopicCompleted = useCallback((unitId, topicId) => {
    const topicKey = `${unitId}-${topicId}`;
    return progress.completedTopics.includes(topicKey);
  }, [progress.completedTopics]);

  // Get quiz results for a unit
  const getQuizResults = useCallback((unitId = null) => {
    if (unitId) {
      return progress.quizResults.filter(result => result.unitId === unitId);
    }
    return progress.quizResults;
  }, [progress.quizResults]);

  // Clear all progress (for reset functionality)
  const clearProgress = useCallback(() => {
    const emptyProgress = {
      completedTopics: [],
      quizResults: [],
      readingTime: {},
      lastActivity: null,
    };
    
    // Save to localStorage
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('studyProgress', JSON.stringify(emptyProgress));
      } catch (error) {
        console.log('Error clearing progress:', error);
      }
    }
    
    setProgress(emptyProgress);
  }, []);

  return {
    progress,
    markTopicCompleted,
    saveQuizResult,
    trackReadingTime,
    getProgressStats,
    isTopicCompleted,
    getQuizResults,
    clearProgress,
  };
};