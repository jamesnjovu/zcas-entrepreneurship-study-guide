import { ChevronRight } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const TopicCard = ({ topic, onSelect }) => {
  const { isDark, mounted } = useTheme();
  
  // Don't render theme-specific styles until mounted
  if (!mounted) {
    return (
      <div
        onClick={() => onSelect(topic)}
        className="bg-white rounded-lg shadow-md p-5 cursor-pointer hover:shadow-lg transform hover:-translate-y-1 transition"
      >
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm text-indigo-600 font-semibold">Topic {topic.id}</span>
            <h3 className="text-lg font-bold text-gray-800 mt-1">{topic.title}</h3>
          </div>
          <ChevronRight className="text-indigo-400" size={20} />
        </div>
      </div>
    );
  }
  
  return (
    <div
      onClick={() => onSelect(topic)}
      className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-lg shadow-md p-5 cursor-pointer hover:shadow-lg transform hover:-translate-y-1 transition"
    >
      <div className="flex items-center justify-between">
        <div>
          <span className="text-sm text-indigo-600 dark:text-indigo-400 font-semibold">Topic {topic.id}</span>
          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mt-1">{topic.title}</h3>
        </div>
        <ChevronRight className="text-indigo-400" size={20} />
      </div>
    </div>
  );
};

export default TopicCard;