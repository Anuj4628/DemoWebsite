import React from 'react';
import { MATERIALS } from '../../data/materialsData';
import './MaterialsMegaMenu.css';

/**
 * Materials Mega-Menu Dropdown for Navbar
 * Text-only 2-column layout displaying the 9 metallurgical grades.
 * No thumbnails, no photos, no previews.
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
      {/* Header */}
      <div className="materials-megamenu-header">
        <div className="materials-header-eyebrow">
          <span className="materials-eyebrow-bar" />
          <span className="materials-eyebrow-text">MATERIALS</span>
        </div>
        <span className="materials-header-count">9 Metallurgical Grades</span>
      </div>

      {/* 2-Column Text Only Grid */}
      <div className="materials-text-grid">
        {MATERIALS.map((mat) => (
          <a
            key={mat.id}
            href={`/materials/${mat.slug}`}
            className="materials-text-item"
            onClick={(e) => handleItemClick(e, `/materials/${mat.slug}`)}
          >
            <span className="materials-text-name">{mat.name}</span>
            <svg
              className="materials-text-arrow"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              aria-hidden="true"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </a>
        ))}
      </div>

      {/* Bottom Action Bar */}
      <div className="materials-megamenu-footer">
        <div className="materials-footer-info">
          <span className="materials-footer-dot" />
          <span>EN 10204 3.1 &amp; 3.2 MTC Certified</span>
        </div>
        <a
          href="/materials"
          className="btn-view-all-materials"
          onClick={(e) => handleItemClick(e, '/materials')}
        >
          <span>Explore All Materials</span>
          <svg
            width="14"
            height="14"
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
