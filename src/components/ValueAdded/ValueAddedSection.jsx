import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { valueAddedData } from '../../data/homeSectionsData';
import { CheckCircle2, FileCheck, Layers, PackageCheck, Ship, Sliders, ShieldAlert, ArrowRight } from 'lucide-react';
import './ValueAddedSection.css';

gsap.registerPlugin(ScrollTrigger);

const serviceIcons = {
  "material-sourcing": Layers,
  "quality-inspection": ShieldAlert,
  "testing-documentation": FileCheck,
  "custom-requirements": Sliders,
  "project-supply": CheckCircle2,
  "export-packaging": PackageCheck,
  "logistics-support": Ship
};

const serviceSpecs = {
  "material-sourcing": "PRIMARY MILL AUDITED",
  "quality-inspection": "DNV • TUV • LLOYDS TPI",
  "testing-documentation": "EN 10204 3.1 & 3.2 MTR",
  "custom-requirements": "PRECISION PROFILING",
  "project-supply": "TURNKEY EPC PACKAGES",
  "export-packaging": "ISPM-15 FUMIGATED",
  "logistics-support": "MULTI-MODAL FREIGHT"
};

export default function ValueAddedSection() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current || !gridRef.current) return;

    const mm = gsap.matchMedia();

    // Header reveal
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current.children,
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.14,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 82%',
            toggleActions: 'play none none none'
          }
        }
      );
    }

    const cards = gridRef.current.querySelectorAll('.value-service-card');

    // Desktop: 3-column layout (> 1100px)
    mm.add('(min-width: 1101px)', () => {
      const desktopOffsets = [
        { x: -60, y: 0 },  // Card 0 (Row 1 Left): enter from LEFT
        { x: 0, y: -60 },  // Card 1 (Row 1 Center): enter from TOP
        { x: 60, y: 0 },   // Card 2 (Row 1 Right): enter from RIGHT
        { x: -60, y: 0 },  // Card 3 (Row 2 Left): enter from LEFT
        { x: 0, y: 60 },   // Card 4 (Row 2 Center): enter from BOTTOM (natural directional variation)
        { x: 60, y: 0 }    // Card 5 (Row 2 Right): enter from RIGHT
      ];

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 82%',
          toggleActions: 'play none none none'
        }
      });

      cards.forEach((card, idx) => {
        const offset = desktopOffsets[idx] || { x: 0, y: 40 };
        tl.fromTo(
          card,
          {
            opacity: 0,
            x: offset.x,
            y: offset.y,
            animation: 'none'
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.85,
            ease: 'power3.out',
            clearProps: 'transform,animation'
          },
          idx * 0.09
        );
      });
    });

    // Tablet: 2-column layout (769px - 1100px)
    mm.add('(min-width: 769px) and (max-width: 1100px)', () => {
      const tabletOffsets = [
        { x: -50, y: 0 },  // Card 0 (Col 1): enter from LEFT
        { x: 50, y: 0 },   // Card 1 (Col 2): enter from RIGHT
        { x: -50, y: 0 },  // Card 2 (Col 1): enter from LEFT
        { x: 50, y: 0 },   // Card 3 (Col 2): enter from RIGHT
        { x: -50, y: 0 },  // Card 4 (Col 1): enter from LEFT
        { x: 50, y: 0 }    // Card 5 (Col 2): enter from RIGHT
      ];

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 82%',
          toggleActions: 'play none none none'
        }
      });

      cards.forEach((card, idx) => {
        const offset = tabletOffsets[idx] || { x: 0, y: 40 };
        tl.fromTo(
          card,
          {
            opacity: 0,
            x: offset.x,
            y: offset.y,
            animation: 'none'
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.85,
            ease: 'power3.out',
            clearProps: 'transform,animation'
          },
          idx * 0.09
        );
      });
    });

    // Mobile: 1-column layout (<= 768px) - Cards animate individually on scroll
    mm.add('(max-width: 768px)', () => {
      // Directional pattern: Card 1 -> RIGHT, Card 2 -> LEFT, Card 3 -> RIGHT, Card 4 -> LEFT, Card 5 -> RIGHT, Card 6 -> LEFT
      cards.forEach((card, idx) => {
        const isFromRight = idx % 2 === 0; // Card 1, 3, 5 from RIGHT; Card 2, 4, 6 from LEFT
        const startX = isFromRight ? 36 : -36;

        gsap.fromTo(
          card,
          {
            opacity: 0,
            x: startX,
            y: 12,
            animation: 'none'
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.75,
            ease: 'power3.out',
            clearProps: 'transform,animation',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              toggleActions: 'play none none none'
            }
          }
        );
      });
    });


    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section id="services" ref={sectionRef} className="value-added-section" aria-label="Value Added Services">
      <div className="section-container">
        {/* Standardized Section Header */}
        <div ref={headerRef} className="value-added-header">
          <div className="section-eyebrow">
            <span className="eyebrow-accent-bar" />
            <span className="eyebrow-text">BEYOND BASIC MATERIAL SUPPLY</span>
          </div>

          <h2 className="section-display-heading">
            VALUE ADDED <span className="text-highlight-red">SERVICES</span>
          </h2>

          <p className="section-description">
            End-to-end metallurgical solutions supporting complex engineering procurement, mill-certified third-party inspection, and synchronized project dispatch.
          </p>
        </div>

        {/* Alternating Dark/Light Cards Grid */}
        <div ref={gridRef} className="value-services-grid">
          {valueAddedData.map((service, idx) => {
            const Icon = serviceIcons[service.id] || CheckCircle2;
            const specBadge = serviceSpecs[service.id] || "CERTIFIED METALLURGY";
            // Alternating checkerboard theme
            const isDark = idx % 2 === 0;

            return (
              <div
                key={service.id}
                className={`value-service-card ${isDark ? 'card-theme-dark' : 'card-theme-light'}`}
                tabIndex={0}
              >
                {/* Top Row: Pill Badge on Left, Icon on Right */}
                <div className="card-top-row">
                  <div className="card-criterion-pill">
                    <span className="criterion-dot" />
                    <span className="criterion-text">SERVICE // {service.number}</span>
                  </div>

                  <div className="card-icon-frame">
                    <Icon size={20} strokeWidth={1.8} />
                  </div>
                </div>

                {/* Red Accent Line */}
                <div className="card-red-accent-line" />

                {/* Title & Description */}
                <h3 className="card-main-title">{service.title}</h3>
                <p className="card-main-desc">{service.description}</p>

                {/* Bottom Row: Spec Pill on Left, Red Circle Arrow on Right */}
                <div className="card-bottom-row">
                  <div className="card-spec-pill">
                    <span className="spec-dot" />
                    <span className="spec-label">{specBadge}</span>
                  </div>

                  <a href="#quote" className="card-action-circle" aria-label={`Inquire about ${service.title}`}>
                    <ArrowRight size={18} strokeWidth={2.4} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
