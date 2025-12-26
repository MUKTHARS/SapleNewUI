// src/app/products/ai-agents/TrustSection.tsx
'use client';

import { motion } from 'framer-motion';
import { Award, ShieldCheck, Cpu } from 'lucide-react';

export function TrustSection() {
  const cards = [
    {
      icon: Award,
      title: 'Unmatched agentic AI expertise',
      description: 'Work with a platform purpose-built for agentic workflows—combining reasoning, orchestration, and action. Saple AI Agents are designed to handle real enterprise complexity, not scripted conversations.'
    },
    {
      icon: ShieldCheck,
      title: 'Proven enterprise readiness',
      description: 'Built for scale, security, and compliance, Saple AI is trusted by teams running mission-critical customer operations across industries.'
    },
    {
      icon: Cpu,
      title: 'Flexible, multi-model architecture',
      description: 'Stay future-proof with support for multiple LLMs and rapid innovation across every layer of the AI Agent stack—without vendor lock-in.'
    }
  ];

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Why do enterprise teams trust Saple AI Agents?
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Build, deploy, and scale AI Agents—your way
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gray-900/50 to-black/50 rounded-xl p-8 border border-gray-800 hover:border-gray-700 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center mb-6">
                <card.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">{card.title}</h3>
              <p className="text-gray-400">{card.description}</p>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-lg font-semibold text-white mb-6">
            Create intelligent, autonomous AI Agents with full control, deep observability, and enterprise-grade reliability.
          </p>
        </motion.div>
      </div>
    </section>
  );
}