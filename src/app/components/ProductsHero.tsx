// src/app/components/ProductsHero.tsx
'use client';

import { motion } from 'framer-motion';

export function ProductsHero() {
  return (
    <section className="bg-gradient-to-b from-green-50 to-white py-28">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            AI Solutions for Enterprise Customer Service
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transform your customer support with our cutting-edge AI platform combining Custom LLMs and Agent Assist technologies.
          </p>
        </motion.div>
      </div>
    </section>
  );
}