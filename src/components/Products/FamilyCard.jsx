import React from 'react';
import './FamilyCard.css';

/**
 * Product Family Card (Matching Reference Image 2)
 * Features:
 * - Red top accent bar
 * - Rounded white card with clean subtle border
 * - Light-background image container with floating division pill
 * - Bold industrial title
 * - Two-pill metadata row: [DIVISION / MATERIAL] [ALLOY COUNT]
 * - 2-line clamped summary description
 * - Footer bar with "EXPLORE PRODUCT DETAILS" + bordered arrow icon button
 */
function FamilyCard({ group, onSelect }) {
  if (!group) return null;

  const targetUrl = `/products/${group.divisionSlug}/${group.slug}`;

  const handleClick = () => {
    if (onSelect) {
      onSelect(targetUrl);
    }
  };

  const isManufacturer = group.divisionSlug === 'manufacturer' || group.division === 'Manufacturer Division';
  const divisionBadge = isManufacturer ? 'MANUFACTURER' : 'SUPPLIER';

  // Primary material or division category
  const primaryMaterial = group.categories && group.categories.length > 0 
    ? (group.categories[0].materialName || 'STAINLESS STEEL')
    : (isManufacturer ? 'IN-HOUSE FORGED' : 'MILL STOCK');

  // Secondary pill: alloy grades count
  const alloyCount = group.categories ? `${group.categories.length} ALLOY GRADES` : 'CERTIFIED GRADES';

  // Description: 2-line concise summary
  const desc = group.shortDesc || group.tagline || 'Engineered industrial steel components manufactured to international ASTM and ASME standards.';

  return (
    <article className="ref-product-card" onClick={handleClick}>
      {/* Top Accent Line (Redcore Red) */}
      <div className="card-top-accent" aria-hidden="true" />

      {/* Inner Padding Container */}
      <div className="card-inner-wrap">
        
        {/* Image Container with Floating Division Badge */}
        <div className="card-media-box">
          <img
            src={group.heroImage}
            alt={group.name}
            className="card-media-img"
            loading="lazy"
            decoding="async"
          />
          <span className={`card-floating-badge ${group.divisionSlug}`}>
            {divisionBadge}
          </span>
        </div>

        {/* Card Body */}
        <div className="card-body-content">
          <h3 className="card-title-text">{group.name}</h3>

          {/* Two-Pill Row: Exactly as in Reference Image 2 */}
          <div className="card-pills-row">
            <span className="pill-material">{primaryMaterial}</span>
            <span className="pill-grade">{alloyCount}</span>
          </div>

          {/* 2-line clamped description */}
          <p className="card-desc-snippet">{desc}</p>
        </div>

        {/* Footer Bar: "EXPLORE PRODUCT DETAILS" + Arrow Icon Box */}
        <div className="card-footer-bar">
          <span className="footer-action-label">
            EXPLORE PRODUCT DETAILS
          </span>
          <button
            type="button"
            className="footer-arrow-box"
            aria-label={`Explore ${group.name}`}
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>

      </div>
    </article>
  );
}

export default React.memo(FamilyCard);
