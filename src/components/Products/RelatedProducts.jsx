import React from 'react';
import './RelatedProducts.css';

/**
 * Related Products Component (Matching Reference Image 2 Design System)
 */
function RelatedProducts({ products = [], title = "Related Products & Solutions", onSelect }) {
  if (!products || products.length === 0) return null;

  return (
    <section className="bright-related-section">
      <div className="related-head">
        <span className="related-eyebrow">COMPATIBLE COMPONENTS</span>
        <h3 className="related-title">{title}</h3>
        <p className="related-subtitle">
          Engineered components manufactured and stocked to identical metallurgical standards.
        </p>
      </div>

      <div className="related-grid">
        {products.map((item) => {
          const route = item.route || `/products/${item.divisionSlug}/${item.groupSlug}/${item.slug}`;
          const isManufacturer = item.divisionSlug === 'manufacturer';
          const divisionBadge = isManufacturer ? 'MANUFACTURER' : 'SUPPLIER';
          const materialTag = item.materialName || 'STAINLESS STEEL';
          const gradeTag = item.grade ? item.grade.split('/')[0].trim() : 'CERTIFIED';

          return (
            <article 
              key={item.slug || item.id} 
              className="ref-related-card"
              onClick={() => onSelect && onSelect(route)}
            >
              <div className="related-top-accent" aria-hidden="true" />
              <div className="related-inner-wrap">
                <div className="related-media-box">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="related-img"
                    loading="lazy" 
                    decoding="async"
                  />
                  <span className={`related-floating-badge ${item.divisionSlug}`}>
                    {divisionBadge}
                  </span>
                </div>

                <div className="related-body">
                  <h4 className="related-name">{item.name}</h4>
                  
                  <div className="related-pills-row">
                    <span className="related-pill-mat">{materialTag}</span>
                    <span className="related-pill-grade">{gradeTag}</span>
                  </div>

                  <p className="related-desc-snip">
                    {item.shortDesc || `Certified high-integrity component for industrial process pipework.`}
                  </p>
                </div>

                <div className="related-footer-bar">
                  <span className="related-cta-text">
                    EXPLORE PRODUCT DETAILS
                  </span>
                  <div className="related-arrow-box">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default React.memo(RelatedProducts);
