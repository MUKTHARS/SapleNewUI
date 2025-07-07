// src/app/components/KeyCapabilities.tsx
'use client';

import { motion } from 'framer-motion';
import { MessageSquare, Phone, Mail, Server, Shield, Search, BarChart } from 'lucide-react';

export function KeyCapabilities() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-6">Key Capabilities</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive features that power both self-service and agent-assisted customer interactions
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[
            { icon: <MessageSquare className="w-6 h-6" />, name: "Text & Instant Messaging" },
            { icon: <Phone className="w-6 h-6" />, name: "Voice AI" },
            { icon: <Mail className="w-6 h-6" />, name: "Email Automation" },
            { icon: <Server className="w-6 h-6" />, name: "Integrations" },
            { icon: <Shield className="w-6 h-6" />, name: "Data Security & Compliance" },
            { icon: <Search className="w-6 h-6" />, name: "Knowledge Search" },
            { icon: <BarChart className="w-6 h-6" />, name: "Analytics & Reporting" }
          ].map((capability, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-green-500 transition-all"
            >
              <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-blue-100 color mx-auto">
                {capability.icon}
              </div>
              <h4 className="text-lg font-semibold text-center">{capability.name}</h4>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}