'use client';

import { useRouter } from 'next/navigation';
import { useRef } from 'react';

export function SearchInput({ defaultValue }: { defaultValue: string }) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = inputRef.current?.value.trim();
    if (q) {
      router.push(`/search?q=${encodeURIComponent(q)}`);
    } else {
      router.push('/search');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 max-w-xl">
      <input
        ref={inputRef}
        type="search"
        defaultValue={defaultValue}
        placeholder="Search wallpapers, moods, tags…"
        autoFocus
        className="flex-1 rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent"
      />
      <button
        type="submit"
        className="rounded-xl bg-accent-gradient px-5 py-3 text-sm font-semibold text-[#0B0B0E] transition-opacity hover:opacity-90"
      >
        Search
      </button>
    </form>
  );
}
