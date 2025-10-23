import { ChevronRight, Award } from 'lucide-react';
import { useApp } from '../store';

const QuizCard = ({ quizLength, onStartQuiz }) => {
  const { theme: { isDark, mounted } } = useApp();
  
  // Apply theme even when not mounted
  if (!mounted) {
    return (
      <div
        onClick={onStartQuiz}
        className={`group rounded-lg shadow-md p-5 cursor-pointer hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200 text-white ${
          isDark 
            ? 'bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 shadow-green-900/20' 
            : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-green-500/20'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full transition-colors ${
              isDark 
                ? 'bg-green-700/50 group-hover:bg-green-600/50' 
                : 'bg-green-400/30 group-hover:bg-green-300/40'
            }`}>
              <Award size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold">Take Unit Quiz</h3>
              <p className={`text-sm transition-colors ${
                isDark ? 'text-green-200' : 'text-green-100'
              }`}>
                {quizLength} questions
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <ChevronRight size={20} className="transform group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div
      onClick={onStartQuiz}
      className={`group rounded-lg shadow-md p-5 cursor-pointer hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200 text-white ${
        isDark 
          ? 'bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 shadow-green-900/20' 
          : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-green-500/20'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-full transition-colors ${
            isDark 
              ? 'bg-green-700/50 group-hover:bg-green-600/50' 
              : 'bg-green-400/30 group-hover:bg-green-300/40'
          }`}>
            <Award size={24} />
          </div>
          <div>
            <h3 className="text-lg font-bold">Take Unit Quiz</h3>
            <p className={`text-sm transition-colors ${
              isDark ? 'text-green-200' : 'text-green-100'
            }`}>
              {quizLength} questions
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <ChevronRight size={20} className="transform group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
};

export default QuizCard;