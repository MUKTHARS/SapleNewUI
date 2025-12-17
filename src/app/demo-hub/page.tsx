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

// Video data - you can move this to a separate data file if it grows
const demoVideos = [
  {
    id: 'ecommerce-demo',
    title: 'E-commerce Customer Support',
    description: 'See how our AI agent handles product inquiries, order tracking, and returns for an online store',
    duration: '2:45',
    category: 'retail',
    thumbnail: '/uploads/thumbnails/ecommerce-demo.jpg',
    videoUrl: '/uploads/videos/sapleAI.mp4',
    tags: ['ecommerce', 'customer support', 'sales'],
  },
  {
    id: 'healthcare-demo',
    title: 'Healthcare Symptom Checker',
    description: 'AI-powered symptom assessment and appointment scheduling for healthcare providers',
    duration: '3:15',
    category: 'healthcare',
    thumbnail: '/uploads/thumbnails/healthcare-demo.jpg',
    videoUrl: '/uploads/videos/sapleAI.mp4',
    tags: ['healthcare', 'symptom checker', 'appointments'],
  },
  {
    id: 'banking-demo',
    title: 'Banking & Finance Assistant',
    description: 'Secure AI agent handling account inquiries, transaction history, and financial advice',
    duration: '4:20',
    category: 'finance',
    thumbnail: '/uploads/thumbnails/banking-demo.jpg',
    videoUrl: '/uploads/videos/sapleAI.mp4',
    tags: ['banking', 'finance', 'security'],
  },
  {
    id: 'voice-agent-demo',
    title: 'Voice AI Agent Demo',
    description: 'Natural voice conversation with realistic tone and speech patterns',
    duration: '2:30',
    category: 'voice',
    thumbnail: '/uploads/thumbnails/voice-demo.jpg',
    videoUrl: '/uploads/videos/sapleAI.mp4',
    tags: ['voice AI', 'conversational', 'natural speech'],
  },
  {
    id: 'agent-assist-demo',
    title: 'Agent Assist in Action',
    description: 'Real-time support for human agents with instant knowledge access',
    duration: '3:45',
    category: 'agent-assist',
    thumbnail: '/uploads/thumbnails/agent-assist-demo.jpg',
    videoUrl: '/uploads/videos/sapleAI.mp4',
    tags: ['agent assist', 'real-time', 'knowledge base'],
  },
  {
    id: 'multilingual-demo',
    title: 'Multilingual Support',
    description: 'AI agent seamlessly handling conversations in multiple languages',
    duration: '2:15',
    category: 'multilingual',
    thumbnail: '/uploads/thumbnails/multilingual-demo.jpg',
    videoUrl: '/uploads/videos/multilingual.mp4',
    tags: ['multilingual', 'translation', 'global'],
  },
  {
    id: 'custom-llm-demo',
    title: 'Custom LLM Integration',
    description: 'Tailored AI models trained on specific business knowledge',
    duration: '4:10',
    category: 'llm',
    thumbnail: '/uploads/thumbnails/custom-llm-demo.jpg',
    videoUrl: '/uploads/videos/sapleAI.mp4',
    tags: ['custom LLM', 'training', 'fine-tuning'],
  },
  {
    id: 'integration-demo',
    title: 'Platform Integrations',
    description: 'Seamless integration with WordPress, Shopify, React, and other platforms',
    duration: '3:30',
    category: 'integration',
    thumbnail: '/uploads/thumbnails/integration-demo.jpg',
    videoUrl: '/uploads/videos/sapleAI.mp4',
    tags: ['integration', 'platforms', 'deployment'],
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
    <div className="bg-white">
      <ErrorBoundary>
        <DemoHubHero />
        
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <DemoCategories categories={categories} />
          </div>
        </section>
        
        <section className="py-16">
          <div className="container mx-auto px-4">
            <VideoGrid videos={demoVideos} />
          </div>
        </section>
        
        <CtaSection />
      </ErrorBoundary>
    </div>
  );
}