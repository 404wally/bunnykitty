'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Image from 'next/image';
import { useState, useRef } from 'react';

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  // Main scroll progress for the hero section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Smooth spring for scroll values (prevents jitter)
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // PARALLAX LAYERS - Different speeds create depth illusion
  // Layer 1 (Closest/Fastest) - moves most with scroll
  const layer1Y = useTransform(smoothProgress, [0, 1], [0, -200]);
  const layer1Scale = useTransform(smoothProgress, [0, 1], [1, 1.1]);

  // Layer 2 (Mid) - moderate movement
  const layer2Y = useTransform(smoothProgress, [0, 1], [0, -120]);
  const layer2Scale = useTransform(smoothProgress, [0, 1], [1, 1.05]);

  // Layer 3 (Far/Slowest) - minimal movement, appears distant
  const layer3Y = useTransform(smoothProgress, [0, 1], [0, -60]);

  // HEADLINE PARALLAX - "BUNNY" and "KITTY" separate as you scroll
  const bunnyY = useTransform(smoothProgress, [0, 1], [0, -80]);
  const bunnyX = useTransform(smoothProgress, [0, 1], [0, -30]);
  const kittyY = useTransform(smoothProgress, [0, 1], [0, 40]);
  const kittyX = useTransform(smoothProgress, [0, 1], [0, 30]);

  // Content fade/rise effect
  const contentOpacity = useTransform(smoothProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(smoothProgress, [0, 0.5], [0, 50]);

  // Background shapes parallax
  const shape1Y = useTransform(smoothProgress, [0, 1], [0, -150]);
  const shape2Y = useTransform(smoothProgress, [0, 1], [0, -80]);
  const shape3Y = useTransform(smoothProgress, [0, 1], [0, -200]);
  const shape1Rotate = useTransform(smoothProgress, [0, 1], [0, 45]);
  const shape2Rotate = useTransform(smoothProgress, [0, 1], [0, -30]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[120vh] flex items-center justify-center bg-pop-yellow overflow-hidden px-4 sm:px-8 pt-24 pb-8 sm:pt-32 sm:pb-16"
    >
      {/* ============================================
          PARALLAX BACKGROUND SHAPES (Deepest Layer)
          ============================================ */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Large circle - far back, slow movement */}
        <motion.div
          className="absolute -top-20 -left-20 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] rounded-full bg-pop-pink/20 blur-sm"
          style={{ y: shape1Y, rotate: shape1Rotate }}
        />

        {/* Star burst shape - mid layer */}
        <motion.div
          className="absolute top-[20%] right-[10%] w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] bg-pop-blue/30"
          style={{
            y: shape2Y,
            rotate: shape2Rotate,
            clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
          }}
        />

        {/* Small squares scattered */}
        <motion.div
          className="absolute bottom-[30%] left-[15%] w-16 h-16 sm:w-24 sm:h-24 bg-pop-purple/25 rotate-12"
          style={{ y: shape3Y }}
        />
        <motion.div
          className="absolute top-[40%] left-[5%] w-12 h-12 sm:w-16 sm:h-16 bg-pop-green/20 -rotate-6"
          style={{ y: shape2Y }}
        />
        <motion.div
          className="absolute bottom-[20%] right-[8%] w-20 h-20 sm:w-28 sm:h-28 bg-pop-orange/20 rotate-45"
          style={{ y: shape1Y }}
        />
      </div>

      {/* ============================================
          ANIMATED GRADIENT BACKGROUND
          ============================================ */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 80%, var(--pop-pink) 0%, transparent 8%),
            radial-gradient(circle at 80% 20%, var(--pop-blue) 0%, transparent 8%),
            radial-gradient(circle at 40% 40%, var(--pop-green) 0%, transparent 5%),
            radial-gradient(circle at 60% 60%, var(--pop-purple) 0%, transparent 6%)
          `,
          y: layer3Y,
        }}
      />

      {/* ============================================
          FLOATING CHARACTERS - 3 DEPTH LAYERS
          ============================================ */}

      {/* LAYER 3 (Farthest - slowest, smallest, more transparent) */}
      <ParallaxCharacter
        position="top-[15%] left-[3%]"
        delay={0}
        layer={3}
        layerY={layer3Y}
        className="hidden md:block opacity-60"
        size="small"
      />
      <ParallaxCharacter
        position="bottom-[40%] right-[3%]"
        delay={0.8}
        layer={3}
        layerY={layer3Y}
        className="hidden lg:block opacity-60"
        size="small"
      />

      {/* LAYER 2 (Middle - medium speed and size) */}
      <ParallaxCharacter
        position="top-[25%] right-[8%] sm:right-[12%]"
        delay={0.3}
        layer={2}
        layerY={layer2Y}
        layerScale={layer2Scale}
        className="hidden sm:block opacity-80"
        size="medium"
      />
      <ParallaxCharacter
        position="bottom-[20%] left-[8%] sm:left-[12%]"
        delay={1.1}
        layer={2}
        layerY={layer2Y}
        layerScale={layer2Scale}
        className="hidden md:block opacity-80"
        size="medium"
      />

      {/* LAYER 1 (Closest - fastest, largest, full opacity) */}
      <ParallaxCharacter
        position="top-[35%] left-[5%] sm:left-[8%]"
        delay={0.6}
        layer={1}
        layerY={layer1Y}
        layerScale={layer1Scale}
        className="hidden sm:block"
        size="large"
      />
      <ParallaxCharacter
        position="bottom-[25%] right-[5%] sm:right-[10%]"
        delay={1.4}
        layer={1}
        layerY={layer1Y}
        layerScale={layer1Scale}
        className="hidden sm:block"
        size="large"
      />

      {/* ============================================
          HERO CONTENT WITH PARALLAX TEXT
          ============================================ */}
      <motion.div
        className="relative z-10 text-center max-w-[900px]"
        style={{ opacity: contentOpacity, y: contentY }}
      >
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

        {/* Main Headline - PARALLAX SPLIT on scroll */}
        <motion.h1
          className="font-display leading-[0.9] sm:leading-[0.95] uppercase mb-4 sm:mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.span
            className="block text-[clamp(4rem,15vw,12rem)] text-black"
            style={{
              WebkitTextStroke: '3px #1A1A1A',
              textShadow: '8px 8px 0 var(--pop-blue)',
              y: bunnyY,
              x: bunnyX,
            }}
          >
            Bunny
          </motion.span>
          <motion.span
            className="block text-[clamp(4rem,15vw,12rem)] text-pop-red"
            style={{
              WebkitTextStroke: '3px #1A1A1A',
              textShadow: '8px 8px 0 var(--pop-pink)',
              y: kittyY,
              x: kittyX,
            }}
          >
            Kitty
          </motion.span>
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
      </motion.div>

      {/* ============================================
          SCROLL INDICATOR
          ============================================ */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ opacity: contentOpacity }}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="text-xs font-bold uppercase tracking-wider text-black/60">Scroll</span>
        <div className="w-6 h-10 border-3 border-black/40 rounded-full flex justify-center pt-2">
          <motion.div
            className="w-1.5 h-3 bg-black/60 rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </section>
  );
}

// ============================================
// PARALLAX CHARACTER COMPONENT
// Characters exist in 3 depth layers with different
// scroll speeds, sizes, and opacity to create depth
// ============================================
function ParallaxCharacter({
  position,
  delay,
  layer,
  layerY,
  layerScale,
  className = '',
  size = 'medium',
}: {
  position: string;
  delay: number;
  layer: 1 | 2 | 3;
  layerY: import('framer-motion').MotionValue<number>;
  layerScale?: import('framer-motion').MotionValue<number>;
  className?: string;
  size?: 'small' | 'medium' | 'large';
}) {
  const [isDragging, setIsDragging] = useState(false);

  // Size classes based on depth layer
  const sizeClasses = {
    small: 'w-14 h-14 sm:w-18 sm:h-18 md:w-20 md:h-20',
    medium: 'w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28',
    large: 'w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36',
  };

  // Z-index based on layer (closer = higher z-index)
  const zIndex = layer === 1 ? 30 : layer === 2 ? 20 : 10;

  // Float animation amplitude varies by layer (closer = more movement)
  const floatAmplitude = layer === 1 ? 25 : layer === 2 ? 18 : 12;
  const rotateAmplitude = layer === 1 ? 12 : layer === 2 ? 8 : 5;

  return (
    <motion.div
      className={`absolute ${position} ${sizeClasses[size]} ${className}`}
      style={{
        y: layerY,
        scale: layerScale || 1,
        zIndex: isDragging ? 50 : zIndex,
      }}
    >
      <motion.div
        className={`w-full h-full ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        animate={
          isDragging
            ? {}
            : {
                y: [0, -floatAmplitude, 0],
                rotate: [0, rotateAmplitude, 0, -rotateAmplitude / 2, 0],
              }
        }
        transition={{
          duration: 3 + layer * 0.5, // Slower animation for distant objects
          repeat: Infinity,
          delay,
          ease: 'easeInOut',
        }}
        whileHover={{ scale: 1.15, rotate: 5 }}
        whileDrag={{ scale: 1.25 }}
        drag
        dragConstraints={{ top: -500, left: -500, right: 500, bottom: 500 }}
        dragElastic={0.15}
        dragMomentum={true}
        dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setIsDragging(false)}
      >
        <Image
          src="/images/twurp.png"
          alt="TWURP Character - Drag me!"
          fill
          className="object-contain pointer-events-none drop-shadow-lg"
          sizes="(max-width: 640px) 96px, (max-width: 768px) 112px, 144px"
          draggable={false}
        />

        {/* Glow effect for closest layer */}
        {layer === 1 && (
          <div
            className="absolute inset-0 rounded-full bg-pop-yellow/30 blur-xl -z-10"
            style={{ transform: 'scale(1.5)' }}
          />
        )}
      </motion.div>
    </motion.div>
  );
}

// ============================================
// DECORATIVE FLOATING SHAPE
// Small geometric shapes that add visual interest
// ============================================
function FloatingShape({
  position,
  color,
  shape,
  size,
  delay,
  layerY,
}: {
  position: string;
  color: string;
  shape: 'circle' | 'square' | 'triangle' | 'star';
  size: string;
  delay: number;
  layerY: import('framer-motion').MotionValue<number>;
}) {
  const shapeStyles = {
    circle: 'rounded-full',
    square: 'rounded-sm rotate-12',
    triangle: '',
    star: '',
  };

  const clipPaths = {
    circle: undefined,
    square: undefined,
    triangle: 'polygon(50% 0%, 0% 100%, 100% 100%)',
    star: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
  };

  return (
    <motion.div
      className={`absolute ${position} ${size} ${color} ${shapeStyles[shape]} pointer-events-none`}
      style={{
        y: layerY,
        clipPath: clipPaths[shape],
      }}
      animate={{
        rotate: [0, 360],
        scale: [1, 1.1, 1],
      }}
      transition={{
        rotate: { duration: 20 + delay * 5, repeat: Infinity, ease: 'linear' },
        scale: { duration: 3, repeat: Infinity, ease: 'easeInOut', delay },
      }}
    />
  );
}
