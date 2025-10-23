import { Volume2, VolumeX, Play, Pause, Square } from 'lucide-react';
import { useApp } from '../store';

const SpeechControls = ({ 
  isSupported, 
  isSpeaking, 
  isPaused, 
  onSpeak, 
  onPause, 
  onResume, 
  onStop,
  voices,
  selectedVoice,
  onVoiceChange,
  rate,
  onRateChange,
  pitch,
  onPitchChange,
  autoAdvance,
  onAutoAdvanceChange,
  showProgressBar,
  onShowProgressBarChange,
  className = ""
}) => {
  const { theme: { isDark } } = useApp();

  if (!isSupported) {
    return (
      <div className={`flex items-center gap-2 ${className} ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
        <VolumeX size={20} />
        <span className="text-sm">Text-to-speech not supported</span>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Main controls */}
      <div className={`flex items-center gap-1 rounded-lg p-1 ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
        {!isSpeaking ? (
          <button
            onClick={onSpeak}
            className={`flex items-center gap-1 px-3 py-1 text-white rounded transition ${isDark ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'}`}
            title="Read current page aloud and automatically advance to next page when finished"
          >
            <Volume2 size={16} />
            <span className="text-sm">
              {autoAdvance ? 'Listen & Auto-Advance' : 'Listen'}
            </span>
          </button>
        ) : (
          <div className="flex gap-1">
            {!isPaused ? (
              <button
                onClick={onPause}
                className={`p-1 rounded transition ${isDark ? 'text-blue-400 hover:bg-gray-600' : 'text-blue-600 hover:bg-blue-100'}`}
                title="Pause"
              >
                <Pause size={16} />
              </button>
            ) : (
              <button
                onClick={onResume}
                className={`p-1 rounded transition ${isDark ? 'text-blue-400 hover:bg-gray-600' : 'text-blue-600 hover:bg-blue-100'}`}
                title="Resume"
              >
                <Play size={16} />
              </button>
            )}
            <button
              onClick={onStop}
              className={`p-1 rounded transition ${isDark ? 'text-red-400 hover:bg-gray-600' : 'text-red-600 hover:bg-red-100'}`}
              title="Stop"
            >
              <Square size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpeechControls;