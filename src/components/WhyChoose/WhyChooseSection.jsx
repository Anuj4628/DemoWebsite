import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ShieldCheck,
  Award,
  Globe2,
  Layers,
  Cpu,
  Clock
} from 'lucide-react';
import './WhyChooseSection.css';

gsap.registerPlugin(ScrollTrigger);

const whyChooseBenefits = [
  {
    index: "01",
    icon: ShieldCheck,
    title: "Engineered Quality",
    description: "Stringent mechanical, chemical, and non-destructive testing under international standards with zero tolerance for deviations.",
    tag: "100% PMI & UT TESTED"
  },
  {
    index: "02",
    icon: Award,
    title: "Certified Metallurgy",
    description: "Certified Mill Test Reports (MTRs) with complete chemical spectroscopy, heat treatment, and third-party inspection compliance.",
    tag: "EN 10204 3.1 & 3.2 MTR"
  },
  {
    index: "03",
    icon: Globe2,
    title: "Global Supply",
    description: "Direct alliances with audited primary producers and synchronized multimodal export logistics serving worldwide industrial hubs.",
    tag: "45+ EXPORT DESTINATIONS"
  },
  {
    index: "04",
    icon: Layers,
    title: "Complete Traceability",
    description: "Unbroken heat-number stamping and archival documentation tracking every component from primary melt to final delivery.",
    tag: "100% HEAT TRACEABILITY"
  },
  {
    index: "05",
    icon: Cpu,
    title: "Industrial Expertise",
    description: "Over 25 years of specialized metallurgical consulting, precision in-house profiling, and custom turnkey EPC engineering support.",
    tag: "25+ YEARS EXCELLENCE"
  },
  {
    index: "06",
    icon: Clock,
    title: "Reliable Delivery",
    description: "Comprehensive stock inventory, rapid global dispatch, and milestone-synchronized staging packaged to ISPM-15 export standards.",
    tag: "IMMEDIATE STOCK & DISPATCH"
  }
];

export default function WhyChooseSection() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current || !gridRef.current) return;

    const ctx = gsap.context(() => {
      // Header reveal
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { opacity: 0, y: 22 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          }
        );
      }

      // 6 Cards staggered entrance
      const cards = gridRef.current.querySelectorAll('.why-choose-card');
      gsap.fromTo(
        cards,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
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
      id="about"
      ref={sectionRef}
      className="why-choose-section"
      aria-label="Why Choose Bhawal Steel & Engineering Company"
    >
      <div className="section-container">
        {/* 1. Centered Section Header */}
        <div ref={headerRef} className="why-choose-header">
          <div className="section-eyebrow">
            <span className="eyebrow-accent-bar" aria-hidden="true" />
            <span className="eyebrow-text">UNCOMPROMISING INDUSTRIAL EXCELLENCE</span>
            <span className="eyebrow-accent-bar" aria-hidden="true" />
          </div>

          <h2 className="why-choose-heading">
            WHY <span className="heading-accent">CHOOSE US</span>
          </h2>

          <p className="why-choose-subtext">
            Precision metallurgy, audited mill partnerships, and verified code compliance engineered for mission-critical industrial applications.
          </p>
        </div>

        {/* 2. Balanced 3 x 2 Industrial Benefits Grid */}
        <div ref={gridRef} className="why-choose-grid">
          {whyChooseBenefits.map((benefit) => {
            const IconComponent = benefit.icon;
            return (
              <article key={benefit.index} className="why-choose-card">
                <div className="card-top-row">
                  <div className="card-icon-box" aria-hidden="true">
                    <IconComponent size={22} />
                  </div>
                  <span className="card-index-num">{benefit.index}</span>
                </div>

                <div className="card-main-content">
                  <h3 className="card-title">{benefit.title}</h3>
                  <p className="card-desc">{benefit.description}</p>
                </div>

                <div className="card-bottom-row">
                  <span className="card-spec-badge">{benefit.tag}</span>
                </div>

                <span className="card-hover-border" aria-hidden="true" />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
