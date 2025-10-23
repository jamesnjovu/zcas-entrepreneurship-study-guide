import { ChevronLeft, Volume2, Settings2, Zap, Eye, SkipForward, Play, Monitor, Sun, Moon, TestTube } from 'lucide-react';
import { useTextToSpeech } from '../hooks/useTextToSpeech';
import { useApp, useThemeColors } from '../store';

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
    speak,
    isSpeaking,
    stop,
  } = useTextToSpeech();

  const { theme: { theme, isDark }, setTheme, toggleTheme } = useApp();
  const colors = useThemeColors(isDark);

  if (!isSupported) {
    return (
      <div>
        <button
          onClick={onBack}
          className={`mb-4 px-4 py-3 ${colors.get('button.accent')} rounded-lg shadow hover:shadow-md transition font-semibold min-h-[44px] touch-manipulation`}
        >
          <ChevronLeft className="inline mr-2" size={16} />
          Back
        </button>
        
        <div className={`${colors.backgroundPrimary} rounded-lg shadow-lg p-4 md:p-8`}>
          <div className="text-center">
            <Volume2 size={48} className={`mx-auto mb-3 md:mb-4 md:w-16 md:h-16 ${colors.muted}`} />
            <h2 className={`text-xl md:text-2xl font-bold ${colors.primary} mb-2`}>Text-to-Speech Settings</h2>
            <p className={`text-sm md:text-base ${colors.secondary}`}>Text-to-speech is not supported in your browser</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={onBack}
        className={`mb-4 px-4 py-3 ${colors.get('button.accent')} rounded-lg shadow hover:shadow-md transition font-semibold min-h-[44px] touch-manipulation`}
      >
        <ChevronLeft className="inline mr-2" size={16} />
        Back
      </button>
      
      <div className={`${colors.backgroundPrimary} ${colors.primary} rounded-lg shadow-lg p-4 md:p-8`}>
        <div className="text-center mb-6 md:mb-8">
          <Settings2 size={48} className={`mx-auto mb-3 md:mb-4 md:w-16 md:h-16 ${colors.conditional('text-indigo-600', 'text-indigo-400')}`} />
          <h2 className={`text-2xl md:text-3xl font-bold ${colors.conditional('text-indigo-900', 'text-indigo-300')} mb-2`}>Settings</h2>
          <p className={`text-sm md:text-base ${colors.secondary}`}>Customize your text-to-speech and learning experience</p>
        </div>

        <div className="grid gap-6 md:gap-8 grid-cols-1 lg:grid-cols-3">
          {/* Voice Settings */}
          <div className="space-y-4 md:space-y-6">
            <div className={`border-b ${colors.get('border.primary')} pb-3 md:pb-4`}>
              <h3 className={`text-lg md:text-xl font-bold ${colors.conditional('text-gray-800', 'text-gray-100')} mb-2 flex items-center`}>
                <Volume2 className="mr-2" size={20} />
                Voice Settings
              </h3>
              <p className={`text-xs md:text-sm ${colors.secondary}`}>Configure speech voice, speed, and pitch</p>
            </div>

            {/* Voice Selection */}
            <div>
              <label className={`block text-sm font-medium ${colors.secondary} mb-2`}>
                Voice
              </label>
              <select
                value={selectedVoice?.name || ''}
                onChange={(e) => {
                  const voice = voices.find(v => v.name === e.target.value);
                  setSelectedVoice(voice);
                }}
                className={`w-full px-3 py-3 border ${colors.get('border.primary')} ${colors.backgroundPrimary} ${colors.primary} rounded-lg text-sm md:text-base ${colors.get('interactive.focus')} focus:border-transparent appearance-none min-h-[44px] touch-manipulation`}
              >
                <option value="" disabled>
                  Select a voice...
                </option>
                {voices.map((voice) => (
                  <option 
                    key={voice.name} 
                    value={voice.name}
                  >
                    {voice.name} ({voice.lang})
                  </option>
                ))}
              </select>
              
              {/* Voice Test */}
              {selectedVoice && (
                <div className="mt-3">
                  <p className={`text-xs ${colors.secondary} mb-2`}>
                    Test your voice settings with a sample message
                  </p>
                  <button
                    onClick={() => {
                      try {
                        if (isSpeaking) {
                          stop();
                        } else {
                          speak("Hello! This is a test of your selected voice settings. The voice sounds clear and the speed and pitch are working correctly.");
                        }
                      } catch (error) {
                        console.error('Voice test failed:', error);
                      }
                    }}
                    className={`w-full px-4 py-3 ${
                      isSpeaking 
                        ? colors.get('button.secondary')
                        : colors.get('button.primary')
                    } rounded-lg font-semibold transition min-h-[44px] touch-manipulation flex items-center justify-center gap-2`}
                  >
                    {isSpeaking ? (
                      <>
                        <Volume2 size={18} className="animate-pulse" />
                        Stop Test
                      </>
                    ) : (
                      <>
                        <TestTube size={18} />
                        Test Voice
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>

            {/* Speed Control */}
            <div>
              <label className={`block text-sm font-medium ${colors.secondary} mb-2`}>
                Speech Speed: {rate}x
              </label>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={rate}
                onChange={(e) => setRate(parseFloat(e.target.value))}
                className={`w-full h-3 md:h-2 ${colors.get('progress.background')} rounded-lg appearance-none cursor-pointer touch-manipulation`}
              />
              <div className={`flex justify-between text-xs ${colors.muted} mt-1`}>
                <span>Slow (0.5x)</span>
                <span>Normal (1.0x)</span>
                <span>Fast (2.0x)</span>
              </div>
            </div>

            {/* Pitch Control */}
            <div>
              <label className={`block text-sm font-medium ${colors.secondary} mb-2`}>
                Voice Pitch: {pitch}
              </label>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={pitch}
                onChange={(e) => setPitch(parseFloat(e.target.value))}
                className={`w-full h-3 md:h-2 ${colors.get('progress.background')} rounded-lg appearance-none cursor-pointer touch-manipulation`}
              />
              <div className={`flex justify-between text-xs ${colors.muted} mt-1`}>
                <span>Low (0.5)</span>
                <span>Normal (1.0)</span>
                <span>High (2.0)</span>
              </div>
            </div>
          </div>

          {/* Behavior Settings */}
          <div className="space-y-4 md:space-y-6">
            <div className={`border-b ${colors.get('border.primary')} pb-3 md:pb-4`}>
              <h3 className={`text-lg md:text-xl font-bold ${colors.conditional('text-gray-800', 'text-gray-100')} mb-2 flex items-center`}>
                <Zap className="mr-2" size={20} />
                Behavior Settings
              </h3>
              <p className={`text-xs md:text-sm ${colors.secondary}`}>Control how speech behaves during study</p>
            </div>

            {/* Auto-Start Setting */}
            <div className={`p-3 md:p-4 ${colors.get('status.success.background')} ${colors.get('status.success.border')} rounded-lg border`}>
              <div className="flex items-start gap-3">
                <div className={`p-2 ${colors.conditional('bg-green-100', 'bg-green-800')} rounded-lg`}>
                  <Play size={20} className={colors.conditional('text-green-600', 'text-green-400')} />
                </div>
                <div className="flex-1">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={autoStart}
                      onChange={(e) => setAutoStart(e.target.checked)}
                      className="w-6 h-6 md:w-5 md:h-5 text-green-600 rounded focus:ring-green-500 touch-manipulation"
                    />
                    <div>
                      <span className={`font-medium ${colors.conditional('text-gray-800', 'text-gray-100')}`}>Auto-start speech</span>
                      <p className={`text-sm ${colors.secondary} mt-1`}>
                        Automatically begin reading when you navigate to a new page or topic
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Auto-Advance Setting */}
            <div className={`p-3 md:p-4 ${colors.get('status.info.background')} ${colors.get('status.info.border')} rounded-lg border`}>
              <div className="flex items-start gap-3">
                <div className={`p-2 ${colors.conditional('bg-blue-100', 'bg-blue-800')} rounded-lg`}>
                  <SkipForward size={20} className={colors.conditional('text-blue-600', 'text-blue-400')} />
                </div>
                <div className="flex-1">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={autoAdvance}
                      onChange={(e) => setAutoAdvance(e.target.checked)}
                      className="w-6 h-6 md:w-5 md:h-5 text-blue-600 rounded focus:ring-blue-500 touch-manipulation"
                    />
                    <div>
                      <span className={`font-medium ${colors.conditional('text-gray-800', 'text-gray-100')}`}>Auto-advance pages</span>
                      <p className={`text-sm ${colors.secondary} mt-1`}>
                        Automatically move to the next page or topic when speech finishes
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Progress Bar Setting */}
            <div className={`p-3 md:p-4 ${colors.get('status.purple.background')} ${colors.get('status.purple.border')} rounded-lg border`}>
              <div className="flex items-start gap-3">
                <div className={`p-2 ${colors.conditional('bg-purple-100', 'bg-purple-800')} rounded-lg`}>
                  <Eye size={20} className={colors.conditional('text-purple-600', 'text-purple-400')} />
                </div>
                <div className="flex-1">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showProgressBar}
                      onChange={(e) => setShowProgressBar(e.target.checked)}
                      className="w-6 h-6 md:w-5 md:h-5 text-purple-600 rounded focus:ring-purple-500 touch-manipulation"
                    />
                    <div>
                      <span className={`font-medium ${colors.conditional('text-gray-800', 'text-gray-100')}`}>Show progress bar</span>
                      <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'} mt-1`}>
                        Display reading progress and current text during speech
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Theme Settings */}
          <div className="space-y-4 md:space-y-6">
            <div className={`border-b ${colors.get('border.primary')} pb-3 md:pb-4`}>
              <h3 className={`text-lg md:text-xl font-bold ${colors.conditional('text-gray-800', 'text-gray-100')} mb-2 flex items-center`}>
                <Monitor className="mr-2" size={20} />
                Theme Settings
              </h3>
              <p className={`text-xs md:text-sm ${colors.secondary}`}>Customize the appearance of the application</p>
            </div>

            {/* Theme Selection */}
            <div>
              <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-3`}>
                Theme Mode
              </label>
              <div className="space-y-2">
                {[
                  { value: 'light', label: 'Light', icon: Sun },
                  { value: 'dark', label: 'Dark', icon: Moon },
                  { value: 'system', label: 'System', icon: Monitor }
                ].map(({ value, label, icon: Icon }) => (
                  <label key={value} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="theme"
                      value={value}
                      checked={theme === value}
                      onChange={(e) => setTheme(e.target.value)}
                      className="w-5 h-5 md:w-4 md:h-4 text-indigo-600 touch-manipulation"
                    />
                    <div className="flex items-center gap-2">
                      <Icon size={16} className={isDark ? 'text-gray-300' : 'text-gray-600'} />
                      <span className={isDark ? 'text-gray-100' : 'text-gray-800'}>{label}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Settings Info */}
        <div className={`mt-6 md:mt-8 p-3 md:p-4 ${colors.backgroundSecondary} rounded-lg`}>
          <div className="flex items-start gap-3">
            <Settings2 size={20} className={`${colors.muted} mt-0.5`} />
            <div>
              <h4 className={`font-medium ${colors.conditional('text-gray-800', 'text-gray-100')}`}>Settings Storage</h4>
              <p className={`text-sm ${colors.secondary} mt-1`}>
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