const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function processLogo() {
  const sourceImage = 'C:\\Users\\anujm\\.gemini\\antigravity-ide\\brain\\5eca6899-1f7f-48c4-829d-a8e1c10e19b9\\.user_uploaded\\media_1790150126701.jpg';
  
  if (!fs.existsSync(sourceImage)) {
    console.error('Source image does not exist:', sourceImage);
    process.exit(1);
  }

  const srcImagesDir = path.resolve('src/assets/images');
  const publicAssetsDir = path.resolve('public/assets');
  const publicDir = path.resolve('public');

  fs.mkdirSync(srcImagesDir, { recursive: true });
  fs.mkdirSync(publicAssetsDir, { recursive: true });
  fs.mkdirSync(publicDir, { recursive: true });

  console.log('Reading source image...');
  const image = sharp(sourceImage);
  const metadata = await image.metadata();
  console.log(`Original image size: ${metadata.width}x${metadata.height}, format: ${metadata.format}`);

  const highResPng = await sharp(sourceImage)
    .png({ quality: 100 })
    .toBuffer();

  // Save main logo files
  fs.writeFileSync(path.join(srcImagesDir, 'bhawal-logo.png'), highResPng);
  fs.writeFileSync(path.join(publicAssetsDir, 'bhawal-logo.png'), highResPng);
  console.log('Saved bhawal-logo.png to src/assets/images and public/assets');

  // Overwrite legacy logo files so any old direct references safely point to Bhawal logo
  fs.writeFileSync(path.join(srcImagesDir, 'redcore-logo.png'), highResPng);
  fs.writeFileSync(path.join(publicAssetsDir, 'redcore-logo.png'), highResPng);

  // Generate favicons in multiple standard sizes
  await sharp(sourceImage).resize(32, 32).png().toFile(path.join(publicDir, 'favicon-32x32.png'));
  await sharp(sourceImage).resize(48, 48).png().toFile(path.join(publicDir, 'favicon.png'));
  await sharp(sourceImage).resize(180, 180).png().toFile(path.join(publicDir, 'apple-touch-icon.png'));
  await sharp(sourceImage).resize(192, 192).png().toFile(path.join(publicDir, 'android-chrome-192x192.png'));
  await sharp(sourceImage).resize(512, 512).png().toFile(path.join(publicDir, 'android-chrome-512x512.png'));
  console.log('Generated favicon pngs');

  // Generate SVG favicon with embedded base64 client logo for sharp SVG browser rendering
  const base64Logo = highResPng.toString('base64');
  const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <image href="data:image/png;base64,${base64Logo}" width="512" height="512" preserveAspectRatio="xMidYMid meet"/>
</svg>`;
  fs.writeFileSync(path.join(publicDir, 'favicon.svg'), faviconSvg);
  fs.writeFileSync(path.join(publicAssetsDir, 'redcore-logo.svg'), faviconSvg);
  fs.writeFileSync(path.join(srcImagesDir, 'redcore-logo.svg'), faviconSvg);
  fs.writeFileSync(path.join(srcImagesDir, 'bhawal-logo.svg'), faviconSvg);
  console.log('Generated favicon.svg and SVG logo wrappers');

  console.log('Logo processing completed successfully!');
}

processLogo().catch(err => {
  console.error('Error processing logo:', err);
  process.exit(1);
});
