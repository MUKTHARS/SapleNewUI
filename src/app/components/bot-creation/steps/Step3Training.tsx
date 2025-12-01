// components/bot-creation/steps/Step3Training.tsx
import { ArrowLeft, Brain, AlertCircle, CheckCircle } from 'lucide-react';
import { StepProps } from '../types/bot-types';
import { ErrorAlert } from '../shared/ErrorAlert';

export function Step3Training({
  formData,
  uploadedFiles,
  trainingStatus,
  error,
  isLoading,
  onPreviousStep,
  onTrainBot
}: StepProps & { onTrainBot: () => void }) {

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Train Your Agent</h3>
        <p className="text-gray-600 mb-4">
          Start the training process with your uploaded files to create your AI agent.
        </p>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-yellow-800">Training Required</h4>
            <p className="text-yellow-700 text-sm mt-1">
              Your agent needs to be trained with the uploaded files to provide accurate responses.
              Training will process {uploadedFiles.length} file{uploadedFiles.length !== 1 ? 's' : ''}.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <p className="text-sm text-gray-600">
          <strong>Files to train:</strong> {uploadedFiles.length} file{uploadedFiles.length !== 1 ? 's' : ''}
        </p>
        <p className="text-sm text-gray-600 mt-1">
          <strong>Agent Model:</strong> {formData.default_model as string}
        </p>
      </div>

      <ErrorAlert error={error} />

      <div className="flex justify-between pt-4 border-t border-gray-200">
        <button
          onClick={onPreviousStep}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <button
          onClick={onTrainBot}
          disabled={isLoading}
          className="bg-orange-600 text-white py-2 px-6 rounded-lg font-medium hover:bg-orange-700 transition-colors disabled:opacity-50 flex items-center space-x-2"
        >
          <Brain className="w-4 h-4" />
          <span>{isLoading ? 'Starting Training...' : `Start Training`}</span>
        </button>
      </div>

      {trainingStatus && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <p className="text-green-800 text-sm">
              <span className="font-medium">Training Status:</span> {trainingStatus}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}