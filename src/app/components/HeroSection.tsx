// src/app/components/HeroSection.tsx
'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-b from-green-50 to-white py-28">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Enterprise-ready Customer Service Automation
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            Enhance customer service with AI-powered chat and voice automation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.03 }}>
              <Link
                href="/contact"
                className="inline-flex items-center bg-color hover:bg-color text-white px-6 py-3 rounded-lg font-medium"
              >
                Request Demo <ArrowRight className="ml-2" size={18} />
              </Link>
            </motion.div>
            <Link
              href="/products"
              className="inline-flex items-center border border-gray-300 hover:bg-gray-50 px-6 py-3 rounded-lg font-medium"
            >
              Explore Features
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}