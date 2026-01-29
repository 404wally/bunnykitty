'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { RainbowStripe } from './Marquee';

interface StoryCardData {
  title: string;
  description: string;
  href: string;
  color: string;
  icon: string;
}

const storyCards: StoryCardData[] = [
  {
    title: 'In The City',
    description: 'Follow BunnyKitty through urban adventures in our bestselling book series. Each page is a new discovery!',
    href: '/story',
    color: 'bg-pop-yellow',
    icon: '🌆',
  },
  {
    title: 'Original Art',
    description: 'Every piece is hand-crafted with love. From prints to plushies, each item is a piece of the universe.',
    href: '/lookbook',
    color: 'bg-pop-pink',
    icon: '🎨',
  },
  {
    title: 'Join The Crew',
    description: 'Become part of the BunnyKitty family. Exclusive drops, behind-the-scenes, and community love.',
    href: '/about',
    color: 'bg-pop-blue',
    icon: '🌟',
  },
];

export function StoryCards() {
  return (
    <section className="relative bg-white border-t-4 border-b-4 border-black overflow-hidden">
      {/* Rainbow Stripe at Top - matches Concept 1 ::before element */}
      <RainbowStripe className="absolute top-0 left-0 right-0 z-10" />

      {/* Padding matches Concept 1: padding: 6rem 2rem */}
      <div className="py-24 px-8">
        <div className="max-w-[1400px] mx-auto">
          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {storyCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <Link href={card.href} className="block group">
                  <motion.div
                    className={`
                      ${card.color}
                      border-4 border-black
                      p-6 sm:p-8
                      shadow-[8px_8px_0_#1A1A1A]
                      h-full
                    `}
                    whileHover={{
                      x: -4,
                      y: -4,
                      boxShadow: '12px 12px 0 #1A1A1A',
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Icon */}
                    <span className="text-5xl sm:text-6xl block mb-4">
                      {card.icon}
                    </span>

                    {/* Title */}
                    <h3 className="font-display text-2xl sm:text-3xl text-black uppercase mb-3">
                      {card.title}
                    </h3>

                    {/* Description */}
                    <p className="text-black/80 text-base sm:text-lg leading-relaxed">
                      {card.description}
                    </p>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Single featured story card (larger)
interface FeaturedStoryCardProps {
  title: string;
  description: string;
  href: string;
  imageSrc?: string;
  backgroundColor?: string;
}

export function FeaturedStoryCard({
  title,
  description,
  href,
  backgroundColor = 'bg-pop-purple',
}: FeaturedStoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <Link href={href} className="block group">
        <div
          className={`
            ${backgroundColor}
            border-4 border-black
            shadow-[8px_8px_0px_#1A1A1A]
            group-hover:shadow-[12px_12px_0px_#1A1A1A]
            group-hover:-translate-y-2
            transition-all duration-300
            overflow-hidden
          `}
        >
          <div className="grid md:grid-cols-2">
            {/* Image Side */}
            <div className="relative h-64 md:h-auto bg-gradient-to-br from-pop-pink to-pop-yellow flex items-center justify-center">
              <span className="text-9xl">🐰</span>
            </div>

            {/* Content Side */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <h3 className="font-display text-3xl md:text-4xl lg:text-5xl text-white mb-4">
                {title}
              </h3>
              <p className="text-white/90 text-lg mb-6">
                {description}
              </p>
              <motion.div
                className="inline-flex items-center gap-2 font-bold text-white uppercase"
                initial={{ x: 0 }}
                whileHover={{ x: 10 }}
              >
                <span>Learn More</span>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </motion.div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
