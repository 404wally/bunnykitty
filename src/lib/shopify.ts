// Shopify Storefront API Client

import type {
  ShopifyProduct,
  Product,
  ProminenceLevel,
  ProductsQueryResponse
} from '@/types/shopify';

const SHOPIFY_STOREFRONT_API_URL = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
  ? `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`
  : '';

const SHOPIFY_STOREFRONT_ACCESS_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || '';

// GraphQL query for products with prominence metafield
const PRODUCTS_QUERY = `
  query FeaturedProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          handle
          description
          availableForSale
          tags
          productType
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
            maxVariantPrice {
              amount
              currencyCode
            }
          }
          compareAtPriceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 2) {
            edges {
              node {
                url
                altText
                width
                height
              }
            }
          }
          variants(first: 1) {
            edges {
              node {
                id
                title
                availableForSale
                price {
                  amount
                  currencyCode
                }
              }
            }
          }
          metafield(namespace: "bunnykitty", key: "grid_prominence") {
            value
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

const PRODUCT_BY_HANDLE_QUERY = `
  query ProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      title
      handle
      description
      descriptionHtml
      availableForSale
      tags
      productType
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
        maxVariantPrice {
          amount
          currencyCode
        }
      }
      compareAtPriceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 10) {
        edges {
          node {
            url
            altText
            width
            height
          }
        }
      }
      variants(first: 100) {
        edges {
          node {
            id
            title
            availableForSale
            price {
              amount
              currencyCode
            }
          }
        }
      }
      metafield(namespace: "bunnykitty", key: "grid_prominence") {
        value
      }
    }
  }
`;

async function shopifyFetch<T>(query: string, variables: Record<string, unknown> = {}): Promise<T> {
  if (!SHOPIFY_STOREFRONT_API_URL || !SHOPIFY_STOREFRONT_ACCESS_TOKEN) {
    // Return mock data if Shopify is not configured
    console.warn('Shopify not configured, using mock data');
    return {} as T;
  }

  const response = await fetch(SHOPIFY_STOREFRONT_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 }, // Revalidate every 60 seconds
  });

  if (!response.ok) {
    throw new Error(`Shopify API error: ${response.status}`);
  }

  const json = await response.json();

  if (json.errors) {
    throw new Error(json.errors[0].message);
  }

  return json.data as T;
}

// Transform Shopify product to normalized Product type
function normalizeProduct(shopifyProduct: ShopifyProduct): Product {
  const prominence = (shopifyProduct.metafield?.value as ProminenceLevel) || 'standard';
  const images = shopifyProduct.images.edges.map(edge => edge.node);
  const firstVariant = shopifyProduct.variants.edges[0]?.node;
  const compareAtPrice = shopifyProduct.compareAtPriceRange?.minVariantPrice?.amount;

  return {
    id: shopifyProduct.id,
    title: shopifyProduct.title,
    handle: shopifyProduct.handle,
    description: shopifyProduct.description,
    price: parseFloat(shopifyProduct.priceRange.minVariantPrice.amount),
    compareAtPrice: compareAtPrice ? parseFloat(compareAtPrice) : undefined,
    currencyCode: shopifyProduct.priceRange.minVariantPrice.currencyCode,
    images,
    prominence,
    availableForSale: shopifyProduct.availableForSale,
    tags: shopifyProduct.tags || [],
    productType: shopifyProduct.productType,
    variantId: firstVariant?.id || '',
  };
}

// Fetch products for Bento Grid
export async function getProducts(count: number = 12): Promise<Product[]> {
  try {
    const data = await shopifyFetch<ProductsQueryResponse>(PRODUCTS_QUERY, { first: count });

    if (!data.products?.edges) {
      return getMockProducts();
    }

    return data.products.edges.map(edge => normalizeProduct(edge.node));
  } catch (error) {
    console.error('Error fetching products:', error);
    return getMockProducts();
  }
}

// Fetch single product by handle
export async function getProductByHandle(handle: string): Promise<Product | null> {
  try {
    const data = await shopifyFetch<{ product: ShopifyProduct | null }>(
      PRODUCT_BY_HANDLE_QUERY,
      { handle }
    );

    if (!data.product) {
      return null;
    }

    return normalizeProduct(data.product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

// Get Shopify store URL for checkout/product pages
export function getShopifyProductUrl(handle: string): string {
  const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
  if (!domain) {
    return `/shop/${handle}`;
  }
  return `https://${domain}/products/${handle}`;
}

export function getShopifyCartUrl(): string {
  const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
  if (!domain) {
    return '/cart';
  }
  return `https://${domain}/cart`;
}

// Mock products for development/demo
export function getMockProducts(): Product[] {
  const mockProducts: Product[] = [
    {
      id: 'gid://shopify/Product/1',
      title: 'BunnyKitty Classic Tee',
      handle: 'bunnykitty-classic-tee',
      description: 'The original BunnyKitty design on a premium cotton tee.',
      price: 35.00,
      currencyCode: 'USD',
      images: [
        { url: '/images/products/tee-1.jpg', altText: 'BunnyKitty Classic Tee' },
        { url: '/images/products/tee-1-alt.jpg', altText: 'BunnyKitty Classic Tee Back' },
      ],
      prominence: 'hero',
      availableForSale: true,
      tags: ['apparel', 'tee', 'bestseller'],
      productType: 'T-Shirt',
      variantId: 'gid://shopify/ProductVariant/1',
    },
    {
      id: 'gid://shopify/Product/2',
      title: 'City Nights Hoodie',
      handle: 'city-nights-hoodie',
      description: 'Stay cozy with BunnyKitty exploring the city at night.',
      price: 65.00,
      compareAtPrice: 75.00,
      currencyCode: 'USD',
      images: [
        { url: '/images/products/hoodie-1.jpg', altText: 'City Nights Hoodie' },
      ],
      prominence: 'featured',
      availableForSale: true,
      tags: ['apparel', 'hoodie', 'new'],
      productType: 'Hoodie',
      variantId: 'gid://shopify/ProductVariant/2',
    },
    {
      id: 'gid://shopify/Product/3',
      title: 'Pop Art Print - Neon Dreams',
      handle: 'pop-art-print-neon-dreams',
      description: 'Limited edition signed print featuring BunnyKitty in neon.',
      price: 45.00,
      currencyCode: 'USD',
      images: [
        { url: '/images/products/print-1.jpg', altText: 'Neon Dreams Print' },
      ],
      prominence: 'featured',
      availableForSale: true,
      tags: ['art', 'print', 'limited'],
      productType: 'Print',
      variantId: 'gid://shopify/ProductVariant/3',
    },
    {
      id: 'gid://shopify/Product/4',
      title: 'BunnyKitty Enamel Pin',
      handle: 'bunnykitty-enamel-pin',
      description: 'Cute enamel pin to add some BunnyKitty flair anywhere.',
      price: 12.00,
      currencyCode: 'USD',
      images: [
        { url: '/images/products/pin-1.jpg', altText: 'BunnyKitty Enamel Pin' },
      ],
      prominence: 'compact',
      availableForSale: true,
      tags: ['accessories', 'pin'],
      productType: 'Pin',
      variantId: 'gid://shopify/ProductVariant/4',
    },
    {
      id: 'gid://shopify/Product/5',
      title: 'Sticker Pack Vol. 1',
      handle: 'sticker-pack-vol-1',
      description: '10 die-cut vinyl stickers featuring BunnyKitty characters.',
      price: 15.00,
      currencyCode: 'USD',
      images: [
        { url: '/images/products/stickers-1.jpg', altText: 'Sticker Pack Vol. 1' },
      ],
      prominence: 'standard',
      availableForSale: true,
      tags: ['accessories', 'stickers'],
      productType: 'Stickers',
      variantId: 'gid://shopify/ProductVariant/5',
    },
    {
      id: 'gid://shopify/Product/6',
      title: 'Canvas Tote Bag',
      handle: 'canvas-tote-bag',
      description: 'Carry your stuff in style with this sturdy canvas tote.',
      price: 28.00,
      currencyCode: 'USD',
      images: [
        { url: '/images/products/tote-1.jpg', altText: 'Canvas Tote Bag' },
      ],
      prominence: 'standard',
      availableForSale: true,
      tags: ['accessories', 'bag'],
      productType: 'Bag',
      variantId: 'gid://shopify/ProductVariant/6',
    },
    {
      id: 'gid://shopify/Product/7',
      title: 'Skate Deck - Street Series',
      handle: 'skate-deck-street-series',
      description: 'Pro-quality maple deck with exclusive street art design.',
      price: 75.00,
      currencyCode: 'USD',
      images: [
        { url: '/images/products/deck-1.jpg', altText: 'Street Series Skate Deck' },
      ],
      prominence: 'standard',
      availableForSale: true,
      tags: ['skate', 'deck', 'limited'],
      productType: 'Skate Deck',
      variantId: 'gid://shopify/ProductVariant/7',
    },
    {
      id: 'gid://shopify/Product/8',
      title: 'Phone Case - BunnyKitty Vibes',
      handle: 'phone-case-bunnykitty-vibes',
      description: 'Protect your phone with colorful BunnyKitty art.',
      price: 25.00,
      currencyCode: 'USD',
      images: [
        { url: '/images/products/case-1.jpg', altText: 'BunnyKitty Phone Case' },
      ],
      prominence: 'compact',
      availableForSale: true,
      tags: ['accessories', 'phone'],
      productType: 'Phone Case',
      variantId: 'gid://shopify/ProductVariant/8',
    },
  ];

  return mockProducts;
}
