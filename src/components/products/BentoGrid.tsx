'use client';

import { motion } from 'framer-motion';
import type { Product, ProminenceLevel } from '@/types/shopify';
import { ProductCard, ProductCardSkeleton } from './ProductCard';

interface BentoGridProps {
  products: Product[];
  isLoading?: boolean;
  className?: string;
}

// Sort products by prominence for optimal grid layout
function sortByProminence(products: Product[]): Product[] {
  const order: Record<ProminenceLevel, number> = {
    hero: 0,
    featured: 1,
    standard: 2,
    compact: 3,
  };

  return [...products].sort((a, b) => order[a.prominence] - order[b.prominence]);
}

export function BentoGrid({ products, isLoading = false, className = '' }: BentoGridProps) {
  const sortedProducts = sortByProminence(products);

  // Container animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  if (isLoading) {
    return (
      <div
        className={`
          grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4
          gap-3 md:gap-4
          ${className}
        `}
      >
        {/* Loading skeleton with varied prominence */}
        <ProductCardSkeleton prominence="hero" />
        <ProductCardSkeleton prominence="standard" />
        <ProductCardSkeleton prominence="standard" />
        <ProductCardSkeleton prominence="featured" />
        <ProductCardSkeleton prominence="standard" />
        <ProductCardSkeleton prominence="compact" />
        <ProductCardSkeleton prominence="compact" />
        <ProductCardSkeleton prominence="standard" />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className={`text-center py-16 ${className}`}>
        <div className="
          inline-block
          px-8 py-6
          bg-pop-yellow
          border-4 border-black
          shadow-[6px_6px_0px_#1A1A1A]
        ">
          <span className="text-5xl mb-4 block">🐰</span>
          <h3 className="font-display text-2xl text-black mb-2">
            No Products Found
          </h3>
          <p className="text-gray-700">
            Check back soon for new drops!
          </p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className={`
        grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4
        gap-3 md:gap-4
        auto-rows-auto
        ${className}
      `}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
    >
      {sortedProducts.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          index={index}
        />
      ))}
    </motion.div>
  );
}

// Standalone section with title
interface BentoGridSectionProps {
  title?: string;
  subtitle?: string;
  products: Product[];
  isLoading?: boolean;
  viewAllLink?: string;
}

export function BentoGridSection({
  title = 'Featured Products',
  subtitle,
  products,
  isLoading = false,
  viewAllLink,
}: BentoGridSectionProps) {
  return (
    <section className="py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <motion.h2
              className="font-display text-4xl md:text-5xl lg:text-6xl text-black"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {title}
            </motion.h2>
            {subtitle && (
              <motion.p
                className="mt-2 text-lg text-gray-600"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {subtitle}
              </motion.p>
            )}
          </div>
          {viewAllLink && (
            <motion.a
              href={viewAllLink}
              className="
                inline-flex items-center gap-2
                px-6 py-3
                bg-pop-yellow text-black
                font-bold uppercase
                border-4 border-black
                shadow-[4px_4px_0px_#1A1A1A]
                hover:shadow-[6px_6px_0px_#1A1A1A]
                hover:-translate-y-1
                transition-all
              "
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              View All
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
              </svg>
            </motion.a>
          )}
        </div>

        {/* Grid */}
        <BentoGrid products={products} isLoading={isLoading} />
      </div>
    </section>
  );
}
