'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export function HeroSection() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [, setShowFallback] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFallback(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative h-[80vh] md:h-[90vh] overflow-hidden bg-black">
      {/* Video Background - Fixed positioning and z-index */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700 ${
            isVideoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoadedData={() => setIsVideoLoaded(true)}
          onError={() => setIsVideoLoaded(false)}
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Fallback background that shows immediately */}
        <div className={`absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 transition-opacity duration-500 ${
          isVideoLoaded ? 'opacity-0' : 'opacity-100'
        }`}>
          {/* Animated gradient shimmer */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -inset-[100px] bg-gradient-to-r from-transparent via-[#0C7075]/10 to-transparent animate-shimmer" />
          </div>
        </div>
        
        {/* Overlay that's always present */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/20" />
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
                  {/* <Spark  les className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" /> */}
                </Link>
                <p className="text-sm text-transparent mt-2">.</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Add CSS for shimmer animation */}
      <style jsx global>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </section>
  );
}
