// app/page.tsx or app/login/page.tsx (depending on your route structure)
'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';

interface GoogleAuthResponse {
  token: string;
  user: Record<string, unknown>;
}

export default function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  const handleGoogleLogin = async () => {
  try {
    const { data } = await axios.get('http://127.0.0.1:8000/api/auth/google/url');
    window.location.href = data.url;
  } catch (error) {
    console.error('Failed to get Google Auth URL:', error);
  }
};

  useEffect(() => {
    if (typeof code === 'string') {
      const authenticate = async () => {
        try {
          const { data }: { data: GoogleAuthResponse } = await axios.get(
            `http://127.0.0.1:8000/api/auth/google/callback?code=${code}`
          );

          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));

          router.push('/dashboard');
        } catch (error) {
          console.error('Authentication failed:', error);
        }
      };

      authenticate();
    }
  }, [code, router]);

  return (
    <div>
      <button onClick={handleGoogleLogin}>
        Login with Google
      </button>
    </div>
  );
}
