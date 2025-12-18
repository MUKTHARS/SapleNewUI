// src/app/components/FeaturesSection.tsx
'use client';

import { motion } from 'framer-motion';
import { Server, Brain, Smartphone, Clock} from 'lucide-react';

const features = [
  {
    icon: <Server className="w-6 h-6" />,
    title: "Enterprise-ready",
    description: "Scalable and secure – integrate seamlessly with your ecosystem"
  },
  {
    icon: <Brain className="w-6 h-6" />,
    title: "GenAI-empowered",
    description: "Harness the power of generative AI. Creativity meets control"
  },
  {
    icon: <Smartphone className="w-6 h-6" />,
    title: "Omnichannel",
    description: "Consistent, high-quality interactions across all customer touch points"
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "24/7 service",
    description: "Always on, always reliable. Support that exceeds customer expectations"
  }
];

export function FeaturesSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
      {/* Pattern background - more visible */}
      <div className="absolute inset-0 opacity-[0.15]">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundSize: '300px 300px'
        }} />
      </div>

      {/* Grid overlay - more visible */}
      <div className="absolute inset-0 opacity-[0.1]">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* Bright gradient orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-green-500/20 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-blue-500/20 to-transparent rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-purple-500/15 to-cyan-500/15 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          {/* <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
            <Zap className="w-4 h-4 text-green-400" />
            <span className="text-sm font-medium text-white/90">AI Agents for the Enterprise</span>
          </div> */}
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            The Future of Customer Service
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Deploy empathetic multimodal AI agents that type, talk, listen, look, and more to scale the relationships that matter for your business.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group h-full"
            >
              <div className="relative h-full bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:border-green-400/50 hover:bg-white/10 transition-all duration-300 overflow-hidden">
                {/* Pattern inside card */}
                <div className="absolute inset-0 opacity-[0.05]">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at center, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                  }} />
                </div>

                {/* Icon container */}
               <div className="relative w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 border border-white/30 group-hover:border-white/50">
  <div className="text-white group-hover:text-white transition-colors duration-300">
    {feature.icon}
  </div>
</div>

                {/* Content */}
                <div className="relative">
                  {/* <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-green-100 transition-colors duration-300"> */}
                    <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-white transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-white/90 text-sm leading-relaxed group-hover:text-white transition-colors duration-300">
                  {/* <p className="text-white/70 text-sm leading-relaxed group-hover:text-white/80 transition-colors duration-300"> */}
                    {feature.description}
                  </p>
                </div>

                {/* Bottom accent */}
                <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:via-green-400/60 group-hover:scale-x-110 transition-all duration-300" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}