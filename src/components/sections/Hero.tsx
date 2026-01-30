'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

export function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center bg-pop-yellow overflow-visible px-4 sm:px-8 pt-24 pb-8 sm:pt-32 sm:pb-16"
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

      {/* Floating TWURP Characters - hidden on mobile, visible on tablet+ */}
      {/* Drag them anywhere! */}
      <FloatingCharacter position="top-[20%] left-[5%] sm:left-[10%]" delay={0} className="hidden sm:block" />
      <FloatingCharacter position="top-[30%] right-[5%] sm:right-[10%]" delay={0.5} className="hidden sm:block" />
      <FloatingCharacter position="bottom-[25%] left-[5%] sm:left-[15%]" delay={1} className="hidden md:block" />
      <FloatingCharacter position="bottom-[30%] right-[5%] sm:right-[15%]" delay={1.5} className="hidden md:block" />

      {/* Hero Content */}
      <div className="relative z-10 text-center max-w-[900px]">
        {/* Hero Badge - responsive sizing */}
        <motion.span
          className="
            inline-block
            px-4 py-1.5 sm:px-6 sm:py-2
            bg-pop-pink
            border-2 sm:border-3 border-black
            font-extrabold uppercase text-xs sm:text-sm
            shadow-[3px_3px_0_#1A1A1A] sm:shadow-[4px_4px_0_#1A1A1A]
            mb-4 sm:mb-8
          "
          animate={{ rotate: [-2, 2, -2] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          ✨ Welcome to the Universe ✨
        </motion.span>

        {/* Main Headline - responsive margins */}
        <motion.h1
          className="font-display leading-[0.85] sm:leading-[0.9] uppercase mb-4 sm:mb-8"
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

        {/* Description - responsive text sizing */}
        <motion.p
          className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold max-w-[600px] mx-auto mb-6 sm:mb-10 md:mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Enter a world where art comes alive! Collectible characters, limited editions, and pure creative joy.
        </motion.p>

        {/* CTA Buttons - responsive sizing */}
        <motion.div
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <motion.a
            href="/shop"
            className="
              inline-flex items-center justify-center gap-2
              px-6 py-3 sm:px-8 sm:py-4 md:px-10 md:py-5
              bg-pop-red text-white
              font-extrabold text-sm sm:text-base md:text-lg uppercase
              border-3 sm:border-4 border-black
              shadow-[4px_4px_0_#1A1A1A] sm:shadow-[6px_6px_0_#1A1A1A]
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
              px-6 py-3 sm:px-8 sm:py-4 md:px-10 md:py-5
              bg-white text-black
              font-extrabold text-sm sm:text-base md:text-lg uppercase
              border-3 sm:border-4 border-black
              shadow-[4px_4px_0_#1A1A1A] sm:shadow-[6px_6px_0_#1A1A1A]
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
function FloatingCharacter({
  position,
  delay,
  className = '',
}: {
  position: string;
  delay: number;
  className?: string;
}) {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <motion.div
      className={`absolute ${position} w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 z-20 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'} ${className}`}
      animate={isDragging ? {} : {
        y: [0, -20, 0],
        rotate: [0, 10, 0],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        delay,
        ease: 'easeInOut',
      }}
      whileHover={{ scale: 1.15 }}
      whileDrag={{ scale: 1.2, zIndex: 50 }}
      drag
      dragConstraints={{ top: -500, left: -500, right: 500, bottom: 500 }}
      dragElastic={0.2}
      dragMomentum={false}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
    >
      <Image
        src="/images/twurp.png"
        alt="TWURP Character - Drag me!"
        fill
        className="object-contain pointer-events-none"
        sizes="(max-width: 640px) 96px, (max-width: 768px) 112px, 128px"
        draggable={false}
      />
    </motion.div>
  );
}
