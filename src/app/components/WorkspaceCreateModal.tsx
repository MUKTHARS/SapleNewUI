// components/WorkspaceCreateModal.tsx - UPDATED
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface WorkspaceCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (workspace: Record<string, unknown>) => void;
}

export const WorkspaceCreateModal = ({
  isOpen,
  onClose,
  onSuccess,
}: WorkspaceCreateModalProps) => {
  const [workspaceName, setWorkspaceName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [fieldError, setFieldError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleNameChange = (name: string) => {
    setWorkspaceName(name);
    // Clear field error when user starts typing
    if (fieldError) {
      setFieldError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!workspaceName.trim()) {
      setFieldError('Workspace name is required');
      return;
    }

    setIsLoading(true);
    setFieldError(null); // Clear previous errors

    try {
      const token = sessionStorage.getItem('access_token');
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/workspace/create/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ name: workspaceName })
        }
      );

      const data = await response.json();

      if (response.ok) {
        onSuccess(data.workspace);
        onClose();
        setWorkspaceName('');
        setFieldError(null);
      } else {
        // Check if it's a field-specific error (like duplicate name)
        if (data.details && data.details.name) {
          // Extract the specific field error
          const nameError = Array.isArray(data.details.name)
            ? data.details.name[0]
            : data.details.name;
          setFieldError(nameError);
        } else if (data.error) {
          setFieldError(data.error);
        } else {
          setFieldError('Failed to create workspace');
        }
      }
    } catch (error) {
      console.error('Workspace creation error:', error);
      setFieldError('Network error: Failed to create workspace');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setWorkspaceName('');
    setFieldError(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gray-900 border border-green-400/30 rounded-lg p-8 max-w-md w-full"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white font-mono tracking-wider">
            CREATE WORKSPACE
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-white transition-colors text-xl"
            disabled={isLoading}
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Workspace Name */}
          <div>
            <label className="block text-gray-300 text-sm font-mono mb-2 tracking-wide">
              WORKSPACE NAME
            </label>
            <input
              type="text"
              value={workspaceName}
              onChange={(e) => handleNameChange(e.target.value)}
              className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white font-mono focus:outline-none transition-colors ${fieldError
                  ? 'border-red-500 focus:border-red-400'
                  : 'border-gray-600 focus:border-green-400'
                }`}
              placeholder="Enter your workspace name"
              disabled={isLoading}
              maxLength={100}
              autoFocus
            />

            {/* Error Message */}
            {fieldError && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-sm mt-2 font-mono"
              >
                {fieldError}
              </motion.p>
            )}

            {/* Helper Text (only show when no error) */}
            {!fieldError && (
              <p className="text-gray-400 text-xs mt-1 font-mono">
                This will be your workspace&apos;s display name
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 pt-4">
            <button
              type="button"
              onClick={handleClose}
              disabled={isLoading}
              className="flex-1 px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-mono tracking-wide transition-colors disabled:opacity-50"
            >
              CANCEL
            </button>
            <button
              type="submit"
              disabled={isLoading || !workspaceName.trim()}
              className="flex-1 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-mono tracking-wide transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  CREATING...
                </div>
              ) : (
                'CREATE WORKSPACE'
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};