import { BookOpen, Calendar, Settings, TrendingUp } from 'lucide-react';
import UnitCard from './UnitCard';
import { useApp, useThemeColors } from '../store';

const HomeView = ({ units, onUnitSelect, onPastExamSelect, onSettingsSelect, onProgressSelect }) => {
  const { theme: { isDark } } = useApp();
  const colors = useThemeColors(isDark);
  
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {units.map((unit) => (
        <UnitCard key={unit.id} unit={unit} onSelect={onUnitSelect} />
      ))}
      
      {/* Past Exam Questions Card */}
      <div
        onClick={onPastExamSelect}
        className={`p-6 rounded-lg shadow-lg hover:shadow-xl transition cursor-pointer group text-white ${
          colors.conditional(
            'bg-gradient-to-br from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700',
            'bg-gradient-to-br from-purple-600 to-pink-700 hover:from-purple-700 hover:to-pink-800'
          )
        }`}
      >
        <div className="flex items-center mb-4">
          <BookOpen className="mr-3 group-hover:scale-110 transition" size={28} />
          <Calendar className="group-hover:scale-110 transition" size={24} />
        </div>
        
        <h3 className={`text-2xl font-bold mb-2 transition ${
          colors.conditional('group-hover:text-purple-100', 'group-hover:text-purple-200')
        }`}>
          Past Exam Questions
        </h3>
        
        <p className={`mb-4 ${
          colors.conditional('text-purple-100', 'text-purple-200')
        }`}>
          Practice with previous years' exam questions to test your knowledge and prepare for assessments.
        </p>
        
        <div className="flex items-center justify-between">
          <span className={`text-sm ${
            colors.conditional('text-purple-200', 'text-purple-300')
          }`}>
            Multiple years available
          </span>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center transition ${
            colors.conditional(
              'bg-purple-400 group-hover:bg-purple-300',
              'bg-purple-500 group-hover:bg-purple-400'
            )
          }`}>
            <span className="text-sm font-bold">📚</span>
          </div>
        </div>
      </div>
      
      {/* Settings Card */}
      <div
        onClick={onSettingsSelect}
        className={`p-6 rounded-lg shadow-lg hover:shadow-xl transition cursor-pointer group text-white ${
          colors.conditional(
            'bg-gradient-to-br from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900',
            'bg-gradient-to-br from-gray-700 to-gray-900 hover:from-gray-800 hover:to-gray-950'
          )
        }`}
      >
        <div className="flex items-center mb-4">
          <Settings className="mr-3 group-hover:scale-110 transition group-hover:rotate-45" size={28} />
        </div>
        
        <h3 className={`text-2xl font-bold mb-2 transition ${
          colors.conditional('group-hover:text-gray-100', 'group-hover:text-gray-50')
        }`}>
          Settings
        </h3>
        
        <p className={`mb-4 ${
          colors.conditional('text-gray-200', 'text-gray-100')
        }`}>
          Customize your study experience with text-to-speech settings, auto-advance options, and more.
        </p>
        
        <div className="flex items-center justify-between">
          <span className={`text-sm ${
            colors.conditional('text-gray-300', 'text-gray-200')
          }`}>
            Voice & behavior settings
          </span>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center transition ${
            colors.conditional(
              'bg-gray-500 group-hover:bg-gray-400',
              'bg-gray-400 group-hover:bg-gray-300'
            )
          }`}>
            <span className="text-sm font-bold">⚙️</span>
          </div>
        </div>
      </div>
      
      {/* Progress Card */}
      <div
        onClick={onProgressSelect}
        className={`p-6 rounded-lg shadow-lg hover:shadow-xl transition cursor-pointer group text-white ${
          colors.conditional(
            'bg-gradient-to-br from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700',
            'bg-gradient-to-br from-green-600 to-teal-700 hover:from-green-700 hover:to-teal-800'
          )
        }`}
      >
        <div className="flex items-center mb-4">
          <TrendingUp className="mr-3 group-hover:scale-110 transition" size={28} />
        </div>
        
        <h3 className={`text-2xl font-bold mb-2 transition ${
          colors.conditional('group-hover:text-green-100', 'group-hover:text-green-200')
        }`}>
          Study Progress
        </h3>
        
        <p className={`mb-4 ${
          colors.conditional('text-green-100', 'text-green-200')
        }`}>
          Track your learning journey, view completed topics, quiz results, and study statistics.
        </p>
        
        <div className="flex items-center justify-between">
          <span className={`text-sm ${
            colors.conditional('text-green-200', 'text-green-300')
          }`}>
            Topics & quiz tracking
          </span>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center transition ${
            colors.conditional(
              'bg-green-400 group-hover:bg-green-300',
              'bg-green-500 group-hover:bg-green-400'
            )
          }`}>
            <span className="text-sm font-bold">📊</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeView;