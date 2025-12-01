// components/UserSection.tsx - FIXED
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { WorkspaceCreateModal } from './WorkspaceCreateModal';

interface UserSectionProps {
  isLoggedIn: boolean;
  user?: Record<string, unknown>;
  onLoginClick: () => void;
  onLogout: () => void;
}

export const UserSection = ({ isLoggedIn, user, onLoginClick, onLogout }: UserSectionProps) => {
  const [showWorkspaceModal, setShowWorkspaceModal] = useState(false);
  const [currentWorkspace, setCurrentWorkspace] = useState<Record<string, unknown> | null>(null);
  const [workspaceLoading, setWorkspaceLoading] = useState(false);
  const [hasCheckedWorkspace, setHasCheckedWorkspace] = useState(false);
  const router = useRouter();

  // Check if user has a workspace
  useEffect(() => {
    if (isLoggedIn && user) {
      checkUserWorkspace();
    }
  }, [isLoggedIn, user]);

  const checkUserWorkspace = async () => {
    try {
      setWorkspaceLoading(true);
      setHasCheckedWorkspace(false); // Reset this at the start
      
      const token = sessionStorage.getItem('access_token');
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/workspace/current/`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.ok) {
        const workspaceData = await response.json();
        setCurrentWorkspace(workspaceData);
      } else if (response.status === 404) {
        // User doesn't have a workspace
        setCurrentWorkspace(null);
      }
    } catch (error) {
      console.error('Failed to fetch workspace:', error);
      setCurrentWorkspace(null);
    } finally {
      setWorkspaceLoading(false);
      setHasCheckedWorkspace(true); // Only set this after everything is done
    }
  };

  // Automatically show workspace modal when user has no workspace
  useEffect(() => {
    // Only show modal after we've checked AND there's no workspace AND we're not loading
    if (hasCheckedWorkspace && !currentWorkspace && !workspaceLoading && isLoggedIn) {
      // Add a small delay to ensure the UI has updated properly
      const timer = setTimeout(() => {
        setShowWorkspaceModal(true);
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [hasCheckedWorkspace, currentWorkspace, workspaceLoading, isLoggedIn]);

  const handleWorkspaceCreated = (workspace: Record<string, unknown>) => {
    setCurrentWorkspace(workspace);
    setShowWorkspaceModal(false);
    // Redirect to dashboard after workspace creation
    router.push('/dashboard');
  };

  const handleDashboardClick = () => {
    router.push('/dashboard');
  };

  const handleLogout = () => {
    onLogout();
    // Redirect to home page after logout
    router.push('/');
  };

  const handleCreateWorkspaceClick = () => {
    setShowWorkspaceModal(true);
  };

  return (
    <div className="flex items-center space-x-4 ml-4">
      {isLoggedIn ? (
        <LoggedInUser
          user={user}
          workspace={currentWorkspace}
          onLogout={handleLogout}
          onCreateWorkspace={handleCreateWorkspaceClick}
          onDashboardClick={handleDashboardClick}
          isLoading={workspaceLoading || !hasCheckedWorkspace} // Show loading until we've checked
        />
      ) : (
        <LoginButton onClick={onLoginClick} />
      )}

      {/* Workspace Creation Modal - shown automatically when no workspace exists */}
      {showWorkspaceModal && (
        <WorkspaceCreateModal
          isOpen={showWorkspaceModal}
          onClose={() => setShowWorkspaceModal(false)}
          onSuccess={handleWorkspaceCreated}
        />
      )}
    </div>
  );
};

// Updated LoggedInUser Component
interface LoggedInUserProps {
  user?: Record<string, unknown>;
  workspace?: Record<string, unknown> | null;
  onLogout: () => void;
  onCreateWorkspace: () => void;
  onDashboardClick: () => void;
  isLoading: boolean;
}

const LoggedInUser = ({ user, workspace, onLogout, onCreateWorkspace, onDashboardClick, isLoading }: LoggedInUserProps) => (
  <div className="flex items-center space-x-3">
    {isLoading ? (
      <div className="flex items-center">
        <div className="w-4 h-4 border-2 border-green-400 border-t-transparent rounded-full animate-spin mr-2"></div>
        <span className="text-gray-400 text-sm font-mono">Checking workspace...</span>
      </div>
    ) : workspace ? (
      // User has a workspace - show dashboard button
      <div className="flex items-center space-x-3">
        <div className="text-right">
          <p className="text-gray-300 text-sm font-mono">
            {(user?.first_name as string) || (user?.username as string)}
          </p>
          <p className="text-green-400 text-xs font-mono">
            {(workspace.name as string)}
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onDashboardClick}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-mono tracking-wider transition-colors border border-green-400/30"
        >
          DASHBOARD
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-mono tracking-wider transition-colors border border-red-400/30"
        >
          LOGOUT
        </motion.button>
      </div>
    ) : (
      // User needs to create a workspace
      <div className="flex items-center space-x-3">
        <span className="text-gray-300 text-sm font-mono">
          Welcome, {(user?.first_name as string) || (user?.username as string)}
        </span>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onCreateWorkspace}
          className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-md text-sm font-mono tracking-wider transition-colors border border-yellow-400/30"
        >
          CREATE WORKSPACE
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-mono tracking-wider transition-colors border border-red-400/30"
        >
          LOGOUT
        </motion.button>
      </div>
    )}
  </div>
);

// Login Button Component (unchanged)
interface LoginButtonProps {
  onClick: () => void;
}

const LoginButton = ({ onClick }: LoginButtonProps) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className="bg-color hover:bg-teal-700 text-white px-6 py-2 rounded-md text-sm font-mono tracking-wider transition-colors duration-200 border border-green-400/30 hover:border-green-400/50"
  >
    LOGIN
  </motion.button>
);