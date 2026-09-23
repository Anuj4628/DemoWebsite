import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { aboutQualityPrinciples } from '../../data/aboutData';
import {
  Crosshair,
  Gauge,
  FileCheck,
  ShieldCheck,
  Search,
  Truck,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const principleIcons = {
  'dimensional-precision': Crosshair,
  'chemical-integrity': Gauge,
  'mill-traceability': FileCheck,
  'severe-service': ShieldCheck,
  'surface-ndt': Search,
  'reliable-supply': Truck
};

export default function AboutQuality() {
  const containerRef = useRef(null);
  const gridRef = useRef(null);
  const [activeCardId, setActiveCardId] = useState(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll('.quality-card');
      if (cards && cards.length) {
        gsap.fromTo(
          cards,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.08,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 82%'
            }
          }
        );
      }
    }, el);

    return () => ctx.revert();
  }, []);

  const handleCardToggle = (id) => {
    setActiveCardId((prev) => (prev === id ? null : id));
  };

  return (
    <section ref={containerRef} className="about-quality-phase" aria-label="Our Quality Promise">
      <div className="about-quality-container">
        {/* Header */}
        <div className="quality-header">
          <div className="quality-eyebrow">
            <span className="eyebrow-accent-bar" />
            <span className="eyebrow-text">METALLURGICAL RIGOR &amp; ZERO DEFECTS</span>
          </div>
          <h2 className="quality-heading">
            Our Quality <span className="highlight-teal">Promise</span>
          </h2>
          <p className="quality-subhead">
            Engineered compliance across high-stress industrial environments. Calibrated to international ASTM, ASME, DIN, and ISO standards.
          </p>
        </div>

        {/* Clean 3 Columns × 2 Rows Desktop Grid (6 Cards Total) */}
        <div ref={gridRef} className="quality-cards-grid" role="region" aria-label="Quality Promise Cards">
          {aboutQualityPrinciples.map((principle) => {
            const IconComp = principleIcons[principle.id] || ShieldCheck;
            const isActive = activeCardId === principle.id;

            return (
              <article
                key={principle.id}
                className={`quality-card ${isActive ? 'is-active' : ''}`}
                tabIndex={0}
                onClick={() => handleCardToggle(principle.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCardToggle(principle.id);
                  }
                }}
              >
                {/* Precision Corner Marks */}
                <div className="card-corner-mark corner-top-left" aria-hidden="true" />
                <div className="card-corner-mark corner-bottom-right" aria-hidden="true" />

                {/* Default Visible Card Body */}
                <div className="quality-card-default-body">
                  <div className="quality-card-head">
                    <span className="card-spec-code">SPEC // {principle.number}</span>
                    <span className="card-tag-pill">{principle.tag}</span>
                  </div>

                  <div className="quality-icon-stage" aria-hidden="true">
                    <IconComp size={22} className="quality-icon" />
                  </div>

                  <h3 className="quality-card-title">{principle.title}</h3>
                  <span className="quality-card-subtitle">{principle.subtitle}</span>
                  <p className="quality-card-desc">{principle.description}</p>

                  <div className="quality-hint-row" aria-hidden="true">
                    <span className="hint-label">INSPECTION CRITERIA</span>
                    <ChevronRight size={14} className="hint-arrow" />
                  </div>
                </div>

                {/* Smooth Diagonal Reveal Detail Panel (Reveals upward on hover) */}
                <div className="quality-diagonal-panel" aria-live="polite">
                  <div className="diagonal-edge-glow" aria-hidden="true" />

                  <div className="diagonal-panel-inner">
                    <div className="diagonal-panel-header">
                      <span className="panel-spec-chip">CRITERIA // 0{principle.number}</span>
                      <span className="panel-tag-pill">{principle.tag}</span>
                    </div>

                    <ul className="diagonal-details-list">
                      {principle.details.map((detail, dIdx) => (
                        <li key={dIdx} className="diagonal-detail-item">
                          <CheckCircle2 size={13} className="diagonal-check-icon" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="diagonal-panel-footer">
                      <span className="diagonal-status-tag">{principle.statusTag}</span>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
