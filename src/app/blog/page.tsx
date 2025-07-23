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
      {/* Hero Section */}
      {/* <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            saple.ai Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Insights on AI, automation, and the future of customer experience
          </p>
        </div>
      </section> */}

      {/* Blog List */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-2xl font-semibold text-gray-900">
              Latest Articles
            </h2>
            {/* <Link 
              href="/blog/categories" 
              className="text-blue-600 hover:text-blue-800 flex items-center text-sm font-medium"
            >
              View all categories <ArrowRight className="ml-1" size={16} />
            </Link> */}
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
          
          {/* <div className="mt-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-white">
            <div className="max-w-2xl mx-auto text-center">
              <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
              <p className="mb-6 text-blue-100">
                Subscribe to our newsletter for the latest AI insights and product updates.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-grow px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div> */}
        </div>
      </section>
    </div>
  );
}