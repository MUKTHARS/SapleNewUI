// src/app/components/HowItWorks.tsx
'use client';

import { motion } from 'framer-motion';
import { Code, MessageSquare, RefreshCw, Users, BarChart2, CheckCircle2 } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      icon: <Code className="w-6 h-6" />,
      step: "01",
      title: "Build & Deploy your agents",
      description: "Teach your agent with your business knowledge — documents, FAQs, workflows, and tools. Define its role, connect it with your systems, and deploy it across chat or voice channels.",
      features: ["Custom knowledge base", "System integration", "Multi-channel deployment"]
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      step: "02",
      title: "AI Agent Engages With Your Customers",
      description: "Once deployed, your AI agent handles conversations automatically. It can answer queries, pull data from your systems, take actions like booking a meeting, sending reminders, or resolving common issues — all in real-time.",
      features: ["Real-time responses", "Action execution", "Context-aware conversations"]
    },
    {
      icon: <RefreshCw className="w-6 h-6" />,
      step: "03",
      title: "Continuously Improve With Feedback",
      description: "Saple's platform highlights low-confidence answers and failure points. Refine responses, train new skills, and improve accuracy with every interaction.",
      features: ["Automated feedback loops", "Performance analytics", "Continuous learning"]
    },
    {
      icon: <Users className="w-6 h-6" />,
      step: "04",
      title: "Seamlessly Escalate to Humans",
      description: "For edge cases or sensitive topics, hand off the conversation to a human agent with full context. Saple ensures a smooth transition so customers don't need to repeat themselves.",
      features: ["Context preservation", "Agent handover", "Customer satisfaction"]
    },
    {
      icon: <BarChart2 className="w-6 h-6" />,
      step: "05",
      title: "Learn From Every Conversation",
      description: "Saple automatically tracks issues, trends, and common requests. Get actionable analytics: Top customer pain points, Agent accuracy and confidence, Average resolution time, Escalation rates. Use insights to optimize both AI and human support.",
      features: ["Advanced analytics", "Performance metrics", "Actionable insights"]
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Light Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-gray-50" />
      
      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, #0ea5e9 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />

      {/* Gradient orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-sky-100/50 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-cyan-100/50 to-transparent rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
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
            className="inline-flex items-center gap-2 px-4 py-2 bg-sky-50 backdrop-blur-sm rounded-full mb-6 border border-sky-200"
          >
            <div className="w-2 h-2 bg-sky-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-sky-700">Process</span>
          </motion.div> */}

          <motion.h2
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: true }}
  className="text-4xl md:text-5xl font-bold !text-black mb-6"
>
  How it works
</motion.h2>


          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed"
          >
            A seamless journey from deployment to continuous improvement
          </motion.p>
        </motion.div>

        {/* Steps Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gradient-to-b from-transparent via-sky-200 to-transparent" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`flex items-start mb-16 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
            >
              {/* Step content */}
              <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12'}`}>
                <div className="relative">
                  {/* Step number */}
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full 
                    bg-gradient-to-br from-sky-500 to-cyan-500 text-white font-bold text-lg mb-4
                    shadow-lg shadow-sky-200`}>
                    {step.step}
                  </div>

                  {/* Content card */}
                  <div className={`bg-white rounded-2xl p-6 border border-gray-200 shadow-sm
                    hover:shadow-md hover:border-sky-100 transition-all duration-300
                    ${index % 2 === 0 ? 'ml-auto' : 'mr-auto'}`}
                    style={{ maxWidth: '400px' }}>
                    
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-sky-50 flex items-center justify-center">
                        <div className="text-sky-600">
                          {step.icon}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {step.title}
                      </h3>
                    </div>

                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {step.description}
                    </p>

                    <div className="pt-4 border-t border-gray-100">
                      <div className="space-y-2">
                        {step.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                            <span className="text-sm text-gray-600">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Center dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2">
                <div className="w-6 h-6 rounded-full bg-white border-4 border-sky-500 shadow-lg" />
              </div>

              {/* Empty space for alignment */}
              <div className="w-1/2" />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-r from-sky-50 to-cyan-50 rounded-2xl p-8 border border-sky-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to automate your customer service?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Start with a free consultation and see how Saple AI can transform your customer support.
            </p>
            <button className="px-8 py-3 bg-gradient-to-r from-sky-600 to-cyan-600 text-white rounded-xl font-medium
              shadow-lg shadow-sky-200 hover:shadow-xl hover:shadow-sky-300 transition-all duration-300">
              Get Started
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

