"use client";
import React, { useEffect } from 'react';
import ErrorBoundary from '../components/ErrorBoundary';
import Header from '../components/Header';
import HomeView from '../components/HomeView';
import TopicsView from '../components/TopicsView';
import ContentView from '../components/ContentView';
import QuizView from '../components/QuizView';
import PastExamView from '../components/PastExamView';
import SettingsView from '../components/SettingsView';
import { StudyGuideProvider, useStudyGuideContext } from '../context/StudyGuideContext';
import { pastExamQuestions } from '../data/pastExamQuestions';
import { useTheme } from '../hooks/useTheme';
import { useProgress } from '../hooks/useProgress';

const StudyGuideContent = () => {
  const {
    currentView,
    selectedUnit,
    selectedTopic,
    quizAnswers,
    quizSubmitted,
    quizScore,
    studyData,
    handleUnitSelect,
    handleTopicSelect,
    handleStartQuiz,
    handleQuizAnswer,
    handleSubmitQuiz,
    handleBackToHome,
    handleBackToTopics,
    handlePastExamSelect,
    handleSettingsSelect,
    handleNextTopic,
    handlePreviousTopic,
    isFirstTopic,
    isLastTopic,
    resetQuiz
  } = useStudyGuideContext();

  const { isDark } = useTheme();
  const { progress, markTopicCompleted, saveQuizResult, trackReadingTime } = useProgress();

  const onUnitSelect = (unit: any) => {
    handleUnitSelect(unit);
    resetQuiz();
  };

  const onStartQuiz = () => {
    resetQuiz();
    handleStartQuiz();
  };

  const onSubmitQuiz = (answers) => {
    const score = handleSubmitQuiz(answers);
    // Save quiz result to progress tracking
    if (selectedUnit && selectedUnit.quiz) {
      saveQuizResult(selectedUnit.id, score, selectedUnit.quiz.questions.length, answers);
    }
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-gradient-to-br from-blue-50 to-indigo-100'}`}>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Header currentView={currentView} onBackToHome={handleBackToHome} />
        
        {currentView === 'home' && (
          <HomeView 
            units={studyData.units} 
            onUnitSelect={onUnitSelect} 
            onPastExamSelect={handlePastExamSelect}
            onSettingsSelect={handleSettingsSelect}
          />
        )}
        
        {currentView === 'topics' && selectedUnit && (
          <TopicsView 
            unit={selectedUnit} 
            onTopicSelect={handleTopicSelect} 
            onStartQuiz={onStartQuiz} 
          />
        )}
        
        {currentView === 'content' && selectedTopic && (
          <ContentView 
            topic={selectedTopic} 
            onBackToTopics={handleBackToTopics}
            onNextTopic={handleNextTopic}
            onPreviousTopic={handlePreviousTopic}
            onStartQuiz={onStartQuiz}
            isFirstTopic={isFirstTopic()}
            isLastTopic={isLastTopic()}
            markTopicCompleted={() => markTopicCompleted(selectedUnit?.id, selectedTopic?.id)}
            trackReadingTime={(timeSpent) => trackReadingTime(selectedUnit?.id, selectedTopic?.id, timeSpent)}
          />
        )}
        
        {currentView === 'quiz' && selectedUnit && (
          <QuizView 
            unit={selectedUnit}
            quizAnswers={quizAnswers}
            quizSubmitted={quizSubmitted}
            quizScore={quizScore}
            onQuizAnswer={handleQuizAnswer}
            onSubmitQuiz={onSubmitQuiz}
            onBackToTopics={handleBackToTopics}
          />
        )}

        {currentView === 'pastExam' && (
          <PastExamView 
            pastExamQuestions={pastExamQuestions}
            onBackToHome={handleBackToHome}
          />
        )}

        {currentView === 'settings' && (
          <SettingsView 
            onBack={handleBackToHome}
          />
        )}
      </div>
    </div>
  );
};

const StudyGuideApp = () => {
  return (
    <ErrorBoundary>
      <StudyGuideProvider>
        <StudyGuideContent />
      </StudyGuideProvider>
    </ErrorBoundary>
  );
};

export default StudyGuideApp;