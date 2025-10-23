import { ChevronRight, BookOpen } from 'lucide-react';
import { useApp } from '../store';

const UnitCard = ({ unit, onSelect }) => {
  const { theme: { isDark, mounted } } = useApp();
  
  // Apply theme even when not mounted
  if (!mounted) {
    return (
      <div
        onClick={() => onSelect(unit)}
        className={`rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transform hover:-translate-y-1 transition ${
          isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
        }`}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className={isDark ? 'text-indigo-400' : 'text-indigo-600'} size={24} />
              <span className={`text-sm font-semibold ${
                isDark ? 'text-indigo-400' : 'text-indigo-600'
              }`}>
                UNIT {unit.id}
              </span>
            </div>
            <h3 className={`text-xl font-bold mb-3 ${
              isDark ? 'text-gray-100' : 'text-gray-800'
            }`}>
              {unit.title}
            </h3>
            <p className={`text-sm ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {unit.topics.length} Topics • {unit.quiz.length} Quiz Questions
            </p>
          </div>
          <ChevronRight className="text-indigo-400" size={24} />
        </div>
      </div>
    );
  }
  
  return (
    <div
      onClick={() => onSelect(unit)}
      className={`rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transform hover:-translate-y-1 transition ${
        isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className={isDark ? 'text-indigo-400' : 'text-indigo-600'} size={24} />
            <span className={`text-sm font-semibold ${
              isDark ? 'text-indigo-400' : 'text-indigo-600'
            }`}>
              UNIT {unit.id}
            </span>
          </div>
          <h3 className={`text-xl font-bold mb-3 ${
            isDark ? 'text-gray-100' : 'text-gray-800'
          }`}>
            {unit.title}
          </h3>
          <p className={`text-sm ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {unit.topics.length} Topics • {unit.quiz.length} Quiz Questions
          </p>
        </div>
        <ChevronRight className="text-indigo-400" size={24} />
      </div>
    </div>
  );
};

export default UnitCard;