import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { valueAddedData } from '../../data/homeSectionsData';
import { CheckCircle2, FileCheck, Layers, PackageCheck, Sliders, ShieldCheck, ArrowUpRight } from 'lucide-react';
import './ValueAddedSection.css';

gsap.registerPlugin(ScrollTrigger);

const serviceIcons = {
  "material-sourcing": Layers,
  "quality-inspection": ShieldCheck,
  "testing-documentation": FileCheck,
  "custom-requirements": Sliders,
  "project-supply": CheckCircle2,
  "export-packaging": PackageCheck
};

export default function ValueAddedSection() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current || !gridRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Centered Header Scroll Reveal
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

      // 2. Services Cards Staggered Scroll Reveal
      const cards = gridRef.current.querySelectorAll('.engineering-service-card');
      gsap.fromTo(
        cards,
        { opacity: 0, y: 26 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 86%',
            toggleActions: 'play none none none'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="value-added-section" aria-label="Engineered Support Services">
      <div className="section-container">
        {/* 1. Perfectly Centered Header */}
        <div ref={headerRef} className="services-centered-header">
          <div className="section-eyebrow">
            <span className="eyebrow-accent-bar" aria-hidden="true" />
            <span className="eyebrow-text">INTEGRATED TECHNICAL CAPABILITIES</span>
            <span className="eyebrow-accent-bar" aria-hidden="true" />
          </div>

          <h2 className="services-main-heading">
            ENGINEERED <span className="heading-accent">SUPPORT SERVICES</span>
          </h2>

          <p className="services-lead-desc">
            Precision in-house processing, accredited laboratory testing, and turnkey EPC staging engineered to project milestones.
          </p>
        </div>

        {/* 2. Structured 3-Column Services Grid */}
        <div ref={gridRef} className="engineering-services-grid">
          {valueAddedData.map((service) => {
            const Icon = serviceIcons[service.id] || CheckCircle2;

            return (
              <article
                key={service.id}
                className="engineering-service-card"
                tabIndex={0}
                role="group"
                aria-label={service.title}
              >
                {/* Subtle Top Industrial Accent Hairline */}
                <div className="card-top-hairline" aria-hidden="true" />

                {/* Header Meta: Category Number & Spec Tag */}
                <div className="service-card-top">
                  <span className="service-number-pill">SERVICE // {service.number}</span>
                  <span className="service-badge-tag">{service.tag}</span>
                </div>

                {/* Title & Icon Group */}
                <div className="service-title-wrap">
                  <div className="service-icon-box" aria-hidden="true">
                    <Icon size={20} strokeWidth={2.2} />
                  </div>
                  <div className="service-title-text-group">
                    <h3 className="service-title-text">{service.title}</h3>
                    <span className="service-tagline-text">{service.tagline}</span>
                  </div>
                </div>

                {/* Concise 1-2 Line Description */}
                <p className="service-description-text">{service.description}</p>

                {/* Bottom Row: Supporting Point & CTA */}
                <div className="service-card-bottom">
                  <div className="service-highlight-chip">
                    <CheckCircle2 size={13} className="chip-icon" aria-hidden="true" />
                    <span>{service.highlight}</span>
                  </div>

                  <a
                    href="#quote"
                    className="service-inquire-link"
                    aria-label={`Inquire about ${service.title}`}
                  >
                    <span>Inquire</span>
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
