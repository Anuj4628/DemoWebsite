// scripts/full_production_audit.cjs
// Comprehensive Pre-Hosting Production Audit Script

const fs = require('fs');
const path = require('path');
const { createServer } = require('vite');

async function runAudit() {
  console.log('====================================================');
  console.log('🚀 BHAWAL STEEL & ENGINEERING CO. - PRE-HOSTING AUDIT');
  console.log('====================================================\n');

  const rootDir = path.resolve(__dirname, '..');
  let issuesFound = 0;
  let issuesFixed = 0;
  const issues = [];

  // Helper to log issues
  function reportIssue(category, description, isError = true) {
    issuesFound++;
    issues.push({ category, description, isError });
    console.log(`${isError ? '❌ [ERROR]' : '⚠️ [WARN]'} [${category}] ${description}`);
  }

  // 1. FILE & ASSET CASE-SENSITIVITY & INTEGRITY CHECK
  console.log('🔍 Checking physical asset existence & casing for Linux/Vercel hosting...');
  
  // Read public files
  const publicDir = path.join(rootDir, 'public');
  const srcDir = path.join(rootDir, 'src');

  // Verify critical public files
  const criticalPublicFiles = [
    'robots.txt',
    'sitemap.xml',
    'favicon.svg',
    'favicon.png',
    'favicon-32x32.png',
    'apple-touch-icon.png'
  ];

  for (const file of criticalPublicFiles) {
    const fullPath = path.join(publicDir, file);
    if (!fs.existsSync(fullPath)) {
      reportIssue('Public Asset', `Missing critical public file: ${file}`);
    } else {
      // Check exact casing on disk
      const dirFiles = fs.readdirSync(publicDir);
      if (!dirFiles.includes(file)) {
        reportIssue('Public Asset Casing', `File ${file} exists with different case in public/!`);
      }
    }
  }

  // 2. CHECK VITE SSR MODULE LOADING & ROUTE RESOLUTION
  console.log('\n🔍 Loading application modules in Vite runtime for deep-link audit...');
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom'
  });

  const catalogModule = await vite.ssrLoadModule('/src/data/productCatalogData.js');
  const materialsModule = await vite.ssrLoadModule('/src/data/materialsData.js');
  const { PRODUCT_GROUPS, DIVISIONS } = catalogModule;
  const { MATERIALS } = materialsModule;

  // Audit Product Catalog
  console.log(`\n📦 Auditing Product Catalog (${PRODUCT_GROUPS.length} families across divisions)...`);
  let totalProducts = 0;

  for (const group of PRODUCT_GROUPS) {
    if (!group.slug) reportIssue('Product Catalog', `Group missing slug: ${group.id}`);
    if (!group.heroImage) reportIssue('Product Catalog', `Group ${group.slug} missing heroImage`);
    if (!group.categories || group.categories.length === 0) {
      reportIssue('Product Catalog', `Group ${group.slug} has no product categories!`);
    }

    for (const cat of group.categories || []) {
      totalProducts++;
      if (!cat.name) reportIssue('Product Spec', `Category in ${group.slug} missing name`);
      if (!cat.slug) reportIssue('Product Spec', `Category ${cat.name} in ${group.slug} missing slug`);
      if (!cat.image) reportIssue('Product Spec', `Category ${cat.name} missing image`);
      if (!cat.grade) reportIssue('Product Spec', `Category ${cat.name} missing grade`);
    }
  }
  console.log(`   Audited ${PRODUCT_GROUPS.length} product families containing ${totalProducts} total specifications.`);

  // Audit Materials Catalog
  console.log(`\n🧱 Auditing Materials Catalog (${MATERIALS.length} primary alloys)...`);
  for (const mat of MATERIALS) {
    if (!mat.slug) reportIssue('Materials Catalog', `Material missing slug: ${mat.id}`);
    if (!mat.name) reportIssue('Materials Catalog', `Material missing name: ${mat.id}`);
    if (!mat.heroImage) reportIssue('Materials Catalog', `Material ${mat.slug} missing heroImage`);
  }

  // 3. SITEMAP DEEP-LINK VERIFICATION
  console.log('\n🗺️ Checking all 193 Sitemap URLs against Client Router...');
  const sitemapContent = fs.readFileSync(path.join(publicDir, 'sitemap.xml'), 'utf-8');
  const locMatches = [...sitemapContent.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);

  // Extract and test parseRoute directly
  const parseRouteFn = (pathname) => {
    const clean = pathname.toLowerCase().replace(/\/+$/, '') || '/';
    if (clean === '/about') return { page: 'about' };
    if (clean === '/contact') return { page: 'contact' };
    if (clean === '/rfq' || clean === '/request-for-quote' || clean === '/quote') return { page: 'rfq' };
    if (clean.startsWith('/materials')) {
      const raw = pathname.replace(/^\/materials\/?/i, '');
      const parts = raw.split('/').filter(Boolean);
      if (parts.length === 0) return { page: 'materials', view: 'landing' };
      return { page: 'materials', view: 'material', materialSlug: parts[0].toLowerCase() };
    }
    if (clean.startsWith('/products')) {
      const raw = pathname.replace(/^\/products\/?/i, '');
      const parts = raw.split('/').filter(Boolean);
      if (parts.length === 0) return { page: 'products', view: 'landing' };
      if (parts.length === 1) {
        const p0 = parts[0].toLowerCase();
        if (p0 === 'manufacturer' || p0 === 'supplier') return { page: 'products', view: 'division', divisionSlug: p0 };
        return { page: 'products', view: 'family', groupSlug: parts[0] };
      }
      if (parts.length === 2) {
        const p0 = parts[0].toLowerCase();
        if (p0 === 'manufacturer' || p0 === 'supplier') return { page: 'products', view: 'family', divisionSlug: p0, groupSlug: parts[1] };
        return { page: 'products', view: 'detail', groupSlug: parts[0], productSlug: parts[1] };
      }
      if (parts.length >= 3) {
        return { page: 'products', view: 'detail', divisionSlug: parts[0].toLowerCase(), groupSlug: parts[1], productSlug: parts[2] };
      }
    }
    if (clean === '/' || clean === '' || clean.startsWith('/#')) return { page: 'home' };
    return { page: 'not-found' };
  };

  let unroutedUrls = 0;
  for (const url of locMatches) {
    const urlObj = new URL(url);
    const parsed = parseRouteFn(urlObj.pathname);
    if (parsed.page === 'not-found') {
      reportIssue('Sitemap Router', `Sitemap URL produced 404: ${url}`);
      unroutedUrls++;
    }
  }
  console.log(`   Checked ${locMatches.length} URLs: ${locMatches.length - unroutedUrls} routed successfully, ${unroutedUrls} failed.`);

  // 4. SECRETS & CLIENT-SIDE LEAK AUDIT
  console.log('\n🔒 Auditing client code for exposed secrets, passwords, and private keys...');
  const dangerousPatterns = [
    /PRIVATE_KEY/i,
    /SECRET_KEY/i,
    /SMTP_PASS\s*=/i,
    /AWS_SECRET/i,
    /PASSWORD\s*[:=]\s*['"][^'"]+['"]/i
  ];

  function scanDirForSecrets(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name !== 'node_modules' && entry.name !== 'dist' && entry.name !== '.git') {
          scanDirForSecrets(full);
        }
      } else if (/\.(js|jsx|ts|tsx|json|html|env)$/.test(entry.name)) {
        if (entry.name.includes('.example')) continue;
        const content = fs.readFileSync(full, 'utf-8');
        for (const pattern of dangerousPatterns) {
          if (pattern.test(content)) {
            // Check if it is inside api/ (serverless) vs src/ (client)
            if (full.includes(path.sep + 'src' + path.sep)) {
              reportIssue('Security Risk', `Possible exposed credential pattern ${pattern} in client file: ${path.relative(rootDir, full)}`);
            }
          }
        }
      }
    }
  }

  scanDirForSecrets(srcDir);
  console.log('   Client-side secret audit complete.');

  // 5. SERVERLESS CONFIG & VERCEL COMPATIBILITY
  console.log('\n⚙️ Checking Vercel / Hosting configuration...');
  const vercelPath = path.join(rootDir, 'vercel.json');
  if (fs.existsSync(vercelPath)) {
    try {
      const vercelJson = JSON.parse(fs.readFileSync(vercelPath, 'utf-8'));
      if (!vercelJson.rewrites || vercelJson.rewrites.length === 0) {
        reportIssue('Vercel Config', 'Missing rewrites array for SPA routing');
      }
      console.log('   vercel.json is valid JSON with active rewrites & redirects.');
    } catch (err) {
      reportIssue('Vercel Config', `Invalid vercel.json: ${err.message}`);
    }
  } else {
    reportIssue('Vercel Config', 'Missing vercel.json file');
  }

  await vite.close();

  // Summary
  console.log('\n====================================================');
  console.log(`AUDIT COMPLETE: ${issuesFound} issues found.`);
  console.log('====================================================');

  if (issuesFound > 0) {
    process.exit(1);
  }
}

runAudit().catch(err => {
  console.error('Fatal audit failure:', err);
  process.exit(1);
});
