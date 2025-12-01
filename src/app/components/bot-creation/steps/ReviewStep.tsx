// components/bot-creation/steps/ReviewStep.tsx
import { CheckCircle, ArrowLeft, Loader2, FileText, Bot, Settings, Sparkles, Mic } from 'lucide-react';

interface ReviewStepProps {
  formData: Record<string, unknown>;
  uploadedFiles: Record<string, unknown>[];
  bucketName: string;
  error: string;
  isLoading: boolean;
  onBack: () => void;
  onSubmit: () => void;
  editMode?: boolean;
}

export function ReviewStep({ formData, uploadedFiles, error, isLoading, onBack, onSubmit, editMode = false }: ReviewStepProps) {
  const voiceOptions = [
    { id: 'alloy', name: 'Alloy', description: 'Balanced and clear', emoji: '🎯' },
    { id: 'echo', name: 'Echo', description: 'Warm and friendly', emoji: '🤗' },
    { id: 'fable', name: 'Fable', description: 'Storytelling tone', emoji: '📖' },
    { id: 'onyx', name: 'Onyx', description: 'Deep and authoritative', emoji: '🎙️' },
    { id: 'nova', name: 'Nova', description: 'Bright and energetic', emoji: '⚡' },
    { id: 'shimmer', name: 'Shimmer', description: 'Soft and calming', emoji: '✨' }
  ];

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getTotalFileSize = () => {
    return uploadedFiles.reduce((total, file) => total + (file.size as number), 0);
  };

  return (
    <div className="p-8 space-y-6">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">
          {editMode ? 'Review Changes' : 'Ready to Create!'}
        </h2>
        <p className="text-gray-600 mt-2 text-lg">
          {editMode 
            ? 'Review your changes before updating your agent' 
            : 'Everything looks good. Your agent is ready to be created!'
          }
        </p>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <SummaryCard 
            title="Basic Info"
            icon={Bot}
            items={[
              { label: 'Name', value: formData.name as string },
              { label: 'AI Model', value: formData.default_model as string },
              { 
                label: 'Interaction Type', 
                value: (formData.media_type as string) === 'both' ? 'Text & Voice' : 
                       (formData.media_type as string) === 'audio' ? 'Voice Only' : 'Text Only'
              }
            ]}
          />
          <SummaryCard 
            title="Appearance"
            icon={Settings}
            items={[
              { label: 'Color', value: formData.color as string },
              { label: 'Font', value: formData.font as string },
              { label: 'Size', value: formData.font_size as string },
            ]}
          />
          <SummaryCard 
            title="Knowledge"
            icon={Sparkles}
            items={[
              { label: 'Files', value: `${uploadedFiles.length} documents` },
              { label: 'Total Size', value: formatFileSize(getTotalFileSize()) },
            ]}
          />
        </div>

        {/* Voice Settings Summary */}
        {((formData.media_type as string) === 'audio' || (formData.media_type as string) === 'both') && (
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6 mb-6">
            <div className="flex items-center space-x-4 mb-4">
              <Mic className="w-8 h-8 text-green-600" />
              <h3 className="font-bold text-green-800 text-lg">Voice Settings</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-green-700 font-semibold">Voice Personality</p>
                  <p className="text-green-600">
                    {voiceOptions.find(v => v.id === (formData.voice_type as string))?.name || 'Alloy'}
                    {' '}{voiceOptions.find(v => v.id === (formData.voice_type as string))?.emoji}
                  </p>
                  <p className="text-green-500 text-sm">
                    {voiceOptions.find(v => v.id === (formData.voice_type as string))?.description}
                  </p>
              </div>
              <div>
                <p className="text-green-700 font-semibold">Speaking Rate</p>
                <p className="text-green-600">{((formData.speaking_rate as number) || 1)}x Speed</p>
                <p className="text-green-500 text-sm">
                  {(formData.speaking_rate as number) === 1 ? 'Normal speed' : 
                   (formData.speaking_rate as number) > 1 ? 'Faster than normal' : 'Slower than normal'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Training Files Preview */}
        {uploadedFiles.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="font-bold text-gray-900 mb-4 text-lg flex items-center space-x-3">
              <FileText className="w-6 h-6 text-blue-600" />
              <span>Training Documents ({uploadedFiles.length})</span>
            </h3>
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {uploadedFiles.map((file) => (
                 <div key={file.id as string} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                   <div className="flex items-center space-x-3">
                     <FileText className="w-4 h-4 text-gray-400" />
                     <span className="text-sm font-medium text-gray-700">{file.name as string}</span>
                   </div>
                   <span className="text-xs text-gray-500">{formatFileSize((file.size as number))}</span>
                 </div>
               ))}
            </div>
          </div>
        )}

        {/* What Happens Next */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-8 mb-6">
          <h3 className="font-bold text-blue-900 mb-6 text-xl text-center">What happens next?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-white text-xl font-bold">1</span>
              </div>
              <p className="font-semibold text-blue-800">Agent Creation</p>
              <p className="text-blue-700 text-sm mt-2">
                Your agent will be created instantly with all your settings
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-white text-xl font-bold">2</span>
              </div>
              <p className="font-semibold text-green-800">Automatic Training</p>
              <p className="text-green-700 text-sm mt-2">
                Training will start automatically with your uploaded documents
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-white text-xl font-bold">3</span>
              </div>
              <p className="font-semibold text-purple-800">Ready to Use</p>
              <p className="text-purple-700 text-sm mt-2">
                Your agent will be ready to use in about 5-10 minutes
              </p>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-lg">⚠️</span>
              </div>
              <div>
                <p className="text-red-800 font-semibold text-lg">Creation Error</p>
                <p className="text-red-700 mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Final Actions */}
        <div className="flex justify-between pt-8 border-t border-gray-200">
          <button
            onClick={onBack}
            className="px-10 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 text-lg flex items-center space-x-3"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Make Changes</span>
          </button>
          <div className="flex space-x-4">
            <button
              onClick={() => window.location.href = '/dashboard?tab=bot-list'}
              className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 text-lg"
            >
              Save as Draft
            </button>
            <button
              onClick={onSubmit}
              disabled={isLoading}
              className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-10 py-4 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 disabled:opacity-50 text-lg flex items-center space-x-3 shadow-lg hover:shadow-xl"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  <span>Creating Agent...</span>
                </>
              ) : (
                <>
                  <CheckCircle className="w-6 h-6" />
                  <span>{editMode ? 'Update Agent' : 'Create Agent'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface SummaryCardProps {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  items: { label: string; value: string }[];
}

function SummaryCard({ title, icon: Icon, items }: SummaryCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
          <Icon className="w-6 h-6 text-blue-600" />
        </div>
        <h3 className="font-bold text-gray-900 text-lg">{title}</h3>
      </div>
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
            <span className="text-sm text-gray-600 font-medium">{item.label}</span>
            <span className="text-sm font-semibold text-gray-900 text-right">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}