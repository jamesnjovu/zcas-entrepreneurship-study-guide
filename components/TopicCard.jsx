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
        className={`rounded-lg shadow-md p-5 cursor-pointer hover:shadow-lg transform hover:-translate-y-1 transition ${colors.backgroundPrimary} ${colors.primary}`}
      >
        <div className="flex items-center justify-between">
          <div>
            <span className={`text-sm font-semibold ${colors.conditional('text-indigo-600', 'text-indigo-400')}`}>
              Topic {topic.id}
            </span>
            <h3 className={`text-lg font-bold mt-1 ${colors.conditional('text-gray-800', 'text-gray-100')}`}>
              {topic.title}
            </h3>
          </div>
          <ChevronRight className="text-indigo-400" size={20} />
        </div>
      </div>
    );
  }
  
  return (
    <div
      onClick={() => onSelect(topic)}
      className={`rounded-lg shadow-md p-5 cursor-pointer hover:shadow-lg transform hover:-translate-y-1 transition ${colors.backgroundPrimary} ${colors.primary}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <span className={`text-sm font-semibold ${colors.conditional('text-indigo-600', 'text-indigo-400')}`}>
            Topic {topic.id}
          </span>
          <h3 className={`text-lg font-bold mt-1 ${colors.conditional('text-gray-800', 'text-gray-100')}`}>
            {topic.title}
          </h3>
        </div>
        <ChevronRight className="text-indigo-400" size={20} />
      </div>
    </div>
  );
};

export default TopicCard;