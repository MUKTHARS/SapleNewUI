// src/app/components/StatsSection.tsx
'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Cpu, Target, BarChart3 } from 'lucide-react';

export function StatsSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-blue-50/90 via-sky-50 to-cyan-50/80 relative overflow-hidden">
      {/* Subtle background texture - Same as KeyCapabilities */}
      <div className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%230ea5e9' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundSize: '400px 400px'
        }}
      />

      {/* Light gradient orbs for depth - Same as KeyCapabilities */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-sky-200/20 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-cyan-200/15 to-transparent rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header - Matching KeyCapabilities style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          {/* <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-sky-200/50 shadow-sm mb-6">
            <div className="w-2 h-2 bg-sky-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-sky-800">Proven Results</span>
          </div> */}
          <section className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Boost Your Bottom Line with AI
          </section>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Future proof your processes and stay on the cutting-edge of technology. Optimize customer experience by deploying smart, AI-enabled automation services.
          </p>
        </motion.div>

        {/* Stats Grid - Glass cards like KeyCapabilities */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { 
              value: "96%", 
              label: "Intent Understanding Accuracy",
              icon: <Cpu className="w-6 h-6" />,
              color: "from-green-500/10 to-emerald-500/10",
              textColor: "text-green-600",
              iconBg: "from-green-50 to-emerald-50"
            },
            { 
              value: "70%", 
              label: "Less Development Effort",
              icon: <Target className="w-6 h-6" />,
              color: "from-blue-500/10 to-cyan-500/10",
              textColor: "text-blue-600",
              iconBg: "from-blue-50 to-cyan-50"
            },
            { 
              value: "91%", 
              label: "Task Completion Rate (TCR)",
              icon: <BarChart3 className="w-6 h-6" />,
              color: "from-purple-500/10 to-pink-500/10",
              textColor: "text-purple-600",
              iconBg: "from-purple-50 to-pink-50"
            },
            { 
              value: "30%", 
              label: "Average Containment Increase",
              icon: <TrendingUp className="w-6 h-6" />,
              color: "from-amber-500/10 to-orange-500/10",
              textColor: "text-amber-600",
              iconBg: "from-amber-50 to-orange-50"
            }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative h-full"
            >
              {/* Premium Glass Card - Same as KeyCapabilities */}
              <div className="relative h-full rounded-2xl p-6 overflow-hidden transition-all duration-500
                /* Glass base */
                bg-gradient-to-br from-white/90 via-white/70 to-white/90
                backdrop-blur-md
                /* Borders for glass effect */
                border border-white/80
                border-t-white/90
                border-l-white/90
                /* Sophisticated shadows like kore.ai */
                shadow-[0_8px_32px_rgba(14,165,233,0.08)]
                shadow-sky-200/30
                /* Inner shadow for depth */
                before:absolute before:inset-0 before:rounded-2xl before:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.6),inset_0_-1px_0_0_rgba(14,165,233,0.1)]
                /* Hover effects */
                hover:shadow-[0_20px_50px_rgba(14,165,233,0.15)]
                hover:shadow-sky-300/40
                hover:scale-[1.02]
                hover:bg-gradient-to-br from-white via-white/85 to-white
                hover:border-white
                hover:before:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.8),inset_0_-1px_0_0_rgba(14,165,233,0.15)]">
                
                {/* Gradient reflection layer */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(
                      135deg,
                      rgba(14, 165, 233, 0.03) 0%,
                      rgba(56, 189, 248, 0.02) 50%,
                      rgba(6, 182, 212, 0.01) 100%
                    )`
                  }}
                />

                <div className="relative z-10 flex flex-col h-full">
                  {/* Icon with subtle glass effect */}
                  <div className={`w-14 h-14 rounded-xl mb-5
  bg-gradient-to-br from-white to-sky-50
  shadow-[0_4px_12px_rgba(12,112,117,0.1)]
  border border-white/80
  flex items-center justify-center
  group-hover:scale-110
  group-hover:shadow-[0_8px_24px_rgba(12,112,117,0.15)]
  transition-all duration-300`}>
  <div className="text-[#0C7075] group-hover:text-[#072E33]">
    {stat.icon}
  </div>
</div>

                  {/* Stat value */}
                 <div className={`text-4xl md:text-3xl font-bold text-[#0C7075] mb-3`}>
  {stat.value}
</div>

                  {/* Stat label */}
                  <div className="text-lg font-semibold text-gray-900 mb-3">
                    {stat.label}
                  </div>

                  {/* Description or additional info could go here */}
                  <div className="mt-auto pt-4">
                    <div className="flex items-center gap-2 border-t border-gray-100 group-hover:border-sky-100 transition-colors">
                      <div className="flex-1">
                        <div className="h-px bg-gradient-to-r from-transparent via-sky-200/30 to-transparent 
                          group-hover:via-sky-300/50 transition-all duration-500" />
                      </div>
                      {/* <div className="text-xs font-medium text-sky-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Industry benchmark
                      </div> */}
                      {/* <svg className="w-4 h-4 text-sky-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" 
                        fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg> */}
                    </div>
                  </div>
                </div>

                {/* Edge highlight for premium look */}
                <div className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 border border-sky-100/50 rounded-2xl shadow-[0_0_0_1px_rgba(255,255,255,0.8)_inset]" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Optional: Additional context */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          {/* <p className="text-gray-500 text-sm italic">
            Based on average results from enterprise deployments over 12 months
          </p> */}
        </motion.div>
      </div>
    </section>
  );
}