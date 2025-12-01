// src/app/components/CtaSection.tsx
'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function CtaSection() {
  return (
    <section className="py-28">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Transform Your Business?</h2>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Schedule a consultation with our AI experts to discuss your use case.
          </p>
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              href="/contact"
              className="inline-flex items-center bg-color hover:bg-color text-white px-8 py-4 rounded-lg font-medium transition-all"
            >
              Get Started <ArrowRight className="ml-2" size={20} />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}