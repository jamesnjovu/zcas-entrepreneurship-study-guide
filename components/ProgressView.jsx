import { ChevronLeft, TrendingUp, Award, Clock, CheckCircle, BarChart3 } from 'lucide-react';
import { useApp, useThemeColors } from '../store';
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
  const colors = useThemeColors(isDark);
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
    if (percentage >= 80) return colors.conditional('text-green-600', 'text-green-400');
    if (percentage >= 60) return colors.conditional('text-yellow-600', 'text-yellow-400');
    return colors.conditional('text-red-600', 'text-red-400');
  };

  const getScoreBgColor = (percentage) => {
    if (percentage >= 80) return `${colors.get('status.success.background')} ${colors.get('status.success.border')}`;
    if (percentage >= 60) return `${colors.get('status.warning.background')} ${colors.get('status.warning.border')}`;
    return `${colors.get('status.error.background')} ${colors.get('status.error.border')}`;
  };

  return (
    <div>
      <button
        onClick={onBack}
        className={`mb-4 px-4 py-2 ${colors.get('button.accent')} rounded-lg shadow transition font-semibold`}
      >
        <ChevronLeft className="inline mr-2" size={16} />
        Back
      </button>
      
      <div className={`${colors.backgroundPrimary} ${colors.primary} rounded-lg shadow-lg p-8`}>
        <div className="text-center mb-8">
          <TrendingUp size={64} className={`mx-auto mb-4 ${colors.conditional('text-indigo-600', 'text-indigo-400')}`} />
          <h2 className={`text-3xl font-bold ${colors.conditional('text-indigo-900', 'text-indigo-300')} mb-2`}>Study Progress</h2>
          <p className={colors.secondary}>Track your learning journey and achievements</p>
          
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className={`p-6 ${colors.get('status.info.background')} ${colors.get('status.info.border')} rounded-lg border`}>
            <div className="flex items-center gap-3">
              <div className={`p-3 ${colors.conditional('bg-blue-100', 'bg-blue-800')} rounded-lg`}>
                <CheckCircle size={24} className={colors.conditional('text-blue-600', 'text-blue-400')} />
              </div>
              <div>
                <p className={`text-2xl font-bold ${colors.conditional('text-blue-600', 'text-blue-400')}`}>
                  {completionPercentage}%
                </p>
                <p className={`text-sm ${colors.secondary}`}>
                  Topics Completed
                </p>
              </div>
            </div>
          </div>

          <div className={`p-6 ${colors.get('status.success.background')} ${colors.get('status.success.border')} rounded-lg border`}>
            <div className="flex items-center gap-3">
              <div className={`p-3 ${colors.conditional('bg-green-100', 'bg-green-800')} rounded-lg`}>
                <Award size={24} className={colors.conditional('text-green-600', 'text-green-400')} />
              </div>
              <div>
                <p className={`text-2xl font-bold ${colors.conditional('text-green-600', 'text-green-400')}`}>
                  {stats.totalQuizzesTaken}
                </p>
                <p className={`text-sm ${colors.secondary}`}>
                  Quizzes Taken
                </p>
              </div>
            </div>
          </div>

          <div className={`p-6 ${colors.get('status.purple.background')} ${colors.get('status.purple.border')} rounded-lg border`}>
            <div className="flex items-center gap-3">
              <div className={`p-3 ${colors.conditional('bg-purple-100', 'bg-purple-800')} rounded-lg`}>
                <BarChart3 size={24} className={colors.conditional('text-purple-600', 'text-purple-400')} />
              </div>
              <div>
                <p className={`text-2xl font-bold ${colors.conditional('text-purple-600', 'text-purple-400')}`}>
                  {stats.averageQuizScore}%
                </p>
                <p className={`text-sm ${colors.secondary}`}>
                  Average Score
                </p>
              </div>
            </div>
          </div>

          <div className={`p-6 ${colors.get('status.warning.background')} ${colors.get('status.warning.border')} rounded-lg border`}>
            <div className="flex items-center gap-3">
              <div className={`p-3 ${colors.conditional('bg-orange-100', 'bg-orange-800')} rounded-lg`}>
                <Clock size={24} className={colors.conditional('text-orange-600', 'text-orange-400')} />
              </div>
              <div>
                <p className={`text-2xl font-bold ${colors.conditional('text-orange-600', 'text-orange-400')}`}>
                  {stats.totalReadingTime}m
                </p>
                <p className={`text-sm ${colors.secondary}`}>
                  Study Time
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Topic Progress */}
          <div>
            <h3 className={`text-xl font-bold ${colors.conditional('text-gray-800', 'text-gray-100')} mb-4 flex items-center`}>
              <CheckCircle className="mr-2" size={24} />
              Topic Completion
            </h3>
            <div className="space-y-4">
              {studyData.units.map((unit) => (
                <div key={unit.id} className={`p-4 ${colors.backgroundSecondary} ${colors.get('border.primary')} rounded-lg border`}>
                  <h4 className={`font-semibold ${colors.conditional('text-gray-800', 'text-gray-100')} mb-2`}>
                    {unit.title}
                  </h4>
                  <div className="space-y-2">
                    {unit.topics.map((topic) => {
                      const completed = isTopicCompleted(unit.id, topic.id);
                      return (
                        <div key={topic.id} className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                            completed 
                              ? colors.conditional('bg-green-500 border-green-500', 'bg-green-600 border-green-600')
                              : colors.conditional('border-gray-300', 'border-gray-500')
                          }`}>
                            {completed && <CheckCircle size={12} className="text-white" />}
                          </div>
                          <span className={`text-sm ${completed ? colors.conditional('text-green-600', 'text-green-400') : colors.secondary}`}>
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
            <h3 className={`text-xl font-bold ${colors.conditional('text-gray-800', 'text-gray-100')} mb-4 flex items-center`}>
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
                          <h4 className={`font-medium ${colors.conditional('text-gray-800', 'text-gray-100')}`}>
                            {unit?.title || `Unit ${result.unitId}`}
                          </h4>
                          <p className={`text-sm ${colors.secondary}`}>
                            {result.score}/{result.totalQuestions} questions correct
                          </p>
                          <p className={`text-xs ${colors.muted}`}>
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
              <div className={`p-8 ${colors.backgroundSecondary} rounded-lg text-center`}>
                <Award size={48} className={`mx-auto mb-4 ${colors.muted}`} />
                <p className={colors.secondary}>No quiz results yet</p>
                <p className={`text-sm ${colors.muted} mt-1`}>Take your first quiz to see results here</p>
              </div>
            )}
          </div>
        </div>

        {/* Clear Progress */}
        {(stats.completedTopicsCount > 0 || stats.totalQuizzesTaken > 0) && (
          <div className={`mt-8 p-4 ${colors.get('status.error.background')} ${colors.get('status.error.border')} rounded-lg border`}>
            <div className="flex items-center justify-between">
              <div>
                <h4 className={`font-medium ${colors.get('status.error.text')}`}>Reset Progress</h4>
                <p className={`text-sm ${colors.get('status.error.text')} mt-1`}>
                  This will clear all your progress, quiz results, and reading time data.
                </p>
              </div>
              <button
                onClick={clearProgress}
                className={`px-4 py-2 ${colors.conditional('bg-red-600 hover:bg-red-700', 'bg-red-700 hover:bg-red-600')} text-white rounded-lg transition font-medium`}
              >
                Clear All Progress
              </button>
            </div>
          </div>
        )}

        {stats.lastActivity && (
          <div className={`mt-6 text-center text-sm ${colors.muted}`}>
            Last activity: {formatDate(stats.lastActivity)}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressView;