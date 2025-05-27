// AI Services for frontend direct integration

// Gemini API Service
export const geminiService = {
  // API key would typically be stored in environment variables
  apiKey: "", // This should be set by the user

  // Generate text using Gemini API
  generateText: async (prompt: string): Promise<string> => {
    try {
      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": geminiService.apiKey,
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: prompt,
                  },
                ],
              },
            ],
          }),
        },
      );

      const data = await response.json();
      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error("Error generating text with Gemini:", error);
      return "Error generating response. Please check your API key and try again.";
    }
  },

  // Set API key
  setApiKey: (key: string) => {
    geminiService.apiKey = key;
    localStorage.setItem("gemini_api_key", key);
  },

  // Load API key from storage
  loadApiKey: () => {
    const key = localStorage.getItem("gemini_api_key");
    if (key) {
      geminiService.apiKey = key;
      return true;
    }
    return false;
  },
};

// Text-to-Speech Service
export const ttsService = {
  // Using Web Speech API for browser-based TTS
  speak: (
    text: string,
    options: { rate?: number; pitch?: number; voice?: string } = {},
  ) => {
    if (!("speechSynthesis" in window)) {
      console.error("Text-to-speech not supported in this browser");
      return false;
    }

    // Cancel any ongoing speech
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    // Set options
    if (options.rate) utterance.rate = options.rate;
    if (options.pitch) utterance.pitch = options.pitch;

    // Set voice if specified
    if (options.voice) {
      const voices = speechSynthesis.getVoices();
      const selectedVoice = voices.find(
        (voice) => voice.name === options.voice,
      );
      if (selectedVoice) utterance.voice = selectedVoice;
    }

    // Speak the text
    speechSynthesis.speak(utterance);
    return true;
  },

  // Get available voices
  getVoices: (): Promise<SpeechSynthesisVoice[]> => {
    return new Promise((resolve) => {
      if (!("speechSynthesis" in window)) {
        resolve([]);
        return;
      }

      // If voices are already loaded
      let voices = speechSynthesis.getVoices();
      if (voices.length > 0) {
        resolve(voices);
        return;
      }

      // Wait for voices to be loaded
      speechSynthesis.onvoiceschanged = () => {
        voices = speechSynthesis.getVoices();
        resolve(voices);
      };
    });
  },

  // Stop any ongoing speech
  stop: () => {
    if ("speechSynthesis" in window) {
      speechSynthesis.cancel();
      return true;
    }
    return false;
  },
};
