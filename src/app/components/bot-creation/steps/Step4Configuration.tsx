// components/bot-creation/steps/Step4Configuration.tsx
import { ArrowLeft, Save, Palette, Bot, Calendar, Loader2 } from 'lucide-react';
import { StepProps } from '../types/bot-types';
import { ErrorAlert } from '../shared/ErrorAlert';
import { BotPreview } from '../shared/BotPreview';

export function Step4Configuration({
  formData,
  setFormData,
  error,
  isLoading,
  onPreviousStep,
  onUpdateBot,
  editMode = false
}: StepProps & { onUpdateBot: () => void }) {

  const fontOptions = ['Arial', 'Helvetica', 'Georgia', 'Times New Roman', 'Courier New', 'Verdana'];
  const fontStyleOptions = ['normal', 'italic', 'bold', 'bold italic'];
  const fontSizeOptions = ['12px', '14px', '16px', '18px', '20px', '22px', '24px'];
  const modelOptions = ['gpt-4o-mini', 'gpt-4', 'gpt-3.5-turbo'];

  const handleInputChange = (field: keyof typeof formData, value: unknown) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleCheckboxChange = (field: keyof typeof formData, checked: boolean) => {
    setFormData({
      ...formData,
      [field]: checked
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          {editMode ? 'Update Agent Configuration' : 'Agent Configuration'}
        </h3>
        <p className="text-gray-600 mb-4">
          {editMode
            ? 'Customize your AI agent\'s appearance and behavior'
            : 'Customize your agent\'s appearance and behavior'
          }
        </p>
      </div>

      {/* Live Preview */}
      <BotPreview formData={formData} />

      {/* Appearance Settings */}
      <div className="border-t border-gray-200 pt-6">
        <div className="flex items-center space-x-2 mb-4">
          <Palette className="w-4 h-4 text-gray-600" />
          <h4 className="text-md font-medium text-gray-900">Appearance Settings</h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Primary Color */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Primary Color
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={formData.color}
                onChange={(e) => handleInputChange('color', e.target.value)}
                className="w-12 h-12 border border-gray-300 rounded-lg cursor-pointer"
              />
              <input
                type="text"
                value={formData.color}
                onChange={(e) => handleInputChange('color', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 font-mono text-sm"
                placeholder="#0C7075"
              />
            </div>
          </div>

          {/* Font Family */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Font Family
            </label>
            <select
              value={formData.font}
              onChange={(e) => handleInputChange('font', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            >
              {fontOptions.map((font) => (
                <option key={font} value={font}>{font}</option>
              ))}
            </select>
          </div>

          {/* Font Size */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Font Size
            </label>
            <select
              value={formData.font_size}
              onChange={(e) => handleInputChange('font_size', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            >
              {fontSizeOptions.map((size) => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>

          {/* Font Style */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Font Style
            </label>
            <select
              value={formData.font_style}
              onChange={(e) => handleInputChange('font_style', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            >
              {fontStyleOptions.map((style) => (
                <option key={style} value={style}>{style}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* AI Configuration */}
      <div className="border-t border-gray-200 pt-6">
        <div className="flex items-center space-x-2 mb-4">
          <Bot className="w-4 h-4 text-gray-600" />
          <h4 className="text-md font-medium text-gray-900">AI Configuration</h4>
        </div>

        <div className="space-y-4">
          {/* Media Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Media Type
            </label>
            <select
              value={formData.media_type}
              onChange={(e) => handleInputChange('media_type', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            >
              <option value="text">Text Only</option>
              <option value="audio">Audio Only</option>
              <option value="both">Text & Audio</option>
            </select>
          </div>

          {/* Default Model */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Default Model
            </label>
            <select
              value={formData.default_model}
              onChange={(e) => handleInputChange('default_model', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            >
              {modelOptions.map((model) => (
                <option key={model} value={model}>{model}</option>
              ))}
            </select>
          </div>

          {/* System Prompt */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              System Prompt
            </label>
            <textarea
              value={formData.prompt}
              onChange={(e) => handleInputChange('prompt', e.target.value)}
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 resize-vertical"
              placeholder="Define how your AI agent should behave..."
            />
            <p className="text-sm text-gray-500 mt-1">
              This prompt defines the agent&apos;s personality, behavior, and response style
            </p>
          </div>

          {/* Welcome Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Welcome Message
            </label>
            <input
              type="text"
              value={formData.welcome_message}
              onChange={(e) => handleInputChange('welcome_message', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              placeholder="Welcome message (use {bot_name} for agent name)"
            />
            <p className="text-sm text-gray-500 mt-1">
              Use {'{bot_name}'} to automatically insert the agent&apos;s name. Example: &quot;Hi! I&apos;m {'{bot_name}'}, how can I help you?&quot;
            </p>
          </div>
        </div>
      </div>

      {/* Calendly Integration */}
      <div className="border-t border-gray-200 pt-6">
        <div className="flex items-center space-x-2 mb-4">
          <Calendar className="w-4 h-4 text-gray-600" />
          <h4 className="text-md font-medium text-gray-900">Calendly Integration</h4>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="calendly_enabled"
              checked={formData.calendly_enabled}
              onChange={(e) => handleCheckboxChange('calendly_enabled', e.target.checked)}
              className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
            />
            <label htmlFor="calendly_enabled" className="text-sm font-medium text-gray-700">
              Enable Calendly Integration
            </label>
          </div>

          {formData.calendly_enabled && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Calendly Link
              </label>
              <input
                type="url"
                value={formData.calendly_link}
                onChange={(e) => handleInputChange('calendly_link', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                placeholder="https://calendly.com/your-username"
              />
              <p className="text-sm text-gray-500 mt-1">
                Enter your full Calendly scheduling page URL
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Error Display */}
      <ErrorAlert error={error} />

      {/* Action Buttons */}
      <div className="flex justify-between border-t border-gray-200 pt-6">
        <button
          onClick={onPreviousStep}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <button
          onClick={onUpdateBot}
          disabled={isLoading}
          className="bg-teal-600 text-white py-2 px-6 rounded-lg font-medium hover:bg-teal-700 transition-colors disabled:opacity-50 flex items-center space-x-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Saving...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>{editMode ? 'Update Agent' : 'Save Configuration'}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}