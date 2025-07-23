// src/app/components/BlogCard.tsx
'use client';

// import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface BlogCardProps {
  slug: string;
  title: string;
  description: string;
  date: string;
}

export function BlogCard({ slug, title, description, date }: BlogCardProps) {
  return (
    <article className="group h-full bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="p-6 h-full flex flex-col">
       
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          <Link href={`/blog/${slug}`} className="hover:text-blue-600 transition-colors">
            {title}
          </Link>
        </h2>
        
        <p className="text-gray-600 mb-4 flex-grow">{description}</p>
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>{date}</span>
        </div>
        
        <Link 
          href={`/blog/${slug}`} 
          className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors group-hover:translate-x-1"
        >
          Read article <ArrowRight className="ml-1" size={16} />
        </Link>
      </div>
    </article>
  );
}