// API Configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api';
export const FRONTEND_URL = process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000';

// API endpoints
export const API_ENDPOINTS = {
  // Auth
  GOOGLE_AUTH_URL: '/auth/google/url',
  GOOGLE_CALLBACK: '/auth/google/callback',
  LOGIN: '/login',
  REGISTER: '/register',
  LOGOUT: '/logout',
  USER_PROFILE: '/getProfile',
  
  // Languages and courses
  ALL_LANGUAGES: '/GetAllLanguage',
  LANGUAGE: (id: string) => `/Language/${id}`,
  COURSES: (languageId: string) => `/courses/${languageId}`,
  UNITS: (languageId: string, courseId: string) => `/units/${languageId}/${courseId}`,
  
  // Other endpoints...
} as const;