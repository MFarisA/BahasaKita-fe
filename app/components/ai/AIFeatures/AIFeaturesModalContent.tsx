"use client";

import React from "react";
import { geminiService } from "../../../services/aiServices";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { Sparkles, Volume2 } from "lucide-react";
import { ApiKeyDialog, GeminiTab, TTSTab } from ".";
import { useGemini } from "../hooks/useGemini";
import { useTTS } from "../hooks/useTTS";

const AIFeaturesModalContent: React.FC = () => {
  const [showApiKeyDialog, setShowApiKeyDialog] = React.useState(false);
  const [apiKey, setApiKey] = React.useState("");

  const { prompt, setPrompt, geminiResponse, isGenerating, generateText } =
    useGemini();
  const {
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
    engine,
    setEngine,
  } = useTTS();

  // Filter voices to only show Indonesian voices
  const indonesianVoices = voices.filter(
    (v) => v.lang && v.lang.toLowerCase().startsWith("id")
  );

  // Ensure selectedVoice is always Indonesian (selectedVoice is string type: voiceURI)
  React.useEffect(() => {
    if (
      indonesianVoices.length > 0 &&
      (!selectedVoice ||
        !indonesianVoices.some((v) => v.voiceURI === selectedVoice))
    ) {
      setSelectedVoice(indonesianVoices[0].voiceURI);
    }
  }, [voices]);

  // Save API key
  const handleSaveApiKey = () => {
    if (apiKey.trim()) {
      geminiService.setApiKey(apiKey.trim());
      setShowApiKeyDialog(false);
    }
  };

  // Handle Gemini text generation
  const handleGenerateText = async () => {
    if (!geminiService.apiKey) {
      setShowApiKeyDialog(true);
      return;
    }
    await generateText();
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white rounded-xl p-2 md:p-6 shadow-lg max-w-2xl mx-auto border-2 border-blue-100">
      <h2 className="text-xl md:text-2xl text-indigo-900 font-bold mb-4 flex items-center gap-2">
        AI Features
      </h2>
      <Tabs defaultValue="gemini" className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-6 bg-blue-100 p-1 rounded-lg">
          <TabsTrigger value="gemini" className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            <span>Gemini AI</span>
          </TabsTrigger>
          <TabsTrigger value="tts" className="flex items-center gap-2">
            <Volume2 className="h-4 w-4" />
            <span>Text-to-Speech</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="gemini" className="space-y-4">
          <GeminiTab
            prompt={prompt}
            setPrompt={setPrompt}
            geminiResponse={geminiResponse}
            isGenerating={isGenerating}
            onGenerate={handleGenerateText}
            onShowApiKey={() => setShowApiKeyDialog(true)}
          />
        </TabsContent>
        <TabsContent value="tts" className="space-y-4">
          <TTSTab
            textToSpeak={textToSpeak}
            setTextToSpeak={setTextToSpeak}
            voices={indonesianVoices}
            selectedVoice={selectedVoice}
            setSelectedVoice={setSelectedVoice}
            rate={rate}
            setRate={setRate}
            pitch={pitch}
            setPitch={setPitch}
            isSpeaking={isSpeaking}
            onSpeak={speak}
            onStop={stop}
            engine={engine}
            setEngine={setEngine}
          />
        </TabsContent>
      </Tabs>
      <ApiKeyDialog
        open={showApiKeyDialog}
        apiKey={apiKey}
        setApiKey={setApiKey}
        onSave={handleSaveApiKey}
        onOpenChange={setShowApiKeyDialog}
      />
    </div>
  );
};

export default AIFeaturesModalContent;
