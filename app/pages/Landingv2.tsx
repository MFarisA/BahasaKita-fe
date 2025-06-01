"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  quickLinks,
  featuresList,
} from "../data/landingPageData";
import * as LucideIcons from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const Landingv2: React.FC = () => {
  const [activeLanguage, setActiveLanguage] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Account for fixed header
      const elementPosition = element.offsetTop - offset;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
    setMobileMenuOpen(false); // Close mobile menu if open
  };

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
      <div className="bg-[url('/images/union.svg')] bg-contain bg-top bg-no-repeat">
        <section
          className={`sticky top-0 z-50 transition-all duration-300 ${
            scrolled
              ? "bg-white shadow backdrop-blur-md"
              : "bg-transparent text-white"
          }`}
        >
          <div className="container mx-auto px-4 md:px-6 py-4 lg:py-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 md:gap-4">
                <Image
                  src="/images/logo.svg"
                  alt="Logo"
                  width={60}
                  height={40}
                  className="md:w-[85.82px] md:h-[56px]"
                />
                <h2 className="text-xl md:text-2xl font-bold text-indigo-900">
                  Bahasa Kita
                </h2>
              </div>
              <div className="hidden lg:flex items-center gap-6 xl:gap-10">
                <button 
                  onClick={() => scrollToSection('beranda')} 
                  className="text-md font-normal text-indigo-900 hover:text-indigo-600 transition-all duration-300 hover:scale-105 cursor-pointer"
                >
                  Beranda
                </button>
                <button 
                  onClick={() => scrollToSection('tentang-kita')} 
                  className="text-md font-normal text-indigo-900 hover:text-indigo-600 transition-all duration-300 hover:scale-105 cursor-pointer"
                >
                  Tentang Kita
                </button>
                <button 
                  onClick={() => scrollToSection('bahasa')} 
                  className="text-md font-normal text-indigo-900 hover:text-indigo-600 transition-all duration-300 hover:scale-105 cursor-pointer"
                >
                  Bahasa
                </button>
                <button 
                  onClick={() => scrollToSection('cara-kerja')} 
                  className="text-md font-normal text-indigo-900 hover:text-indigo-600 transition-all duration-300 hover:scale-105 cursor-pointer"
                >
                  Cara Kerja
                </button>
                <Link href="/register">
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-indigo-700 border-0 hover:bg-indigo-600 text-white transition-all duration-300 hover:scale-105 hover:font-semibold hover:shadow-lg"
                  >
                    Registrasi / Masuk
                  </Button>
                </Link>
              </div>
              {/* Mobile menu button */}
              <div className="lg:hidden">
                <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                  <LucideIcons.Menu className="h-6 w-6 text-indigo-900" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Hero Section */}
        <section id="beranda" className="relative pt-16 md:pt-20 lg:pt-32 scroll-mt-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="space-y-6 lg:space-y-10 text-white text-center">
              <h1 className="text-3xl md:text-5xl lg:text-7xl xl:text-8xl font-semibold tracking-tight text-indigo-900 mb-4 md:mb-8 animate-fade-in">
                Become the Hero of Your
                <br />
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Language Journey!
                </span>
              </h1>
              <p className="max-w-[700px] mx-auto text-base md:text-lg text-slate-700 animate-fade-in-delay">
                Master new languages through fun, interactive lessons and games.
                Track your progress, earn rewards, and connect with a global
                community of learners.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 animate-fade-in-delay-2">
                <Link href="/home">
                  <Button
                    size="lg"
                    className="bg-indigo-700 hover:bg-indigo-600 transition-all duration-300 hover:scale-105 hover:shadow-lg text-lg md:text-xl font-semibold w-full sm:w-auto"
                  >
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* daftar bahasa local */}
          <section className="py-8 md:py-12 backdrop-blur-lg bg-indigo-700 border-y border-white/10 mt-16 md:mt-24 lg:mt-32">
            <div className="container mx-auto px-4 md:px-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {localLanguages.map((lang, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveLanguage(index)}
                    className={`group p-3 sm:p-4 rounded-xl border transition-all duration-300 shadow-lg bg-white transform hover:scale-105 hover:shadow-xl`}
                  >
                    <div className="text-2xl sm:text-3xl mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300">
                      {lang.flag}
                    </div>
                    <div className="font-semibold text-black text-sm sm:text-base">
                      {lang.name}
                    </div>
                    <div className="text-xs text-gray-800 group-hover:text-indigo-600 transition-colors duration-300">
                      {lang.region}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* floating asset hero */}
            <div className="absolute top-20 left-0 hidden lg:block xl:top-80 animate-float">
              <Image
              src="/images/main.svg"
              alt="Hero Asset"
              width={200}
              height={120}
              className="xl:w-[348.84px] xl:h-[228.01px]"
              style={{ transform: "scaleX(-1)" }}
              />
            </div>
            <div className="absolute top-0 right-0 hidden lg:block xl:top-40 animate-float-delayed">
            <Image
              src="/images/main-1.svg"
              alt="Hero Asset"
              width={150}
              height={80}
              className="xl:w-[267.05px] xl:h-[162.12px]"
            ></Image>
            </div>
        </section>

        {/* about us */}
        <section id="tentang-kita" className="py-16 md:py-24 lg:py-44 relative scroll-mt-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center text-center">
              <h2 className="text-xl md:text-2xl font-semibold text-indigo-500 mb-3 md:mb-5 animate-fade-in-up">
                - Apa itu bahasa kita? -
              </h2>
              <h1 className="text-2xl md:text-4xl lg:text-5xl/normal font-semibold text-indigo-900 animate-fade-in-up-delay">
                Bahasa Kita is Your Gateway to Language
                <br className="hidden md:block" />
                <span>
                  Mastery! Unlock the world of{" "}
                  <span className="text-yellow-500">languages</span> where
                </span>
                <br className="hidden md:block" />
                every word opens a new door to cultural
                <br className="hidden md:block" />
                <span>
                  {" "}
                  <span className="text-yellow-500">richness</span> and global
                  connections.
                </span>
              </h1>
              <p className="text-sm md:text-base max-w-[900px] leading-relaxed text-gray-700 pt-6 md:pt-10 animate-fade-in-up-delay-2">
                Lorem ipsum dolor sit amet consectetur. Vitae accumsan orci nunc
                interdum justo vulputate. Iaculis euismod convallis nibh magna
                pulvinar quis ut. Tortor consectetur dolor elit nullam metus
                duis. Sed morbi dui malesuada ut luctus morbi. Eget nulla
                viverra nisl non nunc malesuada consectetur.Feugiat ut
                scelerisque fames ultricies sit. Urna malesuada mollis in cursus
                tellus enim elementum felis faucibus. Lobortis nulla velit
                malesuada tellus. Commodo aliquet nullam amet eros quam.
              </p>
            </div>
          </div>
          {/* floating asset about us */}
          <div className="absolute bottom-20 left-10 hidden lg:block animate-float">
            <Image
              src="/images/Back to School Doodle Illustration-16.svg"
              alt="Hero Asset"
              width={150}
              height={160}
              className="xl:w-[220px] xl:h-[242px]"
            ></Image>
          </div>
          <div className="absolute bottom-24 right-0 hidden lg:block animate-float-delayed">
            <Image
              src="/images/main.svg"
              alt="Hero Asset"
              width={250}
              height={80}
              className="xl:w-[400px] xl:h-[200px]"
            ></Image>
          </div>
        </section>

        <section id="bahasa">
          <div className="bg-[url('/images/grid.svg')] bg-cover bg-center bg-no-repeat">
            <div className="bg-[url('/images/path.svg')] bg-cover bg-top bg-no-repeat">
              <div className="container mx-auto px-4 md:px-6 py-12 lg:pt-40 xl:pt-56 scroll-mt-20">
                <div className="flex flex-col items-center text-center">
                  <h2 className="text-xl md:text-2xl font-semibold text-white mb-3 md:mb-5 animate-fade-in-up">
                    - Pilihan Bahasa -
                  </h2>
                  <h1 className="text-2xl md:text-4xl lg:text-5xl/normal font-semibold text-white animate-fade-in-up-delay">
                    Embark on Your Language Odyssey
                    <br className="hidden md:block" />
                    Explore Our Learning Pathway
                  </h1>
                </div>
              </div>
            </div>
            <div className="bg-[url('/images/path2.svg')] bg-cover bg-bottom bg-no-repeat pt-12 md:pt-24 lg:pt-0">
              <div className="container mx-auto px-4 md:px-6 lg:pb-40 xl:pb-56">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {localLanguages.map((feature, index) => {
                    return (
                      <Card
                        key={index}
                        className="bg-white backdrop-blur-sm border border-black shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fade-in-up"
                        style={{animationDelay: `${index * 0.1}s`}}
                      >
                        <CardHeader>
                          <CardTitle className="text-xl lg:text-2xl font-bold">
                            {feature.name}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-slate-600 pb-4 text-sm md:text-base">
                            {feature.description}
                          </p>
                          <Button size={"lg"} className="bg-yellow-500 text-white hover:bg-yellow-600 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                            <div className="text-base font-semibold">
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
          </div>
        </section>
        
        {/* cara kerja */}
        <section id="cara-kerja" className="py-16 md:py-24 scroll-mt-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center text-center mb-12 md:mb-20">
              <h2 className="text-xl md:text-2xl font-semibold text-indigo-500 mb-3 md:mb-5 animate-fade-in-up">
                - Cara Kerja -
              </h2>
              <h1 className="text-2xl md:text-4xl lg:text-5xl/normal font-semibold text-indigo-900 animate-fade-in-up-delay">
                Embark on your language learning <br className="hidden md:block" />
                journey with Bahasa Kita
              </h1>
            </div>
            <div className="relative">
              {/* Ellipse background for larger screens */}
              <div className="hidden lg:block absolute inset-0 bg-[url('/images/Ellipse1.svg')] bg-no-repeat bg-center bg-contain"></div>

              <section className="mt-12 md:mt-20 lg:mt-28 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                  <div className="lg:col-span-1 animate-slide-in-left">
                    <Card className="flex flex-col justify-center bg-white backdrop-blur-sm border border-black shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 p-6 h-auto min-h-[250px] md:min-h-[300px] lg:min-h-[384px]">
                      <CardHeader className="text-center">
                        <CardTitle className="text-3xl md:text-4xl lg:text-5xl font-semibold">
                          Sign Up For Free
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-center">
                        <p className="text-slate-600 pb-4 text-sm md:text-base">
                          Lorem, ipsum dolor sit amet consectetur adipisicing
                          elit. Labore nam deserunt quisquam temporibus, maxime
                          recusandae? Animi vitae veniam ab molestias nesciunt,
                          quo omnis! Ea sapiente voluptatem quos itaque minima
                          quasi.
                        </p>
                        <Button size={"lg"} className="bg-yellow-500 text-white hover:bg-yellow-600 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                          <div className="text-base font-semibold">
                            Mulai Belajar
                          </div>
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="hidden lg:flex justify-end items-center lg:col-span-1 animate-slide-in-right">
                    <Image
                      src="/images/rocket.svg"
                      alt="Cara Kerja"
                      width={350}
                      height={450}
                      className="object-contain hover:scale-105 transition-transform duration-500"
                    ></Image>
                  </div>
                </div>
              </section>

              <section className="mt-16 md:mt-24 lg:mt-48 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                  <div className="hidden lg:flex justify-start items-center lg:col-span-1 animate-slide-in-left">
                    <Image
                      src="/images/cloud.svg"
                      alt="Cara Kerja"
                      width={450}
                      height={350}
                      className="object-contain hover:scale-105 transition-transform duration-500"
                    ></Image>
                  </div>
                  <div className="lg:col-span-1 animate-slide-in-right">
                    <Card className="flex flex-col justify-center bg-white backdrop-blur-sm border border-black shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 p-6 h-auto min-h-[250px] md:min-h-[300px] lg:min-h-[384px]">
                      <CardHeader className="text-center">
                        <CardTitle className="text-3xl md:text-4xl lg:text-5xl font-semibold">
                          Engage & Learn
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-center">
                        <p className="text-slate-600 pb-4 text-sm md:text-base">
                          Dive into interactive lessons, challenging quizzes,
                          and fun games designed to make learning engaging and
                          effective. Practice pronunciation and expand your
                          vocabulary effortlessly.
                        </p>
                        <Button size={"lg"} className="bg-yellow-500 text-white hover:bg-yellow-600 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                          <div className="text-base font-semibold">
                            Mulai Belajar
                          </div>
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </section>

              <section className="mt-16 md:mt-24 lg:mt-48 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                  <div className="lg:col-span-1 animate-slide-in-left">
                    <Card className="flex flex-col justify-center bg-white backdrop-blur-sm border border-black shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 p-6 h-auto min-h-[250px] md:min-h-[300px] lg:min-h-[384px]">
                      <CardHeader className="text-center">
                        <CardTitle className="text-3xl md:text-4xl lg:text-5xl font-semibold">
                          Track & Master
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-center">
                        <p className="text-slate-600 pb-4 text-sm md:text-base">
                          Monitor your progress with detailed analytics, earn
                          rewards, and achieve fluency at your own pace.
                          Master new languages one lesson at a time.
                        </p>
                        <Button size={"lg"} className="bg-yellow-500 text-white hover:bg-yellow-600 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                          <div className="text-base font-semibold">
                            Mulai Belajar
                          </div>
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="hidden lg:flex justify-end items-center lg:col-span-1 animate-slide-in-right">
                    <Image
                      src="/images/Group.png"
                      alt="Cara Kerja"
                      width={350}
                      height={450}
                      className="hover:scale-105 transition-transform duration-500"
                    ></Image>
                  </div>
                </div>
              </section>
            </div>
          </div>
          
          <section className="py-16 md:py-24 lg:py-44">
            <div className="container mx-auto px-4 md:px-6">
              <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-24">
                <div className="w-full lg:w-1/2 flex justify-center animate-slide-in-left">
                  <Image
                    src="/images/Mask group.png"
                    alt="testimoni "
                    width={400}
                    height={350}
                    className="object-contain lg:w-[566px] lg:h-[503px] hover:scale-105 transition-transform duration-500"
                  ></Image>
                </div>
                <div className="w-full lg:w-2/3 flex flex-col justify-center items-center lg:items-start gap-6 text-center lg:text-left animate-slide-in-right">
                  <div>
                    <h2 className="text-xl md:text-2xl font-semibold text-indigo-500 mb-3 md:mb-5">
                      - Testimoni -
                    </h2>
                    <h1 className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl/normal font-semibold text-indigo-900 mb-4">
                      Voices of Success What Learners Love About Bahasa Kita
                    </h1>
                  </div>
                  <p className="text-base md:text-md lg:text-lg xl:text-xl max-w-[700px] leading-normal text-gray-700">
                    I can't express how grateful I am to Leranis for making
                    language learning such a delightful experience. The
                    interactive lessons, personalized feedback, and engaging
                    native speakers have transformed my journey.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </section>
        
        {/* footer */}
        <footer className="bg-[#191919] text-white py-12">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
              <div className="flex flex-col items-center md:items-start gap-4">
                <div className="flex items-center gap-3">
                  <Image
                    src="/images/logo.svg"
                    alt="Bahasa Kita Logo"
                    width={70}
                    height={45}
                    className="md:w-[85.82px] md:h-[56px]"
                  ></Image>
                  <h3 className="text-lg md:text-xl font-bold">Bahasa Kita</h3>
                </div>
                <p className="text-white text-sm md:text-base">
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
                        className="text-white hover:text-indigo-300 transition-colors duration-300 text-sm md:text-base"
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
                      <span className="text-white text-sm md:text-base">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="border-t border-indigo-800 mt-8 pt-8 text-center text-indigo-200 text-sm">
              <p>© 2025 Bahasa Kita. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 flex justify-end lg:hidden animate-fade-in" onClick={() => setMobileMenuOpen(false)}>
          <div className="bg-white w-3/4 max-w-xs h-full shadow-lg p-6 flex flex-col gap-6 animate-slide-in-right" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-indigo-900">Menu</h2>
              <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                <LucideIcons.X className="h-6 w-6 text-indigo-900" />
              </Button>
            </div>
            <button 
              onClick={() => scrollToSection('beranda')} 
              className="text-md font-normal text-indigo-900 hover:text-indigo-600 transition-colors duration-300 text-left"
            >
              Beranda
            </button>
            <button 
              onClick={() => scrollToSection('tentang-kita')} 
              className="text-md font-normal text-indigo-900 hover:text-indigo-600 transition-colors duration-300 text-left"
            >
              Tentang Kita
            </button>
            <button 
              onClick={() => scrollToSection('bahasa')} 
              className="text-md font-normal text-indigo-900 hover:text-indigo-600 transition-colors duration-300 text-left"
            >
              Bahasa
            </button>
            <button 
              onClick={() => scrollToSection('cara-kerja')} 
              className="text-md font-normal text-indigo-900 hover:text-indigo-600 transition-colors duration-300 text-left"
            >
              Cara Kerja
            </button>
            <Link href="/register">
              <Button
                size="lg"
                variant="outline"
                className="bg-indigo-700 border-0 hover:bg-indigo-600 text-white transition-all duration-300 w-full mt-4"
              >
                Registrasi / Masuk
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Landingv2;
// ...existing code...