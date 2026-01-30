const ExcelJS = require('exceljs');
const path = require('path');

async function createFormattedSpreadsheet() {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'BunnyKitty Team';
  workbook.created = new Date();

  const sheet = workbook.addWorksheet('Asset Requirements', {
    properties: { tabColor: { argb: 'FF3B3B' } },
    views: [{ state: 'frozen', ySplit: 1 }]
  });

  // Define columns with widths
  sheet.columns = [
    { header: '#', key: 'num', width: 5 },
    { header: 'ASSET NAME', key: 'name', width: 32 },
    { header: 'DISPLAY SIZE', key: 'display', width: 15 },
    { header: 'RECOMMENDED SOURCE', key: 'source', width: 20 },
    { header: 'RATIO', key: 'ratio', width: 14 },
    { header: 'FORMAT', key: 'format', width: 22 },
    { header: 'QTY', key: 'qty', width: 8 },
    { header: 'PRIORITY', key: 'priority', width: 12 },
    { header: 'LOCATION', key: 'location', width: 28 },
    { header: 'NOTES', key: 'notes', width: 50 }
  ];

  // Style the header row
  const headerRow = sheet.getRow(1);
  headerRow.font = { bold: true, color: { argb: 'FFFFFF' }, size: 11 };
  headerRow.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FF3B3B' } // Pop Red
  };
  headerRow.alignment = { vertical: 'middle', horizontal: 'center' };
  headerRow.height = 28;

  // Asset data
  const assets = [
    { num: 1, name: 'Hero Background', display: '1440×900px', source: '2880×1800px', ratio: '~1.6:1 Wide', format: 'JPG or PNG', qty: '1', priority: 'HIGH', location: 'Homepage hero section', notes: 'Currently solid yellow. Add gradients, textures, or patterns. Text + characters layer on top.' },
    { num: 2, name: 'Floating Characters', display: '~140×140px', source: '600×600px', ratio: '1:1 Square', format: 'PNG (transparent)', qty: '4', priority: 'HIGH', location: 'Homepage hero corners', notes: '4 different poses. They float and are draggable. Need transparent background.' },
    { num: 3, name: 'Product Image - HERO', display: '588×400px', source: '1200×800px', ratio: '3:2 Landscape', format: 'JPG or PNG', qty: 'As needed', priority: 'HIGH', location: 'Bento grid (2×2 cells)', notes: 'Largest product display. For featured/new releases. Image is cropped to fit.' },
    { num: 4, name: 'Product Image - FEATURED', display: '588×256px', source: '1200×520px', ratio: '~2.3:1 Wide', format: 'JPG or PNG', qty: 'As needed', priority: 'HIGH', location: 'Bento grid (2×1 cells)', notes: 'Wide banner format. Works best with landscape product shots.' },
    { num: 5, name: 'Product Image - STANDARD', display: '278×224px', source: '560×450px', ratio: '~1.25:1', format: 'JPG or PNG', qty: 'As needed', priority: 'HIGH', location: 'Bento grid (1×1 cells)', notes: 'Regular product cards. Most common size in the grid.' },
    { num: 6, name: 'Story Card Icon - In The City', display: '~60px', source: '256×256px', ratio: '1:1 Square', format: 'PNG (transparent)', qty: '1', priority: 'MEDIUM', location: 'Homepage story cards', notes: 'Custom icon for yellow "In The City" card. Currently using emoji.' },
    { num: 7, name: 'Story Card Icon - Original Art', display: '~60px', source: '256×256px', ratio: '1:1 Square', format: 'PNG (transparent)', qty: '1', priority: 'MEDIUM', location: 'Homepage story cards', notes: 'Custom icon for pink "Original Art" card. Currently using emoji.' },
    { num: 8, name: 'Story Card Icon - Join The Crew', display: '~60px', source: '256×256px', ratio: '1:1 Square', format: 'PNG (transparent)', qty: '1', priority: 'MEDIUM', location: 'Homepage story cards', notes: 'Custom icon for cyan "Join The Crew" card. Currently using emoji.' },
    { num: 9, name: 'Story Card BG - Yellow', display: '437×284px', source: '800×400px', ratio: '2:1 Wide', format: 'JPG or PNG', qty: '1', priority: 'MEDIUM', location: 'Homepage - In The City', notes: 'Currently solid yellow. Can add subtle texture while keeping text readable.' },
    { num: 10, name: 'Story Card BG - Pink', display: '437×284px', source: '800×400px', ratio: '2:1 Wide', format: 'JPG or PNG', qty: '1', priority: 'MEDIUM', location: 'Homepage - Original Art', notes: 'Currently solid pink. Can add subtle texture while keeping text readable.' },
    { num: 11, name: 'Story Card BG - Cyan', display: '437×284px', source: '800×400px', ratio: '2:1 Wide', format: 'JPG or PNG', qty: '1', priority: 'MEDIUM', location: 'Homepage - Join Crew', notes: 'Currently solid cyan. Can add subtle texture while keeping text readable.' },
    { num: 12, name: 'World Section Character', display: '445×445px', source: '900×900px', ratio: '1:1 Square', format: 'PNG (transparent)', qty: '1', priority: 'HIGH', location: 'Homepage dark section', notes: 'Main character next to artist quote. We add colored frame behind it.' },
    { num: 13, name: 'Character - BunnyKitty', display: '286×286px', source: '800×800px', ratio: '1:1 Square', format: 'PNG (transparent)', qty: '1', priority: 'HIGH', location: 'Story page - Meet The Crew', notes: 'The original hybrid hero. Pink card background. Polaroid-style.' },
    { num: 14, name: 'Character - NightOwl', display: '286×286px', source: '800×800px', ratio: '1:1 Square', format: 'PNG (transparent)', qty: '1', priority: 'HIGH', location: 'Story page - Meet The Crew', notes: 'The wise one. Purple card background.' },
    { num: 15, name: 'Character - StreetPup', display: '286×286px', source: '800×800px', ratio: '1:1 Square', format: 'PNG (transparent)', qty: '1', priority: 'HIGH', location: 'Story page - Meet The Crew', notes: 'Loyal urban explorer. Cyan card background.' },
    { num: 16, name: 'Character - GlowBear', display: '286×286px', source: '800×800px', ratio: '1:1 Square', format: 'PNG (transparent)', qty: '1', priority: 'HIGH', location: 'Story page - Meet The Crew', notes: 'Brings light to darkness. Yellow card background.' },
    { num: 17, name: 'Artist Portrait', display: '320×320px', source: '640×640px', ratio: '1:1 Square', format: 'JPG or PNG', qty: '1', priority: 'HIGH', location: 'About page', notes: 'Photo of Dave OR illustrated avatar. Cropped to circle with gradient border.' },
    { num: 18, name: 'Gallery - Portrait', display: '395×526px', source: '900×1200px', ratio: '3:4 Portrait', format: 'JPG or PNG', qty: '4+', priority: 'MEDIUM', location: 'Lookbook page', notes: 'Vertical images for masonry gallery.' },
    { num: 19, name: 'Gallery - Landscape', display: '395×296px', source: '1200×900px', ratio: '4:3 Landscape', format: 'JPG or PNG', qty: '4+', priority: 'MEDIUM', location: 'Lookbook page', notes: 'Horizontal images for masonry gallery.' },
    { num: 20, name: 'Gallery - Square', display: '395×395px', source: '1000×1000px', ratio: '1:1 Square', format: 'JPG or PNG', qty: '4+', priority: 'MEDIUM', location: 'Lookbook page', notes: 'Square images for masonry gallery.' },
    { num: 21, name: 'Logo - Full', display: 'Variable', source: '800×200px', ratio: '4:1 Wide', format: 'SVG + PNG', qty: '1', priority: 'HIGH', location: 'Header + brand use', notes: 'Character + wordmark. Need black, white, and color versions.' },
    { num: 22, name: 'Logo - Icon', display: 'Variable', source: '512×512px', ratio: '1:1 Square', format: 'SVG + PNG', qty: '1', priority: 'HIGH', location: 'Favicon + app icon', notes: 'Just the character mark for favicon, social profiles.' },
    { num: 23, name: 'Social Share / OG Image', display: 'Platform varies', source: '1200×630px', ratio: '~1.9:1', format: 'JPG or PNG', qty: '1', priority: 'HIGH', location: 'Social media previews', notes: 'Shows when site is shared. Include logo + tagline + character.' }
  ];

  // Add data rows
  assets.forEach((asset, index) => {
    const row = sheet.addRow(asset);
    row.height = 32;
    row.alignment = { vertical: 'middle', wrapText: true };

    // Alternate row colors
    if (index % 2 === 0) {
      row.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFF9E6' } // Light yellow
      };
    }

    // Style priority column
    const priorityCell = row.getCell('priority');
    if (asset.priority === 'HIGH') {
      priorityCell.font = { bold: true, color: { argb: 'FFFFFF' } };
      priorityCell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF3B3B' } // Red
      };
    } else {
      priorityCell.font = { bold: true };
      priorityCell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFE135' } // Yellow
      };
    }
    priorityCell.alignment = { horizontal: 'center', vertical: 'middle' };

    // Style the source size column (recommended)
    const sourceCell = row.getCell('source');
    sourceCell.font = { bold: true, color: { argb: 'FF3B3B' } };

    // Center align certain columns
    ['num', 'display', 'source', 'ratio', 'qty'].forEach(col => {
      row.getCell(col).alignment = { horizontal: 'center', vertical: 'middle' };
    });
  });

  // Add borders to all cells
  sheet.eachRow((row, rowNumber) => {
    row.eachCell((cell) => {
      cell.border = {
        top: { style: 'thin', color: { argb: '000000' } },
        left: { style: 'thin', color: { argb: '000000' } },
        bottom: { style: 'thin', color: { argb: '000000' } },
        right: { style: 'thin', color: { argb: '000000' } }
      };
    });
  });

  // Add a title row at the very top
  sheet.insertRow(1, ['', 'BUNNYKITTY WEBSITE — ASSET REQUIREMENTS FOR DAVE', '', '', '', '', '', '', '', '']);
  const titleRow = sheet.getRow(1);
  titleRow.height = 40;
  sheet.mergeCells('A1:J1');
  const titleCell = titleRow.getCell(1);
  titleCell.font = { bold: true, size: 18, color: { argb: 'FF3B3B' } };
  titleCell.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FFE135' } // Yellow background
  };
  titleCell.alignment = { horizontal: 'center', vertical: 'middle' };
  titleCell.border = {
    top: { style: 'thick', color: { argb: '000000' } },
    left: { style: 'thick', color: { argb: '000000' } },
    bottom: { style: 'thick', color: { argb: '000000' } },
    right: { style: 'thick', color: { argb: '000000' } }
  };

  // Save the file
  const outputPath = '/Users/wallyvu/Desktop/BunnyKitty Website/04-Content/BunnyKitty-Asset-Requirements.xlsx';
  await workbook.xlsx.writeFile(outputPath);
  console.log(`✅ Formatted spreadsheet saved to:\n${outputPath}`);
}

createFormattedSpreadsheet().catch(console.error);
