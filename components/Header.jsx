import { Home } from 'lucide-react';

const Header = ({ currentView, onBackToHome }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-indigo-900">Innovation & Entrepreneurship</h1>
          <p className="text-gray-600 mt-2">ZCAS University Study Guide</p>
        </div>
        {currentView !== 'home' && (
          <button
            onClick={onBackToHome}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            <Home size={20} />
            Home
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;