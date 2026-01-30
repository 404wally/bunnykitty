# BunnyKitty Shopify Theme Customizations

This folder contains custom styles to make your Shopify store match the BunnyKitty brand.

## Files Included

```
shopify-theme/
├── bunnykitty-custom.css    # All brand styles
├── star_cursor.png          # Default cursor
├── sparkle_pointer.png      # Pointer cursor for links
└── README.md                # This file
```

---

## Installation Steps

### Step 1: Upload Cursor Images

1. Go to **Shopify Admin** → **Content** → **Files**
2. Click **Upload files**
3. Upload both cursor images:
   - `star_cursor.png`
   - `sparkle_pointer.png`
4. After upload, click each file and **copy the CDN URL** (you'll need these)

Example URLs:
```
https://cdn.shopify.com/s/files/1/xxxx/xxxx/files/star_cursor.png
https://cdn.shopify.com/s/files/1/xxxx/xxxx/files/sparkle_pointer.png
```

---

### Step 2: Update Cursor URLs in CSS

Open `bunnykitty-custom.css` and replace the cursor URLs with your Shopify CDN URLs:

**Find (around line 33):**
```css
body {
  cursor: url('star_cursor.png') 16 16, auto !important;
}
```

**Replace with:**
```css
body {
  cursor: url('https://cdn.shopify.com/s/files/1/YOUR-STORE/files/star_cursor.png') 16 16, auto !important;
}
```

**Do the same for the sparkle pointer (around line 45).**

---

### Step 3: Add Custom CSS to Theme

#### Option A: Theme Editor (Easiest)

1. Go to **Shopify Admin** → **Online Store** → **Themes**
2. Click **Customize** on your active theme
3. Click **Theme settings** (gear icon, bottom left)
4. Scroll down to find **Custom CSS** section
5. Paste the entire contents of `bunnykitty-custom.css`
6. Click **Save**

#### Option B: Edit Theme Code (More Control)

1. Go to **Shopify Admin** → **Online Store** → **Themes**
2. Click **•••** → **Edit code**
3. In the **Assets** folder, click **Add a new asset**
4. Upload `bunnykitty-custom.css`
5. Open `theme.liquid` (in Layout folder)
6. Before the closing `</head>` tag, add:
```liquid
{{ 'bunnykitty-custom.css' | asset_url | stylesheet_tag }}
```
7. Click **Save**

---

### Step 4: Configure Theme Settings

In **Theme Customize** → **Theme settings**:

#### Colors
| Setting | Value |
|---------|-------|
| Primary/Accent 1 | `#FF3B3B` (Pop Red) |
| Accent 2 | `#FFE135` (Pop Yellow) |
| Background | `#FFFFFF` |
| Text | `#1A1A1A` |

#### Typography
| Setting | Value |
|---------|-------|
| Heading font | Archivo Black (or closest available) |
| Body font | Nunito |

---

## What the CSS Customizes

- **Custom cursors** — Star cursor + sparkle pointer
- **Typography** — Archivo Black headings, Nunito body
- **Buttons** — Pop art style with hard shadows
- **Product cards** — Bordered cards with hover lift effect
- **Header** — Yellow background, black border
- **Footer** — Black background, yellow accents
- **Forms** — Bordered inputs with focus states
- **Badges** — Pink/green tags for sales
- **Scrollbar** — Custom yellow/black scrollbar
- **Selection** — Pink highlight when selecting text

---

## Color Reference

| Color | Hex | Usage |
|-------|-----|-------|
| Pop Red | `#FF3B3B` | Primary buttons, accents |
| Pop Yellow | `#FFE135` | Header, backgrounds |
| Pop Blue | `#00D4FF` | Secondary accent |
| Pop Pink | `#FF6EB4` | Badges, highlights |
| Pop Green | `#39FF14` | Sale badges, success |
| Pop Purple | `#9D4EDD` | Tertiary accent |
| Black | `#1A1A1A` | Text, borders |
| White | `#FFFFFF` | Backgrounds, cards |

---

## Troubleshooting

### Cursors not showing?
- Make sure you replaced the cursor URLs with your Shopify CDN URLs
- Check browser console for 404 errors
- Some browsers block custom cursors on certain elements

### Styles not applying?
- Clear your browser cache (Cmd+Shift+R)
- Make sure CSS is loaded after theme's default CSS
- Check for `!important` conflicts

### Fonts not loading?
- The CSS imports Google Fonts automatically
- If blocked, add fonts manually in theme settings

---

## Need Help?

Refer to the main session notes:
- `docs/sessions/Session-2026-01-29.md`
- `docs/SHOPIFY-INTEGRATION.md`
