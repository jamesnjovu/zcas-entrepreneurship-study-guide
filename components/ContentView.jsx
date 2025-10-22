import { ChevronLeft, ChevronRight, Award } from 'lucide-react';
import { useTextToSpeech } from '../hooks/useTextToSpeech';
import SpeechControls from './SpeechControls';
import { useEffect } from 'react';

const ContentView = ({ 
  topic, 
  onBackToTopics, 
  onNextTopic, 
  onPreviousTopic, 
  onStartQuiz,
  isFirstTopic, 
  isLastTopic 
}) => {
  const {
    isSupported,
    isSpeaking,
    isPaused,
    voices,
    selectedVoice,
    rate,
    pitch,
    progress,
    currentText,
    autoAdvance,
    showProgressBar,
    autoStart,
    setSelectedVoice,
    setRate,
    setPitch,
    setAutoAdvance,
    setShowProgressBar,
    setAutoStart,
    speak,
    pause,
    resume,
    stop,
    speakContent,
  } = useTextToSpeech();

  const handleAutoAdvanceToNextTopic = () => {
    if (!isLastTopic && autoAdvance) {
      setTimeout(() => {
        onNextTopic();
      }, 1000);
    }
  };

  const handleSpeak = () => {
    // Convert topic content to text for the new speak function
    let textToSpeak = `${topic.title}. `;
    topic.content.forEach((section) => {
      textToSpeak += `${section.heading}. `;
      section.points.forEach((point) => {
        textToSpeak += `${point}. `;
      });
    });
    
    speak(textToSpeak, autoAdvance && !isLastTopic ? handleAutoAdvanceToNextTopic : null);
  };

  // Auto-start speech when component mounts if enabled
  useEffect(() => {
    if (autoStart && topic) {
      // Delay to ensure component is fully rendered
      const timer = setTimeout(() => {
        handleSpeak();
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [topic, autoStart, handleSpeak]); // Run when topic changes or autoStart setting changes
  return (
    <div>
      <button
        onClick={onBackToTopics}
        className="mb-4 px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition text-indigo-600 font-semibold"
      >
        ← Back to Topics
      </button>
      
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="mb-6">
          <div className="flex justify-between items-start gap-4">
            <div>
              <span className="text-sm text-indigo-600 font-semibold">Topic {topic.id}</span>
              <h2 className="text-3xl font-bold text-indigo-900 mt-1">{topic.title}</h2>
            </div>
            
            {/* Speech Controls */}
            <div className="relative">
              <SpeechControls
                isSupported={isSupported}
                isSpeaking={isSpeaking}
                isPaused={isPaused}
                onSpeak={handleSpeak}
                onPause={pause}
                onResume={resume}
                onStop={stop}
                voices={voices}
                selectedVoice={selectedVoice}
                onVoiceChange={setSelectedVoice}
                rate={rate}
                onRateChange={setRate}
                pitch={pitch}
                onPitchChange={setPitch}
                autoAdvance={autoAdvance}
                onAutoAdvanceChange={setAutoAdvance}
                showProgressBar={showProgressBar}
                onShowProgressBarChange={setShowProgressBar}
                className="flex-shrink-0"
              />
            </div>
          </div>
          
          {/* Speech Progress Bar */}
          {showProgressBar && (isSpeaking || progress > 0) && (
            <div className="mt-4 bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  {isSpeaking ? 'Reading...' : 'Speech Complete'}
                </span>
                <span className="text-sm text-gray-500">
                  {Math.round(progress)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-indigo-600 h-2 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
              {currentText && (
                <p className="text-xs text-gray-600 mt-2 line-clamp-2">
                  {currentText.length > 100 ? `${currentText.substring(0, 100)}...` : currentText}
                </p>
              )}
            </div>
          )}
        </div>
        
        {topic.content.map((section, idx) => (
          <div key={idx} className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4 border-l-4 border-indigo-500 pl-4">
              {section.heading}
            </h3>
            <ul className="space-y-3">
              {section.points.map((point, pidx) => (
                <li key={pidx} className="flex items-start gap-3">
                  <span className="text-indigo-500 mt-1">•</span>
                  <span className="text-gray-700">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
        
        {/* Navigation and Quiz buttons */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
            {/* Navigation buttons */}
            <div className="flex gap-2">
              <button
                onClick={onPreviousTopic}
                disabled={isFirstTopic}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={20} />
                Previous Topic
              </button>
              
              <button
                onClick={onNextTopic}
                disabled={isLastTopic}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next Topic
                <ChevronRight size={20} />
              </button>
            </div>
            
            {/* Take Quiz button */}
            <button
              onClick={onStartQuiz}
              className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition font-semibold"
            >
              <Award size={20} />
              Take Unit Quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentView;