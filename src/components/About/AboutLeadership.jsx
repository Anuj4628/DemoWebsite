import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { aboutLeadershipData } from '../../data/aboutData';
import { Compass, ShieldCheck, Handshake } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const pillarIcons = [Compass, ShieldCheck, Handshake];

export default function AboutLeadership() {
  const containerRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftColRef.current,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 82%'
          }
        }
      );

      gsap.fromTo(
        rightColRef.current,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 82%'
          }
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="about-story-phase" aria-label="Company Story & Philosophy">
      <div className="about-story-container">
        {/* Section Header */}
        <div className="story-header">
          <div className="story-eyebrow">
            <span className="eyebrow-accent-bar" />
            <span className="eyebrow-text">{aboutLeadershipData.eyebrow}</span>
          </div>
          <div className="story-tagline-chain">
            {aboutLeadershipData.tagline}
          </div>
        </div>

        {/* Refined Split Layout with Perfect Alignment */}
        <div className="story-split-grid">
          {/* Left Column: Quote Statement + Refined Industrial Steel Image */}
          <div ref={leftColRef} className="story-statement-col">
            <blockquote className="story-large-statement">
              "{aboutLeadershipData.statement}"
            </blockquote>

            {/* Balanced Slender Metallic Accent Bar */}
            <div className="story-slender-accent-bar">
              <span className="accent-bar-indicator" />
              <span className="accent-bar-text">METALLURGICAL STANDARDS // MUMBAI LOGISTICS HUB</span>
              <span className="accent-bar-badge">EN-10204 3.1 &amp; 3.2</span>
            </div>

            <div className="story-image-frame">
              <img
                src={aboutLeadershipData.image}
                alt="Bhawal Steel Industrial Metallurgy Facility"
                className="story-photo"
                loading="lazy"
              />
              <div className="story-photo-overlay" />
            </div>
          </div>

          {/* Right Column: Narrative + 3 Polished Engineering Pillars */}
          <div ref={rightColRef} className="story-narrative-col">
            <div className="story-paragraphs">
              <p className="story-lead-p">{aboutLeadershipData.lead}</p>
              <p className="story-sub-p">{aboutLeadershipData.subtext}</p>
            </div>

            <div className="story-pillars-list">
              {aboutLeadershipData.pillars.map((pillar, idx) => {
                const IconComp = pillarIcons[idx % pillarIcons.length];

                return (
                  <div key={pillar.num} className="story-pillar-item">
                    <div className="pillar-num-box">
                      <span className="pillar-number">{pillar.num}</span>
                    </div>
                    <div className="pillar-body">
                      <div className="pillar-header-row">
                        <IconComp size={15} className="pillar-icon" />
                        <h3 className="pillar-heading">{pillar.title}</h3>
                      </div>
                      <p className="pillar-description">{pillar.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
