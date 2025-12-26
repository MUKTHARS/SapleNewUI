// src/app/products/ai-agents/AutomationQualitySection.tsx
'use client';

import { motion } from 'framer-motion';
import { TrendingUp, BarChart3, Shield, Eye } from 'lucide-react';

export function AutomationQualitySection() {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <TrendingUp className="w-5 h-5 text-white" />
                <span className="text-sm font-semibold text-white">Automation with Quality</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Automate more, without sacrificing quality
              </h2>
              
              <p className="text-gray-300 leading-relaxed">
                Scale automation with confidence using deep conversational intelligence and built-in 
                observability. Saple AI continuously analyzes conversations to identify what should be 
                automated, how agents behave, and where performance can improve.
              </p>
              
              <p className="text-gray-300 leading-relaxed">
                With AI-driven testing, quality management, and real-time insights, teams can deploy AI 
                Agents that get better every day—without compromising customer trust or experience.
              </p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-6"
          >
            {[
              {
                icon: BarChart3,
                title: 'AI-Driven Testing',
                description: 'Continuous quality assessment'
              },
              {
                icon: Shield,
                title: 'Quality Management',
                description: 'Built-in safeguards'
              },
              {
                icon: Eye,
                title: 'Real-Time Insights',
                description: 'Performance monitoring'
              },
              {
                icon: TrendingUp,
                title: 'Continuous Improvement',
                description: 'Daily optimization'
              }
            ].map((item, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-900/50 to-black/50 rounded-xl p-6 border border-gray-800 hover:border-gray-700 transition-colors duration-300"
              >
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.description}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}