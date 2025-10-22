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
  
  const utteranceRef = useRef(null);
  const progressIntervalRef = useRef(null);
  const onCompleteRef = useRef(null);

  // Load settings from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedSettings = localStorage.getItem('speechSettings');
        if (savedSettings) {
          const settings = JSON.parse(savedSettings);
          console.log('Loading settings:', settings); // Debug log
          setRate(settings.rate || 1);
          setPitch(settings.pitch || 1);
          setAutoAdvance(settings.autoAdvance !== undefined ? settings.autoAdvance : true);
          setShowProgressBar(settings.showProgressBar !== undefined ? settings.showProgressBar : true);
          setAutoStart(settings.autoStart !== undefined ? settings.autoStart : false);
        }
      } catch (error) {
        console.log('Error loading speech settings:', error);
      }
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
              console.log('Restoring voice:', settings.selectedVoiceName, 'Found:', targetVoice?.name); // Debug log
            }
          } catch (error) {
            console.log('Error parsing saved voice:', error);
          }
        }
        
        if (!targetVoice) {
          targetVoice = availableVoices.find(voice => voice.lang.startsWith('en')) || availableVoices[0];
        }
        
        setSelectedVoice(targetVoice);
        console.log('Set selected voice to:', targetVoice?.name); // Debug log
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
    if (typeof window !== 'undefined') {
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
        console.log('Saving settings:', settings); // Debug log
      } catch (error) {
        console.log('Error saving speech settings:', error);
      }
    }
  }, [rate, pitch, autoAdvance, showProgressBar, autoStart, selectedVoice]);

  // Save settings when they change
  useEffect(() => {
    saveSettings();
  }, [saveSettings]);

  const clearProgress = useCallback(() => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
    setProgress(0);
  }, []);

  const speak = useCallback((text, onComplete = null) => {
    if (!isSupported || !text) return;

    // Cancel any ongoing speech and clear progress
    speechSynthesis.cancel();
    clearProgress();

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
    
    utterance.onerror = () => {
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
  }, [isSupported]);

  const resume = useCallback(() => {
    if (!isSupported) return;
    speechSynthesis.resume();
    setIsPaused(false);
  }, [isSupported]);

  const stop = useCallback(() => {
    if (!isSupported) return;
    speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
    clearProgress();
    onCompleteRef.current = null;
  }, [isSupported, clearProgress]);

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
    speakQuestion,
  };
};