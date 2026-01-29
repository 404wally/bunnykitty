'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { SpeechBubble } from '@/components/ui/SpeechBubble';
import { ButtonLink } from '@/components/ui/Button';

export function WorldSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 bg-black overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle, #FF6EB4 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Side - Quote & Text */}
          <motion.div style={{ y, opacity }}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <SpeechBubble variant="pink" className="mb-8 inline-block">
                <span className="text-xl font-bold">The Artist Says...</span>
              </SpeechBubble>
            </motion.div>

            <motion.blockquote
              className="text-3xl md:text-4xl lg:text-5xl font-display text-white leading-tight mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              "Every character has a story.
              <span className="text-pop-pink"> Every piece has a heart.</span>
              That's what BunnyKitty is all about."
            </motion.blockquote>

            <motion.p
              className="text-gray-400 text-lg mb-8 max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Born on the streets, raised in the studio. BunnyKitty brings together
              pop culture, street art, and pure imagination to create something
              that makes you smile.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <ButtonLink href="/story" variant="secondary" size="lg">
                Enter The World
              </ButtonLink>
            </motion.div>
          </motion.div>

          {/* Right Side - Character/Visual */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Main Character Display */}
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Colored background shapes */}
              <motion.div
                className="absolute top-4 left-4 w-full h-full bg-pop-blue border-4 border-white"
                animate={{ rotate: [0, 2, 0, -2, 0] }}
                transition={{ duration: 8, repeat: Infinity }}
              />
              <motion.div
                className="absolute top-8 left-8 w-full h-full bg-pop-yellow border-4 border-white"
                animate={{ rotate: [0, -2, 0, 2, 0] }}
                transition={{ duration: 8, repeat: Infinity, delay: 0.5 }}
              />

              {/* Main frame */}
              <div className="
                relative
                w-full h-full
                bg-gradient-to-br from-pop-pink via-pop-purple to-pop-red
                border-4 border-white
                flex items-center justify-center
              ">
                {/* Placeholder for character art */}
                <div className="text-center p-8">
                  <motion.div
                    className="text-[120px] md:text-[160px]"
                    animate={{
                      y: [0, -10, 0],
                      rotate: [0, 5, 0, -5, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    🐰
                  </motion.div>
                  <p className="font-display text-2xl text-white mt-4">
                    BUNNYKITTY
                  </p>
                </div>
              </div>
            </div>

            {/* Floating decorative elements */}
            <motion.div
              className="
                absolute -top-6 -right-6
                w-16 h-16
                bg-pop-green
                border-4 border-white
                rounded-full
                flex items-center justify-center
                text-2xl
              "
              animate={{
                y: [0, -10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              ✨
            </motion.div>

            <motion.div
              className="
                absolute -bottom-4 -left-4
                w-12 h-12
                bg-pop-orange
                border-4 border-white
                flex items-center justify-center
                text-xl
              "
              animate={{
                rotate: [0, 360],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            >
              ⭐
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}
