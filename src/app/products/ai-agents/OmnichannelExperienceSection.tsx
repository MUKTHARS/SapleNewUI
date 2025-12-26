// src/app/products/ai-agents/OmnichannelExperienceSection.tsx
'use client';

import { motion } from 'framer-motion';
import { MessageSquare, Phone, Mail, Globe } from 'lucide-react';

export function OmnichannelExperienceSection() {
  const channels = [
    { icon: MessageSquare, label: 'Chat', bg: 'bg-white/5', iconColor: 'text-white' },
    { icon: Phone, label: 'Voice', bg: 'bg-white/5', iconColor: 'text-white' },
    { icon: Mail, label: 'Email', bg: 'bg-white/5', iconColor: 'text-white' },
    { icon: Globe, label: 'Web', bg: 'bg-white/5', iconColor: 'text-white' },
  ];

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Connect the customer experience across every channel
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Meet customers where they are—and help them get where they need to be.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-2 gap-4">
              {channels.map((channel, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`${channel.bg} backdrop-blur-sm rounded-xl p-6 flex flex-col items-center justify-center text-center border border-gray-800`}
                >
                  <channel.icon className={`w-8 h-8 mb-2 ${channel.iconColor}`} />
                  <div className="font-semibold text-white">{channel.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0" />
                <p className="text-gray-300">
                  Saple AI Agents operate seamlessly across chat, voice, email, and messaging platforms, 
                  retaining full conversational context as customers move between channels.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0" />
                <p className="text-gray-300">
                  Each channel is optimized independently, while the customer experience remains unified—resulting 
                  in faster resolutions and lower customer effort.
                </p>
              </div>
              <div className="bg-gradient-to-br from-gray-900/50 to-black/50 rounded-xl p-6 border border-gray-800 mt-6">
                <div className="text-lg font-semibold text-white mb-2">
                  Unified Customer Context
                </div>
                <div className="text-sm text-gray-400">
                  Maintain complete conversation history and context across all touchpoints
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}