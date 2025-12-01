// src/app/dashboard/page.tsx - UPDATED
'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { TeamManagement } from '../components/TeamManagement';
import { DashboardSidebar } from '../components/DashboardSidebar';
import { DashboardOverview } from '../components/DashboardOverview';
import { BotList } from '../components/BotList';
import { BotCreationWizard } from '../components/bot-creation/BotCreationWizard';

function DashboardContent() {
  const [user, setUser] = useState<Record<string, unknown> | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'team' | 'bots' | 'bot-list'>('overview');
  const [workspace, setWorkspace] = useState<Record<string, unknown> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const userData = sessionStorage.getItem('user');
    if (!userData) {
      router.push('/');
      return;
    }
    setUser(JSON.parse(userData));
    fetchWorkspaceData();
  }, [router]);

  useEffect(() => {
    // Handle URL parameters for tab selection
    const tabParam = searchParams.get('tab');
    if (tabParam && ['overview', 'team', 'bots', 'bot-list'].includes(tabParam)) {
      setActiveTab(tabParam as 'overview' | 'team' | 'bots' | 'bot-list');
    }
  }, [searchParams]);

  const fetchWorkspaceData = async () => {
    try {
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
        setWorkspace(workspaceData);
      }
    } catch (error) {
      console.error('Failed to fetch workspace:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTabChange = (tab: 'overview' | 'team' | 'bots' | 'bot-list') => {
    setActiveTab(tab);
    // Update URL without page reload
    const newUrl = `/dashboard?tab=${tab}`;
    window.history.pushState({}, '', newUrl);
  };

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <DashboardOverview />;
      case 'team':
        return <TeamManagement />;
      case 'bot-list':
        return <BotList />;
      case 'bots':
        return <BotCreationWizard />;
      default:
        return <DashboardOverview />;
    }
  };

  if (!user || isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-300 font-medium">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-[80vh]">
      {/* Sidebar */}
      <DashboardSidebar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        user={user}
        workspace={workspace || undefined}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-0">
        {/* Header */}
        {/* <header className="bg-white border-b border-gray-200 shadow-sm flex-shrink-0">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {activeTab === 'overview' && 'Dashboard Overview'}
                  {activeTab === 'team' && 'Team Management'}
                  {activeTab === 'bots' && 'Create AI Agent'}
                  {activeTab === 'bot-list' && 'My AI Agents'}
                </h1>
                <p className="text-gray-600 mt-1">
                  {activeTab === 'overview' && 'Monitor your workspace performance and analytics'}
                  {activeTab === 'team' && 'Manage team members and their permissions'}
                  {activeTab === 'bots' && 'Create and configure AI agents for your business'}
                  {activeTab === 'bot-list' && 'View and manage your existing AI agents'}
                </p>
              </div>

              {/* User Info */}
              {/* <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="font-medium text-gray-900">{user?.first_name || user?.username}</p>
                  <p className="text-sm text-gray-500">{workspace?.name || 'Workspace'}</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                  {(user?.first_name?.[0] || user?.username?.[0] || 'U').toUpperCase()}
                </div>
              </div>
            </div>
          </div>
        </header> */}

        {/* Main Content - Scrollable Area */}
        <main className="flex-1 overflow-auto p-6 bg-gray-50">
          {renderActiveTabContent()}
        </main>
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <Suspense fallback={
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-300 font-medium">Loading Dashboard...</p>
        </div>
      </div>
    }>
      <DashboardContent />
    </Suspense>
  );
}