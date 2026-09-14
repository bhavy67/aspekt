'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Logo } from '@/components/logo';
import { createSupabaseBrowserClient } from '@/lib/supabase-browser';

const supabase = createSupabaseBrowserClient();

export default function SignInPage() {
  const searchParams = useSearchParams();
  const next = searchParams.get('next') ?? '/account';
  const hasError = searchParams.get('error') === 'auth_failed';
  const [loading, setLoading] = useState<'google' | 'apple' | null>(null);

  async function signInWith(provider: 'google' | 'apple') {
    setLoading(provider);
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
      },
    });
    if (error) setLoading(null);
  }

  return (
    <main className="flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm">
        {/* Brand */}
        <div className="mb-8 flex flex-col items-center gap-3">
          <Logo />
          <h1 className="text-xl font-700 text-foreground">Sign in to ASPEKT</h1>
          <p className="text-center text-sm text-muted">
            Save favourites, track your downloads, and build personal collections.
          </p>
        </div>

        {hasError && (
          <p className="mb-6 rounded-xl bg-red-500/10 px-4 py-3 text-center text-sm text-red-400">
            Sign in failed. Please try again.
          </p>
        )}

        {/* Providers */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => signInWith('google')}
            disabled={loading !== null}
            className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-border-strong bg-surface text-sm font-600 text-foreground transition-opacity duration-150 hover:opacity-80 disabled:opacity-50"
          >
            <GoogleIcon />
            {loading === 'google' ? 'Redirecting…' : 'Continue with Google'}
          </button>

          <button
            onClick={() => signInWith('apple')}
            disabled={loading !== null}
            className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-border-strong bg-surface text-sm font-600 text-foreground transition-opacity duration-150 hover:opacity-80 disabled:opacity-50"
          >
            <AppleIcon />
            {loading === 'apple' ? 'Redirecting…' : 'Continue with Apple'}
          </button>
        </div>

        <p className="mt-8 text-center text-xs text-subtle">
          By continuing you agree to our{' '}
          <Link
            href="/terms"
            className="text-muted underline underline-offset-2 hover:text-foreground"
          >
            Terms
          </Link>{' '}
          and{' '}
          <Link
            href="/privacy"
            className="text-muted underline underline-offset-2 hover:text-foreground"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </main>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path
        d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
        fill="#4285F4"
      />
      <path
        d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"
        fill="#34A853"
      />
      <path
        d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
        fill="#FBBC05"
      />
      <path
        d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"
        fill="#EA4335"
      />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 814 1000" fill="currentColor">
      <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 405.4 0 328.6 0 257.1c0-130.9 85.5-200.1 169.8-200.1 46.4 0 85.5 29.8 116.8 29.8 31.3 0 71.4-31.7 127.4-31.7 52.4 0 153.1 8.5 221.7 95.7zm-131.8-29.5c-15.3-17.9-28.7-42.4-28.7-69.2 0-3.2.3-6.5.6-9.8 27.2 1 60.6 18.2 82.2 48.9 17.9 24.5 31.3 53.5 31.3 84.9 0 3.5-.3 6.9-.6 10.1-3.2.3-6.5.6-9.8.6-28.8 0-60.6-17-75-65.5z" />
    </svg>
  );
}
