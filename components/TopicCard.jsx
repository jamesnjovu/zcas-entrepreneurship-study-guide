import { ChevronRight } from 'lucide-react';

const TopicCard = ({ topic, onSelect }) => {
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
};

export default TopicCard;