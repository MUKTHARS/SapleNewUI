// src/app/components/ProductsOverview.tsx
'use client';

import { motion } from 'framer-motion';
import { Brain, Zap, Eye, Clock, Smartphone } from 'lucide-react';

export function ProductsOverview() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Custom LLMs Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="bg-blue-100 color inline-flex px-4 py-2 rounded-full mb-6">
              <Brain className="mr-2" size={18} />
              <span>Custom LLMs</span>
            </div>
            <h2 className="text-3xl font-bold mb-6">Empowering Agents with AI-Driven Assistance</h2>
            <p className="text-lg text-gray-600 mb-8">
              Agent Assist solutions leverage AI to empower customer service representatives by providing real-time insights, suggested responses, and access to knowledge bases.
            </p>
            <ul className="space-y-4">
              {[
                "Enhances efficiency and reduces resolution times",
                "Ensures consistent, high-quality support",
                "Allows agents to focus on complex interactions",
                "Integrates with existing workflows"
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="color mr-2">✓</span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gray-50 p-8 rounded-xl border border-gray-200"
          >
            <h3 className="text-xl font-semibold mb-6">Key Features</h3>
            <div className="space-y-6">
              {[
                {
                  icon: <Zap className="w-5 h-5 color" />,
                  title: "Intelligent Information Access",
                  description: "AI-driven insights and consolidated customer data"
                },
                {
                  icon: <Eye className="w-5 h-5 color" />,
                  title: "Consistent and Personalized Support",
                  description: "Unified view of customer interactions with advanced analytics"
                },
                {
                  icon: <Smartphone className="w-5 h-5 color" />,
                  title: "Unified Agent Workspace",
                  description: "Integrates all communication channels and CRM data"
                },
                {
                  icon: <Clock className="w-5 h-5 color" />,
                  title: "24/7 Support",
                  description: "Real-time AI insights and customer history access"
                }
              ].map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">{feature.icon}</div>
                  <div>
                    <h4 className="font-medium text-gray-900">{feature.title}</h4>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-color text-white rounded-xl p-12"
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Transform Your Customer Service</h2>
            <div className="grid md:grid-cols-2 gap-8 mt-8">
              {[
                "Reduce response times by up to 80%",
                "Increase customer satisfaction scores",
                "Lower operational costs by 30-50%",
                "Scale support to global markets"
              ].map((benefit, index) => (
                <div key={index} className="flex items-center">
                  <span className="bg-blue-900 rounded-full p-1 mr-3">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </span>
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}