'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  count: number;
}

interface DemoCategoriesProps {
  categories: Category[];
}

export function DemoCategories({ categories }: DemoCategoriesProps) {
  const [activeCategory, setActiveCategory] = useState('all');

  return (
    <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Browse by Category</h2>
          <p className="text-white/60">Select a category to filter interactive demos</p>
        </div>
        <div className="flex items-center gap-2 text-white/60">
          <Filter className="w-4 h-4" />
          <span className="text-sm font-medium">{categories.find(c => c.id === activeCategory)?.count || 'All'} demos</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <motion.button
            key={category.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveCategory(category.id)}
            className={`relative px-6 py-3 rounded-xl font-medium transition-all duration-300 ${activeCategory === category.id
                ? 'bg-gradient-to-r from-[#0c7075] to-[#0a4a4d] text-white shadow-lg shadow-[#0c7075]/20'
                : 'bg-white/5 text-white/80 hover:bg-white/10 border border-white/10'
              }`}
          >
            <span className="flex items-center gap-2">
              {category.name}
              <span className={`text-sm ${activeCategory === category.id ? 'text-white/90' : 'text-white/40'
                }`}>
                ({category.count})
              </span>
            </span>
            
            {/* Active indicator */}
            {activeCategory === category.id && (
              <motion.div
                layoutId="activeCategory"
                className="absolute inset-0 rounded-xl border-2 border-[#0c7075]/30"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* Selected category info */}
      {/* <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        key={activeCategory}
        className="mt-8 pt-6 border-t border-white/10"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white mb-1">
              {categories.find(c => c.id === activeCategory)?.name || 'All Demos'}
            </h3>
            <p className="text-white/50 text-sm">
              Explore our collection of interactive demonstrations
            </p>
          </div>
          <button className="px-4 py-2 text-sm font-medium text-[#0c7075] hover:text-[#0c7075]/80 transition-colors">
            View all →
          </button>
        </div>
      </motion.div> */}
    </div>
  );
}

// // src/app/components/demo-hub/DemoCategories.tsx (after renaming)
// 'use client';

// import { useState } from 'react';
// import { motion } from 'framer-motion';

// interface Category {
//   id: string;
//   name: string;
//   count: number;
// }

// interface DemoCategoriesProps {
//   categories: Category[];
// }

// export function DemoCategories({ categories }: DemoCategoriesProps) {
//   const [activeCategory, setActiveCategory] = useState('all');

//   return (
//     <div>
//       <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse by Category</h2>
//       <div className="flex flex-wrap gap-3">
//         {categories.map((category) => (
//           <motion.button
//             key={category.id}
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             onClick={() => setActiveCategory(category.id)}
//             className={`px-5 py-2.5 rounded-full font-medium transition-all ${activeCategory === category.id
//                 ? 'bg-[#0c7075] text-white shadow-lg'
//                 : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
//               }`}
//           >
//             <span>{category.name}</span>
//             <span className={`ml-2 text-sm ${activeCategory === category.id ? 'text-[#0c7075]' : 'text-gray-500'
//               }`}>
//               ({category.count})
//             </span>
//           </motion.button>
//         ))}
//       </div>
//     </div>
//   );
// }