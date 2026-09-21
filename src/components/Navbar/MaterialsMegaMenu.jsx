import React from 'react';
import { MATERIALS } from '../../data/materialsData';
import './MaterialsMegaMenu.css';

/**
 * Materials Mega-Menu Dropdown for Navbar
 * Clean, compact, ultra-premium 3-column layout displaying the EXACT 9 Material Categories.
 */
function MaterialsMegaMenu({ isOpen, onSelect, onClose }) {
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
      className={`materials-megamenu-panel ${isOpen ? 'is-open' : ''}`}
      role="region"
      aria-label="Materials Navigation Menu"
    >
      <div className="materials-megamenu-header">
        <div className="materials-header-eyebrow">
          <span className="materials-eyebrow-bar" />
          <span className="materials-eyebrow-text">METALLURGICAL GRADES</span>
        </div>
        <span className="materials-header-count">9 Materials</span>
      </div>

      <div className="materials-megamenu-grid">
        {MATERIALS.map((mat) => (
          <a
            key={mat.id}
            href={`/materials/${mat.slug}`}
            className="materials-nav-card"
            onClick={(e) => handleItemClick(e, `/materials/${mat.slug}`)}
          >
            <div className="materials-nav-thumb-box">
              <img
                src={mat.image}
                alt=""
                className="materials-nav-thumb"
                loading="eager"
                decoding="async"
                aria-hidden="true"
              />
            </div>
            <div className="materials-nav-content">
              <span className="materials-nav-title">{mat.name}</span>
              <span className="materials-nav-grade" title={mat.grade}>
                {mat.grade.split(',')[0]}
              </span>
            </div>
            <svg
              className="materials-nav-arrow"
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </a>
        ))}
      </div>

      {/* Bottom Full Materials Action Bar */}
      <div className="materials-megamenu-footer">
        <div className="materials-footer-info">
          <span className="materials-footer-dot" />
          <span>100% Certified Metallurgy • EN 10204 3.1 &amp; 3.2 MTC</span>
        </div>
        <a
          href="/materials"
          className="btn-view-all-materials"
          onClick={(e) => handleItemClick(e, '/materials')}
        >
          <span>Explore All Materials</span>
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </a>
      </div>
    </div>
  );
}

export default React.memo(MaterialsMegaMenu);
