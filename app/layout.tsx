
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL || 'http://localhost:3000'),
  title: 'TattooTalks.com - Tattoo Community & Discussion Platform',
  description: 'Join the tattoo community! Connect with artists, studios, and enthusiasts. Share your passion, inspirations, experiences, and discover the art of tattooing.',
  keywords: ['tattoo', 'tattoo community', 'tattoo art', 'tattoo artists', 'tattoo studios', 'tattoo enthusiasts', 'tattoo inspiration', 'tattoo discussion', 'tattoo lovers', 'tattoo passion'],
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    title: 'TattooTalks.com - Tattoo Community & Discussion Platform',
    description: 'Join the tattoo community! Connect with artists, studios, and enthusiasts. Share your passion, inspirations, and discover the art of tattooing.',
    url: '/',
    siteName: 'TattooTalks.com',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'TattooTalks - The Global Tattoo Community',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TattooTalks.com - Tattoo Community & Discussion Platform',
    description: 'Join the tattoo community! Connect with artists, studios, and enthusiasts. Share your passion and discover the art of tattooing.',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="dark" suppressHydrationWarning>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
