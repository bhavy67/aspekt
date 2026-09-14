'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const SunIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
  </svg>
);

const MoonIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

const SystemIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <path d="M8 21h8M12 17v4" />
  </svg>
);

const THEMES = ['system', 'light', 'dark'] as const;
type Theme = (typeof THEMES)[number];

const ICONS: Record<Theme, React.ReactNode> = {
  system: <SystemIcon />,
  light: <SunIcon />,
  dark: <MoonIcon />,
};

const LABELS: Record<Theme, string> = {
  system: 'System',
  light: 'Light',
  dark: 'Dark',
};

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="h-7 w-7 rounded-lg border border-border bg-raised animate-pulse" />;
  }

  const current = (theme as Theme) ?? 'system';

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex h-7 w-7 items-center justify-center rounded-lg border border-border bg-raised text-muted transition-colors hover:border-border-strong hover:text-foreground"
        aria-label={`Theme: ${LABELS[current]}`}
        title={`Theme: ${LABELS[current]}`}
      >
        {ICONS[current]}
      </button>

      {open && (
        <>
          {/* backdrop to close */}
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />

          <div className="absolute right-0 top-9 z-50 flex flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-dropdown min-w-[110px]">
            {THEMES.map((t) => (
              <button
                key={t}
                onClick={() => {
                  setTheme(t);
                  setOpen(false);
                }}
                className={`flex items-center gap-2.5 px-3 py-2.5 text-left text-xs font-medium transition-colors hover:bg-raised ${
                  current === t ? 'text-foreground' : 'text-muted'
                }`}
              >
                <span className={current === t ? 'text-accent' : ''}>{ICONS[t]}</span>
                {LABELS[t]}
                {current === t && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-accent" />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
