// components/bot-creation/steps/Step5Completion.tsx - UPDATED
import { CheckCircle } from 'lucide-react';
import { Bot } from '../types/bot-types';

interface Step5CompletionProps {
  createdBot: Bot | null;
  bucketName: string;
  onReset: () => void;
  editMode?: boolean;
}

export function Step5Completion({ createdBot, bucketName, onReset, editMode = false }: Step5CompletionProps) {
  return (
    <div className="text-center py-8">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <CheckCircle className="w-8 h-8 text-green-600" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        {editMode ? 'Bot Updated Successfully!' : 'Bot Created Successfully!'}
      </h3>
      <p className="text-gray-600 mb-2">
        Your AI assistant "{createdBot?.name}" has been {editMode ? 'updated' : 'created'}.
      </p>
      {bucketName && (
        <p className="text-sm text-gray-500 mb-6">
          S3 Bucket: <code className="bg-gray-100 px-2 py-1 rounded text-sm">{bucketName}</code>
        </p>
      )}
      <div className="space-x-4">
        <button
          onClick={() => window.location.href = '/dashboard?tab=bot-list'}
          className="bg-teal-600 text-white py-2 px-6 rounded-lg font-medium hover:bg-teal-700 transition-colors"
        >
          View All Bots
        </button>
        <button
          onClick={onReset}
          className="bg-gray-200 text-gray-700 py-2 px-6 rounded-lg font-medium hover:bg-gray-300 transition-colors"
        >
          {editMode ? 'Back to Bot List' : 'Create Another Bot'}
        </button>
      </div>
    </div>
  );
}