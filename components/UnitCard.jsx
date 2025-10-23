import { ChevronRight, BookOpen } from 'lucide-react';
import { useApp, useThemeColors } from '../store';

const UnitCard = ({ unit, onSelect }) => {
  const { theme: { isDark, mounted } } = useApp();
  const colors = useThemeColors(isDark);
  
  // Apply theme even when not mounted
  if (!mounted) {
    return (
      <div
        onClick={() => onSelect(unit)}
        className={`rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transform hover:-translate-y-1 transition ${colors.backgroundPrimary} ${colors.primary}`}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className={colors.conditional('text-indigo-600', 'text-indigo-400')} size={24} />
              <span className={`text-sm font-semibold ${colors.conditional('text-indigo-600', 'text-indigo-400')}`}>
                UNIT {unit.id}
              </span>
            </div>
            <h3 className={`text-xl font-bold mb-3 ${colors.conditional('text-gray-800', 'text-gray-100')}`}>
              {unit.title}
            </h3>
            <p className={`text-sm ${colors.secondary}`}>
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
      className={`rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transform hover:-translate-y-1 transition ${colors.backgroundPrimary} ${colors.primary}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className={colors.conditional('text-indigo-600', 'text-indigo-400')} size={24} />
            <span className={`text-sm font-semibold ${colors.conditional('text-indigo-600', 'text-indigo-400')}`}>
              UNIT {unit.id}
            </span>
          </div>
          <h3 className={`text-xl font-bold mb-3 ${colors.conditional('text-gray-800', 'text-gray-100')}`}>
            {unit.title}
          </h3>
          <p className={`text-sm ${colors.secondary}`}>
            {unit.topics.length} Topics • {unit.quiz.length} Quiz Questions
          </p>
        </div>
        <ChevronRight className="text-indigo-400" size={24} />
      </div>
    </div>
  );
};

export default UnitCard;