// components/CyberNavbar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Logo from './saple-logo.jpeg';
import { LoginModal } from './LoginModal';
import { UserSection } from './UserSection';

export function CyberNavbar() {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [needsWorkspace, setNeedsWorkspace] = useState(false);

  const navItems = [
    { href: '/products', name: 'PRODUCTS' },
    // { href: '/explore', name: 'EXPLORE' },
    { href: '/solutions', name: 'SOLUTIONS' },
    { href: '/contact', name: 'CONTACT' },
    { href: '/blog', name: 'BLOG' },
  ];

  // Check if user is logged in on component mount
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const handleLoginSuccess = (userData: any) => {
    setIsLoggedIn(true);
    setUser(userData);
    setShowLoginModal(false);
    setIsMobileMenuOpen(false);
    console.log('Login successful:', userData);
  };

  const handleWorkspaceNeeded = () => {
    setNeedsWorkspace(true);
    // The UserSection component will automatically show the workspace creation button
    // because the user won't have a workspace
  };

  const handleLoginError = (error: string) => {
    console.error('Login error:', error);
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
    setIsMobileMenuOpen(false); // Close mobile menu after logout
  };

  return (
    <>
      <nav className="container mx-auto px-4 flex justify-between items-center border-b border-green-400/20">
        <LogoSection />

        {/* Desktop Navigation */}
        <div className="hidden lg:flex space-x-8 items-center">
          <NavigationItems navItems={navItems} pathname={pathname} />

          <UserSection
            isLoggedIn={isLoggedIn}
            user={user}
            onLoginClick={() => setShowLoginModal(true)}
            onLogout={handleLogout}
          />
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center space-x-4">
          <UserSection
            isLoggedIn={isLoggedIn}
            user={user}
            onLoginClick={() => setShowLoginModal(true)}
            onLogout={handleLogout}
          />

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-300 hover:text-white p-2"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center space-y-1">
              <motion.span
                animate={isMobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className="block h-0.5 w-6 bg-current transition-all duration-300"
              />
              <motion.span
                animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="block h-0.5 w-6 bg-current transition-all duration-300"
              />
              <motion.span
                animate={isMobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className="block h-0.5 w-6 bg-current transition-all duration-300"
              />
            </div>
          </motion.button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-75 z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Mobile Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 h-full w-80 bg-gray-900 border-l border-green-400/20 z-50 lg:hidden overflow-y-auto"
            >
              <div className="p-6">
                {/* Mobile Menu Header */}
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-xl font-bold text-white font-mono">MENU</h2>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-gray-400 hover:text-white p-2"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Mobile Navigation Items */}
                <nav className="space-y-4">
                  {navItems.map((item, index) => (
                    <MobileNavigationItem
                      key={index}
                      href={item.href}
                      name={item.name}
                      isActive={pathname === item.href}
                    />
                  ))}
                </nav>

                {/* Mobile User Info */}
                <div className="mt-8 pt-8 border-t border-gray-700">
                  {isLoggedIn ? (
                    <div className="text-center">
                      <p className="text-gray-300 text-sm font-mono mb-2">
                        Welcome, {user?.first_name || user?.username}
                      </p>
                      <p className="text-green-400 text-xs font-mono mb-4">
                        {user?.email}
                      </p>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          handleLogout();
                          // The redirect is now handled in UserSection
                        }}
                        className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-md text-sm font-mono tracking-wider transition-colors border border-red-400/30"
                      >
                        LOGOUT
                      </motion.button>
                    </div>
                  ) : (
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setShowLoginModal(true);
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full bg-color hover:bg-teal-700 text-white px-4 py-3 rounded-md text-sm font-mono tracking-wider transition-colors border border-green-400/30"
                    >
                      LOGIN
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSuccess={handleLoginSuccess}
        onError={handleLoginError}
        onWorkspaceNeeded={handleWorkspaceNeeded}
      />
    </>
  );
}

// Logo Section Component
const LogoSection = () => (
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
);

// Navigation Items Component (Desktop)
interface NavigationItemsProps {
  navItems: Array<{ href: string; name: string }>;
  pathname: string;
}

const NavigationItems = ({ navItems, pathname }: NavigationItemsProps) => (
  <>
    {navItems.map((item, index) => (
      <NavigationItem
        key={index}
        href={item.href}
        name={item.name}
        isActive={pathname === item.href}
      />
    ))}
  </>
);

// Single Navigation Item Component (Desktop)
interface NavigationItemProps {
  href: string;
  name: string;
  isActive: boolean;
}

const NavigationItem = ({ href, name, isActive }: NavigationItemProps) => (
  <motion.div
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
  >
    <Link
      href={href}
      className={`relative px-3 py-1 font-mono text-sm tracking-wider ${isActive ? 'color' : 'text-gray-400 hover:text-blue-300'
        }`}
    >
      {name}
      {isActive && (
        <motion.span
          layoutId="nav-underline"
          className="absolute left-0 top-full block h-[1px] w-full bg-color-400"
          initial={false}
          transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
        />
      )}
    </Link>
  </motion.div>
);

// Mobile Navigation Item Component
interface MobileNavigationItemProps {
  href: string;
  name: string;
  isActive: boolean;
}

const MobileNavigationItem = ({ href, name, isActive }: MobileNavigationItemProps) => (
  <motion.div
    whileTap={{ scale: 0.95 }}
  >
    <Link
      href={href}
      className={`block px-4 py-3 font-mono text-base tracking-wider rounded-lg transition-colors ${isActive
        ? 'bg-green-400/10 text-green-400 border border-green-400/20'
        : 'text-gray-300 hover:text-white hover:bg-gray-800'
        }`}
    >
      {name}
    </Link>
  </motion.div>
);