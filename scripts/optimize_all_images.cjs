const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ASSETS_DIR = path.join(__dirname, '../src/assets');

function getImages(dir) {
  let list = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      list = list.concat(getImages(fullPath));
    } else {
      const ext = path.extname(entry.name).toLowerCase();
      if (['.png', '.jpg', '.jpeg'].includes(ext)) {
        list.push({ fullPath, ext, size: fs.statSync(fullPath).size });
      }
    }
  }
  return list;
}

async function optimizeImages() {
  const images = getImages(ASSETS_DIR);
  console.log(`Found ${images.length} candidate images.`);

  let totalBefore = 0;
  let totalAfter = 0;
  let optimizedCount = 0;

  for (const img of images) {
    totalBefore += img.size;
    const sizeKB = img.size / 1024;

    // Only process if larger than 120KB
    if (sizeKB < 120) {
      totalAfter += img.size;
      continue;
    }

    try {
      const buf = fs.readFileSync(img.fullPath);
      let outBuf;

      if (img.ext === '.png') {
        outBuf = await sharp(buf)
          .resize({ width: 1920, withoutEnlargement: true })
          .png({ quality: 82, compressionLevel: 9, effort: 7 })
          .toBuffer();
      } else if (img.ext === '.jpg' || img.ext === '.jpeg') {
        outBuf = await sharp(buf)
          .resize({ width: 1920, withoutEnlargement: true })
          .jpeg({ quality: 84, mozjpeg: true })
          .toBuffer();
      }

      if (outBuf && outBuf.length < img.size) {
        fs.writeFileSync(img.fullPath, outBuf);
        totalAfter += outBuf.length;
        optimizedCount++;
        console.log(
          `Optimized: ${path.relative(ASSETS_DIR, img.fullPath)} (${(img.size / 1024).toFixed(0)}KB -> ${(outBuf.length / 1024).toFixed(0)}KB)`
        );
      } else {
        totalAfter += img.size;
      }
    } catch (err) {
      console.error(`Failed to optimize ${img.fullPath}:`, err.message);
      totalAfter += img.size;
    }
  }

  console.log('\n--- Optimization Complete ---');
  console.log(`Images processed: ${optimizedCount} / ${images.length}`);
  console.log(`Total size before: ${(totalBefore / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Total size after: ${(totalAfter / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Space saved: ${((totalBefore - totalAfter) / 1024 / 1024).toFixed(2)} MB (${(((totalBefore - totalAfter) / totalBefore) * 100).toFixed(1)}%)`);
}

optimizeImages().catch(console.error);
