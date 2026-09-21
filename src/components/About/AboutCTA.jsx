import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { aboutCTAData } from '../../data/aboutData';
import { ArrowRight, PhoneCall } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function AboutCTA({ onNavigate }) {
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const linesRef = useRef(null);
  const actionsRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Converging lines animation
      if (linesRef.current) {
        gsap.fromTo(
          linesRef.current.querySelectorAll('.cta-converge-line'),
          { scaleX: 0, opacity: 0 },
          {
            scaleX: 1,
            opacity: 0.6,
            duration: 1.1,
            stagger: 0.1,
            ease: 'power3.inOut',
            scrollTrigger: {
              trigger: el,
              start: 'top 75%'
            }
          }
        );
      }

      // Heading scale from small into powerful statement
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { scale: 0.88, opacity: 0, y: 35 },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 80%'
            }
          }
        );
      }

      // Actions reveal
      if (actionsRef.current) {
        gsap.fromTo(
          actionsRef.current.children,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.15,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: actionsRef.current,
              start: 'top 85%'
            }
          }
        );
      }
    }, el);

    return () => ctx.revert();
  }, []);

  const handleQuoteClick = (e) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate('contact');
    }
  };

  return (
    <div ref={containerRef} className="about-cta-phase">
      {/* Background Converging Vector Lines */}
      <div ref={linesRef} className="about-cta-converge-wrap" aria-hidden="true">
        <div className="cta-converge-line line-left-diag" />
        <div className="cta-converge-line line-right-diag" />
        <div className="cta-converge-line line-horiz-top" />
        <div className="cta-converge-line line-horiz-bottom" />
        <div className="cta-ambient-glow" />
      </div>

      <div className="about-cta-container">
        {/* Eyebrow */}
        <div className="about-cta-eyebrow">
          <span className="eyebrow-accent-bar" />
          <span className="eyebrow-text">{aboutCTAData.eyebrow}</span>
        </div>

        {/* Scaling Cinematic Statement */}
        <div ref={headingRef} className="about-cta-statement">
          <h3 className="about-cta-main-title">
            {aboutCTAData.heading}
          </h3>
          <p className="about-cta-tagline">
            {aboutCTAData.tagline}
          </p>
          <p className="about-cta-desc">
            {aboutCTAData.description}
          </p>
        </div>

        {/* Action Buttons */}
        <div ref={actionsRef} className="about-cta-buttons-row">
          <a
            href="/contact"
            className="about-cta-primary-btn"
            aria-label="Request Technical Quote"
            onClick={handleQuoteClick}
          >
            <span>{aboutCTAData.primaryAction.label}</span>
            <ArrowRight size={18} className="cta-btn-icon" />
          </a>

          <a
            href={aboutCTAData.secondaryAction.href}
            className="about-cta-secondary-btn"
            aria-label="Call Export Desk"
          >
            <PhoneCall size={17} className="cta-btn-icon" />
            <span>{aboutCTAData.secondaryAction.label}</span>
          </a>
        </div>

        {/* Micro Guarantee Note */}
        <div className="about-cta-foot-note">
          <span>Official Export House accredited by Directorate General of Foreign Trade (DGFT), India</span>
        </div>
      </div>
    </div>
  );
}
