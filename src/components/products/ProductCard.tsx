'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Product, ProminenceLevel } from '@/types/shopify';
import { Badge, RibbonBadge, AttentionBadge } from '@/components/ui/Badge';
import { getShopifyProductUrl } from '@/lib/shopify';

interface ProductCardProps {
  product: Product;
  index?: number;
}

// Size configurations based on prominence
// UPDATED: Much larger image ratios, compact info sections
const sizeConfig: Record<ProminenceLevel, {
  cardClass: string;
  imageHeight: string;
  titleSize: string;
  showDescription: boolean;
  padding: string;
}> = {
  hero: {
    cardClass: 'col-span-2 row-span-2',
    imageHeight: 'h-[320px] md:h-[450px]', // Increased from 400px
    titleSize: 'text-lg md:text-xl',
    showDescription: false, // Removed description
    padding: 'p-3',
  },
  featured: {
    cardClass: 'col-span-2 row-span-1',
    imageHeight: 'h-48 md:h-72', // Increased
    titleSize: 'text-base md:text-lg',
    showDescription: false,
    padding: 'p-2.5',
  },
  standard: {
    cardClass: 'col-span-1 row-span-1',
    imageHeight: 'h-52 md:h-64', // Increased from h-56
    titleSize: 'text-sm md:text-base',
    showDescription: false,
    padding: 'p-2',
  },
  compact: {
    cardClass: 'col-span-1 row-span-1',
    imageHeight: 'h-44 md:h-56', // Increased from h-48
    titleSize: 'text-sm',
    showDescription: false,
    padding: 'p-2',
  },
};

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  const config = sizeConfig[product.prominence];
  const productUrl = getShopifyProductUrl(product.handle);
  const hasMultipleImages = product.images.length > 1;
  const isOnSale = product.compareAtPrice && product.compareAtPrice > product.price;
  const isNew = product.tags.includes('new');
  const isBestseller = product.tags.includes('bestseller');

  // Swap image on hover if multiple images exist
  const handleMouseEnter = () => {
    setIsHovered(true);
    if (hasMultipleImages) {
      setImageIndex(1);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setImageIndex(0);
  };

  const currentImage = product.images[imageIndex] || product.images[0];

  return (
    <motion.div
      className={`${config.cardClass} relative group`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
    >
      <Link href={productUrl}>
        <motion.article
          className="
            h-full
            bg-white
            border-3 border-black
            shadow-[4px_4px_0px_#1A1A1A]
            overflow-hidden
            cursor-pointer
          "
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          whileHover={{
            y: -6,
            boxShadow: '8px 8px 0px #1A1A1A',
          }}
          transition={{ duration: 0.2 }}
        >
          {/* Image Container - Takes up most of the card */}
          <div className={`relative ${config.imageHeight} overflow-hidden bg-gray-100`}>
            {/* Badges */}
            {isOnSale && (
              <RibbonBadge variant="red">SALE</RibbonBadge>
            )}
            {isNew && !isOnSale && (
              <RibbonBadge variant="green">NEW</RibbonBadge>
            )}
            {isBestseller && !isOnSale && !isNew && (
              <RibbonBadge variant="yellow">HOT</RibbonBadge>
            )}

            {/* Attention badge for hero items */}
            {product.prominence === 'hero' && (
              <AttentionBadge>CLICK ME!</AttentionBadge>
            )}

            {/* Product Image */}
            {currentImage?.url ? (
              <motion.div
                className="relative w-full h-full"
                animate={{ scale: isHovered ? 1.05 : 1 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={currentImage.url}
                  alt={currentImage.altText || product.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </motion.div>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-pop-pink to-pop-yellow">
                <span className="text-6xl">🐰</span>
              </div>
            )}

            {/* Hover Overlay */}
            <motion.div
              className="
                absolute inset-0
                bg-gradient-to-t from-black/60 to-transparent
                flex items-end justify-center pb-3
              "
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <span className="
                px-3 py-1.5
                bg-pop-green text-black
                font-bold text-xs uppercase
                border-2 border-black
              ">
                View Product
              </span>
            </motion.div>
          </div>

          {/* Content - COMPACT: Just badge + title + price inline */}
          <div className={`${config.padding} border-t-3 border-black`}>
            {/* Row 1: Badge + Title */}
            <div className="flex items-start gap-2 mb-1">
              {product.productType && (
                <Badge variant="blue" className="shrink-0 text-[10px] px-1.5 py-0.5">
                  {product.productType}
                </Badge>
              )}
              <h3 className={`font-bold text-black ${config.titleSize} leading-tight line-clamp-1 flex-1`}>
                {product.title}
              </h3>
            </div>

            {/* Row 2: Price */}
            <div className="flex items-center gap-2">
              <span className="font-bold text-base text-pop-red">
                ${product.price.toFixed(2)}
              </span>
              {isOnSale && product.compareAtPrice && (
                <span className="text-gray-400 line-through text-xs">
                  ${product.compareAtPrice.toFixed(2)}
                </span>
              )}
              {!product.availableForSale && (
                <span className="text-[10px] font-bold uppercase text-gray-500 bg-gray-200 px-1.5 py-0.5">
                  Sold Out
                </span>
              )}
            </div>
          </div>
        </motion.article>
      </Link>
    </motion.div>
  );
}

// Skeleton loading state
export function ProductCardSkeleton({ prominence = 'standard' }: { prominence?: ProminenceLevel }) {
  const config = sizeConfig[prominence];

  return (
    <div className={`${config.cardClass}`}>
      <div className="
        h-full
        bg-white
        border-3 border-black
        shadow-[4px_4px_0px_#1A1A1A]
        overflow-hidden
        animate-pulse
      ">
        <div className={`${config.imageHeight} bg-gray-200`} />
        <div className={`${config.padding} border-t-3 border-black space-y-2`}>
          <div className="flex gap-2">
            <div className="h-4 w-12 bg-gray-200 rounded" />
            <div className="h-4 w-24 bg-gray-200 rounded" />
          </div>
          <div className="h-4 w-16 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
}
