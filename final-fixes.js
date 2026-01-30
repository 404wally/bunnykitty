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

  console.log('Final fixes for all screenshots...\n');

  // ========== #4: Product Standard - from Homepage ==========
  console.log('4. Product Image - STANDARD (from homepage)...');
  await page.goto('https://bunnykitty.vercel.app', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  await page.evaluate(() => window.scrollTo(0, 2000));
  await page.waitForTimeout(1000);

  // Find standard products (smaller ones in the grid)
  const allProducts = await page.$$('article');
  console.log(`  Found ${allProducts.length} products on homepage`);

  for (let i = 0; i < allProducts.length; i++) {
    const prod = allProducts[i];
    const imgDiv = await prod.$('div.relative.overflow-hidden');
    if (imgDiv) {
      const box = await imgDiv.boundingBox();
      if (box && box.width < 350 && box.width > 200) {
        console.log(`  Standard product ${i}: ${Math.round(box.width)}×${Math.round(box.height)}px`);
        await page.evaluate(({ box }) => {
          const h = document.createElement('div');
          h.style.cssText = `position:fixed;top:${box.y}px;left:${box.x}px;width:${box.width}px;height:${box.height}px;border:4px dashed #00D4FF;background:rgba(0,212,255,0.15);pointer-events:none;z-index:99999;box-sizing:border-box;`;
          const l = document.createElement('div');
          l.style.cssText = `position:absolute;top:-28px;left:0;background:#00D4FF;color:white;padding:4px 8px;font-size:12px;font-weight:bold;font-family:Arial;`;
          l.textContent = 'STANDARD Image: Rec 560×450px';
          h.appendChild(l);
          document.body.appendChild(h);
        }, { box });
        break;
      }
    }
  }

  await page.screenshot({
    path: path.join(OUTPUT_DIR, '04-product-standard-image.png'),
    clip: { x: 0, y: 0, width: 1440, height: 900 }
  });
  console.log('  ✓ 04-product-standard-image.png\n');

  // ========== #6a & #6b: Story Cards ==========
  console.log('6. Story Cards...');
  await page.goto('https://bunnykitty.vercel.app', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  // Scroll to story cards section
  await page.evaluate(() => window.scrollTo(0, 680));
  await page.waitForTimeout(1000);

  // Take a clean screenshot first to see the page state
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'debug-storycards.png'), clip: { x: 0, y: 0, width: 1440, height: 900 } });

  // Find story cards using the section structure
  // The story cards are in a grid with 3 columns
  const cardData = await page.evaluate(() => {
    const cards = [];
    // Look for divs that have these specific background colors
    const allElements = document.querySelectorAll('*');

    for (const el of allElements) {
      const style = window.getComputedStyle(el);
      const bg = style.backgroundColor;
      const rect = el.getBoundingClientRect();

      // Skip small or off-screen elements
      if (rect.width < 250 || rect.height < 200 || rect.y < 100 || rect.y > 800) continue;

      // Check for yellow (rgb(253, 224, 71) or similar)
      if (bg.includes('253, 224, 71') || bg.includes('254, 240, 138')) {
        cards.push({ x: rect.x, y: rect.y, width: rect.width, height: rect.height, color: '#FFE135', name: 'Yellow', textColor: 'black' });
      }
      // Check for pink (rgb(249, 168, 212) or similar)
      else if (bg.includes('249, 168, 212') || bg.includes('244, 114, 182')) {
        cards.push({ x: rect.x, y: rect.y, width: rect.width, height: rect.height, color: '#FF6EB4', name: 'Pink', textColor: 'white' });
      }
      // Check for cyan (rgb(103, 232, 249) or similar)
      else if (bg.includes('103, 232, 249') || bg.includes('34, 211, 238')) {
        cards.push({ x: rect.x, y: rect.y, width: rect.width, height: rect.height, color: '#00D4FF', name: 'Cyan', textColor: 'white' });
      }
    }

    // Deduplicate - keep largest of overlapping elements
    const unique = [];
    for (const card of cards) {
      const isDuplicate = unique.some(u =>
        Math.abs(u.x - card.x) < 50 && Math.abs(u.y - card.y) < 50
      );
      if (!isDuplicate) {
        unique.push(card);
      }
    }

    return unique;
  });

  console.log(`  Found ${cardData.length} story cards by computed style`);

  // If still no cards, try by class name pattern
  if (cardData.length === 0) {
    // Direct approach - find the grid section
    const gridSection = await page.$('section:has(.grid)');
    if (gridSection) {
      const sectionBox = await gridSection.boundingBox();
      console.log(`  Grid section at y=${sectionBox?.y}`);
    }

    // Try to find by looking at all grid children
    const gridCards = await page.$$('div.grid > div, section > div > div.grid > div');
    console.log(`  Found ${gridCards.length} grid children`);

    for (let i = 0; i < Math.min(3, gridCards.length); i++) {
      const card = gridCards[i];
      const box = await card.boundingBox();
      if (box && box.width > 200 && box.height > 150) {
        const colors = ['#FFE135', '#FF6EB4', '#00D4FF'];
        const names = ['Yellow', 'Pink', 'Cyan'];

        await page.evaluate(({ box, color, name }) => {
          const h = document.createElement('div');
          h.style.cssText = `position:fixed;top:${box.y}px;left:${box.x}px;width:${box.width}px;height:${box.height}px;border:4px dashed ${color};background:${color}22;pointer-events:none;z-index:99999;box-sizing:border-box;`;
          const l = document.createElement('div');
          l.style.cssText = `position:absolute;top:-28px;left:0;background:${color};color:${name === 'Yellow' ? 'black' : 'white'};padding:4px 8px;font-size:11px;font-weight:bold;font-family:Arial;`;
          l.textContent = `${name} Card BG: Rec 800×400px`;
          h.appendChild(l);
          document.body.appendChild(h);
        }, { box, color: colors[i], name: names[i] });

        console.log(`  Card ${i + 1}: ${Math.round(box.width)}×${Math.round(box.height)}px`);
      }
    }
  } else {
    // Add highlights for found cards
    for (const card of cardData) {
      await page.evaluate(({ card }) => {
        const h = document.createElement('div');
        h.style.cssText = `position:fixed;top:${card.y}px;left:${card.x}px;width:${card.width}px;height:${card.height}px;border:4px dashed ${card.color};background:${card.color}22;pointer-events:none;z-index:99999;box-sizing:border-box;`;
        const l = document.createElement('div');
        l.style.cssText = `position:absolute;top:-28px;left:0;background:${card.color};color:${card.textColor};padding:4px 8px;font-size:11px;font-weight:bold;font-family:Arial;`;
        l.textContent = `${card.name} Card BG: Rec 800×400px`;
        h.appendChild(l);
        document.body.appendChild(h);
      }, { card });
      console.log(`  ${card.name} card: ${Math.round(card.width)}×${Math.round(card.height)}px`);
    }
  }

  await page.screenshot({
    path: path.join(OUTPUT_DIR, '06b-story-card-backgrounds.png'),
    clip: { x: 0, y: 0, width: 1440, height: 900 }
  });
  console.log('  ✓ 06b-story-card-backgrounds.png');

  // Clear for icons
  await page.evaluate(() => document.querySelectorAll('div[style*="dashed"]').forEach(el => el.remove()));

  // Now find icons (the emoji spans)
  const icons = await page.$$('span.text-5xl, span.text-4xl, span[class*="text-5xl"]');
  console.log(`  Found ${icons.length} icon spans`);

  const iconColors = ['#FFE135', '#FF6EB4', '#00D4FF'];
  const iconNames = ['In The City', 'Original Art', 'Join Crew'];
  let iconCount = 0;

  for (const icon of icons) {
    if (iconCount >= 3) break;
    const box = await icon.boundingBox();
    if (box && box.width > 20 && box.y > 100 && box.y < 800) {
      const expandedBox = {
        x: box.x - 10,
        y: box.y - 10,
        width: box.width + 20,
        height: box.height + 20
      };

      await page.evaluate(({ box, color, name }) => {
        const h = document.createElement('div');
        h.style.cssText = `position:fixed;top:${box.y}px;left:${box.x}px;width:${box.width}px;height:${box.height}px;border:4px dashed ${color};background:${color}22;pointer-events:none;z-index:99999;box-sizing:border-box;`;
        const l = document.createElement('div');
        l.style.cssText = `position:absolute;top:-28px;left:0;background:${color};color:${name === 'In The City' ? 'black' : 'white'};padding:4px 8px;font-size:11px;font-weight:bold;font-family:Arial;white-space:nowrap;`;
        l.textContent = `Icon "${name}": Rec 256×256px`;
        h.appendChild(l);
        document.body.appendChild(h);
      }, { box: expandedBox, color: iconColors[iconCount], name: iconNames[iconCount] });

      console.log(`  Icon "${iconNames[iconCount]}": ${Math.round(box.width)}×${Math.round(box.height)}px`);
      iconCount++;
    }
  }

  await page.screenshot({
    path: path.join(OUTPUT_DIR, '06a-story-card-icons.png'),
    clip: { x: 0, y: 0, width: 1440, height: 900 }
  });
  console.log('  ✓ 06a-story-card-icons.png\n');

  await browser.close();
  console.log('✅ All fixes complete!');
})();
