import { Volume2, VolumeX, Play, Pause, Square } from 'lucide-react';

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

  if (!isSupported) {
    return (
      <div className={`flex items-center gap-2 text-gray-500 ${className}`}>
        <VolumeX size={20} />
        <span className="text-sm">Text-to-speech not supported</span>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Main controls */}
      <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
        {!isSpeaking ? (
          <button
            onClick={onSpeak}
            className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
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
                className="p-1 text-blue-600 hover:bg-blue-100 rounded transition"
                title="Pause"
              >
                <Pause size={16} />
              </button>
            ) : (
              <button
                onClick={onResume}
                className="p-1 text-blue-600 hover:bg-blue-100 rounded transition"
                title="Resume"
              >
                <Play size={16} />
              </button>
            )}
            <button
              onClick={onStop}
              className="p-1 text-red-600 hover:bg-red-100 rounded transition"
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