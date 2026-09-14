'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import { Logo } from './logo';
import { createSupabaseBrowserClient } from '@/lib/supabase-browser';

const NAV_LINKS = [
  { href: '/browse', label: 'Browse' },
  { href: '/explore', label: 'Explore' },
  { href: '/collections', label: 'Collections' },
] as const;

const supabase = createSupabaseBrowserClient();

export function Nav() {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8);
    handler();
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      router.refresh();
    });
    return () => subscription.unsubscribe();
  }, [router]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 h-14 transition-all duration-200 ${
        scrolled ? 'bg-glass border-b border-border' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-6">
        <Link href="/" aria-label="ASPEKT home">
          <Logo />
        </Link>

        <nav className="hidden md:flex items-center gap-0.5" aria-label="Primary navigation">
          {NAV_LINKS.map(({ href, label }) => {
            const active = pathname === href || pathname.startsWith(`${href}/`);
            return (
              <Link
                key={href}
                href={href}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors duration-150 ${
                  active ? 'bg-raised text-foreground' : 'text-muted hover:text-foreground'
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/search"
            className="hidden sm:flex h-7 items-center rounded-md border border-border-strong bg-raised px-3 text-[11px] font-semibold uppercase tracking-widest text-muted transition-colors duration-150 hover:text-foreground"
          >
            Search
          </Link>

          {user ? (
            <Link
              href="/account"
              className="flex h-7 items-center rounded-md border border-border-strong bg-raised px-3 text-[11px] font-semibold uppercase tracking-widest text-muted transition-colors duration-150 hover:text-foreground"
            >
              Account
            </Link>
          ) : (
            <Link
              href="/auth/sign-in"
              className="flex h-7 items-center rounded-md border border-border-strong bg-raised px-3 text-[11px] font-semibold uppercase tracking-widest text-muted transition-colors duration-150 hover:text-foreground"
            >
              Sign In
            </Link>
          )}

          <Link
            href="/download"
            className="flex h-7 items-center rounded-md bg-accent-gradient px-3 text-[11px] font-semibold uppercase tracking-widest transition-opacity duration-150 hover:opacity-90"
            style={{ color: '#0B0B0E' }}
          >
            Get the App
          </Link>
        </div>
      </div>
    </header>
  );
}
