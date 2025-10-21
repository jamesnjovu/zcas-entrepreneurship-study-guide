import { Volume2, VolumeX, Play, Pause, Square, Settings } from 'lucide-react';
import { useState } from 'react';

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
  className = ""
}) => {
  const [showSettings, setShowSettings] = useState(false);

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
            title="Read aloud"
          >
            <Volume2 size={16} />
            <span className="text-sm">Listen</span>
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
        
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="p-1 text-gray-600 hover:bg-gray-200 rounded transition"
          title="Speech settings"
        >
          <Settings size={16} />
        </button>
      </div>

      {/* Settings panel */}
      {showSettings && (
        <div className="absolute z-10 mt-2 p-4 bg-white border rounded-lg shadow-lg min-w-[280px]">
          <h4 className="font-semibold text-gray-800 mb-3">Speech Settings</h4>
          
          {/* Voice selection */}
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Voice
            </label>
            <select
              value={selectedVoice?.name || ''}
              onChange={(e) => {
                const voice = voices.find(v => v.name === e.target.value);
                onVoiceChange(voice);
              }}
              className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
            >
              {voices.map((voice) => (
                <option key={voice.name} value={voice.name}>
                  {voice.name} ({voice.lang})
                </option>
              ))}
            </select>
          </div>

          {/* Rate control */}
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Speed: {rate}x
            </label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={rate}
              onChange={(e) => onRateChange(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Pitch control */}
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pitch: {pitch}
            </label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={pitch}
              onChange={(e) => onPitchChange(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>

          <button
            onClick={() => setShowSettings(false)}
            className="w-full px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition text-sm"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default SpeechControls;