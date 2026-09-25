// scripts/test_seo_routes.cjs
// Script to comprehensively verify URL resolution, titles, canonicals, metadata, and breadcrumbs using Vite's SSR runtime.

const { createServer } = require('vite');
const path = require('path');

async function runTests() {
  console.log('🧪 Starting SEO Engine & URL Verification Test via Vite runtime...\n');
  
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom'
  });

  const seoManager = await vite.ssrLoadModule('/src/utils/seoManager.js');
  const { resolveRouteMetadata } = seoManager;
  
  const testRoutes = [
    {
      name: 'Homepage',
      route: { page: 'home' },
      expectedCanonical: 'https://www.bhawalsteel.com/',
      titleMustInclude: 'Bhawal Steel & Engineering Company'
    },
    {
      name: 'About Us',
      route: { page: 'about' },
      expectedCanonical: 'https://www.bhawalsteel.com/about',
      titleMustInclude: 'About Us | Bhawal Steel & Engineering Company'
    },
    {
      name: 'Contact Page',
      route: { page: 'contact' },
      expectedCanonical: 'https://www.bhawalsteel.com/contact',
      titleMustInclude: 'Contact Us | Bhawal Steel & Engineering Company'
    },
    {
      name: 'RFQ / Quote Page',
      route: { page: 'rfq' },
      expectedCanonical: 'https://www.bhawalsteel.com/request-for-quote',
      titleMustInclude: 'Request for Quote'
    },
    {
      name: 'Products Catalog Root',
      route: { page: 'products', view: 'landing' },
      expectedCanonical: 'https://www.bhawalsteel.com/products',
      titleMustInclude: 'Industrial Metal Products & Components'
    },
    {
      name: 'Manufacturer Division',
      route: { page: 'products', view: 'division', divisionSlug: 'manufacturer' },
      expectedCanonical: 'https://www.bhawalsteel.com/products/manufacturer',
      titleMustInclude: 'Manufacturer Division'
    },
    {
      name: 'Product Family (Flanges)',
      route: { page: 'products', view: 'family', divisionSlug: 'manufacturer', groupSlug: 'flanges' },
      expectedCanonical: 'https://www.bhawalsteel.com/products/manufacturer/flanges',
      titleMustInclude: 'Flanges'
    },
    {
      name: 'Product Category (Stainless Steel Flanges)',
      route: { page: 'products', view: 'detail', divisionSlug: 'manufacturer', groupSlug: 'flanges', productSlug: 'stainless-steel' },
      expectedCanonical: 'https://www.bhawalsteel.com/products/manufacturer/flanges/stainless-steel',
      titleMustInclude: 'Flanges'
    },
    {
      name: 'Materials Root',
      route: { page: 'materials', view: 'landing' },
      expectedCanonical: 'https://www.bhawalsteel.com/materials',
      titleMustInclude: 'Materials & Metallurgical Alloys'
    },
    {
      name: 'Material Grade (Stainless Steel)',
      route: { page: 'materials', view: 'material', materialSlug: 'stainless-steel' },
      expectedCanonical: 'https://www.bhawalsteel.com/materials/stainless-steel',
      titleMustInclude: 'Stainless Steel'
    },
    {
      name: 'Material Grade Category (304 / 304L Sheet)',
      route: { page: 'materials', view: 'category', materialSlug: 'stainless-steel', productSlug: '304-304l-sheet-plate' },
      expectedCanonical: 'https://www.bhawalsteel.com/materials/stainless-steel/304-304l-sheet-plate',
      titleMustInclude: 'Sheet'
    },
    {
      name: '404 Page Not Found',
      route: { page: '404' },
      expectedCanonical: 'https://www.bhawalsteel.com/404',
      titleMustInclude: 'Page Not Found'
    }
  ];

  let passed = 0;
  let failed = 0;

  for (const t of testRoutes) {
    const meta = resolveRouteMetadata(t.route);
    
    let ok = true;
    if (meta.canonical !== t.expectedCanonical) {
      console.error(`❌ [${t.name}] Canonical mismatch. Got: "${meta.canonical}", Expected: "${t.expectedCanonical}"`);
      ok = false;
    }
    if (!meta.title || !meta.title.includes(t.titleMustInclude)) {
      console.error(`❌ [${t.name}] Title mismatch. Got: "${meta.title}", Expected to include: "${t.titleMustInclude}"`);
      ok = false;
    }
    if (!meta.description || meta.description.length < 30) {
      console.error(`❌ [${t.name}] Description too short or missing. Got: "${meta.description}"`);
      ok = false;
    }
    if (!meta.breadcrumbs || meta.breadcrumbs.length === 0) {
      console.error(`❌ [${t.name}] Missing breadcrumbs.`);
      ok = false;
    }
    if (!meta.openGraph || !meta.openGraph.title || !meta.openGraph.image) {
      console.error(`❌ [${t.name}] Incomplete Open Graph metadata.`);
      ok = false;
    }

    if (ok) {
      console.log(`✅ [${t.name}] Pass`);
      console.log(`   Title: ${meta.title}`);
      console.log(`   Canonical: ${meta.canonical}`);
      console.log(`   Desc: ${meta.description.slice(0, 80)}...`);
      console.log(`   Breadcrumbs: ${meta.breadcrumbs.map(b => b.name).join(' > ')}\n`);
      passed++;
    } else {
      failed++;
    }
  }

  await vite.close();

  console.log(`\n========================================`);
  console.log(`Results: ${passed} passed, ${failed} failed out of ${testRoutes.length}`);
  console.log(`========================================`);

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch(err => {
  console.error('Test execution error:', err);
  process.exit(1);
});
