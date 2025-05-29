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
    {
      name: "Bahasa Jawa",
      flag: "🏛️",
      region: "Jawa Tengah & Jawa Timur",
      description:
        "Bahasa dengan penutur terbanyak di Indonesia. Memiliki tingkatan tutur (undha-usuk basa) yang kompleks dan kaya akan sastra klasik serta filosofi. Digunakan di Jawa Tengah, DI Yogyakarta, dan Jawa Timur.",
    },
    {
      name: "Bahasa Sunda",
      flag: "🏔️",
      region: "Jawa Barat",
      description:
        "Bahasa daerah terbesar kedua di Indonesia, dikenal dengan melodi dan intonasinya yang khas. Dituturkan di sebagian besar Jawa Barat dan Banten, serta erat kaitannya dengan seni pertunjukan.",
    },
    {
      name: "Bahasa Bali",
      flag: "🏝️",
      region: "Bali",
      description:
        "Bahasa yang erat kaitannya dengan agama Hindu Dharma dan upacara adat di Bali. Memiliki aksara sendiri (Aksara Bali) dan kekayaan tradisi sastra. Dituturkan di Pulau Bali, sebagian Lombok, dan Jawa Timur.",
    },
    {
      name: "Bahasa Batak",
      flag: "🏞️",
      region: "Sumatera Utara",
      description:
        "Rumpun bahasa dengan beberapa dialek (Toba, Karo, Simalungun, dll.). Dikenal dengan karakter bicara yang lugas dan kuat, serta sistem kekerabatan marga yang kental di Sumatera Utara.",
    },
    {
      name: "Bahasa Minang",
      flag: "🏔️",
      region: "Sumatera Barat",
      description:
        "Bahasa yang memiliki kekhasan dalam pengucapan dan intonasi, sangat terkait dengan sistem matrilineal dan adat istiadat Minangkabau yang unik. Dituturkan di Sumatera Barat.",
    },
    {
      name: "Bahasa Betawi",
      flag: "🏙️",
      region: "Jakarta",
      description:
        "Bahasa kreol perpaduan Melayu, Jawa, Sunda, Arab, Tionghoa, dan Belanda. Dikenal dengan gaya bicara santai, lugas, dan humor. Merupakan identitas budaya asli masyarakat Jakarta yang multietnis.",
    },
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
      <section className="py-16 md:py-44">
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
                <span className="text-yellow-500">languages</span> where
              </span>
              <br />
              every word opens a new door to cultural
              <br />
              <span>
                {" "}
                <span className="text-yellow-500">richness</span> and global
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
          <div className="container mx-auto px-4 md:px-6 py-16 lg:pt-56">
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
          <div className="container mx-auto px-4 md:px-6 lg:pb-56">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {localLanguages.map((feature, index) => {
                return (
                  <Card
                    key={index}
                    className="bg-white backdrop-blur-sm border border-black shadow-md hover:shadow-lg transition-shadow"
                  >
                    <CardHeader>
                      <CardTitle className="lg:text-2xl lg:font-bold">
                        {feature.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-600 pb-4">
                        {feature.description}
                      </p>
                      <Button size={"lg"} className="bg-yellow-500">
                        <div className="text-md font-semibold">
                          Mulai Belajar
                        </div>
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      {/* cara kerja */}
      <section>
        <div className="container mx-auto px-4 md:px-6 py-16 lg:py-[180px]">
          <div className=" flex flex-col items-center text-center">
            <h2 className="text-2xl font-semibold text-indigo-500 mb-5">
              - Cara Kerja -
            </h2>
            <h1 className="text-2xl md:text-3xl lg:text-5xl/normal font-semibold text-indigo-900">
              Embark on your language learning <br />
              journey with Bahasa Kita
            </h1>
          </div>
          <div className="">
            <div className="bg-[url('/images/Ellipse1.svg')] bg-no-repeat bg-center bg-contain">
              <section className="mt-28">
                <div className="grid grid-cols-4 w-full">
                  <div className="col-span-2">
                    <Card className="flex flex-col justify-center bg-white backdrop-blur-sm border border-black shadow-md hover:shadow-lg transition-shadow h-96">
                      <CardHeader className="text-center">
                        <CardTitle className="lg:text-5xl lg:font-semibold">
                          Sign Up For Free
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-center">
                        <p className="text-slate-600 pb-4">
                          Lorem, ipsum dolor sit amet consectetur adipisicing
                          elit. Labore nam deserunt quisquam temporibus, maxime
                          recusandae? Animi vitae veniam ab molestias nesciunt,
                          quo omnis! Ea sapiente voluptatem quos itaque minima
                          quasi.
                        </p>
                        <Button size={"lg"} className="bg-yellow-500">
                          <div className="text-md font-semibold">
                            Mulai Belajar
                          </div>
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="absolute top-[3600px] right-0 hidden lg:block">
                    <Image
                      src="/images/rocket.svg"
                      alt="Cara Kerja"
                      width={300}
                      height={400}
                    ></Image>
                  </div>
                </div>
              </section>
              <section className="mt-80">
                <div className="grid grid-cols-4 w-full">
                  <div className="absolute top-[4300px] left-10 hidden lg:block">
                    <Image
                      src="/images/cloud.svg"
                      alt="Cara Kerja"
                      width={456}
                      height={307.73}
                    ></Image>
                  </div>
                  <div className="col-start-3 col-span-2">
                    <Card className="flex flex-col justify-center bg-white backdrop-blur-sm border border-black shadow-md hover:shadow-lg transition-shadow h-96">
                      <CardHeader className="text-center">
                        <CardTitle className="lg:text-5xl lg:font-semibold">
                          Sign Up For Free
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-center">
                        <p className="text-slate-600 pb-4">
                          Lorem, ipsum dolor sit amet consectetur adipisicing
                          elit. Labore nam deserunt quisquam temporibus, maxime
                          recusandae? Animi vitae veniam ab molestias nesciunt,
                          quo omnis! Ea sapiente voluptatem quos itaque minima
                          quasi.
                        </p>
                        <Button size={"lg"} className="bg-yellow-500">
                          <div className="text-md font-semibold">
                            Mulai Belajar
                          </div>
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </section>
              <section className="mt-80">
                <div className="grid grid-cols-4 w-full">
                  <div className="col-span-2">
                    <Card className="flex flex-col justify-center bg-white backdrop-blur-sm border border-black shadow-md hover:shadow-lg transition-shadow h-96">
                      <CardHeader className="text-center">
                        <CardTitle className="lg:text-5xl lg:font-semibold">
                          Sign Up For Free
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-center">
                        <p className="text-slate-600 pb-4">
                          Lorem, ipsum dolor sit amet consectetur adipisicing
                          elit. Labore nam deserunt quisquam temporibus, maxime
                          recusandae? Animi vitae veniam ab molestias nesciunt,
                          quo omnis! Ea sapiente voluptatem quos itaque minima
                          quasi.
                        </p>
                        <Button size={"lg"} className="bg-yellow-500">
                          <div className="text-md font-semibold">
                            Mulai Belajar
                          </div>
                        </Button>
                      </CardContent>
                    </Card>
                    <div className="absolute top-[5100px] right-0 hidden lg:block">
                    <Image
                      src="/images/suncloud.svg"
                      alt="Cara Kerja"
                      width={300}
                      height={400}
                    ></Image>
                  </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
        <section>
          <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-16 p-8 lg:p-12 max-w-6xl mx-auto">
            <div className="flex-shrink-0">
              <div className="relative w-32 h-32 lg:w-40 lg:h-40">
                <div className="absolute top-0 left-0 w-12 h-12 lg:w-16 lg:h-16 bg-black rounded-sm"></div>
                <div className="absolute top-0 right-0 w-12 h-12 lg:w-16 lg:h-16 bg-black rounded-sm"></div>

                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 lg:w-16 lg:h-16 bg-black rounded-sm"></div>
                <div className="absolute top-1/2 right-0 w-8 h-8 lg:w-12 lg:h-12 bg-black rounded-sm"></div>

                <div className="absolute bottom-0 left-0 w-12 h-12 lg:w-16 lg:h-16 bg-black rounded-sm"></div>
                <div className="absolute bottom-0 right-0 w-12 h-12 lg:w-16 lg:h-16 bg-black rounded-sm"></div>
              </div>
            </div>

            <div className="flex-1 space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-px bg-purple-400 w-12"></div>
                <span className="text-purple-400 font-medium text-sm tracking-wider uppercase">
                  Testimonial
                </span>
                <div className="h-px bg-purple-400 w-12"></div>
              </div>

              <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
                Voices of Success What Learners Love About Leranis
              </h2>

              <blockquote className="text-lg lg:text-xl text-gray-600 italic leading-relaxed">
                "I can't express how grateful I am to Leranis for making
                language learning such a delightful experience. The interactive
                lessons, personalized feedback, and engaging native speakers
                have transformed my journey."
              </blockquote>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
};

export default Landingv2;
