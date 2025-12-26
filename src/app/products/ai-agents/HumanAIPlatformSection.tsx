// src/app/products/ai-agents/HumanAIPlatformSection.tsx
'use client';

import { motion } from 'framer-motion';
import { Users, GitMerge, BarChart } from 'lucide-react';

export function HumanAIPlatformSection() {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            One platform for human & AI Agents
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Bring human agents and AI Agents together on a single platform
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {[
            {
              icon: Users,
              title: 'Seamless Handoffs',
              description: 'Transfer conversations between AI and human agents with complete context'
            },
            {
              icon: GitMerge,
              title: 'Shared Context',
              description: 'Maintain conversation history and context across all interactions'
            },
            {
              icon: BarChart,
              title: 'Unified Analytics',
              description: 'Consistent quality measurement across every interaction'
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-b from-gray-900/50 to-black/50 rounded-xl p-8 border border-gray-800 hover:border-gray-700 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center mb-6">
                <item.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
              <p className="text-gray-400">{item.description}</p>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 bg-gradient-to-br from-white/5 to-white/10 rounded-xl p-8 text-center border border-gray-800"
        >
          <p className="text-lg text-gray-300">
            Monitor performance, benchmark outcomes, and capture the true voice of your customer—whether 
            conversations are handled by humans, AI, or both.
          </p>
        </motion.div>
      </div>
    </section>
  );
}