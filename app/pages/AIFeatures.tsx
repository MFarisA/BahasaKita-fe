"use client";

import React, { useState } from "react";
import { MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface ChatMessage {
  sender: string;
  message: string;
}

const AIFeatures = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { sender: "user", message: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const chatHistory = [];
      chatHistory.push({
        role: "user",
        parts: [
          {
            text: "kamu merupkan AI yang membantu menjawab pertanyaan user seputar bahasa daerah indonesia, jika user menggunakan bahasa yang tidak pantas atau kasar, kamu harus mengingatkan user untuk menggunakan bahasa yang baik dan sopan. jawab pertanyaan user dengan bahasa yang baik dan sopan. jawab dengan maksimal dengan 40 kata ",
          },
        ],
      });
      chatHistory.push({
        role: "user",
        parts: [{ text: userMessage.message }],
      });

      const payload = { contents: chatHistory };

      const apiKey =
        process.env.NEXT_PUBLIC_GEMINI_API_KEY_1 ||
        process.env.NEXT_PUBLIC_GEMINI_API_KEY_2 ||
        process.env.NEXT_PUBLIC_GEMINI_API_KEY_3 ||
        "";
      if (!apiKey) {
        throw new Error(
          "Gemini API Key is not set in environment variables (NEXT_PUBLIC_GEMINI_API_KEY)."
        );
      }

      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      let aiResponseText = "No response";

      if (
        result.candidates &&
        result.candidates.length > 0 &&
        result.candidates[0].content &&
        result.candidates[0].content.parts &&
        result.candidates[0].content.parts.length > 0
      ) {
        aiResponseText = result.candidates[0].content.parts[0].text;
      } else {
        console.error("Unexpected Gemini API response structure:", result);
        aiResponseText = "Error: Could not parse AI response.";
      }

      const aiMessage = { sender: "ai", message: aiResponseText };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : "Unknown error";
      setMessages((prev) => [
        ...prev,
        { sender: "ai", message: `Error: ${errMsg}` },
      ]);
      console.error("Error calling Gemini API:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 rounded-full w-16 h-16 bg-gradient-to-tr from-indigo-800 to-blue-700 shadow-2xl z-50 flex items-center justify-center hover:scale-110 transition-transform duration-200 border-4 border-white"
        aria-label="Open chat"
        style={{ boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)" }}
      >
        <MessageCircle className="h-7 w-7 text-white" />
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          className="w-full max-w-full sm:max-w-[600px] md:max-w-[700px] p-0 rounded-3xl overflow-hidden max-h-[90vh] md:max-h-[700px] border-0 shadow-2xl bg-gradient-to-br from-white via-blue-50 to-sky-100 animate-fadeIn"
        >
          <div className="w-full flex flex-col h-[90vh] md:h-[700px]">
            <DialogHeader className="p-4 md:p-5 border-b-0 flex flex-row items-center justify-between bg-gradient-to-r from-indigo-800 to-blue-700">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="w-10 h-10 md:w-20 md:h-20 flex items-center justify-center">
                  <img
                    src="/images/logo.svg"
                    alt="AI Avatar"
                    className="w-10 h-10 md:w-20 md:h-20"
                  />
                </div>
                <DialogTitle className="text-lg md:text-2xl font-bold text-white tracking-wide drop-shadow-lg">
                  Akasara Kata AI
                </DialogTitle>
              </div>
            </DialogHeader>

            <div className="flex-1 p-2 md:p-5 overflow-y-auto space-y-4 bg-transparent scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-transparent">
              {messages.length === 0 && !isLoading && (
                <div className="flex flex-col justify-center items-center h-full text-gray-400 animate-fadeIn">
                  <span className="text-base md:text-lg font-medium">
                    Mulai ngobrol dengan Akasara Kata AI
                  </span>
                </div>
              )}

              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  } animate-fadeIn`}
                >
                  <div
                    className={`max-w-[90%] md:max-w-[80%] p-2 md:p-3 rounded-2xl shadow-md transition-all duration-200 ${
                      msg.sender === "user"
                        ? "bg-gradient-to-tr from-indigo-800 to-blue-700 text-white ml-4 md:ml-8"
                        : "bg-white text-gray-800 mr-4 md:mr-8 border border-blue-100"
                    } text-sm md:text-base`}
                    style={{
                      boxShadow:
                        msg.sender === "user"
                          ? "0 4px 16px 0 rgba(14, 165, 233, 0.15)"
                          : "0 2px 8px 0 rgba(59, 130, 246, 0.07)",
                    }}
                  >
                    {msg.message}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start animate-fadeIn">
                  <div className="p-2 md:p-3 rounded-2xl bg-white border border-blue-100 animate-pulse shadow-md text-sm md:text-base">
                    Thinking...
                  </div>
                </div>
              )}
            </div>

            <div className="p-2 md:p-4 border-t bg-white/80 backdrop-blur-md mt-auto">
              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ketik pesan..."
                  className="flex-1 rounded-full border-2 border-blue-200 focus:border-indigo-400 bg-white/90 px-3 md:px-5 py-2 md:py-3 text-sm md:text-base shadow-sm transition-all duration-200"
                  aria-label="Chat message input"
                  disabled={isLoading}
                  autoFocus
                />
                <Button
                  type="submit"
                  size="icon"
                  className="rounded-full bg-gradient-to-tr from-indigo-800 to-blue-700 h-10 w-10 md:h-12 md:w-12 shadow-lg hover:scale-110 transition-transform duration-200 border-2 border-white"
                  aria-label="Send message"
                  disabled={isLoading || !input.trim()}
                >
                  <Send className="h-5 w-5 text-white" />
                </Button>
              </form>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AIFeatures;
