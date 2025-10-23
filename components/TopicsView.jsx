import TopicCard from './TopicCard';
import QuizCard from './QuizCard';
import { useApp } from '../store';

const TopicsView = ({ unit, onTopicSelect, onStartQuiz }) => {
  const { theme: { isDark } } = useApp();
  
  return (
    <div>
      <div className={`${isDark ? 'bg-gray-800 text-white' : 'bg-white'} rounded-lg shadow-lg p-6 mb-6`}>
        <h2 className={`text-2xl font-bold ${isDark ? 'text-indigo-300' : 'text-indigo-900'} mb-2`}>
          Unit {unit.id}: {unit.title}
        </h2>
        <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>Select a topic to study</p>
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