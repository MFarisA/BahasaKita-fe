import React from "react";
import { Dialog, DialogTrigger, DialogContent, DialogClose, DialogTitle } from "../ui/dialog";
import AIFeaturesModalContent from "../ai/AIFeatures/AIFeaturesModalContent";

const AIFeaturesFloatingButton: React.FC = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Dialog>
        <DialogTrigger asChild>
          <button
            className="flex items-center justify-center w-14 h-14 rounded-full bg-indigo-600 shadow-lg hover:bg-indigo-700 transition-colors focus:outline-none"
            aria-label="Open AI Features"
          >
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="white">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.77 9.77 0 01-4-.8L3 21l1.8-4A7.96 7.96 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl w-full p-0 md:p-0 bg-transparent border-0 shadow-none">
          <DialogTitle className="sr-only">AI Features</DialogTitle>
          <div className="relative">
            <DialogClose asChild>
              <button aria-label="Close" className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 z-10 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow">
                <span className="text-2xl">&times;</span>
              </button>
            </DialogClose>
            <AIFeaturesModalContent />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AIFeaturesFloatingButton;
