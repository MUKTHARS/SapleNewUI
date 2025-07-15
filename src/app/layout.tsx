// app/layout.tsx
import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';
import './globals.css';
import { CyberNavbar } from './components/CyberNavbar';
import { HolographicFooter } from './components/HolographicFooter';
// import CosmicPortal from './components/CosmicPortal';
import { ErrorBoundary } from './components/ErrorBoundary';
import Script from 'next/script';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SAPLE.AI | ENTERPRISE AI SOLUTIONS',
  description: 'AI-POWERED CUSTOMER SERVICE AUTOMATION FOR ENTERPRISES',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body className={`${spaceGrotesk.className} bg-black color`}>
        {/* Google Analytics Script */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-7BSBB3JDJR"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-7BSBB3JDJR');
          `}
        </Script>

        {/* <CosmicPortal /> */}
        <CyberNavbar />
        <main className="min-h-screen">
          <ErrorBoundary>{children}</ErrorBoundary>
        </main>
        <HolographicFooter />
      </body>
    </html>
  );
}
