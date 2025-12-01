// src/app/components/DashboardSidebar.tsx - UPDATED
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  Bot,
  BotIcon,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface DashboardSidebarProps {
  activeTab: string;
  onTabChange: (tab: 'overview' | 'team' | 'bots' | 'bot-list') => void;
  user?: Record<string, unknown>;
  workspace?: Record<string, unknown>;
}

export function DashboardSidebar({ activeTab, onTabChange, user, workspace }: DashboardSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navigationItems = [
    {
      id: 'overview' as const,
      label: 'Dashboard',
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      id: 'team' as const,
      label: 'Team',
      icon: <Users className="w-5 h-5" />,
    },
    {
      id: 'bots' as const,
      label: 'Create Agent',
      icon: <Bot className="w-5 h-5" />,
    },
    {
      id: 'bot-list' as const,
      label: 'My Agents',
      icon: <BotIcon className="w-5 h-5" />,
    },
  ];

  return (
    <div className={`bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'
      }`}>
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center space-x-3"
              >
                <div>
                  <h1 className="text-lg font-bold text-gray-900">Saple.AI</h1>
                  <p className="text-teal-600 text-sm font-medium">Dashboard</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* User Info - Only show when expanded */}
        <AnimatePresence>
          {!isCollapsed && user && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-4 border-t border-gray-100"
            >
              <p className="text-gray-900 font-medium text-sm">
                {(user?.first_name as string) || (user?.username as string)}
              </p>
              <p className="text-gray-500 text-xs truncate">
                {user?.email as string}
              </p>
              {workspace && (
                <p className="text-teal-600 text-xs font-medium mt-1">
                  {(workspace.name as string)}
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navigationItems.map((item) => (
          <motion.button
            key={item.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onTabChange(item.id)}
            className={`w-full flex items-center space-x-3 p-3 rounded-xl font-medium text-sm transition-all duration-200 ${activeTab === item.id
                ? 'bg-gradient-to-r from-teal-500 to-blue-600 text-white'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
          >
            <div className={`${activeTab === item.id ? 'text-white' : 'text-gray-400'}`}>
              {item.icon}
            </div>
            <AnimatePresence>
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="whitespace-nowrap"
                >
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        ))}
      </nav>
    </div>
  );
}