// src/app/components/FeaturesSection.tsx
'use client';

import { motion } from 'framer-motion';
import { Server, Brain, Smartphone, Clock } from 'lucide-react';

const features = [
  {
    icon: <Server className="w-8 h-8 color" />,
    title: "Enterprise-ready",
    description: "Scalable and secure – integrate seamlessly with your ecosystem"
  },
  {
    icon: <Brain className="w-8 h-8 color" />,
    title: "GenAI-empowered",
    description: "Harness the power of generative AI. Creativity meets control"
  },
  {
    icon: <Smartphone className="w-8 h-8 color" />,
    title: "Omnichannel",
    description: "Consistent, high-quality interactions across all customer touch points"
  },
  {
    icon: <Clock className="w-8 h-8 color" />,
    title: "24/7 service",
    description: "Always on, always reliable. Support that exceeds customer expectations"
  }
];

export function FeaturesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-16">AI AGENTS FOR THE ENTERPRISE</h2>
        <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto mb-16">
          Deploy empathetic multimodal AI agents that type, talk, listen, look, and more to scale the relationships that matter for your business.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-blue-50">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}