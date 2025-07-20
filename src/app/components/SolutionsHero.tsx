// src/app/components/SolutionsHero.tsx
'use client';

import { motion } from 'framer-motion';

export function SolutionsHero() {
  return (
    <section className="bg-gradient-to-b from-blue-50 to-white py-28">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            AI Agents for Business Automation
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Saple AI is the all-in-one platform to build and deploy AI agents that support, automate, and accelerate your business.
          </p>
        </motion.div>
      </div>
    </section>
  );
}