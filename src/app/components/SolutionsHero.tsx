'use client';

import { motion } from 'framer-motion';
import { Bot, Cog, BarChart, Rocket } from 'lucide-react';

export function SolutionsHero() {
  return (
    <section className="relative overflow-hidden bg-white pt-20 md:pt-24 pb-16 md:pb-20">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0C7075]/5 via-transparent to-transparent"></div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-b from-[#0C7075]/10 to-transparent rounded-full blur-3xl -translate-y-48" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-[#0C7075]/5 to-transparent rounded-full blur-3xl translate-x-32 translate-y-32" />

      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto text-center"
        >
          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            AI Agents for<br />
            Business Automation
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Saple AI is the all-in-one platform to build and deploy AI agents that 
            support, automate, and accelerate your business processes with 
            enterprise-grade intelligence.
          </p>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-12"
          >
            {[
              { value: "99.9%", label: "Accuracy", icon: Cog },
              { value: "24/7", label: "Availability", icon: Bot },
              { value: "10x", label: "Efficiency", icon: BarChart },
              { value: "1M+", label: "Processed Tasks", icon: Rocket }
            ].map((stat, index) => (
              <div key={index} className="group">
                <div className="relative z-10 flex flex-col items-center text-center p-6 bg-white rounded-xl border border-gray-200 hover:border-[#0C7075]/30 hover:shadow-md transition-all duration-300">
                  <div className="w-12 h-12 bg-[#0C7075]/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className="w-5 h-5 text-[#0C7075]" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm font-medium text-gray-700">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Divider */}
          <div className="mt-16 mb-12">
            <div className="flex items-center justify-center">
              <div className="w-20 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
              <div className="mx-4 text-sm text-gray-500">AI-Powered Solutions</div>
              <div className="w-20 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            </div>
          </div>

          {/* Feature Highlights */}
          <div className="max-w-3xl mx-auto">
            <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">What Makes Us Different</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-lg font-semibold text-[#0C7075] mb-2">No-Code Setup</div>
                  <div className="text-sm text-gray-600">Deploy in minutes without technical expertise</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-[#0C7075] mb-2">Custom Workflows</div>
                  <div className="text-sm text-gray-600">Tailor AI agents to your specific processes</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-[#0C7075] mb-2">Real-time Analytics</div>
                  <div className="text-sm text-gray-600">Monitor performance and optimize continuously</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// 'use client';

// import { motion } from 'framer-motion';

// export function SolutionsHero() {
//   return (
//     <section className="relative h-[80vh] md:h-[90vh] overflow-hidden">
//       {/* Video Background */}
//       <video
//         autoPlay
//         loop
//         muted
//         playsInline
//         className="absolute top-0 left-0 w-full h-full object-cover"
//       >
//         <source src="/videos/video.mp4" type="video/mp4" />
//         Your browser does not support the video tag.
//       </video>

//       {/* Dark overlay for better text contrast */}
//       <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>

//       {/* Subtle grid pattern */}
//       <div className="absolute inset-0 opacity-[0.02]">
//         <div className="absolute inset-0" style={{
//           backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
//           backgroundSize: '80px 80px'
//         }} />
//       </div>

//       {/* Content */}
//       <div className="relative z-10 container mx-auto px-4 text-center flex flex-col justify-center h-full">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="max-w-5xl mx-auto"
//         >
//           <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
//             <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-[#0C7075] to-[#072E33]">
//               AI Agents for<br />
//               Business Automation
//             </span>
//           </h1>
          
//           <motion.p
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.3 }}
//             className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed"
//           >
//             Saple AI is the all-in-one platform to build and deploy AI agents that 
//             support, automate, and accelerate your business processes with 
//             enterprise-grade intelligence.
//           </motion.p>

//           {/* Stats Bar */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.4 }}
//             className="mt-12 flex flex-wrap justify-center gap-8"
//           >
//             {[
//               { value: "99.9%", label: "Accuracy" },
//               { value: "24/7", label: "Availability" },
//               { value: "10x", label: "Efficiency Gain" },
//               { value: "1M+", label: "Processed Tasks" }
//             ].map((stat, index) => (
//               <div key={index} className="text-center">
//                 <div className="text-2xl md:text-3xl font-bold text-white mb-1">
//                   {stat.value}
//                 </div>
//                 <div className="text-sm text-white/50 font-medium">
//                   {stat.label}
//                 </div>
//               </div>
//             ))}
//           </motion.div>
//         </motion.div>
//       </div>
//     </section>
//   );
// }