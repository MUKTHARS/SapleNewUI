// src/app/components/EnterpriseSection.tsx
'use client';

import { motion } from 'framer-motion';
import { Carousel } from './Carousel';

export function EnterpriseSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-16">AI-Driven Customer Self-Service: Smarter, Faster, Better.</h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-semibold mb-4">Tailored Experiences</h3>
            <p className="text-gray-600 mb-6">
              Bespoke experiences that build strong connections and nurture lasting customer loyalty.
            </p>

            <h3 className="text-2xl font-semibold mb-4">Humanlike Conversation</h3>
            <p className="text-gray-600 mb-6">
              Delight customers with lifelike, empathetic conversations and ultra-realistic voices powered by Generative AI.
            </p>

            <h3 className="text-2xl font-semibold mb-4">Voice and Chat Engagement</h3>
            <p className="text-gray-600 mb-6">
              Enable seamless, next-gen interactions across voice and chat, offering multimodal and omnichannel engagement.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Carousel />
          </motion.div>
        </div>
      </div>
    </section>
  );
}