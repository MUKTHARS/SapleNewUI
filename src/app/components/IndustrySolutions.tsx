// src/app/components/IndustrySolutions.tsx
'use client';

import { motion } from 'framer-motion';
import { Banknote, HeartPulse, GraduationCap, ShoppingCart } from 'lucide-react';

export function IndustrySolutions() {
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
          <h2 className="text-3xl font-bold mb-6">Customer Service AI Agents for Every Industry</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tailored solutions designed to meet the unique needs of your industry
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: <Banknote className="w-8 h-8" />,
              title: "Banking",
              description: "Streamline customer support with AI agents that handle account inquiries, loan applications, fraud detection, and transaction processing."
            },
            {
              icon: <HeartPulse className="w-8 h-8" />,
              title: "Healthcare",
              description: "Enhance patient experience through AI-powered agents that assist with appointment scheduling, health screenings, report delivery, and timely reminders."
            },
            {
              icon: <GraduationCap className="w-8 h-8" />,
              title: "Education",
              description: "Support students and faculty with AI agents that manage class scheduling, administrative queries, progress tracking, and campus services."
            },
            {
              icon: <ShoppingCart className="w-8 h-8" />,
              title: "Ecommerce",
              description: "Boost sales and customer satisfaction with AI agents that resolve queries, offer product recommendations, and drive conversions across your website, app, and messaging channels."
            }
          ].map((industry, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 p-8 rounded-xl border border-gray-200 hover:border-blue-500 transition-all"
            >
              <div className="flex items-center justify-center w-14 h-14 mb-4 rounded-lg bg-blue-100 text-blue-600 mx-auto">
                {industry.icon}
              </div>
              <h3 className="text-xl font-semibold mb-4 text-center">{industry.title}</h3>
              <p className="text-gray-600">{industry.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}