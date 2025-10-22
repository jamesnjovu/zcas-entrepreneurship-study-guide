import { ChevronRight, Award } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const QuizCard = ({ quizLength, onStartQuiz }) => {
  const { isDark, mounted } = useTheme();
  
  // Don't render theme-specific styles until mounted
  if (!mounted) {
    return (
      <div
        onClick={onStartQuiz}
        className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg shadow-md p-5 cursor-pointer hover:shadow-lg transform hover:-translate-y-1 transition text-white"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Award size={24} />
            <div>
              <h3 className="text-lg font-bold">Take Unit Quiz</h3>
              <p className="text-sm text-green-100">{quizLength} questions</p>
            </div>
          </div>
          <ChevronRight size={20} />
        </div>
      </div>
    );
  }
  
  return (
    <div
      onClick={onStartQuiz}
      className="bg-gradient-to-r from-green-500 to-green-600 dark:from-green-600 dark:to-green-700 hover:from-green-600 hover:to-green-700 dark:hover:from-green-700 dark:hover:to-green-800 rounded-lg shadow-md p-5 cursor-pointer hover:shadow-lg transform hover:-translate-y-1 transition text-white"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Award size={24} />
          <div>
            <h3 className="text-lg font-bold">Take Unit Quiz</h3>
            <p className="text-sm text-green-100 dark:text-green-200">{quizLength} questions</p>
          </div>
        </div>
        <ChevronRight size={20} />
      </div>
    </div>
  );
};

export default QuizCard;