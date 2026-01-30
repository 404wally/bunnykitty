const { chromium } = require('playwright');
const path = require('path');

const OUTPUT_DIR = '/Users/wallyvu/Desktop/BunnyKitty Website/04-Content/asset-screenshots';

async function addHighlight(page, box, label, color = '#FF3B3B') {
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
      color: ${color === '#FFE135' || color === '#39FF14' || color === '#00D4FF' ? 'black' : 'white'};
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
}

async function clearHighlights(page) {
  await page.evaluate(() => {
    document.querySelectorAll('.playwright-highlight').forEach(el => el.remove());
  });
}

async function getBox(page, selector) {
  const el = await page.$(selector);
  if (!el) return null;
  return await el.boundingBox();
}

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    httpCredentials: { username: '', password: 'REALLYrilla2026' },
    viewport: { width: 1440, height: 900 }
  });

  const page = await context.newPage();
  console.log('Capturing FINAL asset screenshots...\n');

  // ==================== HOMEPAGE ====================
  await page.goto('https://bunnykitty.vercel.app', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  // 1. FLOATING CHARACTERS (all 4)
  console.log('1. Floating Characters (all 4)...');
  await clearHighlights(page);

  // Get all 4 floating character divs
  const charDivs = await page.$$('section.bg-pop-yellow > div.absolute');
  const charColors = ['#FF3B3B', '#FF6B35', '#9D4EDD', '#00D4FF'];
  let charCount = 0;

  for (const div of charDivs) {
    const box = await div.boundingBox();
    if (box && charCount < 4) {
      await addHighlight(page, box, `Character ${charCount + 1}: Rec 600×600px`, charColors[charCount]);
      charCount++;
    }
  }
  console.log(`  Found ${charCount} floating characters`);

  await page.screenshot({
    path: path.join(OUTPUT_DIR, '01-floating-characters.png'),
    clip: { x: 0, y: 0, width: 1440, height: 900 }
  });
  console.log('  ✓ 01-floating-characters.png');

  // 1B. HERO BACKGROUND (the yellow area behind everything)
  console.log('1B. Hero Background...');
  await clearHighlights(page);

  const heroSection = await page.$('section.bg-pop-yellow');
  if (heroSection) {
    const box = await heroSection.boundingBox();
    if (box) {
      // Highlight the full hero section as the background area
      await addHighlight(page, { ...box, height: 900 }, 'Hero Background: Rec 1920×1080px (or 3840×2160 @2x)', '#FFE135');
    }
  }

  await page.screenshot({
    path: path.join(OUTPUT_DIR, '01b-hero-background.png'),
    clip: { x: 0, y: 0, width: 1440, height: 900 }
  });
  console.log('  ✓ 01b-hero-background.png');

  // 2. PRODUCT IMAGE - HERO
  console.log('2. Product Image - HERO...');
  await clearHighlights(page);
  await page.evaluate(() => window.scrollTo(0, 1600));
  await page.waitForTimeout(1000);

  // Find hero product's image container specifically
  const heroProduct = await page.$('div.col-span-2.row-span-2 article');
  if (heroProduct) {
    const imgContainer = await heroProduct.$('div.relative.overflow-hidden');
    if (imgContainer) {
      const box = await imgContainer.boundingBox();
      if (box) {
        await addHighlight(page, box, 'HERO Product Image: Rec 1200×800px', '#FF3B3B');
        console.log(`  Hero image: ${Math.round(box.width)}×${Math.round(box.height)}px`);
      }
    }
  }

  await page.screenshot({
    path: path.join(OUTPUT_DIR, '02-product-hero-image.png'),
    clip: { x: 0, y: 0, width: 1440, height: 900 }
  });
  console.log('  ✓ 02-product-hero-image.png');

  // 3. PRODUCT IMAGE - FEATURED (wide)
  console.log('3. Product Image - FEATURED...');
  await clearHighlights(page);

  // Find featured product (col-span-2 but NOT row-span-2)
  const featuredProducts = await page.$$('div.col-span-2:not(.row-span-2) article');
  for (const prod of featuredProducts) {
    const imgContainer = await prod.$('div.relative.overflow-hidden');
    if (imgContainer) {
      const box = await imgContainer.boundingBox();
      if (box && box.y > 0 && box.y < 800) {
        await addHighlight(page, box, 'FEATURED Product Image: Rec 1200×520px', '#00D4FF');
        console.log(`  Featured image: ${Math.round(box.width)}×${Math.round(box.height)}px`);
        break;
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
  const standardProducts = await page.$$('div.col-span-1 article');
  let stdCount = 0;
  const stdColors = ['#39FF14', '#FF6EB4'];

  for (const prod of standardProducts) {
    if (stdCount >= 2) break;
    const imgContainer = await prod.$('div.relative.overflow-hidden');
    if (imgContainer) {
      const box = await imgContainer.boundingBox();
      if (box && box.y > 0 && box.y < 800) {
        await addHighlight(page, box, 'STANDARD Product Image: Rec 560×450px', stdColors[stdCount]);
        console.log(`  Standard image ${stdCount + 1}: ${Math.round(box.width)}×${Math.round(box.height)}px`);
        stdCount++;
      }
    }
  }

  await page.screenshot({
    path: path.join(OUTPUT_DIR, '04-product-standard-image.png'),
    clip: { x: 0, y: 0, width: 1440, height: 900 }
  });
  console.log('  ✓ 04-product-standard-image.png');

  // 5. WORLD SECTION - Main Character (correct section!)
  console.log('5. World Section Character...');
  await clearHighlights(page);

  // Find the world section (black background section with the quote)
  await page.evaluate(() => {
    const sections = document.querySelectorAll('section');
    for (const section of sections) {
      if (section.classList.contains('bg-black') || getComputedStyle(section).backgroundColor === 'rgb(0, 0, 0)') {
        section.scrollIntoView({ block: 'center' });
        break;
      }
    }
  });
  await page.waitForTimeout(1000);

  // Find the character display area (aspect-square with the bunny)
  const worldCharacter = await page.$('section.bg-black .aspect-square');
  if (worldCharacter) {
    // Get the inner frame that has the character
    const innerFrame = await worldCharacter.$('div.relative.w-full.h-full');
    if (innerFrame) {
      const box = await innerFrame.boundingBox();
      if (box) {
        await addHighlight(page, box, 'World Section Character: Rec 720×720px', '#FF3B3B');
        console.log(`  World character: ${Math.round(box.width)}×${Math.round(box.height)}px`);
      }
    }
  } else {
    console.log('  ⚠️ World section not found, trying alternative...');
    // Scroll to where the world section should be
    await page.evaluate(() => window.scrollTo(0, 2800));
    await page.waitForTimeout(500);
  }

  await page.screenshot({
    path: path.join(OUTPUT_DIR, '05-world-character.png'),
    clip: { x: 0, y: 0, width: 1440, height: 900 }
  });
  console.log('  ✓ 05-world-character.png');

  // 6A. STORY CARD ICONS (with proper outlines)
  console.log('6A. Story Card Icons...');
  await clearHighlights(page);
  await page.evaluate(() => window.scrollTo(0, 850));
  await page.waitForTimeout(1000);

  // Find the icon spans inside story cards
  const storyCards = await page.$$('section .grid > div');
  const iconColors = ['#FFE135', '#FF6EB4', '#00D4FF'];
  const iconLabels = ['Icon "In The City": Rec 256×256px', 'Icon "Original Art": Rec 256×256px', 'Icon "Join Crew": Rec 256×256px'];
  let iconCount = 0;

  for (const card of storyCards) {
    if (iconCount >= 3) break;
    const iconSpan = await card.$('span.text-5xl, span.text-6xl');
    if (iconSpan) {
      const box = await iconSpan.boundingBox();
      if (box && box.y > 0 && box.y < 900) {
        await addHighlight(page, box, iconLabels[iconCount], iconColors[iconCount]);
        iconCount++;
      }
    }
  }

  await page.screenshot({
    path: path.join(OUTPUT_DIR, '06a-story-card-icons.png'),
    clip: { x: 0, y: 0, width: 1440, height: 900 }
  });
  console.log('  ✓ 06a-story-card-icons.png');

  // 6B. STORY CARD BACKGROUNDS (the colored cards themselves)
  console.log('6B. Story Card Backgrounds...');
  await clearHighlights(page);

  const cardColors = ['#FFE135', '#FF6EB4', '#00D4FF'];
  const cardLabels = ['Yellow Card BG: Rec 800×600px', 'Pink Card BG: Rec 800×600px', 'Cyan Card BG: Rec 800×600px'];
  let cardCount = 0;

  for (const cardDiv of storyCards) {
    if (cardCount >= 3) break;
    // Find the colored inner card
    const innerCard = await cardDiv.$('div[class*="bg-pop-"]');
    if (innerCard) {
      const box = await innerCard.boundingBox();
      if (box && box.y > 0 && box.y < 900) {
        await addHighlight(page, box, cardLabels[cardCount], cardColors[cardCount]);
        cardCount++;
      }
    }
  }

  await page.screenshot({
    path: path.join(OUTPUT_DIR, '06b-story-card-backgrounds.png'),
    clip: { x: 0, y: 0, width: 1440, height: 900 }
  });
  console.log('  ✓ 06b-story-card-backgrounds.png');

  // ==================== STORY PAGE ====================
  // 7. CHARACTER PROFILES (updated to 1:1 / 800×800)
  console.log('7. Character Profiles (1:1 square)...');
  await page.goto('https://bunnykitty.vercel.app/story', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  await clearHighlights(page);

  // Scroll to character section
  await page.evaluate(() => {
    const heading = Array.from(document.querySelectorAll('h2')).find(h => h.textContent.includes('CREW'));
    if (heading) heading.scrollIntoView({ block: 'start' });
  });
  await page.waitForTimeout(500);

  const charCards = await page.$$('section.bg-black .grid > div');
  const profileColors = ['#FF6EB4', '#9D4EDD', '#00D4FF', '#FFE135'];
  const profileNames = ['BunnyKitty: Rec 800×800px', 'NightOwl: Rec 800×800px', 'StreetPup: Rec 800×800px', 'GlowBear: Rec 800×800px'];
  let profileCount = 0;

  for (const card of charCards) {
    if (profileCount >= 4) break;
    const emojiSpan = await card.$('.text-6xl');
    if (emojiSpan) {
      const box = await emojiSpan.boundingBox();
      if (box) {
        // Expand the box to show a square area for the character art
        const squareBox = {
          x: box.x - 20,
          y: box.y - 10,
          width: box.width + 40,
          height: box.width + 40  // Make it square
        };
        await addHighlight(page, squareBox, profileNames[profileCount], profileColors[profileCount]);
        profileCount++;
      }
    }
  }

  await page.screenshot({
    path: path.join(OUTPUT_DIR, '07-character-profiles.png'),
    clip: { x: 0, y: 0, width: 1440, height: 900 }
  });
  console.log('  ✓ 07-character-profiles.png');

  // ==================== ABOUT PAGE ====================
  // 8. ARTIST PORTRAIT
  console.log('8. Artist Portrait...');
  await page.goto('https://bunnykitty.vercel.app/about', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  await clearHighlights(page);

  const portrait = await page.$('.w-80.h-80');
  if (portrait) {
    const box = await portrait.boundingBox();
    if (box) {
      await addHighlight(page, box, 'Artist Portrait: Rec 640×640px (circle crop)', '#FF3B3B');
    }
  }

  await page.screenshot({
    path: path.join(OUTPUT_DIR, '08-artist-portrait.png'),
    clip: { x: 0, y: 0, width: 1440, height: 900 }
  });
  console.log('  ✓ 08-artist-portrait.png');

  // ==================== LOOKBOOK PAGE ====================
  // 9. GALLERY IMAGES (all 3 aspect ratios highlighted)
  console.log('9. Gallery Images (all 3 ratios)...');
  await page.goto('https://bunnykitty.vercel.app/lookbook', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  await clearHighlights(page);
  await page.evaluate(() => window.scrollTo(0, 400));
  await page.waitForTimeout(500);

  // Find gallery items
  const galleryItems = await page.$$('.columns-1 > div');
  const galleryLabels = [
    { label: 'Portrait: Rec 800×1050px', color: '#FF3B3B' },
    { label: 'Landscape: Rec 800×600px', color: '#00D4FF' },
    { label: 'Square: Rec 800×800px', color: '#39FF14' },
  ];

  for (let i = 0; i < Math.min(3, galleryItems.length); i++) {
    const item = galleryItems[i];
    const innerDiv = await item.$('div[class*="aspect-"]');
    if (innerDiv) {
      const box = await innerDiv.boundingBox();
      if (box) {
        await addHighlight(page, box, galleryLabels[i].label, galleryLabels[i].color);
      }
    }
  }

  await page.screenshot({
    path: path.join(OUTPUT_DIR, '09-gallery-images.png'),
    clip: { x: 0, y: 0, width: 1440, height: 900 }
  });
  console.log('  ✓ 09-gallery-images.png');

  // ==================== BRAND ====================
  // 10. HEADER LOGO
  console.log('10. Header Logo...');
  await page.goto('https://bunnykitty.vercel.app', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  await clearHighlights(page);

  const logo = await page.$('header a');
  if (logo) {
    const box = await logo.boundingBox();
    if (box) {
      await addHighlight(page, box, 'Logo: Rec 800×200px (full) / 512×512px (icon)', '#FF3B3B');
    }
  }

  await page.screenshot({
    path: path.join(OUTPUT_DIR, '10-header-logo.png'),
    clip: { x: 0, y: 0, width: 800, height: 120 }
  });
  console.log('  ✓ 10-header-logo.png');

  // 11. OG / SOCIAL IMAGE (mockup)
  console.log('11. Social Share Image...');
  await clearHighlights(page);

  await page.screenshot({
    path: path.join(OUTPUT_DIR, '11-social-og-reference.png'),
    clip: { x: 0, y: 0, width: 1200, height: 630 }
  });
  console.log('  ✓ 11-social-og-reference.png');

  await browser.close();
  console.log('\n✅ All FINAL screenshots captured!');
})();
