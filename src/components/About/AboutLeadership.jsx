import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { aboutLeadershipData } from '../../data/aboutData';

gsap.registerPlugin(ScrollTrigger);

export default function AboutLeadership() {
  const containerRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);
  const centerLineRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Scrub timeline for the converging split composition
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          end: 'bottom 35%',
          scrub: 0.8
        }
      });

      // 1. Vertical engineering line draws from top to bottom
      if (centerLineRef.current) {
        tl.fromTo(
          centerLineRef.current,
          { scaleY: 0, opacity: 0 },
          { scaleY: 1, opacity: 0.6, duration: 1, ease: 'power2.inOut' },
          0
        );
      }

      // 2. Left and right columns converge toward center
      if (leftColRef.current && rightColRef.current) {
        tl.fromTo(
          leftColRef.current,
          { x: -50, opacity: 0.3 },
          { x: 0, opacity: 1, duration: 1, ease: 'power3.out' },
          0.1
        );

        tl.fromTo(
          rightColRef.current,
          { x: 50, opacity: 0.3 },
          { x: 0, opacity: 1, duration: 1, ease: 'power3.out' },
          0.1
        );
      }
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="about-leadership-phase">
      <div className="about-leadership-container">
        {/* Header Ribbon */}
        <div className="leadership-header-ribbon">
          <div className="leadership-eyebrow">
            <span className="eyebrow-accent-bar" />
            <span className="eyebrow-text">{aboutLeadershipData.eyebrow}</span>
          </div>
          <div className="leadership-tagline-chain">
            <span className="chain-step">VISION</span>
            <span className="chain-arrow">&rarr;</span>
            <span className="chain-step">DIRECTION</span>
            <span className="chain-arrow">&rarr;</span>
            <span className="chain-step">EXECUTION</span>
            <span className="chain-arrow">&rarr;</span>
            <span className="chain-step active-step">FUTURE</span>
          </div>
        </div>

        {/* Converging Split Composition */}
        <div className="leadership-split-layout">
          {/* Left Column: Industrial Leadership Visual */}
          <div ref={leftColRef} className="leadership-visual-col">
            <div className="leadership-frame">
              <img
                src={aboutLeadershipData.image}
                alt="Redcore Steels Operations"
                className="leadership-photo"
                loading="lazy"
              />
              <div className="leadership-photo-overlay" />
              
              {/* Technical Spec Callout Badge */}
              <div className="leadership-spec-box">
                <span className="spec-label">ESTABLISHED STANDARDS</span>
                <span className="spec-val">FOUNDED ON UNCOMPROMISING INTEGRITY</span>
                <span className="spec-sub">MUMBAI GLOBAL DESK • EST. 1998</span>
              </div>
            </div>
          </div>

          {/* Center Vertical Engineering Divider */}
          <div ref={centerLineRef} className="leadership-vertical-axis" aria-hidden="true">
            <span className="axis-node-top" />
            <span className="axis-node-bottom" />
          </div>

          {/* Right Column: Manifesto & Pillars */}
          <div ref={rightColRef} className="leadership-text-col">
            <blockquote className="leadership-quote">
              {aboutLeadershipData.quote}
            </blockquote>
            
            <p className="leadership-lead-text">
              {aboutLeadershipData.lead}
            </p>

            <div className="leadership-pillars-stack">
              {aboutLeadershipData.pillars.map((pillar, idx) => (
                <div key={pillar.title} className="pillar-item">
                  <div className="pillar-header">
                    <span className="pillar-idx">0{idx + 1}</span>
                    <h5 className="pillar-title">{pillar.title}</h5>
                  </div>
                  <p className="pillar-desc">{pillar.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
