// components/BotCreationWizard.tsx - COMPLETE CORRECTED VERSION
'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Bot,
  Palette,
  Calendar,
  Save,
  Upload,
  Brain,
  ArrowLeft,
  ArrowRight,
  FileText,
  CheckCircle,
  AlertCircle,
  Loader2
} from 'lucide-react';

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

interface Bot {
  id: string;
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
  container_name: string;
  training_status: string;
}

interface UploadedFile {
  id: string;
  name: string;
  s3_key: string;
  size: number;
  uploaded_at: string;
  type: string;
}

export function BotCreationWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [createdBot, setCreatedBot] = useState<Bot | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [trainingStatus, setTrainingStatus] = useState<string>('');
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [error, setError] = useState<string>('');

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

  const fetchUploadedFiles = useCallback(async () => {
    if (!createdBot) return;

    try {
      const token = sessionStorage.getItem('access_token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bots/${createdBot.id}/files/`, {
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
  }, [createdBot]);

  // Fetch uploaded files when step 2 is active and bot is created
  useEffect(() => {
    if (currentStep === 2 && createdBot) {
      fetchUploadedFiles();
    }
  }, [currentStep, createdBot, fetchUploadedFiles]);

  const clearError = () => setError('');

  const handleCreateBot = async () => {
    if (!formData.name) {
      setError('Please enter a agent name');
      return;
    }

    if (formData.name.length < 3) {
      setError('Agent name must be at least 3 characters long');
      return;
    }

    setIsLoading(true);
    clearError();

    try {
      const token = sessionStorage.getItem('access_token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bots/create/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name: formData.name })
      });

      const data = await response.json() as Record<string, unknown>;

       if (response.ok) {
         setCreatedBot(data.bot as Bot);
        setCurrentStep(2);
      } else {
        setError((data.error as string) || 'Failed to create agent');
      }
    } catch (error) {
      console.error('Agent creation error:', error);
      setError('Failed to create agent. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async () => {
    if (!createdBot || selectedFiles.length === 0) return;

    setIsLoading(true);
    clearError();

    try {
      const token = sessionStorage.getItem('access_token');
      const uploadFormData = new FormData();

      selectedFiles.forEach(file => {
        uploadFormData.append('files', file);
      });

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bots/${createdBot.id}/upload/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: uploadFormData
      });

      const data = await response.json();

      if (response.ok) {
        setSelectedFiles([]);
        fetchUploadedFiles();

        if (data.rejected_files && data.rejected_files.length > 0) {
            setError(`Some files were rejected: ${data.rejected_files.map((f: Record<string, unknown>) => `${f.name} (${f.reason})`).join(', ')}`);
          }
      } else {
        setError(data.error || 'Failed to upload files');
      }
    } catch (error) {
      console.error('File upload error:', error);
      setError('Failed to upload files. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };



  const handleTrainBot = async () => {
    if (!createdBot) return;

    setIsLoading(true);
    clearError();

    try {
      const token = sessionStorage.getItem('access_token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bots/${createdBot.id}/train/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (response.ok) {
        setTrainingStatus(data.status);
        setCurrentStep(4);
      } else {
        setError(data.error || 'Failed to start training');
      }
    } catch (error) {
      console.error('Training error:', error);
      setError('Failed to start training. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateBot = async () => {
    if (!createdBot) return;

    setIsLoading(true);
    clearError();

    try {
      const token = sessionStorage.getItem('access_token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bots/${createdBot.id}/update/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setCurrentStep(5);
      } else {
        setError(data.error || 'Failed to update agent');
      }
    } catch (error) {
      console.error('Agent update error:', error);
      setError('Failed to update agent. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);

      // Filter for allowed file types
      const allowedExtensions = ['.pdf', '.docx', '.txt', '.md', '.xlsx', '.xls', '.csv'];
      const validFiles = files.filter(file => {
        const extension = '.' + file.name.split('.').pop()?.toLowerCase();
        return allowedExtensions.includes(extension || '');
      });

      if (validFiles.length !== files.length) {
        setError('Some files were skipped. Only PDF, DOCX, TXT, MD, Excel, and CSV files are allowed.');
      }

      setSelectedFiles(validFiles);
    }
  };

  const fontOptions = ['Arial', 'Helvetica', 'Georgia', 'Times New Roman', 'Courier New', 'Verdana'];
  const fontStyleOptions = ['normal', 'italic', 'bold', 'bold italic'];
  const fontSizeOptions = ['12px', '14px', '16px', '18px', '20px', '22px', '24px'];
  const modelOptions = ['gpt-4o-mini', 'gpt-4', 'gpt-3.5-turbo'];

  const renderStep1 = () => (
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

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-red-600" />
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        </div>
      )}

      <div className="flex justify-end">
        <button
          onClick={handleCreateBot}
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

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Training Files</h3>
        <p className="text-gray-600 mb-4">
          Upload PDF, DOCX, TXT, MD, or Excel files to train your agent.
        </p>
      </div>

      {/* File Upload Area */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-teal-400 transition-colors">
        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
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
          className="cursor-pointer bg-teal-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-teal-700 transition-colors inline-block mb-4"
        >
          Choose Files
        </label>
        <p className="text-gray-500 text-sm">
          {selectedFiles.length > 0
            ? `${selectedFiles.length} files selected`
            : 'Drag & drop files or click to browse'}
        </p>
        <p className="text-xs text-gray-400 mt-2">
          Supported formats: PDF, DOCX, TXT, MD, Excel, CSV (Max 50MB per file)
        </p>
      </div>

      {/* Selected Files */}
      {selectedFiles.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900">Files Ready for Upload:</h4>
          {selectedFiles.map((file, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center space-x-3">
                <FileText className="w-4 h-4 text-blue-600" />
                <div>
                  <span className="text-sm font-medium text-gray-700">{file.name}</span>
                  <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
              <span className="text-xs text-blue-600 font-medium">Ready</span>
            </div>
          ))}

          <button
            onClick={handleFileUpload}
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Uploading...</span>
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                <span>Upload {selectedFiles.length} File{selectedFiles.length !== 1 ? 's' : ''}</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Uploaded Files List */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900">Uploaded Files:</h4>
          {uploadedFiles.map((file) => (
            <div key={file.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <div>
                  <span className="text-sm font-medium text-gray-700">{file.name}</span>
                  <p className="text-xs text-gray-500">
                    Uploaded {new Date(file.uploaded_at).toLocaleDateString()} • {file.type?.toUpperCase()}
                  </p>
                </div>
              </div>
              <span className="text-xs text-green-600 font-medium">Uploaded</span>
            </div>
          ))}
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-red-600" />
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        </div>
      )}

      <div className="flex justify-between pt-4 border-t border-gray-200">
        <button
          onClick={() => setCurrentStep(1)}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <button
          onClick={() => setCurrentStep(3)}
          disabled={uploadedFiles.length === 0}
          className="bg-teal-600 text-white py-2 px-6 rounded-lg font-medium hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
        >
          <span>Continue to Training ({uploadedFiles.length} files)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Train Your Agent</h3>
        <p className="text-gray-600 mb-4">
          Start the training process with your uploaded files.
          This will send the files from S3 to the training API to create your AI agent.
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
          <strong>Agent Model:</strong> {formData.default_model}
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-red-600" />
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        </div>
      )}

      <div className="flex justify-between pt-4 border-t border-gray-200">
        <button
          onClick={() => setCurrentStep(2)}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <button
          onClick={handleTrainBot}
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

  const renderStep4 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Agent Configuration</h3>
        <p className="text-gray-600 mb-4">Customize your agent&apos;s appearance and behavior</p>
      </div>

      {/* Bot Preview */}
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

      {/* Appearance Settings */}
      <div className="border-t border-gray-200 pt-6">
        <div className="flex items-center space-x-2 mb-4">
          <Palette className="w-4 h-4 text-gray-600" />
          <h4 className="text-md font-medium text-gray-900">Appearance Settings</h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                placeholder="#0C7075"
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Font Style
            </label>
            <select
              value={formData.font_style}
              onChange={(e) => setFormData({ ...formData, font_style: e.target.value })}
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
            <p className="text-sm text-gray-500 mt-1">
             This prompt defines the agent&apos;s personality and behavior
            </p>
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
              Use {'{bot_name}'} to automatically insert the agent&apos;s name
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

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-red-600" />
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        </div>
      )}

      <div className="flex justify-between border-t border-gray-200 pt-6">
        <button
          onClick={() => setCurrentStep(3)}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <button
          onClick={handleUpdateBot}
          disabled={isLoading}
          className="bg-teal-600 text-white py-2 px-6 rounded-lg font-medium hover:bg-teal-700 transition-colors disabled:opacity-50 flex items-center space-x-2"
        >
          <Save className="w-4 h-4" />
          <span>{isLoading ? 'Saving Configuration...' : 'Save Configuration'}</span>
        </button>
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="text-center py-8">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <CheckCircle className="w-8 h-8 text-green-600" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">Agent Created Successfully!</h3>
      <p className="text-gray-600 mb-2">
      Your AI agent &quot;{createdBot?.name}&quot; is ready to use.
      </p>

      <div className="space-x-4">
        <button
          onClick={() => window.location.href = '/dashboard?tab=bot-list'}
          className="bg-teal-600 text-white py-2 px-6 rounded-lg font-medium hover:bg-teal-700 transition-colors"
        >
          View All Agents
        </button>
        <button
          onClick={() => {
            setCurrentStep(1);
            setCreatedBot(null);
            setSelectedFiles([]);
            setUploadedFiles([]);
            setTrainingStatus('');
            setError('');
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
          }}
          className="bg-gray-200 text-gray-700 py-2 px-6 rounded-lg font-medium hover:bg-gray-300 transition-colors"
        >
          Create Another Agent
        </button>
      </div>
    </div>
  );

  const steps = [
    { number: 1, title: 'Basic Info' },
    { number: 2, title: 'Upload Files' },
    { number: 3, title: 'Training' },
    { number: 4, title: 'Configuration' },
    { number: 5, title: 'Complete' },
  ];

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
              <p className="text-gray-600 text-sm">Step-by-step agent creation process</p>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${currentStep >= step.number
                    ? 'bg-teal-600 border-teal-600 text-white'
                    : 'border-gray-300 text-gray-500'
                  }`}>
                  {step.number}
                </div>
                <span className={`ml-2 text-sm font-medium ${currentStep >= step.number ? 'text-teal-600' : 'text-gray-500'
                  }`}>
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div className={`w-12 h-0.5 mx-4 ${currentStep > step.number ? 'bg-teal-600' : 'bg-gray-300'
                    }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}
          {currentStep === 5 && renderStep5()}
        </div>
      </div>
    </div>
  );
}