// src/app/components/UseCasesSection.tsx
'use client';

import { motion } from 'framer-motion';
import { Zap, BookOpen, Languages, UserCheck } from 'lucide-react';

export function UseCasesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-6">Empower Your Agents with the Superpowers of Agentic Copilot</h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Transform your customer service operations with AI that enhances both agent performance and customer satisfaction.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-gray-50 p-6 rounded-xl border border-gray-200"
          >
            <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-blue-100 color">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Supercharge Agent Efficiency</h3>
            <p className="text-gray-600">
              Boost workforce efficiency with AI-driven real-time coaching and automated post-call summaries.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-gray-50 p-6 rounded-xl border border-gray-200"
          >
            <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-blue-100 color">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Instant Knowledge Access</h3>
            <p className="text-gray-600">
              Ensure agents can instantly tap into essential knowledge and resources with ease.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-gray-50 p-6 rounded-xl border border-gray-200"
          >
            <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-blue-100 color">
              <Languages className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Real-Time Multilingual Support</h3>
            <p className="text-gray-600">
              Empower teams to serve customers in any language with real-time AI translation.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-gray-50 p-6 rounded-xl border border-gray-200"
          >
            <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-blue-100 color">
              <UserCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Elevate Customer Experience</h3>
            <p className="text-gray-600">
              Provide fast, accurate responses – eliminating the need for customers to repeat themselves.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}