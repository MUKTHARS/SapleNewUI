'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Logo from './saple-logo.png';
import { LoginModal } from './LoginModal';
import { UserSection } from './UserSection';
import { ProductsDropdown } from './dropdown/ProductsDropdown';
import { MobileProductsMenu } from './dropdown/MobileProductsMenu';
import { MobileSolutionsMenu } from './dropdown/MobileSolutionsMenu';
import { SolutionsDropdown } from './dropdown/SolutionsDropdown';
export function CyberNavbar() {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [user, setUser] = useState<Record<string, unknown> | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // const [isProductsMenuOpen, setIsProductsMenuOpen] = useState(false);

  // Update navItems - remove Products from regular nav items
  // const navItems = [
  //   { href: '/solutions', name: 'Solutions' },
  //   { href: '/demo-hub', name: 'Demo Hub' },
  //   { href: '/contact', name: 'Contact' },
  //   { href: '/blog', name: 'Blog' },
  // ];

// export function CyberNavbar() {
//   const pathname = usePathname();
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [showLoginModal, setShowLoginModal] = useState(false);
//   const [user, setUser] = useState<Record<string, unknown> | null>(null);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    // { href: '/products', name: 'Products' },
    // { href: '/solutions', name: 'Solutions' },
    { href: '/demo-hub', name: 'Demo Hub' },
    { href: '/contact', name: 'Contact' },
    { href: '/blog', name: 'Blog' },
  ];

  // Check if user is logged in on component mount
  useEffect(() => {
    const token = sessionStorage.getItem('access_token');
    const userData = sessionStorage.getItem('user');
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

  const handleLoginSuccess = (userData: Record<string, unknown>) => {
    setIsLoggedIn(true);
    setUser(userData);
    setShowLoginModal(false);
    setIsMobileMenuOpen(false);
    console.log('Login successful:', userData);
  };

  const handleLoginError = (error: string) => {
    console.error('Login error:', error);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('refresh_token');
    sessionStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const openLoginModalHandler = () => setShowLoginModal(true);
    window.addEventListener('open-login-modal', openLoginModalHandler);
    return () => {
      window.removeEventListener('open-login-modal', openLoginModalHandler);
    };
  }, []);

return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14">
            <LogoSection />

            {/* Desktop Navigation - Updated with Solutions dropdown */}
            <div className="hidden lg:flex items-center gap-0.5">
              {/* Products Dropdown */}
              <ProductsDropdown />
              
              {/* Solutions Dropdown */}
              <SolutionsDropdown />
              
              {/* Other Navigation Items */}
              {navItems.map((item, index) => (
                <NavigationItem
                  key={index}
                  href={item.href}
                  name={item.name}
                  isActive={pathname === item.href}
                />
              ))}
            </div>

            {/* Desktop User Section - unchanged */}
            <div className="hidden lg:flex items-center">
              <UserSection
                isLoggedIn={isLoggedIn}
                user={user || undefined}
                onLoginClick={() => setShowLoginModal(true)}
                onLogout={handleLogout}
              />
            </div>

            {/* Mobile Menu Button - unchanged */}
            <div className="lg:hidden flex items-center gap-2">
              <UserSection
                isLoggedIn={isLoggedIn}
                user={user || undefined}
                onLoginClick={() => setShowLoginModal(true)}
                onLogout={handleLogout}
              />

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="flex items-center justify-center w-8 h-8 text-gray-400 hover:text-white rounded-md hover:bg-white/5 transition-all"
                aria-label="Toggle menu"
              >
                <div className="w-5 h-5 flex flex-col justify-center gap-1">
                  <motion.span
                    animate={isMobileMenuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                    className="block h-0.5 w-full bg-current"
                  />
                  <motion.span
                    animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                    className="block h-0.5 w-full bg-current"
                  />
                  <motion.span
                    animate={isMobileMenuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                    className="block h-0.5 w-full bg-current"
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer for fixed navbar */}
      <div className="h-14" />

      {/* Mobile Menu Overlay - Updated with Solutions menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Mobile Menu Panel - Updated with both Products and Solutions */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.2, ease: 'easeInOut' }}
              className="fixed top-0 right-0 h-full w-80 bg-gray-900/95 backdrop-blur-md border-l border-white/10 z-50 lg:hidden overflow-y-auto"
            >
              <div className="flex flex-col h-full p-4">
                {/* Mobile Menu Header */}
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-base font-semibold text-white">Menu</h2>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-gray-400 hover:text-white p-1 rounded-md hover:bg-white/5 transition-all"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Mobile Navigation Items - Updated */}
                <nav className="flex-1 space-y-1">
                  {/* Products Menu in Mobile */}
                  <div className="mb-6">
                    <div className="px-3 py-2 mb-2">
                      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                        Products
                      </h3>
                    </div>
                    <MobileProductsMenu onClose={() => setIsMobileMenuOpen(false)} />
                  </div>

                  {/* Solutions Menu in Mobile */}
                  <div className="mb-6">
                    <div className="px-3 py-2 mb-2">
                      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                        Solutions
                      </h3>
                    </div>
                    <MobileSolutionsMenu onClose={() => setIsMobileMenuOpen(false)} />
                  </div>

                  {/* Other Navigation Items */}
                  {navItems.map((item, index) => (
                    <MobileNavigationItem
                      key={index}
                      href={item.href}
                      name={item.name}
                      isActive={pathname === item.href}
                    />
                  ))}
                </nav>

                {/* Mobile User Info - unchanged */}
                {isLoggedIn && user && (
                  <div className="pt-4 border-t border-white/5">
                    <div className="mb-3">
                      <p className="text-white text-sm font-medium mb-0.5">
                        {(user?.first_name as string) || (user?.username as string)}
                      </p>
                      <p className="text-gray-400 text-xs">
                        {user?.email as string}
                      </p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-sm px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-md transition-all"
                    >
                      Logout
                    </button>
                  </div>
                )}
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
      />
    </>
  );
}

// Logo Section Component - Reduced size
const LogoSection = () => (
  <Link href="/" className="flex items-center">
    <Image
      src={Logo}
      alt="Saple.AI Logo"
      width={70} // Reduced from 80
      height={14} // Reduced from 16
      className="h-5 w-auto" // Reduced from h-6
      priority
      loading="eager"
    />
  </Link>
);

// Navigation Items Component (Desktop) - Smaller text and padding
// interface NavigationItemsProps {
//   navItems: Array<{ href: string; name: string }>;
//   pathname: string;
// }

// const NavigationItems = ({ navItems, pathname }: NavigationItemsProps) => (
//   <>
//     {navItems.map((item, index) => (
//       <NavigationItem
//         key={index}
//         href={item.href}
//         name={item.name}
//         isActive={pathname === item.href}
//       />
//     ))}
//   </>
// );

// Single Navigation Item Component (Desktop) - Smaller
interface NavigationItemProps {
  href: string;
  name: string;
  isActive: boolean;
}

const NavigationItem = ({ href, name, isActive }: NavigationItemProps) => (
  <Link
    href={href}
    className={`px-2 py-1 text-sm font-medium rounded-md transition-all ${isActive 
      ? 'text-white bg-white/10' 
      : 'text-white/80 hover:text-white hover:bg-white/5'
    }`}
  >
    {name}
  </Link>
);

// Mobile Navigation Item Component - Smaller
interface MobileNavigationItemProps {
  href: string;
  name: string;
  isActive: boolean;
}

const MobileNavigationItem = ({ href, name, isActive }: MobileNavigationItemProps) => (
  <Link
    href={href}
    className={`block px-3 py-2 text-sm rounded-md transition-all ${isActive
      ? 'text-white bg-white/10'
      : 'text-white/80 hover:text-white hover:bg-white/5'
    }`}
  >
    {name}
  </Link>
);