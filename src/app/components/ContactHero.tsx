'use client';

import { motion } from 'framer-motion';
import { Mail, Clock, Users } from 'lucide-react';

export function ContactHero() {
  return (
    <section className="relative h-[80vh] md:h-[90vh] overflow-hidden bg-black pt-20 md:pt-24">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover opacity-40"
      >
        <source src="/videos/video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark overlay for better text readability */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Glow Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-96 bg-gradient-radial from-[#0C7075]/30 via-transparent to-transparent blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#0C7075]/20 to-transparent blur-3xl" />

      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-6xl w-full"
        >
          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-[#0C7075] to-[#072E33]">
              Contact Our Team
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto mb-12 leading-relaxed font-light">
            Have questions about our AI solutions? Reach out and we&apos;ll get back to you within 24 hours.
          </p>

          {/* Contact Stats - Original icon sizes with more spacing */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto mt-8"
          >
            {/* Response Time */}
            <div className="group relative bg-white/[0.08] backdrop-blur-xl rounded-xl p-5 border border-white/20 hover:border-[#0C7075]/30 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-[#0C7075]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-500" />
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-[#0C7075]/20 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                  <Clock className="w-6 h-6 text-[#0C7075]" />
                </div>
                <div className="text-sm font-medium text-white/80 mb-1">Response Time</div>
                <div className="text-2xl font-bold text-white">24 Hours</div>
              </div>
            </div>
            
            {/* Expert Support */}
            <div className="group relative bg-white/[0.08] backdrop-blur-xl rounded-xl p-5 border border-white/20 hover:border-[#0C7075]/30 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-[#0C7075]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-500" />
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-[#0C7075]/20 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-6 h-6 text-[#0C7075]" />
                </div>
                <div className="text-sm font-medium text-white/80 mb-1">Expert Support</div>
                <div className="text-2xl font-bold text-white">AI Specialists</div>
              </div>
            </div>
            
            {/* Free Consultation */}
            <div className="group relative bg-white/[0.08] backdrop-blur-xl rounded-xl p-5 border border-white/20 hover:border-[#0C7075]/30 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-[#0C7075]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-500" />
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-[#0C7075]/40 to-[#072E33]/40 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div className="text-sm font-medium text-white/80 mb-1">Free Consultation</div>
                <div className="text-2xl font-bold text-white">No Cost</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}