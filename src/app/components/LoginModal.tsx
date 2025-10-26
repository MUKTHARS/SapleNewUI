// components/LoginModal.tsx - UPDATED
'use client';

import { useState } from 'react';
import { GoogleLoginButton } from './GoogleLoginButton';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (userData: any) => void;
  onError: (error: string) => void;
  onWorkspaceNeeded?: () => void;
}

export const LoginModal = ({ isOpen, onClose, onSuccess, onError, onWorkspaceNeeded }: LoginModalProps) => {
  const [isCheckingWorkspace, setIsCheckingWorkspace] = useState(false);

  if (!isOpen) return null;

  const handleWorkspaceCheck = (hasWorkspace: boolean) => {
    if (!hasWorkspace) {
      setIsCheckingWorkspace(true);
      // Let the parent component know that workspace creation is needed
      onWorkspaceNeeded?.();
      // Close the login modal after a brief delay
      setTimeout(() => {
        onClose();
        setIsCheckingWorkspace(false);
      }, 1000);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border border-green-400/30 rounded-lg p-8 max-w-md w-full">
        <ModalHeader onClose={onClose} />

        {isCheckingWorkspace ? (
          <div className="text-center py-8">
            <div className="w-8 h-8 border-2 border-green-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-300 font-mono text-sm">Checking workspace...</p>
          </div>
        ) : (
          <ModalContent
            onSuccess={onSuccess}
            onError={onError}
            onWorkspaceCheck={handleWorkspaceCheck}
          />
        )}

        <ModalFooter />
      </div>
    </div>
  );
};

// Modal Header Component (unchanged)
interface ModalHeaderProps {
  onClose: () => void;
}

const ModalHeader = ({ onClose }: ModalHeaderProps) => (
  <div className="flex justify-between items-center mb-6">
    <h2 className="text-2xl font-bold text-white font-mono tracking-wider">SIGN IN</h2>
    <button
      onClick={onClose}
      className="text-gray-400 hover:text-white transition-colors text-xl"
    >
      ✕
    </button>
  </div>
);

// Modal Content Component - UPDATED
interface ModalContentProps {
  onSuccess: (userData: any) => void;
  onError: (error: string) => void;
  onWorkspaceCheck?: (hasWorkspace: boolean) => void;
}

const ModalContent = ({ onSuccess, onError, onWorkspaceCheck }: ModalContentProps) => (
  <>
    <p className="text-gray-300 mb-6 text-center font-mono text-sm tracking-wide">
      ACCESS YOUR SAPLE.AI DASHBOARD
    </p>

    <GoogleLoginButton
      onSuccess={onSuccess}
      onError={onError}
      onWorkspaceCheck={onWorkspaceCheck}
    />
  </>
);

// Modal Footer Component (unchanged)
const ModalFooter = () => (
  <div className="mt-6 text-center">
    <p className="text-gray-400 text-xs font-mono tracking-wide">
      BY CONTINUING, YOU AGREE TO OUR TERMS OF SERVICE AND PRIVACY POLICY
    </p>
  </div>
);