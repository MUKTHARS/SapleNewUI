// components/dropdown/ProductsDropdown.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export function ProductsDropdown() {
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

  // Platform menu items
  const platformItems = [
    { 
      href: '/platform/overview', 
      name: 'Platform Overview', 
      description: 'A no-code, enterprise-ready platform to build, deploy, and manage AI agents across chat, voice, and workflows — securely and at scale.' 
    },
    { href: '/platform/neo', name: 'Neo' },
    { href: '/platform/integrations', name: 'Integrations' },
    { href: '/platform/responsible-ai', name: 'Responsible AI' },
  ];

  // Product categories (main products)
  const productCategories = [
    {
      title: 'AI Agents',
      href: '/products/ai-agents',
      description: 'Autonomous AI agents that think, act, and resolve.',
      items: [
        { href: '/products/ai-agents/build', name: 'Build AI Agents' },
        { href: '/products/ai-agents/train', name: 'Train Agents' },
        { href: '/products/ai-agents/conversational', name: 'Conversational Agents (Chat & Voice)' },
        { href: '/products/ai-agents/task-workflow', name: 'Task & Workflow Agents' },
        { href: '/products/ai-agents/appointment-action', name: 'Appointment & Action Agents' },
      ]
    },
    {
      title: 'Agent Assist',
      href: '/products/agent-assist',
      description: 'Empower humans with real-time AI assistance.',
      items: [
        { href: '/products/agent-assist/knowledge', name: 'Knowledge Assist' },
        { href: '/products/agent-assist/response-suggestions', name: 'AI Response Suggestions' },
        { href: '/products/agent-assist/summaries', name: 'AI Summaries (Chat, Voice, Email)' },
        { href: '/products/agent-assist/contextual-guidance', name: 'Contextual Guidance' },
        { href: '/products/agent-assist/multilingual', name: 'Multilingual & Translation' },
      ]
    },
    {
      title: 'Conversation Intelligence',
      href: '/products/conversation-intelligence',
      description: 'Turn every conversation into insight.',
      items: [
        { href: '/products/conversation-intelligence/analytics', name: 'Conversation Analytics' },
        { href: '/products/conversation-intelligence/intent-discovery', name: 'Intent & Topic Discovery' },
        { href: '/products/conversation-intelligence/sentiment-insights', name: 'Sentiment & CX Insights' },
        { href: '/products/conversation-intelligence/automation-discovery', name: 'Automation Opportunity Discovery' },
        { href: '/products/conversation-intelligence/ai-analyst', name: 'AI Analyst' },
      ]
    }
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
  Products
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

      {/* Dropdown Menu - Light Theme */}
      <AnimatePresence>
  {isOpen && (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.98 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="absolute left-1/2 transform -translate-x-[30%] top-full mt-2 w-[1000px] max-w-[90vw] bg-slate-50 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] backdrop-blur-[20px] border border-slate-200 rounded-[12px] overflow-hidden z-50"
      style={{
        boxShadow: '0 20px 60px -15px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.1)'
      }}
    >
            {/* Gradient top border */}
            {/* <div className="h-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 w-full"></div> */}
            
            <div className="p-7">
              <div className="flex">
                {/* Left Column - Platform - Light Theme */}
                <div className="w-1/4 pr-8 border-r border-slate-200">
                {/* <div className="w-1/4 pr-8 border-r border-slate-100"> */}
                  <div className="mb-8">
                    <div className="flex items-center gap-2.5 mb-4">
                      {/* <div className="w-2 h-6 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full"></div> */}
                      <h3 className="text-[11px] font-semibold text-slate-500 uppercase tracking-[0.15em]">
                        Platform
                      </h3>
                    </div>
                    <ul className="space-y-6">
                      {platformItems.map((item, index) => (
                        <li key={index}>
                          <Link
                            href={item.href}
                            className="group block"
                            onClick={() => setIsOpen(false)}
                          >
                            <p className="text-slate-800 font-semibold text-[14px] mb-1.5 group-hover:text-blue-600 transition-colors duration-200">
                              {item.name}
                            </p>
                            {item.description && (
                              <p className="text-slate-500 text-[12.5px] leading-relaxed group-hover:text-slate-700 transition-colors duration-200">
                                {item.description}
                              </p>
                            )}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Platform separator with badge */}
                  {/* <div className="pt-6 border-t border-slate-100">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                      <span className="text-[11px] font-medium text-blue-700">Enterprise Ready</span>
                    </div>
                  </div> */}
                </div>

                {/* Right Column - Products - Light Theme */}
                <div className="w-3/4 pl-8">
                  <div className="flex items-center gap-2.5 mb-6">
                    {/* <div className="w-2 h-6 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full"></div> */}
                    <h3 className="text-[11px] font-semibold text-slate-500 uppercase tracking-[0.15em]">
                      Products
                    </h3>
                  </div>
                  <div className="grid grid-cols-3 gap-8">
                    {productCategories.map((category, index) => (
                      <div key={index} className="space-y-5">
                        <Link
                          href={category.href}
                          className="group block"
                          onClick={() => setIsOpen(false)}
                        >
                          <h4 className="text-slate-800 font-semibold text-[14px] mb-2 group-hover:text-emerald-600 transition-colors duration-200">
                            {category.title}
                          </h4>
                          <p className="text-slate-500 text-[12.5px] group-hover:text-slate-700 transition-colors duration-200 leading-relaxed">
                            {category.description}
                          </p>
                        </Link>
                        
                        {/* Sub-items for each product category */}
                        <ul className="space-y-2.5">
                       {category.items.map((item, itemIndex) => (
  <li key={itemIndex}>
    <Link
      href={item.href}
      className="!text-black hover:!text-black transition-colors duration-200 flex items-start group"
      onClick={() => setIsOpen(false)}
    >
      <span className="mr-2 text-[8px] opacity-70">●</span>
      <span className="text-[12.5px] leading-relaxed">{item.name}</span>
    </Link>
  </li>
))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer with gradient background */}
            <div className="px-7 py-4 bg-gradient-to-r from-blue-100/50 to-indigo-100/50 border-t border-slate-200 flex justify-between items-center">
            {/* <div className="px-7 py-4 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 border-t border-slate-100 flex justify-between items-center"> */}
              <div className="text-slate-500 text-[12px] font-medium">
                Complete suite of AI solutions
              </div>
              {/* <Link
                href="/products/all"
                className="text-blue-600 hover:text-blue-700 text-[13px] font-semibold transition-colors duration-200 flex items-center group"
                onClick={() => setIsOpen(false)}
              >
                View all products
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