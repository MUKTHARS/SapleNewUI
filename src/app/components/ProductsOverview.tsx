// src/app/components/ProductsOverview.tsx
'use client';

import { motion } from 'framer-motion';
import { Brain, Zap, Eye, Clock, Smartphone, ArrowRight, Sparkles } from 'lucide-react';

export function ProductsOverview() {
  return (
    <section className="py-16 bg-black relative overflow-hidden">
      {/* Ambient background grid */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Subtle radial gradient overlay */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-96 bg-gradient-radial from-white/5 to-transparent blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header - Reduced spacing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 backdrop-blur-sm text-white/70 rounded-full text-xs font-medium mb-4 border border-white/10">
            <Brain size={14} />
            Custom LLMs
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Empowering Agents with<br />AI-Driven Assistance
          </h2>
          <p className="text-base text-white/60 max-w-2xl mx-auto leading-relaxed">
            Agent Assist solutions leverage AI to empower customer service representatives by providing 
            real-time insights, suggested responses, and access to knowledge bases.
          </p>
        </motion.div>

        {/* Features Grid - Reduced gaps and spacing */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {[
            {
              icon: <Zap className="w-5 h-5" />,
              title: "Intelligent Information Access",
              description: "AI-driven insights and consolidated customer data at your fingertips"
            },
            {
              icon: <Eye className="w-5 h-5" />,
              title: "Consistent Support",
              description: "Unified view of customer interactions with advanced analytics"
            },
            {
              icon: <Smartphone className="w-5 h-5" />,
              title: "Unified Workspace",
              description: "Integrates all communication channels and CRM data seamlessly"
            },
            {
              icon: <Clock className="w-5 h-5" />,
              title: "24/7 Support",
              description: "Real-time AI insights and complete customer history access"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group h-full flex flex-col relative"
            >
              {/* Glass card effect */}
              <div className="relative h-full bg-white/[0.02] backdrop-blur-xl rounded-xl p-5 border border-white/10 hover:border-white/20 hover:bg-white/[0.04] transition-all duration-300">
                {/* Shine effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent rounded-xl" />
                </div>
                
                <div className="relative flex flex-col h-full">
                  <div className="w-10 h-10 bg-white/5 backdrop-blur-sm rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 flex-shrink-0 border border-white/10">
                    <div className="text-white/90">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-base font-semibold text-white mb-2 line-clamp-2">
                    {feature.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed flex-grow">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Value Proposition - Glass morphism design */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-2xl"
        >
          {/* Glass background */}
          <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-2xl border border-white/10" />
          
          {/* Ambient glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

          {/* Grid pattern overlay */}
          <div className="absolute inset-0 opacity-[0.02]">
            <div className="absolute inset-0" style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '30px 30px'
            }} />
          </div>

          <div className="relative z-10 p-10 md:p-12">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-white/40" />
                <h3 className="text-3xl md:text-4xl font-bold text-white text-center">
                  Transform Your Customer Service
                </h3>
              </div>
              <p className="text-white/50 text-center mb-10 text-base leading-relaxed">
                Deliver exceptional experiences at scale with AI-powered assistance
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                {[
                  {
                    metric: "80%",
                    label: "Reduction in response times"
                  },
                  {
                    metric: "95%",
                    label: "Increase in customer satisfaction"
                  },
                  {
                    metric: "50%",
                    label: "Lower operational costs"
                  },
                  {
                    metric: "24/7",
                    label: "Global support coverage"
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group flex items-center gap-4 bg-white/[0.03] backdrop-blur-sm rounded-xl p-5 border border-white/10 hover:bg-white/[0.05] hover:border-white/20 transition-all duration-300"
                  >
                    <div className="flex-shrink-0">
                      <div className="text-3xl font-bold text-white">
                        {item.metric}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white/50 text-sm leading-snug">
                        {item.label}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-white/40 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}