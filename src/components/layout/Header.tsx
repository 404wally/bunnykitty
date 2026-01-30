'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { href: '/story', label: 'World', hoverColor: 'hover:bg-pop-pink' },
  { href: '/shop', label: 'Shop', hoverColor: 'hover:bg-pop-blue' },
  { href: '/lookbook', label: 'Collections', hoverColor: 'hover:bg-pop-green' },
  { href: '/about', label: 'Artist', hoverColor: 'hover:bg-pop-purple' },
];

// Rainbow colors for logo letters (CSS color values for dynamic cycling)
const rainbowColors = [
  '#FF3B3B', // pop-red
  '#FF6B35', // pop-orange
  '#FFE135', // pop-yellow
  '#39FF14', // pop-green
  '#00D4FF', // pop-blue
  '#9D4EDD', // pop-purple
  '#FF6EB4', // pop-pink
];

// Static color classes for initial state
const logoColors = [
  'text-pop-red',
  'text-pop-orange',
  'text-pop-yellow',
  'text-pop-green',
  'text-pop-blue',
  'text-pop-purple',
  'text-pop-pink',
  'text-pop-red',
  'text-pop-orange',
  'text-pop-yellow',
];

// Animated Rainbow Logo Component
function AnimatedLogo() {
  const [isHovering, setIsHovering] = useState(false);
  const [colorOffset, setColorOffset] = useState(0);
  const letters = 'BUNNYKITTY'.split('');

  // Cycle colors when hovering
  useEffect(() => {
    if (!isHovering) {
      setColorOffset(0);
      return;
    }

    const interval = setInterval(() => {
      setColorOffset((prev) => (prev + 1) % rainbowColors.length);
    }, 150); // Speed of color cycling

    return () => clearInterval(interval);
  }, [isHovering]);

  return (
    <Link
      href="/"
      className="flex items-center"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <span className="font-display text-xl sm:text-2xl tracking-[-2px] uppercase">
        {letters.map((letter, index) => {
          // When hovering, cycle through rainbow colors with offset
          const colorIndex = isHovering
            ? (index + colorOffset) % rainbowColors.length
            : index % logoColors.length;

          return (
            <motion.span
              key={index}
              className={`inline-block ${!isHovering ? logoColors[index] : ''}`}
              style={isHovering ? { color: rainbowColors[colorIndex] } : {}}
              animate={{
                y: isHovering ? [0, -5, 0] : [0, -3, 0],
                scale: isHovering ? [1, 1.1, 1] : 1,
              }}
              transition={{
                duration: isHovering ? 0.3 : 0.5,
                repeat: Infinity,
                delay: index * 0.05,
                ease: 'easeInOut',
              }}
            >
              {letter}
            </motion.span>
          );
        })}
      </span>
    </Link>
  );
}

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);
  const lastScrollY = useRef(0);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // At top of page - always show
      if (currentScrollY < 50) {
        setIsVisible(true);
        setIsAtTop(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      setIsAtTop(false);

      // Scrolling down - hide header
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsVisible(false);
      }
      // Scrolling up - show header
      else if (currentScrollY < lastScrollY.current) {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Show header when mouse is near top of screen (within 60px)
      if (e.clientY < 60 && !isAtTop) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isAtTop]);

  return (
    <motion.header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-[1000] bg-white border-b-4 border-black shadow-[0_4px_0_#1A1A1A]"
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <div className="px-4 sm:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Animated Rainbow Logo with hover color cycling */}
          <AnimatedLogo />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`
                  px-3 lg:px-4 py-1.5 lg:py-2
                  bg-white
                  font-extrabold text-black text-xs uppercase
                  border-2 border-black
                  shadow-[3px_3px_0_#1A1A1A]
                  transition-all duration-200
                  hover:-translate-x-0.5 hover:-translate-y-0.5
                  hover:shadow-[4px_4px_0_#1A1A1A]
                  ${link.hoverColor}
                `}
              >
                {link.label}
              </Link>
            ))}
            {/* Cart Button */}
            <Link
              href="/cart"
              className="
                px-3 lg:px-4 py-1.5 lg:py-2
                bg-pop-red text-white
                font-extrabold text-xs uppercase
                border-2 border-black
                shadow-[3px_3px_0_#1A1A1A]
                transition-all duration-200
                hover:-translate-x-0.5 hover:-translate-y-0.5
                hover:shadow-[4px_4px_0_#1A1A1A]
                hover:bg-pop-pink
              "
            >
              Cart (0)
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="
              md:hidden
              w-10 h-10
              bg-pop-red text-white
              border-2 border-black
              flex items-center justify-center
              shadow-[3px_3px_0_#1A1A1A]
            "
          >
            <motion.div
              animate={isMobileMenuOpen ? 'open' : 'closed'}
              className="flex flex-col gap-1"
            >
              <motion.span
                className="w-5 h-0.5 bg-white block"
                variants={{
                  open: { rotate: 45, y: 5 },
                  closed: { rotate: 0, y: 0 },
                }}
              />
              <motion.span
                className="w-5 h-0.5 bg-white block"
                variants={{
                  open: { opacity: 0 },
                  closed: { opacity: 1 },
                }}
              />
              <motion.span
                className="w-5 h-0.5 bg-white block"
                variants={{
                  open: { rotate: -45, y: -5 },
                  closed: { rotate: 0, y: 0 },
                }}
              />
            </motion.div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t-4 border-black"
          >
            <nav className="flex flex-col p-4 gap-2">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`
                      block
                      px-4 py-3
                      font-extrabold text-lg text-black uppercase
                      bg-white border-3 border-black
                      shadow-[4px_4px_0_#1A1A1A]
                      ${link.hoverColor}
                    `}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.1 }}
              >
                <Link
                  href="/cart"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="
                    block
                    px-4 py-3
                    font-extrabold text-lg text-white uppercase
                    bg-pop-red border-3 border-black
                    shadow-[4px_4px_0_#1A1A1A]
                  "
                >
                  Cart (0)
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
