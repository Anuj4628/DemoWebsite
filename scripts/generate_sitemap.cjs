const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://www.bhawalsteel.com';
const TODAY = new Date().toISOString().split('T')[0];

function generateSitemap() {
  const catalogPath = path.join(__dirname, '../src/data/productCatalogData.js');
  const catalogContent = fs.readFileSync(catalogPath, 'utf8');

  const materialsPath = path.join(__dirname, '../src/data/materialsData.js');
  const materialsContent = fs.readFileSync(materialsPath, 'utf8');

  // Static indexable routes
  const urls = [
    { loc: `${SITE_URL}/`, changefreq: 'daily', priority: '1.0' },
    { loc: `${SITE_URL}/about`, changefreq: 'monthly', priority: '0.8' },
    { loc: `${SITE_URL}/products`, changefreq: 'weekly', priority: '0.9' },
    { loc: `${SITE_URL}/products/manufacturer`, changefreq: 'weekly', priority: '0.8' },
    { loc: `${SITE_URL}/products/supplier`, changefreq: 'weekly', priority: '0.8' },
    { loc: `${SITE_URL}/materials`, changefreq: 'weekly', priority: '0.9' },
    { loc: `${SITE_URL}/contact`, changefreq: 'monthly', priority: '0.8' },
    { loc: `${SITE_URL}/request-for-quote`, changefreq: 'monthly', priority: '0.8' }
  ];

  // Extract materials
  const matRegex = /slug:\s*["']([a-zA-Z0-9_-]+)["'],\s*aliases:/g;
  let match;
  while ((match = matRegex.exec(materialsContent)) !== null) {
    urls.push({
      loc: `${SITE_URL}/materials/${match[1]}`,
      changefreq: 'weekly',
      priority: '0.8'
    });
  }

  // Parse product groups and categories
  // In productCatalogData.js, PRODUCT_GROUPS array has groups with divisionSlug, slug, and categories
  // Let's extract them cleanly
  const groupBlockRegex = /id:\s*["']([a-zA-Z0-9_-]+)["'],\s*slug:\s*["']([a-zA-Z0-9_-]+)["'],\s*name:\s*["']([^"']+)["'],\s*division:\s*["']([^"']+)["'],\s*divisionSlug:\s*["']([^"']+)["']/g;
  
  // Find all group starts and their ranges
  const groupPositions = [];
  while ((match = groupBlockRegex.exec(catalogContent)) !== null) {
    groupPositions.push({
      id: match[1],
      slug: match[2],
      name: match[3],
      divisionSlug: match[5],
      index: match.index
    });
  }

  groupPositions.forEach((grp, i) => {
    // Add product family route
    urls.push({
      loc: `${SITE_URL}/products/${grp.divisionSlug}/${grp.slug}`,
      changefreq: 'weekly',
      priority: '0.8'
    });

    // Extract categories within this group's text block
    const nextIndex = i < groupPositions.length - 1 ? groupPositions[i + 1].index : catalogContent.indexOf('export function', grp.index);
    const groupChunk = catalogContent.slice(grp.index, nextIndex > grp.index ? nextIndex : undefined);

    const catRegex = /id:\s*["']([a-zA-Z0-9_-]+)["'],\s*slug:\s*["']([a-zA-Z0-9_-]+)["'],\s*name:\s*["']([^"']+)["']/g;
    let catMatch;
    // Skip the first match if it matches the group itself
    while ((catMatch = catRegex.exec(groupChunk)) !== null) {
      if (catMatch[2] !== grp.slug) {
        urls.push({
          loc: `${SITE_URL}/products/${grp.divisionSlug}/${grp.slug}/${catMatch[2]}`,
          changefreq: 'weekly',
          priority: '0.7'
        });
      }
    }
  });

  // Deduplicate
  const seen = new Set();
  const uniqueUrls = [];
  for (const item of urls) {
    if (!seen.has(item.loc)) {
      seen.add(item.loc);
      uniqueUrls.push(item);
    }
  }

  // Build XML
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  for (const item of uniqueUrls) {
    xml += '  <url>\n';
    xml += `    <loc>${item.loc}</loc>\n`;
    xml += `    <lastmod>${TODAY}</lastmod>\n`;
    xml += `    <changefreq>${item.changefreq}</changefreq>\n`;
    xml += `    <priority>${item.priority}</priority>\n`;
    xml += '  </url>\n';
  }

  xml += '</urlset>\n';

  const outPath = path.join(__dirname, '../public/sitemap.xml');
  fs.writeFileSync(outPath, xml, 'utf8');
  console.log(`[Sitemap] Generated ${uniqueUrls.length} canonical URLs into public/sitemap.xml`);
}

generateSitemap();
