// components/CyberNavbar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Logo from './saple-logo.jpeg';

export function CyberNavbar() {
  const pathname = usePathname();
  const navItems = [
    { href: '/products', name: 'PRODUCTS' },
    // { href: '/explore', name: 'EXPLORE' },
    { href: '/solutions', name: 'SOLUTIONS' },
    { href: '/contact', name: 'CONTACT' },
    { href: '/blog', name: 'BLOG' },
  ];

  return (
    <nav className="container mx-auto px-4 flex justify-between items-center border-b border-green-400/20">
      <Link href="/" className="flex items-center text-2xl font-bold color font-mono tracking-widest">
        <Image 
          src={Logo}
          alt="Saple.AI Logo"
          width={150}
          height={40}
          className="mr-2"
          priority
          loading="eager"
        />
      </Link>
      
      <div className="flex space-x-8">
        {navItems.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              key={item.href}
              href={item.href} 
              className={`relative px-3 py-1 font-mono text-sm tracking-wider ${
                pathname === item.href ? 
                'color' : 'text-gray-400 hover:text-blue-300'
              }`}
            >
              {item.name}
              {pathname === item.href && (
                <motion.span 
                  layoutId="nav-underline"
                  className="absolute left-0 top-full block h-[1px] w-full bg-color-400"
                  initial={false}
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
            </Link>
          </motion.div>
        ))}
      </div>
    </nav>
  );
}