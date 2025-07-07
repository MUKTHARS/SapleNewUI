// src/app/products/page.tsx
import { Metadata } from 'next';
import { ProductsHero } from '../components/ProductsHero';
import { ProductsOverview } from '../components/ProductsOverview';
import { KeyCapabilities } from '../components/KeyCapabilities';
import { CtaSection } from '../components/CtaSection';
import { ErrorBoundary } from '../components/ErrorBoundary';

export const metadata: Metadata = {
  title: 'saple.ai Products | AI-Powered Customer Service Solutions',
  description: 'Explore our AI products featuring Custom LLMs, Agent Assist, and 24/7 intelligent support for enterprise customer service.',
};

export default function ProductsPage() {
  return (
    <div className="bg-white">
      <ErrorBoundary>
        <ProductsHero />
        <ProductsOverview />
        <KeyCapabilities />
        <CtaSection />
      </ErrorBoundary>
    </div>
  );
}