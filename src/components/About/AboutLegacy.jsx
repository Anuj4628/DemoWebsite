import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { aboutLegacyMilestones } from '../../data/aboutData';

gsap.registerPlugin(ScrollTrigger);

export default function AboutLegacy() {
  const sectionRef = useRef(null);
  const pinContainerRef = useRef(null);
  const trackRef = useRef(null);
  const pathLineRef = useRef(null);
  const beaconRefs = useRef([]);
  const cardRefs = useRef([]);
  const [activeYear, setActiveYear] = useState('1998');

  useEffect(() => {
    const section = sectionRef.current;
    const pinContainer = pinContainerRef.current;
    const track = trackRef.current;
    if (!section || !pinContainer || !track) return;

    const mm = gsap.matchMedia();

    // Desktop & Laptop: Cinematic Touch-Point Timeline Sequence
    mm.add('(min-width: 992px)', () => {
      const cards = cardRefs.current.filter(Boolean);
      const beacons = beaconRefs.current.filter(Boolean);
      const totalMilestones = aboutLegacyMilestones.length;

      // Track scroll distance
      const maxTranslate = Math.max(0, track.scrollWidth - window.innerWidth + 180);

      const masterTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: `+=${2200 + totalMilestones * 400}`,
          pin: pinContainer,
          scrub: 0.9,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // Determine active milestone based on scroll progress
            const activeIndex = Math.min(
              totalMilestones - 1,
              Math.floor(self.progress * totalMilestones * 0.98)
            );
            setActiveYear(aboutLegacyMilestones[activeIndex]?.year || '1998');
          }
        }
      });

      // 1. Horizontal track travel synchronized with scroll
      masterTimeline.to(
        track,
        {
          x: -maxTranslate,
          ease: 'none',
          duration: 10
        },
        0
      );

      // 2. Glowing connecting path line draws from 1998 to 2026
      if (pathLineRef.current) {
        masterTimeline.fromTo(
          pathLineRef.current,
          { scaleX: 0 },
          { scaleX: 1, ease: 'none', duration: 10 },
          0
        );
      }

      // 3. Touch-point activations as path reaches each milestone
      const stepDuration = 10 / totalMilestones;

      cards.forEach((card, index) => {
        const beacon = beacons[index];
        const reachTime = index * stepDuration;

        // Card becomes active and elevates
        masterTimeline.fromTo(
          card,
          { scale: 0.94, opacity: 0.5, y: 15 },
          {
            scale: 1.02,
            opacity: 1,
            y: -8,
            duration: stepDuration * 0.65,
            ease: 'power2.out'
          },
          reachTime
        );

        // De-elevate slightly as timeline moves to the next
        if (index < totalMilestones - 1) {
          masterTimeline.to(
            card,
            {
              scale: 0.97,
              opacity: 0.85,
              y: 0,
              duration: stepDuration * 0.45,
              ease: 'power1.inOut'
            },
            reachTime + stepDuration * 0.75
          );
        }

        // Beacon touch-point pulse & glow
        if (beacon) {
          const ripple = beacon.querySelector('.beacon-ripple');
          const core = beacon.querySelector('.beacon-core');

          masterTimeline.fromTo(
            core,
            { scale: 0.8, backgroundColor: '#94A3B8' },
            { scale: 1.4, backgroundColor: '#D3122A', duration: 0.35, ease: 'back.out(2)' },
            reachTime
          );

          if (ripple) {
            masterTimeline.fromTo(
              ripple,
              { scale: 0.6, opacity: 0.9 },
              { scale: 2.6, opacity: 0, duration: 0.65, ease: 'power2.out' },
              reachTime
            );
          }
        }
      });
    });

    // Tablet & Mobile: Vertical sequential touch-point scrub
    mm.add('(max-width: 991px)', () => {
      const cards = cardRefs.current.filter(Boolean);

      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0.35, y: 25, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 82%',
              end: 'top 45%',
              scrub: 0.8
            }
          }
        );
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <div ref={sectionRef} className="about-legacy-phase">
      <div ref={pinContainerRef} className="legacy-pin-wrapper">
        {/* Header Bar */}
        <div className="legacy-header-container">
          <div className="legacy-eyebrow">
            <span className="eyebrow-line" />
            <span className="eyebrow-text">A QUARTER-CENTURY OF METALLURGY</span>
          </div>
          <div className="legacy-title-row">
            <h3 className="legacy-heading">
              The Steel Legacy of <span className="highlight-red">Redcore Steels</span>
            </h3>
            <div className="legacy-active-hud">
              <span className="hud-tag">TOUCH-POINT ERA //</span>
              <span className="hud-year">{activeYear}</span>
            </div>
          </div>
          <p className="legacy-subhead">
            Scroll to follow the metallurgical pipeline from our 1998 foundation through our 2026 global export footprint.
          </p>
        </div>

        {/* Timeline Path Track Viewport */}
        <div className="legacy-track-viewport">
          {/* Central Glowing Touch-Point Pipeline Path */}
          <div className="legacy-pipeline-stage">
            <div className="pipeline-track-base" />
            <div ref={pathLineRef} className="pipeline-laser-progress" />
          </div>

          <div ref={trackRef} className="legacy-cards-track">
            {aboutLegacyMilestones.map((item, index) => {
              const isCurrent = activeYear === item.year;

              return (
                <div key={item.year} className="legacy-node-group">
                  {/* Touch-Point Milestone Node */}
                  <div
                    ref={(el) => (beaconRefs.current[index] = el)}
                    className={`legacy-touch-node ${isCurrent ? 'is-active-node' : ''}`}
                  >
                    <span className="beacon-ripple" />
                    <span className="beacon-core" />
                    <span className="beacon-year-tag">{item.year}</span>
                    <div className="node-drop-stem" />
                  </div>

                  {/* Compact Milestone Card */}
                  <article
                    ref={(el) => (cardRefs.current[index] = el)}
                    className={`legacy-milestone-card ${isCurrent ? 'is-active-card' : ''}`}
                  >
                    {/* Header */}
                    <div className="milestone-year-header">
                      <span className="milestone-step-pill">ERA 0{index + 1}</span>
                      <span className="milestone-year-huge">{item.year}</span>
                    </div>

                    {/* Content */}
                    <div className="milestone-body">
                      <div className="milestone-tag-wrap">
                        <span className="milestone-tag">{item.tag}</span>
                        <span className="milestone-metric-chip">{item.metric}</span>
                      </div>

                      <h4 className="milestone-title">{item.title}</h4>
                      <p className="milestone-desc">{item.description}</p>

                      {/* Photo Frame */}
                      <div className="milestone-img-frame">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="milestone-img"
                          loading="lazy"
                        />
                        <div className="milestone-img-overlay" />
                        <span className="milestone-spec-badge">{item.spec}</span>
                      </div>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

