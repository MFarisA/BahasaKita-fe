"use client";

import React, { useState, useEffect } from "react";
import { geminiService } from "../services/aiServices";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Sparkles, Volume2 } from "lucide-react";
import { ApiKeyDialog, GeminiTab, TTSTab } from "../components/ai/AIFeatures";
import { useGemini } from "../components/ai/hooks/useGemini";
import { useTTS } from "../components/ai/hooks/useTTS";

const AIFeatures: React.FC = () => {
  // API Key Dialog state
  const [showApiKeyDialog, setShowApiKeyDialog] = useState(false);
  const [apiKey, setApiKey] = useState("");

  // Custom hooks
  const {
    prompt,
    setPrompt,
    geminiResponse,
    // setGeminiResponse,
    isGenerating,
    generateText,
  } = useGemini();
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

  // Load Gemini API key on mount
  useEffect(() => {
    geminiService.loadApiKey();
  }, []);

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
    <div className="bg-gradient-to-b from-blue-50 to-white rounded-xl p-6 shadow-lg max-w-4xl mx-auto border-2 border-blue-100">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <span className="text-3xl">🤖</span> AI Features
      </h2>
      <Tabs defaultValue="gemini" className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8 bg-blue-100 p-1 rounded-lg">
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
            voices={voices}
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

export default AIFeatures;
