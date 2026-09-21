import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  FileText,
  Sliders,
  Layers,
  Calculator,
  Truck,
  HelpCircle,
  CheckCircle2,
  ArrowUpRight
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const technicalCapabilities = [
  {
    code: 'SPEC-01',
    icon: FileText,
    title: 'Product Information',
    desc: 'Full dimensional tables, outer diameters, schedules, wall thicknesses, and tolerances for piping, fittings, and flanges.',
    tag: 'DIMENSIONS & SCHEDULES',
    highlights: ['ASME B16.9 / B16.5 / B16.11', 'Tolerances to Mill Standards']
  },
  {
    code: 'SPEC-02',
    icon: Sliders,
    title: 'Technical Specifications',
    desc: 'Strict compliance with ASTM, ASME, DIN, ISO, and EN standards with EN 10204 3.1 / 3.2 Material Test Certificates.',
    tag: 'CODE & MTC COMPLIANCE',
    highlights: ['EN 10204 3.1 & 3.2 Certified', 'NACE MR0175 / ISO 15156']
  },
  {
    code: 'SPEC-03',
    icon: Layers,
    title: 'Material Requirements',
    desc: 'Metallurgical selection assistance across Stainless, Carbon, Alloy, Duplex, Super Duplex, Inconel, Hastelloy, and Titanium.',
    tag: 'METALLURGY & ALLOYS',
    highlights: ['High-Nickel & Super Alloys', '100% Spectro & PMI Verified']
  },
  {
    code: 'SPEC-04',
    icon: Calculator,
    title: 'Pricing & Quotation',
    desc: 'Fast, competitive, itemized pricing under FOB, CIF, or Ex-Works commercial terms tailored for global project deliveries.',
    tag: 'CIF / FOB / EX-WORKS',
    highlights: ['Guaranteed 4-Hour Response', 'Transparent Cost Breakdowns']
  },
  {
    code: 'SPEC-05',
    icon: Truck,
    title: 'Bulk Requirements',
    desc: 'Containerized export dispatches, mill order scheduling, high-volume project supply, and staging across sea and air routes.',
    tag: 'LOGISTICS & STAGING',
    highlights: ['Direct Mill Rolling Schedules', 'Seaworthy Export Packaging']
  },
  {
    code: 'SPEC-06',
    icon: HelpCircle,
    title: 'General Enquiries',
    desc: 'Third-Party Inspection coordination (TUV, DNV, Lloyds, Bureau Veritas), plant audits, and custom fabrication.',
    tag: 'TPI & PLANT AUDITS',
    highlights: ['Global Agency Clearances', 'Custom Spool Fabrication']
  }
];

export default function ContactIntro() {
  const sectionRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Intro text reveal
      gsap.fromTo(
        '.contact-intro-header',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact-intro-header',
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );

      // Cards staggered reveal
      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.09,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact-intro-section"
      ref={sectionRef}
      className="contact-intro-section"
      aria-label="Connect With Our Technical Team"
    >
      <div className="section-container">
        {/* Header Block */}
        <div className="contact-intro-header">
          <div className="section-eyebrow">
            <span className="eyebrow-accent-line" aria-hidden="true" />
            <span className="eyebrow-text">ENGINEERING & COMMERCIAL CONSULTATION</span>
          </div>

          <h2 className="section-main-heading">
            CONNECT WITH OUR <span className="heading-highlight">TECHNICAL TEAM</span>
          </h2>

          <p className="contact-intro-description">
            At Redcore Steels, our metallurgical sales engineers work in direct synergy with procurement heads, structural designers, and project managers across oil & gas, petrochemical, marine, nuclear, and heavy process industries. Whether your procurement requires tight chemical tolerances, specialized high-nickel alloy sourcing, non-standard schedules, or fast CIF project estimation, our team delivers immediate technical clarity and certified documentation.
          </p>

          <div className="contact-intro-check-bar">
            <div className="check-bar-item">
              <CheckCircle2 size={16} className="check-bar-icon" />
              <span>Dedicated Metallurgical Specialists</span>
            </div>
            <div className="check-bar-item">
              <CheckCircle2 size={16} className="check-bar-icon" />
              <span>Complete MTC & Test Documentation</span>
            </div>
            <div className="check-bar-item">
              <CheckCircle2 size={16} className="check-bar-icon" />
              <span>International Code Compliance (ASME/ASTM/DIN)</span>
            </div>
          </div>
        </div>

        {/* 6 Advanced Technical Capabilities Grid */}
        <div ref={cardsRef} className="contact-capabilities-grid">
          {technicalCapabilities.map((cap, idx) => {
            const Icon = cap.icon;
            return (
              <div key={idx} className="capability-card advanced-cap-card">
                <div className="cap-card-top-row">
                  <div className="capability-icon-wrap">
                    <Icon size={20} className="capability-icon" aria-hidden="true" />
                  </div>
                  <span className="cap-code-badge">{cap.code}</span>
                </div>

                <div className="capability-content">
                  <span className="cap-meta-tag">{cap.tag}</span>
                  <h3 className="capability-title">{cap.title}</h3>
                  <p className="capability-desc">{cap.desc}</p>

                  {/* Feature Highlights Pills */}
                  <div className="cap-highlights-row">
                    {cap.highlights.map((h, hIdx) => (
                      <span key={hIdx} className="cap-micro-pill">
                        <span className="micro-bullet" aria-hidden="true">▪</span>
                        <span>{h}</span>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="cap-card-footer">
                  <a href="#rfq-section" className="cap-action-link" title={`Inquire about ${cap.title}`}>
                    <span>Consult Specification</span>
                    <ArrowUpRight size={14} className="cap-arrow-icon" aria-hidden="true" />
                  </a>
                </div>

                <span className="capability-card-border" aria-hidden="true" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
