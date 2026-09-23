import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { aboutIntroData } from '../../data/aboutData';
import aboutHeroSteels from '../../assets/images/about-hero-steels.jpg';
import { ArrowRight, ShieldCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function AboutIntro() {
  const containerRef = useRef(null);
  const headlineRef = useRef(null);
  const badgeRef = useRef(null);
  const textContentRef = useRef(null);
  const metricsRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' }
      });

      // Subtle, confident entrance animation
      tl.fromTo(
        badgeRef.current,
        { y: -16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, delay: 0.1 }
      )
        .fromTo(
          headlineRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9 },
          '-=0.4'
        )
        .fromTo(
          textContentRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          '-=0.5'
        )
        .fromTo(
          metricsRef.current?.children,
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1, duration: 0.6 },
          '-=0.4'
        );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="about-hero-phase"
      style={{ backgroundImage: `url(${aboutHeroSteels})` }}
    >
      {/* High-grade Industrial Overlay */}
      <div className="about-hero-bg-overlay" aria-hidden="true" />

      {/* Engineering Blueprint Reticle & Coordinates */}
      <div className="hero-blueprint-lines" aria-hidden="true">
        <div className="hero-grid-pattern" />
        <span className="hero-coordinate top-left">LAT 18° 57' N // LON 72° 49' E</span>
        <span className="hero-coordinate top-right">MUMBAI HUB // EXPORT REG</span>
        <span className="hero-coordinate bottom-left">EN-10204 3.1 / 3.2 PROVENANCE</span>
        <span className="hero-coordinate bottom-right">ISO 9001:2015 REGISTERED</span>
      </div>

      <div className="about-hero-container">
        {/* Eyebrow Badge */}
        <div ref={badgeRef} className="about-hero-eyebrow">
          <span className="hero-pulse-dot" />
          <span className="hero-eyebrow-text">{aboutIntroData.eyebrow}</span>
          <span className="hero-code-tag">FOUNDATION 2017</span>
        </div>

        {/* Large Premium Headline */}
        <h1 ref={headlineRef} className="about-hero-headline">
          <span className="hero-headline-line">{aboutIntroData.headlineLine1}</span>
          <span className="hero-headline-line accent-text">{aboutIntroData.headlineLine2}</span>
        </h1>

        {/* Concise Supporting Description */}
        <div ref={textContentRef} className="about-hero-content">
          <p className="about-hero-lead">{aboutIntroData.lead}</p>
          <p className="about-hero-sub">{aboutIntroData.description}</p>
        </div>

        {/* Clean Supporting Metrics & CTA */}
        <div ref={metricsRef} className="about-hero-bottom-bar">
          <div className="hero-metrics-pill">
            {aboutIntroData.metrics.map((m, idx) => (
              <React.Fragment key={m.label}>
                <div className="hero-metric-item">
                  <span className="hero-metric-num">{m.num}</span>
                  <span className="hero-metric-label">{m.label}</span>
                </div>
                {idx < aboutIntroData.metrics.length - 1 && (
                  <div className="hero-metric-divider" aria-hidden="true" />
                )}
              </React.Fragment>
            ))}
          </div>

          <div className="hero-cta-action">
            <a href="#company-journey" className="hero-explore-btn">
              <span>Explore Company Journey</span>
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
