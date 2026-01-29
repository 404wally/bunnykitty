'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { SpeechBubble } from '@/components/ui/SpeechBubble';
import { Card } from '@/components/ui/Card';
import { Marquee } from '@/components/sections/Marquee';

// Character profiles
const characters = [
  {
    name: 'BunnyKitty',
    description: 'The original hybrid hero. Part bunny, part kitty, 100% adorable.',
    color: 'bg-pop-pink',
    emoji: '🐰',
  },
  {
    name: 'NightOwl',
    description: 'The wise one who watches over the city at night.',
    color: 'bg-pop-purple',
    emoji: '🦉',
  },
  {
    name: 'StreetPup',
    description: 'Loyal friend and urban explorer. Always down for an adventure.',
    color: 'bg-pop-blue',
    emoji: '🐕',
  },
  {
    name: 'GlowBear',
    description: 'Brings light to the darkest corners. Protector of dreams.',
    color: 'bg-pop-yellow',
    emoji: '🐻',
  },
];

// Timeline events
const timeline = [
  {
    year: '2019',
    title: 'The Beginning',
    description: 'BunnyKitty was born on the streets of the city, a simple sketch that became something more.',
  },
  {
    year: '2020',
    title: 'First Collection',
    description: 'The original designs found their way onto t-shirts and stickers, building a small but passionate following.',
  },
  {
    year: '2021',
    title: 'Growing Family',
    description: 'New characters joined the crew - NightOwl, StreetPup, and GlowBear each brought their own stories.',
  },
  {
    year: '2022',
    title: 'Gallery Shows',
    description: 'BunnyKitty art appeared in galleries across the country, bringing pop art to new audiences.',
  },
  {
    year: '2023',
    title: 'Global Community',
    description: 'The crew expanded worldwide, with fans from every continent wearing and sharing the love.',
  },
  {
    year: '2024',
    title: 'New Horizons',
    description: 'Collaborations, limited editions, and bigger dreams. The adventure continues.',
  },
];

export default function StoryPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <>
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-pop-purple via-pop-pink to-pop-yellow overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle, #1A1A1A 2px, transparent 2px)`,
              backgroundSize: '32px 32px',
            }}
          />
        </div>

        <motion.div
          className="relative z-10 text-center px-4"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <SpeechBubble variant="white" className="inline-block mb-8">
              <span className="text-xl">Once upon a time in the city...</span>
            </SpeechBubble>
          </motion.div>

          <motion.h1
            className="font-display text-6xl sm:text-8xl lg:text-9xl text-black mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            THE STORY
          </motion.h1>

          <motion.p
            className="text-2xl text-black/80 font-semibold max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Where characters come alive and art tells tales
          </motion.p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </section>

      {/* Origin Story */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="prose prose-lg max-w-none"
          >
            <div className="bg-pop-yellow border-4 border-black shadow-[8px_8px_0px_#1A1A1A] p-8 mb-12">
              <h2 className="font-display text-4xl md:text-5xl text-black mb-6">
                WHERE IT ALL BEGAN
              </h2>
              <p className="text-black/80 text-xl leading-relaxed mb-6">
                In a city that never sleeps, where neon lights paint the night and every corner holds a story,
                a little character was born. Part bunny, part kitty, completely unique — BunnyKitty emerged
                from a sketchbook on a rainy afternoon.
              </p>
              <p className="text-black/80 text-xl leading-relaxed">
                What started as doodles became a universe. Each character carries a piece of the city's soul:
                its energy, its dreams, its endless possibility. This isn't just art — it's a world waiting
                to be explored.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Marquee
        items={['PART BUNNY', '★', 'PART KITTY', '★', '100% LOVE', '★', 'CITY BORN', '★']}
      />

      {/* Characters Section */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="font-display text-5xl md:text-6xl text-white text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            MEET THE <span className="text-pop-pink">CREW</span>
          </motion.h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {characters.map((character, index) => (
              <motion.div
                key={character.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`${character.color} h-full p-6`}>
                  <motion.div
                    className="text-6xl mb-4"
                    whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
                  >
                    {character.emoji}
                  </motion.div>
                  <h3 className="font-display text-2xl text-black mb-2">
                    {character.name}
                  </h3>
                  <p className="text-black/80">
                    {character.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-pop-blue">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="font-display text-5xl md:text-6xl text-black text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            THE JOURNEY
          </motion.h2>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-black" />

            {timeline.map((event, index) => (
              <motion.div
                key={event.year}
                className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Year bubble */}
                <div className="
                  absolute left-0 md:left-1/2 md:-translate-x-1/2
                  w-8 h-8 md:w-12 md:h-12
                  bg-pop-yellow border-4 border-black
                  rounded-full
                  flex items-center justify-center
                  font-bold text-xs md:text-sm
                  z-10
                ">
                  {event.year.slice(2)}
                </div>

                {/* Content card */}
                <div className={`ml-16 md:ml-0 md:w-[45%] ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                  <Card className="bg-white p-6">
                    <span className="font-display text-pop-red text-lg">{event.year}</span>
                    <h3 className="font-display text-2xl text-black mb-2">{event.title}</h3>
                    <p className="text-gray-600">{event.description}</p>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-pop-pink">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-5xl md:text-6xl text-black mb-6">
              BE PART OF THE STORY
            </h2>
            <p className="text-xl text-black/80 mb-8 max-w-2xl mx-auto">
              Every piece you wear, every art you share — you become part of the BunnyKitty universe.
              The story isn't just ours. It's yours too.
            </p>
            <motion.a
              href="/shop"
              className="
                inline-block
                px-8 py-4
                bg-black text-white
                font-bold text-lg uppercase
                border-4 border-black
                shadow-[6px_6px_0px_#FFE135]
              "
              whileHover={{ y: -3, boxShadow: '8px 8px 0px #FFE135' }}
              whileTap={{ y: 1 }}
            >
              Shop The Collection
            </motion.a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
