import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowRight,
  Download,
  ExternalLink,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { BHAWAL_CATALOG_URL } from '../../constants/catalog';

gsap.registerPlugin(ScrollTrigger);

export default function ContactCatalogSection() {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 35, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact-catalog-section"
      ref={sectionRef}
      className="contact-catalog-section"
      aria-label="Explore Our Official Product Catalog"
    >
      <div className="section-container">
        <div ref={cardRef} className="contact-catalog-card">
          <div className="catalog-card-glow" aria-hidden="true" />
          <div className="catalog-card-grid-bg" aria-hidden="true" />

          {/* Left Column: Descriptive Information & Direct CTAs */}
          <div className="contact-catalog-content">
            <div className="catalog-eyebrow-wrap">
              <span className="catalog-pulse-indicator" aria-hidden="true" />
              <span className="catalog-eyebrow-text">TECHNICAL SPECIFICATION COMPENDIUM</span>
              <span className="catalog-badge-pill">OFFICIAL 2026 EDITION</span>
            </div>

            <h2 className="contact-catalog-heading">
              Explore Our <span className="highlight-gold">Catalog</span>
            </h2>

            <p className="contact-catalog-quote">
              “Discover our complete product range and capabilities.”
            </p>

            <p className="contact-catalog-desc">
              Access the official Bhawal Steel &amp; Engineering product compendium detailing complete dimensional schedules, ASME/ASTM/DIN tolerances, metallurgical alloy compositions, MTC compliance standards, and global export capabilities.
            </p>

            {/* Feature Highlights Grid */}
            <div className="catalog-highlights-grid">
              <div className="catalog-highlight-item">
                <CheckCircle2 size={16} className="highlight-icon" aria-hidden="true" />
                <span>Pipes, Tubes &amp; Hollow Sections</span>
              </div>
              <div className="catalog-highlight-item">
                <CheckCircle2 size={16} className="highlight-icon" aria-hidden="true" />
                <span>Butt Weld, Forged &amp; Socket Fittings</span>
              </div>
              <div className="catalog-highlight-item">
                <CheckCircle2 size={16} className="highlight-icon" aria-hidden="true" />
                <span>Flanges (Class 150# to 2500#)</span>
              </div>
              <div className="catalog-highlight-item">
                <CheckCircle2 size={16} className="highlight-icon" aria-hidden="true" />
                <span>Stainless, Duplex, Inconel &amp; Titanium Grades</span>
              </div>
            </div>

            {/* Action Buttons Row */}
            <div className="contact-catalog-actions">
              <a
                href={BHAWAL_CATALOG_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-contact-catalog-primary"
                title="Open Bhawal Steel & Engineering Official Product Catalog (PDF)"
              >
                <span>Explore Catalog</span>
                <ArrowRight size={18} className="btn-catalog-arrow" aria-hidden="true" />
              </a>

              <a
                href={BHAWAL_CATALOG_URL}
                download="Bhawal_Steel_Engineering_Catalog.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-contact-catalog-secondary"
                title="Download Bhawal Steel Engineering Client Catalog PDF"
              >
                <Download size={16} aria-hidden="true" />
                <span>Download PDF (4.2 MB)</span>
              </a>
            </div>
          </div>

          {/* Right Column: Visual Catalog Showcase Booklet */}
          <div className="contact-catalog-visual">
            <a
              href={BHAWAL_CATALOG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="catalog-visual-card"
              title="Click to view Bhawal Steel & Engineering Official Catalog (PDF)"
            >
              <div className="catalog-cover-sheet">
                <div className="cover-header">
                  <span className="cover-logo-mark">BSEC</span>
                  <span className="cover-edition-tag">OFFICIAL CATALOG</span>
                </div>

                <div className="cover-center">
                  <span className="cover-company-name">BHAWAL STEEL &amp; ENGINEERING CO.</span>
                  <div className="cover-divider-gold" />
                  <h3 className="cover-main-title">CLIENT PRODUCT CATALOG</h3>
                  <p className="cover-specs-tag">PIPES • TUBES • FITTINGS • FLANGES • SHEETS • ALLOY STEEL</p>
                </div>

                <div className="cover-footer">
                  <div className="cover-meta-item">
                    <ShieldCheck size={14} className="cover-meta-icon" />
                    <span>ISO 9001:2015 REGISTERED</span>
                  </div>
                  <div className="cover-pdf-action">
                    <span>EXPLORE PDF</span>
                    <ExternalLink size={13} />
                  </div>
                </div>
              </div>

              {/* Stacked sheets illusion */}
              <div className="catalog-stacked-sheet sheet-2" aria-hidden="true" />
              <div className="catalog-stacked-sheet sheet-3" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
