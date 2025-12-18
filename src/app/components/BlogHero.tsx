'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock, User, BookOpen } from 'lucide-react';

interface BlogHeroProps {
  title: string;
  subtitle?: string;
  date?: string;
  author?: string;
  readTime?: string;
}

export function BlogHero({ 
  title, 
  subtitle, 
  date = 'November 30, 2024',
  author = 'AI Research Team',
  readTime = '5 min read'
}: BlogHeroProps) {
  return (
    <section className="relative h-[70vh] md:h-[80vh] overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* Glow Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-96 bg-gradient-radial from-[#0c7075]/20 via-transparent to-transparent blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#0c7075]/10 to-transparent blur-3xl" />

      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl w-full"
        >
          {/* Category Badge */}
          {/* <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full mb-8 border border-white/10"
          >
            <Sparkles className="w-4 h-4 text-[#0c7075]" />
            <span className="text-sm font-medium text-white/80">AI Insights</span>
          </motion.div> */}

          {/* Main Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
            {title}
          </h1>

          {/* Subtitle */}
          {subtitle && (
            <p className="text-xl md:text-2xl text-white/70 mb-12 leading-relaxed max-w-3xl mx-auto">
              {subtitle}
            </p>
          )}

          {/* Article Metadata */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap justify-center items-center gap-6 text-white/60"
          >
            {/* Date */}
            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-lg">
              <Calendar className="w-4 h-4 text-[#0c7075]" />
              <span className="text-sm font-medium">{date}</span>
            </div>

            {/* Author */}
            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-lg">
              <User className="w-4 h-4 text-[#0c7075]" />
              <span className="text-sm font-medium">{author}</span>
            </div>

            {/* Read Time */}
            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-lg">
              <Clock className="w-4 h-4 text-[#0c7075]" />
              <span className="text-sm font-medium">{readTime}</span>
            </div>

            {/* Category */}
            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-lg">
              <BookOpen className="w-4 h-4 text-[#0c7075]" />
              <span className="text-sm font-medium">Technology</span>
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          {/* <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <div className="flex flex-col items-center gap-2">
              <span className="text-sm text-white/40">Scroll to read</span>
              <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center">
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="w-1 h-3 bg-white/40 rounded-full mt-2"
                />
              </div>
            </div>
          </motion.div> */}
        </motion.div>
      </div>
    </section>
  );
}

// 'use client';

// import { motion } from 'framer-motion';

// interface BlogHeroProps {
//   title: string;
//   subtitle?: string;
// }

// export function BlogHero({ title, subtitle }: BlogHeroProps) {
//   return (
//     <section className="bg-gradient-to-b from-blue-50 to-white py-28">
//       <div className="container mx-auto px-4 text-center">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//         >
//           <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
//             {title}
//           </h1>
//           {subtitle && (
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//               {subtitle}
//             </p>
//           )}
//         </motion.div>
//       </div>
//     </section>
//   );
// }