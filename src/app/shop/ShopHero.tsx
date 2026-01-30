'use client';

import { motion } from 'framer-motion';
import { SpeechBubble } from '@/components/ui/SpeechBubble';

export function ShopHero() {
  return (
    <section className="relative bg-pop-green pt-20 pb-8 md:pt-24 md:pb-12 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle, #1A1A1A 2px, transparent 2px)`,
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      {/* Floating Elements - smaller and hidden on mobile */}
      <motion.div
        className="absolute top-16 left-[10%] text-2xl hidden md:block"
        animate={{ y: [0, -10, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        🛍️
      </motion.div>
      <motion.div
        className="absolute top-20 right-[15%] text-xl hidden md:block"
        animate={{ y: [0, 10, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        ✨
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-3"
          >
            <SpeechBubble variant="yellow">
              <span className="text-sm md:text-base">Get your hands on some goodies!</span>
            </SpeechBubble>
          </motion.div>

          <motion.h1
            className="font-display text-4xl sm:text-5xl md:text-6xl text-black mb-2"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            THE SHOP
          </motion.h1>

          <motion.p
            className="text-base md:text-lg text-black/80 font-semibold max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Original art, premium apparel, and accessories.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
