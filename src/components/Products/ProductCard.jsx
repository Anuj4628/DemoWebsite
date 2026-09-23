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
      {/* 1. Deep Product Image Framing with Subtle Zoom & Industrial Scrim */}
      <div className="product-media-frame">
        <img
          src={product.image}
          alt={product.alt || `${product.name} industrial supply`}
          className={`product-img-element ${imageLoaded ? 'is-loaded' : ''}`}
          loading="lazy"
          decoding="async"
          onLoad={() => setImageLoaded(true)}
        />
        <div className="product-media-scrim" aria-hidden="true" />

        {/* Small Technical Standard / Code Label (floating over image) */}
        <div className="product-standard-pill">
          <span className="standard-pulse-point" />
          <span className="standard-code-text">{standardCode}</span>
        </div>
      </div>

      {/* 2. Structured Information Area */}
      <div className="product-details-content">
        {/* Category designation */}
        <div className="product-category-row">
          <span className="product-category-name">
            {product.category === 'fittings' ? 'PIPING COMPONENTS' :
             product.category === 'pipes' ? 'TUBULAR PRODUCTS' :
             product.category === 'plates' ? 'FLAT ROLLED STEEL' : 'BARS & STRUCTURAL'}
          </span>
          <span className="product-code-index">BSE-{product.id.slice(0, 3).toUpperCase()}</span>
        </div>

        {/* Product Name */}
        <h3 className="product-primary-title">
          <a
            href={product.route || '/products'}
            className="product-title-anchor"
            onClick={handleClick}
          >
            {product.name}
          </a>
        </h3>

        {/* 3. Subtle CTA / Action Row */}
        <div className="product-action-row">
          <span className="product-cta-label">Technical Specs &amp; Supply</span>
          <span className="product-arrow-box" aria-hidden="true">
            <ArrowUpRight size={15} />
          </span>
        </div>
      </div>

      {/* 4. Muted Gold Reveal Border on Hover */}
      <div className="product-card-gold-reveal" aria-hidden="true" />
    </article>
  );
}

export default React.memo(ProductCard);
