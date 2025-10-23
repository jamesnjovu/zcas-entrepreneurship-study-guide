import { useState, useRef, useCallback, useEffect } from 'react';
import { Play, Pause, Square, Volume2, X } from 'lucide-react';
import { useApp } from '../store';

const FloatingProgressBar = ({
  isSupported,
  isSpeaking,
  isPaused,
  progress,
  currentText,
  onPlay,
  onPause,
  onStop,
  onSeek,
  onClose,
  isVisible
}) => {
  const { theme: { isDark } } = useApp();
  const [isDragging, setIsDragging] = useState(false);
  const progressBarRef = useRef(null);

  const handleProgressClick = useCallback((e) => {
    if (!progressBarRef.current || !onSeek) return;
    
    const rect = progressBarRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = (clickX / rect.width) * 100;
    const clampedPercentage = Math.max(0, Math.min(100, percentage));
    
    onSeek(clampedPercentage);
  }, [onSeek]);

  const handleMouseDown = useCallback((e) => {
    setIsDragging(true);
    handleProgressClick(e);
  }, [handleProgressClick]);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;
    handleProgressClick(e);
  }, [isDragging, handleProgressClick]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Add global mouse event listeners when dragging
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  if (!isVisible || !isSupported) return null;

  return (
    <div className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'
    }`}>
      <div className={`rounded-xl shadow-2xl backdrop-blur-md border transition-colors ${
        isDark 
          ? 'bg-gray-900/90 border-gray-700 text-white' 
          : 'bg-white/90 border-gray-200 text-gray-800'
      }`}>
        {/* Main Controls */}
        <div className="flex items-center gap-4 p-4">
          {/* Play/Pause/Stop Controls */}
          <div className="flex items-center gap-2">
            {isSpeaking && !isPaused ? (
              <button
                onClick={onPause}
                className={`p-2 rounded-full transition-colors ${
                  isDark 
                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white' 
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                }`}
                title="Pause"
              >
                <Pause size={16} />
              </button>
            ) : (
              <button
                onClick={onPlay}
                className={`p-2 rounded-full transition-colors ${
                  isDark 
                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white' 
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                }`}
                title={isPaused ? 'Resume' : 'Play'}
              >
                <Play size={16} />
              </button>
            )}
            
            <button
              onClick={onStop}
              className={`p-2 rounded-full transition-colors ${
                isDark 
                  ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-600'
              }`}
              title="Stop"
            >
              <Square size={14} />
            </button>
          </div>

          {/* Progress Section */}
          <div className="flex-1 min-w-0">
            {/* Progress Bar */}
            <div
              ref={progressBarRef}
              className={`relative h-2 rounded-full cursor-pointer transition-colors ${
                isDark ? 'bg-gray-700' : 'bg-gray-300'
              }`}
              onMouseDown={handleMouseDown}
              title="Click or drag to seek"
            >
              {/* Progress Fill */}
              <div
                className={`absolute top-0 left-0 h-full rounded-full transition-all duration-150 ${
                  isDark ? 'bg-indigo-500' : 'bg-indigo-600'
                }`}
                style={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
              />
              
              {/* Drag Handle */}
              <div
                className={`absolute top-1/2 transform -translate-y-1/2 w-4 h-4 rounded-full transition-all duration-150 shadow-lg ${
                  isDark ? 'bg-indigo-400 border-2 border-gray-900' : 'bg-indigo-600 border-2 border-white'
                } ${isDragging ? 'scale-125' : 'scale-100'}`}
                style={{ left: `calc(${Math.max(0, Math.min(100, progress))}% - 8px)` }}
              />
            </div>

            {/* Progress Info */}
            <div className="flex items-center justify-between mt-2 text-xs">
              <div className="flex items-center gap-2">
                <Volume2 size={12} className={isDark ? 'text-gray-400' : 'text-gray-500'} />
                <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                  {isSpeaking ? 'Playing...' : isPaused ? 'Paused' : 'Ready'}
                </span>
              </div>
              <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                {Math.round(progress)}%
              </span>
            </div>

            {/* Current Text Preview */}
            {currentText && (
              <div className={`mt-2 text-xs truncate ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {currentText.length > 80 ? `${currentText.substring(0, 80)}...` : currentText}
              </div>
            )}
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className={`p-2 rounded-full transition-colors ${
              isDark 
                ? 'hover:bg-gray-700 text-gray-400 hover:text-gray-300' 
                : 'hover:bg-gray-200 text-gray-500 hover:text-gray-600'
            }`}
            title="Hide progress bar"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FloatingProgressBar;