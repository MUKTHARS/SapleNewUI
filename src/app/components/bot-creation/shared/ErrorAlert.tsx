// components/bot-creation/shared/ErrorAlert.tsx
import { AlertCircle } from 'lucide-react';

interface ErrorAlertProps {
  error: string;
}

export function ErrorAlert({ error }: ErrorAlertProps) {
  if (!error) return null;

  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
      <div className="flex items-center space-x-2">
        <AlertCircle className="w-4 h-4 text-red-600" />
        <p className="text-red-700 text-sm">{error}</p>
      </div>
    </div>
  );
}