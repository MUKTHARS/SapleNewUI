// src/components/auth/AuthProvider.tsx
'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  tenant?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  loginWithGoogle: () => void;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const checkAuth = async () => {
    try {
      const token = sessionStorage.getItem('access_token');
      if (!token) {
        setIsLoading(false);
        return;
      }

      const userData = sessionStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Auth check error:', error);
      sessionStorage.removeItem('access_token');
      sessionStorage.removeItem('refresh_token');
      sessionStorage.removeItem('user');
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = () => {
    // Initialize Google Sign-In
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (typeof window !== 'undefined' && (window as any).google) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const google = (window as any).google;
      google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        callback: handleGoogleResponse,
      });
      google.accounts.id.prompt();
    }
  };

  const handleGoogleResponse = async (response: Record<string, string>) => {
    try {
      setIsLoading(true);
      const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/b2c/google/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: response.credential,
        }),
      });

      const data = await result.json();

      if (result.ok) {
        sessionStorage.setItem('access_token', data.tokens.access);
        sessionStorage.setItem('refresh_token', data.tokens.refresh);
        sessionStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);

        // Check if user has workspace
        const hasWorkspace = await checkUserWorkspace(data.tokens.access);
        if (hasWorkspace) {
          router.push('/dashboard');
        } else {
          router.push('/create-space');
        }
      } else {
        throw new Error(data.error || 'Login failed');
      }
    } catch {
      console.error('Login error');
      alert('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const checkUserWorkspace = async (token: string): Promise<boolean> => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/workspace/current/`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      return response.ok;
    } catch {
      return false;
    }
  };

  const logout = () => {
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('refresh_token');
    sessionStorage.removeItem('user');
    setUser(null);
    router.push('/');
  };

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    // Load Google SDK
    if (document.querySelector('script[src="https://accounts.google.com/gsi/client"]')) {
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, loginWithGoogle, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};