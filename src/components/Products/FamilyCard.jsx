import React from 'react';
import './FamilyCard.css';

/**
 * Product Family Card
 * Features:
 * - Clean subtle border and rounded card
 * - High-definition product image
 * - Bold, clear industrial title
 * - Two-pill metadata row: [MATERIAL] [ALLOY COUNT]
 * - 2-line clamped summary description
 * - Footer bar with "EXPLORE PRODUCT DETAILS" + bordered arrow icon button
 * - No Manufacturer or Supplier division labels
 */
function FamilyCard({ group, onSelect }) {
  if (!group) return null;

  const targetUrl = `/products/${group.divisionSlug}/${group.slug}`;

  const handleClick = () => {
    if (onSelect) {
      onSelect(targetUrl);
    }
  };

  // Primary material
  const primaryMaterial = group.categories && group.categories.length > 0 
    ? (group.categories[0].materialName || 'ALLOY STEEL')
    : 'ENGINEERING STEEL';

  // Secondary pill: alloy grades count
  const alloyCount = group.categories ? `${group.categories.length} ALLOY GRADES` : 'CERTIFIED GRADES';

  // Description: 2-line concise summary
  const desc = group.shortDesc || group.tagline || 'Engineered industrial steel components manufactured to international ASTM and ASME standards.';

  return (
    <article className="ref-product-card" onClick={handleClick}>
      {/* Top Accent Line (Brand Teal) */}
      <div className="card-top-accent" aria-hidden="true" />

      {/* Inner Padding Container */}
      <div className="card-inner-wrap">
        
        {/* Image Container */}
        <div className="card-media-box">
          <img
            src={group.heroImage}
            alt={group.name}
            className="card-media-img"
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* Card Body */}
        <div className="card-body-content">
          <h3 className="card-title-text">
            <a
              href={targetUrl}
              className="card-title-link"
              onClick={(e) => {
                e.preventDefault();
                handleClick();
              }}
            >
              {group.name}
            </a>
          </h3>

          {/* Two-Pill Row: [MATERIAL] [ALLOY COUNT] */}
          <div className="card-pills-row">
            <span className="pill-material">{primaryMaterial}</span>
            <span className="pill-grade">{alloyCount}</span>
          </div>

          {/* 2-line clamped description */}
          <p className="card-desc-snippet">{desc}</p>
        </div>

        {/* Footer Bar: "Explore Details" + Arrow Icon Box */}
        <a
          href={targetUrl}
          className="card-footer-bar"
          aria-label={`Explore ${group.name} specifications`}
          onClick={(e) => {
            e.preventDefault();
            handleClick();
          }}
        >
          <span className="footer-action-label">
            Explore Details
          </span>
          <span className="footer-arrow-box" aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </span>
        </a>

      </div>
    </article>
  );
}

export default React.memo(FamilyCard);
