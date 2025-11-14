// components/bot-creation/shared/BotPreview.tsx
import { Bot } from 'lucide-react';
import { BotFormData } from '../types/bot-types';

interface BotPreviewProps {
  formData: BotFormData;
}

export function BotPreview({ formData }: BotPreviewProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-200">
      <div className="text-sm text-gray-600 mb-2 font-medium">Live Preview:</div>
      <div className="flex items-start space-x-3">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-white flex-shrink-0"
          style={{ backgroundColor: formData.color }}
        >
          <Bot className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0">
          <p
            className="text-sm break-words"
            style={{
              fontFamily: formData.font,
              fontSize: formData.font_size,
              color: formData.color,
              fontStyle: formData.font_style.includes('italic') ? 'italic' : 'normal',
              fontWeight: formData.font_style.includes('bold') ? 'bold' : 'normal'
            }}
          >
            {formData.welcome_message.replace('{bot_name}', formData.name || 'Your Agent')}
          </p>
        </div>
      </div>
    </div>
  );
}