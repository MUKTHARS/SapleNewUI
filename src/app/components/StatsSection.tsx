// src/app/components/StatsSection.tsx
'use client';

import { motion } from 'framer-motion';

const stats = [
  { value: "96%", label: "Intent Understanding Accuracy" },
  { value: "70%", label: "Less Development Effort" },
  { value: "91%", label: "Task Completion Rate (TCR)" },
  { value: "30%", label: "Average Containment Increase" }
];

export function StatsSection() {
  return (
    <section className="py-20 bg-color text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-16">Boost your bottom line with AI</h2>
        <p className="text-xl text-center max-w-3xl mx-auto mb-16">
          Future proof your processes and stay on the cutting-edge of technology. Optimize customer experience by deploying smart, AI-enabled automation services.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl font-bold mb-2">{stat.value}</div>
              <div className="text-lg">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}