import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SessionProvider } from '@/providers/SessionProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Open Source Myth War (OSMW) - Legendary MMORPG Adventure',
  description: 'Enter the mystical world of Open Source Myth War. Choose your race, master ancient skills, and embark on epic quests in this classic turn-based MMORPG.',
  keywords: 'OSMW, Open Source Myth War, MMORPG, fantasy, game, online, adventure, RPG',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any', type: 'image/x-icon' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen relative overflow-x-hidden">
          {/* Background with blur */}
          <div 
            className="fixed inset-0 min-h-screen"
            style={{
              backgroundImage: 'url(/bg-main.webp)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundAttachment: 'fixed',
              filter: 'blur(2px)'
            }}
          ></div>
          {/* Enhanced overlay with natural mystical gradients */}
          <div className="relative min-h-screen bg-gradient-to-br from-slate-900/45 via-slate-800/25 to-slate-900/55 overflow-x-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-teal-900/15 via-transparent to-slate-900/25 pointer-events-none"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-500/8 via-teal-400/3 to-transparent pointer-events-none"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-emerald-900/10 pointer-events-none"></div>
            <SessionProvider>
              <Navbar />
              <main>
                {children}
              </main>
              <Footer />
            </SessionProvider>
          </div>
        </div>
      </body>
    </html>
  );
}
