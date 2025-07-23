'use client';

import { motion } from 'framer-motion';

interface BlogHeroProps {
  title: string;
  subtitle?: string;
}

export function BlogHero({ title, subtitle }: BlogHeroProps) {
  return (
    <section className="bg-gradient-to-b from-blue-50 to-white py-28">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {subtitle}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}