import type { Metadata, Viewport } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import { AppProviders } from '@/providers/AppProviders';
import { appConfig } from '@/config/app';
import '@/styles/globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(appConfig.url),
  title: {
    default: 'EasyMelo Studio — Créez votre chanson par IA',
    template: '%s · EasyMelo Studio',
  },
  description:
    "EasyMelo Studio transforme votre idée en chanson unique grâce à l'intelligence artificielle. Mariage, anniversaire, entreprise : décrivez, écoutez, téléchargez.",
  keywords: [
    'générateur de chanson IA',
    'musique intelligence artificielle',
    'chanson personnalisée',
    'EasyMelo Studio',
  ],
  authors: [{ name: 'EasyMelo Studio' }],
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: appConfig.url,
    siteName: 'EasyMelo Studio',
    title: 'EasyMelo Studio — Créez votre chanson par IA',
    description:
      "Transformez votre idée en chanson unique grâce à l'intelligence artificielle.",
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'EasyMelo Studio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EasyMelo Studio — Créez votre chanson par IA',
    description:
      "Transformez votre idée en chanson unique grâce à l'intelligence artificielle.",
    images: ['/og-image.png'],
  },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    shortcut: '/favicon.svg',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.webmanifest',
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: '#0A0E1A',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans antialiased">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
