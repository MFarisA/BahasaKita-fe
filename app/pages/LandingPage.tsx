"use client";

import React, { useState } from "react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import {
  features,
  extraFeatures,
  quickLinks,
  featuresList,
} from "../data/landingPageData";
import * as LucideIcons from "lucide-react";
import Link from 'next/link';
import { FunctionComponent, SVGProps } from 'react';

// Helper function to safely get Lucide icon component by string name
type LucideIconComponent = FunctionComponent<SVGProps<SVGSVGElement>>;
function getLucideIcon(name: string): LucideIconComponent {
  return (LucideIcons as Record<string, unknown>)[name] as LucideIconComponent || (() => null);
}

const LandingPage: React.FC = () => {
  const SparklesIcon = LucideIcons["Sparkles"];
  const AwardIcon = LucideIcons["Award"];
  const UsersIcon = LucideIcons["Users"];
  const ArrowRightIcon = LucideIcons["ArrowRight"];
  const [activeLanguage, setActiveLanguage] = useState(0);


  const localLanguages = [
    { name: "Bahasa Jawa", flag: "🏛️", region: "Jawa Tengah & Timur" },
    { name: "Bahasa Sunda", flag: "🏔️", region: "Jawa Barat" },
    { name: "Bahasa Bali", flag: "🏝️", region: "Bali" },
    { name: "Bahasa Batak", flag: "🏞️", region: "Sumatera Utara" },
    { name: "Bahasa Minang", flag: "🏔️", region: "Sumatera Barat" },
    { name: "Bahasa Betawi", flag: "🏙️", region: "Jakarta" },
    { name: "Bahasa Bugis", flag: "⛵", region: "Sulawesi Selatan" },
    { name: "Bahasa Dayak", flag: "🌳", region: "Kalimantan" },
    { name: "Bahasa Aceh", flag: "🕌", region: "Aceh" },
    { name: "Bahasa Banjar", flag: "🏞️", region: "Kalimantan Selatan" },
    { name: "Bahasa Makassar", flag: "🏖️", region: "Sulawesi Selatan" },
    { name: "Bahasa Toraja", flag: "🏔️", region: "Sulawesi Selatan" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 via-purple-50 to-blue-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 md:pt-20 lg:pt-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="inline-block rounded-full bg-indigo-100 p-2 mb-4">
              <SparklesIcon className="h-6 w-6 text-indigo-600" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-indigo-900 mb-4">
              Language Learning
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {" "}
                Gamified
              </span>
            </h1>
            <p className="max-w-[700px] text-lg md:text-xl text-slate-700 mb-8">
              Master new languages through fun, interactive lessons and games.
              Track your progress, earn rewards, and connect with a global
              community of learners.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/home">
                <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700">
                  Get Started
                </Button>
                </Link>
              <Link href="/register">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-indigo-900 border-0 hover:bg-indigo-700"
                >
                  Create Account
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Language Selection */}
      <section className="py-12 backdrop-blur-lg bg-white/60 border-y border-white/10 mt-20">
        <div className="container mx-auto px-6">
          <h3 className="text-2xl font-bold text-center mb-8 bg-indigo-900 bg-clip-text text-transparent">
            Pilih Bahasa Daerah Favoritmu
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {localLanguages.map((lang, index) => (
              <button
                key={index}
                onClick={() => setActiveLanguage(index)}
                className={`group p-4 rounded-xl border transition-all  shadow-lg bg-white/80 transform hover:scale-105 ${
                  activeLanguage === index
                    ? "bg-black/50 border-transparent shadow-xl"
                    : "bg-white/10 border-white/20 hover:bg-white/20"
                }`}
              >
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                  {lang.flag}
                </div>
                <div className="font-semibold text-black text-sm">{lang.name}</div>
                <div className="text-xs text-gray-800 group-hover:text-gray-300">
                  {lang.region}
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

        {/* Floating badges */}
        <div className="absolute top-40 left-10 hidden lg:block">
          <div className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg flex items-center gap-2">
            <AwardIcon className="h-5 w-5 text-yellow-500" />
            <span className="text-sm text-black font-medium">Earn Achievements</span>
          </div>
        </div>
        <div className="absolute top-60 right-10 hidden lg:block">
          <div className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg flex items-center gap-2">
            <UsersIcon className="h-5 w-5 text-blue-500" />
            <span className="text-sm text-black font-medium">Join Community</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-indigo-900 mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Our gamified approach makes language learning engaging, effective,
              and fun.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => {
              const Icon = getLucideIcon(feature.icon);
              return (
                <Card
                  key={feature.title}
                  className="bg-white/80 backdrop-blur-sm border-none shadow-md hover:shadow-lg transition-shadow"
                >
                  <CardHeader>
                    <div className={feature.iconClass}>
                      <Icon className={`h-6 w-6 ${feature.iconColor}`} />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Extra Features Section */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-indigo-900 mb-4">
              Explore Extra Features
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Enhance your learning experience with our additional features.
            </p>
          </div>

          <Tabs defaultValue="cultural" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              {extraFeatures.map((ef) => (
                <TabsTrigger
                  key={ef.value}
                  value={ef.value}
                  className="text-lg py-3"
                >
                  {ef.value === "cultural"
                    ? "Local Cultural Content"
                    : "Community Forum"}
                </TabsTrigger>
              ))}
            </TabsList>
            {extraFeatures.map((ef) => {
              const Icon = getLucideIcon(ef.icon);
              return (
                <TabsContent
                  key={ef.value}
                  value={ef.value}
                  className="border rounded-lg p-6 bg-white/80 shadow-md"
                >
                  <div className="flex flex-col md:flex-row gap-6 items-center">
                    <div className="md:w-1/2">
                      <h3 className="text-2xl font-bold text-indigo-900 mb-4">
                        {ef.title}
                      </h3>
                      <p className="text-slate-600 mb-4">{ef.description}</p>
                      <ul className="space-y-2 mb-6">
                        {ef.items.map((item) => (
                          <li key={item} className="flex items-center gap-2">
                            <Icon className="h-5 w-5 text-indigo-600" />
                            <span className="text-black">{item}</span>
                          </li>
                        ))}
                      </ul>
                      <Link href={ef.buttonLink}>
                        <Button className="bg-indigo-600 hover:bg-indigo-700">
                          {ef.buttonText}{" "}
                          <ArrowRightIcon className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                    <div className="md:w-1/2">
                      <img
                        src={ef.imageUrl}
                        alt={ef.title + " illustration"}
                        className="rounded-lg shadow-lg"
                      />
                    </div>
                  </div>
                </TabsContent>
              );
            })}
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 md:p-12 shadow-xl text-white text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Your Language Journey?
            </h2>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of learners who have transformed their language
              skills through our gamified platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white text-indigo-600 hover:bg-gray-100"
                >
                  Get Started for Free
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-0 bg-indigo-900 text-white hover:bg-indigo-700"
                >
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-indigo-900 text-white py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">
                Language Learning Platform
              </h3>
              <p className="text-indigo-200">
                Making language learning fun, engaging, and effective through
                gamification.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.to}>
                    <Link
                      href={link.to}
                      className="text-indigo-200 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Features</h4>
              <ul className="space-y-2">
                {featuresList.map((item) => (
                  <li key={item}>
                    <span className="text-indigo-200">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-indigo-800 mt-8 pt-8 text-center text-indigo-200">
            <p>
              © 2023 Language Learning Gamification Platform. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
