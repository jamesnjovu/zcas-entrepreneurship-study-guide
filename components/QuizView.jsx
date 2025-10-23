import { Award, Check, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { useTextToSpeech } from '../hooks/useTextToSpeech';
import { useApp, useThemeColors } from '../store';
import SpeechControls from './SpeechControls';
import QuizQuestion from './QuizQuestion';

const QuizView = ({ 
  unit, 
  quizAnswers, 
  quizSubmitted, 
  quizScore, 
  onQuizAnswer, 
  onSubmitQuiz, 
  onBackToTopics 
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const { theme: { isDark } } = useApp();
  const colors = useThemeColors(isDark);
  
  const {
    isSupported,
    isSpeaking,
    isPaused,
    voices,
    selectedVoice,
    rate,
    pitch,
    setSelectedVoice,
    setRate,
    setPitch,
    pause,
    resume,
    stop,
    speakQuestion,
  } = useTextToSpeech();
  const handleSubmit = () => {
    onSubmitQuiz(quizAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < unit.quiz.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = currentQuestionIndex === unit.quiz.length - 1;
  const allQuestionsAnswered = Object.keys(quizAnswers).length === unit.quiz.length;

  if (quizSubmitted) {
    return (
      <div>
        <button
          onClick={onBackToTopics}
          className={`mb-4 px-4 py-3 ${colors.get('button.accent')} rounded-lg shadow transition font-semibold min-h-[44px] min-w-[44px] touch-manipulation`}
        >
          ← Back to Topics
        </button>
        <div className={`${colors.backgroundPrimary} ${colors.primary} rounded-lg shadow-lg p-4 md:p-8`}>
          <div className={`text-center mb-6 md:mb-8 p-4 md:p-8 ${colors.get('gradient.header.quiz')} rounded-lg text-white`}>
            <Award size={48} className="mx-auto mb-3 md:mb-4 md:w-16 md:h-16" />
            <h3 className="text-2xl md:text-3xl font-bold mb-2">Quiz Complete!</h3>
            <p className="text-lg md:text-xl">
              Your Score: {quizScore} / {unit.quiz.length}
            </p>
            <p className="text-base md:text-lg mt-2">
              {Math.round((quizScore / unit.quiz.length) * 100)}%
            </p>
          </div>

          {/* Results Navigation */}
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <h4 className={`text-lg md:text-xl font-bold ${colors.conditional('text-gray-800', 'text-gray-100')}`}>Review Results</h4>
              <p className={`text-sm md:text-base ${colors.secondary}`}>
                Question {currentQuestionIndex + 1} of {unit.quiz.length}
              </p>
            </div>
            <div className="flex gap-2 mt-3 flex-wrap justify-center sm:justify-start">
              {unit.quiz.map((question, idx) => {
                const isCorrect = quizAnswers[idx] === question.correct;
                return (
                  <button
                    key={idx}
                    onClick={() => setCurrentQuestionIndex(idx)}
                    className={`w-10 h-10 md:w-8 md:h-8 rounded-full text-sm font-bold text-white transition touch-manipulation ${
                      idx === currentQuestionIndex
                        ? `ring-2 ${colors.conditional('ring-indigo-300', 'ring-indigo-400')} scale-110`
                        : ''
                    } ${
                      isCorrect
                        ? colors.conditional('bg-green-500 hover:bg-green-600', 'bg-green-600 hover:bg-green-700')
                        : colors.conditional('bg-red-500 hover:bg-red-600', 'bg-red-600 hover:bg-red-700')
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Single Question Review */}
          <QuizQuestion
            key={`result-${currentQuestionIndex}`}
            question={unit.quiz[currentQuestionIndex]}
            questionIndex={currentQuestionIndex}
            selectedAnswer={quizAnswers[currentQuestionIndex]}
            onAnswerSelect={() => {}} // No interaction in submitted state
            onSpeakQuestion={speakQuestion}
            isSubmitted={true}
            correctAnswer={unit.quiz[currentQuestionIndex].correct}
          />

          {/* Results Navigation Controls */}
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
              disabled={currentQuestionIndex === 0}
              className={`flex items-center gap-2 px-4 py-3 ${colors.get('button.secondary')} rounded-lg font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 min-h-[44px] touch-manipulation`}
            >
              <ChevronLeft size={20} />
              <span className="hidden sm:inline">Previous</span>
            </button>

            <div className="flex gap-2 md:gap-3">
              {currentQuestionIndex < unit.quiz.length - 1 ? (
                <button
                  onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
                  className={`flex items-center gap-2 px-4 py-3 ${colors.get('button.accent')} rounded-lg font-semibold transition min-h-[44px] touch-manipulation`}
                >
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight size={20} />
                </button>
              ) : (
                <button
                  onClick={onBackToTopics}
                  className={`px-4 md:px-6 py-3 ${colors.get('button.primary')} rounded-lg font-bold transition min-h-[44px] touch-manipulation`}
                >
                  Back to Topics
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={onBackToTopics}
        className={`mb-4 px-4 py-3 ${colors.get('button.accent')} rounded-lg shadow transition font-semibold min-h-[44px] touch-manipulation`}
      >
        ← Back to Topics
      </button>
      <div className={`${colors.backgroundPrimary} ${colors.primary} rounded-lg shadow-lg p-4 md:p-8`}>
        <div className="mb-4 md:mb-6">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
            <div>
              <h2 className={`text-2xl md:text-3xl font-bold ${colors.conditional('text-indigo-900', 'text-indigo-300')}`}>Unit {unit.id} Quiz</h2>
              <p className={`text-sm md:text-base ${colors.secondary} mt-1 md:mt-2`}>
                Question {currentQuestionIndex + 1} of {unit.quiz.length}
              </p>
              <div className="flex gap-2 mt-2 justify-center lg:justify-start">
                {unit.quiz.map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-4 h-4 md:w-3 md:h-3 rounded-full ${
                      idx === currentQuestionIndex
                        ? colors.conditional('bg-indigo-600', 'bg-indigo-500')
                        : quizAnswers[idx] !== undefined
                        ? colors.conditional('bg-green-400', 'bg-green-500')
                        : colors.conditional('bg-gray-300', 'bg-gray-600')
                    }`}
                  />
                ))}
              </div>
            </div>
            
            {/* Speech Controls */}
            <div className="relative w-full lg:w-auto lg:flex-shrink-0">
              <SpeechControls
                isSupported={isSupported}
                isSpeaking={isSpeaking}
                isPaused={isPaused}
                onSpeak={() => {}} // Individual question speech handled by QuizQuestion component
                onPause={pause}
                onResume={resume}
                onStop={stop}
                voices={voices}
                selectedVoice={selectedVoice}
                onVoiceChange={setSelectedVoice}
                rate={rate}
                onRateChange={setRate}
                pitch={pitch}
                onPitchChange={setPitch}
                className="flex-shrink-0"
              />
            </div>
          </div>
        </div>

        {/* Single Question Display */}
        <QuizQuestion
          key={currentQuestionIndex}
          question={unit.quiz[currentQuestionIndex]}
          questionIndex={currentQuestionIndex}
          selectedAnswer={quizAnswers[currentQuestionIndex]}
          onAnswerSelect={onQuizAnswer}
          onSpeakQuestion={speakQuestion}
          isSubmitted={false}
          correctAnswer={unit.quiz[currentQuestionIndex].correct}
        />

        {/* Navigation Controls */}
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={handlePreviousQuestion}
            disabled={isFirstQuestion}
            className={`flex items-center gap-2 px-4 py-3 ${colors.get('button.secondary')} rounded-lg font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 min-h-[44px] touch-manipulation`}
          >
            <ChevronLeft size={20} />
            <span className="hidden sm:inline">Previous</span>
          </button>

          <div className="flex gap-2 md:gap-3">
            {!isLastQuestion ? (
              <button
                onClick={handleNextQuestion}
                className={`flex items-center gap-2 px-4 py-3 ${colors.get('button.accent')} rounded-lg font-semibold transition min-h-[44px] touch-manipulation`}
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight size={20} />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!allQuestionsAnswered}
                className={`px-4 md:px-6 py-3 ${colors.get('button.success')} text-white rounded-lg font-bold transition disabled:cursor-not-allowed disabled:opacity-50 min-h-[44px] touch-manipulation text-sm md:text-base`}
              >
                Submit Quiz
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizView;