export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  language: string;
}

export interface ProfileSettingsProps {
  user?: UserProfile;
  onSave?: (userData: any) => void;
}
