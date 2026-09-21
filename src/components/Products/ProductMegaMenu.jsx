import React from 'react';
import { DIVISIONS, PRODUCT_GROUPS } from '../../data/productCatalogData';
import './ProductMegaMenu.css';

/**
 * Products Mega-Menu Dropdown for Navbar
 * Features a bright white 2-column layout:
 * - Left Side: Manufacturer Division (9 in-house forged & engineered product families)
 * - Right Side: Supplier Division (9 mill stockholding product families)
 */
// Statically pre-computed division product groups (zero re-filtering)
const manufacturerGroups = PRODUCT_GROUPS.filter(g => g.divisionSlug === 'manufacturer');
const supplierGroups = PRODUCT_GROUPS.filter(g => g.divisionSlug === 'supplier');

/**
 * Products Mega-Menu Dropdown for Navbar
 * Features a bright white 2-column layout:
 * - Left Side: Manufacturer Division (9 in-house forged & engineered product families)
 * - Right Side: Supplier Division (9 mill stockholding product families)
 */
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
      <div className="megamenu-inner">
        {/* Left Column: Manufacturer Division */}
        <div className="megamenu-column manufacturer-col">
          <div className="column-header">
            <div className="header-badge-wrap">
              <span className="col-badge manufacturer-badge">MANUFACTURER</span>
              <span className="col-count">9 Families</span>
            </div>
            <h3 className="column-title">{DIVISIONS.manufacturer.name}</h3>
            <p className="column-desc">In-house precision forged, machined & tested piping solutions</p>
          </div>

          <ul className="megamenu-list">
            {manufacturerGroups.map((group) => (
              <li key={group.id} className="megamenu-item">
                <a
                  href={`/products/manufacturer/${group.slug}`}
                  className="megamenu-link"
                  onClick={(e) => handleItemClick(e, `/products/manufacturer/${group.slug}`)}
                >
                  <div className="item-thumb-box">
                    <img
                      src={group.heroImage}
                      alt=""
                      className="item-thumb"
                      loading="eager"
                      decoding="async"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="item-content">
                    <span className="item-title">{group.name}</span>
                    <span className="item-subtitle">{group.tagline}</span>
                  </div>
                  <svg className="item-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column Divider */}
        <div className="megamenu-divider" aria-hidden="true"></div>

        {/* Right Column: Supplier Division */}
        <div className="megamenu-column supplier-col">
          <div className="column-header">
            <div className="header-badge-wrap">
              <span className="col-badge supplier-badge">SUPPLIER</span>
              <span className="col-count">9 Families</span>
            </div>
            <h3 className="column-title">{DIVISIONS.supplier.name}</h3>
            <p className="column-desc">Global mill stockist & raw material distribution network</p>
          </div>

          <ul className="megamenu-list">
            {supplierGroups.map((group) => (
              <li key={group.id} className="megamenu-item">
                <a
                  href={`/products/supplier/${group.slug}`}
                  className="megamenu-link"
                  onClick={(e) => handleItemClick(e, `/products/supplier/${group.slug}`)}
                >
                  <div className="item-thumb-box">
                    <img
                      src={group.heroImage}
                      alt=""
                      className="item-thumb"
                      loading="eager"
                      decoding="async"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="item-content">
                    <span className="item-title">{group.name}</span>
                    <span className="item-subtitle">{group.tagline}</span>
                  </div>
                  <svg className="item-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Full Catalog Action Bar */}
      <div className="megamenu-footer-bar">
        <div className="footer-bar-info">
          <span className="footer-bar-dot"></span>
          <span>100% PMI, MTC 3.1 & EN 10204 Certified Mill Inventory</span>
        </div>
        <a
          href="/products"
          className="btn-view-all-catalog"
          onClick={(e) => handleItemClick(e, '/products')}
        >
          <span>View Complete Products Catalog (18 Families)</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </a>
      </div>
    </div>
  );
}

export default React.memo(ProductMegaMenu);
