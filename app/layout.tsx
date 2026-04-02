import type { Metadata } from 'next';
import { Manrope, Space_Grotesk } from 'next/font/google';
import './globals.css';
import AuthProvider from './components/SessionProvider';
import Header from './components/Header';

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'NewsHub',
  description: 'Мультиязычная платформа для публикации статей и историй.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${manrope.variable} ${spaceGrotesk.variable}`}>
      <body>
        <AuthProvider>
          <div className="site-shell">
            <Header />
            <main className="mx-auto w-full max-w-7xl flex-1 px-4 pb-16 pt-6 sm:px-6 lg:px-8">
              {children}
            </main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
