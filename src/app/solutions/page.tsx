// src/app/solutions/page.tsx
import { Metadata } from 'next';
import { SolutionsHero } from '../components/SolutionsHero';
import { IndustrySolutions } from '../components/IndustrySolutions';
import { HowItWorks } from '../components/HowItWorks';
import { IntegrationPartners } from '../components/IntegrationPartners';
import { CtaSection } from '../components/CtaSection';
import { ErrorBoundary } from '../components/ErrorBoundary';

export const metadata: Metadata = {
  title: 'saple.ai Solutions | AI Agents for Business Automation',
  description: 'Build and deploy AI agents that support, automate, and accelerate your business across industries like banking, healthcare, education, and ecommerce.',
};

export default function SolutionsPage() {
  return (
    <div className="bg-white">
      <ErrorBoundary>
        <SolutionsHero />
        <IndustrySolutions />
        <HowItWorks />
        <IntegrationPartners />
        <CtaSection />
      </ErrorBoundary>
    </div>
  );
}