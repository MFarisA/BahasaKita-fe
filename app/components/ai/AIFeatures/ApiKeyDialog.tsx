import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "../../ui/dialog";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Button } from "../../ui/button";
import React from "react";

interface ApiKeyDialogProps {
  open: boolean;
  apiKey: string;
  setApiKey: (key: string) => void;
  onSave: () => void;
  onOpenChange: (open: boolean) => void;
}

const ApiKeyDialog: React.FC<ApiKeyDialogProps> = ({ open, apiKey, setApiKey, onSave, onOpenChange }) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Set Gemini API Key</DialogTitle>
        <DialogDescription>
          Enter your Gemini API key to use the AI features. You can get an API key from the Google AI Studio.
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-4 py-4">
        <div className="space-y-2">
          <Label htmlFor="api-key">API Key</Label>
          <Input
            id="api-key"
            type="password"
            placeholder="Enter your Gemini API key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
        </div>
        <p className="text-sm text-muted-foreground">
          Your API key will be stored locally in your browser and is not sent to our servers.
        </p>
      </div>
      <DialogFooter>
        <Button onClick={onSave} disabled={!apiKey.trim()}>
          Save API Key
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export default ApiKeyDialog;
