// app/layout.tsx
import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';
import './globals.css';
import { CyberNavbar } from './components/CyberNavbar';
import { HolographicFooter } from './components/HolographicFooter';
// import CosmicPortal from './components/CosmicPortal';
import { ErrorBoundary } from './components/ErrorBoundary';

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
      <body className={`${spaceGrotesk.className} bg-black color`}>
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