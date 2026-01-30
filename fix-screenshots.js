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
  }, { box, label, color });
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

  console.log('Fixing screenshots with missing highlights...\n');

  // ========== FIX #4: Product Standard ==========
  console.log('4. Product Image - STANDARD...');
  await page.goto('https://bunnykitty.vercel.app', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  await page.evaluate(() => window.scrollTo(0, 1600));
  await page.waitForTimeout(1000);

  // Find standard product cards (3rd and 4th cards which are standard size)
  const standardCards = await page.$$('article');
  if (standardCards.length >= 3) {
    const card = standardCards[2]; // Third card (standard)
    const imageContainer = await card.$('div.relative.overflow-hidden');
    if (imageContainer) {
      const imgBox = await imageContainer.boundingBox();
      if (imgBox) {
        await addHighlight(page, imgBox, 'STANDARD Image: Rec 560×450px', '#00D4FF');
        console.log(`  Standard image: ${Math.round(imgBox.width)}×${Math.round(imgBox.height)}px`);
      }
    }
  }

  await page.screenshot({
    path: path.join(OUTPUT_DIR, '04-product-standard-image.png'),
    clip: { x: 0, y: 0, width: 1440, height: 900 }
  });
  console.log('  ✓ 04-product-standard-image.png\n');
  await clearHighlights(page);

  // ========== FIX #6a: Story Card Icons ==========
  console.log('6a. Story Card Icons...');
  await page.evaluate(() => window.scrollTo(0, 750));
  await page.waitForTimeout(500);

  // Find the story cards container
  const storyCards = await page.$$('section:nth-of-type(3) > div > div');

  // Try to find the emoji/icon spans within cards
  const iconSelectors = [
    'section:nth-of-type(3) .text-5xl',
    '.grid > div span.text-5xl',
    'div[class*="bg-yellow"] span.text-5xl',
    'div[class*="bg-pink"] span.text-5xl',
    'div[class*="bg-cyan"] span.text-5xl'
  ];

  // Find all cards with colored backgrounds
  const yellowCard = await page.$('div[class*="bg-yellow-300"]');
  const pinkCard = await page.$('div[class*="bg-pink-300"]');
  const cyanCard = await page.$('div[class*="bg-cyan-300"]');

  const cards = [
    { card: yellowCard, label: 'Icon "In The City": Rec 256×256px', color: '#FFE135' },
    { card: pinkCard, label: 'Icon "Original Art": Rec 256×256px', color: '#FF6EB4' },
    { card: cyanCard, label: 'Icon "Join Crew": Rec 256×256px', color: '#00D4FF' }
  ];

  for (const { card, label, color } of cards) {
    if (card) {
      // Find the icon/emoji inside the card
      const icon = await card.$('span.text-5xl');
      if (icon) {
        const iconBox = await icon.boundingBox();
        if (iconBox) {
          // Make the highlight box a bit larger to show the icon area
          const expandedBox = {
            x: iconBox.x - 10,
            y: iconBox.y - 10,
            width: iconBox.width + 20,
            height: iconBox.height + 20
          };
          await addHighlight(page, expandedBox, label, color);
          console.log(`  ${label.split(':')[0]}: ${Math.round(iconBox.width)}×${Math.round(iconBox.height)}px`);
        }
      }
    }
  }

  await page.screenshot({
    path: path.join(OUTPUT_DIR, '06a-story-card-icons.png'),
    clip: { x: 0, y: 0, width: 1440, height: 900 }
  });
  console.log('  ✓ 06a-story-card-icons.png\n');
  await clearHighlights(page);

  // ========== FIX #6b: Story Card Backgrounds ==========
  console.log('6b. Story Card Backgrounds...');

  const bgCards = [
    { card: yellowCard, label: 'Yellow Card BG: Rec 800×400px', color: '#FFE135' },
    { card: pinkCard, label: 'Pink Card BG: Rec 800×400px', color: '#FF6EB4' },
    { card: cyanCard, label: 'Cyan Card BG: Rec 800×400px', color: '#00D4FF' }
  ];

  for (const { card, label, color } of bgCards) {
    if (card) {
      const cardBox = await card.boundingBox();
      if (cardBox) {
        await addHighlight(page, cardBox, label, color);
        console.log(`  ${label.split(':')[0]}: ${Math.round(cardBox.width)}×${Math.round(cardBox.height)}px`);
      }
    }
  }

  await page.screenshot({
    path: path.join(OUTPUT_DIR, '06b-story-card-backgrounds.png'),
    clip: { x: 0, y: 0, width: 1440, height: 900 }
  });
  console.log('  ✓ 06b-story-card-backgrounds.png\n');
  await clearHighlights(page);

  // ========== FIX #7: Character Profiles ==========
  console.log('7. Character Profiles (exact dimensions)...');
  await page.goto('https://bunnykitty.vercel.app/story', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  await page.evaluate(() => window.scrollTo(0, 1400));
  await page.waitForTimeout(1000);

  // Find the character profile cards - look for the image/emoji area specifically
  const profileCards = await page.$$('div[class*="grid"] > div');
  const profileColors = ['#FF6EB4', '#9D4EDD', '#00D4FF', '#FFE135'];
  const profileNames = ['BunnyKitty', 'NightOwl', 'StreetPup', 'GlowBear'];

  let profileCount = 0;
  for (let i = 0; i < profileCards.length && profileCount < 4; i++) {
    const card = profileCards[i];
    const cardBox = await card.boundingBox();

    // Check if this looks like a character card (has reasonable size)
    if (cardBox && cardBox.width > 200 && cardBox.height > 200) {
      // Find the image/avatar area within the card (the top portion)
      const avatarArea = await card.$('div[class*="h-48"], div[class*="aspect-square"], span.text-6xl');

      if (avatarArea) {
        const avatarBox = await avatarArea.boundingBox();
        if (avatarBox) {
          // Create a square box for the character area
          const size = Math.max(avatarBox.width, avatarBox.height);
          const squareBox = {
            x: avatarBox.x,
            y: avatarBox.y,
            width: size,
            height: size
          };
          await addHighlight(page, squareBox, `${profileNames[profileCount]}: Rec 800×800px`, profileColors[profileCount]);
          console.log(`  ${profileNames[profileCount]}: ${Math.round(avatarBox.width)}×${Math.round(avatarBox.height)}px`);
          profileCount++;
        }
      } else {
        // Fallback: highlight top portion of card as avatar area
        const avatarBox = {
          x: cardBox.x,
          y: cardBox.y,
          width: cardBox.width,
          height: cardBox.width // Make it square
        };
        await addHighlight(page, avatarBox, `${profileNames[profileCount]}: Rec 800×800px`, profileColors[profileCount]);
        console.log(`  ${profileNames[profileCount]}: ${Math.round(cardBox.width)}×${Math.round(cardBox.width)}px (card-based)`);
        profileCount++;
      }
    }
  }

  await page.screenshot({
    path: path.join(OUTPUT_DIR, '07-character-profiles.png'),
    clip: { x: 0, y: 0, width: 1440, height: 900 }
  });
  console.log('  ✓ 07-character-profiles.png\n');
  await clearHighlights(page);

  // ========== FIX #9: Gallery Square Image ==========
  console.log('9. Gallery Images (with square highlight)...');
  await page.goto('https://bunnykitty.vercel.app/lookbook', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  await page.evaluate(() => window.scrollTo(0, 300));
  await page.waitForTimeout(500);

  // Find gallery items - they should be in a masonry/columns layout
  const galleryItems = await page.$$('.columns-1 > div > div, .grid > div, main div[class*="aspect-"]');

  let portraitFound = false, landscapeFound = false, squareFound = false;

  for (const item of galleryItems) {
    const box = await item.boundingBox();
    if (!box || box.width < 100 || box.height < 100) continue;

    const ratio = box.width / box.height;

    // Portrait (taller than wide) - ratio < 0.9
    if (!portraitFound && ratio < 0.9 && ratio > 0.5) {
      await addHighlight(page, box, 'Portrait (3:4): Rec 900×1200px', '#FF3B3B');
      console.log(`  Portrait: ${Math.round(box.width)}×${Math.round(box.height)}px (ratio: ${ratio.toFixed(2)})`);
      portraitFound = true;
    }
    // Landscape (wider than tall) - ratio > 1.1
    else if (!landscapeFound && ratio > 1.1 && ratio < 2) {
      await addHighlight(page, box, 'Landscape (4:3): Rec 1200×900px', '#00D4FF');
      console.log(`  Landscape: ${Math.round(box.width)}×${Math.round(box.height)}px (ratio: ${ratio.toFixed(2)})`);
      landscapeFound = true;
    }
    // Square (roughly 1:1) - ratio between 0.9 and 1.1
    else if (!squareFound && ratio >= 0.9 && ratio <= 1.1) {
      await addHighlight(page, box, 'Square (1:1): Rec 1000×1000px', '#39FF14');
      console.log(`  Square: ${Math.round(box.width)}×${Math.round(box.height)}px (ratio: ${ratio.toFixed(2)})`);
      squareFound = true;
    }

    if (portraitFound && landscapeFound && squareFound) break;
  }

  // If square not found, try different selectors
  if (!squareFound) {
    console.log('  Looking for square images with different selectors...');
    const allImages = await page.$$('img, div[style*="background-image"]');
    for (const img of allImages) {
      const box = await img.boundingBox();
      if (!box || box.width < 100) continue;
      const ratio = box.width / box.height;
      if (ratio >= 0.9 && ratio <= 1.1) {
        await addHighlight(page, box, 'Square (1:1): Rec 1000×1000px', '#39FF14');
        console.log(`  Square found: ${Math.round(box.width)}×${Math.round(box.height)}px`);
        squareFound = true;
        break;
      }
    }
  }

  await page.screenshot({
    path: path.join(OUTPUT_DIR, '09-gallery-images.png'),
    clip: { x: 0, y: 0, width: 1440, height: 900 }
  });
  console.log('  ✓ 09-gallery-images.png\n');

  await browser.close();
  console.log('✅ All screenshots fixed!');
})();
