export interface UserProfile3 {
  name: string;
  email: string;
  avatar: string;
  language: string;
}

export interface ProfileSettingsProps {
  user?: UserProfile3;
  onSave?: (userData: unknown) => void;
}
