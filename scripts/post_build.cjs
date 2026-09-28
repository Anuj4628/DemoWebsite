const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootPath = path.join(__dirname, '..');
const distPath = path.join(rootPath, 'dist');
const indexPath = path.join(distPath, 'index.html');
const notFoundPath = path.join(distPath, '404.html');
const vercelSrc = path.join(rootPath, 'vercel.json');
const vercelDest = path.join(distPath, 'vercel.json');

// 1. Copy index.html -> 404.html
if (fs.existsSync(indexPath)) {
  fs.copyFileSync(indexPath, notFoundPath);
  console.log('✅ [Post-Build] Copied dist/index.html -> dist/404.html');
}

// 2. Copy vercel.json if present
if (fs.existsSync(vercelSrc)) {
  fs.copyFileSync(vercelSrc, vercelDest);
  console.log('✅ [Post-Build] Copied vercel.json into dist/');
}

// 3. Automatically create clean dist-deploy.zip with root-level files (no nested dist/ folder)
try {
  const zipPath = path.join(rootPath, 'dist-deploy.zip');
  if (fs.existsSync(zipPath)) {
    fs.unlinkSync(zipPath);
  }
  const cmd = `powershell -Command "Compress-Archive -Path '${distPath}\\*' -DestinationPath '${zipPath}'"`;
  execSync(cmd, { stdio: 'inherit' });
  console.log('✅ [Post-Build] Generated clean dist-deploy.zip (ready to upload to hosting)');
} catch (err) {
  console.warn('⚠️ [Post-Build] Optional zip creation warning:', err.message);
}
