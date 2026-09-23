import React from 'react';
import { materialsSpecificationRail } from '../../data/homeSectionsData';
import './MaterialsSection.css';

/**
 * Precision industrial node separator between material stations
 */
const EngineeringTrackSeparator = () => (
  <div className="track-sep-node" aria-hidden="true">
    <span className="sep-hairline" />
    <span className="sep-diamond" />
    <span className="sep-hairline" />
  </div>
);

export default function MaterialsSection({ onNavigate }) {
  // Triplicate the 14-item metallurgical specification rail for an exact, mathematically seamless infinite loop
  const continuousRail = [
    ...materialsSpecificationRail,
    ...materialsSpecificationRail,
    ...materialsSpecificationRail
  ];

  const handleItemClick = () => {
    if (typeof onNavigate === 'function') {
      onNavigate('/materials');
    }
  };

  return (
    <section
      id="materials"
      className="materials-showcase-section"
      aria-label="Materials We Work With"
    >
      <div className="materials-container">
        {/* 1. COMPACT, PERFECTLY CENTERED SECTION HEADER */}
        <div className="materials-header">
          {/* Eyebrow Label */}
          <div className="materials-eyebrow">
            <span className="eyebrow-diamond" aria-hidden="true" />
            <span className="eyebrow-text">METALLURGICAL GRADES &amp; ALLOYS</span>
            <span className="eyebrow-diamond" aria-hidden="true" />
          </div>

          {/* Main Heading */}
          <h2 className="materials-title">
            MATERIALS <span className="title-teal">WE WORK WITH</span>
          </h2>

          {/* Short, Clean Supporting Description */}
          <p className="materials-subtext">
            High-integrity alloys, stainless steels, and specialty metals engineered for severe thermal, pressure, and corrosive industrial operating environments.
          </p>
        </div>
      </div>

      {/* 2. SINGLE UNIFIED HORIZONTAL INDUSTRIAL MATERIAL TRACK / BANNER */}
      <div
        className="materials-track-container"
        aria-label="Continuous metallurgical material specifications track"
      >
        <div className="materials-track-ribbon">
          {continuousRail.map((item, index) => (
            <React.Fragment key={`mat-rail-${item.id}-${index}`}>
              <div
                className="material-station"
                tabIndex={0}
                role="group"
                aria-label={`${item.name} - ${item.grade}`}
                onClick={handleItemClick}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleItemClick();
                  }
                }}
              >
                {/* Metallic Gold Diamond Marker */}
                <span className="station-diamond" aria-hidden="true" />

                {/* Material Name */}
                <span className="station-name">{item.name}</span>

                {/* Grade / Specification Badge */}
                <span className="station-spec">{item.grade}</span>
              </div>

              {/* Technical Separator Between Materials */}
              <EngineeringTrackSeparator />
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
