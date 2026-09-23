import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { aboutLegacyMilestones } from '../../data/aboutData';

gsap.registerPlugin(ScrollTrigger);

export default function AboutLegacy() {
  const sectionRef = useRef(null);
  const pinWrapperRef = useRef(null);
  const svgPathRef = useRef(null);
  const nodeRefs = useRef([]);
  const cardRefs = useRef([]);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const pinWrapper = pinWrapperRef.current;
    const path = svgPathRef.current;
    if (!section || !pinWrapper) return;

    const mm = gsap.matchMedia();

    // Desktop & Laptop (>= 992px): Elegant Pinned Curved Path Draw
    mm.add('(min-width: 992px)', () => {
      const pathLength = path ? path.getTotalLength() : 1200;

      if (path) {
        gsap.set(path, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength
        });
      }

      const totalMilestones = aboutLegacyMilestones.length;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=1600',
          pin: pinWrapper,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;
            // Draw path smoothly
            if (path) {
              gsap.set(path, {
                strokeDashoffset: pathLength * (1 - p)
              });
            }

            // Calculate active index (0 to 4)
            const step = Math.min(
              totalMilestones - 1,
              Math.floor(p * totalMilestones * 1.05)
            );
            setActiveStep(step);
          }
        }
      });

      // Sequential card activation and elevation
      aboutLegacyMilestones.forEach((_, idx) => {
        const card = cardRefs.current[idx];
        const node = nodeRefs.current[idx];
        const triggerTime = idx / (totalMilestones - 1);

        if (card) {
          tl.fromTo(
            card,
            { opacity: 0.35, y: 20, scale: 0.94 },
            {
              opacity: 1,
              y: 0,
              scale: 1.02,
              duration: 0.4,
              ease: 'power2.out'
            },
            triggerTime * 0.9
          );
        }

        if (node) {
          const core = node.querySelector('.curved-node-core');
          const pulse = node.querySelector('.curved-node-pulse');

          if (core) {
            tl.fromTo(
              core,
              { scale: 0.8, backgroundColor: '#94A3B8' },
              {
                scale: 1.35,
                backgroundColor: '#125A48',
                duration: 0.3,
                ease: 'back.out(2)'
              },
              triggerTime * 0.9
            );
          }

          if (pulse) {
            tl.fromTo(
              pulse,
              { scale: 0.6, opacity: 0.8 },
              { scale: 2.2, opacity: 0, duration: 0.5 },
              triggerTime * 0.9
            );
          }
        }
      });
    });

    // Mobile & Tablet (< 992px): Vertical Sequential Reveal
    mm.add('(max-width: 991px)', () => {
      cardRefs.current.filter(Boolean).forEach((card, idx) => {
        gsap.fromTo(
          card,
          { opacity: 0.35, y: 24, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'top 50%',
              scrub: 0.6,
              onEnter: () => setActiveStep(idx),
              onEnterBack: () => setActiveStep(idx)
            }
          }
        );
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="company-journey" ref={sectionRef} className="about-journey-phase" aria-label="Company Journey 2017 to 2026">
      <div ref={pinWrapperRef} className="journey-pin-container">
        {/* Section Header */}
        <div className="journey-header">
          <div className="journey-eyebrow">
            <span className="eyebrow-accent-bar" />
            <span className="eyebrow-text">COMPANY JOURNEY — 2017 TO 2026</span>
          </div>
          <div className="journey-title-row">
            <h2 className="journey-heading">
              A Trajectory of <span className="highlight-teal">Engineering Excellence</span>
            </h2>
            <div className="journey-hud-badge">
              <span className="hud-label">ACTIVE ERA //</span>
              <span className="hud-year">{aboutLegacyMilestones[activeStep]?.year || '2017'}</span>
            </div>
          </div>
          <p className="journey-subhead">
            Tracing our continuous evolution from foundation in 2017 through global supply leadership in 2026.
          </p>
        </div>

        {/* Desktop Journey Canvas with Elegant Curved SVG Path */}
        <div className="journey-interactive-stage">
          {/* SVG Curved Path Line */}
          <div className="journey-svg-canvas" aria-hidden="true">
            <svg
              className="journey-curve-svg"
              viewBox="0 0 1200 180"
              fill="none"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="journeyGlowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#125A48" />
                  <stop offset="50%" stopColor="#C09642" />
                  <stop offset="100%" stopColor="#125A48" />
                </linearGradient>
              </defs>

              {/* Background Guideline Track */}
              <path
                d="M 60 110 C 200 40, 260 140, 360 80 C 470 20, 530 140, 630 90 C 740 40, 800 140, 900 70 C 1010 10, 1070 120, 1140 90"
                className="journey-guide-path"
                stroke="#E2E8F0"
                strokeWidth="3"
                strokeLinecap="round"
              />

              {/* Animated Progress Path (Progressively draws itself) */}
              <path
                ref={svgPathRef}
                d="M 60 110 C 200 40, 260 140, 360 80 C 470 20, 530 140, 630 90 C 740 40, 800 140, 900 70 C 1010 10, 1070 120, 1140 90"
                className="journey-progress-path"
                stroke="url(#journeyGlowGradient)"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>

            {/* 5 Metallic Touch-Point Nodes Positioned along the Curve */}
            <div className="journey-nodes-overlay">
              {aboutLegacyMilestones.map((item, idx) => {
                const isActive = activeStep >= idx;
                const isCurrent = activeStep === idx;

                return (
                  <div
                    key={item.year}
                    ref={(el) => (nodeRefs.current[idx] = el)}
                    className={`curved-node-item node-pos-${idx} ${isActive ? 'is-passed' : ''} ${isCurrent ? 'is-current' : ''}`}
                  >
                    <span className="curved-node-pulse" />
                    <span className="curved-node-core" />
                    <span className="curved-node-year">{item.year}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 5 Compact Milestone Cards */}
          <div className="journey-cards-grid">
            {aboutLegacyMilestones.map((item, idx) => {
              const isCurrent = activeStep === idx;
              const isPassed = activeStep >= idx;

              return (
                <article
                  key={item.year}
                  ref={(el) => (cardRefs.current[idx] = el)}
                  className={`journey-compact-card card-step-${idx} ${isCurrent ? 'is-active-card' : ''} ${isPassed ? 'is-revealed' : ''}`}
                >
                  <div className="card-top-row">
                    <span className="card-era-badge">ERA 0{idx + 1}</span>
                    <span className="card-year-number">{item.year}</span>
                  </div>

                  <div className="card-image-box">
                    <img
                      src={item.image}
                      alt={`${item.year} - ${item.title}`}
                      className="card-thumb-img"
                      loading="lazy"
                    />
                    <span className="card-spec-chip">{item.spec}</span>
                  </div>

                  <div className="card-content-box">
                    <div className="card-tag-row">
                      <span className="card-tag-pill">{item.tag}</span>
                    </div>
                    <h3 className="card-title">{item.title}</h3>
                    <p className="card-desc">{item.description}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
