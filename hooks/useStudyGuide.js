import { useState } from 'react';

export const useStudyGuide = () => {
  const [currentView, setCurrentView] = useState('home');
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);

  const handleUnitSelect = (unit) => {
    setSelectedUnit(unit);
    setSelectedTopic(null);
    setCurrentView('topics');
  };

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
    setCurrentView('content');
  };

  const handleStartQuiz = () => {
    setCurrentView('quiz');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedUnit(null);
    setSelectedTopic(null);
  };

  const handleBackToTopics = () => {
    setCurrentView('topics');
    setSelectedTopic(null);
  };

  const handleNextTopic = () => {
    if (selectedUnit && selectedTopic) {
      const currentIndex = selectedUnit.topics.findIndex(topic => topic.id === selectedTopic.id);
      if (currentIndex < selectedUnit.topics.length - 1) {
        setSelectedTopic(selectedUnit.topics[currentIndex + 1]);
      }
    }
  };

  const handlePreviousTopic = () => {
    if (selectedUnit && selectedTopic) {
      const currentIndex = selectedUnit.topics.findIndex(topic => topic.id === selectedTopic.id);
      if (currentIndex > 0) {
        setSelectedTopic(selectedUnit.topics[currentIndex - 1]);
      }
    }
  };

  const getCurrentTopicIndex = () => {
    if (selectedUnit && selectedTopic) {
      return selectedUnit.topics.findIndex(topic => topic.id === selectedTopic.id);
    }
    return -1;
  };

  const isFirstTopic = () => getCurrentTopicIndex() === 0;
  const isLastTopic = () => getCurrentTopicIndex() === selectedUnit?.topics.length - 1;

  return {
    currentView,
    selectedUnit,
    selectedTopic,
    handleUnitSelect,
    handleTopicSelect,
    handleStartQuiz,
    handleBackToHome,
    handleBackToTopics,
    handleNextTopic,
    handlePreviousTopic,
    isFirstTopic,
    isLastTopic,
  };
};

export const useQuiz = () => {
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  const handleQuizAnswer = (questionIndex, answerIndex) => {
    setQuizAnswers(prev => ({
      ...prev,
      [questionIndex]: answerIndex
    }));
  };

  const handleSubmitQuiz = (quiz) => {
    let score = 0;
    quiz.forEach((q, index) => {
      if (quizAnswers[index] === q.correct) {
        score++;
      }
    });
    setQuizScore(score);
    setQuizSubmitted(true);
  };

  const resetQuiz = () => {
    setQuizAnswers({});
    setQuizSubmitted(false);
    setQuizScore(0);
  };

  return {
    quizAnswers,
    quizSubmitted,
    quizScore,
    handleQuizAnswer,
    handleSubmitQuiz,
    resetQuiz,
  };
};