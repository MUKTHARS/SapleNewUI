// components/BotList.tsx - FULL HEIGHT PREVIEW
'use client';

import { useState, useEffect } from 'react';
import { Bot, Upload, Brain, Edit, Copy, X, FileText, Trash2, CheckCircle, AlertCircle, Loader2, ChevronDown, ChevronUp, Plus, Sparkles, Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Bot {
  id: string;
  name: string;
  color: string;
  font: string;
  font_size: string;
  default_model: string;
  created_at: string;
  training_status: string;
  media_type: string;
  font_style: string;
  prompt: string;
  welcome_message: string;
  calendly_enabled: boolean;
  calendly_link: string;
  tenant?: string;
  container: string;
}

interface UploadedFile {
  id: string;
  name: string;
  s3_key: string;
  size: number;
  uploaded_at: string;
  type: string;
}

interface FrameworkInstruction {
  id: string;
  name: string;
  icon: string;
  instructions: string[];
}

export function BotList() {
  const [bots, setBots] = useState<Bot[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [uploadTrainModal, setUploadTrainModal] = useState<{open: boolean, botId: string | null, botName: string}>({open: false, botId: null, botName: ''});
  const [files, setFiles] = useState<File[]>([]);
  const [copyScriptModal, setCopyScriptModal] = useState<{open: boolean, botId: string | null, botName: string, workspaceId?: string}>({open: false, botId: null, botName: '', workspaceId: ''});
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isTraining, setIsTraining] = useState(false);
  const [error, setError] = useState('');
  const [fileToDelete, setFileToDelete] = useState<UploadedFile | null>(null);
  const [expandedFrameworks, setExpandedFrameworks] = useState<string[]>(['html']);
  const [previewBot, setPreviewBot] = useState<Bot | null>(null);
  const router = useRouter();

  const frameworkInstructions: FrameworkInstruction[] = [
    {
      id: 'html',
      name: 'HTML',
      icon: '🌐',
      instructions: [
        'Paste the script tag just before the closing </body> tag',
        'Make sure it\'s placed after your main content',
        'Save the file and refresh your browser'
      ]
    },
    {
      id: 'react',
      name: 'React',
      icon: '⚛️',
      instructions: [
        'Create a new component or use an existing one',
        'Use useEffect to dynamically add the script',
        'Add the script to public/index.html for global availability',
        'Or use react-helmet for dynamic script injection'
      ]
    },
    {
      id: 'nextjs',
      name: 'Next.js',
      icon: '▲',
      instructions: [
        'Create a custom component using useEffect',
        'Add the script to pages/_document.js for global availability',
        'Use next/script component for optimized loading',
        'Place the script in _app.js for application-wide availability'
      ]
    },
    {
      id: 'vue',
      name: 'Vue.js',
      icon: '🟢',
      instructions: [
        'Add the script in mounted() lifecycle hook',
        'Create a plugin for reusable chatbot integration',
        'Use vue-meta for dynamic script injection',
        'Place in public/index.html for global availability'
      ]
    },
    {
      id: 'angular',
      name: 'Angular',
      icon: '🅰️',
      instructions: [
        'Add the script in index.html before closing body tag',
        'Create a service for chatbot functionality',
        'Use Angular Element for component integration',
        'Add to angular.json scripts array for build inclusion'
      ]
    },
    {
      id: 'wordpress',
      name: 'WordPress',
      icon: '📝',
      instructions: [
        'Go to Appearance → Theme Editor',
        'Paste the script in header.php or footer.php before closing body tag',
        'Use a plugin like "Header and Footer Scripts"',
        'Add via functions.php using wp_footer hook'
      ]
    },
    {
      id: 'shopify',
      name: 'Shopify',
      icon: '🛒',
      instructions: [
        'Go to Online Store → Themes → Actions → Edit Code',
        'Find theme.liquid file',
        'Paste the script just before closing </body> tag',
        'Save and preview your store'
      ]
    },
    {
      id: 'squarespace',
      name: 'Squarespace',
      icon: '⬛',
      instructions: [
        'Go to Settings → Advanced → Code Injection',
        'Paste the script in Footer section',
        'Save changes and refresh your site',
        'Use Markdown block for specific page integration'
      ]
    },
    {
      id: 'wix',
      name: 'Wix',
      icon: '🔧',
      instructions: [
        'Go to Settings → Advanced → Custom Code',
        'Click "Add Custom Code"',
        'Paste the script in the code box',
        'Set location to "Body - end" and apply to all pages'
      ]
    },
    {
      id: 'php',
      name: 'PHP',
      icon: '🐘',
      instructions: [
        'Add the script in your template file before closing body tag',
        'Use include() for reusable script integration',
        'Add to footer.php in WordPress themes',
        'Ensure script is outside PHP tags'
      ]
    }
  ];

  useEffect(() => {
    fetchBots();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchBots = async () => {
    try {
      const token = sessionStorage.getItem('access_token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bots/list/`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setBots(data.bots);
        // Auto-select first bot for preview if available
        if (data.length > 0 && !previewBot) {
          setPreviewBot(data[0]);
        }
      } else {
        console.error('Failed to fetch agents');
      }
    } catch (error) {
      console.error('Error fetching bots:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => setError('');

  const fetchUploadedFiles = async (botId: string) => {
    try {
      const token = sessionStorage.getItem('access_token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bots/${botId}/files/`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const files = await response.json();
        setUploadedFiles(files);
      } else {
        console.error('Failed to fetch files');
      }
    } catch (error) {
      console.error('Failed to fetch files:', error);
    }
  };

  const handleEditBot = (botId: string) => {
    router.push(`/dashboard/bots/edit/${botId}`);
  };

  const handleOpenUploadTrainModal = async (botId: string, botName: string) => {
    setUploadTrainModal({open: true, botId, botName});
    setFiles([]);
    setError('');
    await fetchUploadedFiles(botId);
  };

  const handleOpenCopyScriptModal = (botId: string, botName: string, workspaceId?: string) => {
    setCopyScriptModal({open: true, botId, botName, workspaceId});
    setExpandedFrameworks(['html']);
  };

  const handlePreviewBot = (bot: Bot) => {
    setPreviewBot(bot);
  };

  const handleClosePreview = () => {
    setPreviewBot(null);
  };

  const handleFileUpload = async () => {
    if (!uploadTrainModal.botId || files.length === 0) return;

    setIsUploading(true);
    clearError();

    try {
      const token = sessionStorage.getItem('access_token');
      const uploadFormData = new FormData();

      files.forEach(file => {
        uploadFormData.append('files', file);
      });

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bots/${uploadTrainModal.botId}/upload/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: uploadFormData
      });

      const data = await response.json();

      if (response.ok) {
        setFiles([]);
        await fetchUploadedFiles(uploadTrainModal.botId!);

        if (data.rejected_files && data.rejected_files.length > 0) {
         setError(`Some files were rejected: ${data.rejected_files.map((f: Record<string, string>) => `${f.name} (${f.reason})`).join(', ')}`);
        }
      } else {
        setError(data.error || 'Failed to upload files');
      }
    } catch (error) {
      console.error('File upload error:', error);
      setError('Failed to upload files. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteFile = async (fileId: string) => {
    if (!uploadTrainModal.botId) return;

    setIsUploading(true);
    clearError();

    try {
      const token = sessionStorage.getItem('access_token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bots/${uploadTrainModal.botId}/files/${fileId}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
        setFileToDelete(null);
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to delete file');
      }
    } catch (error) {
      console.error('File deletion error:', error);
      setError('Failed to delete file. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleTrainBot = async () => {
    if (!uploadTrainModal.botId) return;

    setIsTraining(true);
    clearError();

    try {
      const token = sessionStorage.getItem('access_token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bots/${uploadTrainModal.botId}/train/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (response.ok) {
        alert('Training started successfully!');
        setUploadTrainModal({open: false, botId: null, botName: ''});
        setFiles([]);
        setUploadedFiles([]);
        fetchBots(); // Refresh list
      } else {
        setError(data.error || 'Failed to start training');
      }
    } catch (error) {
      console.error('Training error:', error);
      setError('Failed to start training. Please try again.');
    } finally {
      setIsTraining(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);

      // Filter for allowed file types
      const allowedExtensions = ['.pdf', '.docx', '.txt', '.md', '.xlsx', '.xls', '.csv'];
      const validFiles = selectedFiles.filter(file => {
        const extension = '.' + file.name.split('.').pop()?.toLowerCase();
        return allowedExtensions.includes(extension || '');
      });

      if (validFiles.length !== selectedFiles.length) {
        setError('Some files were skipped. Only PDF, DOCX, TXT, MD, Excel, and CSV files are allowed.');
      }

      setFiles(validFiles);
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const generateScript = (workspaceId: string, botId: string) => {
    return `<script>
document.addEventListener("DOMContentLoaded", function() {
  var w = window.innerWidth;
  var i = document.createElement("iframe");
  i.src = "${process.env.NEXT_PUBLIC_APP_URL || 'https://devbot.saple.ai'}/${workspaceId}/${botId}";
  i.style.position = "fixed";
  i.style.bottom = "0px";
  i.style.right = "0px";
  i.style.zIndex = "999";
  i.style.border = "none";
  document.body.appendChild(i);
  
  const c = i.contentWindow;
  window.addEventListener("message", function(e) {
    if (e.data.width && e.data.height) {
      w >= 600 ? i.width = e.data.width : i.width = '400px';
      i.height = e.data.height;
    }
  });
});
</script>`;
  };

  const handleCopyScript = (workspaceId: string, botId: string) => {
    const script = generateScript(workspaceId, botId);
    navigator.clipboard.writeText(script)
      .then(() => {
        alert('Script copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy script: ', err);
        alert('Failed to copy script');
      });
  };

  const toggleFramework = (frameworkId: string) => {
    setExpandedFrameworks(prev =>
      prev.includes(frameworkId)
        ? prev.filter(id => id !== frameworkId)
        : [...prev, frameworkId]
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your AI agents...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex"> {/* Changed to h-screen for full height */}
      {/* Left Panel - Bot List (Scrollable) */}
      <div className={`${previewBot ? 'w-1/2' : 'w-full'} pr-6 border-r border-gray-200 overflow-y-auto`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="mb-4 sm:mb-0">
                <h1 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  AI Agents
                </h1>
                <p className="text-gray-600 mt-2">Manage and configure your AI agents</p>
              </div>
              <button
                onClick={() => router.push('/dashboard?tab=bots')}
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-teal-600 to-teal-700 text-white font-medium rounded-lg hover:from-teal-700 hover:to-teal-800 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <Plus className="w-5 h-5 mr-2" />
                New Agent
              </button>
            </div>
          </div>

          {/* Bot Cards Grid */}
          <div className={`grid grid-cols-1 ${previewBot ? 'md:grid-cols-1' : 'md:grid-cols-2 xl:grid-cols-2'} gap-6 pb-6`}>
            {bots.map((bot) => (
              <div
                key={bot.id}
                className={`bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 group ${
                  previewBot?.id === bot.id ? 'ring-2 ring-teal-500 ring-opacity-50' : ''
                }`}
              >
                {/* Bot Header with Gradient */}
                <div
                  className="h-2 bg-gradient-to-r from-blue-500 to-purple-600"
                  style={{ background: `linear-gradient(45deg, ${bot.color}20, ${bot.color}60)` }}
                />

                <div className="p-6">
                  {/* Bot Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg"
                        style={{ 
                          background: `linear-gradient(135deg, ${bot.color}, ${bot.color}cc)`,
                          boxShadow: `0 4px 15px ${bot.color}40`
                        }}
                      >
                        <Bot className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg">{bot.name}</h3>
                        <p className="text-sm text-gray-500" style={{ fontFamily: bot.font }}>
                          {bot.default_model}
                        </p>
                      </div>
                    </div>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" title="Online" />
                  </div>

                  {/* Bot Preview */}
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 mb-5 border border-gray-200">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0 shadow-sm">
                        <Bot className="w-4 h-4 text-teal-600" />
                      </div>
                      <div className="flex-1">
                        <p
                          className="text-sm text-gray-700 leading-relaxed"
                          style={{
                            fontFamily: bot.font,
                            fontSize: bot.font_size,
                            color: bot.color
                          }}
                        >
                          Hi! I&apos;m {bot.name}, your AI agent. How can I help you today?
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditBot(bot.id)}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2.5 px-3 rounded-xl text-sm font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                    >
                      <Edit className="w-4 h-4" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleOpenUploadTrainModal(bot.id, bot.name)}
                      className="flex-1 bg-gradient-to-r from-orange-600 to-orange-700 text-white py-2.5 px-3 rounded-xl text-sm font-semibold hover:from-orange-700 hover:to-orange-800 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                    >
                      <Upload className="w-4 h-4" />
                      <span>Train</span>
                    </button>
                    <button
                      onClick={() => handlePreviewBot(bot)}
                      className={`flex-1 py-2.5 px-3 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl ${
                        previewBot?.id === bot.id 
                          ? 'bg-gradient-to-r from-teal-600 to-teal-700 text-white' 
                          : 'bg-gradient-to-r from-gray-600 to-gray-700 text-white hover:from-gray-700 hover:to-gray-800'
                      }`}
                    >
                      <Eye className="w-4 h-4" />
                      <span>Preview</span>
                    </button>
                    <button
                      onClick={() => handleOpenCopyScriptModal(bot.container, bot.name, bot.tenant)}
                      className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 text-white py-2.5 px-3 rounded-xl text-sm font-semibold hover:from-purple-700 hover:to-purple-800 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                    >
                      <Copy className="w-4 h-4" />
                      <span>Embed</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {bots.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Bot className="w-10 h-10 text-gray-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No AI Agents Yet</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Create your first AI agent to start providing intelligent chat support on your website.
              </p>
              <button
                onClick={() => router.push('/dashboard?tab=bots')}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-teal-600 to-teal-700 text-white font-semibold rounded-xl hover:from-teal-700 hover:to-teal-800 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create Your First Agent
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Right Panel - Preview (Full Height) */}
      {previewBot && (
        <div className="w-1/2 pl-6 flex flex-col h-[80vh]"> {/* Changed to h-screen */}
          <div className="flex-1 flex flex-col bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden h-full"> {/* Added h-full */}
            {/* Preview Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
              <div className="flex items-center space-x-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-white"
                  style={{ 
                    background: `linear-gradient(135deg, ${previewBot.color}, ${previewBot.color}cc)`
                  }}
                >
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Preview: {previewBot.name}</h3>
                  <p className="text-sm text-gray-500">Live agent preview - Test your agent</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" title="Online" />
                  <span className="text-xs text-gray-500">Live</span>
                </div>
                <button
                  onClick={handleClosePreview}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-lg ml-2"
                  title="Close preview"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Bot Preview Iframe - Full Height */}
            <div className="flex-1 h-full"> {/* Changed to ensure full height */}
              <iframe
                src={`${process.env.NEXT_PUBLIC_APP_URL || 'https://devbot.saple.ai'}/${previewBot.tenant}/${previewBot.container}`}
                className="w-full h-full border-0"
                title={`${previewBot.name} Preview`}
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              />
            </div>
          </div>
        </div>
      )}

      {/* Upload & Train Modal */}
      {uploadTrainModal.open && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-200">
            <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Upload & Train
                </h3>
                <p className="text-gray-600 text-sm mt-1">{uploadTrainModal.botName}</p>
              </div>
              <button 
                onClick={() => setUploadTrainModal({open: false, botId: null, botName: ''})}
                className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* File Upload Section */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-3">
                  Upload Training Files
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-teal-400 transition-all duration-200 bg-gray-50/50">
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.docx,.txt,.md,.xlsx,.xls,.csv"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-3">
                      <Upload className="w-6 h-6 text-teal-600" />
                    </div>
                    <span className="text-base font-medium text-gray-700">
                      Click to upload files
                    </span>
                    <span className="text-sm text-gray-500 mt-1">
                      PDF, DOCX, TXT, MD, Excel, CSV supported
                    </span>
                  </label>
                </div>
              </div>

              {/* Selected Files */}
              {files.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-800 mb-3">Selected Files:</h4>
                  <div className="space-y-2">
                    {files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-blue-50 rounded-lg p-3 border border-blue-200">
                        <div className="flex items-center space-x-3">
                          <FileText className="w-4 h-4 text-blue-600" />
                          <div>
                            <span className="text-sm font-medium text-gray-800">
                              {file.name}
                            </span>
                            <span className="text-xs text-gray-500 block">
                              {(file.size / 1024 / 1024).toFixed(2)} MB
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => handleRemoveFile(index)}
                          className="text-red-500 hover:text-red-700 transition-colors p-1 hover:bg-red-50 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  <button
                    onClick={handleFileUpload}
                    disabled={isUploading}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 disabled:opacity-50 flex items-center justify-center space-x-2 mt-4 shadow-lg hover:shadow-xl"
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Uploading...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4" />
                        <span>Upload {files.length} File{files.length !== 1 ? 's' : ''}</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* Uploaded Files List */}
              {uploadedFiles.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-800 mb-3">Training Files:</h4>
                  <div className="space-y-2">
                    {uploadedFiles.map((file) => (
                      <div key={file.id} className="flex items-center justify-between bg-green-50 rounded-lg p-3 border border-green-200 group hover:bg-green-100 transition-all duration-200">
                        <div className="flex items-center space-x-3 flex-1">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <div className="flex-1 min-w-0">
                            <span className="text-sm font-medium text-gray-800 block truncate">{file.name}</span>
                            <p className="text-xs text-gray-500">
                              Uploaded {new Date(file.uploaded_at).toLocaleDateString()} • {(file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => setFileToDelete(file)}
                          disabled={isUploading}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors disabled:opacity-50"
                          title="Delete file"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  {/* File Statistics */}
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200 mt-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-700 font-medium">Total files: {uploadedFiles.length}</span>
                      <span className="text-gray-700 font-medium">
                        Total size: {(uploadedFiles.reduce((total, file) => total + file.size, 0) / 1024 / 1024).toFixed(2)} MB
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <div className="flex items-center space-x-3">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                    <p className="text-red-700 text-sm">{error}</p>
                  </div>
                </div>
              )}

              {/* Train Button */}
              <div className="flex space-x-3 pt-4 border-t border-gray-200">
                <button
                  onClick={handleTrainBot}
                  disabled={isTraining || uploadedFiles.length === 0}
                  className="flex-1 bg-gradient-to-r from-orange-600 to-orange-700 text-white py-3 px-4 rounded-xl font-semibold hover:from-orange-700 hover:to-orange-800 transition-all duration-200 disabled:opacity-50 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                >
                  {isTraining ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Training...</span>
                    </>
                  ) : (
                    <>
                      <Brain className="w-4 h-4" />
                      <span>Train Agent</span>
                    </>
                  )}
                </button>
                <button
                  onClick={() => setUploadTrainModal({open: false, botId: null, botName: ''})}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-200 border border-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Copy Script Modal */}
      {copyScriptModal.open && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-200">
            <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Embed Chatbot
                </h3>
                <p className="text-gray-600 text-sm mt-1">{copyScriptModal.botName}</p>
              </div>
              <button 
                onClick={() => setCopyScriptModal({open: false, botId: null, botName: '', workspaceId: ''})}
                className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6">
              {/* Script Code */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-800 mb-3">
                  Embed Script
                </label>
                <div className="bg-gray-900 rounded-xl p-4 mb-4 overflow-x-auto border border-gray-700">
                  <code className="text-sm text-green-400 whitespace-pre font-mono">
                    {generateScript(
                      copyScriptModal.workspaceId || 'WORKSPACE_ID', 
                      copyScriptModal.botId || 'BOT_ID'
                    )}
                  </code>
                </div>
                
                <button
                  onClick={() => copyScriptModal.botId && copyScriptModal.workspaceId && 
                    handleCopyScript(copyScriptModal.workspaceId, copyScriptModal.botId)}
                  className="w-full bg-gradient-to-r from-teal-600 to-teal-700 text-white py-3 px-4 rounded-xl font-semibold hover:from-teal-700 hover:to-teal-800 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                >
                  <Copy className="w-4 h-4" />
                  <span>Copy Script to Clipboard</span>
                </button>
              </div>

              {/* Framework Instructions */}
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-4">
                  Platform Integration Guides:
                </h4>
                
                <div className="space-y-3">
                  {frameworkInstructions.map((framework) => (
                    <div key={framework.id} className="border border-gray-200 rounded-xl overflow-hidden hover:border-gray-300 transition-all duration-200">
                      <button
                        onClick={() => toggleFramework(framework.id)}
                        className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white hover:from-gray-100 transition-all duration-200"
                      >
                        <div className="flex items-center space-x-4">
                          <span className="text-xl">{framework.icon}</span>
                          <div className="text-left">
                            <span className="font-semibold text-gray-900 block">{framework.name}</span>
                            <span className="text-xs text-gray-500">
                              {expandedFrameworks.includes(framework.id) ? 'Click to collapse' : 'Click to expand'}
                            </span>
                          </div>
                        </div>
                        {expandedFrameworks.includes(framework.id) ? (
                          <ChevronUp className="w-5 h-5 text-gray-500" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-500" />
                        )}
                      </button>
                      
                      {expandedFrameworks.includes(framework.id) && (
                        <div className="p-4 bg-white border-t border-gray-200">
                          <div className="space-y-3">
                            {framework.instructions.map((instruction, index) => (
                              <div key={index} className="flex items-start space-x-3">
                                <div className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
                                <p className="text-sm text-gray-700 leading-relaxed">{instruction}</p>
                              </div>
                            ))}
                          </div>
                          
                          {/* Additional Tips */}
                          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <p className="text-sm text-blue-800 leading-relaxed">
                              <strong>💡 Pro Tip:</strong> Always test the chatbot on your site after integration. 
                              The script works universally across all platforms and is mobile-responsive.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Universal Instructions */}
              <div className="mt-8 p-5 bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-xl">
                <h4 className="font-semibold text-amber-800 mb-3 flex items-center">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Universal Instructions:
                </h4>
                <ul className="text-sm text-amber-700 space-y-2">
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-3"></div>
                    The script works with any website or web application
                  </li>
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-3"></div>
                    Paste the script before the closing body tag
                  </li>
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-3"></div>
                    No additional dependencies required
                  </li>
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-3"></div>
                    Mobile-responsive and cross-browser compatible
                  </li>
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-3"></div>
                    Automatically loads when the page is ready
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* File Deletion Confirmation Modal */}
      {fileToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full border border-gray-200 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Delete File</h3>
              <button
                onClick={() => setFileToDelete(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="mb-6">
              <div className="flex items-center space-x-3 mb-3 p-3 bg-red-50 rounded-lg border border-red-200">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                <p className="text-red-700 text-sm font-medium">This action cannot be undone</p>
              </div>
              <p className="text-gray-600">
                Are you sure you want to delete <strong className="text-gray-800">{fileToDelete.name}</strong>?
              </p>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setFileToDelete(null)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteFile(fileToDelete.id)}
                disabled={isUploading}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all duration-200 disabled:opacity-50 flex items-center space-x-2 font-medium shadow-lg hover:shadow-xl"
              >
                {isUploading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Trash2 className="w-4 h-4" />
                )}
                <span>Delete File</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}