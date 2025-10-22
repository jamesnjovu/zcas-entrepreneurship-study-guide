import { ChevronRight } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const TopicCard = ({ topic, onSelect }) => {
  const { isDark } = useTheme();
  
  return (
    <div
      onClick={() => onSelect(topic)}
      className={`${isDark ? 'bg-gray-800 text-white' : 'bg-white'} rounded-lg shadow-md p-5 cursor-pointer hover:shadow-lg transform hover:-translate-y-1 transition`}
    >
      <div className="flex items-center justify-between">
        <div>
          <span className={`text-sm ${isDark ? 'text-indigo-400' : 'text-indigo-600'} font-semibold`}>Topic {topic.id}</span>
          <h3 className={`text-lg font-bold ${isDark ? 'text-gray-100' : 'text-gray-800'} mt-1`}>{topic.title}</h3>
        </div>
        <ChevronRight className={`${isDark ? 'text-indigo-400' : 'text-indigo-400'}`} size={20} />
      </div>
    </div>
  );
};

export default TopicCard;