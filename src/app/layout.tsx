import type { Metadata } from 'next';
import { Inter, Noto_Sans_Arabic } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { Toaster } from 'react-hot-toast';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Marck_Script ,Manrope } from "next/font/google";

const marckScript = Marck_Script({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-marck-script",
});

const inter = Inter({ subsets: ['latin'] });
const notoSansArabic = Noto_Sans_Arabic({ 
  subsets: ['arabic'],
  variable: '--font-noto-sans-arabic'
});

const manrope = Manrope({
  weight: ["400", "500", "600", "700"], // choose weights you’ll use
  subsets: ["latin"],
  variable: "--font-manrope",
});
export const metadata: Metadata = {
  title: 'Haya - Your Digital Platform',
  description: 'A comprehensive digital platform built with Next.js',
  keywords: ['haya', 'digital', 'platform', 'nextjs', 'react'],
  authors: [{ name: 'Haya Team' }],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
  // modal
}: {
  children: React.ReactNode;
  // modal: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr" >
      <body className={`${inter.className} ${notoSansArabic.variable} ${marckScript.variable}  ${manrope.variable}`}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
              {/* Render modal above everything */}
          {/* {modal} */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: '#4ade80',
                  secondary: '#fff',
                },
              },
              error: {
                duration: 5000,
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}