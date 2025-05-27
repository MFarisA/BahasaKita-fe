import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../../ui/card";
import { Button } from "../../ui/button";
import { Textarea } from "../../ui/textarea";
import { Label } from "../../ui/label";
import { Sparkles, Key } from "lucide-react";

interface GeminiTabProps {
  prompt: string;
  setPrompt: (v: string) => void;
  geminiResponse: string;
  isGenerating: boolean;
  onGenerate: () => void;
  onShowApiKey: () => void;
}

const GeminiTab: React.FC<GeminiTabProps> = ({ prompt, setPrompt, geminiResponse, isGenerating, onGenerate, onShowApiKey }) => (
  <Card>
    <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-blue-100">
      <CardTitle className="flex items-center gap-2">
        <span className="text-xl">✨</span> Gemini AI Assistant
      </CardTitle>
      <CardDescription>
        Ask questions or get help with language learning
      </CardDescription>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="prompt">Your prompt</Label>
        <Textarea
          id="prompt"
          placeholder="Enter your question or prompt here..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="min-h-24"
        />
      </div>
      {geminiResponse && (
        <div className="space-y-2 mt-4">
          <Label>Response</Label>
          <div className="p-4 bg-slate-50 rounded-md whitespace-pre-wrap">
            {geminiResponse}
          </div>
        </div>
      )}
    </CardContent>
    <CardFooter className="flex justify-between">
      <Button
        variant="outline"
        onClick={onShowApiKey}
        className="flex items-center gap-2"
      >
        <Key className="h-4 w-4" />
        <span>Set API Key</span>
      </Button>
      <Button
        onClick={onGenerate}
        disabled={isGenerating || !prompt.trim()}
        className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
      >
        <Sparkles className="h-4 w-4" />
        <span>{isGenerating ? "Generating..." : "Generate Response"}</span>
      </Button>
    </CardFooter>
  </Card>
);

export default GeminiTab;
