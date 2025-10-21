import { useState, useEffect, useCallback } from 'react';

export const useTextToSpeech = () => {
  const [isSupported, setIsSupported] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setIsSupported(true);
      
      const loadVoices = () => {
        const availableVoices = speechSynthesis.getVoices();
        setVoices(availableVoices);
        
        // Try to find English voice as default
        const englishVoice = availableVoices.find(voice => 
          voice.lang.startsWith('en')
        );
        setSelectedVoice(englishVoice || availableVoices[0]);
      };

      loadVoices();
      speechSynthesis.onvoiceschanged = loadVoices;

      return () => {
        speechSynthesis.cancel();
      };
    }
  }, []);

  const speak = useCallback((text) => {
    if (!isSupported || !text) return;

    // Cancel any ongoing speech
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
    
    utterance.rate = rate;
    utterance.pitch = pitch;
    
    utterance.onstart = () => {
      setIsSpeaking(true);
      setIsPaused(false);
    };
    
    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };
    
    utterance.onerror = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };

    speechSynthesis.speak(utterance);
  }, [isSupported, selectedVoice, rate, pitch]);

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
  }, [isSupported]);

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
    setSelectedVoice,
    setRate,
    setPitch,
    speak,
    pause,
    resume,
    stop,
    speakContent,
    speakQuestion,
  };
};