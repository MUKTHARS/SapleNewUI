// components/bot-creation/shared/ChatPreview.tsx
import { Bot, User, Mic, MessageSquare, Volume2, Zap } from 'lucide-react';

interface ChatPreviewProps {
  formData: Record<string, unknown>;
}

export function ChatPreview({ formData }: ChatPreviewProps) {
  const getMediaTypeIcon = () => {
    switch (formData.media_type) {
      case 'text': return <MessageSquare className="w-4 h-4" />;
      case 'audio': return <Mic className="w-4 h-4" />;
      case 'both': return <Zap className="w-4 h-4" />;
      default: return <MessageSquare className="w-4 h-4" />;
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

  const getMediaTypeLabel = () => {
    switch (formData.media_type) {
      case 'text': return 'Text Agent';
      case 'audio': return 'Voice Agent';
      case 'both': return 'Text & Voice Agent';
      default: return 'Text Agent';
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl border border-gray-300 p-4 max-w-md mx-auto shadow-sm">
        {/* Chat Header */}
        <div className="flex items-center space-x-3 mb-4 pb-3 border-b border-gray-200">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-white shadow-md"
            style={{ backgroundColor: formData.color as string }}
          >
            <Bot className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <p className="font-semibold text-gray-900" style={{ fontFamily: formData.font as string }}>
                {(formData.name as string) || 'Your Agent'}
              </p>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${getMediaTypeColor()} shadow-sm`}>
                {getMediaTypeIcon()}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <p className="text-xs text-gray-500">Online</p>
              <p className="text-xs text-gray-500 capitalize font-medium">
                {getMediaTypeLabel()}
              </p>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="space-y-4">
          {/* Bot Message */}
          <div className="flex items-start space-x-3">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white flex-shrink-0 mt-1 shadow-sm"
              style={{ backgroundColor: formData.color as string }}
            >
              <Bot className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p
                className="text-sm break-words bg-gray-100 rounded-2xl rounded-tl-none p-4 shadow-sm"
                style={{
                  fontFamily: formData.font as string,
                  fontSize: formData.font_size as string,
                  color: formData.color as string,
                  fontStyle: (formData.font_style as string).includes('italic') ? 'italic' : 'normal',
                  fontWeight: (formData.font_style as string).includes('bold') ? 'bold' : 'normal'
                }}
              >
                {(formData.welcome_message as string).replace('{bot_name}', (formData.name as string) || 'Your Agent')}
              </p>
            </div>
          </div>

          {/* User Message */}
          <div className="flex items-start space-x-3 justify-end">
            <div className="flex-1 min-w-0">
              <p className="text-sm break-words bg-blue-600 text-white rounded-2xl rounded-tr-none p-4 text-right shadow-sm">
                Hi! Can you help me with something?
              </p>
            </div>
            <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center text-white flex-shrink-0 mt-1 shadow-sm">
              <User className="w-4 h-4" />
            </div>
          </div>

          {/* Bot Response */}
          <div className="flex items-start space-x-3">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white flex-shrink-0 mt-1 shadow-sm"
              style={{ backgroundColor: formData.color as string }}
            >
              <Bot className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p
                className="text-sm break-words bg-gray-100 rounded-2xl rounded-tl-none p-4 shadow-sm"
                style={{
                  fontFamily: formData.font as string,
                  fontSize: formData.font_size as string,
                  color: formData.color as string,
                  fontStyle: (formData.font_style as string).includes('italic') ? 'italic' : 'normal',
                  fontWeight: (formData.font_style as string).includes('bold') ? 'bold' : 'normal'
                }}
              >
                Of course! I&apos;d be happy to help. What would you like to know? I can assist you with information from my training documents.
              </p>
            </div>
          </div>
        </div>

        {/* Input Area with Voice Indicator */}
        <div className="mt-4 pt-3 border-t border-gray-200">
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder={
                (formData.media_type as string) === 'audio' 
                  ? "Click the microphone to speak..." 
                  : (formData.media_type as string) === 'both'
                  ? "Type a message or click the microphone..."
                  : "Type your message..."
              }
              className="flex-1 px-4 py-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
              disabled
            />
            {([(formData.media_type as string) === 'audio', (formData.media_type as string) === 'both'].some(v => v)) && (
              <button
                className="px-4 py-3 bg-green-500 text-white rounded-xl text-sm font-semibold flex items-center space-x-2 hover:bg-green-600 transition-colors shadow-sm"
                disabled
              >
                <Mic className="w-4 h-4" />
                <span>Speak</span>
              </button>
            )}
            {([(formData.media_type as string) === 'text', (formData.media_type as string) === 'both'].some(v => v)) && (
              <button
                className="px-4 py-3 text-white rounded-xl text-sm font-semibold shadow-sm"
                style={{ backgroundColor: formData.color as string }}
                disabled
                >
                Send
                </button>
                )}
                </div>
                
                {/* Voice Status */}
                {([(formData.media_type as string) === 'audio', (formData.media_type as string) === 'both'].some(v => v)) && (
            <div className="mt-2 flex items-center space-x-2 text-xs text-gray-500">
              <Volume2 className="w-3 h-3" />
              <span className="font-medium">
                {(formData.media_type as string) === 'audio' 
                  ? 'Voice input ready' 
                  : 'Text and voice input available'
                }
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="text-center">
        <p className="text-sm text-gray-500 font-medium">
          Live preview of your agent&apos;s appearance and interaction style
        </p>
        <p className="text-xs text-gray-400 mt-1">
          This shows how users will interact with your {(formData.media_type as string) === 'both' ? 'text and voice' : (formData.media_type as string)} agent
        </p>
      </div>
    </div>
  );
}