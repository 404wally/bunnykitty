'use client';

import { motion } from 'framer-motion';
import { forwardRef } from 'react';

type CardVariant = 'default' | 'elevated' | 'outline' | 'colored';

interface CardProps {
  variant?: CardVariant;
  color?: 'white' | 'yellow' | 'pink' | 'blue' | 'green';
  hover?: boolean;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<CardVariant, string> = {
  default: 'bg-white border-4 border-black shadow-[6px_6px_0px_#1A1A1A]',
  elevated: 'bg-white border-4 border-black shadow-[8px_8px_0px_#1A1A1A]',
  outline: 'bg-transparent border-4 border-black',
  colored: 'border-4 border-black shadow-[6px_6px_0px_#1A1A1A]',
};

const colorStyles: Record<string, string> = {
  white: 'bg-white',
  yellow: 'bg-pop-yellow',
  pink: 'bg-pop-pink',
  blue: 'bg-pop-blue',
  green: 'bg-pop-green',
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({
    variant = 'default',
    color = 'white',
    hover = true,
    children,
    className = '',
  }, ref) => {
    const baseStyles = `
      ${variantStyles[variant]}
      ${variant === 'colored' ? colorStyles[color] : ''}
      ${className}
    `;

    if (hover) {
      return (
        <motion.div
          ref={ref}
          className={baseStyles}
          whileHover={{
            y: -8,
            boxShadow: '12px 12px 0px #1A1A1A',
          }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          {children}
        </motion.div>
      );
    }

    return (
      <div ref={ref} className={baseStyles}>
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

// Card Header
interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function CardHeader({ children, className = '' }: CardHeaderProps) {
  return (
    <div className={`p-6 border-b-4 border-black ${className}`}>
      {children}
    </div>
  );
}

// Card Content
interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export function CardContent({ children, className = '' }: CardContentProps) {
  return (
    <div className={`p-6 ${className}`}>
      {children}
    </div>
  );
}

// Card Footer
interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export function CardFooter({ children, className = '' }: CardFooterProps) {
  return (
    <div className={`p-6 border-t-4 border-black ${className}`}>
      {children}
    </div>
  );
}
