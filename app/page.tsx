"use client";
import React from 'react';
import ErrorBoundary from '../components/ErrorBoundary';
import Header from '../components/Header';
import HomeView from '../components/HomeView';
import TopicsView from '../components/TopicsView';
import ContentView from '../components/ContentView';
import QuizView from '../components/QuizView';
import PastExamView from '../components/PastExamView';
import { StudyGuideProvider, useStudyGuideContext } from '../context/StudyGuideContext';
import { pastExamQuestions } from '../data/pastExamQuestions';

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
    handleNextTopic,
    handlePreviousTopic,
    isFirstTopic,
    isLastTopic,
    resetQuiz
  } = useStudyGuideContext();

  const onUnitSelect = (unit: any) => {
    handleUnitSelect(unit);
    resetQuiz();
  };

  const onStartQuiz = () => {
    resetQuiz();
    handleStartQuiz();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Header currentView={currentView} onBackToHome={handleBackToHome} />
        
        {currentView === 'home' && (
          <HomeView 
            units={studyData.units} 
            onUnitSelect={onUnitSelect} 
            onPastExamSelect={handlePastExamSelect}
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
          />
        )}
        
        {currentView === 'quiz' && selectedUnit && (
          <QuizView 
            unit={selectedUnit}
            quizAnswers={quizAnswers}
            quizSubmitted={quizSubmitted}
            quizScore={quizScore}
            onQuizAnswer={handleQuizAnswer}
            onSubmitQuiz={handleSubmitQuiz}
            onBackToTopics={handleBackToTopics}
          />
        )}

        {currentView === 'pastExam' && (
          <PastExamView 
            pastExamQuestions={pastExamQuestions}
            onBackToHome={handleBackToHome}
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