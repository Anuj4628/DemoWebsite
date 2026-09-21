import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import heroBg from '../../assets/images/contact-hero.png';
import {
  Send,
  Phone,
  ShieldCheck,
  Award,
  FileCheck,
  ChevronRight
} from 'lucide-react';
import { brandDetails } from '../../data/navigationData';

export default function ContactHero() {
  const heroRef = useRef(null);
  const cardRef = useRef(null);
  const breadcrumbRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !heroRef.current) return;

    const ctx = gsap.context(() => {
      // Animate breadcrumb
      if (breadcrumbRef.current) {
        gsap.fromTo(
          breadcrumbRef.current,
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out', delay: 0.1 }
        );
      }

      // Animate floating contact card
      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          { opacity: 0, y: 35, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            ease: 'power3.out',
            delay: 0.2
          }
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleScrollToRFQ = (e) => {
    e.preventDefault();
    const target = document.getElementById('rfq-section');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={heroRef} className="contact-hero" aria-label="Contact Redcore Steels">
      {/* Background Image: Crisp, clear, vibrant photographic backdrop with no muddy filters */}
      <div className="contact-hero-bg-wrap" aria-hidden="true">
        <img
          src={heroBg}
          alt="Redcore Steels Corporate Handshake"
          className="contact-hero-bg-img"
          loading="eager"
          fetchPriority="high"
        />
        {/* Soft, natural directional overlay to ensure card readability while keeping handshake 100% visible */}
        <div className="contact-hero-clear-overlay" />
        {/* Seamless bottom transition to cover any white gap and blend smoothly into Section 1 */}
        <div className="contact-hero-bottom-transition" />
      </div>

      <div className="section-container contact-hero-container">
        {/* Top-Left Breadcrumb */}
        <nav ref={breadcrumbRef} className="contact-breadcrumb" aria-label="Breadcrumb">
          <a href="/" className="breadcrumb-item">HOME</a>
          <ChevronRight size={13} className="breadcrumb-separator" aria-hidden="true" />
          <span className="breadcrumb-item current">CONTACT US</span>
        </nav>

        {/* Hero Split Layout: Clear visual on left, Floating Glass Card on right */}
        <div className="contact-hero-grid">
          <div className="contact-hero-spacer" aria-hidden="true" />

          {/* Floating Dark Glassmorphism Contact Card (Matching User Reference Image 1) */}
          <div ref={cardRef} className="contact-hero-floating-card">
            {/* Top Specification Pill */}
            <div className="floating-card-pill">
              <span className="pill-diamond" aria-hidden="true">◆</span>
              <span className="pill-text">[OFFICIAL CATALOGUE CONTACT SPECIFICATION]</span>
            </div>

            {/* Main Heading */}
            <h1 className="floating-card-title">
              Get in <span className="title-highlight-orange">Touch</span>
            </h1>

            {/* Subtitle */}
            <p className="floating-card-description">
              Premier Indian manufacturer, stockist, and global exporter of Ferrous & Non-Ferrous Metals — Stainless Steel, Carbon Steel, Duplex, Super Duplex, Inconel, Rods, Sheets, Pipes & Pipe Fittings.
            </p>

            {/* Action Buttons */}
            <div className="floating-card-actions">
              <a
                href="#rfq-section"
                onClick={handleScrollToRFQ}
                className="btn-hero-action btn-hero-rfq"
                title="Request Instant RFQ"
              >
                <Send size={15} className="btn-action-icon" aria-hidden="true" />
                <span>REQUEST INSTANT RFQ</span>
              </a>

              <a
                href={`tel:${brandDetails.contact.phone1Raw}`}
                className="btn-hero-action btn-hero-call"
                title="Call Technical Direct Desk"
              >
                <Phone size={15} className="btn-action-icon" aria-hidden="true" />
                <span>DIRECT CALL DESK</span>
              </a>
            </div>

            {/* Bottom Verification Badges */}
            <div className="floating-card-badges-row">
              <div className="hero-cert-badge">
                <Award size={13} className="cert-icon" aria-hidden="true" />
                <span>ISO 9001:2015</span>
              </div>
              <div className="hero-cert-badge">
                <ShieldCheck size={13} className="cert-icon" aria-hidden="true" />
                <span>MSME UDYAM CERTIFIED</span>
              </div>
              <div className="hero-cert-badge">
                <FileCheck size={13} className="cert-icon" aria-hidden="true" />
                <span>ASME & EN 10204 3.1</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
