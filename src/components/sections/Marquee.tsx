'use client';

import { motion } from 'framer-motion';

interface MarqueeProps {
  items?: string[];
  speed?: number;
  variant?: 'default' | 'inverted';
  className?: string;
}

// Default items matching Concept 1
const defaultItems = [
  '★ Art That Moves You',
  '★ Limited Editions',
  '★ Collectible Characters',
  '★ Free Shipping Over $50',
];

export function Marquee({
  items = defaultItems,
  speed = 20,
  variant = 'default',
  className = '',
}: MarqueeProps) {
  // Double the items for seamless loop
  const duplicatedItems = [...items, ...items];

  return (
    <div
      className={`
        bg-black
        border-t-4 border-b-4 border-pop-red
        overflow-hidden
        py-4
        ${className}
      `}
    >
      <motion.div
        className="flex whitespace-nowrap"
        animate={{
          x: ['0%', '-50%'],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: speed,
            ease: 'linear',
          },
        }}
      >
        {duplicatedItems.map((item, index) => (
          <span
            key={index}
            className={`
              font-display text-xl sm:text-2xl
              px-6 sm:px-8
              uppercase
              ${index % 2 === 0 ? 'text-pop-pink' : 'text-pop-yellow'}
            `}
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// Rainbow Stripe Bar - appears below story section
export function RainbowStripe({ className = '' }: { className?: string }) {
  return (
    <div
      className={`h-5 ${className}`}
      style={{
        background: `repeating-linear-gradient(
          90deg,
          var(--pop-red) 0px,
          var(--pop-red) 40px,
          var(--pop-orange) 40px,
          var(--pop-orange) 80px,
          var(--pop-yellow) 80px,
          var(--pop-yellow) 120px,
          var(--pop-green) 120px,
          var(--pop-green) 160px,
          var(--pop-blue) 160px,
          var(--pop-blue) 200px,
          var(--pop-purple) 200px,
          var(--pop-purple) 240px
        )`,
      }}
    />
  );
}

// Emoji Marquee (alternate style)
export function EmojiMarquee({ className = '' }: { className?: string }) {
  const emojis = ['🐰', '✨', '🎨', '💖', '🌟', '🔥', '💫', '🎉', '🐱', '⭐'];
  const duplicatedEmojis = [...emojis, ...emojis, ...emojis];

  return (
    <div
      className={`
        bg-pop-yellow
        border-y-4 border-black
        overflow-hidden
        py-3
        ${className}
      `}
    >
      <motion.div
        className="flex whitespace-nowrap"
        animate={{
          x: ['0%', '-33.33%'],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: 20,
            ease: 'linear',
          },
        }}
      >
        {duplicatedEmojis.map((emoji, index) => (
          <span
            key={index}
            className="text-3xl md:text-4xl mx-6 md:mx-10"
          >
            {emoji}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// Interactive hover marquee
export function InteractiveMarquee({
  items = defaultItems,
  className = '',
}: MarqueeProps) {
  return (
    <div
      className={`
        bg-pop-blue
        border-y-4 border-black
        overflow-hidden
        py-4
        group
        ${className}
      `}
    >
      <motion.div
        className="flex whitespace-nowrap"
        animate={{
          x: ['0%', '-50%'],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: 30,
            ease: 'linear',
          },
        }}
        whileHover={{
          animationPlayState: 'paused',
        }}
        style={{
          animationPlayState: 'running',
        }}
      >
        {[...items, ...items].map((item, index) => (
          <motion.span
            key={index}
            className="
              text-black
              font-display text-xl md:text-2xl
              mx-4 md:mx-8
              uppercase tracking-wider
              cursor-pointer
            "
            whileHover={{
              scale: 1.2,
              color: '#FF3B3B',
            }}
          >
            {item}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}
