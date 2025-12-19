// src/app/components/IndustrySolutions.tsx
'use client';

import { motion } from 'framer-motion';
import { Banknote, HeartPulse, GraduationCap, ShoppingCart } from 'lucide-react';
import { useState } from 'react';

export function IndustrySolutions() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const industries = [
    {
      icon: <Banknote className="w-7 h-7" />,
      title: "Banking & Finance",
      description: "Streamline customer support with AI agents that handle account inquiries, loan applications, fraud detection, and transaction processing.",
      features: ["Secure transactions", "Compliance automation", "24/7 customer service", "Fraud prevention"],
      color: "from-blue-500/20 to-blue-600/10"
    },
    {
      icon: <HeartPulse className="w-7 h-7" />,
      title: "Healthcare",
      description: "Enhance patient experience through AI-powered agents that assist with appointment scheduling, health screenings, report delivery, and timely reminders.",
      features: ["HIPAA compliant", "Patient triage", "Appointment automation", "Medical Q&A"],
      color: "from-green-500/20 to-green-600/10"
    },
    {
      icon: <GraduationCap className="w-7 h-7" />,
      title: "Education",
      description: "Support students and faculty with AI agents that manage class scheduling, administrative queries, progress tracking, and campus services.",
      features: ["Student onboarding", "Course assistance", "FAQ automation", "24/7 support"],
      color: "from-purple-500/20 to-purple-600/10"
    },
    {
      icon: <ShoppingCart className="w-7 h-7" />,
      title: "E-commerce & Retail",
      description: "Boost sales and customer satisfaction with AI agents that resolve queries, offer product recommendations, and drive conversions across all channels.",
      features: ["Order management", "Product recommendations", "Cart recovery", "Multilingual support"],
      color: "from-orange-500/20 to-orange-600/10"
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Dark Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-gray-900" />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* Gradient orbs */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-green-500/10 to-transparent rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          {/* <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full mb-6 border border-white/10"
          >
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-white/80">Industry Solutions</span>
          </motion.div> */}

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight"
          >
            AI-Powered Solutions for<br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">
              Every Industry
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-white/60 max-w-2xl mx-auto leading-relaxed"
          >
            Tailored AI solutions designed to meet the unique challenges and opportunities of your industry
          </motion.p>
        </motion.div>

        {/* Industry Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {industries.map((industry, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Glass card */}
              <div className="relative h-full rounded-2xl overflow-hidden transition-all duration-500
                bg-white/[0.03] backdrop-blur-xl
                border border-white/10
                hover:border-white/20
                hover:bg-white/[0.05]">
                
                {/* Gradient overlay */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
                  bg-gradient-to-br ${industry.color}`} />

                {/* Content */}
                <div className="relative z-10 p-8">
                  {/* Icon and Title */}
                  <div className="flex items-start gap-4 mb-6">
                    <div className="flex-shrink-0">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${industry.color} backdrop-blur-sm
                        flex items-center justify-center border border-white/10
                        group-hover:scale-110 transition-transform duration-300`}>
                        <div className="text-white">
                          {industry.icon}
                        </div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">
                        {industry.title}
                      </h3>
                      <p className="text-white/60 text-sm leading-relaxed">
                        {industry.description}
                      </p>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-6">
                    <div className="grid grid-cols-2 gap-2">
                      {industry.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-white/30 rounded-full" />
                          <span className="text-sm text-white/50">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="flex items-center justify-between pt-6 border-t border-white/10">
                    {/* <span className="text-sm font-medium text-white/40 group-hover:text-white/60 transition-colors">
                      Learn more
                    </span> */}
                    {/* <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-white/60 group-hover:translate-x-1 transition-all duration-300" /> */}
                  </div>
                </div>

                {/* Hover effect overlay */}
                {hoveredIndex === index && (
                  <motion.div
                    layoutId="industry-highlight"
                    className="absolute inset-0 border border-white/20 rounded-2xl pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  />
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-white/50 mb-6">
            Don&apos;t see your industry? We build custom solutions.
          </p>
          <button className="px-8 py-3 bg-white/10 backdrop-blur-sm text-white rounded-xl font-medium
            border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-300">
            Contact Our Experts
          </button>
        </motion.div>
      </div>
    </section>
  );
}
