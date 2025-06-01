"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import Image from "next/image";

interface RegisterProps {
  onGoogleRegister?: () => void;
}

// Simple SVG Logo Component
const Logo = () => (
  <Image
    src="images/logo.svg"
    alt="BahasaKita Logo"
    className="w-20 h-20"
    width={64}
    height={64}
  />
);

// Google Icon Component
const GoogleIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

const Register: React.FC<RegisterProps> = ({ onGoogleRegister }) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleGoogleRegister = async () => {
    setIsLoading(true);
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
      if (onGoogleRegister) {
        onGoogleRegister();
      }
      console.log("Google registration initiated");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <Card className="w-full max-w-md relative z-10 backdrop-blur-sm bg-white/90 shadow-2xl border-0 animate-fade-in-up">
        <CardHeader className="space-y-6 text-center pb-6">
          <div className="flex justify-center items-center gap-3">
            <Logo />
            <span className="text-2xl md:text-3xl font-bold text-indigo-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              BahasaKita
            </span>
          </div>
          <CardTitle className="text-xl font-semibold text-indigo-900">
            Buat Akun Baru
          </CardTitle>
          <div className="space-y-2">
            <CardDescription className="text-gray-600 text-base">
              Bergabunglah dengan ribuan pembelajar! Buat akun Anda untuk memulai perjalanan bahasa Anda
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <Button
            onClick={handleGoogleRegister}
            disabled={isLoading}
            className="w-full h-12 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 shadow-sm hover:shadow-md transition-all duration-200 transform hover:scale-105 active:scale-95"
            type="button"
          >
            {isLoading ? (
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <span>Creating account...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <GoogleIcon />
                <span className="font-medium">Sign up with Google</span>
              </div>
            )}
          </Button>

          <div className="text-center">
            <p className="text-sm text-gray-500">
              Dengan membuat akun, Anda menyetujui{" "}
              <a href="#" className="text-blue-600 hover:underline">
              Ketentuan Layanan
              </a>{" "}
              dan{" "}
              <a href="#" className="text-blue-600 hover:underline">
              Kebijakan Privasi
              </a>
            </p>
          </div>
        </CardContent>

        <CardFooter className="pt-6">
          <div className="w-full text-center">
            <p className="text-sm text-gray-500">
              Sudah punya akun?{" "}
              <a href="/login" className="text-blue-600 hover:underline font-medium">
              Login
              </a>
            </p>
          </div>
        </CardFooter>
      </Card>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Register;