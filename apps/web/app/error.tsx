'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="text-center">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-accent">Error</p>
        <h1 className="mb-3 text-2xl font-bold text-foreground">Something went wrong</h1>
        <p className="mb-8 text-sm text-muted">
          {error.message || 'An unexpected error occurred. Please try again.'}
        </p>
        <button
          onClick={reset}
          className="rounded-full bg-accent-gradient px-6 py-2.5 text-sm font-semibold text-[#0B0B0E] transition-opacity hover:opacity-90"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
