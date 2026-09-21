import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// 9 Storytelling Phases
import AboutIntro from './AboutIntro';
import AboutLegacy from './AboutLegacy';
import AboutQuality from './AboutQuality';
import AboutPartners from './AboutPartners';
import AboutLeadership from './AboutLeadership';
import AboutIndustries from './AboutIndustries';
import AboutNumbers from './AboutNumbers';
import AboutCertifications from './AboutCertifications';
import AboutCTA from './AboutCTA';

import './AboutSection.css';

gsap.registerPlugin(ScrollTrigger);

/**
 * AboutSection Master Orchestrator
 * Cinematic, continuous scroll-driven industrial story for Redcore Steels
 */
export default function AboutSection({ onNavigate }) {
  const masterRef = useRef(null);

  useEffect(() => {
    const el = masterRef.current;
    if (!el) return;

    // Refresh ScrollTrigger so all pinned horizontal scroll & scrub coordinates calculate cleanly
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <section
      id="about"
      ref={masterRef}
      className="about-master-section"
      aria-label="About Redcore Steels - Heritage, Metallurgy and Global Vision"
    >
      {/* 01: About Intro / Opening */}
      <AboutIntro />

      {/* 02: The Steel Legacy of Redcore Steels (Pinned Horizontal Journey) */}
      <AboutLegacy />

      {/* 03: Our Quality Promise (Precision Engineering Assembly) */}
      <AboutQuality />

      {/* 04: Trusted and Approved by Industry Leaders (Continuous Logo Marquee) */}
      <AboutPartners />

      {/* 05: Leadership & Vision (Converging Split Composition) */}
      <AboutLeadership />

      {/* 06: Industries We Power (Interactive Industrial Ecosystem) */}
      <AboutIndustries />

      {/* 07: Impact / Company Numbers (Dynamic GSAP Numerical Counters) */}
      <AboutNumbers />

      {/* 08: Certifications / Material Capability (Laboratory Scanner & Swatches) */}
      <AboutCertifications />

      {/* 09: Final Cinematic CTA (Converging Vectors & Conclusion) */}
      <AboutCTA onNavigate={onNavigate} />
    </section>
  );
}
