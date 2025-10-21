import { ChevronRight, Award } from 'lucide-react';

const QuizCard = ({ quizLength, onStartQuiz }) => {
  return (
    <div
      onClick={onStartQuiz}
      className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg shadow-md p-5 cursor-pointer hover:shadow-lg transform hover:-translate-y-1 transition text-white"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Award size={24} />
          <div>
            <h3 className="text-lg font-bold">Take Unit Quiz</h3>
            <p className="text-sm text-green-100">{quizLength} questions</p>
          </div>
        </div>
        <ChevronRight size={20} />
      </div>
    </div>
  );
};

export default QuizCard;