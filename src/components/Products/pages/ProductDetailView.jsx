import React, { useMemo } from 'react';
import ProductBreadcrumb from '../ProductBreadcrumb';
import SpecsTable from '../SpecsTable';
import InquiryForm from '../InquiryForm';
import RelatedProducts from '../RelatedProducts';
import { getProductCategory, getRelatedProducts, DIVISIONS } from '../../../data/productCatalogData';
import { brandDetails } from '../../../data/navigationData';
import './ProductDetailView.css';

/**
 * Bright White Product Detail View
 * Complete industrial product page with high-res imagery, metallurgy, full engineering specifications,
 * compliance standards, industry applications, RFQ form, and compatible products.
 */
export default function ProductDetailView({
  divisionSlug,
  groupSlug,
  productSlug,
  onNavigate
}) {
  const product = useMemo(() => {
    return getProductCategory(divisionSlug, groupSlug, productSlug);
  }, [divisionSlug, groupSlug, productSlug]);

  const related = useMemo(() => {
    if (!product) return [];
    return getRelatedProducts(product.groupSlug, product.slug, 4);
  }, [product]);

  const division = useMemo(() => {
    if (!product) return null;
    return DIVISIONS[product.divisionSlug] || null;
  }, [product]);

  if (!product) {
    return (
      <div className="product-detail-not-found">
        <div className="not-found-card">
          <h2>Product Specification Not Found</h2>
          <p>
            The requested product specification could not be located. It may have been updated or restructured.
          </p>
          <div className="not-found-actions">
            <button
              type="button"
              className="btn-back-cat"
              onClick={() => onNavigate && onNavigate(`/products/${divisionSlug}/${groupSlug}`)}
            >
              Back to Product Family
            </button>
            <button
              type="button"
              className="btn-back-all"
              onClick={() => onNavigate && onNavigate('/products')}
            >
              All Products
            </button>
          </div>
        </div>
      </div>
    );
  }

  const breadcrumbItems = [
    { label: 'Products', path: '/products' },
    {
      label: product.groupName,
      path: `/products/${product.divisionSlug}/${product.groupSlug}`
    },
    { label: product.name, path: null }
  ];

  const scrollToRFQ = () => {
    const el = document.getElementById('product-rfq-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hello ${brandDetails.name}, I am interested in inquiring about ${product.name} (Grade: ${product.grade}). Please share pricing and dispatch availability.`
  );

  return (
    <div className="bright-detail-view">
      <main className="detail-main-content">
        <div className="detail-container">
          <ProductBreadcrumb items={breadcrumbItems} onNavigate={onNavigate} />

          {/* Top Showcase: 2-Column Industrial Layout */}
          <section className="product-showcase-grid">
            
            {/* Left: Product Visual Card */}
            <div className="showcase-visual-col">
              <div className="showcase-media-box">
                <img
                  src={product.image}
                  alt={product.name}
                  className="showcase-img"
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                />
                <div className="showcase-floating-badge">
                  <span>{product.materialName || 'PREMIUM ALLOY'}</span>
                </div>
              </div>

              {/* Quality & Metallurgical Verification Badges */}
              <div className="quality-assurance-row">
                <div className="qa-badge">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#125A48" strokeWidth="2.2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <div>
                    <strong>PMI Tested</strong>
                    <span>100% Alloy Verified</span>
                  </div>
                </div>

                <div className="qa-badge">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#125A48" strokeWidth="2.2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                  <div>
                    <strong>EN 10204 3.1 & 3.2</strong>
                    <span>Full MTC Supplied</span>
                  </div>
                </div>

                <div className="qa-badge">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#125A48" strokeWidth="2.2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="m4.93 4.93 4.24 4.24"></path>
                    <path d="m14.83 9.17 4.24-4.24"></path>
                    <path d="m14.83 14.83 4.24 4.24"></path>
                    <path d="m9.17 14.83-4.24 4.24"></path>
                    <circle cx="12" cy="12" r="4"></circle>
                  </svg>
                  <div>
                    <strong>Pressure Tested</strong>
                    <span>Hydro & Ultrasonic</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Commercial & Technical Product Summary */}
            <div className="showcase-info-col">
              <div className="info-division-tag">
                <span>PRECISION INDUSTRIAL STEEL</span>
                <span className="dot-sep">•</span>
                <span>{product.groupName}</span>
              </div>

              <h1 className="product-title">{product.name}</h1>

              <div className="product-grade-badge">
                <span className="grade-prefix">Governing Grade:</span>
                <span className="grade-val">{product.grade}</span>
              </div>

              <p className="product-desc-text">
                {product.description || product.shortDesc}
              </p>

              {/* Quick Specs Matrix */}
              <div className="quick-specs-matrix">
                {product.specs?.size && (
                  <div className="matrix-cell">
                    <span className="cell-label">Size Range</span>
                    <span className="cell-val">{product.specs.size}</span>
                  </div>
                )}
                {(product.specs?.schedule || product.specs?.thickness || product.specs?.class) && (
                  <div className="matrix-cell">
                    <span className="cell-label">Schedule / Rating</span>
                    <span className="cell-val">{product.specs.schedule || product.specs.thickness || product.specs.class}</span>
                  </div>
                )}
                {product.specs?.standards && (
                  <div className="matrix-cell">
                    <span className="cell-label">Governing Code</span>
                    <span className="cell-val">{product.specs.standards}</span>
                  </div>
                )}
                <div className="matrix-cell">
                  <span className="cell-label">Stock Availability</span>
                  <span className="cell-val stock-ready">Ex-Stock & Mill Make</span>
                </div>
              </div>

              {/* Primary Call to Actions */}
              <div className="product-cta-group">
                <button
                  type="button"
                  className="btn-detail-rfq"
                  onClick={scrollToRFQ}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                  <span>Request Instant Quotation</span>
                </button>

                <a
                  href={`https://wa.me/${brandDetails.contact.whatsAppRaw}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-detail-whatsapp"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
                  </svg>
                  <span>WhatsApp Inquiry</span>
                </a>
              </div>

              {/* Sourcing Guarantee Snippet */}
              <div className="sourcing-guarantee">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Third-Party Inspection (TPI) accepted: Lloyd's, BV, DNV, TUV, SGS</span>
              </div>
            </div>
          </section>

          {/* Section: Technical Specs Table */}
          <section className="detail-specs-section">
            <SpecsTable
              specs={product.specs}
              standards={product.standards || []}
            />
          </section>

          {/* Section: Industrial Applications */}
          <section className="detail-applications-section">
            <div className="apps-header">
              <span className="apps-eyebrow">SECTOR COMPATIBILITY</span>
              <h3 className="apps-title">Engineered For Critical Operating Environments</h3>
              <p className="apps-desc">
                High mechanical integrity and chemical resistance across severe industrial services.
              </p>
            </div>

            <div className="apps-grid">
              <div className="app-card">
                <div className="app-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                  </svg>
                </div>
                <h4>Oil, Gas & Petrochemical</h4>
                <p>Refinery pipework, offshore topsides, high-pressure process manifolds, and sour crude handling.</p>
              </div>

              <div className="app-card">
                <div className="app-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M10 2v7.31M14 9.3V1.99M8.5 2h7M14 9.3a6.5 6.5 0 1 1-4 0"></path>
                  </svg>
                </div>
                <h4>Chemical & Fertilizer Plants</h4>
                <p>Severe corrosive environments, nitric/sulfuric acid circuits, reactors, and heat exchangers.</p>
              </div>

              <div className="app-card">
                <div className="app-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                  </svg>
                </div>
                <h4>Power & Thermal Generation</h4>
                <p>Supercritical boiler tubing, steam headers, nuclear coolant circuits, and turbine auxiliaries.</p>
              </div>

              <div className="app-card">
                <div className="app-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                  </svg>
                </div>
                <h4>Pharmaceutical & Dairy</h4>
                <p>Ultra-clean sanitary fluid transfer, electro-polished piping, bio-processing vessels, and CIP lines.</p>
              </div>
            </div>
          </section>

          {/* Section: Pre-Filled RFQ Form */}
          <section id="product-rfq-section" className="detail-rfq-section">
            <InquiryForm
              productName={product.name}
              materialGrade={product.grade}
              division={product.division}
            />
          </section>

          {/* Section: Compatible Related Products */}
          {related && related.length > 0 && (
            <section className="detail-related-section">
              <RelatedProducts
                products={related}
                title={`Related Components in ${product.groupName}`}
                onSelect={onNavigate}
              />
            </section>
          )}

        </div>
      </main>
    </div>
  );
}
