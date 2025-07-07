// src/app/error.tsx
'use client';

import { useEffect } from 'react';

type Props = {
  error: Error;
  reset: () => void;
};

export default function GlobalError({ error, reset }: Props) {
  useEffect(() => {
    console.error('Unhandled error on the homepage:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-center p-10">
      <div className="max-w-md">
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          Something went wrong.
        </h1>
        <p className="text-gray-700 mb-6">
          {error.message || 'An unexpected error occurred. Please try again.'}
        </p>
        <button
          onClick={reset}
          className="bg-color text-white px-4 py-2 rounded hover:bg-color transition"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
