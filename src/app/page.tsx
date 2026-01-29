import { Hero } from '@/components/sections/Hero';
import { Marquee, EmojiMarquee } from '@/components/sections/Marquee';
import { StoryCards } from '@/components/sections/StoryCards';
import { WorldSection } from '@/components/sections/WorldSection';
import { BentoGridSection } from '@/components/products/BentoGrid';
import { getMockProducts } from '@/lib/shopify';

export default async function HomePage() {
  // Fetch products from Shopify (falls back to mock data if not configured)
  const products = getMockProducts();

  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Scrolling Marquee */}
      <Marquee />

      {/* Story Cards */}
      <StoryCards />

      {/* Emoji Marquee */}
      <EmojiMarquee />

      {/* Featured Products Bento Grid */}
      <BentoGridSection
        title="FRESH DROPS"
        subtitle="Shop the latest BunnyKitty gear"
        products={products}
        viewAllLink="/shop"
      />

      {/* World/Artist Section */}
      <WorldSection />

      {/* Bottom Marquee */}
      <Marquee
        variant="inverted"
        items={[
          'BUNNYKITTY',
          '♥',
          'BORN IN THE CITY',
          '♥',
          'LOVED EVERYWHERE',
          '♥',
          'JOIN THE CREW',
          '♥',
        ]}
      />
    </>
  );
}
