'use client';

import { motion } from 'framer-motion';
import { MessageSquare, Phone, Mail, Server, Shield, Search, BarChart } from 'lucide-react';
import { useState } from 'react';

interface Capability {
  icon: React.ReactNode;
  name: string;
  description: string;
}

export function KeyCapabilities() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const capabilities: Capability[] = [
    { 
      icon: <MessageSquare className="w-6 h-6" />, 
      name: "Text & Messaging",
      description: "Real-time chat across all channels"
    },
    { 
      icon: <Phone className="w-6 h-6" />, 
      name: "Voice AI",
      description: "Natural conversation automation"
    },
    { 
      icon: <Mail className="w-6 h-6" />, 
      name: "Email Automation",
      description: "Smart inbox management"
    },
    { 
      icon: <Server className="w-6 h-6" />, 
      name: "Integrations",
      description: "Seamless system connectivity"
    },
    { 
      icon: <Shield className="w-6 h-6" />, 
      name: "Security & Compliance",
      description: "Enterprise-grade protection"
    },
    { 
      icon: <Search className="w-6 h-6" />, 
      name: "Knowledge Search",
      description: "Instant information retrieval"
    },
    { 
      icon: <BarChart className="w-6 h-6" />, 
      name: "Analytics & Reporting",
      description: "Data-driven insights"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-blue-50/90 via-sky-50 to-cyan-50/80 relative overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%230ea5e9' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundSize: '400px 400px'
        }}
      />

      {/* Light gradient orbs for depth */}
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-sky-200/50 shadow-sm mb-6">
            <div className="w-2 h-2 bg-sky-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-sky-800">Enterprise Capabilities</span>
          </div>
          <section className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            AI Platform Capabilities
          </section>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Comprehensive features that power both self-service and agent-assisted customer interactions
          </p>
        </motion.div>

        {/* Cards Grid with Premium Glass Effect */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {capabilities.map((capability, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.07 }}
              viewport={{ once: true }}
              className="group relative"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 overflow-hidden rounded-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              </div>
              
              {/* 3D tilt effect container */}
              <motion.div
                whileHover={{ rotateX: 5, rotateY: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
                style={{
                  transformStyle: "preserve-3d",
                  perspective: "1000px"
                }}
                className="relative h-full"
              >
                {/* Premium Glass Card - Similar to kore.ai */}
                <div className="relative h-full rounded-2xl p-6 overflow-hidden transition-all duration-500
                  /* Glass base */
                  bg-gradient-to-br from-white/90 via-white/70 to-white/90
                  backdrop-blur-md
                  /* Borders for glass effect */
                  border border-white/80
                  border-t-white/90
                  border-l-white/90
                  /* Sophisticated shadows like kore.ai */
                  shadow-[0_8px_32px_rgba(14,165,233,0.08)]
                  shadow-sky-200/30
                  /* Inner shadow for depth */
                  before:absolute before:inset-0 before:rounded-2xl before:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.6),inset_0_-1px_0_0_rgba(14,165,233,0.1)]
                  /* Hover effects */
                  hover:shadow-[0_20px_50px_rgba(14,165,233,0.15)]
                  hover:shadow-sky-300/40
                  hover:scale-[1.02]
                  hover:bg-gradient-to-br from-white via-white/85 to-white
                  hover:border-white
                  hover:before:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.8),inset_0_-1px_0_0_rgba(14,165,233,0.15)]">
                  
                  {/* Blue reflection layer - visible through glass */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(
                        135deg,
                        rgba(14, 165, 233, 0.03) 0%,
                        rgba(56, 189, 248, 0.02) 50%,
                        rgba(6, 182, 212, 0.01) 100%
                      )`
                    }}
                  />

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon with subtle glass effect */}
                    <div className="w-14 h-14 rounded-xl mb-5
                      bg-gradient-to-br from-white to-sky-50
                      shadow-[0_4px_12px_rgba(14,165,233,0.1)]
                      border border-white/80
                      flex items-center justify-center
                      group-hover:scale-110
                      group-hover:shadow-[0_8px_24px_rgba(14,165,233,0.15)]
                      transition-all duration-300">
                      <div className="text-sky-600 group-hover:text-sky-700">
                        {capability.icon}
                      </div>
                    </div>

                    {/* Text */}
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      {capability.name}
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {capability.description}
                    </p>

                    {/* Subtle indicator */}
                    <div className="flex items-center gap-2 pt-4 border-t border-gray-100 group-hover:border-sky-100 transition-colors">
                      <div className="flex-1">
                        <div className="h-px bg-gradient-to-r from-transparent via-sky-200/30 to-transparent 
                          group-hover:via-sky-300/50 transition-all duration-500" />
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

                  {/* Edge highlight for premium look */}
                  <div className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 border border-sky-100/50 rounded-2xl shadow-[0_0_0_1px_rgba(255,255,255,0.8)_inset]" />
                  </div>
                </div>
              </motion.div>

              {/* Active indicator dot */}
              {hoveredIndex === index && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-br from-sky-500 to-cyan-500 flex items-center justify-center shadow-lg"
                >
                  <div className="w-1.5 h-1.5 bg-white rounded-full" />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="relative rounded-2xl p-8 md:p-10
            bg-gradient-to-br from-white/90 via-white/80 to-white/90
            backdrop-blur-md
            border border-white/80
            shadow-[0_20px_60px_rgba(14,165,233,0.12)]
            overflow-hidden">
            
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, rgba(14, 165, 233, 0.2) 1px, transparent 1px)`,
                backgroundSize: '30px 30px'
              }}
            />

            <div className="relative z-10 max-w-3xl mx-auto text-center">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Need a Custom Capability?
              </h3>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                Our platform is highly extensible. Let&apos;s discuss your unique requirements.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 
                    bg-gradient-to-r from-sky-600 to-cyan-600 
                    text-white 
                    rounded-xl 
                    font-semibold 
                    shadow-lg 
                    hover:shadow-xl 
                    hover:shadow-sky-200/50 
                    transition-all duration-300
                    border border-sky-500/30"
                >
                  Contact Our Team
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}