// components/dropdown/SolutionsDropdown.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export function SolutionsDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Industry solutions
  const industrySolutions = [
    {
      title: 'BFSI',
      href: '/solutions/bfsi',
      description: 'Solutions for banking financial services & insurance industry',
      icon: '',
    },
    {
      title: 'Healthcare',
      href: '/solutions/healthcare',
      description: 'Solutions for healthcare and pharmaceuticals industry',
      icon: '',
    },
    {
      title: 'Utilities',
      href: '/solutions/utilities',
      description: 'Solutions for oil, gas and utility industry',
      icon: '',
    },
    {
      title: 'Retail',
      href: '/solutions/retail',
      description: 'Solution for retail and e-commerce industry',
      icon: '',
    },
    {
      title: 'Other Industries',
      href: '/solutions/other-industries',
      description: 'Dynamic AI solutions for every industry',
      icon: '',
    },
  ];

  return (
    <div 
      ref={dropdownRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Trigger Button */}
      <button
        onClick={handleClick}
        className={`px-2 py-1 text-sm font-medium rounded-md transition-all flex items-center gap-1 ${
          isOpen
            ? 'text-white bg-white/10'
            : 'text-white/80 hover:text-white hover:bg-white/5'
        }`}
      >
        Solutions
        <motion.svg
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="w-3 h-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </button>

      {/* Dropdown Menu - Light Theme with different styling */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute left-1/2 transform -translate-x-1/2 top-full mt-2 w-[350px] max-w-[90vw] bg-gradient-to-b from-blue-50 to-indigo-50 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] backdrop-blur-[20px] border border-blue-100 rounded-[12px] overflow-hidden z-50"
            // className="absolute left-1/2 transform -translate-x-1/2 top-full mt-2 w-[400px] max-w-[90vw] bg-gradient-to-b from-blue-50 to-indigo-50 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] backdrop-blur-[20px] border border-blue-100 rounded-[12px] overflow-hidden z-50"
            style={{
              boxShadow: '0 20px 60px -15px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.1)'
            }}
          >
            {/* Header with different styling */}
<div className="p-4">
  <div className="mb-4">
    <div className="flex items-center gap-2 mb-2">
      <h3 className="text-[10px] font-semibold text-blue-600 uppercase tracking-[0.15em]">
        By Industry
      </h3>
    </div>
    <p className="text-slate-700 text-[13px] font-medium">
      Industry-specific AI solutions powered by Saple.ai
    </p>
  </div>

  {/* Single column layout with 5 rows */}
  <div className="space-y-1">
    {industrySolutions.map((industry, index) => (
      <div key={index} className="group">
        <Link
          href={industry.href}
          className="block px-3 py-2 rounded-md transition-all duration-200 hover:bg-white/70 hover:shadow-sm"
          onClick={() => setIsOpen(false)}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0 pr-2">
              <h4 className="text-slate-800 font-semibold text-[13px] mb-0.5 group-hover:text-blue-700 transition-colors truncate">
                {industry.title}
              </h4>
              <p className="text-slate-600 text-[11px] leading-tight line-clamp-1">
                {industry.description}
              </p>
            </div>
            <svg 
              className="w-3 h-3 text-blue-400 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-0.5 transition-all duration-200 flex-shrink-0" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Link>
      </div>
    ))}
  </div>
</div>

            {/* Footer with different gradient */}
            <div className="px-5 py-3 bg-gradient-to-r from-blue-100/70 to-indigo-100/70 border-t border-blue-100">
            {/* <div className="px-6 py-4 bg-gradient-to-r from-blue-100/70 to-indigo-100/70 border-t border-blue-100"> */}
              <div className="text-slate-600 text-[12px] font-medium">
                Custom AI solutions for every business need
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
