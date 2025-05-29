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
import Link from "next/link";
import { FunctionComponent, SVGProps } from "react";
import Image from "next/image";

// Helper function to safely get Lucide icon component by string name
type LucideIconComponent = FunctionComponent<SVGProps<SVGSVGElement>>;
function getLucideIcon(name: string): LucideIconComponent {
  return (
    ((LucideIcons as Record<string, unknown>)[name] as LucideIconComponent) ||
    (() => null)
  );
}

const Landingv2: React.FC = () => {
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
  ];

  return (
    <div className="min-h-screen">
      {/* navbar */}
      <div className="bg-[url('/images/union.svg')] bg-cover bg-center bg-no-repeat">
        <section className="container mx-auto px-4 md:px-6 py-6 lg:pt-10">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Image
                src="/images/logo.svg"
                alt="Logo"
                width={85.82}
                height={56}
              />

              <h2 className="text-2xl font-bold text-indigo-900 ">
                Bahasa Kita
              </h2>
            </div>
            <div className="flex items-center gap-10">
              <Link href="" className="text-md font-normal text-indigo-900">
                Beranda
              </Link>
              <Link href="" className="text-md font-normal text-indigo-900">
                Tentang Kita
              </Link>
              <Link href="" className="text-md font-normal text-indigo-900">
                Bahasa
              </Link>
              <Link href="" className="text-md font-normal text-indigo-900">
                Community
              </Link>
              <Link href="/register">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-indigo-700 border-0 hover:bg-indigo-600"
                >
                  Registrasi / Masuk
                </Button>
              </Link>{" "}
            </div>
          </div>
        </section>
        {/* Hero Section */}
        <section className="relative pt-16 md:pt-20 lg:pt-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="space-y-8 lg:space-y-12 text-white">
              <div className=" flex flex-col items-center text-center">
                <h1 className="text-4xl md:text-5xl lg:text-8xl font-semibold tracking-tight text-indigo-900 mb-8">
                  Become the Hero of Your
                  <br />
                  <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    Language Journey!
                  </span>
                </h1>
                <p className="max-w-[700px] text-lg md:text-xl text-slate-700">
                  Master new languages through fun, interactive lessons and
                  games. Track your progress, earn rewards, and connect with a
                  global community of learners.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/home">
                  <Button
                    size="lg"
                    className="bg-indigo-700 hover:bg-indigo-600 transition-transform hover:scale-110 text-xl font-semibold "
                  >
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* daftar bahasa local */}
          <section className="py-12 backdrop-blur-lg bg-indigo-700 border-y border-white/10 mt-32">
            <div className="container mx-auto px-6">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {localLanguages.map((lang, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveLanguage(index)}
                    className={`group p-4 rounded-xl border transition-all  shadow-lg bg-white transform hover:scale-105`}
                  >
                    <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                      {lang.flag}
                    </div>
                    <div className="font-semibold text-black text-sm">
                      {lang.name}
                    </div>
                    <div className="text-xs text-gray-800 group-hover:text-indigo-600">
                      {lang.region}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </section>
          {/* floatig asset hero */}
          <div className="absolute top-80 left-0 hidden lg:block">
            <div>
              <Image
                src="/images/main.svg"
                alt="Hero Asset"
                width={250}
                height={150}
              ></Image>
            </div>
          </div>
          <div className="absolute top-8 right-0 hidden lg:block">
            <Image
              src="/images/main-1.svg"
              alt="Hero Asset"
              width={200}
              height={100}
            ></Image>
          </div>
        </section>
      </div>

      {/* about us */}
      <section className="py-16 md:py-40">
        <div className="container mx-auto">
          <div className=" flex flex-col items-center text-center">
            <h2 className="text-2xl font-semibold text-indigo-500 mb-5">
              - Apa itu bahasa kita? -
            </h2>
            <h1 className="text-2xl md:text-3xl lg:text-5xl/normal font-semibold text-indigo-900">
              Bahasa Kita is Your Gateway to Language
              <br />
              <span>
                Mastery! Unlock the world of{" "}
                <span className="text-yellow-400">languages</span> where
              </span>
              <br />
              every word opens a new door to cultural
              <br />
              <span>
                {" "}
                <span className="text-yellow-400">richness</span> and global
                connections.
              </span>
            </h1>
            <p className="text-md max-w-[900px] leading-tight text-gray-700 pt-10">
              Lorem ipsum dolor sit amet consectetur. Vitae accumsan orci nunc
              interdum justo vulputate. Iaculis euismod convallis nibh magna
              pulvinar quis ut. Tortor consectetur dolor elit nullam metus duis.
              Sed morbi dui malesuada ut luctus morbi. Eget nulla viverra nisl
              non nunc malesuada consectetur.Feugiat ut scelerisque fames
              ultricies sit. Urna malesuada mollis in cursus tellus enim
              elementum felis faucibus. Lobortis nulla velit malesuada tellus.
              Commodo aliquet nullam amet eros quam.
            </p>
          </div>
        </div>
        {/* floatig asset hero */}
        <div className="absolute top-[1500px] left-16 hidden lg:block">
          <div>
            <Image
              src="/images/Back to School Doodle Illustration-16.svg"
              alt="Hero Asset"
              width={200}
              height={210}
            ></Image>
          </div>
        </div>
        <div className="absolute top-[1350px] right-0 hidden lg:block">
          <Image
            src="/images/main2.svg"
            alt="Hero Asset"
            width={300}
            height={100}
          ></Image>
        </div>
      </section>

      <section>
        <div className="bg-[url('/images/path.svg')] bg-cover bg-top bg-no-repeat">
          <div className="container mx-auto px-4 md:px-6 py-16 lg:pt-60">
            <div className=" flex flex-col items-center text-center">
              <h2 className="text-2xl font-semibold text-white mb-5">
                - Pilihan Bahasa -
              </h2>
              <h1 className="text-2xl md:text-3xl lg:text-5xl/normal font-semibold text-white">
                Embark on Your Language Odyssey
                <br />
                Explore Our Learning Pathway
              </h1>
            </div>
          </div>
        </div>
        <div className="bg-[url('/images/path2.svg')] bg-cover bg-bottom bg-no-repeat">
          <div className="container mx-auto px-4 md:px-6 py-16 lg:pb-60">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature) => {
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
        </div>
      </section>
    </div>
  );
};

export default Landingv2;
