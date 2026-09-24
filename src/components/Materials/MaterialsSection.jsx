import React from 'react';
import { MATERIALS } from '../../data/materialsData';
import './MaterialsSection.css';

export default function MaterialsSection({ onNavigate }) {
  // Repeat the exact 9 website materials for a seamless continuous marquee loop
  const continuousMaterials = [
    ...MATERIALS,
    ...MATERIALS,
    ...MATERIALS,
    ...MATERIALS
  ];

  const handleItemClick = (slug) => {
    if (typeof onNavigate === 'function') {
      if (slug) {
        onNavigate(`/materials/${slug}`);
      } else {
        onNavigate('/materials');
      }
    }
  };

  return (
    <section
      id="materials"
      className="materials-showcase-section"
      aria-label="Material We Work With"
    >
      <div className="materials-container">
        {/* Compact, Clean Section Header */}
        <div className="materials-header">
          <div className="materials-eyebrow">
            <span className="eyebrow-diamond" aria-hidden="true" />
            <span className="eyebrow-text">METALLURGICAL GRADES &amp; ALLOYS</span>
            <span className="eyebrow-diamond" aria-hidden="true" />
          </div>

          <h2 className="materials-title">
            MATERIALS <span className="title-teal">WE WORK WITH</span>
          </h2>

          <p className="materials-subtext">
            High-integrity alloys, stainless steels, and specialty metals engineered for severe thermal, pressure, and corrosive industrial operating environments.
          </p>
        </div>
      </div>

      {/* Simplified, Clean Material Banner with Lighter Track & Dark Cards */}
      <div
        className="materials-track-container"
        aria-label="Material We Work With continuous showcase"
      >
        <div className="materials-track-ribbon">
          {continuousMaterials.map((item, index) => (
            <div
              key={`mat-item-${item.id}-${index}`}
              className="material-card-item"
              tabIndex={0}
              role="button"
              aria-label={`View ${item.name}`}
              onClick={() => handleItemClick(item.slug)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleItemClick(item.slug);
                }
              }}
            >
              <span className="material-item-name">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

