import { ChevronRight, BookOpen } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const UnitCard = ({ unit, onSelect }) => {
  const { isDark } = useTheme();
  
  return (
    <div
      onClick={() => onSelect(unit)}
      className={`${isDark ? 'bg-gray-800 text-white' : 'bg-white'} rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transform hover:-translate-y-1 transition`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className={`${isDark ? 'text-indigo-400' : 'text-indigo-600'}`} size={24} />
            <span className={`text-sm font-semibold ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`}>UNIT {unit.id}</span>
          </div>
          <h3 className={`text-xl font-bold ${isDark ? 'text-gray-100' : 'text-gray-800'} mb-3`}>{unit.title}</h3>
          <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} text-sm`}>
            {unit.topics.length} Topics • {unit.quiz.length} Quiz Questions
          </p>
        </div>
        <ChevronRight className={`${isDark ? 'text-indigo-400' : 'text-indigo-400'}`} size={24} />
      </div>
    </div>
  );
};

export default UnitCard;