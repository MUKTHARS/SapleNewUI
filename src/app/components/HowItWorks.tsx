// src/app/components/HowItWorks.tsx
'use client';

import { motion } from 'framer-motion';
import { Code, MessageSquare, RefreshCw, Users, BarChart2 } from 'lucide-react';

export function HowItWorks() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-6">Integrate AI Agents With Your Support Stack</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Seamless integration with your existing tools and workflows
          </p>
        </motion.div> */}

        <div className="max-w-4xl mx-auto">
          {[
            {
              icon: <Code className="w-6 h-6" />,
              step: "01",
              title: "Build & Deploy your agents",
              description: "Teach your agent with your business knowledge — documents, FAQs, workflows, and tools. Define its role, connect it with your systems, and deploy it across chat or voice channels."
            },
            {
              icon: <MessageSquare className="w-6 h-6" />,
              step: "02",
              title: "AI Agent Engages With Your Customers",
              description: "Once deployed, your AI agent handles conversations automatically. It can answer queries, pull data from your systems, take actions like booking a meeting, sending reminders, or resolving common issues — all in real-time."
            },
            {
              icon: <RefreshCw className="w-6 h-6" />,
              step: "03",
              title: "Continuously Improve With Feedback",
              description: "Saple's platform highlights low-confidence answers and failure points. Refine responses, train new skills, and improve accuracy with every interaction."
            },
            {
              icon: <Users className="w-6 h-6" />,
              step: "04",
              title: "Seamlessly Escalate to Humans",
              description: "For edge cases or sensitive topics, hand off the conversation to a human agent with full context. Saple ensures a smooth transition so customers don't need to repeat themselves."
            },
            {
              icon: <BarChart2 className="w-6 h-6" />,
              step: "05",
              title: "Learn From Every Conversation",
              description: "Saple automatically tracks issues, trends, and common requests. Get actionable analytics: Top customer pain points, Agent accuracy and confidence, Average resolution time, Escalation rates. Use insights to optimize both AI and human support."
            }
          ].map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-blue-100 text-blue-600 rounded-full w-10 h-10 flex items-center justify-center mr-6 mt-1">
                  <span className="font-bold">{step.step}</span>
                </div>
                <div>
                  <div className="flex items-center mb-2">
                    <div className="mr-3 text-blue-600">{step.icon}</div>
                    <h3 className="text-xl font-semibold">{step.title}</h3>
                  </div>
                  <p className="text-gray-600 ml-9">{step.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}