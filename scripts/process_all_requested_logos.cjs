const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const uploadDir = 'C:\\Users\\anujm\\.gemini\\antigravity-ide\\brain\\6085ce58-da5f-47a0-8320-e036b9f63555\\.user_uploaded';
const partnersDir = path.resolve(__dirname, '../src/assets/partners');
const srcImagesDir = path.resolve(__dirname, '../src/assets/images');
const publicAssetsDir = path.resolve(__dirname, '../public/assets');
const publicDir = path.resolve(__dirname, '../public');

async function processPartners() {
  const partnerItems = [
    {
      id: 'tata_steel',
      file: 'media_1790229437488.jpg',
      crop: { left: 28, top: 67, width: 410, height: 202 },
      bgThreshold: 248
    },
    {
      id: 'jsw_steel',
      file: 'media_1790229444790.jpg',
      crop: { left: 0, top: 0, width: 300, height: 141 },
      bgThreshold: 248
    }
  ];

  for (const item of partnerItems) {
    const srcPath = path.join(uploadDir, item.file);
    if (!fs.existsSync(srcPath)) {
      console.error(`Source partner image not found: ${srcPath}`);
      continue;
    }

    console.log(`Processing partner ${item.id}...`);

    const croppedBuffer = await sharp(srcPath)
      .extract(item.crop)
      .raw()
      .toBuffer({ resolveWithObject: true });

    const { data, info } = croppedBuffer;
    const cleanData = Buffer.alloc(data.length);

    for (let i = 0; i < info.width * info.height; i++) {
      const r = data[i * 3];
      const g = data[i * 3 + 1];
      const b = data[i * 3 + 2];

      if (r >= item.bgThreshold && g >= item.bgThreshold && b >= item.bgThreshold) {
        cleanData[i * 3] = 255;
        cleanData[i * 3 + 1] = 255;
        cleanData[i * 3 + 2] = 255;
      } else {
        cleanData[i * 3] = r;
        cleanData[i * 3 + 1] = g;
        cleanData[i * 3 + 2] = b;
      }
    }

    const pngBuffer = await sharp(cleanData, {
      raw: { width: info.width, height: info.height, channels: 3 }
    })
      .png({ quality: 100, compressionLevel: 9 })
      .toBuffer();

    const pngPath = path.join(partnersDir, `${item.id}.png`);
    fs.writeFileSync(pngPath, pngBuffer);
    console.log(`Saved ${pngPath} (${info.width}x${info.height})`);

    const base64Data = pngBuffer.toString('base64');
    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${info.width} ${info.height}" width="${info.width}" height="${info.height}">
  <image href="data:image/png;base64,${base64Data}" width="${info.width}" height="${info.height}" preserveAspectRatio="xMidYMid meet"/>
</svg>
`;
    const svgPath = path.join(partnersDir, `${item.id}.svg`);
    fs.writeFileSync(svgPath, svgContent);
    console.log(`Saved ${svgPath}`);
  }
}

async function processCompanyLogo2() {
  const logo2Source = path.resolve(__dirname, '../src/assets/logo/logo2.png');
  if (!fs.existsSync(logo2Source)) {
    console.error(`logo2.png not found at: ${logo2Source}`);
    return;
  }

  console.log('Processing new company logo2.png...');
  // Bounding box of content in logo2: minX: 73, minY: 166, maxX: 2008, maxY: 568
  // Extract with generous balanced padding (20px horizontal, 16px vertical)
  const crop = { left: 53, top: 150, width: 1975, height: 434 };

  const croppedBuffer = await sharp(logo2Source)
    .extract(crop)
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { data, info } = croppedBuffer;
  const cleanData = Buffer.alloc(data.length);

  // Normalize background to clean pure white #FFFFFF
  for (let i = 0; i < info.width * info.height; i++) {
    const r = data[i * 3];
    const g = data[i * 3 + 1];
    const b = data[i * 3 + 2];

    if (r >= 248 && g >= 248 && b >= 248) {
      cleanData[i * 3] = 255;
      cleanData[i * 3 + 1] = 255;
      cleanData[i * 3 + 2] = 255;
    } else {
      cleanData[i * 3] = r;
      cleanData[i * 3 + 1] = g;
      cleanData[i * 3 + 2] = b;
    }
  }

  const highResLogo = await sharp(cleanData, {
    raw: { width: info.width, height: info.height, channels: 3 }
  })
    .png({ quality: 100, compressionLevel: 9 })
    .toBuffer();

  // Save to src/assets/images and public/assets
  fs.writeFileSync(path.join(srcImagesDir, 'bhawal-logo.png'), highResLogo);
  fs.writeFileSync(path.join(publicAssetsDir, 'bhawal-logo.png'), highResLogo);
  fs.writeFileSync(path.join(srcImagesDir, 'redcore-logo.png'), highResLogo);
  fs.writeFileSync(path.join(publicAssetsDir, 'redcore-logo.png'), highResLogo);
  console.log(`Saved new logo as bhawal-logo.png (${info.width}x${info.height}) to src and public`);

  // SVG wrappers
  const base64Logo = highResLogo.toString('base64');
  const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${info.width} ${info.height}" width="${info.width}" height="${info.height}">
  <image href="data:image/png;base64,${base64Logo}" width="${info.width}" height="${info.height}" preserveAspectRatio="xMidYMid meet"/>
</svg>`;
  fs.writeFileSync(path.join(srcImagesDir, 'bhawal-logo.svg'), logoSvg);
  fs.writeFileSync(path.join(srcImagesDir, 'redcore-logo.svg'), logoSvg);
  fs.writeFileSync(path.join(publicAssetsDir, 'redcore-logo.svg'), logoSvg);

  // Favicons
  await sharp(highResLogo).resize(32, 32, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } }).png().toFile(path.join(publicDir, 'favicon-32x32.png'));
  await sharp(highResLogo).resize(48, 48, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } }).png().toFile(path.join(publicDir, 'favicon.png'));
  await sharp(highResLogo).resize(180, 180, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } }).png().toFile(path.join(publicDir, 'apple-touch-icon.png'));
  await sharp(highResLogo).resize(192, 192, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } }).png().toFile(path.join(publicDir, 'android-chrome-192x192.png'));
  await sharp(highResLogo).resize(512, 512, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } }).png().toFile(path.join(publicDir, 'android-chrome-512x512.png'));
  console.log('Saved updated favicons');
}

async function main() {
  await processPartners();
  await processCompanyLogo2();
  console.log('Finished processing all requested logos successfully!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
