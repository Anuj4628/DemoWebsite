import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { aboutPartnersList } from '../../data/aboutData';
import { ShieldCheck, FileCheck2, Award } from 'lucide-react';

/**
 * AboutPartners: Premium Continuous Enterprise Partner Marquee
 * - Continuous infinite Right -> Left smooth gliding
 * - Elegant industrial card design with subtle borders, shadows, and depth
 * - Sophisticated center focus with deep teal (#125A48) & gold accents (NO red/pink)
 * - Redesigned integrated verification trust strip with icons and perfect alignment
 */
export default function AboutPartners() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const tweenRef = useRef(null);
  const rafRef = useRef(null);

  // Triple the items to ensure seamless infinite coverage across all resolutions
  const tripledPartners = [
    ...aboutPartnersList,
    ...aboutPartnersList,
    ...aboutPartnersList
  ];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // 1. Continuous smooth infinite horizontal translation from Right to Left
    const tween = gsap.to(track, {
      xPercent: -33.33333333,
      duration: 22,
      ease: 'none',
      repeat: -1
    });
    tweenRef.current = tween;

    // 2. Refined center zoom & elevation focus with subtle industrial styling
    const cards = track.querySelectorAll('.partner-slider-card');
    const updateCenterFocus = () => {
      const windowCenter = window.innerWidth / 2;
      const focusRadius = Math.min(window.innerWidth * 0.35, 420);

      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;
        const distanceFromCenter = Math.abs(cardCenter - windowCenter);

        if (distanceFromCenter < focusRadius) {
          const factor = Math.max(0, 1 - distanceFromCenter / focusRadius);
          const logoScale = 1.0 + factor * 0.08;
          const translateY = factor * -5;

          const imgEl = card.querySelector('.partner-slider-logo');
          if (imgEl) {
            imgEl.style.transform = `scale(${logoScale})`;
          }

          card.style.transform = `translateY(${translateY}px)`;

          if (factor > 0.45) {
            // Refined industrial focus: Brand Teal & subtle depth
            card.style.borderColor = 'rgba(18, 90, 72, 0.45)';
            card.style.boxShadow = '0 12px 24px -4px rgba(18, 90, 72, 0.08), 0 0 0 1px rgba(18, 90, 72, 0.15)';
            card.classList.add('is-focused');
          } else {
            card.style.borderColor = 'rgba(226, 232, 240, 0.95)';
            card.style.boxShadow = '0 2px 8px rgba(15, 23, 42, 0.04)';
            card.classList.remove('is-focused');
          }
        } else {
          const imgEl = card.querySelector('.partner-slider-logo');
          if (imgEl) {
            imgEl.style.transform = 'scale(1.0)';
          }
          card.style.transform = 'translateY(0px)';
          card.style.borderColor = 'rgba(226, 232, 240, 0.95)';
          card.style.boxShadow = '0 2px 8px rgba(15, 23, 42, 0.04)';
          card.classList.remove('is-focused');
        }
      });

      rafRef.current = requestAnimationFrame(updateCenterFocus);
    };

    rafRef.current = requestAnimationFrame(updateCenterFocus);

    return () => {
      tween.kill();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div ref={containerRef} className="about-partners-phase">
      <div className="about-partners-container">
        {/* Header */}
        <div className="partners-header">
          <div className="partners-eyebrow">
            <span className="eyebrow-accent-bar" />
            <span className="eyebrow-text">ENTERPRISE CLIENT NETWORK</span>
          </div>
          <h3 className="partners-heading">
            Trusted and Approved by <span className="highlight-teal">Industry Leaders</span>
          </h3>
          <p className="partners-subhead">
            Supplying certified alloy piping and engineered steel components to leading industrial conglomerates, energy majors, and global EPC contractors.
          </p>
        </div>

        {/* Continuous Logo Slider Viewport */}
        <div className="partners-slider-viewport">
          <div ref={trackRef} className="partners-slider-track">
            {tripledPartners.map((partner, index) => (
              <div
                key={`${partner.name}-${index}`}
                className="partner-slider-card"
                title={partner.name}
              >
                <div className="partner-card-accent" />
                <div className="partner-logo-box">
                  <img
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    className="partner-slider-logo"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Redesigned Integrated Verification Strip */}
        <div className="partners-trust-strip">
          <div className="trust-strip-inner">
            <div className="trust-strip-item">
              <div className="trust-strip-icon-box">
                <FileCheck2 size={16} className="trust-strip-icon" />
              </div>
              <div className="trust-strip-text">
                <span className="trust-item-title">100% Mill Certified</span>
                <span className="trust-item-detail">EN 10204 3.1 & 3.2 Traceability</span>
              </div>
            </div>

            <div className="trust-strip-separator" />

            <div className="trust-strip-item">
              <div className="trust-strip-icon-box">
                <ShieldCheck size={16} className="trust-strip-icon" />
              </div>
              <div className="trust-strip-text">
                <span className="trust-item-title">Third-Party Inspected</span>
                <span className="trust-item-detail">Lloyds • TUV • DNV • Bureau Veritas</span>
              </div>
            </div>

            <div className="trust-strip-separator" />

            <div className="trust-strip-item">
              <div className="trust-strip-icon-box">
                <Award size={16} className="trust-strip-icon" />
              </div>
              <div className="trust-strip-text">
                <span className="trust-item-title">Zero-Defect Record</span>
                <span className="trust-item-detail">International High-Pressure Compliance</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
