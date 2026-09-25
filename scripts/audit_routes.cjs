const fs = require('fs');
const path = require('path');

// Extract routes from productCatalogData
const catalogFile = fs.readFileSync(path.join(__dirname, '../src/data/productCatalogData.js'), 'utf8');

// Match PRODUCT_GROUPS
const groups = [];
const groupRegex = /id:\s*["']([a-zA-Z0-9_-]+)["'],\s*slug:\s*["']([a-zA-Z0-9_-]+)["'],\s*name:\s*["']([^"']+)["'],\s*division:\s*["']([^"']+)["'],\s*divisionSlug:\s*["']([^"']+)["']/g;
let m;
while ((m = groupRegex.exec(catalogFile)) !== null) {
  groups.push({
    id: m[1],
    slug: m[2],
    name: m[3],
    division: m[4],
    divisionSlug: m[5]
  });
}

// Extract categories
const categoryRegex = /id:\s*["']([a-zA-Z0-9_-]+)["'],\s*slug:\s*["']([a-zA-Z0-9_-]+)["'],\s*name:\s*["']([^"']+)["']/g;
let catMatches = 0;
while ((m = categoryRegex.exec(catalogFile)) !== null) {
  catMatches++;
}

// Materials
const materialsFile = fs.readFileSync(path.join(__dirname, '../src/data/materialsData.js'), 'utf8');
const matRegex = /slug:\s*["']([a-zA-Z0-9_-]+)["'],\s*aliases:/g;
const materials = [];
while ((m = matRegex.exec(materialsFile)) !== null) {
  materials.push(m[1]);
}

console.log('Total Product Groups:', groups.length);
console.log('Sample Groups:', groups.slice(0, 4));
console.log('Total Categories/Products in Catalog:', catMatches);
console.log('Materials (' + materials.length + '):', materials);
