"use client";
import ErrorBoundary from '../components/ErrorBoundary';
import Header from '../components/Header';
import HomeView from '../components/HomeView';
import TopicsView from '../components/TopicsView';
import ContentView from '../components/ContentView';
import QuizView from '../components/QuizView';
import PastExamView from '../components/PastExamView';
import SettingsView from '../components/SettingsView';
import ProgressView from '../components/ProgressView';
import InitialLoader from '../components/InitialLoader';
import { AppProvider, useApp } from '../store';
import { pastExamQuestions } from '../data/pastExamQuestions';
import { studyData } from '../data/studyData';
import OfflineIndicator from '../components/OfflineIndicator';

const StudyGuideContent = () => {
  const {
    // State
    theme: { isDark, mounted },
    study: { currentView, selectedUnit, selectedTopic, quizAnswers, quizSubmitted, quizScore },
    
    // Actions
    selectUnit,
    selectTopic,
    setQuizAnswer,
    submitQuiz,
    resetQuiz,
    goHome,
    backToTopics,
    goToPastExams,
    goToSettings,
    goToProgress,
    startQuiz,
    navigateToNextTopic,
    navigateToPreviousTopic,
    navigateToNextUnit,
    markTopicCompleted,
    trackReadingTime,
    
    // Computed
    isFirstTopic,
    isLastTopic,
    hasNextUnit,
    getNextUnit,
  } = useApp();

  // Prevent hydration mismatch by not rendering theme-dependent styles until mounted
  if (!mounted) {
    return <InitialLoader />;
  }

  const onUnitSelect = (unit: any) => {
    selectUnit(unit);
  };

  const onStartQuiz = () => {
    startQuiz();
  };

  const onSubmitQuiz = (answers: any) => {
    console.log('Quiz submitted - Answers:', answers);
    submitQuiz(answers);
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-gradient-to-br from-blue-50 to-indigo-100'}`}>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Header currentView={currentView} onBackToHome={goHome} />
        
        {currentView === 'home' && (
          <HomeView 
            units={studyData.units} 
            onUnitSelect={onUnitSelect} 
            onPastExamSelect={goToPastExams}
            onSettingsSelect={goToSettings}
            onProgressSelect={goToProgress}
          />
        )}
        
        {currentView === 'topics' && selectedUnit && (
          <TopicsView 
            unit={selectedUnit} 
            onTopicSelect={selectTopic} 
            onStartQuiz={onStartQuiz} 
          />
        )}
        
        {currentView === 'content' && selectedTopic && (
          <ContentView 
            topic={selectedTopic} 
            onBackToTopics={backToTopics}
            onNextTopic={navigateToNextTopic}
            onPreviousTopic={navigateToPreviousTopic}
            onNextUnit={navigateToNextUnit}
            onStartQuiz={onStartQuiz}
            isFirstTopic={isFirstTopic()}
            isLastTopic={isLastTopic()}
            hasNextUnit={hasNextUnit()}
            nextUnit={getNextUnit()}
            markTopicCompleted={() => markTopicCompleted(selectedUnit?.id, selectedTopic?.id)}
            trackReadingTime={(timeSpent: number) => trackReadingTime(selectedUnit?.id, selectedTopic?.id, timeSpent)}
          />
        )}
        
        {currentView === 'quiz' && selectedUnit && (
          <QuizView 
            unit={selectedUnit}
            quizAnswers={quizAnswers}
            quizSubmitted={quizSubmitted}
            quizScore={quizScore}
            onQuizAnswer={setQuizAnswer}
            onSubmitQuiz={onSubmitQuiz}
            onBackToTopics={backToTopics}
          />
        )}

        {currentView === 'pastExam' && (
          <PastExamView 
            pastExamQuestions={pastExamQuestions}
            onBackToHome={goHome}
          />
        )}

        {currentView === 'settings' && (
          <SettingsView 
            onBack={goHome}
          />
        )}

        {currentView === 'progress' && (
          <ProgressView 
            onBack={goHome}
          />
        )}
      </div>
      
      {/* Offline Indicator */}
      <OfflineIndicator />
    </div>
  );
};

const StudyGuideApp = () => {
  return (
    <ErrorBoundary>
      <AppProvider>
        <StudyGuideContent />
      </AppProvider>
    </ErrorBoundary>
  );
};

export default StudyGuideApp;