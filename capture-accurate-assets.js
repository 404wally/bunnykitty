const { chromium } = require('playwright');
const path = require('path');

const OUTPUT_DIR = '/Users/wallyvu/Desktop/BunnyKitty Website/04-Content/asset-screenshots';

async function addHighlight(page, selector, label, color = '#FF3B3B') {
  const element = await page.$(selector);
  if (!element) {
    console.log(`  ⚠️ Not found: ${selector}`);
    return null;
  }

  const box = await element.boundingBox();
  if (!box) return null;

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
      top: -26px;
      left: 0;
      background: ${color};
      color: white;
      padding: 4px 10px;
      font-size: 11px;
      font-weight: bold;
      font-family: Arial, sans-serif;
      white-space: nowrap;
      border: 2px solid #000;
    `;
    labelEl.textContent = label;
    highlight.appendChild(labelEl);
    document.body.appendChild(highlight);
  }, { box, label, color });

  return box;
}

function clearHighlights(page) {
  return page.evaluate(() => {
    document.querySelectorAll('.playwright-highlight').forEach(el => el.remove());
  });
}

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    httpCredentials: { username: '', password: 'REALLYrilla2026' },
    viewport: { width: 1440, height: 900 }
  });

  const page = await context.newPage();

  console.log('Capturing ACCURATE asset screenshots...\n');

  // ==================== HOMEPAGE ====================
  await page.goto('https://bunnykitty.vercel.app', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  // 1. FLOATING CHARACTERS - This was good, keeping same approach
  console.log('1. Floating Characters...');
  await clearHighlights(page);

  // Find the actual floating character divs (they contain the Image)
  const charSelectors = [
    { sel: 'section > div.absolute:nth-of-type(1)', label: 'Rec: 600×600px', color: '#FF3B3B' },
    { sel: 'section > div.absolute:nth-of-type(2)', label: 'Rec: 600×600px', color: '#FF6B35' },
    { sel: 'section > div.absolute:nth-of-type(3)', label: 'Rec: 600×600px', color: '#9D4EDD' },
    { sel: 'section > div.absolute:nth-of-type(4)', label: 'Rec: 600×600px', color: '#00D4FF' },
  ];

  for (const { sel, label, color } of charSelectors) {
    await addHighlight(page, sel, label, color);
  }

  await page.screenshot({
    path: path.join(OUTPUT_DIR, '01-floating-characters.png'),
    clip: { x: 0, y: 0, width: 1440, height: 900 }
  });
  console.log('  ✓ 01-floating-characters.png');

  // 2. PRODUCT IMAGE - HERO SIZE (only the image area, not the text below)
  console.log('2. Product Image - HERO...');
  await clearHighlights(page);
  await page.evaluate(() => window.scrollTo(0, 1600));
  await page.waitForTimeout(1000);

  // Find the image container inside the first article (hero product)
  // The image container has the class with h-80 or h-[400px]
  const heroImageContainer = await page.$('article:first-of-type div[class*="h-80"], article:first-of-type div[class*="h-[400px]"]');
  if (heroImageContainer) {
    const box = await heroImageContainer.boundingBox();
    if (box) {
      await page.evaluate(({ box }) => {
        const highlight = document.createElement('div');
        highlight.className = 'playwright-highlight';
        highlight.style.cssText = `
          position: fixed;
          top: ${box.y}px;
          left: ${box.x}px;
          width: ${box.width}px;
          height: ${box.height}px;
          border: 4px dashed #FF3B3B;
          background: #FF3B3B22;
          pointer-events: none;
          z-index: 99999;
        `;
        const label = document.createElement('div');
        label.style.cssText = `
          position: absolute;
          top: -26px;
          left: 0;
          background: #FF3B3B;
          color: white;
          padding: 4px 10px;
          font-size: 11px;
          font-weight: bold;
          font-family: Arial;
          border: 2px solid #000;
        `;
        label.textContent = 'HERO Image: Rec 1200×800px';
        highlight.appendChild(label);
        document.body.appendChild(highlight);
      }, { box });
    }
  }

  await page.screenshot({
    path: path.join(OUTPUT_DIR, '02-product-hero-image.png'),
    clip: { x: 0, y: 0, width: 1440, height: 900 }
  });
  console.log('  ✓ 02-product-hero-image.png');

  // 3. PRODUCT IMAGE - FEATURED (wide cards)
  console.log('3. Product Image - FEATURED...');
  await clearHighlights(page);

  // Find featured products (col-span-2 but not row-span-2)
  const allArticles = await page.$$('article');
  for (const article of allArticles) {
    const classList = await article.evaluate(el => el.parentElement?.className || '');
    if (classList.includes('col-span-2') && !classList.includes('row-span-2')) {
      const imgContainer = await article.$('div[class*="h-48"], div[class*="h-64"]');
      if (imgContainer) {
        const box = await imgContainer.boundingBox();
        if (box && box.y > 0 && box.y < 900) {
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
              background: #00D4FF22;
              pointer-events: none;
              z-index: 99999;
            `;
            const label = document.createElement('div');
            label.style.cssText = `
              position: absolute;
              top: -26px;
              left: 0;
              background: #00D4FF;
              color: black;
              padding: 4px 10px;
              font-size: 11px;
              font-weight: bold;
              font-family: Arial;
              border: 2px solid #000;
            `;
            label.textContent = 'FEATURED Image: Rec 1200×520px';
            highlight.appendChild(label);
            document.body.appendChild(highlight);
          }, { box });
          break;
        }
      }
    }
  }

  await page.screenshot({
    path: path.join(OUTPUT_DIR, '03-product-featured-image.png'),
    clip: { x: 0, y: 0, width: 1440, height: 900 }
  });
  console.log('  ✓ 03-product-featured-image.png');

  // 4. PRODUCT IMAGE - STANDARD
  console.log('4. Product Image - STANDARD...');
  await clearHighlights(page);

  // Find standard products (col-span-1)
  let standardCount = 0;
  for (const article of allArticles) {
    const classList = await article.evaluate(el => el.parentElement?.className || '');
    if (classList.includes('col-span-1') && standardCount < 2) {
      const imgContainer = await article.$('div[class*="h-48"], div[class*="h-56"]');
      if (imgContainer) {
        const box = await imgContainer.boundingBox();
        if (box && box.y > 0 && box.y < 900) {
          const colors = ['#39FF14', '#FF6EB4'];
          await page.evaluate(({ box, color, idx }) => {
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
            `;
            const label = document.createElement('div');
            label.style.cssText = `
              position: absolute;
              top: -26px;
              left: 0;
              background: ${color};
              color: black;
              padding: 4px 10px;
              font-size: 11px;
              font-weight: bold;
              font-family: Arial;
              border: 2px solid #000;
            `;
            label.textContent = 'STANDARD Image: Rec 560×450px';
            highlight.appendChild(label);
            document.body.appendChild(highlight);
          }, { box, color: colors[standardCount], idx: standardCount });
          standardCount++;
        }
      }
    }
  }

  await page.screenshot({
    path: path.join(OUTPUT_DIR, '04-product-standard-image.png'),
    clip: { x: 0, y: 0, width: 1440, height: 900 }
  });
  console.log('  ✓ 04-product-standard-image.png');

  // 5. WORLD SECTION - Main Character
  console.log('5. World Section Character...');
  await clearHighlights(page);
  await page.evaluate(() => window.scrollTo(0, 2800));
  await page.waitForTimeout(1000);

  // Find the aspect-square div that contains the character
  await addHighlight(page, 'section.bg-black .aspect-square > div:last-child', 'Character Area: Rec 720×720px', '#FF3B3B');

  await page.screenshot({
    path: path.join(OUTPUT_DIR, '05-world-character.png'),
    clip: { x: 0, y: 0, width: 1440, height: 900 }
  });
  console.log('  ✓ 05-world-character.png');

  // 6. STORY CARDS - Icons (these are emoji spans, not square)
  console.log('6. Story Card Icons...');
  await clearHighlights(page);
  await page.evaluate(() => window.scrollTo(0, 900));
  await page.waitForTimeout(1000);

  // Find the emoji spans inside story cards
  const iconSpans = await page.$$('span.text-5xl, span.text-6xl');
  const colors6 = ['#FFE135', '#FF6EB4', '#00D4FF'];
  let iconIdx = 0;
  for (const span of iconSpans) {
    if (iconIdx >= 3) break;
    const box = await span.boundingBox();
    if (box && box.y > 0 && box.y < 900) {
      await page.evaluate(({ box, color, label }) => {
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
        `;
        const labelEl = document.createElement('div');
        labelEl.style.cssText = `
          position: absolute;
          top: -26px;
          left: 0;
          background: ${color};
          color: black;
          padding: 4px 10px;
          font-size: 11px;
          font-weight: bold;
          font-family: Arial;
          border: 2px solid #000;
        `;
        labelEl.textContent = label;
        highlight.appendChild(labelEl);
        document.body.appendChild(highlight);
      }, { box, color: colors6[iconIdx], label: 'Icon: Rec 256×256px' });
      iconIdx++;
    }
  }

  await page.screenshot({
    path: path.join(OUTPUT_DIR, '06-story-card-icons.png'),
    clip: { x: 0, y: 0, width: 1440, height: 900 }
  });
  console.log('  ✓ 06-story-card-icons.png');

  // ==================== STORY PAGE ====================
  console.log('7. Character Profiles...');
  await page.goto('https://bunnykitty.vercel.app/story', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  await clearHighlights(page);
  await page.evaluate(() => window.scrollTo(0, 1500));
  await page.waitForTimeout(1000);

  // Find character profile cards - highlight the emoji area (where the character art would go)
  const charEmojis = await page.$$('section.bg-black .text-6xl');
  const charColors = ['#FF6EB4', '#9D4EDD', '#00D4FF', '#FFE135'];
  const charNames = ['BunnyKitty', 'NightOwl', 'StreetPup', 'GlowBear'];
  let charIdx = 0;
  for (const emoji of charEmojis) {
    if (charIdx >= 4) break;
    const box = await emoji.boundingBox();
    if (box) {
      await page.evaluate(({ box, color, name }) => {
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
        `;
        const label = document.createElement('div');
        label.style.cssText = `
          position: absolute;
          top: -26px;
          left: 0;
          background: ${color};
          color: ${color === '#FFE135' ? 'black' : 'white'};
          padding: 4px 10px;
          font-size: 11px;
          font-weight: bold;
          font-family: Arial;
          border: 2px solid #000;
        `;
        label.textContent = `${name}: Rec 580×490px`;
        highlight.appendChild(label);
        document.body.appendChild(highlight);
      }, { box, color: charColors[charIdx], name: charNames[charIdx] });
      charIdx++;
    }
  }

  await page.screenshot({
    path: path.join(OUTPUT_DIR, '07-character-profiles.png'),
    clip: { x: 0, y: 0, width: 1440, height: 900 }
  });
  console.log('  ✓ 07-character-profiles.png');

  // ==================== ABOUT PAGE ====================
  console.log('8. Artist Portrait...');
  await page.goto('https://bunnykitty.vercel.app/about', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  await clearHighlights(page);

  // Find the circular portrait container
  await addHighlight(page, '.w-80.h-80', 'Artist Portrait: Rec 640×640px', '#FF3B3B');

  await page.screenshot({
    path: path.join(OUTPUT_DIR, '08-artist-portrait.png'),
    clip: { x: 0, y: 0, width: 1440, height: 900 }
  });
  console.log('  ✓ 08-artist-portrait.png');

  // ==================== LOOKBOOK PAGE ====================
  console.log('9. Gallery Images...');
  await page.goto('https://bunnykitty.vercel.app/lookbook', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  await clearHighlights(page);
  await page.evaluate(() => window.scrollTo(0, 400));
  await page.waitForTimeout(500);

  // Find gallery items and highlight a few with different aspect ratios
  const galleryItems = await page.$$('.columns-1 > div > div');
  const galleryData = [
    { label: 'Portrait: Rec 800×1050px', color: '#FF3B3B' },
    { label: 'Landscape: Rec 800×600px', color: '#00D4FF' },
    { label: 'Square: Rec 800×800px', color: '#39FF14' },
  ];

  for (let i = 0; i < Math.min(3, galleryItems.length); i++) {
    const box = await galleryItems[i].boundingBox();
    if (box) {
      await page.evaluate(({ box, data }) => {
        const highlight = document.createElement('div');
        highlight.className = 'playwright-highlight';
        highlight.style.cssText = `
          position: fixed;
          top: ${box.y}px;
          left: ${box.x}px;
          width: ${box.width}px;
          height: ${box.height}px;
          border: 4px dashed ${data.color};
          background: ${data.color}22;
          pointer-events: none;
          z-index: 99999;
        `;
        const label = document.createElement('div');
        label.style.cssText = `
          position: absolute;
          top: -26px;
          left: 0;
          background: ${data.color};
          color: ${data.color === '#39FF14' || data.color === '#00D4FF' ? 'black' : 'white'};
          padding: 4px 10px;
          font-size: 11px;
          font-weight: bold;
          font-family: Arial;
          border: 2px solid #000;
        `;
        label.textContent = data.label;
        highlight.appendChild(label);
        document.body.appendChild(highlight);
      }, { box, data: galleryData[i] });
    }
  }

  await page.screenshot({
    path: path.join(OUTPUT_DIR, '09-gallery-images.png'),
    clip: { x: 0, y: 0, width: 1440, height: 900 }
  });
  console.log('  ✓ 09-gallery-images.png');

  // ==================== BRAND - LOGO ====================
  console.log('10. Header Logo...');
  await page.goto('https://bunnykitty.vercel.app', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  await clearHighlights(page);

  await addHighlight(page, 'header a', 'Logo: Rec 800×200px (full) / 512×512px (icon)', '#FF3B3B');

  await page.screenshot({
    path: path.join(OUTPUT_DIR, '10-header-logo.png'),
    clip: { x: 0, y: 0, width: 800, height: 120 }
  });
  console.log('  ✓ 10-header-logo.png');

  await browser.close();
  console.log('\n✅ All accurate screenshots captured!');
})();
