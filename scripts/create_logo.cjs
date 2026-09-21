const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 690 182" width="690" height="182">
  <defs>
    <linearGradient id="redGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#EF4444" />
      <stop offset="50%" stop-color="#DC2626" />
      <stop offset="100%" stop-color="#991B1B" />
    </linearGradient>
    <linearGradient id="steelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#334155" />
      <stop offset="100%" stop-color="#0F172A" />
    </linearGradient>
  </defs>

  <!-- Industrial Geometric Emblem -->
  <g transform="translate(24, 16)">
    <!-- Outer Hex -->
    <path d="M75 5 L140 42 L140 108 L75 145 L10 108 L10 42 Z" fill="url(#steelGrad)" stroke="#1E293B" stroke-width="2" />
    <!-- Inner Core Red Facet Left -->
    <path d="M75 16 L22 47 L22 103 L75 134 L75 75 Z" fill="url(#redGrad)" />
    <!-- Inner Core Red Facet Right -->
    <path d="M75 16 L128 47 L128 103 L75 134 L75 75 Z" fill="#B91C1C" />
    <!-- Center Precision Ingot Cut -->
    <polygon points="75,34 114,57 114,93 75,116 36,93 36,57" fill="#7F1D1D" />
    <polygon points="75,44 104,61 104,89 75,106 46,89 46,61" fill="url(#redGrad)" />
    <!-- Molten Core Diamond Accent -->
    <polygon points="75,58 91,75 75,92 59,75" fill="#FFFFFF" opacity="0.95" />
    <!-- Horizontal Molten Spark Line -->
    <line x1="18" y1="75" x2="132" y2="75" stroke="#F87171" stroke-width="2.5" stroke-linecap="round" opacity="0.8" />
  </g>

  <!-- Typography: REDCORE STEELS -->
  <!-- 'RED' in Red Gradient -->
  <text x="190" y="102" font-family="'Montserrat', 'Segoe UI', sans-serif" font-size="74" font-weight="900" letter-spacing="-1" fill="url(#redGrad)">RED</text>
  <!-- 'CORE' in Dark Industrial Steel -->
  <text x="365" y="102" font-family="'Montserrat', 'Segoe UI', sans-serif" font-size="74" font-weight="900" letter-spacing="-1" fill="#0F172A">CORE</text>

  <!-- Subtitle Bar -->
  <rect x="194" y="122" width="465" height="3" fill="url(#redGrad)" rx="1.5" />
  <text x="196" y="150" font-family="'Space Grotesk', 'Segoe UI', sans-serif" font-size="22" font-weight="700" letter-spacing="12" fill="#475569">STEELS &amp; ALLOYS</text>
</svg>`;

async function main() {
  const targetDir = path.resolve(__dirname, '../src/assets/images');
  const publicAssetsDir = path.resolve(__dirname, '../public/assets');
  const publicDir = path.resolve(__dirname, '../public');

  if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });
  if (!fs.existsSync(publicAssetsDir)) fs.mkdirSync(publicAssetsDir, { recursive: true });

  const svgPath = path.join(targetDir, 'redcore-logo.svg');
  fs.writeFileSync(svgPath, svgContent);

  const pngBuffer = await sharp(Buffer.from(svgContent))
    .resize(690, 182)
    .png()
    .toBuffer();

  fs.writeFileSync(path.join(targetDir, 'redcore-logo.png'), pngBuffer);
  fs.writeFileSync(path.join(publicAssetsDir, 'redcore-logo.png'), pngBuffer);
  // Also overwrite existing logo files so all legacy references automatically show Redcore
  fs.writeFileSync(path.join(targetDir, 'jubilant-logo.png'), pngBuffer);
  fs.writeFileSync(path.join(publicAssetsDir, 'jubilant-logo.png'), pngBuffer);

  // Favicon SVG (icon mark only)
  const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width="48" height="48">
  <defs>
    <linearGradient id="redGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#EF4444" />
      <stop offset="50%" stop-color="#DC2626" />
      <stop offset="100%" stop-color="#991B1B" />
    </linearGradient>
    <linearGradient id="steelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#334155" />
      <stop offset="100%" stop-color="#0F172A" />
    </linearGradient>
  </defs>
  <g transform="translate(5, 7)">
    <path d="M75 5 L140 42 L140 108 L75 145 L10 108 L10 42 Z" fill="url(#steelGrad)" stroke="#1E293B" stroke-width="2" />
    <path d="M75 16 L22 47 L22 103 L75 134 L75 75 Z" fill="url(#redGrad)" />
    <path d="M75 16 L128 47 L128 103 L75 134 L75 75 Z" fill="#B91C1C" />
    <polygon points="75,34 114,57 114,93 75,116 36,93 36,57" fill="#7F1D1D" />
    <polygon points="75,44 104,61 104,89 75,106 46,89 46,61" fill="url(#redGrad)" />
    <polygon points="75,58 91,75 75,92 59,75" fill="#FFFFFF" opacity="0.95" />
    <line x1="18" y1="75" x2="132" y2="75" stroke="#F87171" stroke-width="2.5" stroke-linecap="round" opacity="0.8" />
  </g>
</svg>`;
  fs.writeFileSync(path.join(publicDir, 'favicon.svg'), faviconSvg);

  console.log('Successfully generated REDCORE logo and favicon assets.');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
