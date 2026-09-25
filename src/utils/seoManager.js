/**
 * Bhawal Steel & Engineering Company — Production-Ready SEO Manager
 * Centralized, zero-dependency utility that manages title, meta tags,
 * canonical URLs, Open Graph, Twitter Cards, and JSON-LD structured data.
 */

import { brandDetails } from '../data/navigationData.js';
import { getProductGroup, getProductCategory, DIVISIONS } from '../data/productCatalogData.js';
import { getMaterialBySlug } from '../data/materialsData.js';

const SITE_URL = 'https://www.bhawalsteel.com';
const DEFAULT_IMAGE = `${SITE_URL}/assets/bhawal-logo.png`;
const COMPANY_NAME = 'Bhawal Steel & Engineering Company';

/**
 * Helper to update or create a <meta> tag by name or property attribute
 */
function setMetaTag(attribute, value, content) {
  if (!content) return;
  let element = document.querySelector(`meta[${attribute}="${value}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, value);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

/**
 * Helper to update or create a <link> tag by rel attribute
 */
function setLinkTag(rel, href) {
  if (!href) return;
  let element = document.querySelector(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
}

/**
 * Helper to inject or update JSON-LD structured data script
 */
function setJsonLd(id, data) {
  let script = document.getElementById(id);
  if (!script) {
    script = document.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data, null, 2);
}

/**
 * Remove an injected JSON-LD script if not needed on this route
 */
function removeJsonLd(id) {
  const script = document.getElementById(id);
  if (script && script.parentNode) {
    script.parentNode.removeChild(script);
  }
}

/**
 * Generates the Organization & LocalBusiness JSON-LD schema
 */
export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#organization`,
    name: COMPANY_NAME,
    legalName: COMPANY_NAME,
    alternateName: ['Bhawal Steel', 'BSEC Mumbai'],
    description:
      'Premier manufacturer, stockist, and global exporter of high-grade industrial steel plates, sheets, precision pipes, fittings, flanges, and round bars in Mumbai, India.',
    url: SITE_URL,
    logo: `${SITE_URL}/assets/bhawal-logo.png`,
    image: `${SITE_URL}/assets/bhawal-logo.png`,
    telephone: brandDetails.contact.phone1Raw,
    email: brandDetails.contact.email,
    priceRange: '$$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: brandDetails.contact.addressStreet,
      addressLocality: 'Mumbai',
      addressRegion: 'Maharashtra',
      postalCode: '400004',
      addressCountry: 'IN'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 18.9568,
      longitude: 72.8258
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:30',
        closes: '18:30'
      }
    ],
    sameAs: [
      brandDetails.contact.whatsAppUrl,
      'https://maps.google.com/?cid=139+Sant+Sena+Maharaja+Marg+Mumbai'
    ]
  };
}

/**
 * Generates the WebSite JSON-LD schema
 */
export function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: COMPANY_NAME,
    publisher: {
      '@id': `${SITE_URL}/#organization`
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/products?search={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  };
}

/**
 * Computes raw route SEO metadata
 */
function computeRouteMetadata(route = {}) {
  const { page, view, divisionSlug, groupSlug, productSlug, materialSlug } = route;

  // 1. ABOUT PAGE
  if (page === 'about') {
    return {
      title: `About Us | ${COMPANY_NAME} — Metallurgy, Heritage & Supply`,
      description:
        'Discover the 25-year metallurgical legacy of Bhawal Steel & Engineering Company. ISO 9001:2015 certified manufacturer, stockist, and global exporter of industrial steel alloys based in Mumbai, India.',
      canonical: `${SITE_URL}/about`,
      ogType: 'website',
      ogImage: DEFAULT_IMAGE,
      breadcrumbs: [
        { name: 'Home', url: `${SITE_URL}/` },
        { name: 'About Us', url: `${SITE_URL}/about` }
      ]
    };
  }

  // 2. CONTACT PAGE
  if (page === 'contact') {
    return {
      title: `Contact Us | ${COMPANY_NAME} — Sales & Technical Desk`,
      description:
        'Contact Bhawal Steel & Engineering Company technical engineering and commercial sales desk in Mumbai. Submit RFQ inquiries for industrial steel pipes, fittings, flanges, plates, and fasteners with fast pricing.',
      canonical: `${SITE_URL}/contact`,
      ogType: 'website',
      ogImage: DEFAULT_IMAGE,
      breadcrumbs: [
        { name: 'Home', url: `${SITE_URL}/` },
        { name: 'Contact Us', url: `${SITE_URL}/contact` }
      ]
    };
  }

  // 3. REQUEST FOR QUOTE (RFQ) PAGE
  if (page === 'rfq') {
    return {
      title: `Request for Quote (RFQ) | ${COMPANY_NAME}`,
      description:
        'Submit a formal Request for Quote (RFQ) to Bhawal Steel & Engineering Company for project supply of pipes, fittings, flanges, sheets, and fasteners with mill test certification.',
      canonical: `${SITE_URL}/request-for-quote`,
      ogType: 'website',
      ogImage: DEFAULT_IMAGE,
      breadcrumbs: [
        { name: 'Home', url: `${SITE_URL}/` },
        { name: 'Request for Quote', url: `${SITE_URL}/request-for-quote` }
      ]
    };
  }

  // 4. MATERIALS CATALOG
  if (page === 'materials') {
    if ((view === 'material' || view === 'detail' || view === 'category') && materialSlug) {
      const mat = getMaterialBySlug(materialSlug);
      const matName = mat?.name || materialSlug.replace(/-/g, ' ').toUpperCase();
      const grades = mat?.grade ? ` (${mat.grade})` : '';

      if (productSlug) {
        const itemCanonical = `${SITE_URL}/materials/${mat?.slug || materialSlug}/${productSlug}`;
        const itemTitle = productSlug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
        return {
          title: `${itemTitle} | ${matName} Products | ${COMPANY_NAME}`,
          description: `Certified ${itemTitle} in ${matName} alloys supplied to industrial standards by ${COMPANY_NAME}.`,
          canonical: itemCanonical,
          ogType: 'product',
          ogImage: mat?.heroImage || DEFAULT_IMAGE,
          breadcrumbs: [
            { name: 'Home', url: `${SITE_URL}/` },
            { name: 'Materials', url: `${SITE_URL}/materials` },
            { name: matName, url: `${SITE_URL}/materials/${mat?.slug || materialSlug}` },
            { name: itemTitle, url: itemCanonical }
          ]
        };
      }

      return {
        title: `${matName} Products & Alloys${grades} | ${COMPANY_NAME}`,
        description:
          mat?.shortDesc ||
          `Browse high-integrity ${matName} industrial piping components, fittings, flanges, and round bars supplied globally by ${COMPANY_NAME}.`,
        canonical: `${SITE_URL}/materials/${mat?.slug || materialSlug}`,
        ogType: 'website',
        ogImage: mat?.heroImage || DEFAULT_IMAGE,
        breadcrumbs: [
          { name: 'Home', url: `${SITE_URL}/` },
          { name: 'Materials', url: `${SITE_URL}/materials` },
          { name: matName, url: `${SITE_URL}/materials/${mat?.slug || materialSlug}` }
        ]
      };
    }

    return {
      title: `Materials & Metallurgical Alloys Catalog | ${COMPANY_NAME}`,
      description:
        'Explore Bhawal Steel & Engineering Company’s 9 standardized material categories: Stainless Steel, Carbon Steel, Duplex, Super Duplex, Alloy Steel, Inconel, and Titanium with EN 10204 3.1 & 3.2 certification.',
      canonical: `${SITE_URL}/materials`,
      ogType: 'website',
      ogImage: DEFAULT_IMAGE,
      breadcrumbs: [
        { name: 'Home', url: `${SITE_URL}/` },
        { name: 'Materials', url: `${SITE_URL}/materials` }
      ]
    };
  }

  // 5. PRODUCTS CATALOG
  if (page === 'products') {
    // 5a. PRODUCT DETAIL
    if (view === 'detail' && productSlug) {
      const product = getProductCategory(divisionSlug, groupSlug, productSlug);
      if (product) {
        const divSlug = product.divisionSlug || divisionSlug || 'manufacturer';
        const grpSlug = product.groupSlug || groupSlug;
        const canonical = `${SITE_URL}/products/${divSlug}/${grpSlug}/${product.slug}`;
        const desc =
          product.shortDesc ||
          product.description ||
          `Certified ${product.name} (Grade: ${product.grade}) engineered to ASTM and ASME standards by ${COMPANY_NAME}.`;

        return {
          title: `${product.name} | ${product.grade} | ${COMPANY_NAME}`,
          description: desc.slice(0, 160),
          canonical,
          ogType: 'product',
          ogImage: product.image || DEFAULT_IMAGE,
          productData: product,
          breadcrumbs: [
            { name: 'Home', url: `${SITE_URL}/` },
            { name: 'Products', url: `${SITE_URL}/products` },
            { name: product.groupName, url: `${SITE_URL}/products/${divSlug}/${grpSlug}` },
            { name: product.name, url: canonical }
          ]
        };
      }
    }

    // 5b. PRODUCT FAMILY (GROUP)
    if (view === 'family' && groupSlug) {
      const group = getProductGroup(divisionSlug, groupSlug);
      if (group) {
        const divSlug = group.divisionSlug || divisionSlug || 'manufacturer';
        const canonical = `${SITE_URL}/products/${divSlug}/${group.slug}`;
        const desc =
          group.shortDesc ||
          group.tagline ||
          `Explore complete ${group.name} range manufactured and supplied in accordance with ASME/ANSI codes by ${COMPANY_NAME}.`;

        return {
          title: `${group.name} | Industrial Catalog | ${COMPANY_NAME}`,
          description: desc.slice(0, 160),
          canonical,
          ogType: 'website',
          ogImage: group.heroImage || DEFAULT_IMAGE,
          breadcrumbs: [
            { name: 'Home', url: `${SITE_URL}/` },
            { name: 'Products', url: `${SITE_URL}/products` },
            { name: group.name, url: canonical }
          ]
        };
      }
    }

    // 5c. DIVISION LANDING
    if (view === 'division' && divisionSlug) {
      const division = DIVISIONS[divisionSlug];
      const divName = division?.name || (divisionSlug === 'manufacturer' ? 'Manufacturer Division' : 'Supplier Division');
      const canonical = `${SITE_URL}/products/${divisionSlug}`;
      return {
        title: `${divName} — Industrial Products | ${COMPANY_NAME}`,
        description:
          division?.description ||
          `Explore ${divName} product lines and industrial metallurgy catalog at ${COMPANY_NAME}.`,
        canonical,
        ogType: 'website',
        ogImage: DEFAULT_IMAGE,
        breadcrumbs: [
          { name: 'Home', url: `${SITE_URL}/` },
          { name: 'Products', url: `${SITE_URL}/products` },
          { name: divName, url: canonical }
        ]
      };
    }

    // 5d. MAIN PRODUCTS LANDING
    return {
      title: `Industrial Metal Products & Components | ${COMPANY_NAME}`,
      description:
        'Explore 18 industrial product lines: butt weld fittings, forged flanges, seamless pipes, precision tubes, round bars, and fasteners across 80+ alloy grades from Bhawal Steel.',
      canonical: `${SITE_URL}/products`,
      ogType: 'website',
      ogImage: DEFAULT_IMAGE,
      breadcrumbs: [
        { name: 'Home', url: `${SITE_URL}/` },
        { name: 'Products', url: `${SITE_URL}/products` }
      ]
    };
  }

  // 6. 404 NOT FOUND
  if (page === 'not-found' || page === '404') {
    return {
      title: `Page Not Found (404) | ${COMPANY_NAME}`,
      description: 'The requested page could not be located. Return to Bhawal Steel & Engineering Company home or products catalog.',
      canonical: `${SITE_URL}/404`,
      ogType: 'website',
      ogImage: DEFAULT_IMAGE,
      noindex: true,
      breadcrumbs: [
        { name: 'Home', url: `${SITE_URL}/` },
        { name: '404 Not Found', url: `${SITE_URL}/404` }
      ]
    };
  }

  // 7. HOME PAGE (DEFAULT)
  return {
    title: `${COMPANY_NAME} | Steel Products & Solutions, Mumbai`,
    description:
      'Bhawal Steel & Engineering Company is a premier manufacturer, stockist and global exporter of high-grade industrial steel plates, sheets, precision pipes, fittings, flanges and round bars in Mumbai, India.',
    canonical: `${SITE_URL}/`,
    ogType: 'website',
    ogImage: DEFAULT_IMAGE,
    breadcrumbs: [{ name: 'Home', url: `${SITE_URL}/` }]
  };
}

/**
 * Resolves SEO metadata based on current parsed route, including openGraph object
 */
export function resolveRouteMetadata(route) {
  const meta = computeRouteMetadata(route);
  return {
    ...meta,
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: meta.canonical,
      type: meta.ogType || 'website',
      image: meta.ogImage || DEFAULT_IMAGE,
      site_name: COMPANY_NAME
    }
  };
}

/**
 * Applies complete SEO tags to the DOM document <head>
 */
export function applySEO(route) {
  if (typeof document === 'undefined') return;

  const meta = resolveRouteMetadata(route);

  // 1. Page Title
  document.title = meta.title;

  // 2. Meta Description
  setMetaTag('name', 'description', meta.description);

  // 3. Robots Indexing Control
  setMetaTag('name', 'robots', meta.noindex ? 'noindex, follow' : 'index, follow');

  // 4. Canonical Link
  setLinkTag('canonical', meta.canonical);

  // 5. Open Graph Metadata
  setMetaTag('property', 'og:title', meta.title);
  setMetaTag('property', 'og:description', meta.description);
  setMetaTag('property', 'og:url', meta.canonical);
  setMetaTag('property', 'og:type', meta.ogType || 'website');
  setMetaTag('property', 'og:image', meta.ogImage || DEFAULT_IMAGE);
  setMetaTag('property', 'og:site_name', COMPANY_NAME);
  setMetaTag('property', 'og:locale', 'en_US');

  // 6. Twitter / X Card Metadata
  setMetaTag('name', 'twitter:card', 'summary_large_image');
  setMetaTag('name', 'twitter:title', meta.title);
  setMetaTag('name', 'twitter:description', meta.description);
  setMetaTag('name', 'twitter:image', meta.ogImage || DEFAULT_IMAGE);

  // 7. Organization & WebSite JSON-LD Schemas (Always present)
  setJsonLd('schema-organization', getOrganizationSchema());
  setJsonLd('schema-website', getWebSiteSchema());

  // 8. BreadcrumbList JSON-LD Schema
  if (meta.breadcrumbs && meta.breadcrumbs.length > 0) {
    const breadcrumbListSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: meta.breadcrumbs.map((crumb, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: crumb.name,
        item: crumb.url
      }))
    };
    setJsonLd('schema-breadcrumbs', breadcrumbListSchema);
  } else {
    removeJsonLd('schema-breadcrumbs');
  }

  // 9. Product JSON-LD Schema (Strictly on genuine product detail pages)
  if (meta.productData) {
    const prod = meta.productData;
    const productSchema = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: prod.name,
      description: meta.description,
      image: prod.image ? (prod.image.startsWith('http') ? prod.image : `${SITE_URL}${prod.image}`) : DEFAULT_IMAGE,
      sku: prod.id || `BSE-${prod.slug}`,
      mpn: prod.id || `BSE-${prod.slug}`,
      category: prod.groupName || 'Industrial Steel Components',
      material: prod.materialName || 'Stainless Steel',
      brand: {
        '@type': 'Brand',
        name: COMPANY_NAME
      },
      manufacturer: {
        '@type': 'Organization',
        name: COMPANY_NAME
      },
      offers: {
        '@type': 'Offer',
        url: meta.canonical,
        priceCurrency: 'INR',
        price: '0.00',
        priceValidUntil: '2027-12-31',
        availability: 'https://schema.org/InStock',
        itemCondition: 'https://schema.org/NewCondition',
        seller: {
          '@type': 'Organization',
          name: COMPANY_NAME
        }
      }
    };
    setJsonLd('schema-product', productSchema);
  } else {
    removeJsonLd('schema-product');
  }
}
