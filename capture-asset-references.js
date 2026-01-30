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

  console.log('Starting screenshot capture...\n');

  // ==================== HOMEPAGE ====================
  console.log('📸 Capturing Homepage sections...');
  await page.goto('https://bunnykitty.vercel.app', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  // 1. Hero Section - Full viewport
  await page.screenshot({
    path: path.join(OUTPUT_DIR, '01-hero-full.png'),
    clip: { x: 0, y: 0, width: 1440, height: 900 }
  });
  console.log('  ✓ Hero section (full viewport)');

  // 2. Hero - Floating characters area (cropped to show character positions)
  await page.screenshot({
    path: path.join(OUTPUT_DIR, '02-hero-characters-area.png'),
    clip: { x: 0, y: 100, width: 1440, height: 600 }
  });
  console.log('  ✓ Hero floating characters area');

  // 3. Scroll to Story Cards
  await page.evaluate(() => window.scrollTo(0, 800));
  await page.waitForTimeout(1000);
  await page.screenshot({
    path: path.join(OUTPUT_DIR, '03-story-cards.png'),
    clip: { x: 0, y: 0, width: 1440, height: 900 }
  });
  console.log('  ✓ Story Cards section');

  // 4. Scroll to Products/Bento Grid
  await page.evaluate(() => window.scrollTo(0, 1600));
  await page.waitForTimeout(1000);
  await page.screenshot({
    path: path.join(OUTPUT_DIR, '04-bento-grid-products.png'),
    clip: { x: 0, y: 0, width: 1440, height: 900 }
  });
  console.log('  ✓ Bento Grid products section');

  // 5. Scroll to World Section
  await page.evaluate(() => window.scrollTo(0, 2800));
  await page.waitForTimeout(1000);
  await page.screenshot({
    path: path.join(OUTPUT_DIR, '05-world-section.png'),
    clip: { x: 0, y: 0, width: 1440, height: 900 }
  });
  console.log('  ✓ World section (dark area)');

  // 6. Footer
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1000);
  await page.screenshot({
    path: path.join(OUTPUT_DIR, '06-footer.png'),
    clip: { x: 0, y: 0, width: 1440, height: 900 }
  });
  console.log('  ✓ Footer section');

  // 7. Header close-up (logo area)
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
  await page.screenshot({
    path: path.join(OUTPUT_DIR, '07-header-logo.png'),
    clip: { x: 0, y: 0, width: 1440, height: 100 }
  });
  console.log('  ✓ Header/logo area');

  // ==================== STORY PAGE ====================
  console.log('\n📸 Capturing Story page sections...');
  await page.goto('https://bunnykitty.vercel.app/story', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  // 8. Story Hero
  await page.screenshot({
    path: path.join(OUTPUT_DIR, '08-story-hero.png'),
    clip: { x: 0, y: 0, width: 1440, height: 900 }
  });
  console.log('  ✓ Story page hero');

  // 9. Character profiles section
  await page.evaluate(() => window.scrollTo(0, 1400));
  await page.waitForTimeout(1000);
  await page.screenshot({
    path: path.join(OUTPUT_DIR, '09-character-profiles.png'),
    clip: { x: 0, y: 0, width: 1440, height: 900 }
  });
  console.log('  ✓ Character profiles section');

  // 10. Origin story area
  await page.evaluate(() => window.scrollTo(0, 700));
  await page.waitForTimeout(1000);
  await page.screenshot({
    path: path.join(OUTPUT_DIR, '10-origin-story.png'),
    clip: { x: 0, y: 0, width: 1440, height: 900 }
  });
  console.log('  ✓ Origin story section');

  // ==================== ABOUT PAGE ====================
  console.log('\n📸 Capturing About page sections...');
  await page.goto('https://bunnykitty.vercel.app/about', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  // 11. About Hero with artist portrait
  await page.screenshot({
    path: path.join(OUTPUT_DIR, '11-about-hero.png'),
    clip: { x: 0, y: 0, width: 1440, height: 900 }
  });
  console.log('  ✓ About page hero (artist portrait area)');

  // 12. Values/Process section
  await page.evaluate(() => window.scrollTo(0, 1200));
  await page.waitForTimeout(1000);
  await page.screenshot({
    path: path.join(OUTPUT_DIR, '12-about-values.png'),
    clip: { x: 0, y: 0, width: 1440, height: 900 }
  });
  console.log('  ✓ About values section');

  // ==================== LOOKBOOK PAGE ====================
  console.log('\n📸 Capturing Lookbook page sections...');
  await page.goto('https://bunnykitty.vercel.app/lookbook', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  // 13. Lookbook Hero
  await page.screenshot({
    path: path.join(OUTPUT_DIR, '13-lookbook-hero.png'),
    clip: { x: 0, y: 0, width: 1440, height: 900 }
  });
  console.log('  ✓ Lookbook page hero');

  // 14. Gallery grid
  await page.evaluate(() => window.scrollTo(0, 400));
  await page.waitForTimeout(1000);
  await page.screenshot({
    path: path.join(OUTPUT_DIR, '14-gallery-grid.png'),
    clip: { x: 0, y: 0, width: 1440, height: 900 }
  });
  console.log('  ✓ Gallery grid section');

  // ==================== SHOP PAGE ====================
  console.log('\n📸 Capturing Shop page sections...');
  await page.goto('https://bunnykitty.vercel.app/shop', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  // 15. Shop page with product grid
  await page.screenshot({
    path: path.join(OUTPUT_DIR, '15-shop-products.png'),
    clip: { x: 0, y: 0, width: 1440, height: 900 }
  });
  console.log('  ✓ Shop page products');

  // ==================== MOBILE VIEWS ====================
  console.log('\n📸 Capturing Mobile views...');
  await page.setViewportSize({ width: 375, height: 812 });

  // 16. Mobile Hero
  await page.goto('https://bunnykitty.vercel.app', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  await page.screenshot({
    path: path.join(OUTPUT_DIR, '16-mobile-hero.png')
  });
  console.log('  ✓ Mobile hero view');

  // 17. Mobile Products
  await page.evaluate(() => window.scrollTo(0, 1200));
  await page.waitForTimeout(1000);
  await page.screenshot({
    path: path.join(OUTPUT_DIR, '17-mobile-products.png')
  });
  console.log('  ✓ Mobile products view');

  await browser.close();

  console.log('\n✅ All screenshots captured!');
  console.log(`📁 Saved to: ${OUTPUT_DIR}`);
})();
