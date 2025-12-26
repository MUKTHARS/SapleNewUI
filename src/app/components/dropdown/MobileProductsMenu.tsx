// components/dropdown/MobileProductsMenu.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
interface MobileProductsMenuProps {
  onClose: () => void;
}

export function MobileProductsMenu({ onClose }: MobileProductsMenuProps) {
//   const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);

//   const toggleSection = (section: string) => {
//     setExpandedSection(expandedSection === section ? null : section);
//   };

  const toggleProduct = (product: string) => {
    setExpandedProduct(expandedProduct === product ? null : product);
  };

  // Platform menu items (updated)
  const platformItems = [
    { href: '/platform/overview', name: 'Platform Overview' },
    // { href: '/platform/neo', name: 'Neo Canvas' },
    // { href: '/platform/integrations', name: 'Integrations' },
    // { href: '/platform/responsible-ai', name: 'Responsible AI' },
  ];

  // Products menu items (updated)
  const productsItems = [
    { 
      name: 'AI Agents',
      href: '/products/ai-agents',
      description: 'Autonomous AI agents that think, act, and resolve.',
      subItems: [
        { href: '/products/ai-agents/build', name: 'Build AI Agents' },
        { href: '/products/ai-agents/train', name: 'Train Agents' },
        { href: '/products/ai-agents/conversational', name: 'Conversational Agents (Chat & Voice)' },
        { href: '/products/ai-agents/task-workflow', name: 'Task & Workflow Agents' },
        { href: '/products/ai-agents/appointment-action', name: 'Appointment & Action Agents' },
      ]
    },
    { 
      name: 'Agent Assist',
      href: '/products/agent-assist',
      description: 'Empower humans with real-time AI assistance.',
      subItems: [
        { href: '/products/agent-assist/knowledge', name: 'Knowledge Assist' },
        { href: '/products/agent-assist/response-suggestions', name: 'AI Response Suggestions' },
        { href: '/products/agent-assist/summaries', name: 'AI Summaries (Chat, Voice, Email)' },
        { href: '/products/agent-assist/contextual-guidance', name: 'Contextual Guidance' },
        { href: '/products/agent-assist/multilingual', name: 'Multilingual & Translation' },
      ]
    },
    { 
      name: 'Conversation Intelligence',
      href: '/products/conversation-intelligence',
      description: 'Turn every conversation into insight.',
      subItems: [
        { href: '/products/conversation-intelligence/analytics', name: 'Conversation Analytics' },
        { href: '/products/conversation-intelligence/intent-discovery', name: 'Intent & Topic Discovery' },
        { href: '/products/conversation-intelligence/sentiment-insights', name: 'Sentiment & CX Insights' },
        { href: '/products/conversation-intelligence/automation-discovery', name: 'Automation Opportunity Discovery' },
        { href: '/products/conversation-intelligence/ai-analyst', name: 'AI Analyst' },
      ]
    },
  ];

  return (
    <div className="space-y-1">
      {/* Platform Section Header */}
<div className="px-3 py-2">
  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
    Platform
  </h3>
  
  {/* Platform Image for Mobile */}
  <div className="mb-4 overflow-hidden rounded-lg border border-white/10 bg-white/5">
    <div className="aspect-[4/3] relative">
      <Image src="/api/placeholder/40/40" alt="AI Agents" width={40} height={40} className="w-10 h-10 rounded-lg"
        onError={(e) => {
          // Fallback if image doesn't exist
          e.currentTarget.style.display = 'none';
          e.currentTarget.parentElement!.innerHTML = `
            <div class="w-full h-full bg-gradient-to-br from-blue-900/30 via-indigo-900/30 to-purple-900/30 flex items-center justify-center">
              <div class="text-center p-4">
                <div class="text-lg font-bold text-white mb-1">AgentC PAG</div>
                <div class="text-xs text-gray-300">Enterprise AI Platform</div>
              </div>
            </div>
          `;
        }}
      />
    </div>
  </div>
  
  {platformItems.map((item, index) => (
    <Link
      key={index}
      href={item.href}
      onClick={onClose}
      className="block px-3 py-2 text-sm text-white/90 hover:text-white hover:bg-white/5 rounded-md transition-all mb-1"
    >
      {item.name}
    </Link>
  ))}
</div>

      {/* Separator */}
      <div className="px-3 py-2 border-t border-white/10">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
          Products
        </h3>
      </div>

      {/* Products Section */}
      <div className="px-3 py-1">
        {productsItems.map((product, index) => (
          <div key={index} className="mb-3">
            <div className="flex items-center justify-between">
              <Link
                href={product.href}
                onClick={onClose}
                className="block text-sm font-medium text-white hover:bg-white/5 rounded-md transition-all flex-1 py-2 pl-3"
              >
                {product.name}
                {product.description && (
                  <p className="text-gray-400 text-xs mt-0.5 font-normal">{product.description}</p>
                )}
              </Link>
              {product.subItems && product.subItems.length > 0 && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleProduct(product.name);
                  }}
                  className="ml-2 p-1 text-gray-400 hover:text-white"
                >
                  <svg
                    className={`w-3.5 h-3.5 transform transition-transform ${expandedProduct === product.name ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              )}
            </div>
            
            {/* Sub-items */}
            {expandedProduct === product.name && product.subItems && (
              <div className="ml-5 mt-1 space-y-1 border-l border-white/10 pl-3">
                {product.subItems.map((subItem, subIndex) => (
                  <Link
                    key={subIndex}
                    href={subItem.href}
                    onClick={onClose}
                    className="block px-3 py-1.5 text-xs text-gray-400 hover:text-white hover:bg-white/5 rounded-md transition-all"
                  >
                    {subItem.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* View All Products Link (Mobile) */}
      <div className="px-3 py-2 border-t border-white/10 mt-3">
        <Link
          href="/products/all"
          onClick={onClose}
          className="block text-center text-sm text-blue-400 hover:text-blue-300 font-medium py-2 rounded-md hover:bg-blue-400/10 transition-all"
        >
          View all products
        </Link>
      </div>
    </div>
  );
}