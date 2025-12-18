// src/app/blog/page.tsx
import { Metadata } from 'next';
import { BlogCard } from '../components/BlogCard';
import { CtaSection } from '../components/CtaSection';
// import { ArrowRight } from 'lucide-react';
// import Link from 'next/link';

export const metadata: Metadata = {
  title: 'AI Insights & Articles | saple.ai Blog',
  description: 'Explore our latest articles on AI solutions, bot design, and no-code automation for modern businesses.',
  keywords: ['AI blog', 'chatbot articles', 'no-code AI', 'business automation'],
};

const blogs = [
  {
    slug: 'no-code-agentic-ai',
    title: 'How No-Code Agentic AI is Transforming Modern Business Workflows',
    description: 'Discover how no-code agentic AI enables businesses to build intelligent, autonomous systems without coding.',
    date: 'July 22, 2025',
  },
  {
    slug: 'designing-effective-bots',
    title: 'Designing Effective Bots: Tone, Characteristics, and Use Case-Specific Guidelines',
    description: 'Learn how to design effective AI bots with the right tone and characteristics for healthcare, sales, and customer service use cases.',
    date: 'July 20, 2025',
  }
];

export default function BlogList() {
  return (
    <div className="bg-white">

      {/* Blog List */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex justify-between items-center mb-12">
            <section className="text-2xl font-semibold text-gray-900">
              Latest Articles
            </section>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {blogs.map((blog) => (
              <BlogCard
                key={blog.slug}
                slug={blog.slug}
                title={blog.title}
                description={blog.description}
                date={blog.date}
              />
            ))}
          </div>

          {/* Newsletter CTA */}
          <CtaSection />

        </div>
      </section>
    </div>
  );
}