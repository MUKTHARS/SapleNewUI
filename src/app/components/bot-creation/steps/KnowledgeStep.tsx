// components/bot-creation/steps/KnowledgeStep.tsx
import { useState } from 'react';
import { Sparkles, Upload, FileText, Check, X, Loader2, Plus, Database } from 'lucide-react';

interface KnowledgeStepProps {
  formData: Record<string, unknown>;
  selectedFiles: File[];
  setSelectedFiles: (files: File[]) => void;
  uploadedFiles: Record<string, unknown>[];
  setUploadedFiles: (files: Record<string, unknown>[]) => void;
  bucketName: string;
  error: string;
  isLoading: boolean;
  onBack: () => void;
  onNext: () => void;
  onUploadFiles: () => void;
  editMode?: boolean;
}

export function KnowledgeStep({
  formData,
  selectedFiles,
  setSelectedFiles,
  uploadedFiles,
  bucketName,
  error,
  isLoading,
  onBack,
  onNext,
  onUploadFiles,
  editMode = false
}: KnowledgeStepProps) {
  const [dragOver, setDragOver] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const allowedExtensions = ['.pdf', '.docx', '.txt', '.md', '.xlsx', '.xls', '.csv'];
      
      const validFiles = files.filter(file => {
        const extension = '.' + file.name.split('.').pop()?.toLowerCase();
        return allowedExtensions.includes(extension || '');
      });

      if (validFiles.length !== files.length) {
        // Show warning for invalid files
        console.warn('Some files were skipped due to unsupported formats');
      }

      setSelectedFiles([...selectedFiles, ...validFiles]);
    }
  };

  const handleRemoveSelectedFile = (index: number) => {
    const newFiles = [...selectedFiles];
    newFiles.splice(index, 1);
    setSelectedFiles(newFiles);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    if (e.dataTransfer.files) {
      const files = Array.from(e.dataTransfer.files);
      const allowedExtensions = ['.pdf', '.docx', '.txt', '.md', '.xlsx', '.xls', '.csv'];
      
      const validFiles = files.filter(file => {
        const extension = '.' + file.name.split('.').pop()?.toLowerCase();
        return allowedExtensions.includes(extension || '');
      });

      setSelectedFiles([...selectedFiles, ...validFiles]);
    }
  };

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
        <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Sparkles className="w-10 h-10 text-purple-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Teach Your Agent</h2>
        <p className="text-gray-600 mt-2 text-lg">Upload documents to train your AI agent with knowledge</p>
        
        {/* Media Type Indicator */}
        <div className="mt-4 inline-flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-full border border-blue-200">
          <span className="text-blue-700 font-medium">
            {formData.media_type === 'text' && '📝 Text Agent'}
            {formData.media_type === 'audio' && '🎤 Voice Agent'}
            {formData.media_type === 'both' && '💬 Text & Voice Agent'}
          </span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* File Upload Area */}
        <div 
          className={`border-3 border-dashed rounded-2xl p-12 text-center transition-all ${
            dragOver 
              ? 'border-purple-400 bg-purple-50 shadow-inner' 
              : 'border-gray-300 bg-gray-50/50 hover:border-purple-300 hover:bg-purple-50/30'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <Upload className="w-16 h-16 text-gray-400 mx-auto mb-6" />
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Add Training Documents</h3>
          <p className="text-gray-600 mb-8 text-lg max-w-2xl mx-auto">
            Drag and drop your files here, or click to browse. Your agent will learn from these documents to provide accurate responses.
          </p>
          
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
            className="cursor-pointer bg-gradient-to-r from-purple-600 to-blue-600 text-white px-10 py-4 rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 inline-flex items-center space-x-3 text-lg shadow-lg hover:shadow-xl"
          >
            <Plus className="w-6 h-6" />
            <span>Choose Files</span>
          </label>
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6 text-sm text-gray-500 max-w-3xl mx-auto">
            <div className="flex flex-col items-center space-y-2 p-3 bg-white rounded-lg border border-gray-200">
              <FileText className="w-8 h-8 text-blue-500" />
              <span>PDF Files</span>
            </div>
            <div className="flex flex-col items-center space-y-2 p-3 bg-white rounded-lg border border-gray-200">
              <FileText className="w-8 h-8 text-green-500" />
              <span>Word Docs</span>
            </div>
            <div className="flex flex-col items-center space-y-2 p-3 bg-white rounded-lg border border-gray-200">
              <FileText className="w-8 h-8 text-orange-500" />
              <span>Text Files</span>
            </div>
            <div className="flex flex-col items-center space-y-2 p-3 bg-white rounded-lg border border-gray-200">
              <FileText className="w-8 h-8 text-purple-500" />
              <span>Excel & CSV</span>
            </div>
          </div>
        </div>

        {/* Selected Files Preview */}
        {selectedFiles.length > 0 && (
          <div className="mt-8 bg-white rounded-xl border border-gray-200 p-6">
            <h4 className="font-bold text-gray-900 mb-4 text-lg flex items-center space-x-3">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
              <span>Ready to Upload ({selectedFiles.length} files)</span>
            </h4>
            <div className="space-y-3">
              {selectedFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center space-x-4">
                    <FileText className="w-6 h-6 text-blue-600" />
                    <div>
                      <span className="font-semibold text-gray-700">{file.name}</span>
                      <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-blue-600 font-semibold bg-blue-100 px-2 py-1 rounded">Ready</span>
                    <button
                      onClick={() => handleRemoveSelectedFile(index)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Remove file"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={onUploadFiles}
              disabled={isLoading}
              className="w-full mt-6 bg-gradient-to-r from-blue-600 to-green-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-green-700 transition-all duration-300 disabled:opacity-50 flex items-center justify-center space-x-3 text-lg shadow-lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  <span>Uploading Files to Cloud...</span>
                </>
              ) : (
                <>
                  <Upload className="w-6 h-6" />
                  <span>Upload {selectedFiles.length} File{selectedFiles.length !== 1 ? 's' : ''}</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Uploaded Files */}
        {uploadedFiles.length > 0 && (
          <div className="mt-8 bg-white rounded-xl border border-gray-200 p-6">
            <h4 className="font-bold text-gray-900 mb-4 text-lg flex items-center space-x-3">
              <Check className="w-6 h-6 text-green-500" />
              <span>Uploaded Knowledge Base ({uploadedFiles.length} files)</span>
            </h4>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {uploadedFiles.map((file) => (
                <div key={file.id as string} className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center space-x-4">
                    <Check className="w-6 h-6 text-green-600" />
                    <div>
                      <span className="font-semibold text-gray-700">{file.name as string}</span>
                      <p className="text-sm text-gray-500">
                        {formatFileSize(file.size as number)} • {(file.type as string)?.toUpperCase()} • 
                        Uploaded {new Date(file.uploaded_at as string).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm text-green-600 font-semibold bg-green-100 px-3 py-1 rounded-full">Uploaded</span>
                </div>
              ))}
            </div>
            
            {/* Storage Summary */}
            <div className="mt-6 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Database className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-semibold text-gray-900">Knowledge Base Summary</p>
                    <p className="text-sm text-gray-600">
                      {uploadedFiles.length} documents • {formatFileSize(getTotalFileSize())} total
                    </p>
                  </div>
                </div>
                {bucketName && (
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Storage</p>
                    <p className="text-sm font-mono text-gray-700 bg-white px-2 py-1 rounded border">{bucketName}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Progress Indicator */}
        <div className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                <Check className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="font-bold text-green-800 text-xl">Ready to Continue</p>
                <p className="text-green-700 text-lg">
                  {uploadedFiles.length > 0 
                    ? `You've added ${uploadedFiles.length} training document${uploadedFiles.length !== 1 ? 's' : ''} to your knowledge base`
                    : 'Add at least one document to teach your agent'
                  }
                </p>
                {uploadedFiles.length > 0 && (
                  <p className="text-green-600 text-sm mt-2">
                    Your agent will be trained on this knowledge to provide accurate responses
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="mt-6 bg-red-50 border border-red-200 rounded-xl p-6">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-lg">⚠️</span>
              </div>
              <div>
                <p className="text-red-800 font-semibold text-lg">Upload Error</p>
                <p className="text-red-700 mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between pt-8 border-t border-gray-200">
          <button
            onClick={onBack}
            className="px-10 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 text-lg flex items-center space-x-3"
          >
            <span>← Back</span>
          </button>
          <button
            onClick={onNext}
            disabled={uploadedFiles.length === 0 && !editMode}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 text-lg shadow-lg hover:shadow-xl"
          >
            Customize Agent →
          </button>
        </div>
      </div>
    </div>
  );
}