'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

type HoloElement = {
  left: string;
  top: string;
  initialX: number;
  initialY: number;
  animateX: number;
  animateY: number;
  duration: number;
};

export function HolographicFooter() {
  const [holoElements, setHoloElements] = useState<HoloElement[]>([]);

  useEffect(() => {
    const elements = Array.from({ length: 3 }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 50}%`,
      initialX: Math.random() * 60 - 30,
      initialY: Math.random() * 60 - 30,
      animateX: Math.random() * 60 - 30,
      animateY: Math.random() * 60 - 30,
      duration: 15 + Math.random() * 20,
    }));
    setHoloElements(elements);
  }, []);

  return (
    <footer className="relative overflow-hidden border-t border-green-400/20 mt-12 h-40">
      <div className="container mx-auto px-4 py-6 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="border-t border-green-400/10 mt-6 pt-4 text-center text-gray-500 font-mono text-xs tracking-wider"
        >
          <p>SYSTEM STATUS: ONLINE | © {new Date().getFullYear()} SAPLE.AI</p>
          <p className="mt-1">ALL SYSTEMS OPERATIONAL</p>
        </motion.div>
      </div>

      {holoElements.map((el, i) => (
        <motion.div
          key={i}
          initial={{ x: el.initialX, y: el.initialY, opacity: 0.3 }}
          animate={{
            x: el.animateX,
            y: el.animateY,
            transition: {
              duration: el.duration,
              repeat: Infinity,
              repeatType: 'reverse'
            }
          }}
          className="absolute w-16 h-16 border border-green-400/20 rounded-full pointer-events-none"
          style={{ left: el.left, top: el.top }}
        />
      ))}
    </footer>
  );
}