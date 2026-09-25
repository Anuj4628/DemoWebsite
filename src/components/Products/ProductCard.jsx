import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

function ProductCard({ product, onNavigate }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleClick = (e) => {
    if (product?.route && onNavigate) {
      e.preventDefault();
      onNavigate(product.route);
    }
  };

  const specParts = product.specTag ? product.specTag.split('//') : [];
  const standardCode = specParts[0]?.trim() || 'CERTIFIED CODE';
  const componentScope = specParts[1]?.trim() || '';

  const categoryLabel =
    product.category === 'fittings' ? 'PIPING COMPONENTS' :
    product.category === 'pipes' ? 'TUBULAR PRODUCTS' :
    product.category === 'plates' ? 'FLAT ROLLED STEEL' : 'BARS & STRUCTURAL';

  return (
    <article
      className="catalog-product-card"
      tabIndex={0}
      aria-label={`${product.name} - ${standardCode}`}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick(e);
        }
      }}
    >
      {/* 1. Precision Framed Product Image Viewport */}
      <div className="product-media-frame">
        <img
          src={product.image}
          alt={product.alt || `${product.name} industrial supply`}
          className={`product-img-element ${imageLoaded ? 'is-loaded' : ''}`}
          loading="lazy"
          decoding="async"
          onLoad={() => setImageLoaded(true)}
        />

        {/* Technical Standard Code Chip */}
        <div className="product-standard-pill">
          <span className="standard-pulse-point" aria-hidden="true" />
          <span className="standard-code-text">{standardCode}</span>
        </div>
      </div>

      {/* 2. Structured Technical Information Body */}
      <div className="product-details-content">
        {/* Category & Index Row */}
        <div className="product-category-row">
          <span className="product-category-name">{categoryLabel}</span>
          <span className="product-code-index">BSE-{product.id.slice(0, 3).toUpperCase()}</span>
        </div>

        {/* Product Name Heading */}
        <h3 className="product-primary-title">
          <a
            href={product.route || '/products'}
            className="product-title-anchor"
            onClick={handleClick}
          >
            {product.name}
          </a>
        </h3>

        {/* Scope / Subtitle snippet if available */}
        {componentScope && (
          <p className="product-scope-snippet">{componentScope}</p>
        )}

        {/* 3. Refined "Explore Details" CTA Row */}
        <div className="product-action-row">
          <span className="product-cta-label">Explore Details</span>
          <span className="product-arrow-box" aria-hidden="true">
            <ArrowUpRight size={14} strokeWidth={2.4} />
          </span>
        </div>
      </div>

      {/* 4. Subtle Ambient Border Accent Line on Hover */}
      <div className="product-card-bottom-accent" aria-hidden="true" />
    </article>
  );
}

export default React.memo(ProductCard);
