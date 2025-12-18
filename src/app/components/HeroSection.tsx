'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative h-[80vh] md:h-[90vh] overflow-hidden">
      {/* Video Background - Fixed positioning and z-index */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
       <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20"></div>
      </div>

      {/* Main content container */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto text-center"
          >
            {/* Badge */}
            {/* <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-white/20"
            >
              <Zap className="w-4 h-4 text-white" />
              <span className="text-sm font-medium text-white">Enterprise-Ready Platform</span>
            </motion.div> */}

            {/* Main heading - Fixed line breaks */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Enterprise-ready
              <span className="block mt-2">
                Customer Service Automation
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-10 leading-relaxed">
              Enhance customer service with AI-powered chat and voice automation. Deploy empathetic multimodal AI agents that scale relationships that matter for your business.
            </p>

            {/* CTA Buttons - Fixed layout */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="group"
              >
                <button
                  onClick={() => {
                    const token = sessionStorage.getItem('access_token');
                    if (!token) {
                      window.dispatchEvent(new Event('open-login-modal'));
                    } else {
                      window.location.href = '/contact';
                    }
                  }}
                  className="inline-flex items-center gap-2 bg-white text-gray-900 px-6 py-3 md:px-8 md:py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg"
                >
                  <span>Build Your Agent</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
                <p className="text-sm text-white/80 mt-2">Start with a free plan</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="group"
              >
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-6 py-3 md:px-8 md:py-4 rounded-lg font-semibold hover:bg-white/20 border border-white/20 transition-all duration-300"
                >
                  <span>Explore Features</span>
                  <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                </Link>
                <p className="text-sm text-transparent mt-2">.</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      {/* <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-3 bg-white/50 rounded-full mt-2"
          />
        </div>
      </motion.div> */}
    </section>
  );
}
