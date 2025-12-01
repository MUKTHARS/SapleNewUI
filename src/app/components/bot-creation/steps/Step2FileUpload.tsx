// components/bot-creation/steps/Step2FileUpload.tsx - UPDATED
import { ArrowLeft, ArrowRight, Upload, FileText, CheckCircle, Loader2, Trash2, Plus } from 'lucide-react';
import { StepProps } from '../types/bot-types';
import { ErrorAlert } from '../shared/ErrorAlert';
import { useState } from 'react';

export function Step2FileUpload({
  selectedFiles,
  setSelectedFiles,
  uploadedFiles,
  setUploadedFiles,
  error,
  setError,
  isLoading,
  onPreviousStep,
  onNextStep,
  onUploadFiles,
  editMode = false,
  createdBot
}: StepProps & { onUploadFiles: () => void, setUploadedFiles: (files: Record<string, unknown>[]) => void }) {

  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);

      const allowedExtensions = ['.pdf', '.docx', '.txt', '.md', '.xlsx', '.xls', '.csv'];
      const validFiles = files.filter(file => {
        const extension = '.' + file.name.split('.').pop()?.toLowerCase();
        return allowedExtensions.includes(extension || '');
      });

      if (validFiles.length !== files.length) {
        setError('Some files were skipped. Only PDF, DOCX, TXT, MD, Excel, and CSV files are allowed.');
      }

      setSelectedFiles([...selectedFiles, ...validFiles]);
    }
  };

  const handleRemoveSelectedFile = (index: number) => {
    const newFiles = [...selectedFiles];
    newFiles.splice(index, 1);
    setSelectedFiles(newFiles);
  };

  const handleDeleteUploadedFile = async (fileId: string, fileName: string) => {
    if (!confirm(`Are you sure you want to delete "${fileName}"?`)) return;

    setDeleteLoading(fileId);
    setError('');

    try {
      const token = sessionStorage.getItem('access_token');
      const botId = createdBot?.id;

      if (!botId) {
        throw new Error('Agent ID not found');
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/bots/${botId}/files/${fileId}/`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.ok) {
        // Remove from local state
        setUploadedFiles(uploadedFiles.filter(file => (file.id as string) !== fileId));
      } else {
        const data = await response.json();
        throw new Error(data.error || 'Failed to delete file');
      }
    } catch (error) {
      console.error('File delete error:', error);
      setError(`Failed to delete file: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setDeleteLoading(null);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          {editMode ? 'Manage Training Files' : 'Upload Training Files'}
        </h3>
        <p className="text-gray-600 mb-4">
          {editMode
            ? 'Add new files or remove existing ones from your agent training data.'
            : 'Upload PDF, DOCX, TXT, MD, or Excel files to train your agent.'
          }
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
          <Plus className="w-4 h-4 inline mr-2" />
          Choose Files
        </label>
        <p className="text-gray-500 text-sm">
          {selectedFiles.length > 0
            ? `${selectedFiles.length} new files selected`
            : 'Drag & drop files or click to browse'
          }
        </p>
        <p className="text-xs text-gray-400 mt-2">
          Supported formats: PDF, DOCX, TXT, MD, Excel, CSV (Max 50MB per file)
        </p>
      </div>

      {/* Selected Files (New files to upload) */}
      {selectedFiles.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900">Files Ready for Upload:</h4>
          {selectedFiles.map((file, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center space-x-3">
                <FileText className="w-4 h-4 text-blue-600" />
                <div>
                  <span className="text-sm font-medium text-gray-700">{file.name}</span>
                  <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-blue-600 font-medium">Ready</span>
                <button
                  onClick={() => handleRemoveSelectedFile(index)}
                  className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                  title="Remove file"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}

          <button
            onClick={onUploadFiles}
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
            {editMode ? 'Current Training Files' : 'Uploaded Files'} ({uploadedFiles.length})
          </h4>
          {uploadedFiles.map((file) => (
            <div key={file.id as string} className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <div>
                  <span className="text-sm font-medium text-gray-700">{file.name as string}</span>
                  <p className="text-xs text-gray-500">
                    Uploaded {new Date(file.uploaded_at as string).toLocaleDateString()} • {(file.type as string)?.toUpperCase()} • {formatFileSize(file.size as number)}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-green-600 font-medium">Uploaded</span>
                <button
                  onClick={() => handleDeleteUploadedFile(file.id as string, file.name as string)}
                  disabled={deleteLoading === (file.id as string)}
                  className="p-1 text-gray-400 hover:text-red-600 transition-colors disabled:opacity-50"
                  title="Delete file"
                >
                  {deleteLoading === (file.id as string) ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  ) : (
                    <Trash2 className="w-3 h-3" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No Files Message */}
      {uploadedFiles.length === 0 && selectedFiles.length === 0 && (
        <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h4 className="font-medium text-gray-900 mb-2">No Files Yet</h4>
          <p className="text-gray-600 text-sm">
            {editMode
              ? 'Upload training files to help your agent learn.'
              : 'Start by uploading some training files for your agent.'
            }
          </p>
        </div>
      )}

      <ErrorAlert error={error} />

      <div className="flex justify-between pt-4 border-t border-gray-200">
        <button
          onClick={onPreviousStep}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <button
          onClick={onNextStep}
          disabled={uploadedFiles.length === 0 && !editMode}
          className="bg-teal-600 text-white py-2 px-6 rounded-lg font-medium hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
        >
          <span>
            {editMode ? 'Continue to Configuration' : `Continue to Training (${uploadedFiles.length} files)`}
          </span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}