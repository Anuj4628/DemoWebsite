import fs from 'fs';
import sharp from 'sharp';

async function convert() {
  const svg = fs.readFileSync('src/assets/images/redcore-logo.svg');
  await sharp(svg).resize(690, 182).png().toFile('src/assets/images/redcore-logo.png');
  fs.copyFileSync('src/assets/images/redcore-logo.png', 'public/assets/redcore-logo.png');
  console.log('Done converting logo!');
}

convert().catch(console.error);
