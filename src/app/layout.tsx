// app/layout.tsx - UPDATED
import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';
import './globals.css';
import { CyberNavbar } from './components/CyberNavbar';
import { HolographicFooter } from './components/HolographicFooter';
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

        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "si8ook5389");
          `}
        </Script>

        {/* Main layout - navbar and footer always visible */}
        <CyberNavbar />

        <main>
          <ErrorBoundary>{children}</ErrorBoundary>
        </main>

        <HolographicFooter />
      </body>
    </html>
  );
}