// components/bot-creation/shared/LoadingSpinner.tsx
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: number;
  className?: string;
}

export function LoadingSpinner({ size = 4, className = "" }: LoadingSpinnerProps) {
  return <Loader2 className={`w-${size} h-${size} animate-spin ${className}`} />;
}