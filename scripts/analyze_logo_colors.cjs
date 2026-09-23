const sharp = require('sharp');
const path = require('path');

const imgPath = 'C:/Users/anujm/.gemini/antigravity-ide/brain/5eca6899-1f7f-48c4-829d-a8e1c10e19b9/.user_uploaded/media_1790154002459.png';

async function analyze() {
  const meta = await sharp(imgPath).metadata();
  console.log('Image dimensions:', meta.width, 'x', meta.height, 'format:', meta.format);
  
  const { data, info } = await sharp(imgPath).raw().toBuffer({ resolveWithObject: true });
  const colorMap = {};
  for (let i = 0; i < data.length; i += info.channels) {
    const r = data[i], g = data[i+1], b = data[i+2];
    // ignore pure white/near white background
    if (r > 235 && g > 235 && b > 235) continue;
    // quantize
    const qr = Math.round(r / 6) * 6;
    const qg = Math.round(g / 6) * 6;
    const qb = Math.round(b / 6) * 6;
    const key = `${qr},${qg},${qb}`;
    colorMap[key] = (colorMap[key] || 0) + 1;
  }
  const sorted = Object.entries(colorMap).sort((a,b) => b[1] - a[1]).slice(0, 25);
  console.log('Top quantized non-white colors:');
  sorted.forEach(([rgb, count]) => {
    const [r, g, b] = rgb.split(',').map(Number);
    const hex = '#' + [r,g,b].map(x => x.toString(16).padStart(2, '0')).join('');
    console.log(hex, `rgb(${r}, ${g}, ${b})`, count);
  });
}
analyze().catch(console.error);
