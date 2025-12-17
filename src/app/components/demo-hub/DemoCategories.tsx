// src/app/components/demo-hub/DemoCategories.tsx (after renaming)
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

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
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse by Category</h2>
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <motion.button
            key={category.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveCategory(category.id)}
            className={`px-5 py-2.5 rounded-full font-medium transition-all ${activeCategory === category.id
                ? 'bg-[#0c7075] text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
          >
            <span>{category.name}</span>
            <span className={`ml-2 text-sm ${activeCategory === category.id ? 'text-[#0c7075]' : 'text-gray-500'
              }`}>
              ({category.count})
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}