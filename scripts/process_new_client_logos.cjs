const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const uploadDir = 'C:\\Users\\anujm\\.gemini\\antigravity-ide\\brain\\6085ce58-da5f-47a0-8320-e036b9f63555\\.user_uploaded';
const targetDir = path.resolve(__dirname, '../src/assets/partners');

const logoConfigs = [
  {
    id: 'bhushan_power',
    file: 'media_1790228225105.jpg',
    crop: { left: 87, top: 0, width: 229, height: 309 },
    bgThreshold: 248
  },
  {
    id: 'jindal_steel',
    file: 'media_1790228234635.jpg',
    crop: { left: 0, top: 0, width: 1024, height: 365 },
    bgThreshold: 240
  },
  {
    id: 'aditya_birla',
    file: 'media_1790228244597.jpg',
    crop: { left: 14, top: 133, width: 572, height: 333 },
    bgThreshold: 248
  },
  {
    id: 'hindustan_petroleum',
    file: 'media_1790228251957.jpg',
    crop: { left: 70, top: 16, width: 459, height: 568 },
    bgThreshold: 248
  },
  {
    id: 'reliance',
    file: 'media_1790228259665.jpg',
    crop: { left: 61, top: 153, width: 432, height: 247 },
    bgThreshold: 248
  }
];

async function processLogos() {
  fs.mkdirSync(targetDir, { recursive: true });

  for (const item of logoConfigs) {
    const srcPath = path.join(uploadDir, item.file);
    if (!fs.existsSync(srcPath)) {
      console.error(`Missing source file: ${srcPath}`);
      continue;
    }

    console.log(`Processing ${item.id}...`);

    // 1. Extract the cropped region with high precision
    const croppedBuffer = await sharp(srcPath)
      .extract(item.crop)
      .raw()
      .toBuffer({ resolveWithObject: true });

    const { data, info } = croppedBuffer;
    const cleanData = Buffer.alloc(data.length);

    // 2. Normalize background pixels to pure clean white #FFFFFF (255, 255, 255)
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

    // 3. Generate high-resolution PNG
    const pngBuffer = await sharp(cleanData, {
      raw: {
        width: info.width,
        height: info.height,
        channels: 3
      }
    })
      .png({ quality: 100, compressionLevel: 9 })
      .toBuffer();

    const pngPath = path.join(targetDir, `${item.id}.png`);
    fs.writeFileSync(pngPath, pngBuffer);
    console.log(`Saved ${pngPath} (${info.width}x${info.height}, ${pngBuffer.length} bytes)`);

    // 4. Also generate SVG wrapper embedding the high-res base64 image
    const base64Data = pngBuffer.toString('base64');
    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${info.width} ${info.height}" width="${info.width}" height="${info.height}">
  <image href="data:image/png;base64,${base64Data}" width="${info.width}" height="${info.height}" preserveAspectRatio="xMidYMid meet"/>
</svg>
`;
    const svgPath = path.join(targetDir, `${item.id}.svg`);
    fs.writeFileSync(svgPath, svgContent);
    console.log(`Saved ${svgPath}`);
  }

  console.log('All 5 client logos processed successfully!');
}

processLogos().catch(err => {
  console.error(err);
  process.exit(1);
});
