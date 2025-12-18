// src/app/components/EnterpriseSection.tsx
'use client';

import { motion } from 'framer-motion';
import { Slideshow } from './Slideshow';
import { Users, MessageSquare, Volume2 } from 'lucide-react';

export function EnterpriseSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-blue-50/90 via-sky-50 to-cyan-50/80 relative overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%230ea5e9' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundSize: '400px 400px'
        }}
      />

      {/* Light gradient orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-sky-200/20 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-cyan-200/15 to-transparent rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <section className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Smarter, Faster, Better.
          </section>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Deliver exceptional customer experiences with intelligent automation
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content - Glass cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="space-y-6">
              {[
                {
                  icon: <Users className="w-5 h-5" />,
                  title: "Tailored Experiences",
                  description: "Bespoke experiences that build strong connections and nurture lasting customer loyalty."
                },
                {
                  icon: <MessageSquare className="w-5 h-5" />,
                  title: "Humanlike Conversation",
                  description: "Delight customers with lifelike, empathetic conversations powered by Generative AI."
                },
                {
                  icon: <Volume2 className="w-5 h-5" />,
                  title: "Voice and Chat Engagement",
                  description: "Enable seamless, next-gen interactions across voice and chat, offering multimodal engagement."
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative"
                >
                  {/* Premium Glass Card */}
                  <div className="relative rounded-2xl p-6 overflow-hidden transition-all duration-500 bg-gradient-to-br from-white/90 via-white/70 to-white/90 backdrop-blur-md border border-white/80 border-t-white/90 border-l-white/90 shadow-[0_8px_32px_rgba(14,165,233,0.08)] shadow-sky-200/30 before:absolute before:inset-0 before:rounded-2xl before:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.6),inset_0_-1px_0_0_rgba(14,165,233,0.1)] hover:shadow-[0_20px_50px_rgba(14,165,233,0.15)] hover:shadow-sky-300/40 hover:scale-[1.02] hover:bg-gradient-to-br from-white via-white/85 to-white hover:border-white hover:before:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.8),inset_0_-1px_0_0_rgba(14,165,233,0.15)]">
                    
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: `linear-gradient(135deg, rgba(14, 165, 233, 0.03) 0%, rgba(56, 189, 248, 0.02) 50%, rgba(6, 182, 212, 0.01) 100%)`
                      }}
                    />

                    <div className="relative z-10">
                      <div className="flex items-start gap-4">
                       <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-white to-sky-50 shadow-[0_4px_12px_rgba(12,112,117,0.1)] border border-white/80 flex items-center justify-center group-hover:scale-110 group-hover:shadow-[0_8px_24px_rgba(12,112,117,0.15)] transition-all duration-300 flex-shrink-0">
  <div className="text-[#0C7075] group-hover:text-[#072E33]">
    {item.icon}
  </div>
</div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {item.title}
                          </h3>
                          <p className="text-gray-600 text-sm leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-4 mt-4 border-t border-gray-100 group-hover:border-sky-100 transition-colors">
                        <div className="flex-1">
                          <div className="h-px bg-gradient-to-r from-transparent via-sky-200/30 to-transparent group-hover:via-sky-300/50 transition-all duration-500" />
                        </div>
                        <div className="text-xs font-medium text-sky-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          Learn more
                        </div>
                        <svg className="w-4 h-4 text-sky-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" 
                          fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right content - Slideshow */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Glass container for slideshow */}
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-white/90 via-white/70 to-white/90 backdrop-blur-md border border-white/80 shadow-[0_8px_32px_rgba(14,165,233,0.1)] p-3">
              <Slideshow />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}