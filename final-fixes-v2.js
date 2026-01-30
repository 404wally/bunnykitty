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

  console.log('Final fixes v2...\n');

  // ========== FIX #1: Hero Background - exclude nav bar ==========
  console.log('1. Hero Background (exclude nav)...');
  await page.goto('https://bunnykitty.vercel.app', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  // Get the hero section but exclude the header/nav
  const heroBox = await page.evaluate(() => {
    const hero = document.querySelector('section:first-of-type');
    const header = document.querySelector('header');
    const heroRect = hero.getBoundingClientRect();
    const headerRect = header ? header.getBoundingClientRect() : { height: 0 };

    // Start below the header
    return {
      x: heroRect.x,
      y: headerRect.height + 8, // Below the header + rainbow bar
      width: heroRect.width,
      height: heroRect.height - headerRect.height - 8
    };
  });

  await page.evaluate(({ box }) => {
    const h = document.createElement('div');
    h.style.cssText = `position:fixed;top:${box.y}px;left:${box.x}px;width:${box.width}px;height:${box.height}px;border:6px dashed #FF3B3B;background:rgba(255,59,59,0.1);pointer-events:none;z-index:99998;box-sizing:border-box;`;
    const l = document.createElement('div');
    l.style.cssText = `position:absolute;bottom:10px;right:10px;background:#FF3B3B;color:white;padding:8px 12px;font-size:14px;font-weight:bold;font-family:Arial;border-radius:4px;`;
    l.textContent = 'HERO BACKGROUND: Rec 2880×1800px';
    h.appendChild(l);
    document.body.appendChild(h);
  }, { box: heroBox });

  await page.screenshot({
    path: path.join(OUTPUT_DIR, '01b-hero-background.png'),
    clip: { x: 0, y: 0, width: 1440, height: 900 }
  });
  console.log('  ✓ 01b-hero-background.png (nav excluded)\n');

  // Clear highlights
  await page.evaluate(() => document.querySelectorAll('div[style*="dashed"]').forEach(el => el.remove()));

  // ========== FIX #5: Product Standard - better scroll position ==========
  console.log('5. Product Standard (better scroll)...');
  await page.evaluate(() => window.scrollTo(0, 1800));
  await page.waitForTimeout(1000);

  // Find a standard product and highlight it
  const products = await page.$$('article');
  for (let i = 0; i < products.length; i++) {
    const prod = products[i];
    const imgDiv = await prod.$('div.relative.overflow-hidden');
    if (imgDiv) {
      const box = await imgDiv.boundingBox();
      if (box && box.width < 350 && box.width > 200 && box.y > 100 && box.y < 600) {
        await page.evaluate(({ box }) => {
          const h = document.createElement('div');
          h.style.cssText = `position:fixed;top:${box.y}px;left:${box.x}px;width:${box.width}px;height:${box.height}px;border:4px dashed #00D4FF;background:rgba(0,212,255,0.15);pointer-events:none;z-index:99999;box-sizing:border-box;`;
          const l = document.createElement('div');
          l.style.cssText = `position:absolute;top:-28px;left:0;background:#00D4FF;color:white;padding:4px 8px;font-size:12px;font-weight:bold;font-family:Arial;`;
          l.textContent = 'STANDARD Image: Rec 560×450px';
          h.appendChild(l);
          document.body.appendChild(h);
        }, { box });
        console.log(`  Standard product: ${Math.round(box.width)}×${Math.round(box.height)}px at y=${Math.round(box.y)}`);
        break;
      }
    }
  }

  await page.screenshot({
    path: path.join(OUTPUT_DIR, '04-product-standard-image.png'),
    clip: { x: 0, y: 0, width: 1440, height: 900 }
  });
  console.log('  ✓ 04-product-standard-image.png\n');

  await page.evaluate(() => document.querySelectorAll('div[style*="dashed"]').forEach(el => el.remove()));

  // ========== FIX #6: Story Card Icons - add outlines ==========
  console.log('6. Story Card Icons (with outlines)...');
  await page.evaluate(() => window.scrollTo(0, 700));
  await page.waitForTimeout(1000);

  // Find the emoji icons specifically
  const iconData = await page.evaluate(() => {
    const icons = [];
    const emojis = document.querySelectorAll('span.text-5xl');

    emojis.forEach((emoji, index) => {
      const rect = emoji.getBoundingClientRect();
      if (rect.y > 200 && rect.y < 700 && rect.width > 30) {
        // Check parent for card color
        let parent = emoji.parentElement;
        let color = '#FF3B3B';
        let name = 'Icon';

        while (parent && parent !== document.body) {
          const classes = parent.className || '';
          if (classes.includes('bg-yellow')) { color = '#FFE135'; name = 'In The City'; break; }
          if (classes.includes('bg-pink')) { color = '#FF6EB4'; name = 'Original Art'; break; }
          if (classes.includes('bg-cyan')) { color = '#00D4FF'; name = 'Join Crew'; break; }
          parent = parent.parentElement;
        }

        icons.push({
          x: rect.x - 8,
          y: rect.y - 8,
          width: rect.width + 16,
          height: rect.height + 16,
          color,
          name
        });
      }
    });

    return icons;
  });

  console.log(`  Found ${iconData.length} icons`);

  for (const icon of iconData) {
    await page.evaluate(({ icon }) => {
      const h = document.createElement('div');
      h.style.cssText = `position:fixed;top:${icon.y}px;left:${icon.x}px;width:${icon.width}px;height:${icon.height}px;border:4px dashed ${icon.color};background:${icon.color}22;pointer-events:none;z-index:99999;box-sizing:border-box;`;
      const l = document.createElement('div');
      l.style.cssText = `position:absolute;top:-28px;left:0;background:${icon.color};color:${icon.name === 'In The City' ? 'black' : 'white'};padding:4px 8px;font-size:11px;font-weight:bold;font-family:Arial;white-space:nowrap;`;
      l.textContent = `Icon "${icon.name}": Rec 256×256px`;
      h.appendChild(l);
      document.body.appendChild(h);
    }, { icon });
    console.log(`  ${icon.name}: ${Math.round(icon.width)}×${Math.round(icon.height)}px`);
  }

  await page.screenshot({
    path: path.join(OUTPUT_DIR, '06a-story-card-icons.png'),
    clip: { x: 0, y: 0, width: 1440, height: 900 }
  });
  console.log('  ✓ 06a-story-card-icons.png\n');

  await page.evaluate(() => document.querySelectorAll('div[style*="dashed"]').forEach(el => el.remove()));

  // ========== FIX #11: Gallery - highlight top 3 images ==========
  console.log('11. Gallery (top 3 images)...');
  await page.goto('https://bunnykitty.vercel.app/lookbook', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  await page.evaluate(() => window.scrollTo(0, 200));
  await page.waitForTimeout(500);

  // Find the top 3 gallery images
  const galleryData = await page.evaluate(() => {
    const items = [];
    // Look for gallery items - they're likely in a masonry or grid layout
    const allDivs = document.querySelectorAll('div[class*="aspect-"], div.relative > div');

    for (const div of allDivs) {
      const rect = div.getBoundingClientRect();
      // Only consider visible items in the gallery area
      if (rect.width < 150 || rect.height < 150 || rect.y < 100 || rect.y > 800) continue;

      const ratio = rect.width / rect.height;
      items.push({
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height,
        ratio
      });
    }

    // Sort by y position (top first), then x (left first)
    items.sort((a, b) => {
      if (Math.abs(a.y - b.y) < 50) return a.x - b.x;
      return a.y - b.y;
    });

    return items.slice(0, 10); // Get top items
  });

  console.log(`  Found ${galleryData.length} gallery items`);

  // Find one of each type from the top items
  let portrait = null, landscape = null, square = null;

  for (const item of galleryData) {
    if (!portrait && item.ratio < 0.85) {
      portrait = { ...item, type: 'Portrait', color: '#FF3B3B', label: 'Portrait (3:4): Rec 900×1200px' };
    } else if (!landscape && item.ratio > 1.15) {
      landscape = { ...item, type: 'Landscape', color: '#00D4FF', label: 'Landscape (4:3): Rec 1200×900px' };
    } else if (!square && item.ratio >= 0.85 && item.ratio <= 1.15) {
      square = { ...item, type: 'Square', color: '#39FF14', label: 'Square (1:1): Rec 1000×1000px' };
    }

    if (portrait && landscape && square) break;
  }

  const highlights = [portrait, landscape, square].filter(Boolean);

  for (const item of highlights) {
    await page.evaluate(({ item }) => {
      const h = document.createElement('div');
      h.style.cssText = `position:fixed;top:${item.y}px;left:${item.x}px;width:${item.width}px;height:${item.height}px;border:4px dashed ${item.color};background:${item.color}22;pointer-events:none;z-index:99999;box-sizing:border-box;`;
      const l = document.createElement('div');
      l.style.cssText = `position:absolute;top:-28px;left:0;background:${item.color};color:white;padding:4px 8px;font-size:11px;font-weight:bold;font-family:Arial;white-space:nowrap;`;
      l.textContent = item.label;
      h.appendChild(l);
      document.body.appendChild(h);
    }, { item });
    console.log(`  ${item.type}: ${Math.round(item.width)}×${Math.round(item.height)}px (ratio: ${item.ratio.toFixed(2)})`);
  }

  await page.screenshot({
    path: path.join(OUTPUT_DIR, '09-gallery-images.png'),
    clip: { x: 0, y: 0, width: 1440, height: 900 }
  });
  console.log('  ✓ 09-gallery-images.png\n');

  await browser.close();
  console.log('✅ All fixes complete!');
})();
