'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Home, Car, Settings, Phone, Menu, X } from 'lucide-react';

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('홈');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: '홈', href: '#home', icon: Home },
    { label: '차량', href: '#cars', icon: Car },
    { label: '서비스', href: '#services', icon: Settings },
    { label: '연락처', href: '#contact', icon: Phone }
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-300',
        isScrolled 
          ? 'bg-black/95 backdrop-blur-xl py-4' 
          : 'bg-gradient-to-b from-black/70 to-transparent py-6'
      )}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-red-600 text-2xl font-bold z-10">
            RENTIP
          </Link>

          {/* Desktop Animated Menu */}
          <div className="hidden md:flex items-center gap-3 bg-white/10 border border-white/20 backdrop-blur-lg py-1 px-1 rounded-full shadow-lg">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.label;

              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setActiveTab(item.label)}
                  className={cn(
                    "relative cursor-pointer text-sm font-semibold px-6 py-2 rounded-full transition-colors",
                    "text-white/80 hover:text-white",
                    isActive && "text-red-400"
                  )}
                >
                  <span className="hidden lg:inline">{item.label}</span>
                  <span className="lg:hidden">
                    <Icon size={18} strokeWidth={2.5} />
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="navHighlight"
                      className="absolute inset-0 w-full bg-red-500/20 rounded-full -z-10"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    >
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-red-500 rounded-t-full">
                        <div className="absolute w-12 h-6 bg-red-500/30 rounded-full blur-md -top-2 -left-2" />
                        <div className="absolute w-8 h-6 bg-red-500/20 rounded-full blur-md -top-1" />
                        <div className="absolute w-4 h-4 bg-red-500/20 rounded-full blur-sm top-0 left-2" />
                      </div>
                    </motion.div>
                  )}
                </a>
              );
            })}
          </div>

          {/* Contact Button */}
          <div className="hidden md:block">
            <a
              href="tel:010-2984-1376"
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              010-2984-1376
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white transition-colors duration-300 p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{
          opacity: isMobileMenuOpen ? 1 : 0,
          height: isMobileMenuOpen ? 'auto' : 0
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="md:hidden bg-black/95 backdrop-blur-lg overflow-hidden"
      >
        <div className="px-6 py-4 space-y-4">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.a
                key={item.label}
                href={item.href}
                className="flex items-center gap-3 text-white hover:text-red-400 py-2 transition-colors"
                onClick={() => {
                  setActiveTab(item.label);
                  setIsMobileMenuOpen(false);
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                  opacity: isMobileMenuOpen ? 1 : 0, 
                  x: isMobileMenuOpen ? 0 : -20 
                }}
                transition={{ 
                  delay: isMobileMenuOpen ? index * 0.1 : 0,
                  duration: 0.3 
                }}
              >
                <Icon size={20} />
                {item.label}
              </motion.a>
            );
          })}
          <motion.a
            href="tel:010-2984-1376"
            className="flex items-center justify-center gap-2 bg-red-600 text-white px-4 py-3 rounded-full text-center mt-4 transition-all hover:bg-red-700"
            onClick={() => setIsMobileMenuOpen(false)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: isMobileMenuOpen ? 1 : 0, 
              y: isMobileMenuOpen ? 0 : 20 
            }}
            transition={{ 
              delay: isMobileMenuOpen ? navItems.length * 0.1 : 0,
              duration: 0.3 
            }}
          >
            <Phone size={18} />
            010-2984-1376
          </motion.a>
        </div>
      </motion.div>
    </nav>
  );
};