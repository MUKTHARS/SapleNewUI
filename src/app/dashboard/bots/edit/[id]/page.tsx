// src/app/dashboard/bots/edit/[id]/page.tsx - FIXED
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { BotCreationWizard } from '../../../../components/bot-creation/BotCreationWizard';
import { Bot } from '../../../../components/bot-creation/types/bot-types';

export default function EditBotPage() {
  const params = useParams();
  const router = useRouter();
  const [botData, setBotData] = useState<Bot | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (params.id) {
      fetchBotData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  const fetchBotData = async () => {
    try {
      const token = sessionStorage.getItem('access_token');
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/bots/${params.id}/`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.ok) {
        const data = await response.json();
        setBotData(data);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to fetch agent data');
      }
    } catch (error) {
      console.error('Error fetching agent:', error);
      setError('Failed to load agent data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    router.push('/dashboard?tab=bot-list');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading agent data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-600 text-2xl">⚠️</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Agent</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={handleBack}
            className="bg-teal-600 text-white py-2 px-6 rounded-lg font-medium hover:bg-teal-700 transition-colors"
          >
            Back to Agent List
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <button
            onClick={handleBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-4 transition-colors"
          >
            <span>← Back to Agent List</span>
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Edit Agent: {botData?.name}</h1>
          <p className="text-gray-600 mt-2">Update your AI agent&apos;s configuration and files</p>
        </div>
        <BotCreationWizard editMode={true} existingBot={botData} />
      </div>
    </div>
  );
}