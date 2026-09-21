import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { getAllMaterials } from '../../../data/materialsData';
import { Layers, ShieldCheck, ArrowRight } from 'lucide-react';
import './MaterialsLandingView.css';

/**
 * Materials Landing View
 * Dedicated page showcasing the EXACT 9 Material Categories with authentic representative product images.
 */
export default function MaterialsLandingView({ onNavigate }) {
  const heroRef = useRef(null);
  const gridRef = useRef(null);
  const materials = getAllMaterials();

  // GSAP Entrance Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (heroRef.current) {
        gsap.fromTo(
          heroRef.current.children,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out' }
        );
      }

      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll('.material-category-card');
        gsap.fromTo(
          cards,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: 'power2.out', delay: 0.25 }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const handleCardClick = (slug) => {
    if (onNavigate) {
      onNavigate(`/materials/${slug}`);
    }
  };

  return (
    <div className="materials-landing-view">
      {/* 1. Hero Section: Clean, sleek industrial treatment (No huge white text box) */}
      <section className="materials-hero-section">
        <div className="materials-hero-bg-texture" aria-hidden="true" />
        <div className="materials-hero-overlay" aria-hidden="true" />

        <div className="materials-hero-container" ref={heroRef}>
          <div className="materials-hero-eyebrow">
            <span className="eyebrow-accent-bar" />
            <span className="eyebrow-label">METALLURGICAL GRADES &amp; INDUSTRIAL ALLOYS</span>
          </div>

          <h1 className="materials-hero-heading">
            Materials <span className="text-highlight-red">We Work With</span>
          </h1>

          <p className="materials-hero-subtitle">
            High-performance alloys and special steels engineered for demanding international industrial applications, 
            extreme thermal environments, and corrosive media.
          </p>

          {/* Key Trust & Metric Chips */}
          <div className="materials-hero-metrics-row">
            <div className="materials-hero-chip">
              <Layers size={14} className="chip-icon" />
              <span>9 Certified Metallurgical Materials</span>
            </div>
            <div className="materials-hero-chip">
              <ShieldCheck size={14} className="chip-icon" />
              <span>100% PMI Tested with EN 10204 3.1 &amp; 3.2 MTC</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Exactly 9 Material Cards Grid */}
      <section className="materials-grid-section" aria-label="Available Materials">
        <div className="materials-grid-container">
          <div className="materials-section-header">
            <div className="section-title-wrap">
              <span className="section-small-eyebrow">STANDARDIZED ALLOY CATALOG</span>
              <h2 className="section-main-title">SELECT A MATERIAL TO EXPLORE PRODUCTS</h2>
            </div>
            <span className="materials-count-pill">9 Specialized Materials</span>
          </div>

          <div className="materials-cards-grid" ref={gridRef}>
            {materials.map((mat, index) => (
              <article
                key={mat.id}
                className="material-category-card"
                onClick={() => handleCardClick(mat.slug)}
                tabIndex={0}
                role="button"
                aria-label={`Explore ${mat.name} products`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCardClick(mat.slug);
                  }
                }}
              >
                {/* Top Subtle Redcore Accent */}
                <div className="mat-card-top-bar" aria-hidden="true" />

                {/* Card Media Container */}
                <div className="mat-card-media-wrap">
                  <img
                    src={mat.image}
                    alt={`${mat.name} representative industrial component`}
                    className="mat-card-image"
                    loading={index < 3 ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                  <div className="mat-card-media-overlay" aria-hidden="true" />
                  
                  <span className="mat-card-product-count">
                    {mat.productCount} Products
                  </span>
                </div>

                {/* Card Content */}
                <div className="mat-card-content">
                  <div className="mat-card-header-row">
                    <h3 className="mat-card-title">{mat.name}</h3>
                    <span className="mat-card-badge">{mat.badge}</span>
                  </div>

                  <p className="mat-card-grade-line" title={mat.grade}>
                    {mat.grade}
                  </p>

                  <p className="mat-card-desc">
                    {mat.shortDesc}
                  </p>

                  {/* Card Action Footer */}
                  <div className="mat-card-action-bar">
                    <span className="mat-card-action-text">Explore {mat.name}</span>
                    <span className="mat-card-action-arrow">
                      <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Technical Metallurgy Quality Assurance Banner */}
      <section className="materials-qa-strip">
        <div className="materials-grid-container">
          <div className="materials-qa-card">
            <div className="materials-qa-content">
              <span className="qa-eyebrow">HEAT TRACEABILITY &amp; METALLURGICAL COMPLIANCE</span>
              <h3>Need Customized Metallurgy, Specific Chemistry or Project Certifications?</h3>
              <p>
                All 9 material categories undergo mandatory Positive Material Identification (PMI), ultrasonic testing, 
                and are supplied with complete EN 10204 Type 3.1 &amp; 3.2 Material Test Certificates.
              </p>
            </div>
            <div className="materials-qa-actions">
              <a
                href="https://wa.me/919000000000?text=Hello%20Redcore%20Steels,%20I%20have%20an%20inquiry%20regarding%20metallurgical%20materials"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-qa-whatsapp"
              >
                <span>Technical Desk WhatsApp</span>
              </a>
              <a
                href="mailto:info@redcoresteels.com?subject=Material%20Specification%20Inquiry"
                className="btn-qa-email"
              >
                <span>Email Specifications</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
