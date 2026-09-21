import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { whyChooseData } from '../../data/homeSectionsData';
import { ShieldCheck, Globe, Award, Settings, Headphones, Truck, ArrowRight } from 'lucide-react';
import './WhyChooseSection.css';

gsap.registerPlugin(ScrollTrigger);

const iconMap = {
  ShieldCheck,
  Globe,
  Award,
  Cpu: Settings,
  Settings,
  Headphones,
  Truck
};

export default function WhyChooseSection() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current || !gridRef.current) return;

    const mm = gsap.matchMedia();

    // Header entrance
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

    const cards = gridRef.current.querySelectorAll('.why-choose-card');

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
    <section id="about" ref={sectionRef} className="why-choose-section" aria-label="Why Choose Us">
      <div className="section-container">
        {/* Section Header */}
        <div ref={headerRef} className="why-choose-header">
          <div className="section-eyebrow">
            <span className="eyebrow-accent-bar" />
            <span className="eyebrow-text">UNCOMPROMISING INDUSTRIAL EXCELLENCE</span>
          </div>

          <h2 className="section-display-heading">
            WHY <span className="text-highlight-red">CHOOSE US</span>
          </h2>

          <p className="section-description">
            Engineered around stringent international metallurgy codes, certified third-party testing, and dependable global project delivery.
          </p>
        </div>

        {/* 3x2 Alternating Dark/Light Checkerboard Grid */}
        <div ref={gridRef} className="why-choose-grid">
          {whyChooseData.map((item, idx) => {
            const Icon = iconMap[item.iconName] || ShieldCheck;
            // Checkerboard: Row 1 (0: Dark, 1: Light, 2: Dark), Row 2 (3: Light, 4: Dark, 5: Light)
            const isDark = idx % 2 === 0;

            return (
              <div
                key={item.number}
                className={`why-choose-card ${isDark ? 'card-theme-dark' : 'card-theme-light'}`}
                tabIndex={0}
              >
                {/* Top Row: Pill Badge on Left, Icon Container on Right */}
                <div className="card-top-row">
                  <div className="card-criterion-pill">
                    <span className="criterion-dot" />
                    <span className="criterion-text">CRITERION // {item.number}</span>
                  </div>

                  <div className="card-icon-frame">
                    <Icon size={20} strokeWidth={1.8} />
                  </div>
                </div>

                {/* Red Accent Line below Pill */}
                <div className="card-red-accent-line" />

                {/* Title & Description */}
                <h3 className="card-main-title">{item.title}</h3>
                <p className="card-main-desc">{item.description}</p>

                {/* Bottom Row: Spec Pill on Left, Red Circle Arrow on Right */}
                <div className="card-bottom-row">
                  <div className="card-spec-pill">
                    <span className="spec-dot" />
                    <span className="spec-label">{item.badge}</span>
                  </div>

                  <div className="card-action-circle" aria-label="Learn more">
                    <ArrowRight size={18} strokeWidth={2.4} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
