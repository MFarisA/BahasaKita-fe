import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../../ui/card";
import { Button } from "../../ui/button";
import { Textarea } from "../../ui/textarea";
import { Label } from "../../ui/label";
import { Volume2, VolumeX } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";

interface TTSTabProps {
  textToSpeak: string;
  setTextToSpeak: (v: string) => void;
  voices: SpeechSynthesisVoice[];
  selectedVoice: string;
  setSelectedVoice: (v: string) => void;
  rate: number;
  setRate: (v: number) => void;
  pitch: number;
  setPitch: (v: number) => void;
  isSpeaking: boolean;
  onSpeak: () => void;
  onStop: () => void;
}

const TTSTab: React.FC<TTSTabProps> = ({ textToSpeak, setTextToSpeak, voices, selectedVoice, setSelectedVoice, rate, setRate, pitch, setPitch, isSpeaking, onSpeak, onStop }) => (
  <Card>
    <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50 border-b border-blue-100">
      <CardTitle className="flex items-center gap-2">
        <span className="text-xl">🔊</span> Text-to-Speech
      </CardTitle>
      <CardDescription>
        Convert text to speech for pronunciation practice
      </CardDescription>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="text-to-speak">Text to speak</Label>
        <Textarea
          id="text-to-speak"
          placeholder="Enter text to be spoken..."
          value={textToSpeak}
          onChange={(e) => setTextToSpeak(e.target.value)}
          className="min-h-24"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="voice">Voice</Label>
          <Select value={selectedVoice} onValueChange={setSelectedVoice}>
            <SelectTrigger id="voice">
              <SelectValue placeholder="Select voice" />
            </SelectTrigger>
            <SelectContent>
              {voices.map((voice) => (
                <SelectItem key={voice.name} value={voice.name}>
                  {voice.name} ({voice.lang})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="rate">Speech Rate: {rate}</Label>
          <input
            id="rate"
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={rate}
            onChange={(e) => setRate(parseFloat(e.target.value))}
            className="w-full"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="pitch">Pitch: {pitch}</Label>
          <input
            id="pitch"
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={pitch}
            onChange={(e) => setPitch(parseFloat(e.target.value))}
            className="w-full"
          />
        </div>
      </div>
    </CardContent>
    <CardFooter className="flex justify-end space-x-2">
      {isSpeaking ? (
        <Button
          variant="destructive"
          onClick={onStop}
          className="flex items-center gap-2 font-bold py-2 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
        >
          <VolumeX className="h-4 w-4" />
          <span>Stop Speaking</span>
        </Button>
      ) : (
        <Button
          onClick={onSpeak}
          disabled={!textToSpeak.trim() || voices.length === 0}
          className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
        >
          <Volume2 className="h-4 w-4" />
          <span>Speak Text</span>
        </Button>
      )}
    </CardFooter>
  </Card>
);

export default TTSTab;
