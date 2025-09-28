import { API_BASE_URL, API_ENDPOINTS } from '@/lib/config';

// Types
export interface Profile {
  id: number;
  user_id: number;
  xp: number;
  level: number;
  photo?: string;
  photo_url?: string;
  created_at?: string;
  updated_at?: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  google_id?: string;
  created_at?: string;
  updated_at?: string;
  profile?: Profile;
}

export interface AuthResponse {
  token: string;
  user?: User;
  message?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

// API Service Class
class AuthService {
  private getAuthHeaders(token?: string) {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    };

    const authToken = token || (typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null);
    if (authToken) {
      headers['Authorization'] = `Bearer ${authToken}`;
    }

    return headers;
  }

  // Google Authentication
  async getGoogleAuthUrl(): Promise<{ url: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.GOOGLE_AUTH_URL}`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error getting Google auth URL:', error);
      throw error;
    }
  }

  // Regular Login
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.LOGIN}`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Store token in localStorage
      if (data.token && typeof window !== 'undefined') {
        localStorage.setItem('auth_token', data.token);
      }

      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  // Regular Register
  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.REGISTER}`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || 'Registration failed');
      }

      // Store token in localStorage
      if (data.token && typeof window !== 'undefined') {
        localStorage.setItem('auth_token', data.token);
      }

      return data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  // Get current user profile
  async getCurrentUser(): Promise<User> {
    try {
      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.USER_PROFILE}`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user profile');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error getting current user:', error);
      throw error;
    }
  }

  // Logout
  async logout(): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.LOGOUT}`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
      });

      if (!response.ok) {
        console.warn('Logout request failed, but continuing with local cleanup');
      }

      // Clear token from localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token');
      }
    } catch (error) {
      console.error('Logout error:', error);
      // Still clear local token even if API call fails
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token');
      }
      throw error;
    }
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false;
    const token = localStorage.getItem('auth_token');
    return !!token;
  }

  // Get stored token
  getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('auth_token');
  }
}

// Export singleton instance
export const authService = new AuthService();
export default authService;