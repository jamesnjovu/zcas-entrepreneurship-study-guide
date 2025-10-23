import TopicCard from './TopicCard';
import QuizCard from './QuizCard';
import { useApp, useThemeColors } from '../store';

const TopicsView = ({ unit, onTopicSelect, onStartQuiz }) => {
  const { theme: { isDark } } = useApp();
  const colors = useThemeColors(isDark);
  
  return (
    <div>
      <div className={`${colors.backgroundPrimary} ${colors.primary} rounded-lg shadow-lg p-6 mb-6`}>
        <h2 className={`text-2xl font-bold ${colors.conditional('text-indigo-900', 'text-indigo-300')} mb-2`}>
          Unit {unit.id}: {unit.title}
        </h2>
        <p className={colors.secondary}>Select a topic to study</p>
      </div>
      <div className="grid gap-4">
        {unit.topics.map((topic) => (
          <TopicCard key={topic.id} topic={topic} onSelect={onTopicSelect} />
        ))}
        <QuizCard quizLength={unit.quiz.length} onStartQuiz={onStartQuiz} />
      </div>
    </div>
  );
};

export default TopicsView;