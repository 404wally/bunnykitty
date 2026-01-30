# Shopify Integration Plan — Hybrid Architecture

## Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                         BUNNYKITTY.COM                               │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│   bunnykitty.com (Vercel)          shop.bunnykitty.com (Shopify)    │
│   ┌─────────────────────┐          ┌─────────────────────────────┐  │
│   │   MARKETING SITE    │          │      SHOPIFY STORE          │  │
│   │   (Next.js)         │  ─────►  │                             │  │
│   │                     │          │   • Product Pages           │  │
│   │   • Homepage        │          │   • Collections             │  │
│   │   • Story/World     │          │   • Cart                    │  │
│   │   • About Artist    │          │   • Checkout                │  │
│   │   • Lookbook        │          │   • Customer Account        │  │
│   │   • Bento Grid      │          │   • Order Management        │  │
│   │                     │          │                             │  │
│   │   Custom cursors    │          │   Styled to match brand     │  │
│   │   Animations        │          │   (colors, fonts, buttons)  │  │
│   │   Interactions      │          │                             │  │
│   └─────────────────────┘          └─────────────────────────────┘  │
│            │                                    ▲                    │
│            │      Shopify Storefront API        │                    │
│            └────────────────────────────────────┘                    │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Phase 1: Shopify Store Setup

### 1.1 Create Shopify Store
- [ ] Sign up for Shopify Basic ($39/mo)
- [ ] Store URL: `bunnykitty.myshopify.com` (temporary)
- [ ] Later: Connect custom domain `shop.bunnykitty.com`

### 1.2 Configure Store Settings
- [ ] Store name: BunnyKitty
- [ ] Currency: USD
- [ ] Shipping zones and rates
- [ ] Tax settings
- [ ] Payment providers (Shopify Payments, PayPal)

### 1.3 Add Products
For each product, set:
- [ ] Title, description, price
- [ ] Images (multiple angles)
- [ ] Variants (size, color)
- [ ] Inventory tracking
- [ ] **Custom metafield:** `bunnykitty.grid_prominence` (hero/featured/standard/compact)

### 1.4 Create Collections
- [ ] New Arrivals
- [ ] Best Sellers
- [ ] Apparel
- [ ] Art Prints
- [ ] Accessories

---

## Phase 2: Storefront API Setup

### 2.1 Create Private App / Custom App
1. Shopify Admin → Settings → Apps and sales channels
2. Develop apps → Create an app
3. Configure Storefront API scopes:
   - `unauthenticated_read_product_listings`
   - `unauthenticated_read_product_inventory`
   - `unauthenticated_read_product_tags`
   - `unauthenticated_read_checkouts`
   - `unauthenticated_write_checkouts`

### 2.2 Get API Credentials
```env
# Add to .env.local
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=bunnykitty.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_storefront_token
```

### 2.3 Create Metafield Definition
In Shopify Admin → Settings → Custom data → Products:

```json
{
  "namespace": "bunnykitty",
  "key": "grid_prominence",
  "type": "single_line_text_field",
  "validations": [
    {
      "name": "choices",
      "value": ["hero", "featured", "standard", "compact"]
    }
  ]
}
```

---

## Phase 3: Next.js Integration

### 3.1 Install Shopify Dependencies
```bash
npm install @shopify/hydrogen-react
# or for lighter weight:
npm install graphql graphql-request
```

### 3.2 Create Shopify Client
```typescript
// src/lib/shopify.ts
const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!;
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!;

export async function shopifyFetch<T>({ query, variables }: { query: string; variables?: object }): Promise<T> {
  const response = await fetch(`https://${domain}/api/2024-01/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
    },
    body: JSON.stringify({ query, variables }),
  });

  const json = await response.json();
  return json.data;
}
```

### 3.3 Product Query with Metafields
```graphql
query GetProducts($first: Int!) {
  products(first: $first) {
    edges {
      node {
        id
        title
        handle
        description
        priceRange {
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
            }
          }
        }
        metafield(namespace: "bunnykitty", key: "grid_prominence") {
          value
        }
      }
    }
  }
}
```

### 3.4 Update Bento Grid Component
```typescript
// src/components/sections/BentoGrid.tsx
import { shopifyFetch } from '@/lib/shopify';

type Prominence = 'hero' | 'featured' | 'standard' | 'compact';

interface Product {
  id: string;
  title: string;
  handle: string;
  price: string;
  image: string;
  prominence: Prominence;
}

export async function getProducts(): Promise<Product[]> {
  const data = await shopifyFetch<ProductsResponse>({
    query: PRODUCTS_QUERY,
    variables: { first: 12 }
  });

  return data.products.edges.map(({ node }) => ({
    id: node.id,
    title: node.title,
    handle: node.handle,
    price: node.priceRange.minVariantPrice.amount,
    image: node.images.edges[0]?.node.url,
    prominence: node.metafield?.value || 'standard',
  }));
}
```

### 3.5 Link to Shopify Product Pages
```typescript
// Product card links to Shopify
<a href={`https://shop.bunnykitty.com/products/${product.handle}`}>
  {/* Product card content */}
</a>
```

---

## Phase 4: Shopify Theme Styling

### 4.1 Choose Base Theme
- Use **Dawn** (Shopify's default) as starting point
- Or **Minimal** for cleaner slate

### 4.2 Customize Theme to Match Brand

**Colors (theme settings):**
```json
{
  "colors_accent_1": "#FF3B3B",
  "colors_accent_2": "#FFE135",
  "colors_text": "#1A1A1A",
  "colors_background": "#FFFFFF"
}
```

**Typography:**
- Heading: Archivo Black
- Body: Nunito

**Custom CSS (add to theme.liquid or custom.css):**
```css
/* Pop Art Buttons */
.btn, .shopify-payment-button button {
  border: 3px solid #1A1A1A !important;
  box-shadow: 4px 4px 0 #1A1A1A;
  font-family: 'Nunito', sans-serif;
  font-weight: 800;
  text-transform: uppercase;
}

.btn:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 #1A1A1A;
}

/* Custom Cursors */
body {
  cursor: url('/assets/star_cursor.png') 16 16, auto;
}

a, button, [role="button"] {
  cursor: url('/assets/sparkle_pointer.png') 12 12, pointer;
}
```

### 4.3 Upload Custom Assets
Shopify Admin → Content → Files:
- [ ] star_cursor.png
- [ ] sparkle_pointer.png
- [ ] Logo variants
- [ ] Custom fonts (if not using Google Fonts)

---

## Phase 5: Cart Integration Options

### Option A: Link to Shopify Cart (Simplest)
"Add to Cart" buttons link directly to Shopify:
```
https://shop.bunnykitty.com/cart/add?id=VARIANT_ID&quantity=1
```

### Option B: Cart Drawer with Buy SDK (Better UX)
```bash
npm install @shopify/buy-button-js
```

Creates a slide-out cart drawer on the marketing site that syncs with Shopify.

### Option C: Headless Cart (Most Work)
Full custom cart using Storefront API checkout mutations.

**Recommendation:** Start with Option A, upgrade to Option B later.

---

## Phase 6: Domain Configuration

### 6.1 DNS Setup
```
bunnykitty.com        → Vercel (marketing site)
shop.bunnykitty.com   → Shopify (store)
```

### 6.2 Vercel Configuration
- Primary domain: `bunnykitty.com`
- Redirects configured in `next.config.js` or `vercel.json`

### 6.3 Shopify Domain
1. Shopify Admin → Settings → Domains
2. Add `shop.bunnykitty.com` as custom domain
3. Update DNS CNAME record

---

## Phase 7: Testing Checklist

- [ ] Products display correctly in Bento Grid
- [ ] Prominence levels render correct sizes
- [ ] Product links go to Shopify store
- [ ] Cart functionality works
- [ ] Checkout completes successfully
- [ ] Custom cursors work on Shopify theme
- [ ] Brand consistency across both sites
- [ ] Mobile responsive on both sites

---

## Cost Summary

| Item | Cost |
|------|------|
| Shopify Basic | $39/mo |
| Vercel (free tier) | $0/mo |
| Domain (if new) | ~$15/year |
| **Total** | **~$40/mo** |

---

## Timeline Estimate

| Phase | Duration |
|-------|----------|
| Phase 1: Shopify Setup | 1-2 days |
| Phase 2: API Setup | 1 day |
| Phase 3: Next.js Integration | 2-3 days |
| Phase 4: Theme Styling | 2-3 days |
| Phase 5: Cart Integration | 1-2 days |
| Phase 6: Domain Config | 1 day |
| Phase 7: Testing | 1-2 days |
| **Total** | **~2 weeks** |

---

## Next Steps

1. [ ] Create Shopify store
2. [ ] Add test products with metafields
3. [ ] Set up Storefront API access
4. [ ] Build shopify.ts client in Next.js
5. [ ] Connect Bento Grid to real products
6. [ ] Style Shopify theme to match

---

*Created: January 29, 2026*
