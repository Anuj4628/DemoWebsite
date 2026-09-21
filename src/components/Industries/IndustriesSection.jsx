import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { sectorsData } from '../../data/homeSectionsData';
import { ArrowUpRight } from 'lucide-react';
import './IndustriesSection.css';

gsap.registerPlugin(ScrollTrigger);

export default function IndustriesSection() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current) return;

    const ctx = gsap.context(() => {
      // Header entrance
      gsap.fromTo(
        headerRef.current.children,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 82%',
            toggleActions: 'play none none none'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Repeat 4 times for an unbroken seamless continuous loop across any resolution
  const repeatedSectors = [...sectorsData, ...sectorsData, ...sectorsData, ...sectorsData];

  return (
    <section id="industries" ref={sectionRef} className="industries-section" aria-label="Serving Global Missions and Critical Sectors">
      {/* Background Subtle Industrial Ambient Line */}
      <div className="industries-bg-gradient" aria-hidden="true" />

      <div className="section-container">
        {/* Section Header */}
        <div ref={headerRef} className="industries-header">
          <div className="section-eyebrow">
            <span className="eyebrow-accent-bar" />
            <span className="eyebrow-text">APPLICATION SECTORS & GLOBAL MISSIONS</span>
          </div>

          <h2 className="section-display-heading">
            SERVING GLOBAL MISSIONS <span className="text-highlight-red">AND CRITICAL SECTORS</span>
          </h2>

          <p className="section-description">
            Precision-certified steel and specialized alloy components engineered for extreme environments, severe thermal cycles, and mission-critical specifications worldwide.
          </p>
        </div>
      </div>

      {/* Premium Horizontal Moving Showcase (Infinite Continuous Marquee) */}
      <div className="sectors-marquee-viewport" aria-label="Continuous showcase of mission-critical industry sectors">
        <div className="sectors-marquee-track">
          {repeatedSectors.map((sector, idx) => (
            <div
              key={`${sector.id}-${idx}`}
              className="sector-showcase-card"
              tabIndex={0}
              role="group"
              aria-label={`${sector.name} - ${sector.tag}`}
            >
              {/* Full Bleed Image Container */}
              <div className="sector-card-media">
                <img
                  src={sector.image}
                  alt={`${sector.name} industrial setting`}
                  className="sector-image"
                  loading="lazy"
                />
                <div className="sector-media-overlay" aria-hidden="true" />
              </div>

              {/* Sector Code / Standards Tag */}
              <div className="sector-top-badge">
                <span className="sector-code">{sector.code}</span>
                <span className="sector-divider-dot" />
                <span className="sector-tag">{sector.tag}</span>
              </div>

              {/* Card Foreground Content */}
              <div className="sector-card-content">
                <div className="sector-title-row">
                  <h3 className="sector-title">{sector.name}</h3>
                  <div className="sector-action-circle" aria-hidden="true">
                    <ArrowUpRight size={18} className="sector-action-icon" />
                  </div>
                </div>

                <p className="sector-description">{sector.shortDesc}</p>

                {/* Animated Accent Line */}
                <div className="sector-accent-line" aria-hidden="true" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

