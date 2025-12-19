'use client';

import { motion } from 'framer-motion';
import { Play, Code, Eye, Download } from 'lucide-react';

export function DemoHubHero() {
  return (
    <section className="relative overflow-hidden bg-white pt-20 md:pt-24 pb-16 md:pb-20">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0C7075]/5 via-transparent to-transparent"></div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-[#0C7075]/10 to-transparent rounded-full blur-3xl -translate-x-32 -translate-y-32" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-[#0C7075]/5 to-transparent rounded-full blur-3xl translate-x-48 translate-y-48" />

      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto text-center"
        >
          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Interactive Demo Hub
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Explore our AI agent capabilities through interactive demos and real-world use cases
          </p>

          {/* Demo Features */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto mt-12"
          >
            {/* Live Demos */}
            <div className="group relative">
              <div className="relative z-10 flex flex-col items-center text-center p-6 bg-white rounded-xl border border-gray-200 hover:border-[#0C7075]/30 hover:shadow-md transition-all duration-300">
                <div className="w-12 h-12 bg-[#0C7075]/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Play className="w-5 h-5 text-[#0C7075]" />
                </div>
                <div className="text-lg font-semibold text-gray-900 mb-2">Live Demos</div>
                <div className="text-sm text-gray-600">Interactive AI agent demonstrations</div>
              </div>
            </div>
            
            {/* Code Examples */}
            <div className="group relative">
              <div className="relative z-10 flex flex-col items-center text-center p-6 bg-white rounded-xl border border-gray-200 hover:border-[#0C7075]/30 hover:shadow-md transition-all duration-300">
                <div className="w-12 h-12 bg-[#0C7075]/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Code className="w-5 h-5 text-[#0C7075]" />
                </div>
                <div className="text-lg font-semibold text-gray-900 mb-2">Code Examples</div>
                <div className="text-sm text-gray-600">Ready-to-use implementation snippets</div>
              </div>
            </div>
            
            {/* Visualizations */}
            <div className="group relative">
              <div className="relative z-10 flex flex-col items-center text-center p-6 bg-white rounded-xl border border-gray-200 hover:border-[#0C7075]/30 hover:shadow-md transition-all duration-300">
                <div className="w-12 h-12 bg-[#0C7075]/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Eye className="w-5 h-5 text-[#0C7075]" />
                </div>
                <div className="text-lg font-semibold text-gray-900 mb-2">Visualizations</div>
                <div className="text-sm text-gray-600">See AI agents in action visually</div>
              </div>
            </div>

            {/* Resources */}
            <div className="group relative">
              <div className="relative z-10 flex flex-col items-center text-center p-6 bg-white rounded-xl border border-gray-200 hover:border-[#0C7075]/30 hover:shadow-md transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-[#0C7075] to-[#0A5A60] rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Download className="w-5 h-5 text-white" />
                </div>
                <div className="text-lg font-semibold text-gray-900 mb-2">Resources</div>
                <div className="text-sm text-gray-600">Documentation and guides</div>
              </div>
            </div>
          </motion.div>

          {/* CTA Section */}
          {/* <div className="mt-16 max-w-md mx-auto">
            <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Ready to Explore?</h3>
              <p className="text-gray-600 text-sm mb-6">
                Dive into our interactive demos to see how AI agents can transform your business processes.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button className="px-6 py-3 bg-gradient-to-r from-[#0C7075] to-[#0A5A60] text-white rounded-lg font-medium hover:shadow-md transition-all duration-300">
                  Start Demo Tour
                </button>
                <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:border-[#0C7075] hover:text-[#0C7075] transition-all duration-300">
                  View Documentation
                </button>
              </div>
            </div>
          </div> */}
        </motion.div>
      </div>
    </section>
  );
}
