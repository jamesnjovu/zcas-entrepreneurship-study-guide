import { ChevronRight } from 'lucide-react';
import { useApp, useThemeColors } from '../store';

const TopicCard = ({ topic, onSelect }) => {
  const { theme: { isDark, mounted } } = useApp();
  const colors = useThemeColors(isDark);
  
  // Apply theme even when not mounted
  if (!mounted) {
    return (
      <div
        onClick={() => onSelect(topic)}
        className={`rounded-lg shadow-md p-4 md:p-5 cursor-pointer hover:shadow-lg transform hover:-translate-y-1 transition min-h-[80px] md:min-h-[90px] touch-manipulation ${colors.backgroundPrimary} ${colors.primary}`}
      >
        <div className="flex items-center justify-between h-full">
          <div className="flex-1 flex flex-col justify-center">
            <span className={`text-xs md:text-sm font-semibold ${colors.conditional('text-indigo-600', 'text-indigo-400')}`}>
              Topic {topic.id}
            </span>
            <h3 className={`text-sm md:text-lg font-bold mt-1 line-clamp-2 ${colors.conditional('text-gray-800', 'text-gray-100')}`}>
              {topic.title}
            </h3>
          </div>
          <ChevronRight className={`${colors.conditional('text-indigo-600', 'text-indigo-400')} flex-shrink-0`} size={18} />
        </div>
      </div>
    );
  }
  
  return (
    <div
      onClick={() => onSelect(topic)}
      className={`rounded-lg shadow-md p-4 md:p-5 cursor-pointer hover:shadow-lg transform hover:-translate-y-1 transition min-h-[80px] md:min-h-[90px] touch-manipulation ${colors.backgroundPrimary} ${colors.primary}`}
    >
      <div className="flex items-center justify-between h-full">
        <div className="flex-1 flex flex-col justify-center">
          <span className={`text-xs md:text-sm font-semibold ${colors.conditional('text-indigo-600', 'text-indigo-400')}`}>
            Topic {topic.id}
          </span>
          <h3 className={`text-sm md:text-lg font-bold mt-1 line-clamp-2 ${colors.conditional('text-gray-800', 'text-gray-100')}`}>
            {topic.title}
          </h3>
        </div>
        <ChevronRight className="text-indigo-400 flex-shrink-0" size={18} />
      </div>
    </div>
  );
};

export default TopicCard;