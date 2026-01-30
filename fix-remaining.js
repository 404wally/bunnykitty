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

  console.log('Fixing remaining screenshots...\n');

  // ========== FIX #4: Product Standard ==========
  console.log('4. Product Image - STANDARD...');
  await page.goto('https://bunnykitty.vercel.app/shop', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  // Find all product cards and identify a standard-sized one
  const products = await page.$$('article');
  console.log(`  Found ${products.length} products`);

  // Get dimensions of each product's image container
  for (let i = 0; i < Math.min(6, products.length); i++) {
    const card = products[i];
    const imgContainer = await card.$('div.relative.overflow-hidden');
    if (imgContainer) {
      const box = await imgContainer.boundingBox();
      if (box) {
        console.log(`  Product ${i + 1}: ${Math.round(box.width)}×${Math.round(box.height)}px`);
        // Standard products are smaller (around 280px wide on desktop grid)
        if (box.width < 350 && box.width > 200) {
          // This is a standard-sized product
          await page.evaluate(({ box }) => {
            const highlight = document.createElement('div');
            highlight.className = 'playwright-highlight';
            highlight.style.cssText = `
              position: fixed;
              top: ${box.y}px;
              left: ${box.x}px;
              width: ${box.width}px;
              height: ${box.height}px;
              border: 4px dashed #00D4FF;
              background: rgba(0, 212, 255, 0.15);
              pointer-events: none;
              z-index: 99999;
              box-sizing: border-box;
            `;
            const label = document.createElement('div');
            label.style.cssText = `
              position: absolute;
              top: -28px;
              left: 0;
              background: #00D4FF;
              color: white;
              padding: 4px 8px;
              font-size: 12px;
              font-weight: bold;
              font-family: Arial, sans-serif;
            `;
            label.textContent = 'STANDARD Image: Rec 560×450px';
            highlight.appendChild(label);
            document.body.appendChild(highlight);
          }, { box });
          console.log(`  ✓ Highlighted standard product ${i + 1}`);
          break;
        }
      }
    }
  }

  await page.screenshot({
    path: path.join(OUTPUT_DIR, '04-product-standard-image.png'),
    clip: { x: 0, y: 0, width: 1440, height: 900 }
  });
  console.log('  ✓ 04-product-standard-image.png\n');

  // ========== FIX #6a & #6b: Story Cards ==========
  console.log('6. Story Cards...');
  await page.goto('https://bunnykitty.vercel.app', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  await page.evaluate(() => window.scrollTo(0, 700));
  await page.waitForTimeout(1000);

  // Use JavaScript to find and highlight the cards directly
  const cardsInfo = await page.evaluate(() => {
    const results = [];

    // Find cards by their background color classes
    const allDivs = document.querySelectorAll('div');
    for (const div of allDivs) {
      const classList = div.className || '';
      const rect = div.getBoundingClientRect();

      // Skip elements that are too small or off-screen
      if (rect.width < 200 || rect.height < 150 || rect.y < 0 || rect.y > 1000) continue;

      if (classList.includes('bg-yellow-300') || classList.includes('bg-pink-300') || classList.includes('bg-cyan-300')) {
        let color = '#FFE135';
        let name = 'Yellow';
        if (classList.includes('bg-pink')) { color = '#FF6EB4'; name = 'Pink'; }
        if (classList.includes('bg-cyan')) { color = '#00D4FF'; name = 'Cyan'; }

        results.push({
          x: rect.x,
          y: rect.y,
          width: rect.width,
          height: rect.height,
          color,
          name
        });
      }
    }
    return results;
  });

  console.log(`  Found ${cardsInfo.length} story cards`);

  // Add highlights for card backgrounds (6b)
  for (const card of cardsInfo) {
    await page.evaluate(({ card }) => {
      const highlight = document.createElement('div');
      highlight.className = 'playwright-highlight';
      highlight.style.cssText = `
        position: fixed;
        top: ${card.y}px;
        left: ${card.x}px;
        width: ${card.width}px;
        height: ${card.height}px;
        border: 4px dashed ${card.color};
        background: ${card.color}22;
        pointer-events: none;
        z-index: 99999;
        box-sizing: border-box;
      `;
      const label = document.createElement('div');
      label.style.cssText = `
        position: absolute;
        top: -28px;
        left: 0;
        background: ${card.color};
        color: ${card.name === 'Yellow' ? 'black' : 'white'};
        padding: 4px 8px;
        font-size: 11px;
        font-weight: bold;
        font-family: Arial, sans-serif;
      `;
      label.textContent = `${card.name} Card BG: Rec 800×400px`;
      highlight.appendChild(label);
      document.body.appendChild(highlight);
    }, { card });
    console.log(`  ${card.name} card: ${Math.round(card.width)}×${Math.round(card.height)}px`);
  }

  await page.screenshot({
    path: path.join(OUTPUT_DIR, '06b-story-card-backgrounds.png'),
    clip: { x: 0, y: 0, width: 1440, height: 900 }
  });
  console.log('  ✓ 06b-story-card-backgrounds.png');

  // Clear highlights
  await page.evaluate(() => {
    document.querySelectorAll('.playwright-highlight').forEach(el => el.remove());
  });

  // Now do icons (6a)
  // Find the emoji/icon elements
  const iconsInfo = await page.evaluate(() => {
    const results = [];
    const emojis = document.querySelectorAll('span.text-5xl, span.text-4xl');

    for (const emoji of emojis) {
      const rect = emoji.getBoundingClientRect();
      if (rect.width < 20 || rect.y < 0 || rect.y > 1000) continue;

      // Check parent card color
      let parent = emoji.parentElement;
      let color = '#FF3B3B';
      let name = 'Icon';

      while (parent) {
        const classList = parent.className || '';
        if (classList.includes('bg-yellow')) { color = '#FFE135'; name = 'In The City'; break; }
        if (classList.includes('bg-pink')) { color = '#FF6EB4'; name = 'Original Art'; break; }
        if (classList.includes('bg-cyan')) { color = '#00D4FF'; name = 'Join Crew'; break; }
        parent = parent.parentElement;
      }

      if (name !== 'Icon') {
        results.push({
          x: rect.x - 15,
          y: rect.y - 15,
          width: rect.width + 30,
          height: rect.height + 30,
          color,
          name
        });
      }
    }
    return results;
  });

  console.log(`  Found ${iconsInfo.length} icons`);

  for (const icon of iconsInfo) {
    await page.evaluate(({ icon }) => {
      const highlight = document.createElement('div');
      highlight.className = 'playwright-highlight';
      highlight.style.cssText = `
        position: fixed;
        top: ${icon.y}px;
        left: ${icon.x}px;
        width: ${icon.width}px;
        height: ${icon.height}px;
        border: 4px dashed ${icon.color};
        background: ${icon.color}22;
        pointer-events: none;
        z-index: 99999;
        box-sizing: border-box;
      `;
      const label = document.createElement('div');
      label.style.cssText = `
        position: absolute;
        top: -28px;
        left: 0;
        background: ${icon.color};
        color: ${icon.name === 'In The City' ? 'black' : 'white'};
        padding: 4px 8px;
        font-size: 11px;
        font-weight: bold;
        font-family: Arial, sans-serif;
        white-space: nowrap;
      `;
      label.textContent = `Icon "${icon.name}": Rec 256×256px`;
      highlight.appendChild(label);
      document.body.appendChild(highlight);
    }, { icon });
    console.log(`  Icon "${icon.name}": ${Math.round(icon.width)}×${Math.round(icon.height)}px`);
  }

  await page.screenshot({
    path: path.join(OUTPUT_DIR, '06a-story-card-icons.png'),
    clip: { x: 0, y: 0, width: 1440, height: 900 }
  });
  console.log('  ✓ 06a-story-card-icons.png\n');

  await browser.close();
  console.log('✅ Remaining screenshots fixed!');
})();
