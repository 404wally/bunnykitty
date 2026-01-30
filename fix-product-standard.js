const { chromium } = require('playwright');
const path = require('path');

const OUTPUT_DIR = '/Users/wallyvu/Desktop/BunnyKitty Website/04-Content/asset-screenshots';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    httpCredentials: { username: '', password: 'REALLYrilla2026' },
    viewport: { width: 1440, height: 900 }
  });

  const page = await context.newPage();

  console.log('Fixing Product Standard screenshot...\n');

  await page.goto('https://bunnykitty.vercel.app', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  // Scroll to the product grid section - "FRESH DROPS"
  await page.evaluate(() => window.scrollTo(0, 1500));
  await page.waitForTimeout(1000);

  // Find all product cards and their image containers
  const products = await page.$$('article');
  console.log(`Found ${products.length} products`);

  // Log all product sizes to understand the grid
  for (let i = 0; i < products.length; i++) {
    const prod = products[i];
    const imgDiv = await prod.$('div.relative.overflow-hidden');
    if (imgDiv) {
      const box = await imgDiv.boundingBox();
      if (box) {
        const isHero = box.width > 500 && box.height > 350;
        const isFeatured = box.width > 500 && box.height < 300;
        const isStandard = box.width < 350;
        const type = isHero ? 'HERO' : isFeatured ? 'FEATURED' : isStandard ? 'STANDARD' : 'unknown';
        console.log(`  Product ${i + 1}: ${Math.round(box.width)}×${Math.round(box.height)}px - ${type}`);
      }
    }
  }

  // Find a STANDARD product (smaller width, around 278px)
  let standardFound = false;
  for (let i = 0; i < products.length; i++) {
    const prod = products[i];
    const imgDiv = await prod.$('div.relative.overflow-hidden');
    if (imgDiv) {
      const box = await imgDiv.boundingBox();
      // Standard products are narrower (< 350px wide)
      if (box && box.width < 350 && box.width > 200) {
        console.log(`\nHighlighting STANDARD product ${i + 1}: ${Math.round(box.width)}×${Math.round(box.height)}px`);

        // Scroll so this product is nicely visible in frame
        const scrollTo = Math.max(0, box.y - 300);
        await page.evaluate((y) => window.scrollTo(0, y + window.scrollY - 200), box.y);
        await page.waitForTimeout(500);

        // Get updated position after scroll
        const newBox = await imgDiv.boundingBox();

        // Add a very visible highlight
        await page.evaluate(({ box }) => {
          const h = document.createElement('div');
          h.id = 'standard-highlight';
          h.style.cssText = `
            position: fixed;
            top: ${box.y}px;
            left: ${box.x}px;
            width: ${box.width}px;
            height: ${box.height}px;
            border: 6px dashed #00D4FF;
            background: rgba(0, 212, 255, 0.2);
            pointer-events: none;
            z-index: 99999;
            box-sizing: border-box;
          `;

          const label = document.createElement('div');
          label.style.cssText = `
            position: absolute;
            top: -32px;
            left: 0;
            background: #00D4FF;
            color: white;
            padding: 6px 12px;
            font-size: 14px;
            font-weight: bold;
            font-family: Arial, sans-serif;
            white-space: nowrap;
            box-shadow: 2px 2px 4px rgba(0,0,0,0.3);
          `;
          label.textContent = 'STANDARD Product Image: Rec 560×450px';
          h.appendChild(label);

          document.body.appendChild(h);
        }, { box: newBox });

        standardFound = true;
        break;
      }
    }
  }

  if (!standardFound) {
    console.log('No standard product found! Taking screenshot of product grid anyway.');
  }

  await page.screenshot({
    path: path.join(OUTPUT_DIR, '04-product-standard-image.png'),
    clip: { x: 0, y: 0, width: 1440, height: 900 }
  });

  console.log('\n✓ 04-product-standard-image.png saved');

  await browser.close();
})();
