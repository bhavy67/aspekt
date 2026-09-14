'use client';

import { useEffect } from 'react';

export default function GlobalError({
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
    <html lang="en">
      <body>
        <main
          style={{
            display: 'flex',
            minHeight: '100vh',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0B0B0E',
            padding: '0 24px',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <p
              style={{
                marginBottom: 8,
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: 2,
                textTransform: 'uppercase',
                color: '#818CF8',
              }}
            >
              Critical Error
            </p>
            <h1 style={{ marginBottom: 12, fontSize: 24, fontWeight: 700, color: '#EDEDF2' }}>
              Application Error
            </h1>
            <p style={{ marginBottom: 32, fontSize: 14, color: '#8686A0' }}>
              Something went critically wrong. Please refresh the page.
            </p>
            <button
              onClick={reset}
              style={{
                borderRadius: 999,
                background: 'linear-gradient(135deg, #818CF8, #22D3EE)',
                padding: '10px 24px',
                fontSize: 14,
                fontWeight: 600,
                color: '#0B0B0E',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Refresh
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
