'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { forwardRef } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'ref'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  className?: string;
  asChild?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: `
    bg-pop-red text-white
    border-4 border-black
    shadow-[6px_6px_0px_#1A1A1A]
    hover:bg-pop-pink
  `,
  secondary: `
    bg-pop-yellow text-black
    border-4 border-black
    shadow-[6px_6px_0px_#1A1A1A]
    hover:bg-pop-orange
  `,
  outline: `
    bg-white text-black
    border-4 border-black
    shadow-[6px_6px_0px_#1A1A1A]
    hover:bg-pop-yellow
  `,
  ghost: `
    bg-transparent text-black
    border-4 border-transparent
    hover:border-black
    hover:bg-pop-yellow/20
  `,
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', children, className = '', ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        className={`
          inline-flex items-center justify-center
          font-bold uppercase tracking-wider
          transition-colors
          disabled:opacity-50 disabled:cursor-not-allowed
          ${variantStyles[variant]}
          ${sizeStyles[size]}
          ${className}
        `}
        whileHover={{
          x: -2,
          y: -2,
          boxShadow: '8px 8px 0px #1A1A1A',
        }}
        whileTap={{
          x: 2,
          y: 2,
          boxShadow: '2px 2px 0px #1A1A1A',
        }}
        transition={{ duration: 0.15 }}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

// Link variant that looks like a button
interface ButtonLinkProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  className?: string;
  href: string;
  target?: string;
  rel?: string;
}

export const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  ({ variant = 'primary', size = 'md', children, className = '', href, target, rel }, ref) => {
    return (
      <motion.a
        ref={ref}
        href={href}
        target={target}
        rel={rel}
        className={`
          inline-flex items-center justify-center
          font-bold uppercase tracking-wider
          transition-colors cursor-pointer
          ${variantStyles[variant]}
          ${sizeStyles[size]}
          ${className}
        `}
        whileHover={{
          x: -2,
          y: -2,
          boxShadow: '8px 8px 0px #1A1A1A',
        }}
        whileTap={{
          x: 2,
          y: 2,
          boxShadow: '2px 2px 0px #1A1A1A',
        }}
        transition={{ duration: 0.15 }}
      >
        {children}
      </motion.a>
    );
  }
);

ButtonLink.displayName = 'ButtonLink';
