import { ChevronRight, Award } from 'lucide-react';
import { useApp, useThemeColors } from '../store';

const QuizCard = ({ quizLength, onStartQuiz }) => {
  const { theme: { isDark, mounted } } = useApp();
  const colors = useThemeColors(isDark);
  
  // Apply theme even when not mounted
  if (!mounted) {
    return (
      <div
        onClick={onStartQuiz}
        className={`group rounded-lg shadow-md p-4 md:p-5 cursor-pointer hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200 text-white min-h-[100px] md:min-h-[110px] touch-manipulation ${
          colors.conditional(
            'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-green-500/20',
            'bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 shadow-green-900/20'
          )
        }`}
      >
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-2 md:gap-3 flex-1">
            <div className={`p-2 rounded-full transition-colors ${
              colors.conditional(
                'bg-green-400/30 group-hover:bg-green-300/40',
                'bg-green-700/50 group-hover:bg-green-600/50'
              )
            }`}>
              <Award size={20} />
            </div>
            <div className="flex-1">
              <h3 className="text-base md:text-lg font-bold">
                <span className="hidden sm:inline">Take Unit Quiz</span>
                <span className="sm:hidden">Quiz</span>
              </h3>
              <p className={`text-xs md:text-sm transition-colors ${
                colors.conditional('text-green-100', 'text-green-200')
              }`}>
                {quizLength} questions
              </p>
            </div>
          </div>
          <div className="flex items-center flex-shrink-0">
            <ChevronRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div
      onClick={onStartQuiz}
      className={`group rounded-lg shadow-md p-4 md:p-5 cursor-pointer hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200 text-white min-h-[100px] md:min-h-[110px] touch-manipulation ${
        isDark 
          ? 'bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 shadow-green-900/20' 
          : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-green-500/20'
      }`}
    >
      <div className="flex items-center justify-between h-full">
        <div className="flex items-center gap-2 md:gap-3 flex-1">
          <div className={`p-2 rounded-full transition-colors ${
            isDark 
              ? 'bg-green-700/50 group-hover:bg-green-600/50' 
              : 'bg-green-400/30 group-hover:bg-green-300/40'
          }`}>
            <Award size={20} />
          </div>
          <div className="flex-1">
            <h3 className="text-base md:text-lg font-bold">
              <span className="hidden sm:inline">Take Unit Quiz</span>
              <span className="sm:hidden">Quiz</span>
            </h3>
            <p className={`text-xs md:text-sm transition-colors ${
              isDark ? 'text-green-200' : 'text-green-100'
            }`}>
              {quizLength} questions
            </p>
          </div>
        </div>
        <div className="flex items-center flex-shrink-0">
          <ChevronRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
};

export default QuizCard;