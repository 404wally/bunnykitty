const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const OUTPUT_DIR = '/Users/wallyvu/Desktop/BunnyKitty Website/04-Content/asset-screenshots';

async function captureWithHighlight(page, selector, filename, label, scrollY = 0) {
  // Scroll to position
  await page.evaluate((y) => window.scrollTo(0, y), scrollY);
  await page.waitForTimeout(500);

  // Get element bounding box
  const element = await page.$(selector);
  if (!element) {
    console.log(`  ⚠️ Element not found: ${selector}`);
    return null;
  }

  const box = await element.boundingBox();
  if (!box) {
    console.log(`  ⚠️ Could not get bounding box: ${selector}`);
    return null;
  }

  // Add highlight overlay to the page
  await page.evaluate(({ box, label }) => {
    // Remove any existing highlights
    document.querySelectorAll('.playwright-highlight').forEach(el => el.remove());

    const highlight = document.createElement('div');
    highlight.className = 'playwright-highlight';
    highlight.style.cssText = `
      position: fixed;
      top: ${box.y}px;
      left: ${box.x}px;
      width: ${box.width}px;
      height: ${box.height}px;
      border: 4px dashed #FF3B3B;
      background: rgba(255, 59, 59, 0.15);
      pointer-events: none;
      z-index: 99999;
      box-sizing: border-box;
    `;

    const labelEl = document.createElement('div');
    labelEl.style.cssText = `
      position: absolute;
      top: -28px;
      left: 0;
      background: #FF3B3B;
      color: white;
      padding: 4px 8px;
      font-size: 12px;
      font-weight: bold;
      font-family: Arial, sans-serif;
      white-space: nowrap;
    `;
    labelEl.textContent = label;
    highlight.appendChild(labelEl);

    document.body.appendChild(highlight);
  }, { box, label });

  // Take screenshot
  await page.screenshot({
    path: path.join(OUTPUT_DIR, filename),
    clip: { x: 0, y: 0, width: 1440, height: 900 }
  });

  // Remove highlight
  await page.evaluate(() => {
    document.querySelectorAll('.playwright-highlight').forEach(el => el.remove());
  });

  console.log(`  ✓ ${filename} - Element: ${Math.round(box.width)}×${Math.round(box.height)}px at (${Math.round(box.x)}, ${Math.round(box.y)})`);
  return box;
}

async function captureMultipleHighlights(page, elements, filename, scrollY = 0) {
  await page.evaluate((y) => window.scrollTo(0, y), scrollY);
  await page.waitForTimeout(500);

  // Add all highlights
  for (const { selector, label, color = '#FF3B3B' } of elements) {
    const element = await page.$(selector);
    if (!element) {
      console.log(`  ⚠️ Element not found: ${selector}`);
      continue;
    }

    const box = await element.boundingBox();
    if (!box) continue;

    await page.evaluate(({ box, label, color }) => {
      const highlight = document.createElement('div');
      highlight.className = 'playwright-highlight';
      highlight.style.cssText = `
        position: fixed;
        top: ${box.y}px;
        left: ${box.x}px;
        width: ${box.width}px;
        height: ${box.height}px;
        border: 4px dashed ${color};
        background: ${color}22;
        pointer-events: none;
        z-index: 99999;
        box-sizing: border-box;
      `;

      const labelEl = document.createElement('div');
      labelEl.style.cssText = `
        position: absolute;
        top: -28px;
        left: 0;
        background: ${color};
        color: white;
        padding: 4px 8px;
        font-size: 11px;
        font-weight: bold;
        font-family: Arial, sans-serif;
        white-space: nowrap;
      `;
      labelEl.textContent = label;
      highlight.appendChild(labelEl);

      document.body.appendChild(highlight);
    }, { box, label, color });

    console.log(`    - ${label}: ${Math.round(box.width)}×${Math.round(box.height)}px`);
  }

  // Take screenshot
  await page.screenshot({
    path: path.join(OUTPUT_DIR, filename),
    clip: { x: 0, y: 0, width: 1440, height: 900 }
  });

  // Remove all highlights
  await page.evaluate(() => {
    document.querySelectorAll('.playwright-highlight').forEach(el => el.remove());
  });

  console.log(`  ✓ ${filename}`);
}

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    httpCredentials: { username: '', password: 'REALLYrilla2026' },
    viewport: { width: 1440, height: 900 }
  });

  const page = await context.newPage();

  console.log('Starting annotated screenshot capture...\n');
  console.log('=' .repeat(60));

  // ==================== HOMEPAGE ====================
  console.log('\n📸 HOMEPAGE\n');
  await page.goto('https://bunnykitty.vercel.app', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  // 1. Floating Characters - capture all 4
  console.log('Floating Characters:');
  await captureMultipleHighlights(page, [
    { selector: 'section > div:nth-child(2)', label: 'Character 1 (128×128px)', color: '#FF3B3B' },
    { selector: 'section > div:nth-child(3)', label: 'Character 2 (128×128px)', color: '#FF6B35' },
    { selector: 'section > div:nth-child(4)', label: 'Character 3 (128×128px)', color: '#9D4EDD' },
    { selector: 'section > div:nth-child(5)', label: 'Character 4 (128×128px)', color: '#00D4FF' },
  ], '01-floating-characters-annotated.png', 0);

  // 2. Hero section overview
  console.log('\nHero Section:');
  await captureWithHighlight(page, 'section:first-of-type', '02-hero-section-annotated.png', 'HERO SECTION (Full Viewport)', 0);

  // 3. Story Cards
  console.log('\nStory Cards:');
  // Need to find the story cards section
  await page.evaluate(() => window.scrollTo(0, 900));
  await page.waitForTimeout(500);

  // Find story card icons (the emoji spans)
  await captureMultipleHighlights(page, [
    { selector: '.grid > div:nth-child(1) span.text-5xl', label: 'Icon 1: In The City', color: '#FFE135' },
    { selector: '.grid > div:nth-child(2) span.text-5xl', label: 'Icon 2: Original Art', color: '#FF6EB4' },
    { selector: '.grid > div:nth-child(3) span.text-5xl', label: 'Icon 3: Join Crew', color: '#00D4FF' },
  ], '03-story-cards-annotated.png', 900);

  // 4. Product Grid
  console.log('\nProduct Grid:');
  await page.evaluate(() => window.scrollTo(0, 1800));
  await page.waitForTimeout(1000);

  // Get actual product card dimensions
  const productCards = await page.$$('article');
  if (productCards.length > 0) {
    const firstCard = productCards[0];
    const cardBox = await firstCard.boundingBox();
    if (cardBox) {
      console.log(`  First product card: ${Math.round(cardBox.width)}×${Math.round(cardBox.height)}px`);
    }
  }

  // Capture product grid with highlights on first few products
  await captureMultipleHighlights(page, [
    { selector: 'article:nth-of-type(1)', label: 'HERO Product', color: '#FF3B3B' },
    { selector: 'article:nth-of-type(2)', label: 'Standard', color: '#00D4FF' },
    { selector: 'article:nth-of-type(3)', label: 'Standard', color: '#00D4FF' },
  ], '04-products-annotated.png', 1600);

  // 5. World Section - character area
  console.log('\nWorld Section:');
  await page.evaluate(() => window.scrollTo(0, 2800));
  await page.waitForTimeout(1000);

  // Find the character display area (the gradient div with the bunny emoji)
  await captureWithHighlight(
    page,
    'section.bg-black .aspect-square',
    '05-world-character-annotated.png',
    'Character Display Area (~400×400px)',
    2800
  );

  // 6. Footer
  console.log('\nFooter:');
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight - 900));
  await page.waitForTimeout(500);
  await captureWithHighlight(page, 'footer', '06-footer-annotated.png', 'Footer Section', null);

  // 7. Header Logo
  console.log('\nHeader Logo:');
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
  await page.screenshot({
    path: path.join(OUTPUT_DIR, '07-header-logo-annotated.png'),
    clip: { x: 0, y: 0, width: 1440, height: 100 }
  });

  // Add highlight to logo area
  await page.evaluate(() => {
    const logo = document.querySelector('header a');
    if (logo) {
      const box = logo.getBoundingClientRect();
      const highlight = document.createElement('div');
      highlight.className = 'playwright-highlight';
      highlight.style.cssText = `
        position: fixed;
        top: ${box.y}px;
        left: ${box.x}px;
        width: ${box.width}px;
        height: ${box.height}px;
        border: 3px dashed #FF3B3B;
        background: rgba(255, 59, 59, 0.15);
        pointer-events: none;
        z-index: 99999;
      `;
      const label = document.createElement('div');
      label.style.cssText = `
        position: absolute;
        top: -24px;
        left: 0;
        background: #FF3B3B;
        color: white;
        padding: 3px 6px;
        font-size: 10px;
        font-weight: bold;
        font-family: Arial;
      `;
      label.textContent = 'Logo Area';
      highlight.appendChild(label);
      document.body.appendChild(highlight);
    }
  });
  await page.screenshot({
    path: path.join(OUTPUT_DIR, '07-header-logo-annotated.png'),
    clip: { x: 0, y: 0, width: 600, height: 100 }
  });
  console.log('  ✓ 07-header-logo-annotated.png');

  // ==================== STORY PAGE ====================
  console.log('\n' + '='.repeat(60));
  console.log('\n📸 STORY PAGE\n');
  await page.goto('https://bunnykitty.vercel.app/story', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  // Character profiles
  console.log('Character Profiles:');
  await page.evaluate(() => window.scrollTo(0, 1500));
  await page.waitForTimeout(1000);

  // Find character cards
  await captureMultipleHighlights(page, [
    { selector: '.grid.sm\\:grid-cols-2 > div:nth-child(1)', label: 'BunnyKitty (400×400)', color: '#FF6EB4' },
    { selector: '.grid.sm\\:grid-cols-2 > div:nth-child(2)', label: 'NightOwl (400×400)', color: '#9D4EDD' },
    { selector: '.grid.sm\\:grid-cols-2 > div:nth-child(3)', label: 'StreetPup (400×400)', color: '#00D4FF' },
    { selector: '.grid.sm\\:grid-cols-2 > div:nth-child(4)', label: 'GlowBear (400×400)', color: '#FFE135' },
  ], '08-character-profiles-annotated.png', 1500);

  // ==================== ABOUT PAGE ====================
  console.log('\n' + '='.repeat(60));
  console.log('\n📸 ABOUT PAGE\n');
  await page.goto('https://bunnykitty.vercel.app/about', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  // Artist portrait
  console.log('Artist Portrait:');
  await captureWithHighlight(
    page,
    '.w-80.h-80', // The portrait container
    '09-artist-portrait-annotated.png',
    'Artist Portrait (320×320px circle)',
    0
  );

  // ==================== LOOKBOOK PAGE ====================
  console.log('\n' + '='.repeat(60));
  console.log('\n📸 LOOKBOOK PAGE\n');
  await page.goto('https://bunnykitty.vercel.app/lookbook', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  // Gallery
  console.log('Gallery:');
  await page.evaluate(() => window.scrollTo(0, 400));
  await page.waitForTimeout(500);

  // Highlight a few gallery items to show different aspect ratios
  await captureMultipleHighlights(page, [
    { selector: '.columns-1 > div:nth-child(1) > div', label: 'Portrait (3:4)', color: '#FF3B3B' },
    { selector: '.columns-1 > div:nth-child(2) > div', label: 'Landscape (4:3)', color: '#00D4FF' },
    { selector: '.columns-1 > div:nth-child(3) > div', label: 'Square (1:1)', color: '#39FF14' },
  ], '10-gallery-annotated.png', 400);

  // ==================== SHOP PAGE ====================
  console.log('\n' + '='.repeat(60));
  console.log('\n📸 SHOP PAGE\n');
  await page.goto('https://bunnykitty.vercel.app/shop', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  // Get actual product dimensions
  console.log('Product Dimensions:');
  const shopProducts = await page.$$('article');
  for (let i = 0; i < Math.min(3, shopProducts.length); i++) {
    const card = shopProducts[i];
    const box = await card.boundingBox();
    const imageDiv = await card.$('div[class*="h-"]');
    const imageBox = imageDiv ? await imageDiv.boundingBox() : null;
    if (box && imageBox) {
      console.log(`  Product ${i + 1}: Card ${Math.round(box.width)}×${Math.round(box.height)}px, Image area: ${Math.round(imageBox.width)}×${Math.round(imageBox.height)}px`);
    }
  }

  await page.screenshot({
    path: path.join(OUTPUT_DIR, '11-shop-products-annotated.png'),
    clip: { x: 0, y: 0, width: 1440, height: 900 }
  });
  console.log('  ✓ 11-shop-products-annotated.png');

  // ==================== SUMMARY ====================
  console.log('\n' + '='.repeat(60));
  console.log('\n📊 ACTUAL DIMENSIONS FROM LIVE SITE:\n');

  // Measure actual elements
  await page.goto('https://bunnykitty.vercel.app', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Floating character
  const char = await page.$('section > div:nth-child(2)');
  if (char) {
    const box = await char.boundingBox();
    console.log(`Floating Character: ${Math.round(box.width)}×${Math.round(box.height)}px display`);
    console.log(`  → Recommend: ${Math.round(box.width * 4)}×${Math.round(box.height * 4)}px source (4x for quality)\n`);
  }

  // Product cards
  await page.evaluate(() => window.scrollTo(0, 1600));
  await page.waitForTimeout(500);

  const products = await page.$$('article');
  if (products.length > 0) {
    for (let i = 0; i < Math.min(4, products.length); i++) {
      const prod = products[i];
      const box = await prod.boundingBox();
      const imgContainer = await prod.$('div[class*="h-"]');
      const imgBox = imgContainer ? await imgContainer.boundingBox() : null;

      if (imgBox) {
        console.log(`Product ${i + 1} image area: ${Math.round(imgBox.width)}×${Math.round(imgBox.height)}px display`);
        console.log(`  → Recommend: ${Math.round(imgBox.width * 2)}×${Math.round(imgBox.height * 2)}px source (2x retina)\n`);
      }
    }
  }

  await browser.close();

  console.log('='.repeat(60));
  console.log('\n✅ Annotated screenshots complete!');
  console.log(`📁 Saved to: ${OUTPUT_DIR}\n`);
})();
