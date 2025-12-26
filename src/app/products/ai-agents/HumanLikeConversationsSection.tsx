// src/app/products/ai-agents/HumanLikeConversationsSection.tsx
'use client';

import { motion } from 'framer-motion';
import { MessageSquare, Brain } from 'lucide-react';

export function HumanLikeConversationsSection() {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -left-4 -top-4 w-24 h-24 bg-white/5 rounded-full blur-xl" />
            <div className="relative bg-gradient-to-br from-gray-900/50 to-black/50 rounded-2xl p-8 border border-gray-800">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <MessageSquare className="w-5 h-5 text-white" />
                <span className="text-sm font-semibold text-white">Human-like Conversations</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Delight customers with human-like conversations
              </h2>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                Engage customers naturally with AI Agents that sound and feel human—while staying 
                aligned to your brand, policies, and tone. Saple&apos;s agentic architecture enables dynamic, 
                context-aware conversations that adapt in real time, execute workflows securely, and resolve 
                even complex customer issues without breaking continuity.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Brain className="w-5 h-5 text-white mt-1 flex-shrink-0" />
                  <span className="text-gray-300">
                   Saple AI Agents don&apos;t just answer questions—they reason, act, and learn across every interaction.
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  {/* <Zap className="w-5 h-5 text-white mt-1 flex-shrink-0" /> */}
                  {/* <span className="text-gray-300">
                    Real-time adaptation and secure workflow execution
                  </span> */}
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl p-6 border border-gray-800">
              <div className="text-3xl font-bold text-white mb-2">98%</div>
              <div className="text-sm font-medium text-gray-400">Customer Satisfaction</div>
            </div>
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl p-6 border border-gray-800">
              <div className="text-3xl font-bold text-white mb-2">40%</div>
              <div className="text-sm font-medium text-gray-400">Faster Resolution</div>
            </div>
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl p-6 border border-gray-800">
              <div className="text-3xl font-bold text-white mb-2">90%</div>
              <div className="text-sm font-medium text-gray-400">Automation Rate</div>
            </div>
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl p-6 border border-gray-800">
              <div className="text-3xl font-bold text-white mb-2">24/7</div>
              <div className="text-sm font-medium text-gray-400">Availability</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}