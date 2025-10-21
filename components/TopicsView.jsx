import TopicCard from './TopicCard';
import QuizCard from './QuizCard';

const TopicsView = ({ unit, onTopicSelect, onStartQuiz }) => {
  return (
    <div>
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-bold text-indigo-900 mb-2">
          Unit {unit.id}: {unit.title}
        </h2>
        <p className="text-gray-600">Select a topic to study</p>
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