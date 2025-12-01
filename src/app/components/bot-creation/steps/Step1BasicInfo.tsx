// components/bot-creation/steps/Step1BasicInfo.tsx
import { ArrowRight, Loader2 } from 'lucide-react';
import { StepProps } from '../types/bot-types';
import { ErrorAlert } from '../shared/ErrorAlert';

export function Step1BasicInfo({
  formData,
  setFormData,
  error,
  setError,
  isLoading,
  onCreateBot
}: StepProps & { onCreateBot: () => void }) {

  const clearError = () => setError('');

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Basic Information</h3>
        <p className="text-gray-600 mb-4">
          Start by giving your AI agent a name.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Agent Name *
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => {
            setFormData({ ...formData, name: e.target.value });
            clearError();
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          placeholder="My Agent"
          required
          minLength={3}
        />
        <p className="text-sm text-gray-500 mt-1">
          Name must be at least 3 characters.
        </p>
      </div>

      <ErrorAlert error={error} />

      <div className="flex justify-end">
        <button
          onClick={onCreateBot}
          disabled={isLoading || !formData.name || formData.name.length < 3}
          className="bg-teal-600 text-white py-2 px-6 rounded-lg font-medium hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Creating Agent...</span>
            </>
          ) : (
            <>
              <span>Create Agent</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}