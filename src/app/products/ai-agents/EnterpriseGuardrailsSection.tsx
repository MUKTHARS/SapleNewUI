// src/app/products/ai-agents/EnterpriseGuardrailsSection.tsx
'use client';

import { motion } from 'framer-motion';
import { Lock, Shield, AlertCircle, Monitor } from 'lucide-react';

export function EnterpriseGuardrailsSection() {
  const features = [
    {
      icon: Lock,
      title: 'Data Privacy',
      description: 'End-to-end encryption and compliance'
    },
    {
      icon: Shield,
      title: 'Policy Enforcement',
      description: 'Configurable guardrails and rules'
    },
    {
      icon: AlertCircle,
      title: 'Risk Detection',
      description: 'Real-time anomaly monitoring'
    },
    {
      icon: Monitor,
      title: 'Supervisory Models',
      description: 'Continuous oversight and control'
    }
  ];

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Enterprise guardrails to deploy with confidence
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Protect your business and your customers with system-level safeguards
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-gray-300 leading-relaxed">
              Protect your business and your customers with system-level safeguards designed for 
              enterprise environments. Saple AI provides configurable guardrails, supervisory models, 
              and continuous real-time monitoring to ensure AI Agents operate safely, compliantly, and as intended.
            </p>
            
            <p className="text-gray-300 leading-relaxed">
              From data privacy to policy enforcement, Saple&rsquo;s security-first architecture ensures 
              your AI Agents are always production-ready.
            </p>
{/*             
            <div className="bg-gradient-to-br from-gray-900/50 to-black/50 rounded-xl p-6 border border-gray-800">
              <div className="text-lg font-semibold text-white mb-2">
                Compliance Standards
              </div>
              <div className="text-sm text-gray-400">
                GDPR, SOC 2, HIPAA, ISO 27001 ready
              </div>
            </div> */}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 gap-6"
          >
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-900/50 to-black/50 rounded-xl p-6 border border-gray-800 hover:border-gray-700 transition-colors duration-300"
              >
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-400">{feature.description}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}