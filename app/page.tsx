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
import { StudyGuideProvider, useStudyGuideContext } from '../context/StudyGuideContext';
import { pastExamQuestions } from '../data/pastExamQuestions';
import { useTheme } from '../hooks/useTheme';
import { useProgress } from '../hooks/useProgress';
import OfflineIndicator from '../components/OfflineIndicator';

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
    handleProgressSelect,
    handleNextTopic,
    handlePreviousTopic,
    isFirstTopic,
    isLastTopic,
    resetQuiz
  } = useStudyGuideContext();

  const { isDark, mounted } = useTheme();
  const { markTopicCompleted, saveQuizResult, trackReadingTime } = useProgress();

  // Prevent hydration mismatch by not rendering theme-dependent styles until mounted
  if (!mounted) {
    return <InitialLoader />;
  }

  const onUnitSelect = (unit: any) => {
    handleUnitSelect(unit);
    resetQuiz();
  };

  const onStartQuiz = () => {
    resetQuiz();
    handleStartQuiz();
  };

  const onSubmitQuiz = (answers: any) => {
    const score = handleSubmitQuiz(answers);
    console.log('Quiz submitted - Score:', score, 'Answers:', answers);
    
    // Save quiz result to progress tracking
    if (selectedUnit && selectedUnit.quiz) {
      console.log('Saving quiz result for unit:', selectedUnit.id);
      saveQuizResult(selectedUnit.id, score, selectedUnit.quiz.questions.length, answers);
    } else {
      console.log('No unit or quiz found for saving result');
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
            onProgressSelect={handleProgressSelect}
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
            trackReadingTime={(timeSpent: number) => trackReadingTime(selectedUnit?.id, selectedTopic?.id, timeSpent)}
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

        {currentView === 'progress' && (
          <ProgressView 
            onBack={handleBackToHome}
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
      <StudyGuideProvider>
        <StudyGuideContent />
      </StudyGuideProvider>
    </ErrorBoundary>
  );
};

export default StudyGuideApp;