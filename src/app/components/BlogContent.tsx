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
          <a key={index} href="/solutions" className="text-blue-600 hover:underline">
            {part}
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
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="prose prose-lg max-w-none">
          {processedChildren}
        </div>
      </div>
    </section>
  );
}
