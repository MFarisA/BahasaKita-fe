"use client";

import { useState, useEffect } from "react";
import { ttsService } from "../../../services/aiServices";

export function useTTS() {
  const [textToSpeak, setTextToSpeak] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState("");
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);

  useEffect(() => {
    const loadVoices = async () => {
      const availableVoices = await ttsService.getVoices();
      setVoices(availableVoices);
      if (availableVoices.length > 0) {
        setSelectedVoice(availableVoices[0].name);
      }
    };
    loadVoices();
  }, []);

  const speak = () => {
    if (!textToSpeak.trim()) return;
    const success = ttsService.speak(textToSpeak, { rate, pitch, voice: selectedVoice });
    if (success) setIsSpeaking(true);
  };

  const stop = () => {
    ttsService.stop();
    setIsSpeaking(false);
  };

  return {
    textToSpeak,
    setTextToSpeak,
    voices,
    selectedVoice,
    setSelectedVoice,
    rate,
    setRate,
    pitch,
    setPitch,
    isSpeaking,
    speak,
    stop,
  };
}
