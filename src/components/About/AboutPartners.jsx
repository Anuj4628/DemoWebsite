import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { aboutPartnersList } from '../../data/aboutData';

/**
 * AboutPartners: Professional Continuous Logo Marquee
 * - Continuous infinite Right -> Left smooth gliding (not dependent on user scrolling)
 * - Crystal clear, crisp, sharp logos on clean cards (no cloudy fog, no blurry overlays)
 * - Subtle, sophisticated center zoom/focus effect (0.92 -> 1.05 -> 0.92)
 * - Seamless loop with zero jumps or gaps
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
      duration: 35,
      ease: 'none',
      repeat: -1
    });
    tweenRef.current = tween;

    // 2. Clear, prominent center zoom & elevation focus as logos pass through the main viewing area
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
          const logoScale = 1.0 + factor * 0.12; // Scaled up to 1.12 at center
          const translateY = factor * -6; // Smooth subtle elevation forward

          const imgEl = card.querySelector('.partner-slider-logo');
          if (imgEl) {
            imgEl.style.transform = `scale(${logoScale})`;
          }

          card.style.transform = `translateY(${translateY}px)`;

          if (factor > 0.45) {
            card.style.borderColor = 'rgba(211, 18, 42, 0.55)';
            card.style.boxShadow = '0 14px 32px -6px rgba(15, 23, 42, 0.14), 0 0 0 1.5px rgba(211, 18, 42, 0.22)';
            card.classList.add('is-focused');
          } else {
            card.style.borderColor = 'rgba(226, 232, 240, 0.9)';
            card.style.boxShadow = '0 4px 14px rgba(15, 23, 42, 0.04)';
            card.classList.remove('is-focused');
          }
        } else {
          const imgEl = card.querySelector('.partner-slider-logo');
          if (imgEl) {
            imgEl.style.transform = 'scale(1.0)';
          }
          card.style.transform = 'translateY(0px)';
          card.style.borderColor = 'rgba(226, 232, 240, 0.9)';
          card.style.boxShadow = '0 4px 14px rgba(15, 23, 42, 0.04)';
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
            <span className="eyebrow-text">ENTERPRISE SUPPLY NETWORK</span>
          </div>
          <h3 className="partners-heading">
            Trusted and Approved by <span className="highlight-red">Industry Leaders</span>
          </h3>
          <p className="partners-subhead">
            Continuous certified alloy supplies powering Fortune 500 energy conglomerates, heavy engineering titans, and national infrastructure projects.
          </p>
        </div>

        {/* Clean, Continuous Logo Slider Viewport (Crystal clear viewing area, zero cloudy fog) */}
        <div className="partners-slider-viewport">
          <div ref={trackRef} className="partners-slider-track">
            {tripledPartners.map((partner, index) => (
              <div
                key={`${partner.name}-${index}`}
                className="partner-slider-card"
                title={partner.name}
              >
                <div className="partner-logo-box">
                  <img
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    className="partner-slider-logo"
                    loading="lazy"
                  />
                </div>
                <span className="partner-card-label">{partner.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Trust Metric Bar - Clean corporate aesthetic */}
        <div className="partners-trust-strip">
          <div className="trust-strip-item">
            <span className="trust-strip-icon">✓</span>
            <span>100% Verified Mill Test Certifications</span>
          </div>
          <div className="trust-strip-divider" />
          <div className="trust-strip-item">
            <span className="trust-strip-icon">✓</span>
            <span>Third-Party Inspection by Lloyds / TUV / DNV / BV</span>
          </div>
          <div className="trust-strip-divider" />
          <div className="trust-strip-item">
            <span className="trust-strip-icon">✓</span>
            <span>Zero-Defect International Shipment Record</span>
          </div>
        </div>
      </div>
    </div>
  );
}
