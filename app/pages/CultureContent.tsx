"use client";

import React from "react";
import { BookOpen, Globe, Lightbulb } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Button } from "../components/ui/button";
import { culturalContentData } from "../data/culturalContentData";
import { CulturalContentData } from "../types/culturalContent";
import NavbarHome from "../components/common/NavbarHome";
import { notificationsData } from "../data/notificationsData";

interface CultureContentProps {
  language?: string;
}

const CultureContent: React.FC<CultureContentProps> = ({
  language = "BahasaKita",
}) => {
  // Data diimpor dari file data
  const culturalContent: CulturalContentData = culturalContentData;
  const [activeMenu, setActiveMenu] = React.useState("Cultural Content");

  // Notifikasi
  const notifications = notificationsData;

  return (
    <div className="min-h-screen bg-[url('/images/union.svg')] bg-indigo-200 bg-cover bg-center bg-no-repeat bg-fixed p-4 md:p-8">
      <NavbarHome
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        notifications={notifications}
      />
      <div className="min-h-screen p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <header className="text-center mb-12">
            <div className="inline-block rounded-full bg-indigo-100 p-2 mb-4">
              <Globe className="h-6 w-6 text-indigo-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-indigo-900 mb-4">
              Konten Budaya {language}
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Jelajahi kekayaan warisan budaya dari daerah penutur {language} melalui cerita, peribahasa, dan fakta menarik.
            </p>
          </header>

          {/*  Tabs untuk menampilkan konten */}
          <Tabs defaultValue="stories" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
              <TabsTrigger value="stories" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" /> Cerita
              </TabsTrigger>
              <TabsTrigger value="proverbs" className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4" /> Peribahasa
              </TabsTrigger>
              <TabsTrigger value="trivia" className="flex items-center gap-2">
                <Globe className="h-4 w-4" /> Fakta
              </TabsTrigger>
            </TabsList>

            {/* Konten Cerita */}
            <TabsContent value="stories" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {culturalContent.stories.map((story) => (
                  <Card
                    key={story.id}
                    className="overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="aspect-video w-full overflow-hidden">
                      <img
                        src={story.imageUrl}
                        alt={story.title}
                        className="w-full h-full object-cover transition-transform hover:scale-105"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>{story.title}</span>
                        <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded">
                          {story.language}
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-600">{story.excerpt}</p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full bg-indigo-900 text-white hover:bg-indigo-800">
                        Baca Cerita Lengkap
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Konten Peribahasa */}
            <TabsContent value="proverbs" className="space-y-6 min-h-[300px]">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {culturalContent.proverbs.map((proverb) => (
                  <Card
                    key={proverb.id}
                    className="hover:shadow-md transition-shadow"
                  >
                    <CardHeader>
                      <CardTitle className="text-xl font-bold text-indigo-800">
                        {proverb.text}
                      </CardTitle>
                      <CardDescription className="text-lg italic">
                        {proverb.translation}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-600">{proverb.explanation}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Konten Fakta */}
            <TabsContent value="trivia" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {culturalContent.trivia.map((item) => (
                  <Card
                    key={item.id}
                    className="hover:bg-indigo-50 transition-colors"
                  >
                    <CardHeader className="pb-2">
                      <CardDescription className="text-xs font-medium uppercase tracking-wide text-indigo-600">
                        {item.category}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-800 font-medium">{item.fact}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default CultureContent;
