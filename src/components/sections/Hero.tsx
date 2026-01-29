'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center bg-pop-yellow overflow-hidden"
      style={{
        // Match Concept 1 exactly: padding: 8rem 2rem 4rem
        padding: '8rem 2rem 4rem',
      }}
    >
      {/* Animated Background Pattern */}
      <div
        className="fixed inset-0 pointer-events-none z-[-1]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 80%, var(--pop-pink) 0%, transparent 8%),
            radial-gradient(circle at 80% 20%, var(--pop-blue) 0%, transparent 8%),
            radial-gradient(circle at 40% 40%, var(--pop-green) 0%, transparent 5%),
            radial-gradient(circle at 60% 60%, var(--pop-purple) 0%, transparent 6%)
          `,
        }}
      />

      {/* Floating TWURP Characters - positioned exactly like Concept 1 */}
      <FloatingCharacter position="top-[20%] left-[10%]" delay={0} />
      <FloatingCharacter position="top-[30%] right-[10%]" delay={0.5} />
      <FloatingCharacter position="bottom-[20%] left-[15%]" delay={1} />
      <FloatingCharacter position="bottom-[30%] right-[15%]" delay={1.5} />

      {/* Hero Content */}
      <div className="relative z-10 text-center max-w-[900px]">
        {/* Hero Badge - margin-bottom: 2rem like Concept 1 */}
        <motion.span
          className="
            inline-block
            px-6 py-2
            bg-pop-pink
            border-3 border-black
            font-extrabold uppercase text-sm
            shadow-[4px_4px_0_#1A1A1A]
            mb-8
          "
          animate={{ rotate: [-2, 2, -2] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          ✨ Welcome to the Universe ✨
        </motion.span>

        {/* Main Headline - margin-bottom: 2rem like Concept 1 */}
        <motion.h1
          className="font-display leading-[0.9] uppercase mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span
            className="block text-[clamp(4rem,15vw,12rem)] text-black"
            style={{
              WebkitTextStroke: '3px #1A1A1A',
              textShadow: '8px 8px 0 var(--pop-blue)',
            }}
          >
            Bunny
          </span>
          <span
            className="block text-[clamp(4rem,15vw,12rem)] text-pop-red"
            style={{
              WebkitTextStroke: '3px #1A1A1A',
              textShadow: '8px 8px 0 var(--pop-pink)',
            }}
          >
            Kitty
          </span>
        </motion.h1>

        {/* Description - Concept 1: font-size: 1.5rem, margin: 0 auto 3rem */}
        <motion.p
          className="text-2xl font-semibold max-w-[600px] mx-auto mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Enter a world where art comes alive! Collectible characters, limited editions, and pure creative joy.
        </motion.p>

        {/* CTA Buttons - Concept 1: padding: 1.25rem 2.5rem, font-size: 1.1rem */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <motion.a
            href="/shop"
            className="
              inline-flex items-center justify-center gap-2
              px-10 py-5
              bg-pop-red text-white
              font-extrabold text-lg uppercase
              border-4 border-black
              shadow-[6px_6px_0_#1A1A1A]
            "
            whileHover={{
              x: -3,
              y: -3,
              boxShadow: '9px 9px 0 #1A1A1A',
            }}
            whileTap={{ x: 1, y: 1, boxShadow: '4px 4px 0 #1A1A1A' }}
          >
            🎨 Explore Collection
          </motion.a>
          <motion.a
            href="/story"
            className="
              inline-flex items-center justify-center gap-2
              px-10 py-5
              bg-white text-black
              font-extrabold text-lg uppercase
              border-4 border-black
              shadow-[6px_6px_0_#1A1A1A]
              hover:bg-pop-green
            "
            whileHover={{
              x: -3,
              y: -3,
              boxShadow: '9px 9px 0 #1A1A1A',
            }}
            whileTap={{ x: 1, y: 1, boxShadow: '4px 4px 0 #1A1A1A' }}
          >
            📖 Read The Story
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

// Floating TWURP Character Component - sized to match Concept 1 (font-size: 4rem = ~64px)
function FloatingCharacter({ position, delay }: { position: string; delay: number }) {
  return (
    <motion.div
      className={`absolute ${position} w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 z-10 cursor-grab`}
      animate={{
        y: [0, -20, 0],
        rotate: [0, 10, 0],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        delay,
        ease: 'easeInOut',
      }}
      whileHover={{ scale: 1.1 }}
      drag
      dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
      dragElastic={0.1}
    >
      <Image
        src="/images/twurp.png"
        alt="TWURP Character"
        fill
        className="object-contain"
        sizes="(max-width: 640px) 96px, (max-width: 768px) 112px, 128px"
      />
    </motion.div>
  );
}
