// BunnyKitty Pop Art Playground Design Tokens

export const colors = {
  // Primary Pop Art Colors
  popRed: '#FF3B3B',
  popYellow: '#FFE135',
  popBlue: '#00D4FF',
  popPink: '#FF6EB4',
  popGreen: '#39FF14',
  popPurple: '#9D4EDD',
  popOrange: '#FF6B35',

  // Neutrals
  black: '#1A1A1A',
  white: '#FFFFFF',

  // Semantic Colors
  primary: '#FF3B3B',
  secondary: '#00D4FF',
  accent: '#FFE135',
  success: '#39FF14',
  warning: '#FF6B35',
} as const;

export const typography = {
  fonts: {
    display: '"Archivo Black", sans-serif',
    heading: '"Nunito", sans-serif',
    body: '"Nunito", sans-serif',
    ui: '"Archivo", sans-serif',
  },
  weights: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },
  sizes: {
    // Display Headlines
    display: {
      desktop: '120px',
      tablet: '80px',
      mobile: '48px',
    },
    // Section Headers
    h1: {
      desktop: '72px',
      tablet: '56px',
      mobile: '40px',
    },
    h2: {
      desktop: '48px',
      tablet: '40px',
      mobile: '32px',
    },
    h3: {
      desktop: '32px',
      tablet: '28px',
      mobile: '24px',
    },
    // Body
    body: {
      large: '18px',
      base: '16px',
      small: '14px',
    },
    // UI
    ui: {
      label: '14px',
      caption: '12px',
    },
  },
} as const;

export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '48px',
  '3xl': '64px',
  '4xl': '96px',
  '5xl': '128px',
} as const;

export const shadows = {
  // Pop Art hard shadows
  small: '4px 4px 0px #1A1A1A',
  medium: '6px 6px 0px #1A1A1A',
  large: '8px 8px 0px #1A1A1A',
  xl: '12px 12px 0px #1A1A1A',

  // Colored shadows
  popRed: '6px 6px 0px #FF3B3B',
  popYellow: '6px 6px 0px #FFE135',
  popBlue: '6px 6px 0px #00D4FF',
  popPink: '6px 6px 0px #FF6EB4',
} as const;

export const borders = {
  thin: '2px solid #1A1A1A',
  medium: '3px solid #1A1A1A',
  thick: '4px solid #1A1A1A',
  extraThick: '6px solid #1A1A1A',
} as const;

export const animations = {
  duration: {
    instant: '100ms',
    fast: '150ms',
    normal: '200ms',
    slow: '300ms',
    slower: '600ms',
  },
  easing: {
    easeOut: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0.0, 1, 1)',
    easeInOut: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
} as const;

export const breakpoints = {
  sm: '480px',
  md: '768px',
  lg: '1024px',
  xl: '1200px',
  '2xl': '1440px',
} as const;

// Bento Grid Prominence Levels
export const gridProminence = {
  hero: { colSpan: 2, rowSpan: 2 },
  featured: { colSpan: 2, rowSpan: 1 },
  standard: { colSpan: 1, rowSpan: 1 },
  compact: { colSpan: 1, rowSpan: 1 },
} as const;

export type ProminenceLevel = keyof typeof gridProminence;
