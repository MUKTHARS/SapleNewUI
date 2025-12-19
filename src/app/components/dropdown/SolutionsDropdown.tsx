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
      items: [
        { name: 'Banking Solutions' },
        { name: 'Financial Services' },
        { name: 'Insurance Solutions' },
        { name: 'Wealth Management' },
      ]
    },
    {
      title: 'Healthcare',
      href: '/solutions/healthcare',
      description: 'Solutions for healthcare and pharmaceuticals industry',
      icon: '',
      items: [
        { name: 'Patient Care' },
        { name: 'Pharmaceuticals' },
        { name: 'Telemedicine' },
        { name: 'Medical Devices' },
      ]
    },
    {
      title: 'Utilities',
      href: '/solutions/utilities',
      description: 'Solutions for oil, gas and utility industry',
      icon: '',
      items: [
        { name: 'Oil & Gas' },
        { name: 'Power & Energy' },
        { name: 'Water Management' },
        { name: 'Renewable Energy' },
      ]
    },
    {
      title: 'Retail',
      href: '/solutions/retail',
      description: 'Solution for retail and e-commerce industry',
      icon: '',
      items: [
        { name: 'E-commerce' },
        { name: 'Brick & Mortar' },
        { name: 'Supply Chain' },
        { name: 'Customer Experience' },
      ]
    },
    {
      title: 'Other Industries',
      href: '/solutions/other-industries',
      description: 'Dynamic AI solutions for every industry',
      icon: '',
      items: [
        { name: 'Manufacturing' },
        { name: 'Logistics & Transportation' },
        { name: 'Telecommunications' },
        { name: 'Education' },
        { name: 'Government' },
        { name: 'Hospitality' },
      ]
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
      className="absolute left-1/2 transform -translate-x-1/2 top-full mt-2 w-[1100px] max-w-[90vw] bg-slate-50 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] backdrop-blur-[20px] border border-slate-200 rounded-[12px] overflow-hidden z-50"
      style={{
        boxShadow: '0 20px 60px -15px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.1)'
      }}
    >
            {/* Different gradient top border */}
            {/* <div className="h-1.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 w-full"></div> */}
            
            <div className="p-7">
              {/* Header with different styling */}
              <div className="mb-8">
                <div className="flex items-center gap-2.5 mb-3">
                  {/* <div className="w-2 h-6 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full"></div> */}
                  <h3 className="text-[11px] font-semibold text-slate-500 uppercase tracking-[0.15em]">
                    By Industry
                  </h3>
                </div>
                <p className="text-slate-700 text-[14px] font-medium">
                  Industry-specific AI solutions powered by Saple.ai
                </p>
              </div>

              
<div className="grid grid-cols-5 gap-6">
  {industrySolutions.map((industry, index) => (
    <div key={index} className={`space-y-3 ${index === industrySolutions.length - 1 ? 'col-span-1' : ''}`}>
      {/* Title and Subtitle Container */}
      <div className="mb-4">
        <h4 className="text-slate-800 font-semibold text-[15px] mb-2">
          {industry.title}
        </h4>
        <p className="text-slate-500 text-[12.5px] leading-relaxed">
          {industry.description}
        </p>
      </div>
      
      {/* Sub-items - Non-clickable with different styling */}
      <ul className="space-y-2">
        {industry.items.map((item, itemIndex) => (
          <li key={itemIndex}>
            <div className="text-slate-600">
              <span className="text-[13px] leading-relaxed">{item.name}</span>
            </div>
          </li>
        ))}
      </ul>
      
      {/* View More link - Different styling */}
      <div className="pt-4">
        <Link
          href={industry.href}
          className="!text-black hover:!text-black text-[12.5px] font-semibold transition-colors duration-200 inline-flex items-center group"
          onClick={() => setIsOpen(false)}
        >
          View {industry.title.toUpperCase()}
          <svg className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  ))}
</div>
            </div>

            {/* Footer with different gradient */}
             <div className="px-7 py-4 bg-gradient-to-r from-blue-100/50 to-indigo-100/50 border-t border-slate-200 flex justify-between items-center">
          
            {/* <div className="px-7 py-4 bg-gradient-to-r from-emerald-50/50 to-teal-50/50 border-t border-slate-100 flex justify-between items-center"> */}
              <div className="text-slate-500 text-[12px] font-medium">
                Custom AI solutions for every business need
              </div>
              {/* <Link
                href="/solutions/all"
                // className="text-emerald-600 hover:text-emerald-700 text-[13px] font-semibold transition-colors duration-200 flex items-center group"
                className="!text-black hover:!text-black text-[12.5px] font-semibold transition-colors duration-200 inline-flex items-center group"

                onClick={() => setIsOpen(false)}
              >
                Explore all solutions
                <svg className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link> */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}