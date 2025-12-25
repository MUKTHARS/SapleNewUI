// src/app/components/KnowledgeFirstSection.tsx - Dark Theme Version
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export function KnowledgeFirstSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundSize: '300px 300px'
        }} />
      </div>

      {/* Gradient accents */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-cyan-500/5 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-blue-500/5 to-transparent rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Title and Description at Top - Centered */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto mb-16 space-y-6"
        >
          {/* Main Heading */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            A knowledge-first AI platform built for scale
          </h2>

          {/* Description */}
          <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
            Empower users with AI-driven solutions across channels and content mediums — including voice, video, live translation, and seamless agent escalation.
          </p>
        </motion.div>

                       {/* Image Section - Full width, larger */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative w-full mt-12"
        >
          {/* Large glassy frame with inner padding */}
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#cce7f1]/30 via-[#cce7f1]/20 to-[#cce7f1]/30 backdrop-blur-md border border-[#cce7f1]/50 shadow-2xl p-2">
          {/* <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-gray-800/30 via-gray-900/20 to-gray-800/30 backdrop-blur-md border border-gray-700/50 shadow-2xl p-2"> */}
            {/* Image container with perfect fit */}
            <div className="relative w-full aspect-[4/3]">
              <Image
                src="/images/Saple AI Capabilities v9.png"
                alt="Knowledge-first AI Platform"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                priority
              />
            </div>
            {/* Subtle inner glow */}
            <div className="absolute inset-0 rounded-3xl border border-[#cce7f1]/30 pointer-events-none" />
            {/* <div className="absolute inset-0 rounded-3xl border border-gray-600/20 pointer-events-none" /> */}
          </div>
        </motion.div>
      </div>
    </section>
  );
}