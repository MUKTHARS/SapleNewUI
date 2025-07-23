'use client';

import { ReactNode } from 'react';

interface BlogContentProps {
  children: ReactNode;
}

export function BlogContent({ children }: BlogContentProps) {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="prose prose-lg max-w-none">
          {children}
        </div>
      </div>
    </section>
  );
}