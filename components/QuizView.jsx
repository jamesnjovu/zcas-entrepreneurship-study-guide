import { Award, Check, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { useTextToSpeech } from '../hooks/useTextToSpeech';
import { useTheme } from '../hooks/useTheme';
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
  const { isDark } = useTheme();
  
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
    onSubmitQuiz(unit.quiz);
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
          className={`mb-4 px-4 py-2 ${isDark ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-white text-indigo-600 hover:shadow-md'} rounded-lg shadow transition font-semibold`}
        >
          ← Back to Topics
        </button>
        <div className={`${isDark ? 'bg-gray-800 text-white' : 'bg-white'} rounded-lg shadow-lg p-8`}>
          <div className="text-center mb-8 p-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg text-white">
            <Award size={64} className="mx-auto mb-4" />
            <h3 className="text-3xl font-bold mb-2">Quiz Complete!</h3>
            <p className="text-xl">
              Your Score: {quizScore} / {unit.quiz.length}
            </p>
            <p className="text-lg mt-2">
              {Math.round((quizScore / unit.quiz.length) * 100)}%
            </p>
          </div>

          {/* Results Navigation */}
          <div className="mb-6">
            <div className="flex justify-between items-center">
              <h4 className={`text-xl font-bold ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>Review Results</h4>
              <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                Question {currentQuestionIndex + 1} of {unit.quiz.length}
              </p>
            </div>
            <div className="flex gap-2 mt-2">
              {unit.quiz.map((_, idx) => {
                const isCorrect = quizAnswers[idx] === unit.quiz[idx].correct;
                return (
                  <button
                    key={idx}
                    onClick={() => setCurrentQuestionIndex(idx)}
                    className={`w-6 h-6 rounded-full text-xs font-bold text-white transition ${
                      idx === currentQuestionIndex
                        ? 'ring-2 ring-indigo-300'
                        : ''
                    } ${
                      isCorrect
                        ? 'bg-green-500 hover:bg-green-600'
                        : 'bg-red-500 hover:bg-red-600'
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
              className={`flex items-center gap-2 px-4 py-2 ${isDark ? 'bg-gray-700 text-gray-200 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-500' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400'} rounded-lg font-semibold transition disabled:cursor-not-allowed`}
            >
              <ChevronLeft size={20} />
              Previous
            </button>

            <div className="flex gap-3">
              {currentQuestionIndex < unit.quiz.length - 1 ? (
                <button
                  onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
                  className={`flex items-center gap-2 px-4 py-2 ${isDark ? 'bg-indigo-800 text-indigo-200 hover:bg-indigo-700' : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'} rounded-lg font-semibold transition`}
                >
                  Next
                  <ChevronRight size={20} />
                </button>
              ) : (
                <button
                  onClick={onBackToTopics}
                  className={`px-6 py-2 ${isDark ? 'bg-indigo-700 hover:bg-indigo-600' : 'bg-indigo-600 hover:bg-indigo-700'} text-white rounded-lg font-bold transition`}
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
        className={`mb-4 px-4 py-2 ${isDark ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-white text-indigo-600 hover:shadow-md'} rounded-lg shadow transition font-semibold`}
      >
        ← Back to Topics
      </button>
      <div className={`${isDark ? 'bg-gray-800 text-white' : 'bg-white'} rounded-lg shadow-lg p-8`}>
        <div className="mb-6">
          <div className="flex justify-between items-start gap-4">
            <div>
              <h2 className={`text-3xl font-bold ${isDark ? 'text-indigo-300' : 'text-indigo-900'}`}>Unit {unit.id} Quiz</h2>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mt-2`}>
                Question {currentQuestionIndex + 1} of {unit.quiz.length}
              </p>
              <div className="flex gap-2 mt-2">
                {unit.quiz.map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-3 h-3 rounded-full ${
                      idx === currentQuestionIndex
                        ? (isDark ? 'bg-indigo-500' : 'bg-indigo-600')
                        : quizAnswers[idx] !== undefined
                        ? (isDark ? 'bg-green-500' : 'bg-green-400')
                        : (isDark ? 'bg-gray-600' : 'bg-gray-300')
                    }`}
                  />
                ))}
              </div>
            </div>
            
            {/* Speech Controls */}
            <div className="relative">
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
            className={`flex items-center gap-2 px-4 py-2 ${isDark ? 'bg-gray-700 text-gray-200 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-500' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400'} rounded-lg font-semibold transition disabled:cursor-not-allowed`}
          >
            <ChevronLeft size={20} />
            Previous
          </button>

          <div className="flex gap-3">
            {!isLastQuestion ? (
              <button
                onClick={handleNextQuestion}
                className={`flex items-center gap-2 px-4 py-2 ${isDark ? 'bg-indigo-800 text-indigo-200 hover:bg-indigo-700' : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'} rounded-lg font-semibold transition`}
              >
                Next
                <ChevronRight size={20} />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!allQuestionsAnswered}
                className={`px-6 py-2 ${isDark ? 'bg-green-700 hover:bg-green-600 disabled:bg-gray-700' : 'bg-green-600 hover:bg-green-700 disabled:bg-gray-300'} text-white rounded-lg font-bold transition disabled:cursor-not-allowed`}
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