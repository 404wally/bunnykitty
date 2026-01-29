// Shopify Storefront API Types

export type ProminenceLevel = 'hero' | 'featured' | 'standard' | 'compact';

export interface ShopifyImage {
  url: string;
  altText?: string;
  width?: number;
  height?: number;
}

export interface ShopifyPrice {
  amount: string;
  currencyCode: string;
}

export interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  descriptionHtml?: string;
  priceRange: {
    minVariantPrice: ShopifyPrice;
    maxVariantPrice: ShopifyPrice;
  };
  compareAtPriceRange?: {
    minVariantPrice: ShopifyPrice;
    maxVariantPrice: ShopifyPrice;
  };
  images: {
    edges: Array<{
      node: ShopifyImage;
    }>;
  };
  variants: {
    edges: Array<{
      node: {
        id: string;
        title: string;
        availableForSale: boolean;
        price: ShopifyPrice;
      };
    }>;
  };
  metafield?: {
    value: ProminenceLevel;
  } | null;
  tags?: string[];
  productType?: string;
  availableForSale: boolean;
}

export interface ShopifyCollection {
  id: string;
  title: string;
  handle: string;
  description?: string;
  image?: ShopifyImage;
  products: {
    edges: Array<{
      node: ShopifyProduct;
    }>;
  };
}

export interface ShopifyCart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    totalAmount: ShopifyPrice;
    subtotalAmount: ShopifyPrice;
  };
  lines: {
    edges: Array<{
      node: {
        id: string;
        quantity: number;
        merchandise: {
          id: string;
          title: string;
          product: {
            title: string;
            handle: string;
            images: {
              edges: Array<{
                node: ShopifyImage;
              }>;
            };
          };
          price: ShopifyPrice;
        };
      };
    }>;
  };
}

// Normalized product type for internal use
export interface Product {
  id: string;
  title: string;
  handle: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  currencyCode: string;
  images: ShopifyImage[];
  prominence: ProminenceLevel;
  availableForSale: boolean;
  tags: string[];
  productType?: string;
  variantId: string;
}

// GraphQL Response Types
export interface ProductsQueryResponse {
  products: {
    edges: Array<{
      node: ShopifyProduct;
    }>;
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string | null;
    };
  };
}

export interface CollectionQueryResponse {
  collection: ShopifyCollection;
}
