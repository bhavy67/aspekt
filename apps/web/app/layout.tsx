import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { Nav } from '@/components/nav';
import { OfflineBanner } from '@/components/offline-banner';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
});

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F8F8FC' },
    { media: '(prefers-color-scheme: dark)', color: '#0B0B0E' },
  ],
};

export const metadata: Metadata = {
  title: {
    default: 'ASPEKT',
    template: '%s — ASPEKT',
  },
  description: 'A beautifully curated wallpaper platform that understands your screen.',
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    siteName: 'ASPEKT',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Nav />
        <div className="pt-14">{children}</div>
        <OfflineBanner />
      </body>
    </html>
  );
}
