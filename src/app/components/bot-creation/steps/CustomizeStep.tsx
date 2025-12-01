// components/bot-creation/steps/CustomizeStep.tsx
import { useState } from 'react';
import { Settings, Bot, MessageSquare, Calendar, ArrowRight, ArrowLeft, Mic, Volume2, MessageCircle } from 'lucide-react';
import { ChatPreview } from '../shared/ChatPreview';

interface CustomizeStepProps {
  formData: Record<string, unknown>;
  onChange: (data: Record<string, unknown>) => void;
  error: string;
  onBack: () => void;
  onNext: () => void;
  editMode?: boolean;
}

export function CustomizeStep({ formData, onChange, error, onBack, onNext, editMode = false }: CustomizeStepProps) {
  const [activeTab, setActiveTab] = useState('appearance');

  const fontOptions = ['Arial', 'Helvetica', 'Georgia', 'Times New Roman', 'Courier New', 'Verdana'];
  const fontStyleOptions = ['normal', 'italic', 'bold', 'bold italic'];
  const fontSizeOptions = ['12px', '14px', '16px', '18px', '20px', '22px', '24px'];
  const modelOptions = ['gpt-4o-mini', 'gpt-4', 'gpt-3.5-turbo'];
  
  const voiceOptions = [
    { id: 'alloy', name: 'Alloy', description: 'Balanced and clear', emoji: '🎯' },
    { id: 'echo', name: 'Echo', description: 'Warm and friendly', emoji: '🤗' },
    { id: 'fable', name: 'Fable', description: 'Storytelling tone', emoji: '📖' },
    { id: 'onyx', name: 'Onyx', description: 'Deep and authoritative', emoji: '🎙️' },
    { id: 'nova', name: 'Nova', description: 'Bright and energetic', emoji: '⚡' },
    { id: 'shimmer', name: 'Shimmer', description: 'Soft and calming', emoji: '✨' }
  ];

  const handleInputChange = (field: string, value: unknown) => {
    onChange({ ...formData, [field]: value });
  };

  const getMediaTypeIcon = () => {
    switch (formData.media_type) {
      case 'text': return <MessageSquare className="w-5 h-5" />;
      case 'audio': return <Mic className="w-5 h-5" />;
      case 'both': return <MessageCircle className="w-5 h-5" />;
      default: return <MessageSquare className="w-5 h-5" />;
    }
  };

  const getMediaTypeColor = () => {
    switch (formData.media_type) {
      case 'text': return 'bg-blue-100 text-blue-600';
      case 'audio': return 'bg-green-100 text-green-600';
      case 'both': return 'bg-purple-100 text-purple-600';
      default: return 'bg-blue-100 text-blue-600';
    }
  };

  return (
    <div className="p-8 space-y-6">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Settings className="w-10 h-10 text-orange-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Customize Your Agent</h2>
        <p className="text-gray-600 mt-2 text-lg">Make it look and sound just right</p>
        
        {/* Media Type Indicator */}
        <div className="mt-4 inline-flex items-center space-x-3 bg-white px-6 py-3 rounded-full border-2 shadow-sm">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getMediaTypeColor()}`}>
            {getMediaTypeIcon()}
          </div>
          <div>
            <p className="font-semibold text-gray-900">
              {formData.media_type === 'text' && 'Text Agent'}
              {formData.media_type === 'audio' && 'Voice Agent'}
              {formData.media_type === 'both' && 'Text & Voice Agent'}
            </p>
            <p className="text-sm text-gray-500">
              {formData.media_type === 'text' && 'Users will interact via text messages'}
              {formData.media_type === 'audio' && 'Users will interact via voice'}
              {formData.media_type === 'both' && 'Users can choose text or voice'}
            </p>
          </div>
        </div>
      </div>

      <div className="flex space-x-1 border-b border-gray-200 mb-6 bg-white p-2 rounded-xl">
        {[
          { id: 'appearance', label: 'Appearance', icon: Bot, show: true },
          { id: 'behavior', label: 'Behavior', icon: MessageSquare, show: true },
          { id: 'voice', label: 'Voice', icon: Volume2, show: ['audio', 'both'].includes(formData.media_type as string) },
          { id: 'integration', label: 'Integrations', icon: Calendar, show: true },
        ].map((tab) => {
          if (!tab.show) return null;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-3 pb-4 px-6 font-semibold border-b-2 transition-all rounded-lg mx-1 ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600 bg-blue-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Settings Panel */}
        <div className="space-y-8">
          {activeTab === 'appearance' && (
            <div className="space-y-8">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <label className="block text-lg font-semibold text-gray-900 mb-4">
                  Brand Color & Identity
                </label>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Primary Color
                    </label>
                    <div className="flex items-center space-x-4">
                      <input
                        type="color"
                        value={formData.color as string}
                        onChange={(e) => handleInputChange('color', e.target.value)}
                        className="w-20 h-20 border-2 border-gray-300 rounded-xl cursor-pointer shadow-sm"
                      />
                      <div className="flex-1">
                        <input
                          type="text"
                          value={formData.color as string}
                          onChange={(e) => handleInputChange('color', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-lg"
                          placeholder="#0C7075"
                        />
                        <p className="text-sm text-gray-500 mt-2">
                          This color will be used for your agent&apos;s branding
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Font Family
                      </label>
                      <select
                        value={formData.font as string}
                        onChange={(e) => handleInputChange('font', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        {fontOptions.map((font) => (
                          <option key={font} value={font}>{font}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Font Size
                      </label>
                      <select
                        value={formData.font_size as string}
                        onChange={(e) => handleInputChange('font_size', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        {fontSizeOptions.map((size) => (
                          <option key={size} value={size}>{size}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Font Style
                    </label>
                    <select
                      value={formData.font_style as string}
                      onChange={(e) => handleInputChange('font_style', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      {fontStyleOptions.map((style) => (
                        <option key={style} value={style}>{style}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'behavior' && (
            <div className="space-y-8">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <label className="block text-lg font-semibold text-gray-900 mb-4">
                  AI Configuration
                </label>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      AI Model
                    </label>
                    <select
                      value={formData.default_model as string}
                      onChange={(e) => handleInputChange('default_model', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      {modelOptions.map((model) => (
                        <option key={model} value={model}>{model}</option>
                      ))}
                    </select>
                    <p className="text-sm text-gray-500 mt-2">
                      Choose the AI model that powers your agent&apos;s intelligence
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Welcome Message
                    </label>
                    <input
                      type="text"
                      value={formData.welcome_message as string}
                      onChange={(e) => handleInputChange('welcome_message', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Hi! I'm {bot_name}, how can I help you today?"
                    />
                    <p className="text-sm text-gray-500 mt-2">
                      Use {'{bot_name}'} to automatically insert your agent&apos;s name
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Instructions & Personality
                    </label>
                    <textarea
                      value={formData.prompt as string}
                      onChange={(e) => handleInputChange('prompt', e.target.value)}
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical"
                      placeholder="Describe how your agent should behave, its personality, tone, and response style..."
                    />
                    <p className="text-sm text-gray-500 mt-2">
                      Guide your agent&apos;s behavior, tone, and response style
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'voice' && (
            <div className="space-y-8">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <label className="block text-lg font-semibold text-gray-900 mb-6">
                  Voice Personality & Settings
                </label>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-4">
                      Choose Voice Personality
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {voiceOptions.map((voice) => (
                        <button
                          key={voice.id}
                          onClick={() => handleInputChange('voice_type', voice.id)}
                          className={`p-4 border-2 rounded-xl text-left transition-all hover:shadow-md ${
                            formData.voice_type === voice.id
                              ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200 transform scale-105'
                              : 'border-gray-200 bg-white hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <span className="text-2xl">{voice.emoji}</span>
                              <div>
                                <span className={`font-semibold ${
                                  formData.voice_type === voice.id ? 'text-blue-700' : 'text-gray-900'
                                }`}>
                                  {voice.name}
                                </span>
                                <p className="text-sm text-gray-600">{voice.description}</p>
                              </div>
                            </div>
                            {formData.voice_type === voice.id && (
                              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-xs">✓</span>
                              </div>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-5 border border-blue-200">
                    <label className="block text-sm font-medium text-gray-700 mb-4">
                      Speaking Rate & Style
                    </label>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-500 w-20">Slower</span>
                        <input
                          type="range"
                          min="0.5"
                          max="2"
                          step="0.1"
                          value={(formData.speaking_rate as number) || 1}
                          onChange={(e) => handleInputChange('speaking_rate', parseFloat(e.target.value))}
                          className="flex-1 h-3 bg-gradient-to-r from-blue-200 to-purple-200 rounded-lg appearance-none cursor-pointer slider"
                        />
                        <span className="text-sm text-gray-500 w-20">Faster</span>
                      </div>
                      <div className="text-center">
                        <span className="text-lg font-semibold text-blue-700 bg-white px-4 py-2 rounded-full border border-blue-200">
                          {((formData.speaking_rate as number) || 1)}x Speed
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-5">
                    <div className="flex items-start space-x-4">
                      <Volume2 className="w-6 h-6 text-green-600 mt-1" />
                      <div>
                        <p className="text-green-800 font-semibold">Voice Preview Available</p>
                         <p className="text-green-700 text-sm mt-1">
                           You&apos;ll be able to test and preview the selected voice after your agent is created and trained.
                         </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'integration' && (
            <div className="space-y-8">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <label className="block text-lg font-semibold text-gray-900 mb-4">
                  External Integrations
                </label>
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center space-x-4">
                      <Calendar className="w-8 h-8 text-blue-600" />
                      <div>
                        <p className="font-semibold text-gray-900">Calendly Integration</p>
                        <p className="text-sm text-gray-600">Allow users to schedule meetings directly</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        id="calendly_enabled"
                        checked={formData.calendly_enabled as boolean}
                        onChange={(e) => handleInputChange('calendly_enabled', e.target.checked)}
                        className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="calendly_enabled" className="text-sm font-medium text-gray-700">
                        Enable
                      </label>
                    </div>
                  </div>

                  {(formData.calendly_enabled as boolean) && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Calendly Scheduling Page
                      </label>
                      <input
                        type="url"
                        value={formData.calendly_link as string}
                        onChange={(e) => handleInputChange('calendly_link', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="https://calendly.com/your-username"
                      />
                      <p className="text-sm text-gray-500 mt-2">
                        Enter your full Calendly scheduling page URL. Users will be able to book meetings through this link.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Live Preview */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-6 text-xl text-center">Live Preview</h3>
          <ChatPreview formData={formData} />
          
          {/* Voice Preview Indicator */}
          {(formData.media_type === 'audio' || formData.media_type === 'both') && (
            <div className="mt-6 p-5 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl">
              <div className="flex items-center space-x-4">
                <Mic className="w-8 h-8 text-green-600" />
                <div>
                  <p className="font-semibold text-green-800 text-lg">Voice Agent Ready</p>
                  <p className="text-green-700">
                    Your agent will support voice interactions
                    {(formData.voice_type as string) && (
                      <span className="font-semibold"> with {voiceOptions.find(v => v.id === (formData.voice_type as string))?.name} voice</span>
                    )}
                  </p>
                  {(formData.speaking_rate as number) && (
                    <p className="text-green-600 text-sm mt-1">
                      Speaking rate: {(formData.speaking_rate as number)}x
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-lg">⚠️</span>
            </div>
            <div>
              <p className="text-red-800 font-semibold text-lg">Configuration Error</p>
              <p className="text-red-700 mt-1">{error}</p>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between pt-8 border-t border-gray-200">
        <button
          onClick={onBack}
          className="px-10 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 text-lg flex items-center space-x-3"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Knowledge</span>
        </button>
        <button
          onClick={onNext}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 text-lg flex items-center space-x-3 shadow-lg hover:shadow-xl"
        >
          <span>{editMode ? 'Save Changes' : 'Review & Create'}</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}