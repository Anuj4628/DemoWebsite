import React from 'react';
import { PRODUCT_GROUPS } from '../../data/productCatalogData';
import { FileText, ExternalLink, ArrowRight } from 'lucide-react';
import { BHAWAL_CATALOG_URL } from '../../constants/catalog';
import './ProductMegaMenu.css';

/**
 * Products Mega-Menu Dropdown for Navbar
 * Features ONE unified 18-product catalog:
 * - Left Side: 9 product families
 * - Right Side: 9 product families
 * - No division headings, badges, or separate division branding
 */
const leftGroups = PRODUCT_GROUPS.slice(0, 9);
const rightGroups = PRODUCT_GROUPS.slice(9, 18);

function ProductMegaMenu({ isOpen, onSelect, onClose }) {
  const handleItemClick = (e, url) => {
    e.preventDefault();
    if (onSelect) {
      onSelect(url);
    }
    if (onClose) {
      onClose();
    }
  };

  return (
    <div
      className={`product-megamenu-panel ${isOpen ? 'is-open' : ''}`}
      role="region"
      aria-label="Products Navigation Menu"
    >
      {/* Unified Clean Header */}
      <div className="megamenu-header-unified">
        <div className="megamenu-header-left">
          <span className="megamenu-header-accent" />
          <span className="megamenu-header-title">PRODUCTS CATALOG</span>
        </div>
        <span className="megamenu-header-count">18 Product Families</span>
      </div>

      <div className="megamenu-inner">
        {/* Left Column: 9 Families */}
        <div className="megamenu-column">
          <ul className="megamenu-list">
            {leftGroups.map((group) => (
              <li key={group.id} className="megamenu-item">
                <a
                  href={`/products/${group.divisionSlug}/${group.slug}`}
                  className="megamenu-link"
                  onClick={(e) => handleItemClick(e, `/products/${group.divisionSlug}/${group.slug}`)}
                >
                  <div className="item-thumb-box">
                    <img
                      src={group.heroImage}
                      alt=""
                      className="item-thumb"
                      loading="lazy"
                      decoding="async"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="item-content">
                    <span className="item-title">{group.name}</span>
                  </div>
                  <svg className="item-arrow" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Subtle Vertical Divider */}
        <div className="megamenu-divider" aria-hidden="true" />

        {/* Right Column: 9 Families */}
        <div className="megamenu-column">
          <ul className="megamenu-list">
            {rightGroups.map((group) => (
              <li key={group.id} className="megamenu-item">
                <a
                  href={`/products/${group.divisionSlug}/${group.slug}`}
                  className="megamenu-link"
                  onClick={(e) => handleItemClick(e, `/products/${group.divisionSlug}/${group.slug}`)}
                >
                  <div className="item-thumb-box">
                    <img
                      src={group.heroImage}
                      alt=""
                      className="item-thumb"
                      loading="lazy"
                      decoding="async"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="item-content">
                    <span className="item-title">{group.name}</span>
                  </div>
                  <svg className="item-arrow" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Full Catalog Action Bar */}
      <div className="megamenu-footer-bar">
        <a
          href={BHAWAL_CATALOG_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-download-pdf-catalog"
          title="Open Bhawal Steel & Engineering Official Product Catalog (PDF)"
        >
          <FileText size={14} aria-hidden="true" />
          <span>Explore Catalog (PDF)</span>
          <ExternalLink size={12} aria-hidden="true" />
        </a>

        <a
          href="/products"
          className="btn-view-all-catalog"
          onClick={(e) => handleItemClick(e, '/products')}
        >
          <span>View All 18 Product Families</span>
          <ArrowRight size={13} aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}

export default React.memo(ProductMegaMenu);
