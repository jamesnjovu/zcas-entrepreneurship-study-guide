import { ChevronRight, BookOpen } from 'lucide-react';

const UnitCard = ({ unit, onSelect }) => {
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
};

export default UnitCard;