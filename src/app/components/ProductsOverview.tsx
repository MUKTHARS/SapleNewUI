'use client';

import { motion } from 'framer-motion';
import { Bot, Brain, BarChart, MessageSquare, Zap, CheckCircle, Eye, Smartphone, Search, Heart, Calendar, Globe } from 'lucide-react';

export function ProductsOverview() {
  return (
    <section className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-[#0C7075]/10 to-transparent rounded-full blur-3xl -translate-x-32 -translate-y-32" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tr from-[#0C7075]/10 to-transparent rounded-full blur-3xl translate-x-48 translate-y-48" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          {/* <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0C7075]/10 backdrop-blur-sm border border-[#0C7075]/20 mb-6">
            <span className="text-sm font-medium text-[#0C7075]">AI Solutions</span>
          </div> */}
          <section className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Enterprise AI Platform
          </section>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Comprehensive AI capabilities for modern customer service operations
          </p>
        </motion.div>

        {/* Product Cards Grid with matching colors */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* AI Agents Card - Teal theme */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="group"
          >
            <div className="relative h-full bg-gradient-to-br from-[#0C7075]/5 via-white/90 to-white rounded-2xl border border-[#0C7075]/20 hover:border-[#0C7075]/30 hover:shadow-xl transition-all duration-300 overflow-hidden">
              {/* Card Header */}
              <div className="p-8 pb-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#0C7075] to-[#0A5A60] flex items-center justify-center">
                    <Bot className="w-7 h-7 text-white" />
                  </div>
                  <span className="px-3 py-1 bg-[#0C7075]/10 text-[#0C7075] text-xs font-semibold rounded-full border border-[#0C7075]/20">
                    Autonomous
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  AI Agents
                </h3>
                <p className="text-gray-600 mb-6">
                  Autonomous AI agents that think, act, and resolve customer issues independently.
                </p>
              </div>

              {/* Features List */}
              <div className="border-t border-gray-200/50 p-8 pt-6">
                <h4 className="text-sm font-semibold text-[#0C7075] uppercase tracking-wider mb-4">Key Capabilities</h4>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#0C7075]/10 flex items-center justify-center flex-shrink-0 border border-[#0C7075]/20">
                      <CheckCircle className="w-4 h-4 text-[#0C7075]" />
                    </div>
                    <span className="text-gray-700 text-sm">Train Agents</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#0C7075]/10 flex items-center justify-center flex-shrink-0 border border-[#0C7075]/20">
                      <MessageSquare className="w-4 h-4 text-[#0C7075]" />
                    </div>
                    <span className="text-gray-700 text-sm">Conversational Agents (Chat & Voice)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#0C7075]/10 flex items-center justify-center flex-shrink-0 border border-[#0C7075]/20">
                      <Zap className="w-4 h-4 text-[#0C7075]" />
                    </div>
                    <span className="text-gray-700 text-sm">Task & Workflow Agents</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#0C7075]/10 flex items-center justify-center flex-shrink-0 border border-[#0C7075]/20">
                      <Calendar className="w-4 h-4 text-[#0C7075]" />
                    </div>
                    <span className="text-gray-700 text-sm">Appointment & Action Agents</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Agent Assist Card - Dark teal theme */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="group"
          >
            <div className="relative h-full bg-gradient-to-br from-[#072E33]/5 via-white/90 to-white rounded-2xl border border-[#072E33]/20 hover:border-[#072E33]/30 hover:shadow-xl transition-all duration-300 overflow-hidden">
              {/* Card Header */}
              <div className="p-8 pb-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#072E33] to-[#0C7075] flex items-center justify-center">
                    <Brain className="w-7 h-7 text-white" />
                  </div>
                  <span className="px-3 py-1 bg-[#072E33]/10 text-[#072E33] text-xs font-semibold rounded-full border border-[#072E33]/20">
                    Human Assistance
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Agent Assist
                </h3>
                <p className="text-gray-600 mb-6">
                  Empower humans with real-time AI assistance for superior customer interactions.
                </p>
              </div>

              {/* Features List */}
              <div className="border-t border-gray-200/50 p-8 pt-6">
                <h4 className="text-sm font-semibold text-[#072E33] uppercase tracking-wider mb-4">Key Capabilities</h4>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#072E33]/10 flex items-center justify-center flex-shrink-0 border border-[#072E33]/20">
                      <Eye className="w-4 h-4 text-[#072E33]" />
                    </div>
                    <span className="text-gray-700 text-sm">Knowledge Assist</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#072E33]/10 flex items-center justify-center flex-shrink-0 border border-[#072E33]/20">
                      <MessageSquare className="w-4 h-4 text-[#072E33]" />
                    </div>
                    <span className="text-gray-700 text-sm">AI Response Suggestions</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#072E33]/10 flex items-center justify-center flex-shrink-0 border border-[#072E33]/20">
                      <Smartphone className="w-4 h-4 text-[#072E33]" />
                    </div>
                    <span className="text-gray-700 text-sm">AI Summaries (Chat, Voice, Email)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#072E33]/10 flex items-center justify-center flex-shrink-0 border border-[#072E33]/20">
                      <CheckCircle className="w-4 h-4 text-[#072E33]" />
                    </div>
                    <span className="text-gray-700 text-sm">Contextual Guidance</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#072E33]/10 flex items-center justify-center flex-shrink-0 border border-[#072E33]/20">
                      <Globe className="w-4 h-4 text-[#072E33]" />
                    </div>
                    <span className="text-gray-700 text-sm">Multilingual & Translation</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Conversation Intelligence Card - Blue-green theme */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="group"
          >
            <div className="relative h-full bg-gradient-to-br from-[#0A5A60]/5 via-white/90 to-white rounded-2xl border border-[#0A5A60]/20 hover:border-[#0A5A60]/30 hover:shadow-xl transition-all duration-300 overflow-hidden">
              {/* Card Header */}
              <div className="p-8 pb-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#0A5A60] to-[#0C7075] flex items-center justify-center">
                    <BarChart className="w-7 h-7 text-white" />
                  </div>
                  <span className="px-3 py-1 bg-[#0A5A60]/10 text-[#0A5A60] text-xs font-semibold rounded-full border border-[#0A5A60]/20">
                    Analytics
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Conversation Intelligence
                </h3>
                <p className="text-gray-600 mb-6">
                  Turn every conversation into actionable insights for continuous improvement.
                </p>
              </div>

              {/* Features List */}
              <div className="border-t border-gray-200/50 p-8 pt-6">
                <h4 className="text-sm font-semibold text-[#0A5A60] uppercase tracking-wider mb-4">Key Capabilities</h4>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#0A5A60]/10 flex items-center justify-center flex-shrink-0 border border-[#0A5A60]/20">
                      <BarChart className="w-4 h-4 text-[#0A5A60]" />
                    </div>
                    <span className="text-gray-700 text-sm">Conversation Analytics</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#0A5A60]/10 flex items-center justify-center flex-shrink-0 border border-[#0A5A60]/20">
                      <Search className="w-4 h-4 text-[#0A5A60]" />
                    </div>
                    <span className="text-gray-700 text-sm">Intent & Topic Discovery</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#0A5A60]/10 flex items-center justify-center flex-shrink-0 border border-[#0A5A60]/20">
                      <Heart className="w-4 h-4 text-[#0A5A60]" />
                    </div>
                    <span className="text-gray-700 text-sm">Sentiment & CX Insights</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#0A5A60]/10 flex items-center justify-center flex-shrink-0 border border-[#0A5A60]/20">
                      <Zap className="w-4 h-4 text-[#0A5A60]" />
                    </div>
                    <span className="text-gray-700 text-sm">Automation Opportunity Discovery</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#0A5A60]/10 flex items-center justify-center flex-shrink-0 border border-[#0A5A60]/20">
                      <Brain className="w-4 h-4 text-[#0A5A60]" />
                    </div>
                    <span className="text-gray-700 text-sm">AI Analyst</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
// // src/app/components/ProductsOverview.tsx
// 'use client';

// import { motion } from 'framer-motion';
// import { Brain, Zap, Eye, Clock, Smartphone, ArrowRight, Sparkles } from 'lucide-react';

// export function ProductsOverview() {
//   return (
//     <section className="py-16 bg-black relative overflow-hidden">
//       {/* Ambient background grid */}
//       <div className="absolute inset-0 opacity-[0.03]">
//         <div className="absolute inset-0" style={{
//           backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
//           backgroundSize: '50px 50px'
//         }} />
//       </div>

//       {/* Subtle radial gradient overlay */}
//       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-96 bg-gradient-radial from-white/5 to-transparent blur-3xl" />

//       <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
//         {/* Header - Reduced spacing */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           viewport={{ once: true }}
//           className="text-center mb-12"
//         >
//           <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 backdrop-blur-sm text-white/70 rounded-full text-xs font-medium mb-4 border border-white/10">
//             <Brain size={14} />
//             Custom LLMs
//           </span>
//           <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
//             Empowering Agents with<br />AI-Driven Assistance
//           </h2>
//           <p className="text-base text-white/60 max-w-2xl mx-auto leading-relaxed">
//             Agent Assist solutions leverage AI to empower customer service representatives by providing 
//             real-time insights, suggested responses, and access to knowledge bases.
//           </p>
//         </motion.div>

//         {/* Features Grid - Reduced gaps and spacing */}
//         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
//           {[
//             {
//               icon: <Zap className="w-5 h-5" />,
//               title: "Intelligent Information Access",
//               description: "AI-driven insights and consolidated customer data at your fingertips"
//             },
//             {
//               icon: <Eye className="w-5 h-5" />,
//               title: "Consistent Support",
//               description: "Unified view of customer interactions with advanced analytics"
//             },
//             {
//               icon: <Smartphone className="w-5 h-5" />,
//               title: "Unified Workspace",
//               description: "Integrates all communication channels and CRM data seamlessly"
//             },
//             {
//               icon: <Clock className="w-5 h-5" />,
//               title: "24/7 Support",
//               description: "Real-time AI insights and complete customer history access"
//             }
//           ].map((feature, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: index * 0.1 }}
//               viewport={{ once: true }}
//               className="group h-full flex flex-col relative"
//             >
//               {/* Glass card effect */}
//               <div className="relative h-full bg-white/[0.02] backdrop-blur-xl rounded-xl p-5 border border-white/10 hover:border-white/20 hover:bg-white/[0.04] transition-all duration-300">
//                 {/* Shine effect on hover */}
//                 <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
//                   <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent rounded-xl" />
//                 </div>
                
//                 <div className="relative flex flex-col h-full">
//                   <div className="w-10 h-10 bg-white/5 backdrop-blur-sm rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 flex-shrink-0 border border-white/10">
//                     <div className="text-white/90">
//                       {feature.icon}
//                     </div>
//                   </div>
//                   <h3 className="text-base font-semibold text-white mb-2 line-clamp-2">
//                     {feature.title}
//                   </h3>
//                   <p className="text-white/50 text-sm leading-relaxed flex-grow">
//                     {feature.description}
//                   </p>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {/* Value Proposition - Glass morphism design */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           viewport={{ once: true }}
//           className="relative overflow-hidden rounded-2xl"
//         >
//           {/* Glass background */}
//           <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-2xl border border-white/10" />
          
//           {/* Ambient glow */}
//           <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
//           <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

//           {/* Grid pattern overlay */}
//           <div className="absolute inset-0 opacity-[0.02]">
//             <div className="absolute inset-0" style={{
//               backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
//               backgroundSize: '30px 30px'
//             }} />
//           </div>

//           <div className="relative z-10 p-10 md:p-12">
//             <div className="max-w-4xl mx-auto">
//               <div className="flex items-center justify-center gap-2 mb-3">
//                 <Sparkles className="w-5 h-5 text-white/40" />
//                 <h3 className="text-3xl md:text-4xl font-bold text-white text-center">
//                   Transform Your Customer Service
//                 </h3>
//               </div>
//               <p className="text-white/50 text-center mb-10 text-base leading-relaxed">
//                 Deliver exceptional experiences at scale with AI-powered assistance
//               </p>

//               <div className="grid md:grid-cols-2 gap-4">
//                 {[
//                   {
//                     metric: "80%",
//                     label: "Reduction in response times"
//                   },
//                   {
//                     metric: "95%",
//                     label: "Increase in customer satisfaction"
//                   },
//                   {
//                     metric: "50%",
//                     label: "Lower operational costs"
//                   },
//                   {
//                     metric: "24/7",
//                     label: "Global support coverage"
//                   }
//                 ].map((item, index) => (
//                   <motion.div
//                     key={index}
//                     initial={{ opacity: 0, x: -20 }}
//                     whileInView={{ opacity: 1, x: 0 }}
//                     transition={{ duration: 0.5, delay: index * 0.1 }}
//                     viewport={{ once: true }}
//                     className="group flex items-center gap-4 bg-white/[0.03] backdrop-blur-sm rounded-xl p-5 border border-white/10 hover:bg-white/[0.05] hover:border-white/20 transition-all duration-300"
//                   >
//                     <div className="flex-shrink-0">
//                       <div className="text-3xl font-bold text-white">
//                         {item.metric}
//                       </div>
//                     </div>
//                     <div className="flex-1 min-w-0">
//                       <p className="text-white/50 text-sm leading-snug">
//                         {item.label}
//                       </p>
//                     </div>
//                     <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-white/40 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" />
//                   </motion.div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// }
