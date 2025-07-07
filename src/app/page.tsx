// src/app/page.tsx
import { Metadata } from 'next';
import { HeroSection } from './components/HeroSection';
import { FeaturesSection } from './components/FeaturesSection';
import { EnterpriseSection } from './components/EnterpriseSection';
import { UseCasesSection } from './components/UseCasesSection';
import { StatsSection } from './components/StatsSection';
import { CtaSection } from './components/CtaSection';
import { ErrorBoundary } from './components/ErrorBoundary'; 

export const metadata: Metadata = {
  title: 'saple.ai | Enterprise AI Customer Service Automation',
  description: 'AI-powered chat and voice automation for enterprise customer service. Enhance satisfaction while lowering costs with our generative AI solutions.',
};

export default function Home() {
  return (
    <div className="bg-white">
      <ErrorBoundary>
        <HeroSection />
        <FeaturesSection />
        <EnterpriseSection />
        <UseCasesSection />
        <StatsSection />
        <CtaSection />
      </ErrorBoundary>
    </div>
  );
}