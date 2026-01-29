'use client';

import { motion } from 'framer-motion';

type BadgeVariant = 'red' | 'yellow' | 'blue' | 'pink' | 'green' | 'purple' | 'orange';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
  animated?: boolean;
}

const variantStyles: Record<BadgeVariant, string> = {
  red: 'bg-pop-red text-white',
  yellow: 'bg-pop-yellow text-black',
  blue: 'bg-pop-blue text-black',
  pink: 'bg-pop-pink text-black',
  green: 'bg-pop-green text-black',
  purple: 'bg-pop-purple text-white',
  orange: 'bg-pop-orange text-white',
};

export function Badge({
  children,
  variant = 'red',
  className = '',
  animated = false
}: BadgeProps) {
  const baseStyles = `
    inline-flex items-center justify-center
    px-3 py-1
    text-xs font-bold uppercase tracking-wider
    border-2 border-black
    ${variantStyles[variant]}
    ${className}
  `;

  if (animated) {
    return (
      <motion.span
        className={baseStyles}
        initial={{ scale: 0.9 }}
        animate={{
          scale: [1, 1.05, 1],
          rotate: [-1, 1, -1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {children}
      </motion.span>
    );
  }

  return <span className={baseStyles}>{children}</span>;
}

// Sale/Ribbon Badge that wraps corner
export function RibbonBadge({
  children,
  variant = 'red',
  className = ''
}: BadgeProps) {
  return (
    <div className={`absolute -top-2 -right-2 z-10 ${className}`}>
      <motion.div
        className={`
          px-4 py-1
          text-xs font-bold uppercase tracking-wider
          border-2 border-black
          shadow-[2px_2px_0px_#1A1A1A]
          rotate-12
          ${variantStyles[variant]}
        `}
        initial={{ scale: 0, rotate: 45 }}
        animate={{ scale: 1, rotate: 12 }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 15,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// "Click Me!" type attention-grabbing badge
export function AttentionBadge({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      className="
        absolute -top-3 left-1/2 -translate-x-1/2 z-10
        px-3 py-1
        bg-pop-green text-black
        text-xs font-bold uppercase tracking-wider
        border-2 border-black
        shadow-[2px_2px_0px_#1A1A1A]
      "
      animate={{
        y: [0, -5, 0],
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  );
}
