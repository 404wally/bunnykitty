'use client';

import { useEffect, useRef } from 'react';

interface TrailDot {
  x: number;
  y: number;
  element: HTMLDivElement;
}

export default function CursorTrail() {
  const dotsRef = useRef<TrailDot[]>([]);
  const mousePos = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const numDots = 12;
    const colors = ['#FFE135', '#FF6EB4', '#00D4FF', '#39FF14', '#9D4EDD'];

    // Create trail dots
    for (let i = 0; i < numDots; i++) {
      const dot = document.createElement('div');
      dot.className = 'cursor-trail-dot';
      dot.style.cssText = `
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        width: ${12 - i * 0.5}px;
        height: ${12 - i * 0.5}px;
        background: ${colors[i % colors.length]};
        border-radius: 50%;
        opacity: ${1 - i * 0.07};
        transform: translate(-50%, -50%);
        transition: none;
        mix-blend-mode: screen;
      `;
      document.body.appendChild(dot);
      dotsRef.current.push({ x: 0, y: 0, element: dot });
    }

    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    // Animate trail
    const animate = () => {
      let x = mousePos.current.x;
      let y = mousePos.current.y;

      dotsRef.current.forEach((dot, index) => {
        const speed = 0.35 - index * 0.02;

        dot.x += (x - dot.x) * speed;
        dot.y += (y - dot.y) * speed;

        dot.element.style.left = `${dot.x}px`;
        dot.element.style.top = `${dot.y}px`;

        x = dot.x;
        y = dot.y;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animationRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      dotsRef.current.forEach(dot => dot.element.remove());
      dotsRef.current = [];
    };
  }, []);

  return null;
}
