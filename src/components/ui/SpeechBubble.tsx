'use client';

import { motion } from 'framer-motion';

type BubblePosition = 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
type BubbleVariant = 'yellow' | 'pink' | 'blue' | 'white' | 'green';

interface SpeechBubbleProps {
  children: React.ReactNode;
  position?: BubblePosition;
  variant?: BubbleVariant;
  className?: string;
  animated?: boolean;
}

const variantStyles: Record<BubbleVariant, { bg: string; tailColor: string }> = {
  yellow: { bg: 'bg-pop-yellow', tailColor: '#FFE135' },
  pink: { bg: 'bg-pop-pink', tailColor: '#FF6EB4' },
  blue: { bg: 'bg-pop-blue', tailColor: '#00D4FF' },
  white: { bg: 'bg-white', tailColor: '#FFFFFF' },
  green: { bg: 'bg-pop-green', tailColor: '#39FF14' },
};

const tailPositions: Record<BubblePosition, string> = {
  'bottom-left': 'bottom-0 left-6 translate-y-full',
  'bottom-right': 'bottom-0 right-6 translate-y-full',
  'top-left': 'top-0 left-6 -translate-y-full rotate-180',
  'top-right': 'top-0 right-6 -translate-y-full rotate-180',
};

export function SpeechBubble({
  children,
  position = 'bottom-left',
  variant = 'yellow',
  className = '',
  animated = true,
}: SpeechBubbleProps) {
  const { bg, tailColor } = variantStyles[variant];

  const bubbleContent = (
    <div className={`relative ${className}`}>
      <div
        className={`
          ${bg}
          border-4 border-black
          rounded-2xl
          px-6 py-4
          font-bold text-black
          shadow-[4px_4px_0px_#1A1A1A]
        `}
      >
        {children}
      </div>
      {/* Tail */}
      <div className={`absolute ${tailPositions[position]}`}>
        <svg
          width="24"
          height="20"
          viewBox="0 0 24 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Black outline */}
          <path
            d="M0 0 L12 20 L24 0"
            fill="#1A1A1A"
            transform="translate(-2, 0) scale(1.15, 1)"
          />
          {/* Fill */}
          <path
            d="M2 0 L12 16 L22 0"
            fill={tailColor}
          />
        </svg>
      </div>
    </div>
  );

  if (animated) {
    return (
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 25,
        }}
      >
        {bubbleContent}
      </motion.div>
    );
  }

  return bubbleContent;
}

// Thought bubble (cloud shape)
export function ThoughtBubble({
  children,
  variant = 'white',
  className = '',
}: {
  children: React.ReactNode;
  variant?: BubbleVariant;
  className?: string;
}) {
  const { bg } = variantStyles[variant];

  return (
    <div className={`relative ${className}`}>
      <div
        className={`
          ${bg}
          border-4 border-black
          rounded-full
          px-8 py-6
          font-bold text-black
          shadow-[4px_4px_0px_#1A1A1A]
        `}
      >
        {children}
      </div>
      {/* Thought dots */}
      <div className="absolute -bottom-4 left-8">
        <div className={`w-4 h-4 ${bg} border-2 border-black rounded-full`} />
      </div>
      <div className="absolute -bottom-8 left-4">
        <div className={`w-3 h-3 ${bg} border-2 border-black rounded-full`} />
      </div>
    </div>
  );
}

// POW/BAM action bubble
export function ActionBubble({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={`relative inline-block ${className}`}
      initial={{ scale: 0, rotate: -10 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{
        type: 'spring',
        stiffness: 600,
        damping: 15,
      }}
    >
      {/* Spiky background */}
      <svg
        viewBox="0 0 200 150"
        className="absolute inset-0 w-full h-full"
        style={{ filter: 'drop-shadow(4px 4px 0px #1A1A1A)' }}
      >
        <path
          d="M100,10 L115,40 L150,25 L135,55 L175,60 L140,80 L165,115 L125,95 L100,140 L75,95 L35,115 L60,80 L25,60 L65,55 L50,25 L85,40 Z"
          fill="#FFE135"
          stroke="#1A1A1A"
          strokeWidth="4"
        />
      </svg>
      <div className="relative z-10 px-8 py-6 text-center">
        <span className="font-display text-2xl md:text-4xl text-black uppercase">
          {children}
        </span>
      </div>
    </motion.div>
  );
}
