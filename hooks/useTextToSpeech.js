import { useState, useEffect, useCallback, useRef } from 'react';

export const useTextToSpeech = () => {
  const [isSupported, setIsSupported] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [progress, setProgress] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [autoAdvance, setAutoAdvance] = useState(true);
  const [showProgressBar, setShowProgressBar] = useState(true);
  const [autoStart, setAutoStart] = useState(false);
  const [settingsLoaded, setSettingsLoaded] = useState(false);
  const [userStoppedPlayback, setUserStoppedPlayback] = useState(false);
  const [userPausedForAutoStart, setUserPausedForAutoStart] = useState(false);
  
  const utteranceRef = useRef(null);
  const progressIntervalRef = useRef(null);
  const onCompleteRef = useRef(null);
  const fullTextRef = useRef('');
  const textChunksRef = useRef([]);
  const currentChunkIndexRef = useRef(0);

  // Load settings from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedSettings = localStorage.getItem('speechSettings');
        if (savedSettings) {
          const settings = JSON.parse(savedSettings);
          setRate(settings.rate || 1);
          setPitch(settings.pitch || 1);
          setAutoAdvance(settings.autoAdvance !== undefined ? settings.autoAdvance : true);
          setShowProgressBar(settings.showProgressBar !== undefined ? settings.showProgressBar : true);
          setAutoStart(settings.autoStart !== undefined ? settings.autoStart : false);
        }
        setSettingsLoaded(true);
      } catch (error) {
        setSettingsLoaded(true);
      }
    } else {
      setSettingsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setIsSupported(true);
      
      const loadVoices = () => {
        const availableVoices = speechSynthesis.getVoices();
        setVoices(availableVoices);
        
        // Try to restore saved voice or find English voice as default
        const savedSettings = localStorage.getItem('speechSettings');
        let targetVoice = null;
        
        if (savedSettings) {
          try {
            const settings = JSON.parse(savedSettings);
            if (settings.selectedVoiceName) {
              targetVoice = availableVoices.find(voice => voice.name === settings.selectedVoiceName);
            }
          } catch (error) {
            // Silently handle voice parsing errors
          }
        }
        
        if (!targetVoice) {
          targetVoice = availableVoices.find(voice => voice.lang.startsWith('en')) || availableVoices[0];
        }
        
        setSelectedVoice(targetVoice);
      };

      loadVoices();
      speechSynthesis.onvoiceschanged = loadVoices;

      return () => {
        speechSynthesis.cancel();
      };
    }
  }, []);

  // Save settings to localStorage
  const saveSettings = useCallback(() => {
    if (settingsLoaded && typeof window !== 'undefined') {
      try {
        const settings = {
          rate,
          pitch,
          autoAdvance,
          showProgressBar,
          autoStart,
          selectedVoiceName: selectedVoice?.name || null
        };
        localStorage.setItem('speechSettings', JSON.stringify(settings));
      } catch (error) {
        // Silently handle settings save errors
      }
    }
  }, [rate, pitch, autoAdvance, showProgressBar, autoStart, selectedVoice, settingsLoaded]);

  // Save settings when they change (but only after initial load)
  useEffect(() => {
    if (settingsLoaded) {
      saveSettings();
    }
  }, [saveSettings, settingsLoaded]);

  const clearProgress = useCallback(() => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
    setProgress(0);
  }, []);

  // Split text into seekable chunks
  const splitTextIntoChunks = useCallback((text) => {
    const sentences = text.match(/[^\.!?]+[\.!?]+/g) || [text];
    return sentences.map(s => s.trim()).filter(s => s.length > 0);
  }, []);

  const seek = useCallback((percentage) => {
    if (!fullTextRef.current || !textChunksRef.current.length) return;

    const targetIndex = Math.floor((percentage / 100) * textChunksRef.current.length);
    const clampedIndex = Math.max(0, Math.min(textChunksRef.current.length - 1, targetIndex));
    
    currentChunkIndexRef.current = clampedIndex;
    
    // Stop current speech and start from new position
    speechSynthesis.cancel();
    
    const remainingText = textChunksRef.current.slice(clampedIndex).join(' ');
    setProgress(percentage);
    
    if (remainingText) {
      const utterance = new SpeechSynthesisUtterance(remainingText);
      utteranceRef.current = utterance;
      
      if (selectedVoice) utterance.voice = selectedVoice;
      utterance.rate = rate;
      utterance.pitch = pitch;
      
      utterance.onstart = () => {
        setIsSpeaking(true);
        setIsPaused(false);
        
        const remainingChunks = textChunksRef.current.length - clampedIndex;
        const totalChunks = textChunksRef.current.length;
        const startProgress = (clampedIndex / totalChunks) * 100;
        
        let startTime = Date.now();
        const estimatedDuration = (remainingText.length / (rate * 10)) * 1000;
        
        progressIntervalRef.current = setInterval(() => {
          const elapsed = Date.now() - startTime;
          const chunkProgress = Math.min((elapsed / estimatedDuration) * (100 - startProgress), 100 - startProgress);
          setProgress(startProgress + chunkProgress);
        }, 100);
      };
      
      utterance.onend = () => {
        setIsSpeaking(false);
        setIsPaused(false);
        setProgress(100);
        clearProgress();
        
        if (onCompleteRef.current) {
          setTimeout(() => {
            if (onCompleteRef.current) {
              onCompleteRef.current();
              onCompleteRef.current = null;
            }
          }, 500);
        }
      };
      
      utterance.onerror = () => {
        setIsSpeaking(false);
        setIsPaused(false);
        clearProgress();
        onCompleteRef.current = null;
      };
      
      speechSynthesis.speak(utterance);
    }
  }, [selectedVoice, rate, pitch, clearProgress]);

  const speak = useCallback((text, onComplete = null, isManualStart = false) => {
    if (!isSupported || !text) return;

    // Cancel any ongoing speech and clear progress
    if (speechSynthesis.speaking || speechSynthesis.pending) {
      speechSynthesis.cancel();
    }
    clearProgress();

    // Reset user stopped flag if this is a manual start
    if (isManualStart) {
      setUserStoppedPlayback(false);
    }

    // Store full text and create chunks for seeking
    fullTextRef.current = text;
    textChunksRef.current = splitTextIntoChunks(text);
    currentChunkIndexRef.current = 0;

    const utterance = new SpeechSynthesisUtterance(text);
    utteranceRef.current = utterance;
    onCompleteRef.current = onComplete;
    setCurrentText(text);
    
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
    
    utterance.rate = rate;
    utterance.pitch = pitch;
    
    utterance.onstart = () => {
      setIsSpeaking(true);
      setIsPaused(false);
      setProgress(0);
      
      // Start progress tracking
      const estimatedDuration = (text.length / (rate * 10)) * 1000; // Rough estimate in ms
      let startTime = Date.now();
      
      progressIntervalRef.current = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progressPercent = Math.min((elapsed / estimatedDuration) * 100, 95); // Cap at 95% until actual end
        setProgress(progressPercent);
      }, 100);
    };
    
    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
      setProgress(100);
      clearProgress();
      
      // Call completion callback after a short delay
      if (onCompleteRef.current) {
        setTimeout(() => {
          if (onCompleteRef.current) {
            onCompleteRef.current();
            onCompleteRef.current = null;
          }
        }, 500);
      }
    };
    
    utterance.onerror = (event) => {
      setIsSpeaking(false);
      setIsPaused(false);
      clearProgress();
      onCompleteRef.current = null;
    };

    speechSynthesis.speak(utterance);
  }, [isSupported, selectedVoice, rate, pitch, clearProgress]);

  const pause = useCallback(() => {
    if (!isSupported) return;
    speechSynthesis.pause();
    setIsPaused(true);
    
    // Stop progress bar movement when paused
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
    
    // Set flag to prevent auto-start only (not auto-advance)
    setUserPausedForAutoStart(true);
  }, [isSupported]);

  const resume = useCallback(() => {
    if (!isSupported) return;
    speechSynthesis.resume();
    setIsPaused(false);
    
    // Reset flags when manually resuming (re-enable auto-start)
    setUserStoppedPlayback(false);
    setUserPausedForAutoStart(false);
    
    // Restart progress bar when resumed
    if (fullTextRef.current && !progressIntervalRef.current) {
      const currentProgress = progress;
      const remainingProgress = 100 - currentProgress;
      const estimatedRemainingDuration = (fullTextRef.current.length * (remainingProgress / 100) / (rate * 10)) * 1000;
      
      let resumeStartTime = Date.now();
      
      progressIntervalRef.current = setInterval(() => {
        const elapsed = Date.now() - resumeStartTime;
        const additionalProgress = Math.min((elapsed / estimatedRemainingDuration) * remainingProgress, remainingProgress);
        setProgress(currentProgress + additionalProgress);
      }, 100);
    }
  }, [isSupported, progress, rate]);

  const stop = useCallback(() => {
    if (!isSupported) return;
    speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
    clearProgress();
    onCompleteRef.current = null;
    
    // Mark that user manually stopped playback to prevent auto-start
    setUserStoppedPlayback(true);
  }, [isSupported, clearProgress]);

  // Function to reset user stopped flag when changing content
  const resetUserStoppedFlag = useCallback(() => {
    setUserStoppedPlayback(false);
    setUserPausedForAutoStart(false);
  }, []);

  const speakContent = useCallback((topic) => {
    if (!topic || !isSupported) return;

    let textToSpeak = `${topic.title}. `;
    
    topic.content.forEach((section) => {
      textToSpeak += `${section.heading}. `;
      section.points.forEach((point) => {
        textToSpeak += `${point}. `;
      });
    });

    speak(textToSpeak);
  }, [speak, isSupported]);

  const speakQuestion = useCallback((question, options) => {
    if (!isSupported) return;

    let textToSpeak = `Question: ${question}. Options: `;
    options.forEach((option, index) => {
      textToSpeak += `Option ${index + 1}: ${option}. `;
    });

    speak(textToSpeak);
  }, [speak, isSupported]);

  return {
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
    userStoppedPlayback: userStoppedPlayback || userPausedForAutoStart, // Combine flags for auto-start prevention
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
    speakQuestion,
  };
};