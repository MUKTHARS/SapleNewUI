'use client';

import {
  ReactNode,
  Children,
  isValidElement,
  cloneElement,
  ReactElement,
} from 'react';

interface BlogContentProps {
  children: ReactNode;
}

export function BlogContent({ children }: BlogContentProps) {
  const processText = (text: string): ReactNode => {
    const regex = /(saple\.ai|saple)/gi;
    const parts = text.split(regex);

    return parts.map((part, index) => {
      if (part.match(regex)) {
        return (
          <a 
            key={index} 
            href="/solutions" 
            className="inline-flex items-center gap-1 text-[#0c7075] font-medium hover:text-[#0a4a4d] transition-colors"
          >
            {part}
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        );
      }
      return part;
    });
  };

  const processChildren = (node: ReactNode): ReactNode => {
    if (typeof node === 'string') {
      return processText(node);
    }

    if (!isValidElement(node)) {
      return node;
    }

    const element = node as ReactElement<{ children?: ReactNode; href?: string }>;

    // If it's an anchor element with saple or saple.ai in href, modify it
    if (
      element.type === 'a' &&
      typeof element.props.href === 'string' &&
      (element.props.href.includes('saple.ai') || element.props.href.includes('saple'))
    ) {
      return cloneElement(element, { ...element.props, href: '/solutions' });
    }

    // Recursively process children
    if (element.props.children) {
      const processedChildren = Children.map(element.props.children, processChildren);
      return cloneElement(element, { ...element.props, children: processedChildren });
    }

    return element;
  };

  const processedChildren = Children.map(children, (child) => processChildren(child));

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/90 via-sky-50 to-cyan-50/80" />
      <div className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%230ea5e9' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundSize: '400px 400px'
        }}
      />

      <div className="relative z-10 container mx-auto px-4 max-w-4xl">
        <div className="prose prose-lg max-w-none 
          prose-headings:text-gray-900
          prose-h1:text-4xl prose-h1:font-bold prose-h1:mb-8
          prose-h2:text-3xl prose-h2:font-bold prose-h2:mt-12 prose-h2:mb-6
          prose-h3:text-2xl prose-h3:font-bold prose-h3:mt-10 prose-h3:mb-4
          prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6
          prose-a:text-[#0c7075] prose-a:font-medium prose-a:no-underline hover:prose-a:text-[#0a4a4d] hover:prose-a:underline
          prose-strong:text-gray-900 prose-strong:font-semibold
          prose-em:text-gray-700
          prose-blockquote:border-l-4 prose-blockquote:border-[#0c7075] prose-blockquote:pl-6 prose-blockquote:py-3 prose-blockquote:my-8 prose-blockquote:bg-gradient-to-r from-[#0c7075]/5 to-transparent prose-blockquote:text-gray-700
          prose-code:text-gray-900 prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded-lg
          prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-6 prose-pre:rounded-xl prose-pre:overflow-x-auto
          prose-ul:list-none prose-ul:space-y-3 prose-ul:my-8
          prose-li:flex prose-li:items-start prose-li:gap-3
          prose-li:before:content-[''] prose-li:before:w-2 prose-li:before:h-2 prose-li:before:mt-2 prose-li:before:bg-[#0c7075] prose-li:before:rounded-full prose-li:before:flex-shrink-0
          prose-ol:list-decimal prose-ol:pl-6 prose-ol:my-8 prose-ol:space-y-3
          prose-table:border-collapse prose-table:w-full prose-table:my-8
          prose-th:bg-gray-100 prose-th:text-gray-900 prose-th:font-semibold prose-th:p-4 prose-th:border prose-th:border-gray-300
          prose-td:p-4 prose-td:border prose-td:border-gray-300
          prose-img:rounded-xl prose-img:shadow-lg prose-img:my-8
          prose-hr:border-gray-300 prose-hr:my-12">
          {processedChildren}
        </div>
      </div>
    </section>
  );
}

// 'use client';

// import {
//   ReactNode,
//   Children,
//   isValidElement,
//   cloneElement,
//   ReactElement,
// } from 'react';

// interface BlogContentProps {
//   children: ReactNode;
// }

// export function BlogContent({ children }: BlogContentProps) {
//   const processText = (text: string): ReactNode => {
//     const regex = /(saple\.ai|saple)/gi;
//     const parts = text.split(regex);

//     return parts.map((part, index) => {
//       if (part.match(regex)) {
//         return (
//           <a key={index} href="/solutions" className="text-blue-600 hover:underline">
//             {part}
//           </a>
//         );
//       }
//       return part;
//     });
//   };

//   const processChildren = (node: ReactNode): ReactNode => {
//     if (typeof node === 'string') {
//       return processText(node);
//     }

//     if (!isValidElement(node)) {
//       return node;
//     }

//     const element = node as ReactElement<{ children?: ReactNode; href?: string }>;

//     // If it's an anchor element with saple or saple.ai in href, modify it
//     if (
//       element.type === 'a' &&
//       typeof element.props.href === 'string' &&
//       (element.props.href.includes('saple.ai') || element.props.href.includes('saple'))
//     ) {
//       return cloneElement(element, { ...element.props, href: '/solutions' });
//     }

//     // Recursively process children
//     if (element.props.children) {
//       const processedChildren = Children.map(element.props.children, processChildren);
//       return cloneElement(element, { ...element.props, children: processedChildren });
//     }

//     return element;
//   };


//   const processedChildren = Children.map(children, (child) => processChildren(child));

//   return (
//     <section className="py-20 bg-white">
//       <div className="container mx-auto px-4 max-w-4xl">
//         <div className="prose prose-lg max-w-none">
//           {processedChildren}
//         </div>
//       </div>
//     </section>
//   );
// }
