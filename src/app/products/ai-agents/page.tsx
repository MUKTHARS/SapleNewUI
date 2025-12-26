// src/app/products/ai-agents/page.tsx
import { HeroSection } from './HeroSection';
import { HumanLikeConversationsSection } from './HumanLikeConversationsSection';
import { OmnichannelExperienceSection } from './OmnichannelExperienceSection';
import { AutomationQualitySection } from './AutomationQualitySection';
import { EnterpriseGuardrailsSection } from './EnterpriseGuardrailsSection';
import { HumanAIPlatformSection } from './HumanAIPlatformSection';
import { MultilingualSupportSection } from './MultilingualSupportSection';
import { TrustSection } from './TrustSection';
import { CtaSection } from './CtaSection';

export default function AIAgentsPage() {
  return (
    <main className="min-h-screen bg-white">
      <HeroSection />
      <HumanLikeConversationsSection />
      <OmnichannelExperienceSection />
      <AutomationQualitySection />
      <EnterpriseGuardrailsSection />
      <HumanAIPlatformSection />
      <MultilingualSupportSection />
      <TrustSection />
      <CtaSection />
    </main>
  );
}