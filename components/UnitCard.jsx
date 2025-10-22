import { ChevronRight, BookOpen } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const UnitCard = ({ unit, onSelect }) => {
  const { isDark, mounted } = useTheme();
  
  // Don't render theme-specific styles until mounted
  if (!mounted) {
    return (
      <div
        onClick={() => onSelect(unit)}
        className="bg-white rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transform hover:-translate-y-1 transition"
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="text-indigo-600" size={24} />
              <span className="text-sm font-semibold text-indigo-600">UNIT {unit.id}</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">{unit.title}</h3>
            <p className="text-gray-600 text-sm">
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
      className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transform hover:-translate-y-1 transition"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="text-indigo-600 dark:text-indigo-400" size={24} />
            <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">UNIT {unit.id}</span>
          </div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3">{unit.title}</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            {unit.topics.length} Topics • {unit.quiz.length} Quiz Questions
          </p>
        </div>
        <ChevronRight className="text-indigo-400" size={24} />
      </div>
    </div>
  );
};

export default UnitCard;