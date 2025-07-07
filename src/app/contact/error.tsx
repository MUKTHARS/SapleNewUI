// src/app/contact/error.tsx
'use client';

export default function ContactError({ error, reset }: { error: Error; reset: () => void }) {
  console.error('Contact page error:', error);

  return (
    <div className="text-center p-10 text-red-600">
      <h1 className="text-2xl font-bold">Oops, something went wrong.</h1>
      <p className="my-4">{error.message}</p>
      <button
        className="px-4 py-2 mt-4 bg-color text-white rounded"
        onClick={reset}
      >
        Try Again
      </button>
    </div>
  );
}
