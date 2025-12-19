// components/dropdown/SolutionsDropdown.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export function SolutionsDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

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

  // Industry solutions based on your image
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

      {/* Dropdown Menu - Adjusted width for 5 industries */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute left-1/2 transform -translate-x-1/2 top-full mt-1 w-[1100px] max-w-[90vw] bg-gray-900/95 backdrop-blur-md border border-white/10 rounded-lg shadow-xl z-50 overflow-hidden"
          >
            <div className="p-6">
              {/* Header */}
              <div className="mb-6">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  By Industry
                </h3>
                <p className="text-gray-300 text-sm">
                  Industry-specific AI solutions powered by Saple.ai
                </p>
              </div>

              {/* Industry Grid - 5 columns for 5 industries */}
              <div className="grid grid-cols-5 gap-4">
                {industrySolutions.map((industry, index) => (
                  <div key={index} className={`space-y-3 ${index === industrySolutions.length - 1 ? 'col-span-1' : ''}`}>
                    <div className="flex items-start gap-3 mb-2">
                      <span className="text-xl mt-0.5">{industry.icon}</span>
                      <div>
                        <h4 className="text-white font-semibold text-sm mb-1">
                          {industry.title}
                        </h4>
                        <p className="text-gray-400 text-xs leading-relaxed">
                          {industry.description}
                        </p>
                      </div>
                    </div>
                    
                    {/* Sub-items for each industry - Non-clickable */}
                    <ul className="space-y-1.5">
                      {industry.items.map((item, itemIndex) => (
                        <li key={itemIndex}>
                          <div className="text-gray-400 flex items-start">
                            <span className="w-1.5 h-1.5 bg-gray-600 rounded-full mt-1.5 mr-2.5 flex-shrink-0"></span>
                            <span className="text-xs leading-relaxed">{item.name}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                    
                    {/* View More link for each industry - Clickable */}
                    <div className="pt-2">
                      <Link
                        href={industry.href}
                        className="text-blue-400 hover:text-blue-300 text-xs font-medium transition-colors inline-flex items-center group"
                        onClick={() => setIsOpen(false)}
                      >
                        View {industry.title.toLowerCase()}
                        <svg className="w-3 h-3 ml-1 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-black/30 border-t border-white/10 flex justify-between items-center">
              <div className="text-gray-400 text-xs">
                Custom AI solutions for every business need
              </div>
              <Link
                href="/solutions/all"
                className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors flex items-center group"
                onClick={() => setIsOpen(false)}
              >
                Explore all solutions
                <svg className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}