'use client';

import { motion } from 'framer-motion';

export function ProductsHero() {
  return (
    <section className="relative h-[80vh] md:h-[90vh] overflow-hidden">
      {/* Video Background */}
      {/* <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/videos/products-hero.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video> */}

      {/* Overlay (Optional: darken for better text contrast) */}
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center flex flex-col justify-center h-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            AI Solutions for Enterprise Customer Service
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Transform your customer support with our cutting-edge AI platform combining Custom LLMs and Agent Assist technologies.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

