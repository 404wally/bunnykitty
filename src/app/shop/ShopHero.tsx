'use client';

import { motion } from 'framer-motion';
import { SpeechBubble } from '@/components/ui/SpeechBubble';

export function ShopHero() {
  return (
    <section className="relative bg-pop-green pt-32 pb-20 overflow-hidden">
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

      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 left-[10%] text-4xl"
        animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        🛍️
      </motion.div>
      <motion.div
        className="absolute top-32 right-[15%] text-3xl"
        animate={{ y: [0, 10, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        ✨
      </motion.div>
      <motion.div
        className="absolute bottom-10 left-[20%] text-4xl"
        animate={{ y: [0, -10, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        🎨
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-6"
          >
            <SpeechBubble variant="yellow">
              <span className="text-lg">Get your hands on some goodies!</span>
            </SpeechBubble>
          </motion.div>

          <motion.h1
            className="font-display text-6xl sm:text-8xl text-black mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            THE SHOP
          </motion.h1>

          <motion.p
            className="text-xl text-black/80 font-semibold max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Original art, premium apparel, and accessories that bring the BunnyKitty universe to life.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
