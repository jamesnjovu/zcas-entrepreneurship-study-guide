import { BookOpen, Calendar, Settings, TrendingUp } from 'lucide-react';
import UnitCard from './UnitCard';

const HomeView = ({ units, onUnitSelect, onPastExamSelect, onSettingsSelect, onProgressSelect }) => {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {units.map((unit) => (
        <UnitCard key={unit.id} unit={unit} onSelect={onUnitSelect} />
      ))}
      
      {/* Past Exam Questions Card */}
      <div
        onClick={onPastExamSelect}
        className="p-6 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg shadow-lg hover:shadow-xl transition cursor-pointer group text-white"
      >
        <div className="flex items-center mb-4">
          <BookOpen className="mr-3 group-hover:scale-110 transition" size={28} />
          <Calendar className="group-hover:scale-110 transition" size={24} />
        </div>
        
        <h3 className="text-2xl font-bold mb-2 group-hover:text-purple-100 transition">
          Past Exam Questions
        </h3>
        
        <p className="text-purple-100 mb-4">
          Practice with previous years' exam questions to test your knowledge and prepare for assessments.
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-purple-200">
            Multiple years available
          </span>
          <div className="w-8 h-8 bg-purple-400 rounded-full flex items-center justify-center group-hover:bg-purple-300 transition">
            <span className="text-sm font-bold">📚</span>
          </div>
        </div>
      </div>
      
      {/* Settings Card */}
      <div
        onClick={onSettingsSelect}
        className="p-6 bg-gradient-to-br from-gray-600 to-gray-800 rounded-lg shadow-lg hover:shadow-xl transition cursor-pointer group text-white"
      >
        <div className="flex items-center mb-4">
          <Settings className="mr-3 group-hover:scale-110 transition group-hover:rotate-45" size={28} />
        </div>
        
        <h3 className="text-2xl font-bold mb-2 group-hover:text-gray-100 transition">
          Settings
        </h3>
        
        <p className="text-gray-200 mb-4">
          Customize your study experience with text-to-speech settings, auto-advance options, and more.
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-300">
            Voice & behavior settings
          </span>
          <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center group-hover:bg-gray-400 transition">
            <span className="text-sm font-bold">⚙️</span>
          </div>
        </div>
      </div>
      
      {/* Progress Card */}
      <div
        onClick={onProgressSelect}
        className="p-6 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg shadow-lg hover:shadow-xl transition cursor-pointer group text-white"
      >
        <div className="flex items-center mb-4">
          <TrendingUp className="mr-3 group-hover:scale-110 transition" size={28} />
        </div>
        
        <h3 className="text-2xl font-bold mb-2 group-hover:text-green-100 transition">
          Study Progress
        </h3>
        
        <p className="text-green-100 mb-4">
          Track your learning journey, view completed topics, quiz results, and study statistics.
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-green-200">
            Topics & quiz tracking
          </span>
          <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center group-hover:bg-green-300 transition">
            <span className="text-sm font-bold">📊</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeView;