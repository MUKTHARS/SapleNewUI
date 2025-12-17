'use client';

import { motion } from 'framer-motion';
import { PlayCircle, Search, Filter } from 'lucide-react';

export function DemoHubHero() {
  return (
    <section className="bg-gradient-to-b from-green-50 to-white py-28">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-purple-100 rounded-full mb-6">
            <PlayCircle className="w-10 h-10 text-[#0c7075]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Demo Hub
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            Explore our AI agent capabilities through interactive demos and real-world use cases
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search demos by industry, feature, or use case..."
                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0c7075] focus:border-[#0c7075]"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2 text-[#0c7075] font-medium">
                <Filter className="w-4 h-4" />
                <span>Filter</span>
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Browse our demos showcasing saple.ai capabilities
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}