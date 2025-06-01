"use client";

import React, { useState } from "react";
import NavbarHome from "../components/common/NavbarHome";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Save, User, Bell, Shield } from "lucide-react";
import { Switch } from "../components/ui/switch";
import {
  interfaceLanguages,
  difficultyLevels,
  dailyGoals,
  reminderTimes,
} from "../data/profileSettingsData";
import { UserProfile3 } from "../types/profile";
import { notificationsData } from "../data/notificationsData";

interface ProfileSettingsProps {
  user?: {
    name: string;
    email: string;
    avatar: string;
    language: string;
  };
  onSave?: (userData: unknown) => void;
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({
  user = {
    name: "Language Learner",
    email: "user@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=learner",
    language: "english",
  },
  onSave,
}) => {
  const [userData, setUserData] = React.useState<UserProfile3>(user);
  const [emailNotifications, setEmailNotifications] = React.useState(true);
  const [pushNotifications, setPushNotifications] = React.useState(true);
  const [activeMenu, setActiveMenu] = useState("Pengaturan Profil");

  const handleChange = (field: string, value: string) => {
    setUserData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    if (onSave) {
      onSave({
        ...userData,
        notifications: {
          email: emailNotifications,
          push: pushNotifications,
        },
      });
    }

    // For demo purposes
    console.log("Saving profile:", userData);
    alert("Profile settings saved!");
  };

  return (
    <div className="min-h-screen bg-[url('/images/union.svg')] bg-indigo-200 bg-cover bg-center bg-no-repeat bg-fixed p-4 md:p-8">
      <NavbarHome activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
      <main className="max-w-5xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6 text-indigo-900">
          Pengaturan Profil
        </h1>

        {/* Tabs  */}
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>Profil</span>
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="flex items-center gap-2"
            >
              <Bell className="h-4 w-4" />
              <span>Notifikasi</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Keamanan</span>
            </TabsTrigger>
          </TabsList>

          {/* Personal information */}
          <TabsContent value="profile" className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Personal Information Card */}
              <Card className="flex-1">
                <CardHeader>
                  <CardTitle>Informasi Pribadi</CardTitle>
                  <CardDescription>
                    Perbarui detail dan preferensi pribadi Anda
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-6 items-start">
                    <div className="flex flex-col items-center space-y-2">
                      <Avatar className="h-24 w-24 border-2 border-primary">
                        <AvatarImage
                          src={userData.avatar}
                          alt={userData.name}
                        />
                        <AvatarFallback>
                          {userData.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <Button variant="outline" size="sm" className="text-white hover:bg-slate-500">
                        Ganti Avatar
                      </Button>
                    </div>

                    <div className="space-y-4 flex-1">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nama Lengkap</Label>
                        <Input
                          id="name"
                          value={userData.name}
                          onChange={(e) => handleChange("name", e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Alamat Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={userData.email}
                          onChange={(e) =>
                            handleChange("email", e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="language">Bahasa Antarmuka</Label>
                    <Select
                      value={userData.language}
                      onValueChange={(value) => handleChange("language", value)}
                    >
                      <SelectTrigger id="language" className="w-full">
                        <SelectValue placeholder="Pilih bahasa" />
                      </SelectTrigger>
                      <SelectContent>
                        {interfaceLanguages.map((lang) => (
                          <SelectItem key={lang.value} value={lang.value}>
                            {lang.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Learning Preferences Card */}
              <Card className="flex-1">
                <CardHeader>
                  <CardTitle>Preferensi Belajar</CardTitle>
                  <CardDescription>
                    Sesuaikan pengalaman belajar Anda
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="difficulty">Tingkat Kesulitan</Label>
                    <Select defaultValue="intermediate">
                      <SelectTrigger id="difficulty" className="w-full">
                        <SelectValue placeholder="Pilih tingkat kesulitan" />
                      </SelectTrigger>
                      <SelectContent>
                        {difficultyLevels.map((level) => (
                          <SelectItem key={level.value} value={level.value}>
                            {level.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="daily-goal">
                      Target Belajar Harian (menit)
                    </Label>
                    <Select defaultValue="15">
                      <SelectTrigger id="daily-goal" className="w-full">
                        <SelectValue placeholder="Pilih target harian" />
                      </SelectTrigger>
                      <SelectContent>
                        {dailyGoals.map((goal) => (
                          <SelectItem key={goal.value} value={goal.value}>
                            {goal.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Pengaturan Notifikasi</CardTitle>
                <CardDescription>
                  Atur bagaimana Anda menerima notifikasi
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications">
                      Notifikasi Email
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Terima notifikasi tentang progres dan pencapaian Anda
                      melalui email
                    </p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="push-notifications">
                      Notifikasi Push
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Terima notifikasi di perangkat Anda
                    </p>
                  </div>
                  <Switch
                    id="push-notifications"
                    checked={pushNotifications}
                    onCheckedChange={setPushNotifications}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reminder-time">Waktu Pengingat Harian</Label>
                  <Select defaultValue="18">
                    <SelectTrigger id="reminder-time" className="w-full">
                      <SelectValue placeholder="Pilih waktu" />
                    </SelectTrigger>
                    <SelectContent>
                      {reminderTimes.map((rt) => (
                        <SelectItem key={rt.value} value={rt.value}>
                          {rt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Pengaturan Keamanan</CardTitle>
                <CardDescription>
                  Kelola preferensi keamanan akun Anda
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Ubah Kata Sandi</Label>
                  <div className="space-y-4">
                    <Input type="password" placeholder="Kata sandi saat ini" />
                    <Input type="password" placeholder="Kata sandi baru" />
                    <Input type="password" placeholder="Konfirmasi kata sandi baru" />
                    <Button variant="outline">Perbarui Kata Sandi</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-8 flex justify-end">
          <Button onClick={handleSave} className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            <span>Simpan Semua Perubahan</span>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default ProfileSettings;
