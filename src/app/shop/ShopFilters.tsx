'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const categories = [
  { id: 'all', label: 'All' },
  { id: 'apparel', label: 'Apparel' },
  { id: 'art', label: 'Art Prints' },
  { id: 'accessories', label: 'Accessories' },
  { id: 'limited', label: 'Limited Edition' },
];

const sortOptions = [
  { id: 'featured', label: 'Featured' },
  { id: 'newest', label: 'Newest' },
  { id: 'price-low', label: 'Price: Low to High' },
  { id: 'price-high', label: 'Price: High to Low' },
];

export function ShopFilters() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeSort, setActiveSort] = useState('featured');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="mb-12">
      {/* Desktop Filters */}
      <div className="hidden md:flex items-center justify-between gap-8">
        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`
                px-4 py-2
                font-bold uppercase text-sm tracking-wider
                border-4 border-black
                transition-colors
                ${activeCategory === category.id
                  ? 'bg-pop-yellow text-black shadow-[4px_4px_0px_#1A1A1A]'
                  : 'bg-white text-black hover:bg-gray-100'
                }
              `}
              whileHover={{ y: -2 }}
              whileTap={{ y: 1 }}
            >
              {category.label}
            </motion.button>
          ))}
        </div>

        {/* Sort */}
        <div className="relative">
          <select
            value={activeSort}
            onChange={(e) => setActiveSort(e.target.value)}
            className="
              px-4 py-2 pr-10
              bg-white text-black
              font-bold text-sm uppercase tracking-wider
              border-4 border-black
              shadow-[4px_4px_0px_#1A1A1A]
              appearance-none
              cursor-pointer
              focus:outline-none
            "
          >
            {sortOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Mobile Filters */}
      <div className="md:hidden">
        <div className="flex gap-2">
          <motion.button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="
              flex-1
              px-4 py-3
              bg-pop-yellow text-black
              font-bold uppercase
              border-4 border-black
              shadow-[4px_4px_0px_#1A1A1A]
              flex items-center justify-center gap-2
            "
            whileTap={{ y: 2, boxShadow: '2px 2px 0px #1A1A1A' }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filter & Sort
          </motion.button>
        </div>

        <AnimatePresence>
          {isFilterOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 overflow-hidden"
            >
              <div className="bg-white border-4 border-black p-4 shadow-[4px_4px_0px_#1A1A1A]">
                {/* Categories */}
                <div className="mb-4">
                  <h3 className="font-bold uppercase text-sm mb-2">Category</h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setActiveCategory(category.id)}
                        className={`
                          px-3 py-1
                          text-sm font-bold uppercase
                          border-2 border-black
                          ${activeCategory === category.id
                            ? 'bg-pop-yellow'
                            : 'bg-white'
                          }
                        `}
                      >
                        {category.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sort */}
                <div>
                  <h3 className="font-bold uppercase text-sm mb-2">Sort By</h3>
                  <div className="flex flex-wrap gap-2">
                    {sortOptions.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => setActiveSort(option.id)}
                        className={`
                          px-3 py-1
                          text-sm font-bold uppercase
                          border-2 border-black
                          ${activeSort === option.id
                            ? 'bg-pop-blue'
                            : 'bg-white'
                          }
                        `}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Results Count */}
      <div className="mt-6 flex items-center justify-between">
        <p className="text-gray-600">
          Showing <span className="font-bold text-black">8</span> products
        </p>
        <div className="hidden md:flex items-center gap-2">
          <span className="text-sm text-gray-500">View:</span>
          <button className="p-2 border-2 border-black bg-pop-yellow">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
              <path d="M1 2.5A1.5 1.5 0 012.5 1h3A1.5 1.5 0 017 2.5v3A1.5 1.5 0 015.5 7h-3A1.5 1.5 0 011 5.5v-3zm8 0A1.5 1.5 0 0110.5 1h3A1.5 1.5 0 0115 2.5v3A1.5 1.5 0 0113.5 7h-3A1.5 1.5 0 019 5.5v-3zm-8 8A1.5 1.5 0 012.5 9h3A1.5 1.5 0 017 10.5v3A1.5 1.5 0 015.5 15h-3A1.5 1.5 0 011 13.5v-3zm8 0A1.5 1.5 0 0110.5 9h3a1.5 1.5 0 011.5 1.5v3a1.5 1.5 0 01-1.5 1.5h-3A1.5 1.5 0 019 13.5v-3z"/>
            </svg>
          </button>
          <button className="p-2 border-2 border-black hover:bg-gray-100">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
              <path d="M3 4.5h10a2 2 0 012 2v3a2 2 0 01-2 2H3a2 2 0 01-2-2v-3a2 2 0 012-2zm0 1a1 1 0 00-1 1v3a1 1 0 001 1h10a1 1 0 001-1v-3a1 1 0 00-1-1H3z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
