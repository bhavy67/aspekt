'use client';

import { ThemeProvider } from 'next-themes';
import { NavProgress } from '@/components/nav-progress';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <NavProgress />
      {children}
    </ThemeProvider>
  );
}
