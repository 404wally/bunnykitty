const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    httpCredentials: { username: '', password: 'REALLYrilla2026' }
  });
  
  // Mobile full page
  const mobilePage = await context.newPage();
  await mobilePage.setViewportSize({ width: 375, height: 812 });
  await mobilePage.goto('https://bunnykitty.vercel.app', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(2000);
  await mobilePage.screenshot({ path: './screenshots/mobile-full.png', fullPage: true });
  console.log('Mobile done');
  
  // Tablet full page
  const tabletPage = await context.newPage();
  await tabletPage.setViewportSize({ width: 768, height: 1024 });
  await tabletPage.goto('https://bunnykitty.vercel.app', { waitUntil: 'networkidle' });
  await tabletPage.waitForTimeout(2000);
  await tabletPage.screenshot({ path: './screenshots/tablet-full.png', fullPage: true });
  console.log('Tablet done');
  
  // Desktop full page  
  const desktopPage = await context.newPage();
  await desktopPage.setViewportSize({ width: 1440, height: 900 });
  await desktopPage.goto('https://bunnykitty.vercel.app', { waitUntil: 'networkidle' });
  await desktopPage.waitForTimeout(2000);
  await desktopPage.screenshot({ path: './screenshots/desktop-full.png', fullPage: true });
  console.log('Desktop done');
  
  await browser.close();
  console.log('All screenshots saved!');
})();
