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

  console.log('Capturing Hero Background asset...\n');

  await page.goto('https://bunnykitty.vercel.app', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  // Get the hero section dimensions
  const heroSection = await page.$('section:first-of-type');
  const heroBox = await heroSection.boundingBox();

  console.log(`Hero section: ${Math.round(heroBox.width)}×${Math.round(heroBox.height)}px`);

  // Add highlight for the hero background (the full yellow area)
  await page.evaluate(({ box }) => {
    const highlight = document.createElement('div');
    highlight.className = 'playwright-highlight';
    highlight.style.cssText = `
      position: fixed;
      top: ${box.y}px;
      left: ${box.x}px;
      width: ${box.width}px;
      height: ${box.height}px;
      border: 6px dashed #FF3B3B;
      background: rgba(255, 59, 59, 0.1);
      pointer-events: none;
      z-index: 99998;
      box-sizing: border-box;
    `;

    const label = document.createElement('div');
    label.style.cssText = `
      position: absolute;
      bottom: 10px;
      right: 10px;
      background: #FF3B3B;
      color: white;
      padding: 8px 12px;
      font-size: 14px;
      font-weight: bold;
      font-family: Arial, sans-serif;
      white-space: nowrap;
      border-radius: 4px;
    `;
    label.textContent = 'HERO BACKGROUND: Rec 2880×1800px (2x retina)';
    highlight.appendChild(label);

    document.body.appendChild(highlight);
  }, { box: heroBox });

  // Take screenshot
  await page.screenshot({
    path: path.join(OUTPUT_DIR, '01b-hero-background.png'),
    clip: { x: 0, y: 0, width: 1440, height: 900 }
  });

  console.log('✓ 01b-hero-background.png');
  console.log(`\nRecommended dimensions:`);
  console.log(`  Display: ${Math.round(heroBox.width)}×${Math.round(heroBox.height)}px`);
  console.log(`  Source:  2880×1800px (2x retina for crisp display)`);
  console.log(`  Format:  JPG or PNG (if transparency needed for layering)`);

  await browser.close();
  console.log('\n✅ Hero background asset captured!');
})();
