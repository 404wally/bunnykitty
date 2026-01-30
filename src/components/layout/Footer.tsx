'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const footerLinks = {
  shop: [
    { href: '/shop', label: 'All Products' },
    { href: '/shop/apparel', label: 'Apparel' },
    { href: '/shop/art', label: 'Art Prints' },
    { href: '/shop/accessories', label: 'Accessories' },
  ],
  explore: [
    { href: '/story', label: 'The Story' },
    { href: '/about', label: 'About the Artist' },
    { href: '/lookbook', label: 'Lookbook' },
    { href: '/contact', label: 'Contact' },
  ],
  support: [
    { href: '/faq', label: 'FAQ' },
    { href: '/shipping', label: 'Shipping Info' },
    { href: '/returns', label: 'Returns' },
    { href: '/size-guide', label: 'Size Guide' },
  ],
};

const socialLinks = [
  { href: 'https://instagram.com/bunnykittyofficial', label: 'Instagram', icon: InstagramIcon },
  { href: 'https://twitter.com/bunnykitty', label: 'Twitter', icon: TwitterIcon },
  { href: 'https://tiktok.com/@bunnykitty', label: 'TikTok', icon: TikTokIcon },
];

export function Footer() {
  return (
    <footer className="bg-black text-white">
      {/* Newsletter Section */}
      <div className="bg-pop-yellow border-y-4 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-display text-3xl md:text-4xl text-black">
                JOIN THE CREW
              </h3>
              <p className="text-black font-semibold mt-2">
                Get exclusive drops, art updates, and BunnyKitty news.
              </p>
            </div>
            <form className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="
                  flex-1 md:w-80
                  px-4 py-3
                  bg-white text-black
                  border-4 border-black
                  font-semibold
                  placeholder:text-gray-500
                  focus:outline-none focus:ring-0
                  shadow-[4px_4px_0px_#1A1A1A]
                "
              />
              <motion.button
                type="submit"
                className="
                  px-6 py-3
                  bg-pop-red text-white
                  border-4 border-black
                  font-bold uppercase
                  shadow-[4px_4px_0px_#1A1A1A]
                "
                whileHover={{ y: -2, boxShadow: '6px 6px 0px #1A1A1A' }}
                whileTap={{ y: 2, boxShadow: '2px 2px 0px #1A1A1A' }}
              >
                GO!
              </motion.button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 bg-pop-pink border-4 border-white rounded-full flex items-center justify-center">
                <span className="text-3xl">🐰</span>
              </div>
              <span className="font-display text-3xl">BUNNYKITTY</span>
            </Link>
            <p className="text-gray-400 max-w-sm mb-6">
              Character-driven art that brings joy and color to your world.
              Born in the city, loved everywhere.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    w-12 h-12
                    bg-white text-black
                    border-4 border-white
                    flex items-center justify-center
                    hover:bg-pop-pink hover:border-pop-pink
                    transition-colors
                  "
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-display text-xl mb-4 text-pop-yellow">SHOP</h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-pop-pink transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore Links */}
          <div>
            <h4 className="font-display text-xl mb-4 text-pop-blue">EXPLORE</h4>
            <ul className="space-y-3">
              {footerLinks.explore.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-pop-blue transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-display text-xl mb-4 text-pop-green">HELP</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-pop-green transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} BunnyKitty. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>

      {/* Fun Mascot Peek */}
      <motion.div
        className="fixed bottom-4 right-4 z-40 hidden lg:block"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        <motion.div
          className="
            w-16 h-16
            bg-pop-pink border-4 border-black
            rounded-full
            flex items-center justify-center
            shadow-[4px_4px_0px_#1A1A1A]
            cursor-pointer
          "
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          whileHover={{ scale: 1.1 }}
        >
          <span className="text-3xl">👋</span>
        </motion.div>
      </motion.div>
    </footer>
  );
}

// Social Icons
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
    </svg>
  );
}
