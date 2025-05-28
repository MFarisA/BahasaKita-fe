"use client";

import { useState, useEffect } from "react";
import { geminiService } from "../../../services/aiServices";

interface GeminiError {
  message: string;
  code?: string;
}

export function useGemini() {
  const [prompt, setPrompt] = useState<string>("");
  const [geminiResponse, setGeminiResponse] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [error, setError] = useState<GeminiError | null>(null);

  useEffect(() => {
    // Cleanup function to cancel any pending operations
    return () => {
      setIsGenerating(false);
      setError(null);
    };
  }, []);

  const validateInput = (): boolean => {
    if (!geminiService.apiKey) {
      setError({ message: "API key is not set" });
      return false;
    }
    if (!prompt.trim()) {
      setError({ message: "Prompt cannot be empty" });
      return false;
    }
    return true;
  };

  const generateText = async () => {
    setError(null);

    if (!validateInput()) return;

    setIsGenerating(true);
    try {
      const response = await geminiService.generateText(prompt);
      setGeminiResponse(response);
    } catch (err) {
      const error = err as Error;
      setError({
        message: "An error occurred while generating text",
        code: error.name,
      });
      setGeminiResponse("");
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    prompt,
    setPrompt,
    geminiResponse,
    setGeminiResponse,
    isGenerating,
    error,
    generateText,
  };
}
