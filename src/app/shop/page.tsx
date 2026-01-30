import { BentoGrid } from '@/components/products/BentoGrid';
import { getMockProducts } from '@/lib/shopify';
import { Marquee } from '@/components/sections/Marquee';
import { ShopHero } from './ShopHero';
import { ShopFilters } from './ShopFilters';

export const metadata = {
  title: 'Shop | BunnyKitty',
  description: 'Shop original BunnyKitty art, apparel, and accessories. Character-driven designs for the bold and playful.',
};

export default async function ShopPage() {
  // Fetch products from Shopify (falls back to mock data if not configured)
  const products = getMockProducts();

  return (
    <>
      {/* Hero */}
      <ShopHero />

      {/* Marquee */}
      <Marquee
        items={['FREE SHIPPING OVER $50', '★', 'ORIGINAL ART', '★', 'LIMITED DROPS', '★']}
      />

      {/* Main Shop Content */}
      <section className="py-6 md:py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <ShopFilters />

          {/* Products Grid */}
          <BentoGrid products={products} />
        </div>
      </section>

      {/* Bottom Marquee */}
      <Marquee
        variant="inverted"
        items={['BUNNYKITTY', '♥', 'WEAR THE ART', '♥', 'JOIN THE CREW', '♥']}
      />
    </>
  );
}
