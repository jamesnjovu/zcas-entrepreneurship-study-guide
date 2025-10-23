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
        className={`rounded-lg shadow-lg p-4 md:p-6 cursor-pointer hover:shadow-xl transform hover:-translate-y-1 transition min-h-[120px] md:min-h-[140px] touch-manipulation ${colors.backgroundPrimary} ${colors.primary}`}
      >
        <div className="flex items-start justify-between h-full">
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2 md:mb-3">
                <BookOpen className={colors.conditional('text-indigo-600', 'text-indigo-400')} size={20} />
                <span className={`text-xs md:text-sm font-semibold ${colors.conditional('text-indigo-600', 'text-indigo-400')}`}>
                  UNIT {unit.id}
                </span>
              </div>
              <h3 className={`text-base md:text-xl font-bold mb-2 md:mb-3 line-clamp-2 ${colors.conditional('text-gray-800', 'text-gray-100')}`}>
                {unit.title}
              </h3>
            </div>
            <p className={`text-xs md:text-sm ${colors.secondary} mt-auto`}>
              {unit.topics.length} Topics • {unit.quiz.length} Quiz Questions
            </p>
          </div>
          <ChevronRight className="text-indigo-400 flex-shrink-0" size={20} />
        </div>
      </div>
    );
  }
  
  return (
    <div
      onClick={() => onSelect(unit)}
      className={`rounded-lg shadow-lg p-4 md:p-6 cursor-pointer hover:shadow-xl transform hover:-translate-y-1 transition min-h-[120px] md:min-h-[140px] touch-manipulation ${colors.backgroundPrimary} ${colors.primary}`}
    >
      <div className="flex items-start justify-between h-full">
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2 md:mb-3">
              <BookOpen className={colors.conditional('text-indigo-600', 'text-indigo-400')} size={20} />
              <span className={`text-xs md:text-sm font-semibold ${colors.conditional('text-indigo-600', 'text-indigo-400')}`}>
                UNIT {unit.id}
              </span>
            </div>
            <h3 className={`text-base md:text-xl font-bold mb-2 md:mb-3 line-clamp-2 ${colors.conditional('text-gray-800', 'text-gray-100')}`}>
              {unit.title}
            </h3>
          </div>
          <p className={`text-xs md:text-sm ${colors.secondary} mt-auto`}>
            {unit.topics.length} Topics • {unit.quiz.length} Quiz Questions
          </p>
        </div>
        <ChevronRight className="text-indigo-400 flex-shrink-0" size={20} />
      </div>
    </div>
  );
};

export default UnitCard;