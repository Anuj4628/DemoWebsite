import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { sectorsData } from '../../data/homeSectionsData';
import { ArrowUpRight, ChevronRight } from 'lucide-react';
import './IndustriesSection.css';

gsap.registerPlugin(ScrollTrigger);

export default function IndustriesSection({ onNavigate }) {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);

  // Replicate 3 times for a mathematically gapless continuous Right-to-Left loop
  const continuousSectors = [
    ...sectorsData,
    ...sectorsData,
    ...sectorsData
  ];

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current) return;

    const ctx = gsap.context(() => {
      // Header entrance
      gsap.fromTo(
        headerRef.current.children,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCardClick = () => {
    if (typeof onNavigate === 'function') {
      onNavigate('/contact');
    }
  };

  return (
    <section
      id="industries"
      ref={sectionRef}
      className="industries-section"
      aria-label="Industries We Power"
    >
      <div className="section-container">
        {/* 1. Perfectly Centered Section Header */}
        <div ref={headerRef} className="industries-header">
          <div className="section-eyebrow">
            <span className="eyebrow-accent-bar" aria-hidden="true" />
            <span className="eyebrow-text">STRATEGIC APPLICATION SECTORS</span>
            <span className="eyebrow-accent-bar" aria-hidden="true" />
          </div>

          <h2 className="industries-main-heading">
            INDUSTRIES <span className="heading-accent">WE POWER</span>
          </h2>

          <p className="industries-lead-desc">
            Engineered metallurgical solutions delivering certified strength, corrosion resistance, and thermal endurance across demanding global sectors.
          </p>
        </div>
      </div>

      {/* 2. Continuous Right -> Left Horizontal Slider Track */}
      <div
        className="industries-slider-wrapper"
        aria-label="Continuous right to left industry slider"
      >
        <div className="industries-slider-track">
          {continuousSectors.map((sector, index) => (
            <article
              key={`industry-slide-${sector.id}-${index}`}
              className="industry-compact-card"
              tabIndex={0}
              role="group"
              aria-label={`${sector.name} - ${sector.tag}`}
              onClick={handleCardClick}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleCardClick();
                }
              }}
            >
              {/* Full Bleed Image Layer */}
              <div className="industry-media-box">
                <img
                  src={sector.image}
                  alt={`${sector.name} industrial infrastructure`}
                  className="industry-card-photo"
                  loading="lazy"
                />
                <div className="industry-card-overlay" aria-hidden="true" />
              </div>

              {/* Top Meta Bar */}
              <div className="card-top-badges">
                <div className="badge-group">
                  <span className="badge-code">{sector.code}</span>
                  <span className="badge-standard">{sector.tag}</span>
                </div>

                <div className="card-action-btn" aria-hidden="true">
                  <ArrowUpRight size={15} />
                </div>
              </div>

              {/* Bottom Content Area */}
              <div className="card-bottom-info">
                <h3 className="industry-card-title">{sector.name}</h3>
                <p className="industry-card-desc">{sector.shortDesc}</p>
                <span className="card-bottom-accent" aria-hidden="true" />
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* 3. Centered Technical Assurance Strip */}
      <div className="section-container">
        <div className="industries-bottom-bar">
          <span className="industries-compliance-note">
            Compliant with ASME Section VIII &bull; NACE MR0175 &bull; API 5L &bull; ISO 15156 sector specifications.
          </span>
          <a
            href="/contact"
            className="industries-estimate-cta"
            onClick={(e) => {
              if (onNavigate) {
                e.preventDefault();
                onNavigate('/contact');
              }
            }}
          >
            <span>Request Project Supply Estimate</span>
            <ChevronRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
