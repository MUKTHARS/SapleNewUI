'use client';

import { motion } from 'framer-motion';
import { PlayCircle, Search, Filter, Sparkles } from 'lucide-react';

export function DemoHubHero() {
  return (
    <section className="relative h-[80vh] md:h-[90vh] overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* Glow Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-96 bg-gradient-radial from-[#0c7075]/20 via-transparent to-transparent blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#0c7075]/10 to-transparent blur-3xl" />

      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-6xl w-full"
        >
          {/* Badge */}
          {/* <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full mb-8 border border-white/10"
          >
            <Sparkles className="w-4 h-4 text-[#0c7075]" />
            <span className="text-sm font-medium text-white/80">Interactive Experience</span>
          </motion.div> */}

          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-[#0c7075]">
              Demo Hub
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white/60 max-w-3xl mx-auto mb-12 leading-relaxed">
            Explore our AI agent capabilities through interactive demos and real-world use cases
          </p>

          {/* Search Bar */}
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-2xl mx-auto mb-8"
          >
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#0c7075] to-[#0a4a4d] rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500" />
              <div className="relative bg-gray-900/80 backdrop-blur-xl rounded-2xl p-2 border border-white/10">
                <div className="flex items-center">
                  <Search className="absolute left-4 text-white/40 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search demos by industry, feature, or use case..."
                    className="w-full pl-12 pr-32 py-4 bg-transparent text-white placeholder:text-white/40 focus:outline-none"
                  />
                  <button className="absolute right-3 flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-all duration-300 text-white/80 hover:text-white">
                    <Filter className="w-4 h-4" />
                    <span className="font-medium">Filter</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div> */}

          {/* Stats */}
          {/* <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-8 text-white/60"
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">30+</div>
              <div className="text-sm">Interactive Demos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">15+</div>
              <div className="text-sm">Industries Covered</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">24/7</div>
              <div className="text-sm">Available Access</div>
            </div>
          </motion.div> */}
        </motion.div>
      </div>
    </section>
  );
}
