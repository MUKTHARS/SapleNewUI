// components/bot-creation/steps/BasicInfoStep.tsx
import { Bot, ArrowRight, Loader2, MessageSquare, Mic, MessageCircle } from 'lucide-react';

interface BasicInfoStepProps {
  formData: Record<string, unknown>;
  onChange: (data: Record<string, unknown>) => void;
  error: string;
  isLoading: boolean;
  onCreateBot: () => void;
}

export function BasicInfoStep({ formData, onChange, error, isLoading, onCreateBot }: BasicInfoStepProps) {
  const mediaTypes = [
    {
      id: 'text',
      label: 'Text Only',
      description: 'Chat-based interactions through text messages',
      icon: MessageSquare,
      color: 'bg-blue-500',
      badgeColor: 'bg-blue-100 text-blue-800'
    },
    {
      id: 'audio',
      label: 'Voice Only',
      description: 'Voice conversations and audio responses',
      icon: Mic,
      color: 'bg-green-500',
      badgeColor: 'bg-green-100 text-green-800'
    },
    {
      id: 'both',
      label: 'Text & Voice',
      description: 'Both text chat and voice conversations',
      icon: MessageCircle,
      color: 'bg-purple-500',
      badgeColor: 'bg-purple-100 text-purple-800'
    }
  ];

  return (
    <div className="p-8 space-y-6">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Bot className="w-10 h-10 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Let&apos;s Create Your AI Agent</h2>
        <p className="text-gray-600 mt-2 text-lg">Start by giving your agent a friendly name and choose how users will interact with it</p>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Bot Name */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <label className="block text-lg font-semibold text-gray-900 mb-4">
            What would you like to call your agent?
          </label>
          <input
            type="text"
            value={(formData.name as string) || ''}
            onChange={(e) => onChange({ ...formData, name: e.target.value })}
            className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg placeholder-gray-400"
            placeholder="e.g., Customer Support Agent, Sales Agent..."
            maxLength={50}
          />
          <div className="flex justify-between text-sm text-gray-500 mt-3">
             <span>This will be your agent&apos;s display name</span>
             <span>{((formData.name as string) || '').length}/50</span>
           </div>
        </div>

        {/* Media Type Selection */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <label className="block text-lg font-semibold text-gray-900 mb-6">
            How will users interact with your agent?
          </label>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {mediaTypes.map((type) => {
              const IconComponent = type.icon;
              const isSelected = formData.media_type === type.id;
              
              return (
                <button
                  key={type.id}
                  onClick={() => onChange({ ...formData, media_type: type.id })}
                  className={`p-6 border-2 rounded-xl text-left transition-all hover:shadow-lg ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200 transform scale-105'
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${type.color} text-white shadow-md`}>
                      <IconComponent className="w-7 h-7" />
                    </div>
                    <div>
                      <span className={`font-bold text-lg ${isSelected ? 'text-blue-700' : 'text-gray-900'}`}>
                        {type.label}
                      </span>
                      {isSelected && (
                        <div className="flex items-center space-x-1 mt-1">
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                          <span className="text-xs text-blue-600 font-medium">Selected</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{type.description}</p>
                  
                  {/* Use Cases */}
                  <div className="mt-4 space-y-2">
                    {type.id === 'text' && (
                      <>
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                          <span>Website chat widgets</span>
                        </div>
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                          <span>Messaging platforms</span>
                        </div>
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                          <span>Customer support</span>
                        </div>
                      </>
                    )}
                    {type.id === 'audio' && (
                      <>
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                          <span>Call centers</span>
                        </div>
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                          <span>Voice agents</span>
                        </div>
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                          <span>Audio interfaces</span>
                        </div>
                      </>
                    )}
                    {type.id === 'both' && (
                      <>
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                          <span>Multi-channel support</span>
                        </div>
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                          <span>Hybrid applications</span>
                        </div>
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                          <span>Flexible user experience</span>
                        </div>
                      </>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
          
          {/* Media Type Help Text */}
          <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-5">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-sm font-bold">ℹ️</span>
              </div>
              <div className="space-y-3">
                <p className="text-blue-800 font-semibold">Choosing the Right Interaction Type</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-blue-700 font-medium">Text Only</p>
                    <p className="text-blue-600">Perfect for chat interfaces, websites, and messaging platforms where users prefer typing</p>
                  </div>
                  <div>
                    <p className="text-green-700 font-medium">Voice Only</p>
                    <p className="text-green-600">Ideal for call centers, voice agents, and hands-free applications</p>
                  </div>
                  <div>
                    <p className="text-purple-700 font-medium">Text & Voice</p>
                    <p className="text-purple-600">Best for applications that need to support both communication methods</p>
                  </div>
                </div>
                <p className="text-blue-700 text-sm italic">
                  You can always change this later in the agent settings
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Naming Tips */}
        <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-xl p-6">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-lg">💡</span>
            </div>
            <div>
              <p className="text-orange-800 font-bold text-lg mb-2">Naming Your Agent</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-orange-700 font-semibold">Good Examples</p>
                  <ul className="text-orange-600 mt-1 space-y-1">
                    <li>• Support Helper</li>
                    <li>• Product Guide</li>
                    <li>• Sales Agent</li>
                    <li>• Customer Care</li>
                  </ul>
                </div>
                <div>
                  <p className="text-orange-700 font-semibold">Tips</p>
                  <ul className="text-orange-600 mt-1 space-y-1">
                    <li>• Keep it short and memorable</li>
                    <li>• Reflect its purpose</li>
                    <li>• Make it friendly and approachable</li>
                    <li>• Avoid technical jargon</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">⚠️</span>
              </div>
              <div>
                <p className="text-red-800 font-semibold">Something went wrong</p>
                <p className="text-red-700 text-sm mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end pt-6">
          <button
             onClick={onCreateBot}
             disabled={isLoading || !formData.name || ((formData.name as string) || '').length < 2}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-5 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-4 text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                <span>Creating Agent...</span>
              </>
            ) : (
              <>
                <span>Continue to Add Knowledge</span>
                <ArrowRight className="w-6 h-6" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}