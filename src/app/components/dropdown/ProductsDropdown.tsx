// components/dropdown/ProductsDropdown.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export function ProductsDropdown() {
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

  // Platform menu items (updated with your content)
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

      {/* Dropdown Menu - Wider to accommodate 4 columns */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute left-1/2 transform -translate-x-1/2 top-full mt-1 w-[1000px] max-w-[90vw] bg-gray-900/95 backdrop-blur-md border border-white/10 rounded-lg shadow-xl z-50 overflow-hidden"
          >
            <div className="flex">
              {/* Left Column - Platform - Takes 1/4 of width */}
              <div className="w-1/4 p-6 border-r border-white/10 bg-gray-900/80">
                <div className="mb-6">
                  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                    Platform
                  </h3>
                  <ul className="space-y-5">
                    {platformItems.map((item, index) => (
                      <li key={index}>
                        <Link
                          href={item.href}
                          className="group block"
                          onClick={() => setIsOpen(false)}
                        >
                          <p className="text-white font-medium text-sm group-hover:text-blue-400 transition-colors">
                            {item.name}
                          </p>
                          {item.description && (
                            <p className="text-gray-400 text-xs mt-1.5 group-hover:text-gray-300 transition-colors leading-relaxed">
                              {item.description}
                            </p>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Platform separator line */}
                <div className="pt-6 border-t border-white/10">
                  <p className="text-gray-500 text-xs">
                    Enterprise-ready AI platform
                  </p>
                </div>
              </div>

              {/* Right Column - Products - Takes 3/4 of width in 3 columns */}
              <div className="w-3/4 p-6">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-6">
                  Products
                </h3>
                <div className="grid grid-cols-3 gap-8">
                  {productCategories.map((category, index) => (
                    <div key={index} className="space-y-4">
                      <Link
                        href={category.href}
                        className="group block"
                        onClick={() => setIsOpen(false)}
                      >
                        <h4 className="text-white font-semibold text-sm group-hover:text-blue-400 transition-colors mb-1.5">
                          {category.title}
                        </h4>
                        <p className="text-gray-400 text-xs group-hover:text-gray-300 transition-colors leading-relaxed">
                          {category.description}
                        </p>
                      </Link>
                      
                      {/* Sub-items for each product category */}
                      <ul className="space-y-2.5">
                        {category.items.map((item, itemIndex) => (
                          <li key={itemIndex}>
                            <Link
                              href={item.href}
                              className="text-gray-400 hover:text-white transition-colors flex items-start group"
                              onClick={() => setIsOpen(false)}
                            >
                              <span className="w-1.5 h-1.5 bg-gray-600 rounded-full mt-1.5 mr-2.5 flex-shrink-0 group-hover:bg-blue-400 transition-colors"></span>
                              <span className="text-xs leading-relaxed">{item.name}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer with View All Products Link */}
            <div className="px-6 py-4 bg-black/30 border-t border-white/10 flex justify-between items-center">
              <div className="text-gray-400 text-xs">
                Complete suite of AI solutions for enterprise
              </div>
              <Link
                href="/products/all"
                className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors flex items-center group"
                onClick={() => setIsOpen(false)}
              >
                View all products
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