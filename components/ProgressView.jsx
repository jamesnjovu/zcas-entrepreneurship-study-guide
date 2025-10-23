import { ChevronLeft, TrendingUp, Award, Clock, CheckCircle, BarChart3 } from 'lucide-react';
import { useApp } from '../store';
import { studyData } from '../data/studyData';

const ProgressView = ({ onBack }) => {
  const { 
    theme: { isDark },
    progress,
    getProgressStats, 
    getQuizResults, 
    isTopicCompleted, 
    clearProgress 
  } = useApp();
  const stats = getProgressStats();
  const allQuizResults = getQuizResults();
  

  // Calculate topic completion stats
  const totalTopics = studyData.units.reduce((total, unit) => total + unit.topics.length, 0);
  const completionPercentage = totalTopics > 0 ? Math.round((stats.completedTopicsCount / totalTopics) * 100) : 0;

  // Get recent quiz results (last 5)
  const recentQuizResults = allQuizResults.slice(-5).reverse();

  const formatTime = (seconds) => {
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ${minutes % 60}m`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getScoreColor = (percentage) => {
    if (percentage >= 80) return isDark ? 'text-green-400' : 'text-green-600';
    if (percentage >= 60) return isDark ? 'text-yellow-400' : 'text-yellow-600';
    return isDark ? 'text-red-400' : 'text-red-600';
  };

  const getScoreBgColor = (percentage) => {
    if (percentage >= 80) return isDark ? 'bg-green-900/30 border-green-700' : 'bg-green-50 border-green-200';
    if (percentage >= 60) return isDark ? 'bg-yellow-900/30 border-yellow-700' : 'bg-yellow-50 border-yellow-200';
    return isDark ? 'bg-red-900/30 border-red-700' : 'bg-red-50 border-red-200';
  };

  return (
    <div>
      <button
        onClick={onBack}
        className={`mb-4 px-4 py-2 ${isDark ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-white text-indigo-600 hover:shadow-md'} rounded-lg shadow transition font-semibold`}
      >
        <ChevronLeft className="inline mr-2" size={16} />
        Back
      </button>
      
      <div className={`${isDark ? 'bg-gray-800 text-white' : 'bg-white'} rounded-lg shadow-lg p-8`}>
        <div className="text-center mb-8">
          <TrendingUp size={64} className={`mx-auto mb-4 ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`} />
          <h2 className={`text-3xl font-bold ${isDark ? 'text-indigo-300' : 'text-indigo-900'} mb-2`}>Study Progress</h2>
          <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Track your learning journey and achievements</p>
          
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className={`p-6 ${isDark ? 'bg-blue-900/30 border-blue-700' : 'bg-blue-50 border-blue-200'} rounded-lg border`}>
            <div className="flex items-center gap-3">
              <div className={`p-3 ${isDark ? 'bg-blue-800' : 'bg-blue-100'} rounded-lg`}>
                <CheckCircle size={24} className={`${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
              </div>
              <div>
                <p className={`text-2xl font-bold ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                  {completionPercentage}%
                </p>
                <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  Topics Completed
                </p>
              </div>
            </div>
          </div>

          <div className={`p-6 ${isDark ? 'bg-green-900/30 border-green-700' : 'bg-green-50 border-green-200'} rounded-lg border`}>
            <div className="flex items-center gap-3">
              <div className={`p-3 ${isDark ? 'bg-green-800' : 'bg-green-100'} rounded-lg`}>
                <Award size={24} className={`${isDark ? 'text-green-400' : 'text-green-600'}`} />
              </div>
              <div>
                <p className={`text-2xl font-bold ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                  {stats.totalQuizzesTaken}
                </p>
                <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  Quizzes Taken
                </p>
              </div>
            </div>
          </div>

          <div className={`p-6 ${isDark ? 'bg-purple-900/30 border-purple-700' : 'bg-purple-50 border-purple-200'} rounded-lg border`}>
            <div className="flex items-center gap-3">
              <div className={`p-3 ${isDark ? 'bg-purple-800' : 'bg-purple-100'} rounded-lg`}>
                <BarChart3 size={24} className={`${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
              </div>
              <div>
                <p className={`text-2xl font-bold ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>
                  {stats.averageQuizScore}%
                </p>
                <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  Average Score
                </p>
              </div>
            </div>
          </div>

          <div className={`p-6 ${isDark ? 'bg-orange-900/30 border-orange-700' : 'bg-orange-50 border-orange-200'} rounded-lg border`}>
            <div className="flex items-center gap-3">
              <div className={`p-3 ${isDark ? 'bg-orange-800' : 'bg-orange-100'} rounded-lg`}>
                <Clock size={24} className={`${isDark ? 'text-orange-400' : 'text-orange-600'}`} />
              </div>
              <div>
                <p className={`text-2xl font-bold ${isDark ? 'text-orange-400' : 'text-orange-600'}`}>
                  {stats.totalReadingTime}m
                </p>
                <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  Study Time
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Topic Progress */}
          <div>
            <h3 className={`text-xl font-bold ${isDark ? 'text-gray-100' : 'text-gray-800'} mb-4 flex items-center`}>
              <CheckCircle className="mr-2" size={24} />
              Topic Completion
            </h3>
            <div className="space-y-4">
              {studyData.units.map((unit) => (
                <div key={unit.id} className={`p-4 ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'} rounded-lg border`}>
                  <h4 className={`font-semibold ${isDark ? 'text-gray-100' : 'text-gray-800'} mb-2`}>
                    {unit.title}
                  </h4>
                  <div className="space-y-2">
                    {unit.topics.map((topic) => {
                      const completed = isTopicCompleted(unit.id, topic.id);
                      return (
                        <div key={topic.id} className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                            completed 
                              ? isDark ? 'bg-green-600 border-green-600' : 'bg-green-500 border-green-500'
                              : isDark ? 'border-gray-500' : 'border-gray-300'
                          }`}>
                            {completed && <CheckCircle size={12} className="text-white" />}
                          </div>
                          <span className={`text-sm ${completed ? (isDark ? 'text-green-400' : 'text-green-600') : (isDark ? 'text-gray-300' : 'text-gray-600')}`}>
                            {topic.title}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quiz Results */}
          <div>
            <h3 className={`text-xl font-bold ${isDark ? 'text-gray-100' : 'text-gray-800'} mb-4 flex items-center`}>
              <Award className="mr-2" size={24} />
              Recent Quiz Results
            </h3>
            {recentQuizResults.length > 0 ? (
              <div className="space-y-3">
                {recentQuizResults.map((result) => {
                  const unit = studyData.units.find(u => u.id === result.unitId);
                  return (
                    <div key={result.id} className={`p-4 ${getScoreBgColor(result.percentage)} rounded-lg border`}>
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className={`font-medium ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
                            {unit?.title || `Unit ${result.unitId}`}
                          </h4>
                          <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                            {result.score}/{result.totalQuestions} questions correct
                          </p>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            {formatDate(result.completedAt)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className={`text-2xl font-bold ${getScoreColor(result.percentage)}`}>
                            {result.percentage}%
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className={`p-8 ${isDark ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg text-center`}>
                <Award size={48} className={`mx-auto mb-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>No quiz results yet</p>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'} mt-1`}>Take your first quiz to see results here</p>
              </div>
            )}
          </div>
        </div>

        {/* Clear Progress */}
        {(stats.completedTopicsCount > 0 || stats.totalQuizzesTaken > 0) && (
          <div className={`mt-8 p-4 ${isDark ? 'bg-red-900/20 border-red-800' : 'bg-red-50 border-red-200'} rounded-lg border`}>
            <div className="flex items-center justify-between">
              <div>
                <h4 className={`font-medium ${isDark ? 'text-red-300' : 'text-red-800'}`}>Reset Progress</h4>
                <p className={`text-sm ${isDark ? 'text-red-400' : 'text-red-600'} mt-1`}>
                  This will clear all your progress, quiz results, and reading time data.
                </p>
              </div>
              <button
                onClick={clearProgress}
                className={`px-4 py-2 ${isDark ? 'bg-red-700 hover:bg-red-600' : 'bg-red-600 hover:bg-red-700'} text-white rounded-lg transition font-medium`}
              >
                Clear All Progress
              </button>
            </div>
          </div>
        )}

        {stats.lastActivity && (
          <div className={`mt-6 text-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Last activity: {formatDate(stats.lastActivity)}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressView;