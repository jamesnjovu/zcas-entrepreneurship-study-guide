import { ChevronLeft, ChevronRight, Award, Check } from 'lucide-react';
import { useTextToSpeech } from '../hooks/useTextToSpeech';
import { useApp, useThemeColors } from '../store';
import SpeechControls from './SpeechControls';
import FloatingProgressBar from './FloatingProgressBar';
import { useEffect, useRef, useState, useCallback } from 'react';

const ContentView = ({ 
  topic, 
  onBackToTopics, 
  onNextTopic, 
  onPreviousTopic,
  onNextUnit,
  onStartQuiz,
  isFirstTopic, 
  isLastTopic,
  hasNextUnit,
  nextUnit,
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
    userStoppedPlayback,
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
    seek,
    resetUserStoppedFlag,
    speakContent,
  } = useTextToSpeech();

  const { theme: { isDark } } = useApp();
  const colors = useThemeColors(isDark);
  const [showFloatingBar, setShowFloatingBar] = useState(true);
  const readingStartTime = useRef(null);
  const trackReadingTimeRef = useRef(trackReadingTime);

  // Update the ref when trackReadingTime changes
  useEffect(() => {
    trackReadingTimeRef.current = trackReadingTime;
  }, [trackReadingTime]);

  const handleTopicCompletion = useCallback(() => {
    if (markTopicCompleted) {
      markTopicCompleted();
    }
    
    // Track reading time if available (only when manually completing)
    if (trackReadingTimeRef.current && readingStartTime.current && topic) {
      const timeSpent = (Date.now() - readingStartTime.current) / 1000;
      // Only track if meaningful time was spent
      if (timeSpent >= 2 && Number.isFinite(timeSpent)) {
        trackReadingTimeRef.current(topic.unitId, topic.id, timeSpent);
        // Reset to prevent duplicate tracking
        readingStartTime.current = Date.now();
      }
    }
  }, [markTopicCompleted, topic]);

  const handleAutoAdvanceToNextTopic = useCallback(() => {
    if (autoAdvance) {
      setTimeout(() => {
        handleTopicCompletion();
        // Reset user stopped flag before advancing to allow auto-start on next topic/unit
        resetUserStoppedFlag();
        
        if (!isLastTopic) {
          // Not the last topic, advance to next topic in current unit
          onNextTopic();
        } else if (hasNextUnit) {
          // Last topic of current unit and there's a next unit available
          onNextUnit();
        }
        // If it's the last topic of the last unit, do nothing (no more content)
      }, 1000);
    }
  }, [autoAdvance, isLastTopic, hasNextUnit, onNextTopic, onNextUnit, resetUserStoppedFlag, handleTopicCompletion]);

  const handleMarkComplete = () => {
    handleTopicCompletion();
  };

  const handleSpeak = useCallback(() => {
    // Convert topic content to text for the new speak function
    let textToSpeak = `${topic.title}. `;
    topic.content.forEach((section) => {
      textToSpeak += `${section.heading}. `;
      section.points.forEach((point) => {
        textToSpeak += `${point}. `;
      });
    });
    
    const shouldAutoAdvance = autoAdvance && (!isLastTopic || hasNextUnit);
    speak(textToSpeak, shouldAutoAdvance ? handleAutoAdvanceToNextTopic : null, true);
  }, [topic, speak, autoAdvance, isLastTopic, hasNextUnit, handleAutoAdvanceToNextTopic]);

  // Track reading start time and auto-start speech
  useEffect(() => {
    if (topic) {
      // Start tracking reading time
      readingStartTime.current = Date.now();
      
      // Only auto-start if enabled and user hasn't manually stopped playback
      if (autoStart && !userStoppedPlayback) {
        // Delay to ensure component is fully rendered
        const timer = setTimeout(() => {
          handleSpeak();
        }, 1000);

        return () => clearTimeout(timer);
      }
    }
  }, [topic.id, autoStart, userStoppedPlayback, handleSpeak]);

  // Separate effect to reset user stopped flag only when topic ID actually changes
  useEffect(() => {
    if (topic?.id) {
      resetUserStoppedFlag();
    }
  }, [topic?.id, resetUserStoppedFlag]);

  // Separate effect for tracking reading time on topic change or unmount
  useEffect(() => {
    // Save previous reading time when topic changes
    return () => {
      if (trackReadingTimeRef.current && readingStartTime.current && topic) {
        const timeSpent = (Date.now() - readingStartTime.current) / 1000;
        // Only track if meaningful time was spent (more than 2 seconds)
        if (timeSpent >= 2 && Number.isFinite(timeSpent)) {
          trackReadingTimeRef.current(topic.unitId, topic.id, timeSpent);
        }
      }
    };
  }, [topic?.id, topic?.unitId]); // Only depend on topic ID changes
  return (
    <div>
      <button
        onClick={onBackToTopics}
        className={`mb-4 px-4 py-3 ${colors.get('button.accent')} rounded-lg shadow hover:shadow-md transition font-semibold min-h-[44px] touch-manipulation`}
      >
        ← Back to Topics
      </button>
      
      <div className={`${colors.backgroundPrimary} ${colors.primary} rounded-lg shadow-lg p-4 md:p-8`}>
        <div className="mb-4 md:mb-6">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className={`text-sm ${colors.conditional('text-indigo-600', 'text-indigo-400')} font-semibold`}>Topic {topic.id}</span>
                <button
                  onClick={handleMarkComplete}
                  className={`flex items-center gap-1 px-3 py-2 rounded-full text-xs font-medium transition ${colors.get('status.success.background')} ${colors.get('status.success.text')} hover:${colors.get('status.success.textSecondary')} min-h-[32px] touch-manipulation`}
                  title="Mark as completed"
                >
                  <Check size={12} />
                  <span className="hidden sm:inline">Complete</span>
                </button>
              </div>
              <h2 className={`text-2xl md:text-3xl font-bold ${colors.conditional('text-indigo-900', 'text-indigo-300')} mt-1`}>{topic.title}</h2>
            </div>
            
            {/* Speech Controls */}
            <div className="relative w-full lg:w-auto lg:flex-shrink-0">
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
          
        </div>
        
        {topic.content.map((section, idx) => (
          <div key={idx} className="mb-6 md:mb-8">
            <h3 className={`text-lg md:text-xl font-bold ${colors.conditional('text-gray-800', 'text-gray-100')} mb-3 md:mb-4 border-l-4 ${colors.conditional('border-indigo-500', 'border-indigo-400')} pl-3 md:pl-4`}>
              {section.heading}
            </h3>
            <ul className="space-y-2 md:space-y-3">
              {section.points.map((point, pidx) => (
                <li key={pidx} className="flex items-start gap-2 md:gap-3">
                  <span className={`${colors.conditional('text-indigo-500', 'text-indigo-400')} mt-1 flex-shrink-0`}>•</span>
                  <span className={`text-sm md:text-base ${colors.secondary} leading-relaxed`}>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
        
        {/* Navigation and Quiz buttons */}
        <div className={`mt-6 md:mt-8 pt-4 md:pt-6 border-t ${colors.get('border.primary')}`}>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
            {/* Navigation buttons */}
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <button
                onClick={onPreviousTopic}
                disabled={isFirstTopic}
                className={`flex items-center justify-center gap-2 px-4 py-3 ${colors.get('button.secondary')} rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] touch-manipulation text-sm md:text-base`}
              >
                <ChevronLeft size={20} />
                <span className="hidden sm:inline">Previous Topic</span>
                <span className="sm:hidden">Previous</span>
              </button>
              
              {/* Show Next Topic or Next Unit button based on position */}
              {isLastTopic && hasNextUnit ? (
                <button
                  onClick={onNextUnit}
                  className={`flex items-center justify-center gap-2 px-4 py-3 ${colors.get('button.accent')} rounded-lg transition font-medium min-h-[44px] touch-manipulation text-sm md:text-base`}
                  title={`Go to Unit ${nextUnit?.id}: ${nextUnit?.title}`}
                >
                  <span className="hidden sm:inline">Next Unit:</span>
                  <span className="sm:hidden">Unit {nextUnit?.id}</span>
                  <span className="hidden lg:inline">{nextUnit?.title}</span>
                  <ChevronRight size={20} />
                </button>
              ) : (
                <button
                  onClick={onNextTopic}
                  disabled={isLastTopic}
                  className={`flex items-center justify-center gap-2 px-4 py-3 ${colors.get('button.secondary')} rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] touch-manipulation text-sm md:text-base`}
                >
                  <span className="hidden sm:inline">Next Topic</span>
                  <span className="sm:hidden">Next</span>
                  <ChevronRight size={20} />
                </button>
              )}
            </div>
            
            {/* Take Quiz button */}
            <button
              onClick={onStartQuiz}
              className={`flex items-center justify-center gap-2 px-4 md:px-6 py-3 ${colors.get('button.success')} text-white rounded-lg transition font-semibold w-full sm:w-auto min-h-[44px] touch-manipulation text-sm md:text-base`}
            >
              <Award size={20} />
              <span className="hidden sm:inline">Take Unit Quiz</span>
              <span className="sm:hidden">Quiz</span>
            </button>
          </div>
        </div>
      </div>

      {/* Floating Progress Bar */}
      <FloatingProgressBar
        isSupported={isSupported}
        isSpeaking={isSpeaking}
        isPaused={isPaused}
        progress={progress}
        currentText={currentText}
        onPlay={isPaused ? resume : handleSpeak}
        onPause={pause}
        onStop={stop}
        onSeek={seek}
        onClose={() => setShowFloatingBar(false)}
        isVisible={showFloatingBar && showProgressBar && (isSpeaking || isPaused || progress > 0)}
      />
    </div>
  );
};

export default ContentView;