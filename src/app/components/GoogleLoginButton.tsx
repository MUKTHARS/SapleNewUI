// components/GoogleLoginButton.tsx - UPDATED
'use client';

import { useState, useEffect, useCallback } from 'react';

interface GoogleLoginButtonProps {
  onSuccess?: (userData: Record<string, unknown>) => void;
  onError?: (error: string) => void;
  onWorkspaceCheck?: (hasWorkspace: boolean) => void;
}

export const GoogleLoginButton = ({ onSuccess, onError, onWorkspaceCheck }: GoogleLoginButtonProps) => {
   const [isLoading, setIsLoading] = useState(false);

   const initializeGoogle = useCallback(() => {
     if (!window.google) return;

     // eslint-disable-next-line @typescript-eslint/no-explicit-any
     const google = window.google as any;
     google.accounts.id.initialize({
       client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '',
       callback: handleGoogleResponse,
       auto_select: false,
     });

     // Render Google's button directly
     const buttonContainer = document.getElementById('googleButton');
     if (buttonContainer) {
       google.accounts.id.renderButton(buttonContainer, {
         theme: 'outline',
         size: 'large',
         text: 'continue_with',
         shape: 'rectangular',
         width: 280,
       });
     }

     // Optionally show One Tap
     google.accounts.id.prompt();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

   useEffect(() => {
     // Load Google SDK
     if (document.querySelector('script[src="https://accounts.google.com/gsi/client"]')) {
       initializeGoogle();
       return;
     }

     const script = document.createElement('script');
     script.src = 'https://accounts.google.com/gsi/client';
     script.async = true;
     script.defer = true;
     script.onload = () => initializeGoogle();
     script.onerror = () => {
       console.error('Failed to load Google SDK');
       onError?.('Failed to load Google authentication');
     };
     document.head.appendChild(script);
   }, [onError, initializeGoogle]);

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

      if (response.ok) {
        return true; // User has a workspace
      } else if (response.status === 404) {
        return false; // User doesn't have a workspace
      }
      return false; // Default to no workspace on error
    } catch (error) {
      console.error('Failed to check workspace:', error);
      return false;
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
        onSuccess?.(data.user);

        // Check if user has a workspace
        const hasWorkspace = await checkUserWorkspace(data.tokens.access);
        onWorkspaceCheck?.(hasWorkspace);

        if (hasWorkspace) {
          // Redirect to dashboard if user has workspace
          window.location.href = '/dashboard';
        } else {
          // User will be prompted to create workspace via UserSection
          console.log('User needs to create workspace');
        }
      } else {
        throw new Error(data.error || 'Login failed');
      }
    } catch (error) {
    const message = error instanceof Error ? error.message : 'Login failed';
    console.error('Login error:', error);
    onError?.(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {isLoading && (
        <div className="flex items-center justify-center w-full px-6 py-3 border border-gray-300 rounded-lg bg-white">
          <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mr-2"></div>
          <span className="text-sm font-medium text-gray-700">SIGNING IN...</span>
        </div>
      )}

      {/* Google's button container */}
      <div id="googleButton" className="w-full flex justify-center"></div>
    </div>
  );
};