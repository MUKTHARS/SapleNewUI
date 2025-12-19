'use client';

import { motion } from 'framer-motion';
import { Cpu, Zap, Shield, Globe } from 'lucide-react';

export function ProductsHero() {
  return (
    <section className="relative overflow-hidden bg-white pt-20 md:pt-24 pb-16 md:pb-20">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0C7075]/5 via-transparent to-transparent"></div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#0C7075]/10 to-transparent rounded-full blur-3xl translate-x-32 -translate-y-32" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#0C7075]/5 to-transparent rounded-full blur-3xl -translate-x-48 translate-y-48" />

      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto text-center"
        >
          {/* Main Heading - Simple and clean */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            AI Solutions for Enterprise<br />Customer Service
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Transform your customer support with our cutting-edge AI platform combining Custom LLMs and Agent Assist technologies.
          </p>

          {/* Key Features - Clean, minimal design */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto mt-12"
          >
            {/* Custom LLMs */}
            <div className="group relative">
              <div className="relative z-10 flex flex-col items-center text-center p-6 bg-white rounded-xl border border-gray-200 hover:border-[#0C7075]/30 hover:shadow-md transition-all duration-300">
                <div className="w-12 h-12 bg-[#0C7075]/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Cpu className="w-5 h-5 text-[#0C7075]" />
                </div>
                <div className="text-lg font-semibold text-gray-900 mb-2">Custom LLMs</div>
                <div className="text-sm text-gray-600">Tailored language models for your specific needs</div>
              </div>
            </div>
            
            {/* Agent Assist */}
            <div className="group relative">
              <div className="relative z-10 flex flex-col items-center text-center p-6 bg-white rounded-xl border border-gray-200 hover:border-[#0C7075]/30 hover:shadow-md transition-all duration-300">
                <div className="w-12 h-12 bg-[#0C7075]/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-5 h-5 text-[#0C7075]" />
                </div>
                <div className="text-lg font-semibold text-gray-900 mb-2">Agent Assist</div>
                <div className="text-sm text-gray-600">Real-time support for human agents</div>
              </div>
            </div>
            
            {/* Enterprise Security */}
            <div className="group relative">
              <div className="relative z-10 flex flex-col items-center text-center p-6 bg-white rounded-xl border border-gray-200 hover:border-[#0C7075]/30 hover:shadow-md transition-all duration-300">
                <div className="w-12 h-12 bg-[#0C7075]/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-5 h-5 text-[#0C7075]" />
                </div>
                <div className="text-lg font-semibold text-gray-900 mb-2">Enterprise Security</div>
                <div className="text-sm text-gray-600">Bank-grade security and compliance</div>
              </div>
            </div>

            {/* Global Scale */}
            <div className="group relative">
              <div className="relative z-10 flex flex-col items-center text-center p-6 bg-white rounded-xl border border-gray-200 hover:border-[#0C7075]/30 hover:shadow-md transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-[#0C7075] to-[#0A5A60] rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Globe className="w-5 h-5 text-white" />
                </div>
                <div className="text-lg font-semibold text-gray-900 mb-2">Global Scale</div>
                <div className="text-sm text-gray-600">Deploy across multiple regions seamlessly</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
