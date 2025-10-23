import { ChevronRight } from 'lucide-react';
import { useApp } from '../store';

const TopicCard = ({ topic, onSelect }) => {
  const { theme: { isDark, mounted } } = useApp();
  
  // Apply theme even when not mounted
  if (!mounted) {
    return (
      <div
        onClick={() => onSelect(topic)}
        className={`rounded-lg shadow-md p-5 cursor-pointer hover:shadow-lg transform hover:-translate-y-1 transition ${
          isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
        }`}
      >
        <div className="flex items-center justify-between">
          <div>
            <span className={`text-sm font-semibold ${
              isDark ? 'text-indigo-400' : 'text-indigo-600'
            }`}>
              Topic {topic.id}
            </span>
            <h3 className={`text-lg font-bold mt-1 ${
              isDark ? 'text-gray-100' : 'text-gray-800'
            }`}>
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
      className={`rounded-lg shadow-md p-5 cursor-pointer hover:shadow-lg transform hover:-translate-y-1 transition ${
        isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <span className={`text-sm font-semibold ${
            isDark ? 'text-indigo-400' : 'text-indigo-600'
          }`}>
            Topic {topic.id}
          </span>
          <h3 className={`text-lg font-bold mt-1 ${
            isDark ? 'text-gray-100' : 'text-gray-800'
          }`}>
            {topic.title}
          </h3>
        </div>
        <ChevronRight className="text-indigo-400" size={20} />
      </div>
    </div>
  );
};

export default TopicCard;