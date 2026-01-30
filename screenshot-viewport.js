const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    httpCredentials: { username: '', password: 'REALLYrilla2026' }
  });
  
  // Mobile viewport only
  const mobilePage = await context.newPage();
  await mobilePage.setViewportSize({ width: 375, height: 812 });
  await mobilePage.goto('https://bunnykitty.vercel.app', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(3000);
  await mobilePage.screenshot({ path: './screenshots/mobile-viewport.png' });
  console.log('Mobile viewport done');
  
  // Tablet viewport only
  const tabletPage = await context.newPage();
  await tabletPage.setViewportSize({ width: 768, height: 1024 });
  await tabletPage.goto('https://bunnykitty.vercel.app', { waitUntil: 'networkidle' });
  await tabletPage.waitForTimeout(3000);
  await tabletPage.screenshot({ path: './screenshots/tablet-viewport.png' });
  console.log('Tablet viewport done');
  
  // Desktop viewport only
  const desktopPage = await context.newPage();
  await desktopPage.setViewportSize({ width: 1440, height: 900 });
  await desktopPage.goto('https://bunnykitty.vercel.app', { waitUntil: 'networkidle' });
  await desktopPage.waitForTimeout(3000);
  await desktopPage.screenshot({ path: './screenshots/desktop-viewport.png' });
  console.log('Desktop viewport done');
  
  await browser.close();
  console.log('All viewport screenshots saved!');
})();
