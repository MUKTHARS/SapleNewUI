// components/LoginModal.tsx - UPDATED
'use client';

import { useState } from 'react';
import { GoogleLoginButton } from './GoogleLoginButton';
import { X } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (userData: Record<string, unknown>) => void;
  onError: (error: string) => void;
}

export const LoginModal = ({ isOpen, onClose, onSuccess, onError }: LoginModalProps) => {
  const [isCheckingWorkspace, setIsCheckingWorkspace] = useState(false);

  if (!isOpen) return null;

  const handleWorkspaceCheck = (hasWorkspace: boolean) => {
    if (!hasWorkspace) {
      setIsCheckingWorkspace(true);
      setTimeout(() => {
        onClose();
        setIsCheckingWorkspace(false);
      }, 1000);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl">
        <div className="p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <section className="text-2xl font-bold text-gray-900">Sign In</section>
              <p className="text-gray-600 mt-1">Access your saple.ai dashboard</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {isCheckingWorkspace ? (
            <div className="text-center py-8">
              <div className="w-8 h-8 border-2 border-[#0C7075] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-700">Checking workspace...</p>
            </div>
          ) : (
            <>
              <GoogleLoginButton
                onSuccess={onSuccess}
                onError={onError}
                onWorkspaceCheck={handleWorkspaceCheck}
              />
              
              <div className="mt-6 text-center">
                <p className="text-gray-500 text-sm">
                  By continuing, you agree to our Terms of Service and Privacy Policy
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};