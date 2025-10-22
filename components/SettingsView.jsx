import { ChevronLeft, Volume2, Settings2, Zap, Eye, SkipForward, Play } from 'lucide-react';
import { useTextToSpeech } from '../hooks/useTextToSpeech';

const SettingsView = ({ onBack }) => {
  const {
    isSupported,
    voices,
    selectedVoice,
    rate,
    pitch,
    autoAdvance,
    showProgressBar,
    autoStart,
    setSelectedVoice,
    setRate,
    setPitch,
    setAutoAdvance,
    setShowProgressBar,
    setAutoStart,
  } = useTextToSpeech();

  if (!isSupported) {
    return (
      <div>
        <button
          onClick={onBack}
          className="mb-4 px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition text-indigo-600 font-semibold"
        >
          <ChevronLeft className="inline mr-2" size={16} />
          Back
        </button>
        
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center">
            <Volume2 size={64} className="mx-auto mb-4 text-gray-400" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Text-to-Speech Settings</h2>
            <p className="text-gray-600">Text-to-speech is not supported in your browser</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={onBack}
        className="mb-4 px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition text-indigo-600 font-semibold"
      >
        <ChevronLeft className="inline mr-2" size={16} />
        Back
      </button>
      
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <Settings2 size={64} className="mx-auto mb-4 text-indigo-600" />
          <h2 className="text-3xl font-bold text-indigo-900 mb-2">Settings</h2>
          <p className="text-gray-600">Customize your text-to-speech and learning experience</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Voice Settings */}
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center">
                <Volume2 className="mr-2" size={24} />
                Voice Settings
              </h3>
              <p className="text-sm text-gray-600">Configure speech voice, speed, and pitch</p>
            </div>

            {/* Voice Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Voice
              </label>
              <select
                value={selectedVoice?.name || ''}
                onChange={(e) => {
                  const voice = voices.find(v => v.name === e.target.value);
                  setSelectedVoice(voice);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                {voices.map((voice) => (
                  <option key={voice.name} value={voice.name} className="text-gray-900 bg-white">
                    {voice.name} ({voice.lang})
                  </option>
                ))}
              </select>
            </div>

            {/* Speed Control */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Speech Speed: {rate}x
              </label>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={rate}
                onChange={(e) => setRate(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Slow (0.5x)</span>
                <span>Normal (1.0x)</span>
                <span>Fast (2.0x)</span>
              </div>
            </div>

            {/* Pitch Control */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Voice Pitch: {pitch}
              </label>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={pitch}
                onChange={(e) => setPitch(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Low (0.5)</span>
                <span>Normal (1.0)</span>
                <span>High (2.0)</span>
              </div>
            </div>
          </div>

          {/* Behavior Settings */}
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center">
                <Zap className="mr-2" size={24} />
                Behavior Settings
              </h3>
              <p className="text-sm text-gray-600">Control how speech behaves during study</p>
            </div>

            {/* Auto-Start Setting */}
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Play size={20} className="text-green-600" />
                </div>
                <div className="flex-1">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={autoStart}
                      onChange={(e) => setAutoStart(e.target.checked)}
                      className="w-5 h-5 text-green-600 rounded focus:ring-green-500"
                    />
                    <div>
                      <span className="font-medium text-gray-800">Auto-start speech</span>
                      <p className="text-sm text-gray-600 mt-1">
                        Automatically begin reading when you navigate to a new page or topic
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Auto-Advance Setting */}
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <SkipForward size={20} className="text-blue-600" />
                </div>
                <div className="flex-1">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={autoAdvance}
                      onChange={(e) => setAutoAdvance(e.target.checked)}
                      className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <div>
                      <span className="font-medium text-gray-800">Auto-advance pages</span>
                      <p className="text-sm text-gray-600 mt-1">
                        Automatically move to the next page or topic when speech finishes
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Progress Bar Setting */}
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Eye size={20} className="text-purple-600" />
                </div>
                <div className="flex-1">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showProgressBar}
                      onChange={(e) => setShowProgressBar(e.target.checked)}
                      className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
                    />
                    <div>
                      <span className="font-medium text-gray-800">Show progress bar</span>
                      <p className="text-sm text-gray-600 mt-1">
                        Display reading progress and current text during speech
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Settings Info */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-start gap-3">
            <Settings2 size={20} className="text-gray-500 mt-0.5" />
            <div>
              <h4 className="font-medium text-gray-800">Settings Storage</h4>
              <p className="text-sm text-gray-600 mt-1">
                All your preferences are automatically saved and will be restored when you return to the app.
                Your settings are stored locally on your device.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;