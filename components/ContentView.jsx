import { ChevronLeft, ChevronRight, Award, Check } from 'lucide-react';
import { useTextToSpeech } from '../hooks/useTextToSpeech';
import { useApp } from '../store';
import SpeechControls from './SpeechControls';
import { useEffect, useRef } from 'react';

const ContentView = ({ 
  topic, 
  onBackToTopics, 
  onNextTopic, 
  onPreviousTopic, 
  onStartQuiz,
  isFirstTopic, 
  isLastTopic,
  markTopicCompleted,
  trackReadingTime
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

  const { theme: { isDark } } = useApp();
  const readingStartTime = useRef(null);
  const trackReadingTimeRef = useRef(trackReadingTime);

  // Update the ref when trackReadingTime changes
  useEffect(() => {
    trackReadingTimeRef.current = trackReadingTime;
  }, [trackReadingTime]);

  const handleAutoAdvanceToNextTopic = () => {
    if (!isLastTopic && autoAdvance) {
      setTimeout(() => {
        handleTopicCompletion();
        onNextTopic();
      }, 1000);
    }
  };

  const handleTopicCompletion = () => {
    if (markTopicCompleted) {
      markTopicCompleted();
    }
    
    // Track reading time if available (only when manually completing)
    if (trackReadingTimeRef.current && readingStartTime.current && topic) {
      const timeSpent = (Date.now() - readingStartTime.current) / 1000;
      // Only track if meaningful time was spent
      if (timeSpent >= 2) {
        trackReadingTimeRef.current(topic.unitId, topic.id, timeSpent);
        // Reset to prevent duplicate tracking
        readingStartTime.current = Date.now();
      }
    }
  };

  const handleMarkComplete = () => {
    handleTopicCompletion();
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

  // Track reading start time and auto-start speech
  useEffect(() => {
    if (topic) {
      // Start tracking reading time
      readingStartTime.current = Date.now();
      
      if (autoStart) {
        // Delay to ensure component is fully rendered
        const timer = setTimeout(() => {
          handleSpeak();
        }, 1000);

        return () => clearTimeout(timer);
      }
    }
  }, [topic, autoStart, handleSpeak]);

  // Separate effect for tracking reading time on topic change or unmount
  useEffect(() => {
    // Save previous reading time when topic changes
    return () => {
      if (trackReadingTimeRef.current && readingStartTime.current && topic) {
        const timeSpent = (Date.now() - readingStartTime.current) / 1000;
        // Only track if meaningful time was spent (more than 2 seconds)
        if (timeSpent >= 2) {
          trackReadingTimeRef.current(topic.unitId, topic.id, timeSpent);
        }
      }
    };
  }, [topic?.id, topic?.unitId]); // Only depend on topic ID changes
  return (
    <div>
      <button
        onClick={onBackToTopics}
        className="mb-4 px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition text-indigo-600 font-semibold"
      >
        ← Back to Topics
      </button>
      
      <div className={`${isDark ? 'bg-gray-800 text-white' : 'bg-white'} rounded-lg shadow-lg p-8`}>
        <div className="mb-6">
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className={`text-sm ${isDark ? 'text-indigo-400' : 'text-indigo-600'} font-semibold`}>Topic {topic.id}</span>
                <button
                  onClick={handleMarkComplete}
                  className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium transition ${isDark ? 'bg-green-800 text-green-200 hover:bg-green-700' : 'bg-green-100 text-green-800 hover:bg-green-200'}`}
                  title="Mark as completed"
                >
                  <Check size={12} />
                  Complete
                </button>
              </div>
              <h2 className={`text-3xl font-bold ${isDark ? 'text-indigo-300' : 'text-indigo-900'} mt-1`}>{topic.title}</h2>
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
            <div className={`mt-4 ${isDark ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg`}>
              <div className="flex items-center justify-between mb-2">
                <span className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                  {isSpeaking ? 'Reading...' : 'Speech Complete'}
                </span>
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {Math.round(progress)}%
                </span>
              </div>
              <div className={`w-full ${isDark ? 'bg-gray-600' : 'bg-gray-200'} rounded-full h-2`}>
                <div 
                  className={`${isDark ? 'bg-indigo-500' : 'bg-indigo-600'} h-2 rounded-full transition-all duration-300 ease-out`}
                  style={{ width: `${progress}%` }}
                />
              </div>
              {currentText && (
                <p className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-600'} mt-2 line-clamp-2`}>
                  {currentText.length > 100 ? `${currentText.substring(0, 100)}...` : currentText}
                </p>
              )}
            </div>
          )}
        </div>
        
        {topic.content.map((section, idx) => (
          <div key={idx} className="mb-8">
            <h3 className={`text-xl font-bold ${isDark ? 'text-gray-100' : 'text-gray-800'} mb-4 border-l-4 ${isDark ? 'border-indigo-400' : 'border-indigo-500'} pl-4`}>
              {section.heading}
            </h3>
            <ul className="space-y-3">
              {section.points.map((point, pidx) => (
                <li key={pidx} className="flex items-start gap-3">
                  <span className={`${isDark ? 'text-indigo-400' : 'text-indigo-500'} mt-1`}>•</span>
                  <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
        
        {/* Navigation and Quiz buttons */}
        <div className={`mt-8 pt-6 border-t ${isDark ? 'border-gray-600' : 'border-gray-200'}`}>
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
            {/* Navigation buttons */}
            <div className="flex gap-2">
              <button
                onClick={onPreviousTopic}
                disabled={isFirstTopic}
                className={`flex items-center gap-2 px-4 py-2 ${isDark ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <ChevronLeft size={20} />
                Previous Topic
              </button>
              
              <button
                onClick={onNextTopic}
                disabled={isLastTopic}
                className={`flex items-center gap-2 px-4 py-2 ${isDark ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                Next Topic
                <ChevronRight size={20} />
              </button>
            </div>
            
            {/* Take Quiz button */}
            <button
              onClick={onStartQuiz}
              className={`flex items-center gap-2 px-6 py-2 ${isDark ? 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800' : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'} text-white rounded-lg transition font-semibold`}
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