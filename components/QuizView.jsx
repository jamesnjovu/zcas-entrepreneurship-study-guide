import { Award, Check, X } from 'lucide-react';
import { useTextToSpeech } from '../hooks/useTextToSpeech';
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

  if (quizSubmitted) {
    return (
      <div>
        <button
          onClick={onBackToTopics}
          className="mb-4 px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition text-indigo-600 font-semibold"
        >
          ← Back to Topics
        </button>
        <div className="bg-white rounded-lg shadow-lg p-8">
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

          {unit.quiz.map((question, qIdx) => (
            <QuizQuestion
              key={qIdx}
              question={question}
              questionIndex={qIdx}
              selectedAnswer={quizAnswers[qIdx]}
              onAnswerSelect={() => {}} // No interaction in submitted state
              onSpeakQuestion={speakQuestion}
              isSubmitted={true}
              correctAnswer={question.correct}
            />
          ))}

          <button
            onClick={onBackToTopics}
            className="w-full py-3 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition"
          >
            Back to Topics
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={onBackToTopics}
        className="mb-4 px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition text-indigo-600 font-semibold"
      >
        ← Back to Topics
      </button>
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="mb-6">
          <div className="flex justify-between items-start gap-4">
            <div>
              <h2 className="text-3xl font-bold text-indigo-900">Unit {unit.id} Quiz</h2>
              <p className="text-gray-600 mt-2">Test your knowledge</p>
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

        {unit.quiz.map((question, qIdx) => (
          <QuizQuestion
            key={qIdx}
            question={question}
            questionIndex={qIdx}
            selectedAnswer={quizAnswers[qIdx]}
            onAnswerSelect={onQuizAnswer}
            onSpeakQuestion={speakQuestion}
            isSubmitted={false}
            correctAnswer={question.correct}
          />
        ))}
        <button
          onClick={handleSubmit}
          disabled={Object.keys(quizAnswers).length !== unit.quiz.length}
          className="w-full py-3 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Submit Quiz
        </button>
      </div>
    </div>
  );
};

export default QuizView;