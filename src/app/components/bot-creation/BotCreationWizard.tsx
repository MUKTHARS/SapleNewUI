// components/bot-creation/BotCreationWizard.tsx - WITH SIDEBAR FOR EDIT MODE
'use client';

import { useState, useEffect } from 'react';
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
  Loader2,
  Trash2,
  X,
  Settings,
  User,
  FileCheck
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

interface BotCreationWizardProps {
  editMode?: boolean;
  existingBot?: Bot | null;
}

export function BotCreationWizard({ editMode = false, existingBot = null }: BotCreationWizardProps) {
  const [currentStep, setCurrentStep] = useState(editMode ? 1 : 1);
  const [isLoading, setIsLoading] = useState(false);
  const [createdBot, setCreatedBot] = useState<Bot | null>(existingBot);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [trainingStatus, setTrainingStatus] = useState<string>('');
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  const [error, setError] = useState<string>('');
  const [fileToDelete, setFileToDelete] = useState<UploadedFile | null>(null);

  const [formData, setFormData] = useState<BotFormData>({
    name: existingBot?.name || '',
    media_type: existingBot?.media_type || 'text',
    color: existingBot?.color || '#0C7075',
    font: existingBot?.font || 'Arial',
    font_style: existingBot?.font_style || 'normal',
    font_size: existingBot?.font_size || '12px',
    default_model: existingBot?.default_model || 'gpt-4o-mini',
    prompt: existingBot?.prompt || `You are a helpful, professional AI agent trained on company-specific documents. 
Answer user questions clearly and concisely using the provided knowledge. 
If you don't know the answer or it's outside your scope, say so politely. 
Always maintain a friendly, respectful, and informative tone. 
Do not fabricate answers. Refer only to the content you've been trained on.`,
    welcome_message: existingBot?.welcome_message || "Hi there. Welcome. I am '{bot_name}', I am here to guide you. How can I assist you today?",
    calendly_enabled: existingBot?.calendly_enabled || false,
    calendly_link: existingBot?.calendly_link || '',
  });

  // Fetch uploaded files when in edit mode and bot exists
  useEffect(() => {
    if (editMode && existingBot) {
      setCreatedBot(existingBot);
    }
  }, [editMode, existingBot]);

  // Update form data when existingBot changes
  useEffect(() => {
    if (editMode && existingBot) {
      setFormData({
        name: existingBot.name,
        media_type: existingBot.media_type,
        color: existingBot.color,
        font: existingBot.font,
        font_style: existingBot.font_style,
        font_size: existingBot.font_size,
        default_model: existingBot.default_model,
        prompt: existingBot.prompt,
        welcome_message: existingBot.welcome_message,
        calendly_enabled: existingBot.calendly_enabled,
        calendly_link: existingBot.calendly_link,
      });
    }
  }, [editMode, existingBot]);

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

      const data = await response.json();

      if (response.ok) {
        setCreatedBot(data.bot);
        setCurrentStep(2);
      } else {
        setError(data.error || 'Failed to create agent');
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

  const fetchUploadedFiles = async () => {
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
  };

  const handleDeleteFile = async (fileId: string) => {
    if (!createdBot) return;

    setIsLoading(true);
    clearError();

    try {
      const token = sessionStorage.getItem('access_token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bots/${createdBot.id}/files/${fileId}/`, {
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

  // Function to handle step navigation
  const handleStepNavigation = (step: number) => {
    if (editMode && existingBot) {
      // In edit mode, allow navigation to any step
      setCurrentStep(step);
    } else if (!editMode && step <= currentStep) {
      // In create mode, only allow navigation to completed steps
      setCurrentStep(step);
    }
  };

  // Step configuration with icons
  const steps = [
    { 
      number: 1, 
      title: 'Basic Info', 
      description: 'Agent name and setup',
      icon: User,
      completed: currentStep > 1 || (editMode && currentStep >= 1)
    },
    { 
      number: 2, 
      title: 'Upload Files', 
      description: 'Training documents',
      icon: FileCheck,
      completed: currentStep > 2 || (editMode && currentStep >= 2)
    },
    { 
      number: 3, 
      title: 'Training', 
      description: 'AI model training',
      icon: Brain,
      completed: currentStep > 3 || (editMode && currentStep >= 3)
    },
    { 
      number: 4, 
      title: 'Configuration', 
      description: 'Appearance & behavior',
      icon: Settings,
      completed: currentStep > 4 || (editMode && currentStep >= 4)
    },
    { 
      number: 5, 
      title: 'Complete', 
      description: 'Final confirmation',
      icon: CheckCircle,
      completed: currentStep === 5
    },
  ];

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          {editMode ? 'Basic Information' : 'Basic Information'}
        </h3>
        <p className="text-gray-600 mb-4">
          {editMode 
            ? 'View and update your AI agent&apos;s basic information.'
            : 'Start by giving your AI agent a name.'}
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
          disabled={editMode}
        />
        <p className="text-sm text-gray-500 mt-1">
          {editMode 
            ? 'Agent name cannot be changed after creation.'
            : 'Name must be at least 3 characters.'}
        </p>
      </div>

      {editMode && createdBot && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Bot className="w-4 h-4 text-blue-600" />
            <p className="text-blue-700 text-sm">
              <strong>Agent ID:</strong> {createdBot.id}
            </p>
          </div>

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

      <div className="flex justify-end">
        {!editMode ? (
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
        ) : (
          <button
            onClick={() => setCurrentStep(2)}
            className="bg-teal-600 text-white py-2 px-6 rounded-lg font-medium hover:bg-teal-700 transition-colors flex items-center space-x-2"
          >
            <span>Continue to Upload Files</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          {editMode ? 'Manage Training Files' : 'Upload Training Files'}
        </h3>
        <p className="text-gray-600 mb-4">
          {editMode 
            ? 'Upload additional files or manage existing training files for your agent.'
            : 'Upload PDF, DOCX, TXT, MD, or Excel files to train your agent.'}
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

      {/* Uploaded Files List with Delete Option */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900">
            {editMode ? 'Existing Training Files' : 'Uploaded Files'}:
          </h4>
          {uploadedFiles.map((file) => (
            <div key={file.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200 group hover:bg-green-100 transition-colors">
              <div className="flex items-center space-x-3 flex-1">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-medium text-gray-700 block truncate">{file.name}</span>
                  <p className="text-xs text-gray-500">
                    Uploaded {new Date(file.uploaded_at).toLocaleDateString()} • {file.type?.toUpperCase()} • {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-green-600 font-medium">Uploaded</span>
                <button
                  onClick={() => setFileToDelete(file)}
                  disabled={isLoading}
                  className="p-1 text-red-600 hover:bg-red-100 rounded transition-colors disabled:opacity-50 group-hover:opacity-100 opacity-70"
                  title="Delete file"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
          
          {/* File Statistics */}
          <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Total files: {uploadedFiles.length}</span>
              <span className="text-gray-600">
                Total size: {(uploadedFiles.reduce((total, file) => total + file.size, 0) / 1024 / 1024).toFixed(2)} MB
              </span>
            </div>
          </div>
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
          disabled={!editMode && uploadedFiles.length === 0}
          className="bg-teal-600 text-white py-2 px-6 rounded-lg font-medium hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
        >
          <span>
            {editMode ? 'Continue to Training' : `Continue to Training (${uploadedFiles.length} files)`}
          </span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          {editMode ? 'Retrain Your Agent' : 'Train Your Agent'}
        </h3>
        <p className="text-gray-600 mb-4">
          {editMode
            ? 'Retrain your agent with the updated files to incorporate new knowledge.'
            : 'Start the training process with your uploaded files to create your AI agent.'}
        </p>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-yellow-800">
              {editMode ? 'Retraining Available' : 'Training Required'}
            </h4>
            <p className="text-yellow-700 text-sm mt-1">
              {editMode
                ? 'Your agent can be retrained with the current files to update its knowledge base.'
                : 'Your agent needs to be trained with the uploaded files to provide accurate responses.'}
              {uploadedFiles.length > 0 && (
                <span> Training will process {uploadedFiles.length} file{uploadedFiles.length !== 1 ? 's' : ''}.</span>
              )}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        {uploadedFiles.length > 0 && (
          <p className="text-sm text-gray-600">
            <strong>Files to train:</strong> {uploadedFiles.length} file{uploadedFiles.length !== 1 ? 's' : ''}
          </p>
        )}
        <p className="text-sm text-gray-600 {uploadedFiles.length > 0 && 'mt-1'}">
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
          <span>{isLoading ? (editMode ? 'Retraining...' : 'Starting Training...') : (editMode ? 'Retrain Agent' : 'Start Training')}</span>
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
          className="bg-teal-600 text-white py-2 px-6 rounded-lg font-medium hover:bg-teal-700 transition-colors disabled:opacity-50 flex items-center space-x-2 ml-auto"
        >
          <Save className="w-4 h-4" />
          <span>{isLoading ? 'Saving Configuration...' : (editMode ? 'Update Configuration' : 'Save Configuration')}</span>
        </button>
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="text-center py-8">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <CheckCircle className="w-8 h-8 text-green-600" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        {editMode ? 'Agent Updated Successfully!' : 'Agent Created Successfully!'}
      </h3>
      <p className="text-gray-600 mb-2">
        Your AI agent &quot;{createdBot?.name}&quot; is {editMode ? 'updated' : 'ready to use'}.
      </p>

      <div className="space-x-4">
        <button
          onClick={() => window.location.href = '/dashboard?tab=bot-list'}
          className="bg-teal-600 text-white py-2 px-6 rounded-lg font-medium hover:bg-teal-700 transition-colors"
        >
          View All Agents
        </button>
        {!editMode && (
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
        )}
      </div>
    </div>
  );

  // Sidebar Component for Edit Mode
  const Sidebar = () => (
    <div className="w-80 bg-white border-r border-gray-200 h-full">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-teal-100 rounded-lg">
            <Bot className="w-5 h-5 text-teal-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Edit Agent</h2>
            <p className="text-gray-600 text-sm">{existingBot?.name}</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-2">
        {steps.map((step) => {
          const IconComponent = step.icon;
          return (
            <button
              key={step.number}
              onClick={() => handleStepNavigation(step.number)}
              className={`w-full flex items-center space-x-4 p-4 rounded-lg transition-all ${
                currentStep === step.number
                  ? 'bg-teal-50 border border-teal-200 text-teal-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <div className={`flex-shrink-0 w-10 h-10 rounded-full border-2 flex items-center justify-center ${
                currentStep === step.number
                  ? 'bg-teal-600 border-teal-600 text-white'
                  : step.completed
                  ? 'bg-green-100 border-green-200 text-green-600'
                  : 'border-gray-300 bg-white'
              }`}>
                {step.completed && currentStep !== step.number ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <IconComponent className="w-5 h-5" />
                )}
              </div>
              <div className="flex-1 text-left">
                <div className="font-medium">{step.title}</div>
                <div className="text-sm opacity-75">{step.description}</div>
              </div>
              {currentStep === step.number && (
                <div className="w-2 h-2 bg-teal-600 rounded-full"></div>
              )}
            </button>
          );
        })}
      </div>

      {/* Bot Info Card */}
      {createdBot && (
        <div className="p-6 border-t border-gray-200">
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">Agent Information</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-blue-700">Status:</span>
                <span className="text-blue-900 font-medium">
                  {createdBot.training_status || 'Ready'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-700">Model:</span>
                <span className="text-blue-900 font-medium">{formData.default_model}</span>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {editMode ? (
        // Edit Mode Layout with Sidebar
        <div className="flex h-screen">
          {/* Sidebar */}
          <Sidebar />
          
          {/* Main Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {steps.find(s => s.number === currentStep)?.title}
                  </h1>
                  <p className="text-gray-600">
                    {steps.find(s => s.number === currentStep)?.description}
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    currentStep === 5 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {currentStep === 5 ? 'Complete' : `Step ${currentStep} of 5`}
                  </span>
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-auto">
              <div className="max-w-4xl mx-auto p-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                  <div className="p-6">
                    {currentStep === 1 && renderStep1()}
                    {currentStep === 2 && renderStep2()}
                    {currentStep === 3 && renderStep3()}
                    {currentStep === 4 && renderStep4()}
                    {currentStep === 5 && renderStep5()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Create Mode Layout (Original)
        <div className="max-w-4xl mx-auto py-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-teal-100 rounded-lg">
                  <Bot className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Create New AI Agent
                  </h2>
                  <p className="text-gray-600 text-sm">
                    Step-by-step agent creation process
                  </p>
                </div>
              </div>
            </div>

            {/* Progress Steps */}
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <div className="flex items-center justify-between">
                {steps.map((step, index) => (
                  <div key={step.number} className="flex items-center">
                    <button
                      onClick={() => handleStepNavigation(step.number)}
                      disabled={step.number > currentStep}
                      className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                        currentStep >= step.number
                          ? 'bg-teal-600 border-teal-600 text-white'
                          : 'border-gray-300 text-gray-500'
                      } ${step.number <= currentStep ? 'cursor-pointer hover:bg-teal-500' : 'cursor-not-allowed'}`}
                    >
                      {step.number}
                    </button>
                    <button
                      onClick={() => handleStepNavigation(step.number)}
                      disabled={step.number > currentStep}
                      className={`ml-2 text-sm font-medium ${
                        currentStep >= step.number 
                          ? 'text-teal-600' 
                          : 'text-gray-500'
                      } ${step.number <= currentStep ? 'cursor-pointer hover:text-teal-700' : 'cursor-not-allowed'}`}
                    >
                      {step.title}
                    </button>
                    {index < steps.length - 1 && (
                      <div className={`w-12 h-0.5 mx-4 ${
                        currentStep > step.number
                          ? 'bg-teal-600'
                          : 'bg-gray-300'
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
      )}

      {/* File Deletion Confirmation Modal */}
      {fileToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Delete File</h3>
              <button
                onClick={() => setFileToDelete(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <p className="text-gray-600 mb-4">
              Are you sure you want to delete <strong>{fileToDelete.name}</strong>? 
              This action cannot be undone.
            </p>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setFileToDelete(null)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteFile(fileToDelete.id)}
                disabled={isLoading}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center space-x-2"
              >
                {isLoading ? (
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