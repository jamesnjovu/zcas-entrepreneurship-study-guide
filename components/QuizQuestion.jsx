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
    <div className={`mb-6 md:mb-8 p-4 md:p-6 rounded-lg ${colors.backgroundSecondary}`}>
      <div className="flex items-start justify-between mb-3 md:mb-4 gap-3">
        <p className={`font-bold flex-1 text-sm md:text-base leading-relaxed ${colors.conditional('text-gray-800', 'text-gray-100')}`}>
          {questionIndex + 1}. {question.question}
        </p>
        <button
          onClick={handleSpeak}
          className={`p-2 md:p-2 rounded transition flex-shrink-0 min-h-[40px] min-w-[40px] md:min-h-[36px] md:min-w-[36px] touch-manipulation ${colors.get('interactive.hover')}`}
          title="Read question aloud"
        >
          <Volume2 size={16} />
        </button>
      </div>
      
      <div className="space-y-2 md:space-y-2">
        {question.options.map((option, oIdx) => {
          const isCorrect = oIdx === correctAnswer;
          const isSelected = selectedAnswer === oIdx;
          let className = "flex items-center justify-between p-3 rounded-lg transition ";
          
          if (isSubmitted) {
            if (isCorrect) {
              className += `${colors.get('status.success.background')} border-2 ${colors.get('status.success.border')}`;
            } else if (isSelected && !isCorrect) {
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
                <label className="flex items-start cursor-pointer w-full gap-3 py-1 touch-manipulation">
                  <input
                    type="radio"
                    name={`question-${questionIndex}`}
                    checked={selectedAnswer === oIdx}
                    onChange={() => onAnswerSelect(questionIndex, oIdx)}
                    className="w-5 h-5 md:w-4 md:h-4 mt-0.5 touch-manipulation flex-shrink-0"
                  />
                  <span className={`text-sm md:text-base leading-relaxed ${colors.secondary}`}>{option}</span>
                </label>
              ) : (
                <div className="flex items-start justify-between gap-3 py-1">
                  <span className={`text-sm md:text-base leading-relaxed flex-1 ${colors.secondary}`}>{option}</span>
                  <div className="flex-shrink-0">
                    {isCorrect && <Check className="text-green-600" size={18} />}
                    {isSelected && !isCorrect && <X className="text-red-600" size={18} />}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuizQuestion;