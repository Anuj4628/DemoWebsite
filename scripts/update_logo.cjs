const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function updateLogo() {
  const sourceImage = path.resolve(__dirname, '../src/assets/logo/logo3.png');

  if (!fs.existsSync(sourceImage)) {
    console.error('Source image not found:', sourceImage);
    process.exit(1);
  }

  const srcImagesDir = path.resolve(__dirname, '../src/assets/images');
  const publicAssetsDir = path.resolve(__dirname, '../public/assets');
  const publicDir = path.resolve(__dirname, '../public');
  const distAssetsDir = path.resolve(__dirname, '../dist/assets');

  console.log('Processing logo3.png with clean transparent background and trimmed margins...');
  
  // Trim outer empty transparent padding and add 4px subtle breathing padding
  const trimmed = await sharp(sourceImage)
    .trim()
    .extend({
      top: 4,
      bottom: 4,
      left: 4,
      right: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .png({ quality: 100, compressionLevel: 9 })
    .toBuffer({ resolveWithObject: true });

  const pngBuffer = trimmed.data;
  const { width, height } = trimmed.info;
  console.log(`Pristine trimmed logo dimensions: ${width}x${height} (aspect ratio: ${(width/height).toFixed(3)}:1)`);

  // Save to src/assets/images and public/assets
  fs.writeFileSync(path.join(srcImagesDir, 'bhawal-logo.png'), pngBuffer);
  fs.writeFileSync(path.join(publicAssetsDir, 'bhawal-logo.png'), pngBuffer);
  fs.writeFileSync(path.join(srcImagesDir, 'redcore-logo.png'), pngBuffer);
  fs.writeFileSync(path.join(publicAssetsDir, 'redcore-logo.png'), pngBuffer);
  if (fs.existsSync(distAssetsDir)) {
    fs.writeFileSync(path.join(distAssetsDir, 'bhawal-logo.png'), pngBuffer);
    fs.writeFileSync(path.join(distAssetsDir, 'redcore-logo.png'), pngBuffer);
  }
  console.log(`Saved pristine bhawal-logo.png (${width}x${height})`);

  // Generate SVG with embedded high-res lossless PNG data
  const base64Data = pngBuffer.toString('base64');
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <image href="data:image/png;base64,${base64Data}" width="${width}" height="${height}" preserveAspectRatio="xMidYMid meet"/>
</svg>
`;

  fs.writeFileSync(path.join(srcImagesDir, 'bhawal-logo.svg'), svgContent);
  fs.writeFileSync(path.join(publicAssetsDir, 'bhawal-logo.svg'), svgContent);
  fs.writeFileSync(path.join(srcImagesDir, 'redcore-logo.svg'), svgContent);
  fs.writeFileSync(path.join(publicAssetsDir, 'redcore-logo.svg'), svgContent);
  if (fs.existsSync(distAssetsDir)) {
    fs.writeFileSync(path.join(distAssetsDir, 'bhawal-logo.svg'), svgContent);
    fs.writeFileSync(path.join(distAssetsDir, 'redcore-logo.svg'), svgContent);
  }
  console.log('Saved pristine bhawal-logo.svg files');

  // Favicons
  await sharp(pngBuffer).resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toFile(path.join(publicDir, 'favicon-32x32.png'));
  await sharp(pngBuffer).resize(48, 48, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toFile(path.join(publicDir, 'favicon.png'));
  await sharp(pngBuffer).resize(180, 180, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toFile(path.join(publicDir, 'apple-touch-icon.png'));
  await sharp(pngBuffer).resize(192, 192, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toFile(path.join(publicDir, 'android-chrome-192x192.png'));
  await sharp(pngBuffer).resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toFile(path.join(publicDir, 'android-chrome-512x512.png'));
  console.log('Updated favicons');
}

updateLogo().catch(err => {
  console.error(err);
  process.exit(1);
});

