// ======================================================================
// REDCORE STEELS — CENTRAL MATERIALS DATABASE
// Dedicated Single Source of Truth for the 9 Metallurgical Materials
// ======================================================================

import { PRODUCT_GROUPS } from './productCatalogData';

// Dedicated material category images (user-curated, one per material)
import imgAlloySteel from '../assets/Product Section/Material Imges/alloy steel.jpg';
import imgCarbon from '../assets/Product Section/Material Imges/carbon.png';
import imgDuplex from '../assets/Product Section/Material Imges/duplex.jpg';
import imgExoticAlloy from '../assets/Product Section/Material Imges/exotic.jpeg';
import imgHighAlloy from '../assets/Product Section/Material Imges/high Alloy.webp';
import imgNickelAlloy from '../assets/Product Section/Material Imges/nikle alloy.png';
import imgStainlessSteel from '../assets/Product Section/Material Imges/stainless steel.jpg';
import imgSuperDuplex from '../assets/Product Section/Material Imges/super duplex.webp';
import imgTitanium from '../assets/Product Section/Material Imges/titanium.png';

/**
 * The EXACT 9 Material Categories required by Redcore Steels
 */
export const MATERIALS = [
  {
    id: 'alloy-steel',
    name: 'Alloy Steel',
    slug: 'alloy-steel',
    aliases: ['alloy-steel', 'alloy'],
    badge: 'ALLOY STEEL',
    grade: 'ASTM A335 / A234 P11, P22, P5, P9, P91, F11, F22',
    shortDesc: 'Chrome-moly heat-resistant alloy steel engineered for elevated temperature, high pressure, and creep resistance in thermal power and refinery environments.',
    image: imgAlloySteel,
    heroImage: imgAlloySteel,
    standards: ['ASTM A335', 'ASME SA234', 'DIN 17175', 'EN 10216-2', 'IBR Certified'],
    keyAttributes: ['High Creep Strength', 'High Temperature Stability', 'Superior Fatigue Life']
  },
  {
    id: 'carbon',
    name: 'Carbon',
    slug: 'carbon',
    aliases: ['carbon', 'carbon-steel'],
    badge: 'CARBON STEEL',
    grade: 'ASTM A105, A106 Gr.B, A234 WPB, API 5L X42-X70',
    shortDesc: 'High-integrity structural carbon steel engineered with superior tensile strength and impact toughness for oil, gas, petrochemical, and structural piping systems.',
    image: imgCarbon,
    heroImage: imgCarbon,
    standards: ['ASTM A105', 'ASTM A106', 'ASTM A234', 'API 5L', 'ASME B16.9', 'IBR Certified'],
    keyAttributes: ['High Tensile Toughness', 'Cost-Effective Reliability', 'Broad Pressure Rating']
  },
  {
    id: 'duplex',
    name: 'Duplex',
    slug: 'duplex',
    aliases: ['duplex', 'duplex-steel'],
    badge: 'DUPLEX STEEL',
    grade: 'UNS S31803 / UNS S32205 (Alloy 2205)',
    shortDesc: 'Austenitic-ferritic dual-phase microstructure providing twice the mechanical yield strength of standard stainless steels with exceptional resistance to pitting and stress corrosion cracking.',
    image: imgDuplex,
    heroImage: imgDuplex,
    standards: ['ASTM A182 F51', 'ASTM A815', 'ASTM A790', 'NACE MR0175', 'EN 10088-3'],
    keyAttributes: ['Dual-Phase Microstructure', '2x Stainless Yield Strength', 'Chloride Pitting Immunity']
  },
  {
    id: 'exotic-alloy',
    name: 'Exotic Alloy',
    slug: 'exotic-alloy',
    aliases: ['exotic-alloy', 'exotic-alloys', 'exotic'],
    badge: 'EXOTIC ALLOY',
    grade: 'Tantalum, Zirconium 702, Incoloy 825, Nimonic 80A',
    shortDesc: 'Advanced refractory and specialized specialty metals formulated for nuclear reactors, aerospace propulsion, defense systems, and aggressive chemical processing.',
    image: imgExoticAlloy,
    heroImage: imgExoticAlloy,
    standards: ['ASTM B564', 'ASTM B366', 'ASME SB564', 'AMS Specifications', 'ISO 9001'],
    keyAttributes: ['Refractory Durability', 'Nuclear & Aerospace Grade', 'Extreme Media Resilience']
  },
  {
    id: 'high-alloy',
    name: 'High Alloy',
    slug: 'high-alloy',
    aliases: ['high-alloy', 'high-alloys'],
    badge: 'HIGH ALLOY',
    grade: 'Sanicro 28, Alloy 20, Carpenter 20Cb-3, AL-6XN',
    shortDesc: 'Specialty high-molybdenum and chromium superalloys engineered to withstand severe sulfuric acid, phosphoric acid, and aggressive halide environments.',
    image: imgHighAlloy,
    heroImage: imgHighAlloy,
    standards: ['ASTM B462', 'ASTM B464', 'ASTM B473', 'NACE MR0103', 'DIN 2.4660'],
    keyAttributes: ['Sulfuric Acid Immunity', 'High PREN Rating', 'Severe Crevice Resistance']
  },
  {
    id: 'nickel-alloy',
    name: 'Nickel Alloy',
    slug: 'nickel-alloy',
    aliases: ['nickel-alloy', 'nickel-alloys', 'nickel'],
    badge: 'NICKEL ALLOY',
    grade: 'Inconel 600/625, Monel 400, Hastelloy C276, Nickel 200/201',
    shortDesc: 'Extreme-temperature and severe corrosion-resistant nickel formulations engineered for petrochemical crackers, marine scrubbers, and severe acid service.',
    image: imgNickelAlloy,
    heroImage: imgNickelAlloy,
    standards: ['ASTM B564', 'ASTM B366', 'ASME SB564', 'DIN 17744', 'NACE MR0175'],
    keyAttributes: ['High Thermal Stability', 'Severe Caustic Resistance', 'Zero Stress Corrosion']
  },
  {
    id: 'stainless-steel',
    name: 'Stainless Steel',
    slug: 'stainless-steel',
    aliases: ['stainless-steel', 'stainless', 'stainles-steel'],
    badge: 'STAINLESS STEEL',
    grade: 'AISI 304 / 304L / 316 / 316L / 321 / 347 / 904L',
    shortDesc: 'Austenitic stainless steels providing superior corrosion resistance, hygienic purity, and outstanding fabrication properties for pharmaceutical, food, and industrial piping.',
    image: imgStainlessSteel,
    heroImage: imgStainlessSteel,
    standards: ['ASTM A182', 'ASTM A403', 'ASTM A312', 'ASME B16.5', 'DIN 17440', 'EN 10204 3.1'],
    keyAttributes: ['Hygienic Surface Finish', 'Broad Chemical Compatibility', 'Superior Formability']
  },
  {
    id: 'super-duplex',
    name: 'Super Duplex',
    slug: 'super-duplex',
    aliases: ['super-duplex', 'super-duplex-steel'],
    badge: 'SUPER DUPLEX',
    grade: 'UNS S32750 (2507) / UNS S32760 (Zeron 100)',
    shortDesc: 'Ultra-high PREN (>42) super duplex alloys specifically engineered for subsea risers, aggressive offshore seawater systems, and high-pressure chemical installations.',
    image: imgSuperDuplex,
    heroImage: imgSuperDuplex,
    standards: ['ASTM A182 F53/F55', 'ASTM A815', 'NORSOK M-650', 'NACE MR0175', 'EN 10088'],
    keyAttributes: ['PREN > 42 Guarantee', 'Subsea Seawater Immunity', 'High Mechanical Toughness']
  },
  {
    id: 'titanium',
    name: 'Titanium',
    slug: 'titanium',
    aliases: ['titanium', 'titanium-alloy', 'titanium-alloys'],
    badge: 'TITANIUM',
    grade: 'Grade 1, Grade 2, Grade 5 (Ti-6Al-4V), Grade 7',
    shortDesc: 'Exceptional strength-to-weight ratio with near-total immunity to saltwater pitting, sour gas, and oxidizing acids for aerospace, marine, and chemical plant applications.',
    image: imgTitanium,
    heroImage: imgTitanium,
    standards: ['ASTM B381', 'ASTM B363', 'ASTM B338', 'ASME SB381', 'AMS 4928'],
    keyAttributes: ['Ultra-High Strength-to-Weight', '100% Saltwater Immunity', 'Hypersonic Temperature Tolerance']
  }
];

/**
 * Normalizes a category slug or material name to its canonical material slug
 */
export function normalizeMaterialSlug(raw) {
  if (!raw) return '';
  const s = String(raw).toLowerCase().trim();

  if (s.startsWith('alloy-steel') || s === 'alloy steel') return 'alloy-steel';
  if (s.startsWith('carbon') || s === 'carbon steel') return 'carbon';
  if (s === 'duplex' || s === 'duplex steel' || s.startsWith('duplex-')) return 'duplex';
  if (s.startsWith('exotic') || s === 'exotic alloys') return 'exotic-alloy';
  if (s.startsWith('high-alloy') || s === 'high alloys' || s === 'high alloy') return 'high-alloy';
  if (s.startsWith('nickel') || s === 'nickel alloys' || s === 'nickel alloy') return 'nickel-alloy';
  if (s.startsWith('stainless') || s.startsWith('stainles') || s === 'stainless steel') return 'stainless-steel';
  if (s.startsWith('super-duplex') || s === 'super duplex steel' || s === 'super duplex') return 'super-duplex';
  if (s.startsWith('titanium') || s.startsWith('titainium') || s === 'titanium alloys') return 'titanium';

  return s;
}

/**
 * Get all 9 materials enriched with their live product counts
 */
export function getAllMaterials() {
  return MATERIALS.map(mat => {
    const products = getProductsByMaterial(mat.slug);
    return {
      ...mat,
      productCount: products.length
    };
  });
}

/**
 * Lookup a material by its canonical slug or any valid alias
 */
export function getMaterialBySlug(slug) {
  if (!slug) return null;
  const canonical = normalizeMaterialSlug(slug);
  return MATERIALS.find(m => m.slug === canonical || m.aliases.includes(slug.toLowerCase().trim())) || null;
}

/**
 * Pre-cached product list indexed by material slug
 */
const _productsByMaterial = new Map();

function buildMaterialIndex() {
  _productsByMaterial.clear();

  // Initialize arrays for all 9 materials
  MATERIALS.forEach(m => {
    _productsByMaterial.set(m.slug, []);
  });

  // Distribute all products across the 9 materials
  PRODUCT_GROUPS.forEach(group => {
    (group.categories || []).forEach(cat => {
      const canonical = normalizeMaterialSlug(cat.slug) || normalizeMaterialSlug(cat.materialName);
      const list = _productsByMaterial.get(canonical);
      if (list) {
        list.push({
          ...cat,
          groupName: group.name,
          groupSlug: group.slug,
          division: group.division,
          divisionSlug: group.divisionSlug,
          detailUrl: `/products/${group.divisionSlug}/${group.slug}/${cat.slug}`
        });
      }
    });
  });
}

// Build index immediately
buildMaterialIndex();

/**
 * Get all existing products that belong strictly to this material
 */
export function getProductsByMaterial(materialSlug) {
  const canonical = normalizeMaterialSlug(materialSlug);
  return _productsByMaterial.get(canonical) || [];
}

/**
 * Get the distinct product families/groups that have products for this material
 * (e.g. Flanges, Butt Weld Fittings, Fasteners, etc.)
 */
export function getMaterialCategories(materialSlug) {
  const products = getProductsByMaterial(materialSlug);
  const map = new Map();

  products.forEach(p => {
    if (!map.has(p.groupSlug)) {
      map.set(p.groupSlug, {
        slug: p.groupSlug,
        name: p.groupName,
        divisionSlug: p.divisionSlug,
        count: 0
      });
    }
    map.get(p.groupSlug).count += 1;
  });

  return Array.from(map.values());
}
