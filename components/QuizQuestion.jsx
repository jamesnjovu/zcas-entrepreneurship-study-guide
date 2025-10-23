import { Volume2, Check, X } from 'lucide-react';
import { useApp } from '../store';

const QuizQuestion = ({ 
  question, 
  questionIndex, 
  selectedAnswer, 
  onAnswerSelect, 
  onSpeakQuestion, 
  isSubmitted, 
  correctAnswer 
}) => {
  const { theme: { isDark } } = useApp();
  const handleSpeak = () => {
    onSpeakQuestion(question.question, question.options);
  };

  return (
    <div className={`mb-8 p-6 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
      <div className="flex items-start justify-between mb-4">
        <p className={`font-bold flex-1 ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
          {questionIndex + 1}. {question.question}
        </p>
        <button
          onClick={handleSpeak}
          className={`ml-4 p-2 rounded transition flex-shrink-0 ${isDark ? 'text-blue-400 hover:bg-gray-600' : 'text-blue-600 hover:bg-blue-100'}`}
          title="Read question aloud"
        >
          <Volume2 size={16} />
        </button>
      </div>
      
      <div className="space-y-2">
        {question.options.map((option, oIdx) => {
          const isCorrect = oIdx === correctAnswer;
          const isSelected = selectedAnswer === oIdx;
          let className = "flex items-center justify-between p-3 rounded-lg transition ";
          
          if (isSubmitted) {
            if (isCorrect) {
              className += isDark 
                ? "bg-green-900/30 border-2 border-green-500" 
                : "bg-green-100 border-2 border-green-500";
            } else if (isSelected) {
              className += isDark 
                ? "bg-red-900/30 border-2 border-red-500" 
                : "bg-red-100 border-2 border-red-500";
            } else {
              className += isDark 
                ? "bg-gray-800 border-2 border-gray-600" 
                : "bg-white border-2 border-gray-200";
            }
          } else {
            className += isSelected
              ? (isDark 
                  ? "bg-indigo-900/30 border-2 border-indigo-500" 
                  : "bg-indigo-100 border-2 border-indigo-500")
              : (isDark 
                  ? "bg-gray-800 border-2 border-gray-600 hover:border-indigo-400 cursor-pointer" 
                  : "bg-white border-2 border-gray-200 hover:border-indigo-300 cursor-pointer");
          }
          
          return (
            <div key={oIdx} className={className}>
              {!isSubmitted ? (
                <label className="flex items-center cursor-pointer w-full">
                  <input
                    type="radio"
                    name={`question-${questionIndex}`}
                    checked={selectedAnswer === oIdx}
                    onChange={() => onAnswerSelect(questionIndex, oIdx)}
                    className="mr-3"
                  />
                  <span className={isDark ? 'text-gray-200' : 'text-gray-700'}>{option}</span>
                </label>
              ) : (
                <>
                  <span className={isDark ? 'text-gray-200' : 'text-gray-700'}>{option}</span>
                  {isCorrect && <Check className="text-green-600" size={20} />}
                  {isSelected && !isCorrect && <X className="text-red-600" size={20} />}
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuizQuestion;