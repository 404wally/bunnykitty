const ExcelJS = require('exceljs');

async function createFormattedSpreadsheet() {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'BunnyKitty Team';
  workbook.created = new Date();

  const sheet = workbook.addWorksheet('Asset Requirements', {
    properties: { tabColor: { argb: 'FF3B3B' } },
    views: [{ state: 'frozen', ySplit: 2 }]
  });

  // Colors matching the HTML spec
  const colors = {
    popRed: 'FF3B3B',
    popYellow: 'FFE135',
    popBlue: '00D4FF',
    popPink: 'FF6EB4',
    popGreen: '39FF14',
    popPurple: '9D4EDD',
    popOrange: 'FF6B35',
    black: '1A1A1A',
    white: 'FFFFFF',
    lightYellow: 'FFF9E6',
    lightPink: 'FFE4F0',
    lightBlue: 'E0F7FF',
    lightPurple: 'F3E8FF',
    lightGreen: 'E8FFE0'
  };

  // Define columns with widths
  sheet.columns = [
    { header: '#', key: 'num', width: 5 },
    { header: 'ASSET NAME', key: 'name', width: 32 },
    { header: 'DISPLAY SIZE', key: 'display', width: 15 },
    { header: 'RECOMMENDED SOURCE', key: 'source', width: 22 },
    { header: 'RATIO', key: 'ratio', width: 14 },
    { header: 'FORMAT', key: 'format', width: 22 },
    { header: 'QTY', key: 'qty', width: 10 },
    { header: 'PRIORITY', key: 'priority', width: 12 },
    { header: 'LOCATION', key: 'location', width: 28 },
    { header: 'NOTES', key: 'notes', width: 55 }
  ];

  // Title row
  sheet.insertRow(1, ['']);
  sheet.mergeCells('A1:J1');
  const titleCell = sheet.getCell('A1');
  titleCell.value = '🐰 BUNNYKITTY WEBSITE — ASSET REQUIREMENTS FOR DAVE';
  titleCell.font = { bold: true, size: 20, color: { argb: colors.popRed } };
  titleCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.popYellow } };
  titleCell.alignment = { horizontal: 'center', vertical: 'middle' };
  titleCell.border = {
    top: { style: 'thick', color: { argb: colors.black } },
    left: { style: 'thick', color: { argb: colors.black } },
    bottom: { style: 'thick', color: { argb: colors.black } },
    right: { style: 'thick', color: { argb: colors.black } }
  };
  sheet.getRow(1).height = 45;

  // Header row (row 2)
  const headerRow = sheet.getRow(2);
  headerRow.values = ['#', 'ASSET NAME', 'DISPLAY SIZE', 'RECOMMENDED SOURCE', 'RATIO', 'FORMAT', 'QTY', 'PRIORITY', 'LOCATION', 'NOTES'];
  headerRow.font = { bold: true, color: { argb: colors.white }, size: 11 };
  headerRow.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.black } };
  headerRow.alignment = { vertical: 'middle', horizontal: 'center' };
  headerRow.height = 28;
  headerRow.eachCell(cell => {
    cell.border = {
      top: { style: 'thin', color: { argb: colors.black } },
      left: { style: 'thin', color: { argb: colors.black } },
      bottom: { style: 'thin', color: { argb: colors.black } },
      right: { style: 'thin', color: { argb: colors.black } }
    };
  });

  let currentRow = 3;

  // Helper to add section header
  function addSectionHeader(emoji, title, bgColor, textColor = colors.white) {
    sheet.mergeCells(`A${currentRow}:J${currentRow}`);
    const cell = sheet.getCell(`A${currentRow}`);
    cell.value = `${emoji}  ${title}`;
    cell.font = { bold: true, size: 14, color: { argb: textColor } };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: bgColor } };
    cell.alignment = { horizontal: 'left', vertical: 'middle', indent: 1 };
    cell.border = {
      top: { style: 'medium', color: { argb: colors.black } },
      left: { style: 'medium', color: { argb: colors.black } },
      bottom: { style: 'medium', color: { argb: colors.black } },
      right: { style: 'medium', color: { argb: colors.black } }
    };
    sheet.getRow(currentRow).height = 32;
    currentRow++;
  }

  // Helper to add asset row
  function addAssetRow(asset, rowBgColor) {
    const row = sheet.getRow(currentRow);
    row.values = [asset.num, asset.name, asset.display, asset.source, asset.ratio, asset.format, asset.qty, asset.priority, asset.location, asset.notes];
    row.height = 36;
    row.alignment = { vertical: 'middle', wrapText: true };

    // Background color
    row.eachCell((cell, colNumber) => {
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: rowBgColor } };
      cell.border = {
        top: { style: 'thin', color: { argb: 'CCCCCC' } },
        left: { style: 'thin', color: { argb: 'CCCCCC' } },
        bottom: { style: 'thin', color: { argb: 'CCCCCC' } },
        right: { style: 'thin', color: { argb: 'CCCCCC' } }
      };
    });

    // Style priority column
    const priorityCell = row.getCell('priority');
    if (asset.priority === 'HIGH') {
      priorityCell.font = { bold: true, color: { argb: colors.white } };
      priorityCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.popRed } };
    } else {
      priorityCell.font = { bold: true, color: { argb: colors.black } };
      priorityCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colors.popYellow } };
    }
    priorityCell.alignment = { horizontal: 'center', vertical: 'middle' };

    // Style source column (bold red)
    const sourceCell = row.getCell('source');
    sourceCell.font = { bold: true, color: { argb: colors.popRed } };

    // Center align columns
    ['num', 'display', 'source', 'ratio', 'qty'].forEach(col => {
      row.getCell(col).alignment = { horizontal: 'center', vertical: 'middle' };
    });

    currentRow++;
  }

  // ==================== HOMEPAGE ASSETS ====================
  addSectionHeader('🏠', 'HOMEPAGE ASSETS', colors.popRed);

  const homepageAssets = [
    { num: 1, name: 'Hero Background', display: '1440×900px', source: '2880×1800px', ratio: '~1.6:1 Wide', format: 'JPG or PNG', qty: '1', priority: 'HIGH', location: 'Homepage hero section', notes: 'Currently solid yellow. Add gradients, textures, or patterns. Text + characters layer on top.' },
    { num: 2, name: 'Floating Characters', display: '~140×140px', source: '600×600px', ratio: '1:1 Square', format: 'PNG (transparent)', qty: '4', priority: 'HIGH', location: 'Homepage hero corners', notes: '4 different poses. They float and are draggable. Need transparent background.' },
    { num: 3, name: 'Product Image - HERO', display: '588×400px', source: '1200×800px', ratio: '3:2 Landscape', format: 'JPG or PNG', qty: 'As needed', priority: 'HIGH', location: 'Bento grid (2×2 cells)', notes: 'Largest product display. For featured/new releases.' },
    { num: 4, name: 'Product Image - FEATURED', display: '588×256px', source: '1200×520px', ratio: '~2.3:1 Wide', format: 'JPG or PNG', qty: 'As needed', priority: 'HIGH', location: 'Bento grid (2×1 cells)', notes: 'Wide banner format. Works best with landscape shots.' },
    { num: 5, name: 'Product Image - STANDARD', display: '278×224px', source: '560×450px', ratio: '~1.25:1', format: 'JPG or PNG', qty: 'As needed', priority: 'HIGH', location: 'Bento grid (1×1 cells)', notes: 'Regular product cards. Most common size.' },
    { num: 6, name: 'Story Card Icon - In The City', display: '~60px', source: '256×256px', ratio: '1:1 Square', format: 'PNG (transparent)', qty: '1', priority: 'MEDIUM', location: 'Yellow story card', notes: 'Custom icon. Currently using emoji.' },
    { num: 7, name: 'Story Card Icon - Original Art', display: '~60px', source: '256×256px', ratio: '1:1 Square', format: 'PNG (transparent)', qty: '1', priority: 'MEDIUM', location: 'Pink story card', notes: 'Custom icon. Currently using emoji.' },
    { num: 8, name: 'Story Card Icon - Join The Crew', display: '~60px', source: '256×256px', ratio: '1:1 Square', format: 'PNG (transparent)', qty: '1', priority: 'MEDIUM', location: 'Cyan story card', notes: 'Custom icon. Currently using emoji.' },
    { num: 9, name: 'Story Card BG - Yellow', display: '437×284px', source: '800×400px', ratio: '2:1 Wide', format: 'JPG or PNG', qty: '1', priority: 'MEDIUM', location: 'In The City card', notes: 'Currently solid. Can add subtle texture.' },
    { num: 10, name: 'Story Card BG - Pink', display: '437×284px', source: '800×400px', ratio: '2:1 Wide', format: 'JPG or PNG', qty: '1', priority: 'MEDIUM', location: 'Original Art card', notes: 'Currently solid. Can add subtle texture.' },
    { num: 11, name: 'Story Card BG - Cyan', display: '437×284px', source: '800×400px', ratio: '2:1 Wide', format: 'JPG or PNG', qty: '1', priority: 'MEDIUM', location: 'Join Crew card', notes: 'Currently solid. Can add subtle texture.' },
    { num: 12, name: 'World Section Character', display: '445×445px', source: '900×900px', ratio: '1:1 Square', format: 'PNG (transparent)', qty: '1', priority: 'HIGH', location: 'Dark section w/ quote', notes: 'Main character next to artist quote.' }
  ];

  homepageAssets.forEach((asset, i) => {
    addAssetRow(asset, i % 2 === 0 ? colors.lightYellow : colors.white);
  });

  // ==================== STORY PAGE ASSETS ====================
  addSectionHeader('📖', 'STORY PAGE ASSETS', colors.popPurple);

  const storyAssets = [
    { num: 13, name: 'Character - BunnyKitty', display: '286×286px', source: '800×800px', ratio: '1:1 Square', format: 'PNG (transparent)', qty: '1', priority: 'HIGH', location: 'Meet The Crew section', notes: 'The original hybrid hero. Pink card background.' },
    { num: 14, name: 'Character - NightOwl', display: '286×286px', source: '800×800px', ratio: '1:1 Square', format: 'PNG (transparent)', qty: '1', priority: 'HIGH', location: 'Meet The Crew section', notes: 'The wise one. Purple card background.' },
    { num: 15, name: 'Character - StreetPup', display: '286×286px', source: '800×800px', ratio: '1:1 Square', format: 'PNG (transparent)', qty: '1', priority: 'HIGH', location: 'Meet The Crew section', notes: 'Loyal urban explorer. Cyan card background.' },
    { num: 16, name: 'Character - GlowBear', display: '286×286px', source: '800×800px', ratio: '1:1 Square', format: 'PNG (transparent)', qty: '1', priority: 'HIGH', location: 'Meet The Crew section', notes: 'Brings light to darkness. Yellow card background.' }
  ];

  storyAssets.forEach((asset, i) => {
    addAssetRow(asset, i % 2 === 0 ? colors.lightPurple : colors.white);
  });

  // ==================== ABOUT PAGE ASSETS ====================
  addSectionHeader('🎨', 'ABOUT PAGE ASSETS', colors.popPink);

  const aboutAssets = [
    { num: 17, name: 'Artist Portrait', display: '320×320px', source: '640×640px', ratio: '1:1 Square', format: 'JPG or PNG', qty: '1', priority: 'HIGH', location: 'About page hero', notes: 'Photo of Dave OR illustrated avatar. Cropped to circle.' }
  ];

  aboutAssets.forEach((asset, i) => {
    addAssetRow(asset, i % 2 === 0 ? colors.lightPink : colors.white);
  });

  // ==================== LOOKBOOK / GALLERY ASSETS ====================
  addSectionHeader('🖼️', 'LOOKBOOK / GALLERY ASSETS', colors.popBlue);

  const galleryAssets = [
    { num: 18, name: 'Gallery - Portrait', display: '395×526px', source: '900×1200px', ratio: '3:4 Portrait', format: 'JPG or PNG', qty: '4+', priority: 'MEDIUM', location: 'Lookbook page', notes: 'Vertical images for masonry gallery.' },
    { num: 19, name: 'Gallery - Landscape', display: '395×296px', source: '1200×900px', ratio: '4:3 Landscape', format: 'JPG or PNG', qty: '4+', priority: 'MEDIUM', location: 'Lookbook page', notes: 'Horizontal images for masonry gallery.' },
    { num: 20, name: 'Gallery - Square', display: '395×395px', source: '1000×1000px', ratio: '1:1 Square', format: 'JPG or PNG', qty: '4+', priority: 'MEDIUM', location: 'Lookbook page', notes: 'Square images for masonry gallery.' }
  ];

  galleryAssets.forEach((asset, i) => {
    addAssetRow(asset, i % 2 === 0 ? colors.lightBlue : colors.white);
  });

  // ==================== BRAND ASSETS ====================
  addSectionHeader('✨', 'BRAND ASSETS', colors.popGreen, colors.black);

  const brandAssets = [
    { num: 21, name: 'Logo - Full', display: 'Variable', source: '800×200px', ratio: '4:1 Wide', format: 'SVG + PNG', qty: '1', priority: 'HIGH', location: 'Header + brand use', notes: 'Character + wordmark. Need black, white, color versions.' },
    { num: 22, name: 'Logo - Icon', display: 'Variable', source: '512×512px', ratio: '1:1 Square', format: 'SVG + PNG', qty: '1', priority: 'HIGH', location: 'Favicon + app icon', notes: 'Just the character mark for favicon, profiles.' },
    { num: 23, name: 'Social Share / OG Image', display: 'Platform varies', source: '1200×630px', ratio: '~1.9:1', format: 'JPG or PNG', qty: '1', priority: 'HIGH', location: 'Social media previews', notes: 'Shows when site shared. Logo + tagline + character.' }
  ];

  brandAssets.forEach((asset, i) => {
    addAssetRow(asset, i % 2 === 0 ? colors.lightGreen : colors.white);
  });

  // Save
  const outputPath = '/Users/wallyvu/Desktop/BunnyKitty Website/04-Content/BunnyKitty-Asset-Requirements.xlsx';
  await workbook.xlsx.writeFile(outputPath);
  console.log(`✅ Color-coded spreadsheet saved to:\n${outputPath}`);
}

createFormattedSpreadsheet().catch(console.error);
