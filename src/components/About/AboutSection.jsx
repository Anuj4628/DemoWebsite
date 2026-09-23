import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// 9 Storytelling Phases in Exact Requested Flow:
// 1. Hero
// 2. Company Journey (2017 -> 2026)
// 3. Company Story
// 4. Quality & Metallurgy
// 5. Industries (Right-to-Left Slider)
// 6. Enterprise Partners & Certifications
// 7. Company Numbers & Closing CTA
import AboutIntro from './AboutIntro';
import AboutLegacy from './AboutLegacy';
import AboutLeadership from './AboutLeadership';
import AboutQuality from './AboutQuality';
import AboutIndustries from './AboutIndustries';
import AboutPartners from './AboutPartners';
import AboutCertifications from './AboutCertifications';
import AboutNumbers from './AboutNumbers';
import AboutCTA from './AboutCTA';

import './AboutSection.css';

gsap.registerPlugin(ScrollTrigger);

/**
 * AboutSection Master Orchestrator
 * High-End Industrial Steel Company Experience
 */
export default function AboutSection({ onNavigate }) {
  const masterRef = useRef(null);

  useEffect(() => {
    const el = masterRef.current;
    if (!el) return;

    // Refresh ScrollTrigger after initial mount and layout calculations
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <section
      id="about"
      ref={masterRef}
      className="about-master-section"
      aria-label="About Bhawal Steel & Engineering Company"
    >
      {/* 01: NEW ABOUT HERO */}
      <AboutIntro />

      {/* 02: COMPANY JOURNEY / 2017 TO 2026 (Progressive Curved Path) */}
      <AboutLegacy />

      {/* 03: COMPANY STORY & PHILOSOPHY (Split Layout) */}
      <AboutLeadership />

      {/* 04: QUALITY / EXPERTISE (Clean Technical Cards) */}
      <AboutQuality />

      {/* 05: INDUSTRIES WE POWER (Simple Right-to-Left Horizontal Slider) */}
      <AboutIndustries />

      {/* 06: APPROVED CLIENT PARTNERS (Clean Continuous Logo Marquee) */}
      <AboutPartners />

      {/* 07: COMPLIANCE & MATERIAL SPECTRUM (Laboratory Verification) */}
      <AboutCertifications />

      {/* 08: FINAL COMPANY STATS (Quantifiable Scale) */}
      <AboutNumbers />

      {/* 09: CLOSING PROCUREMENT CTA */}
      <AboutCTA onNavigate={onNavigate} />
    </section>
  );
}
