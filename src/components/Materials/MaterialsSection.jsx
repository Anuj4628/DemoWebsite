import React, { useRef } from 'react';
import { materialsRow1, materialsRow2 } from '../../data/homeSectionsData';
import './MaterialsSection.css';

// 4-Point Star Separator between cards
const StarSeparator = () => (
  <span className="marquee-star-separator" aria-hidden="true">
    <svg viewBox="0 0 16 16" width="11" height="11" fill="currentColor">
      <path d="M8 0L9.4 6.6L16 8L9.4 9.4L8 16L6.6 9.4L0 8L6.6 6.6Z" />
    </svg>
  </span>
);

export default function MaterialsSection() {
  const sectionRef = useRef(null);

  // Duplicate items 4 times for seamless continuous infinite looping
  const renderRow1 = (items) => {
    const repeated = [...items, ...items, ...items, ...items];
    return (
      <div className="marquee-track-wrapper marquee-row-right-to-left">
        <div className="marquee-track">
          {repeated.map((mat, index) => (
            <React.Fragment key={`row1-${mat.id}-${index}`}>
              <div
                className="material-card-light"
                tabIndex={0}
                role="group"
                aria-label={`${mat.name} ${mat.grade}`}
              >
                <span className="card-light-name">{mat.name}</span>
                <span className="card-light-grade">{mat.grade}</span>
              </div>
              <StarSeparator />
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  };

  const renderRow2 = (items) => {
    const repeated = [...items, ...items, ...items, ...items];
    return (
      <div className="marquee-track-wrapper marquee-row-left-to-right">
        <div className="marquee-track">
          {repeated.map((mat, index) => (
            <React.Fragment key={`row2-${mat.id}-${index}`}>
              <div
                className="material-card-dark"
                tabIndex={0}
                role="group"
                aria-label={`${mat.name} ${mat.grade}`}
              >
                <span className="card-dark-name">{mat.name}</span>
                <span className="card-dark-badge">{mat.grade}</span>
              </div>
              <StarSeparator />
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section id="materials" ref={sectionRef} className="materials-section" aria-label="Materials We Work With">
      {/* Subtle Industrial Background Ambience */}
      <div className="materials-bg-overlay" aria-hidden="true" />

      {/* Section Header */}
      <div className="section-container">
        <div className="materials-header">
          <div className="section-eyebrow">
            <span className="eyebrow-accent-bar" />
            <span className="eyebrow-text">METALLURGICAL GRADES & ALLOYS</span>
          </div>

          <h2 className="materials-display-heading">
            MATERIAL <span className="text-highlight-red">WE WORK WITH</span>
          </h2>

          <p className="materials-supporting-line">
            High-performance alloys and special steels engineered for demanding international industrial applications.
          </p>
        </div>
      </div>

      {/* Dual Continuous Infinite Marquees matching reference color combination */}
      <div className="materials-marquees-container" aria-label="Continuous stream of metallurgical materials">
        {/* ROW 1: Light Cards (White background + Navy text + Red grade) moving Right → Left */}
        <div className="marquee-row-wrapper" aria-hidden="false">
          {renderRow1(materialsRow1)}
        </div>

        {/* ROW 2: Dark Cards (Navy background + White text + Red solid badge) moving Left → Right */}
        <div className="marquee-row-wrapper" aria-hidden="false">
          {renderRow2(materialsRow2)}
        </div>
      </div>

      {/* Subtle Bottom Technical Divider */}
      <div className="materials-bottom-divider" aria-hidden="true" />
    </section>
  );
}


