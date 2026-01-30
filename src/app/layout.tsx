import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import CursorTrail from '@/components/effects/CursorTrail';

export const metadata: Metadata = {
  title: 'BunnyKitty | Character-Driven Art & Apparel',
  description: 'Character-driven art for the bold and playful. Born in the city, loved everywhere. Shop original art, apparel, and accessories.',
  keywords: ['BunnyKitty', 'art', 'apparel', 'streetwear', 'pop art', 'character art'],
  authors: [{ name: 'BunnyKitty' }],
  openGraph: {
    title: 'BunnyKitty | Character-Driven Art & Apparel',
    description: 'Character-driven art for the bold and playful. Born in the city, loved everywhere.',
    url: 'https://bunnykitty.com',
    siteName: 'BunnyKitty',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BunnyKitty | Character-Driven Art & Apparel',
    description: 'Character-driven art for the bold and playful. Born in the city, loved everywhere.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-body antialiased">
        <CursorTrail />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
