import React from 'react';
import './GradeCard.css';

/**
 * Product Specification / Grade Card
 * Features:
 * - Rounded white card with clean subtle border
 * - Light-background image container
 * - Bold title (e.g. Stainless Steel 316L 90° Long Radius Elbow)
 * - Two-pill metadata row: [MATERIAL] [GRADE]
 * - 2-line clamped technical description
 * - Footer bar with "EXPLORE PRODUCT DETAILS" + bordered arrow icon button
 * - No Manufacturer or Supplier division labels
 */
function GradeCard({ category, groupSlug, divisionSlug, onSelect }) {
  if (!category) return null;

  const targetUrl = `/products/${divisionSlug}/${groupSlug}/${category.slug}`;

  const handleClick = () => {
    if (onSelect) {
      onSelect(targetUrl);
    }
  };

  const materialTag = category.materialName || 'STAINLESS STEEL';
  const gradeTag = category.grade ? category.grade.split('/')[0].trim() : 'COMMERCIAL';
  const desc = category.shortDesc || (category.specs && category.specs.standards ? `Standard ${category.specs.standards} precision component certified for high pressure applications.` : 'Precision manufactured to strict international quality standards.');

  return (
    <article className="ref-grade-card" onClick={handleClick}>
      {/* Top Accent Line */}
      <div className="grade-top-accent" aria-hidden="true" />

      {/* Inner Wrap */}
      <div className="grade-inner-wrap">
        
        {/* Image Frame */}
        <div className="grade-media-container">
          <img
            src={category.image}
            alt={category.name}
            className="grade-media-image"
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* Card Body */}
        <div className="grade-body-content">
          <h4 className="grade-card-title">
            <a
              href={targetUrl}
              className="grade-card-title-link"
              onClick={(e) => {
                e.preventDefault();
                handleClick();
              }}
            >
              {category.name}
            </a>
          </h4>

          {/* Two-Pill Row: [MATERIAL] [GRADE] */}
          <div className="grade-pills-row">
            <span className="pill-grade-mat">{materialTag}</span>
            <span className="pill-grade-val">{gradeTag}</span>
          </div>

          {/* 2-Line Clamped Description */}
          <p className="grade-desc-snippet">{desc}</p>
        </div>

        {/* Footer Bar: "Explore Details" */}
        <a
          href={targetUrl}
          className="grade-footer-bar"
          aria-label={`Explore ${category.name} specifications`}
          onClick={(e) => {
            e.preventDefault();
            handleClick();
          }}
        >
          <span className="grade-action-label">
            Explore Details
          </span>
          <span className="grade-arrow-btn" aria-hidden="true">
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

export default React.memo(GradeCard);
