// components/BotCreation.tsx - UPDATED with better styling
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, Palette, Calendar, Save } from 'lucide-react';

interface BotFormData {
  name: string;
  media_type: string;
  color: string;
  font: string;
  font_style: string;
  font_size: string;
  default_model: string;
  prompt: string;
  welcome_message: string;
  calendly_enabled: boolean;
  calendly_link: string;
}

export function BotCreation() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<BotFormData>({
    name: '',
    media_type: 'text',
    color: '#0C7075',
    font: 'Arial',
    font_style: 'normal',
    font_size: '12px',
    default_model: 'gpt-4o-mini',
    prompt: `You are a helpful, professional AI agent trained on company-specific documents. 
Answer user questions clearly and concisely using the provided knowledge. 
If you don't know the answer or it's outside your scope, say so politely. 
Always maintain a friendly, respectful, and informative tone. 
Do not fabricate answers. Refer only to the content you've been trained on.`,
    welcome_message: "Hi there. Welcome. I am '{bot_name}', I am here to guide you. How can I assist you today?",
    calendly_enabled: false,
    calendly_link: '',
  });

  const handleCreateBot = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const token = sessionStorage.getItem('access_token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bots/create/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setFormData({
          name: '',
          media_type: 'text',
          color: '#0C7075',
          font: 'Arial',
          font_style: 'normal',
          font_size: '12px',
          default_model: 'gpt-4o-mini',
          prompt: `You are a helpful, professional AI agent trained on company-specific documents. 
Answer user questions clearly and concisely using the provided knowledge. 
If you don't know the answer or it's outside your scope, say so politely. 
Always maintain a friendly, respectful, and informative tone. 
Do not fabricate answers. Refer only to the content you've been trained on.`,
          welcome_message: "Hi there. Welcome. I am '{bot_name}', I am here to guide you. How can I assist you today?",
          calendly_enabled: false,
          calendly_link: '',
        });
        alert('Agent created successfully!');
        // You might want to redirect to bot list or refresh bot list here
      } else {
        alert(data.error || 'Failed to create agent');
      }
    } catch (error) {
      console.error('Agent creation error:', error);
      alert('Failed to create agent');
    } finally {
      setIsLoading(false);
    }
  };

  const fontOptions = ['Arial', 'Helvetica', 'Georgia', 'Times New Roman', 'Courier New', 'Verdana'];
  const fontSizeOptions = ['12px', '14px', '16px', '18px', '20px', '22px', '24px'];
  const modelOptions = ['gpt-4o-mini', 'gpt-4', 'gpt-3.5-turbo'];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-teal-100 rounded-lg">
              <Bot className="w-5 h-5 text-teal-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Create New AI Agent</h2>
              <p className="text-gray-600 text-sm">Configure your AI agent&apos;s settings and behavior</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleCreateBot} className="p-6 space-y-8">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Agent Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                placeholder="My Agent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Media Type
              </label>
              <select
                value={formData.media_type}
                onChange={(e) => setFormData({ ...formData, media_type: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              >
                <option value="text">Text Only</option>
                <option value="audio">Audio Only</option>
                <option value="both">Text & Audio</option>
              </select>
            </div>
          </div>

          {/* Appearance Settings */}
          <div className="border-t border-gray-200 pt-6">
            <div className="flex items-center space-x-2 mb-4">
              <Palette className="w-4 h-4 text-gray-600" />
              <h3 className="text-lg font-medium text-gray-900">Appearance</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Primary Color
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    className="w-12 h-12 border border-gray-300 rounded-lg cursor-pointer"
                  />
                  <input
                    type="text"
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 font-mono text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Font Family
                </label>
                <select
                  value={formData.font}
                  onChange={(e) => setFormData({ ...formData, font: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
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
                  value={formData.font_size}
                  onChange={(e) => setFormData({ ...formData, font_size: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                >
                  {fontSizeOptions.map((size) => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* AI Configuration */}
          <div className="border-t border-gray-200 pt-6">
            <div className="flex items-center space-x-2 mb-4">
              <Bot className="w-4 h-4 text-gray-600" />
              <h3 className="text-lg font-medium text-gray-900">AI Configuration</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Default Model
                </label>
                <select
                  value={formData.default_model}
                  onChange={(e) => setFormData({ ...formData, default_model: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                >
                  {modelOptions.map((model) => (
                    <option key={model} value={model}>{model}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  System Prompt
                </label>
                <textarea
                  value={formData.prompt}
                  onChange={(e) => setFormData({ ...formData, prompt: e.target.value })}
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 resize-vertical"
                  placeholder="Define how your AI agent should behave..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Welcome Message
                </label>
                <input
                  type="text"
                  value={formData.welcome_message}
                  onChange={(e) => setFormData({ ...formData, welcome_message: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  placeholder="Welcome message (use {bot_name} for agent name)"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Use &#123;bot_name&#125; to automatically insert the agent&apos;s name
                </p>
              </div>
            </div>
          </div>

          {/* Calendly Integration */}
          <div className="border-t border-gray-200 pt-6">
            <div className="flex items-center space-x-2 mb-4">
              <Calendar className="w-4 h-4 text-gray-600" />
              <h3 className="text-lg font-medium text-gray-900">Calendly Integration</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="calendly_enabled"
                  checked={formData.calendly_enabled}
                  onChange={(e) => setFormData({ ...formData, calendly_enabled: e.target.checked })}
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
                    onChange={(e) => setFormData({ ...formData, calendly_link: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    placeholder="https://calendly.com/your-username"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="border-t border-gray-200 pt-6">
            <motion.button
              type="submit"
              disabled={isLoading || !formData.name}
              whileHover={{ scale: isLoading || !formData.name ? 1 : 1.02 }}
              whileTap={{ scale: isLoading || !formData.name ? 1 : 0.98 }}
              className="w-full bg-gradient-to-r from-teal-500 to-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:from-teal-600 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Creating agent...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Create AI agent</span>
                </>
              )}
            </motion.button>
          </div>
        </form>
      </div>
    </div>
  );
}