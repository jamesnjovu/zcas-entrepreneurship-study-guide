import { Volume2, Check, X } from 'lucide-react';
import { useApp, useThemeColors } from '../store';

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
  const colors = useThemeColors(isDark);
  
  const handleSpeak = () => {
    onSpeakQuestion(question.question, question.options);
  };

  return (
    <div className={`mb-8 p-6 rounded-lg ${colors.backgroundSecondary}`}>
      <div className="flex items-start justify-between mb-4">
        <p className={`font-bold flex-1 ${colors.conditional('text-gray-800', 'text-gray-100')}`}>
          {questionIndex + 1}. {question.question}
        </p>
        <button
          onClick={handleSpeak}
          className={`ml-4 p-2 rounded transition flex-shrink-0 ${colors.get('interactive.hover')}`}
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
              className += `${colors.get('status.success.background')} border-2 ${colors.get('status.success.border')}`;
            } else if (isSelected) {
              className += `${colors.get('status.error.background')} border-2 ${colors.get('status.error.border')}`;
            } else {
              className += `${colors.backgroundPrimary} border-2 ${colors.get('border.primary')}`;
            }
          } else {
            className += isSelected
              ? `${colors.get('status.indigo.background')} border-2 ${colors.get('status.indigo.border')}`
              : `${colors.backgroundPrimary} border-2 ${colors.get('border.primary')} hover:${colors.get('status.indigo.border')} cursor-pointer`;
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
                  <span className={colors.secondary}>{option}</span>
                </label>
              ) : (
                <>
                  <span className={colors.secondary}>{option}</span>
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