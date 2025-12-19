// components/dropdown/MobileSolutionsMenu.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';

interface MobileSolutionsMenuProps {
  onClose: () => void;
}

export function MobileSolutionsMenu({ onClose }: MobileSolutionsMenuProps) {
  const [expandedIndustry, setExpandedIndustry] = useState<string | null>(null);

  const toggleIndustry = (industry: string) => {
    setExpandedIndustry(expandedIndustry === industry ? null : industry);
  };

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
    <div className="space-y-1">
      {/* Header */}
      <div className="px-3 py-2">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
          By Industry
        </h3>
        <p className="text-gray-300 text-xs mb-4">
          Industry-specific AI solutions powered by Saple.ai
        </p>
      </div>

      {/* Industry List */}
      <div className="px-3 py-1">
        {industrySolutions.map((industry, index) => (
          <div key={index} className="mb-3">
            <div className="flex items-center justify-between">
              <Link
                href={industry.href}
                onClick={onClose}
                className="block text-sm font-medium text-white hover:bg-white/5 rounded-md transition-all flex-1 py-2 pl-3"
              >
                <div className="flex items-center gap-2">
                  <span className="text-base">{industry.icon}</span>
                  <div>
                    <div>{industry.title}</div>
                    {industry.description && (
                      <p className="text-gray-400 text-xs mt-0.5 font-normal">{industry.description}</p>
                    )}
                  </div>
                </div>
              </Link>
              {industry.items && industry.items.length > 0 && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleIndustry(industry.title);
                  }}
                  className="ml-2 p-1 text-gray-400 hover:text-white"
                >
                  <svg
                    className={`w-3.5 h-3.5 transform transition-transform ${expandedIndustry === industry.title ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              )}
            </div>
            
            {/* Sub-items - Non-clickable */}
            {expandedIndustry === industry.title && industry.items && (
              <div className="ml-8 mt-1 space-y-1 border-l border-white/10 pl-3">
                {industry.items.map((item, subIndex) => (
                  <div
                    key={subIndex}
                    className="block px-3 py-1.5 text-xs text-gray-400 rounded-md transition-all"
                  >
                    {item.name}
                  </div>
                ))}
                {/* View More link for each industry - Clickable */}
                <div className="pt-2">
                  <Link
                    href={industry.href}
                    onClick={onClose}
                    className="text-blue-400 hover:text-blue-300 text-xs font-medium transition-colors inline-flex items-center group"
                  >
                    View {industry.title.toLowerCase()}
                    <svg className="w-3 h-3 ml-1 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* View All Solutions Link (Mobile) */}
      <div className="px-3 py-2 border-t border-white/10 mt-3">
        <Link
          href="/solutions/all"
          onClick={onClose}
          className="block text-center text-sm text-blue-400 hover:text-blue-300 font-medium py-2 rounded-md hover:bg-blue-400/10 transition-all"
        >
          Explore all solutions
        </Link>
      </div>
    </div>
  );
}