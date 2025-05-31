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
  <Card className="w-full max-w-2xl mx-auto p-2 sm:p-4 md:p-6">
    <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-blue-100">
      <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
        <span className="text-xl sm:text-2xl">✨</span> Asisten AI Gemini
      </CardTitle>
      <CardDescription className="text-sm sm:text-base">
        Ajukan pertanyaan atau dapatkan bantuan belajar bahasa
      </CardDescription>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="prompt">Prompt Anda</Label>
        <Textarea
          id="prompt"
          placeholder="Masukkan pertanyaan atau prompt Anda di sini..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="min-h-24 resize-y w-full text-sm sm:text-base"
        />
      </div>
      {geminiResponse && (
        <div className="space-y-2 mt-4">
          <Label>Respon</Label>
          <div className="p-4 bg-slate-50 rounded-md whitespace-pre-wrap text-sm sm:text-base">
            {geminiResponse}
          </div>
        </div>
      )}
    </CardContent>
    <CardFooter className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-between items-stretch sm:items-center">
      <Button
        variant="outline"
        onClick={onShowApiKey}
        className="flex items-center gap-2 w-full sm:w-auto"
      >
        <Key className="h-4 w-4" />
        <span>Atur API Key</span>
      </Button>
      <Button
        onClick={onGenerate}
        disabled={isGenerating || !prompt.trim()}
        className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 w-full sm:w-auto"
      >
        <Sparkles className="h-4 w-4" />
        <span>{isGenerating ? "Menghasilkan..." : "Hasilkan Respon"}</span>
      </Button>
    </CardFooter>
  </Card>
);

export default GeminiTab;
