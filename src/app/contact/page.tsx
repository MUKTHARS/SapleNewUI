// src/app/contact/page.tsx
import { Metadata } from 'next';
import { ContactForm } from '../components/ContactForm';
import { ContactHero } from '../components/ContactHero';
import { ErrorBoundary } from '../components/ErrorBoundary';

export const metadata: Metadata = {
  title: 'Contact saple.ai | Enterprise AI Solutions',
  description: 'Get in touch with our team to discuss how saple.ai can transform your customer service with AI.',
};

export default function ContactPage() {
  return (
    <div className="bg-white">
      <ErrorBoundary>
        <ContactHero />
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto">
            <ContactForm />
          </div>
        </div>
      </ErrorBoundary>
    </div>
  );
}