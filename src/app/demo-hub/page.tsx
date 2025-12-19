import { Metadata } from 'next';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { DemoHubHero } from '../components/demo-hub/DemoHubHero';
import { VideoGrid } from '../components/demo-hub/VideoGrid';
import { DemoCategories } from '../components/demo-hub/DemoCategories';
import { CtaSection } from '../components/CtaSection';

export const metadata: Metadata = {
  title: 'Demo Hub | saple.ai - AI Agent Demos & Showcases',
  description: 'Explore our AI agent demos and see saple.ai in action across different industries and use cases',
  keywords: ['AI demos', 'chatbot demo', 'voice AI demo', 'AI agent showcase'],
};

// Video data
const demoVideos = [
  {
    id: 'ecommerce-demo',
    title: 'E-commerce Customer Support',
    description: 'See how our AI agent handles product inquiries, order tracking, and returns for an online store',
    duration: '2:45',
    category: 'retail',
    thumbnail: '/uploads/thumbnails/ecommerce-demo.jpg',
    videoUrl: '/uploads/videos/video.mp4',
    tags: ['ecommerce', 'customer support', 'sales', 'automation'],
  },
  {
    id: 'healthcare-demo',
    title: 'Healthcare Symptom Checker',
    description: 'AI-powered symptom assessment and appointment scheduling for healthcare providers',
    duration: '3:15',
    category: 'healthcare',
    thumbnail: '/uploads/thumbnails/healthcare-demo.jpg',
    videoUrl: '/uploads/videos/sapleAI.mp4',
    tags: ['healthcare', 'symptom checker', 'appointments', 'medical'],
  },
  {
    id: 'banking-demo',
    title: 'Banking & Finance Assistant',
    description: 'Secure AI agent handling account inquiries, transaction history, and financial advice',
    duration: '4:20',
    category: 'finance',
    thumbnail: '/uploads/thumbnails/banking-demo.jpg',
    videoUrl: '/uploads/videos/sapleAI.mp4',
    tags: ['banking', 'finance', 'security', 'compliance'],
  },
  {
    id: 'voice-agent-demo',
    title: 'Voice AI Agent Demo',
    description: 'Natural voice conversation with realistic tone and speech patterns',
    duration: '2:30',
    category: 'voice',
    thumbnail: '/uploads/thumbnails/voice-demo.jpg',
    videoUrl: '/uploads/videos/sapleAI.mp4',
    tags: ['voice AI', 'conversational', 'natural speech', 'IVR'],
  },
  {
    id: 'agent-assist-demo',
    title: 'Agent Assist in Action',
    description: 'Real-time support for human agents with instant knowledge access',
    duration: '3:45',
    category: 'agent-assist',
    thumbnail: '/uploads/thumbnails/agent-assist-demo.jpg',
    videoUrl: '/uploads/videos/sapleAI.mp4',
    tags: ['agent assist', 'real-time', 'knowledge base', 'workflow'],
  },
  {
    id: 'multilingual-demo',
    title: 'Multilingual Support',
    description: 'AI agent seamlessly handling conversations in multiple languages',
    duration: '2:15',
    category: 'multilingual',
    thumbnail: '/uploads/thumbnails/multilingual-demo.jpg',
    videoUrl: '/uploads/videos/multilingual.mp4',
    tags: ['multilingual', 'translation', 'global', 'localization'],
  },
  {
    id: 'custom-llm-demo',
    title: 'Custom LLM Integration',
    description: 'Tailored AI models trained on specific business knowledge',
    duration: '4:10',
    category: 'llm',
    thumbnail: '/uploads/thumbnails/custom-llm-demo.jpg',
    videoUrl: '/uploads/videos/sapleAI.mp4',
    tags: ['custom LLM', 'training', 'fine-tuning', 'enterprise'],
  },
  {
    id: 'integration-demo',
    title: 'Platform Integrations',
    description: 'Seamless integration with WordPress, Shopify, React, and other platforms',
    duration: '3:30',
    category: 'integration',
    thumbnail: '/uploads/thumbnails/integration-demo.jpg',
    videoUrl: '/uploads/videos/sapleAI.mp4',
    tags: ['integration', 'platforms', 'deployment', 'API'],
  },
];

const categories = [
  { id: 'all', name: 'All Demos', count: demoVideos.length },
  { id: 'retail', name: 'Retail & E-commerce', count: demoVideos.filter(v => v.category === 'retail').length },
  { id: 'healthcare', name: 'Healthcare', count: demoVideos.filter(v => v.category === 'healthcare').length },
  { id: 'finance', name: 'Banking & Finance', count: demoVideos.filter(v => v.category === 'finance').length },
  { id: 'voice', name: 'Voice AI', count: demoVideos.filter(v => v.category === 'voice').length },
  { id: 'agent-assist', name: 'Agent Assist', count: demoVideos.filter(v => v.category === 'agent-assist').length },
  { id: 'multilingual', name: 'Multilingual', count: demoVideos.filter(v => v.category === 'multilingual').length },
  { id: 'integration', name: 'Integrations', count: demoVideos.filter(v => v.category === 'integration').length },
];

export default function DemoHubPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <ErrorBoundary>
        {/* Dark Theme Sections */}
        <DemoHubHero />
        
        <section className="py-16 bg-gradient-to-b from-gray-900 via-black to-gray-900">
          <div className="container mx-auto px-4 max-w-7xl">
            <DemoCategories categories={categories} />
          </div>
        </section>
        
        {/* Light Theme Section */}
        <section className="py-24 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/90 via-sky-50 to-cyan-50/80" />
          <div className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%230ea5e9' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E")`,
              backgroundSize: '400px 400px'
            }}
          />

          <div className="relative z-10 container mx-auto px-4 max-w-7xl">
            {/* Section Header */}
            <div className="text-center mb-16">
              {/* <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-[#0c7075]/20 shadow-sm mb-6">
                <div className="w-2 h-2 bg-[#0c7075] rounded-full animate-pulse" />
                <span className="text-sm font-medium text-[#0c7075]">Interactive Demos</span>
              </div> */}
              <section className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Explore Our AI Capabilities
              </section>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Watch how our AI agents transform customer service across different industries
              </p>
            </div>

            <VideoGrid videos={demoVideos} />
          </div>
        </section>
        
        <CtaSection />
      </ErrorBoundary>
    </div>
  );
}
