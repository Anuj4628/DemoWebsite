import React from 'react';
import ProductBreadcrumb from './ProductBreadcrumb';
import './BrightHero.css';

/**
 * Bright Premium Hero Component
 * Used across the Products section with crisp white/light gray industrial aesthetics.
 */
export default function BrightHero({
  eyebrow = "ENGINEERING INVENTORY & PRODUCTION",
  title = "OUR PRODUCTS",
  description = "Comprehensive dual-division catalog of precision forged piping fittings, high-pressure flanges, heavy plates, seamless pipes, and fasteners in high-performance alloys.",
  breadcrumbItems = [],
  onNavigate,
  activeDivision = 'all',
  onDivisionChange,
  showDivisionTabs = true,
  searchQuery = '',
  onSearchChange,
  searchPlaceholder = "Search products, grades, materials...",
  metrics = []
}) {
  return (
    <section className="bright-products-hero">
      <div className="hero-grid-pattern" aria-hidden="true"></div>
      
      <div className="container bright-hero-container">
        {breadcrumbItems && breadcrumbItems.length > 0 && (
          <ProductBreadcrumb items={breadcrumbItems} onNavigate={onNavigate} />
        )}

        <div className="bright-hero-header">
          {eyebrow && (
            <div className="bright-hero-eyebrow">
              <span className="eyebrow-red-bar"></span>
              <span className="eyebrow-text">{eyebrow}</span>
            </div>
          )}

          <h1 className="bright-hero-title">{title}</h1>

          {description && (
            <p className="bright-hero-desc">{description}</p>
          )}

          {/* Optional Metrics strip */}
          {metrics && metrics.length > 0 && (
            <div className="hero-metrics-grid">
              {metrics.map((m, idx) => (
                <div key={idx} className="metric-chip">
                  <span className="metric-val">{m.value}</span>
                  <span className="metric-lbl">{m.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Division Switcher & Search Bar Area */}
        {(showDivisionTabs || onSearchChange) && (
          <div className="bright-hero-controls">
            {showDivisionTabs && onDivisionChange && (
              <div className="division-switch-pills" role="tablist">
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeDivision === 'all'}
                  className={`div-pill ${activeDivision === 'all' ? 'active' : ''}`}
                  onClick={() => onDivisionChange('all')}
                >
                  All Products (18)
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeDivision === 'manufacturer'}
                  className={`div-pill ${activeDivision === 'manufacturer' ? 'active' : ''}`}
                  onClick={() => onDivisionChange('manufacturer')}
                >
                  Manufacturer Division (9)
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeDivision === 'supplier'}
                  className={`div-pill ${activeDivision === 'supplier' ? 'active' : ''}`}
                  onClick={() => onDivisionChange('supplier')}
                >
                  Supplier Division (9)
                </button>
              </div>
            )}

            {onSearchChange && (
              <div className="bright-search-field">
                <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <input
                  type="text"
                  placeholder={searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  aria-label="Search product catalog"
                />
                {searchQuery && (
                  <button
                    type="button"
                    className="clear-search-btn"
                    onClick={() => onSearchChange('')}
                    aria-label="Clear search text"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
