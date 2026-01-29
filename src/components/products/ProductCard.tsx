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
const sizeConfig: Record<ProminenceLevel, {
  cardClass: string;
  imageHeight: string;
  titleSize: string;
  showDescription: boolean;
}> = {
  hero: {
    cardClass: 'col-span-2 row-span-2',
    imageHeight: 'h-80 md:h-[400px]',
    titleSize: 'text-2xl md:text-3xl',
    showDescription: true,
  },
  featured: {
    cardClass: 'col-span-2 row-span-1',
    imageHeight: 'h-48 md:h-64',
    titleSize: 'text-xl md:text-2xl',
    showDescription: true,
  },
  standard: {
    cardClass: 'col-span-1 row-span-1',
    imageHeight: 'h-48 md:h-56',
    titleSize: 'text-lg',
    showDescription: false,
  },
  compact: {
    cardClass: 'col-span-1 row-span-1',
    imageHeight: 'h-40 md:h-48',
    titleSize: 'text-base',
    showDescription: false,
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
      transition={{ delay: index * 0.1, duration: 0.4 }}
    >
      <Link href={productUrl}>
        <motion.article
          className="
            h-full
            bg-white
            border-4 border-black
            shadow-[6px_6px_0px_#1A1A1A]
            overflow-hidden
            cursor-pointer
          "
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          whileHover={{
            y: -8,
            boxShadow: '12px 12px 0px #1A1A1A',
          }}
          transition={{ duration: 0.2 }}
        >
          {/* Image Container */}
          <div className={`relative ${config.imageHeight} overflow-hidden bg-pop-yellow/20`}>
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
                flex items-end justify-center pb-4
              "
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <span className="
                px-4 py-2
                bg-pop-green text-black
                font-bold uppercase
                border-2 border-black
              ">
                View Product
              </span>
            </motion.div>
          </div>

          {/* Content */}
          <div className="p-4 border-t-4 border-black">
            {/* Product Type Tag */}
            {product.productType && (
              <Badge variant="blue" className="mb-2">
                {product.productType}
              </Badge>
            )}

            {/* Title */}
            <h3 className={`font-bold text-black ${config.titleSize} mb-2 line-clamp-2`}>
              {product.title}
            </h3>

            {/* Description (for larger cards) */}
            {config.showDescription && product.description && (
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {product.description}
              </p>
            )}

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="font-display text-xl text-pop-red">
                ${product.price.toFixed(2)}
              </span>
              {isOnSale && product.compareAtPrice && (
                <span className="text-gray-400 line-through text-sm">
                  ${product.compareAtPrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Availability */}
            {!product.availableForSale && (
              <span className="
                inline-block mt-2
                px-2 py-1
                bg-gray-200 text-gray-600
                text-xs font-bold uppercase
                border-2 border-gray-400
              ">
                Sold Out
              </span>
            )}
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
        border-4 border-black
        shadow-[6px_6px_0px_#1A1A1A]
        overflow-hidden
        animate-pulse
      ">
        <div className={`${config.imageHeight} bg-gray-200`} />
        <div className="p-4 border-t-4 border-black space-y-3">
          <div className="h-4 w-16 bg-gray-200 rounded" />
          <div className="h-6 w-3/4 bg-gray-200 rounded" />
          <div className="h-4 w-20 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
}
