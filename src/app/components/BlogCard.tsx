'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Calendar, Clock, ExternalLink } from 'lucide-react';

interface BlogCardProps {
  slug: string;
  title: string;
  description: string;
  date: string;
}

export function BlogCard({ slug, title, description, date }: BlogCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      className="group relative h-full"
    >
      {/* Glass Card - matches your existing design */}
      <div className="relative h-full rounded-2xl overflow-hidden transition-all duration-500
        /* Glass base */
        bg-gradient-to-br from-white/90 via-white/70 to-white/90
        backdrop-blur-md
        /* Borders for glass effect */
        border border-white/80
        border-t-white/90
        border-l-white/90
        /* Sophisticated shadows */
        shadow-[0_8px_32px_rgba(14,165,233,0.08)]
        shadow-sky-200/30
        /* Inner shadow for depth */
        before:absolute before:inset-0 before:rounded-2xl before:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.6),inset_0_-1px_0_0_rgba(12,112,117,0.1)]
        /* Hover effects */
        hover:shadow-[0_20px_50px_rgba(12,112,117,0.15)]
        hover:shadow-[#0c7075]/40
        hover:scale-[1.02]
        hover:bg-gradient-to-br from-white via-white/85 to-white
        hover:border-white
        hover:before:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.8),inset_0_-1px_0_0_rgba(12,112,117,0.15)]">
        
        {/* Green reflection layer */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(
              135deg,
              rgba(12, 112, 117, 0.03) 0%,
              rgba(12, 112, 117, 0.02) 50%,
              rgba(12, 112, 117, 0.01) 100%
            )`
          }}
        />

        <div className="relative z-10 p-8 h-full flex flex-col">
          {/* Category badge */}
          <div className="inline-flex items-center gap-1.5 self-start mb-4 px-3 py-1.5 bg-[#0c7075]/10 text-[#0c7075] rounded-full text-xs font-medium">
            <span className="w-1.5 h-1.5 bg-[#0c7075] rounded-full"></span>
            <span>AI Insights</span>
          </div>

          {/* Title */}
          <h2 className="text-xl font-bold text-gray-900 mb-4 line-clamp-2">
  <Link href={`/blog/${slug}`} className="hover:no-underline text-gray-900 hover:text-gray-900">
    {title}
  </Link>
</h2>

          {/* Description */}
          <p className="text-gray-600 mb-6 flex-grow line-clamp-3 leading-relaxed">
            {description}
          </p>

          {/* Footer with date and read time */}
          <div className="mt-auto pt-6 border-t border-gray-100 group-hover:border-[#0c7075]/20 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-sm text-gray-500">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  5 min read
                </span>
              </div>
              
              <Link
                href={`/blog/${slug}`}
                className="inline-flex items-center gap-2 text-[#0c7075] font-medium hover:text-[#0a4a4d] transition-colors group/read"
              >
                <span>Read article</span>
                <ArrowRight className="w-4 h-4 group-hover/read:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </div>

        {/* Edge highlight for premium look */}
        <div className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 border border-[#0c7075]/20 rounded-2xl shadow-[0_0_0_1px_rgba(255,255,255,0.8)_inset]" />
        </div>
      </div>

      {/* Hover indicator */}
      <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-br from-[#0c7075] to-[#0a4a4d] flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <ExternalLink className="w-3 h-3 text-white" />
      </div>
    </motion.article>
  );
}

// // src/app/components/BlogCard.tsx
// 'use client';

// // import { motion } from 'framer-motion';
// import Link from 'next/link';
// import { ArrowRight } from 'lucide-react';

// interface BlogCardProps {
//   slug: string;
//   title: string;
//   description: string;
//   date: string;
// }

// export function BlogCard({ slug, title, description, date }: BlogCardProps) {
//   return (
//     <article className="group h-full bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
//       <div className="p-6 h-full flex flex-col">

//         <h2 className="text-xl font-bold text-gray-900 mb-3">
//           <Link href={`/blog/${slug}`} className="hover:text-blue-600 transition-colors">
//             {title}
//           </Link>
//         </h2>

//         <p className="text-gray-600 mb-4 flex-grow">{description}</p>

//         <div className="flex items-center justify-between text-sm text-gray-500">
//           <span>{date}</span>
//         </div>

//         <Link
//           href={`/blog/${slug}`}
//           className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors group-hover:translate-x-1"
//         >
//           Read article <ArrowRight className="ml-1" size={16} />
//         </Link>
//       </div>
//     </article>
//   );
// }