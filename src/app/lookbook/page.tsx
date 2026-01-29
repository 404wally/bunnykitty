'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Marquee } from '@/components/sections/Marquee';

// Mock gallery data
const galleryImages = [
  { id: 1, title: 'City Nights', collection: 'urban', aspect: 'portrait' },
  { id: 2, title: 'Neon Dreams', collection: 'neon', aspect: 'landscape' },
  { id: 3, title: 'Street Style', collection: 'urban', aspect: 'square' },
  { id: 4, title: 'Pop Explosion', collection: 'pop', aspect: 'portrait' },
  { id: 5, title: 'Character Study', collection: 'character', aspect: 'square' },
  { id: 6, title: 'Crew Portrait', collection: 'character', aspect: 'landscape' },
  { id: 7, title: 'Abstract Vibes', collection: 'pop', aspect: 'portrait' },
  { id: 8, title: 'Night Owl', collection: 'character', aspect: 'square' },
  { id: 9, title: 'Electric City', collection: 'neon', aspect: 'landscape' },
  { id: 10, title: 'BunnyKitty Original', collection: 'character', aspect: 'portrait' },
  { id: 11, title: 'Urban Jungle', collection: 'urban', aspect: 'square' },
  { id: 12, title: 'Pink Dreams', collection: 'pop', aspect: 'landscape' },
];

const filters = [
  { id: 'all', label: 'All' },
  { id: 'character', label: 'Characters' },
  { id: 'urban', label: 'Urban' },
  { id: 'neon', label: 'Neon' },
  { id: 'pop', label: 'Pop Art' },
];

// Placeholder colors for mock images
const placeholderColors = [
  'from-pop-pink to-pop-purple',
  'from-pop-blue to-pop-green',
  'from-pop-yellow to-pop-orange',
  'from-pop-red to-pop-pink',
  'from-pop-purple to-pop-blue',
  'from-pop-green to-pop-yellow',
];

export default function LookbookPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const filteredImages = activeFilter === 'all'
    ? galleryImages
    : galleryImages.filter(img => img.collection === activeFilter);

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-pop-purple pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle, #FFFFFF 2px, transparent 2px)`,
              backgroundSize: '24px 24px',
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.h1
            className="font-display text-6xl sm:text-8xl text-white mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            LOOKBOOK
          </motion.h1>
          <motion.p
            className="text-xl text-white/80 font-semibold max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            A visual journey through the BunnyKitty universe
          </motion.p>
        </div>
      </section>

      <Marquee
        items={['ART', '★', 'CHARACTERS', '★', 'VIBES', '★', 'IMAGINATION', '★']}
      />

      {/* Gallery Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {filters.map((filter) => (
              <motion.button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`
                  px-6 py-2
                  font-bold uppercase text-sm tracking-wider
                  border-4 border-black
                  transition-colors
                  ${activeFilter === filter.id
                    ? 'bg-pop-pink text-black shadow-[4px_4px_0px_#1A1A1A]'
                    : 'bg-white text-black hover:bg-gray-100'
                  }
                `}
                whileHover={{ y: -2 }}
                whileTap={{ y: 1 }}
              >
                {filter.label}
              </motion.button>
            ))}
          </div>

          {/* Masonry Grid */}
          <motion.div
            className="columns-1 sm:columns-2 lg:columns-3 gap-4"
            layout
          >
            <AnimatePresence>
              {filteredImages.map((image, index) => {
                const aspectClass = {
                  portrait: 'aspect-[3/4]',
                  landscape: 'aspect-[4/3]',
                  square: 'aspect-square',
                }[image.aspect];

                const colorGradient = placeholderColors[index % placeholderColors.length];

                return (
                  <motion.div
                    key={image.id}
                    className="mb-4 break-inside-avoid"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    layout
                  >
                    <motion.div
                      className={`
                        relative ${aspectClass}
                        bg-gradient-to-br ${colorGradient}
                        border-4 border-black
                        shadow-[6px_6px_0px_#1A1A1A]
                        cursor-pointer
                        overflow-hidden
                        group
                      `}
                      whileHover={{
                        y: -4,
                        boxShadow: '10px 10px 0px #1A1A1A',
                      }}
                      onClick={() => setSelectedImage(image.id)}
                    >
                      {/* Placeholder content */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-6xl md:text-8xl opacity-50">🐰</span>
                      </div>

                      {/* Overlay */}
                      <div className="
                        absolute inset-0
                        bg-black/60 opacity-0 group-hover:opacity-100
                        transition-opacity duration-300
                        flex items-end p-4
                      ">
                        <div>
                          <h3 className="font-display text-xl text-white">
                            {image.title}
                          </h3>
                          <span className="text-white/70 text-sm uppercase">
                            {image.collection}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="relative max-w-4xl w-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="
                  absolute -top-4 -right-4 z-10
                  w-12 h-12
                  bg-pop-red text-white
                  border-4 border-white
                  font-bold text-2xl
                  flex items-center justify-center
                  hover:bg-pop-pink
                  transition-colors
                "
              >
                ×
              </button>

              {/* Image */}
              <div className="
                aspect-square
                bg-gradient-to-br from-pop-pink to-pop-purple
                border-8 border-white
                flex items-center justify-center
              ">
                <div className="text-center">
                  <span className="text-[200px]">🐰</span>
                  <p className="font-display text-3xl text-white mt-4">
                    {galleryImages.find(img => img.id === selectedImage)?.title}
                  </p>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-between mt-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage);
                    const prevIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
                    setSelectedImage(filteredImages[prevIndex].id);
                  }}
                  className="
                    px-6 py-2
                    bg-white text-black
                    font-bold uppercase
                    border-4 border-black
                  "
                >
                  ← Prev
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage);
                    const nextIndex = (currentIndex + 1) % filteredImages.length;
                    setSelectedImage(filteredImages[nextIndex].id);
                  }}
                  className="
                    px-6 py-2
                    bg-white text-black
                    font-bold uppercase
                    border-4 border-black
                  "
                >
                  Next →
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Section */}
      <section className="py-24 bg-pop-yellow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-5xl text-black mb-6">
              WANT THIS ON YOUR WALL?
            </h2>
            <p className="text-xl text-black/80 mb-8">
              Many of these pieces are available as prints and products.
            </p>
            <motion.a
              href="/shop"
              className="
                inline-block
                px-8 py-4
                bg-pop-red text-white
                font-bold text-lg uppercase
                border-4 border-black
                shadow-[6px_6px_0px_#1A1A1A]
              "
              whileHover={{ y: -3, boxShadow: '8px 8px 0px #1A1A1A' }}
              whileTap={{ y: 1 }}
            >
              Shop Art Prints
            </motion.a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
