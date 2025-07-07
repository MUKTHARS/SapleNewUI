// components/CosmicPortal.tsx
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CosmicPortal() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3500);
    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="relative"
      >
        <div className="w-64 h-64 rounded-full border-4 border-green-400 animate-pulse">
          <div className="absolute inset-0 rounded-full bg-color-900 opacity-20 animate-ping"></div>
          <div className="absolute inset-8 rounded-full bg-color opacity-30 animate-pulse"></div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute inset-0 flex items-center justify-center color font-mono"
        >
        </motion.div>
      </motion.div>
    </div>
  );
}