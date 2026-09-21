import React, { useRef, useEffect, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { aboutIndustriesData } from '../../data/aboutData';
import { ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// 2 complete cycles for seamless continuous wrap-around rotation along the arc
const arcCards = [
  ...aboutIndustriesData.map((item, idx) => ({
    ...item,
    uniqueKey: `c1-${item.id}`,
    cycleIdx: idx
  })),
  ...aboutIndustriesData.map((item, idx) => ({
    ...item,
    uniqueKey: `c2-${item.id}`,
    cycleIdx: idx
  }))
];

export default function AboutIndustries() {
  const sectionRef = useRef(null);
  const pinContainerRef = useRef(null);
  const arcStageRef = useRef(null);
  const cardElementsRef = useRef([]);
  const [activeCenterIdx, setActiveCenterIdx] = useState(0);
  const activeCenterIdxRef = useRef(0);
  const scrollTriggerRef = useRef(null);

  // Mathematical Arc Parameters
  const TOTAL_CARDS = arcCards.length; // 12
  const STEP_ANGLE = 15; // 15 degrees between adjacent cards
  const TOTAL_SPAN = TOTAL_CARDS * STEP_ANGLE; // 180 deg
  const HALF_SPAN = TOTAL_SPAN / 2; // 90 deg

  // Calculate and render all cards along the 3D convex arc purely driven by scroll progress
  const updateArcLayout = useCallback((progress = 0) => {
    const stage = arcStageRef.current;
    if (!stage) return;

    const width = window.innerWidth;
    const isMobile = width < 640;
    const isTablet = width >= 640 && width < 1024;

    // Radius of curvature for the arc (convex wheel top)
    const R = isMobile ? 780 : isTablet ? 1050 : 1350;

    // Scroll progress drives rotation angle along the arc (Right to Left movement)
    const totalScrollRotation = (TOTAL_CARDS / 2) * STEP_ANGLE; // 6 cards * 15 deg = 90 deg
    const currentAngle = progress * totalScrollRotation;

    let closestIdx = 0;
    let minDiff = Infinity;

    cardElementsRef.current.forEach((card, idx) => {
      if (!card) return;

      // Raw angle along the arc
      const rawAngle = idx * STEP_ANGLE - currentAngle;

      // Wrap around seamlessly so cards loop infinitely
      let relAngle = (((rawAngle + HALF_SPAN) % TOTAL_SPAN) + TOTAL_SPAN) % TOTAL_SPAN - HALF_SPAN;
      const absAngle = Math.abs(relAngle);

      if (absAngle < minDiff) {
        minDiff = absAngle;
        closestIdx = idx;
      }

      // Compute physical (x, y) along circular arc
      const rad = (relAngle * Math.PI) / 180;
      const x = R * Math.sin(rad);
      // Convex arc: center is at highest peak (y = 0), side cards drop downward (y > 0)
      const y = R * (1 - Math.cos(rad)) * (isMobile ? 0.9 : 0.85);

      // Rotate card tangentially along the arc
      const rotateZ = relAngle;

      // Scale: center card is largest (1.05), dropping gently along sides
      const scale = Math.max(0.74, (isMobile ? 0.98 : 1.05) - absAngle * 0.0058);

      // Opacity: center is fully visible, far cards fade smoothly
      const opacity = absAngle > 54 ? 0 : Math.max(0.25, 1 - absAngle * 0.016);

      // Z-Index: highest at center apex
      const zIndex = Math.max(1, Math.round(50 - absAngle));

      card.style.zIndex = zIndex;

      gsap.set(card, {
        x,
        y,
        rotateZ,
        scale,
        opacity,
        visibility: opacity <= 0.02 ? 'hidden' : 'visible'
      });

      if (absAngle < STEP_ANGLE * 0.45) {
        card.classList.add('is-center-apex');
      } else {
        card.classList.remove('is-center-apex');
      }
    });

    const normalizedCenter = closestIdx % aboutIndustriesData.length;
    if (normalizedCenter !== activeCenterIdxRef.current) {
      activeCenterIdxRef.current = normalizedCenter;
      setActiveCenterIdx(normalizedCenter);
    }
  }, [TOTAL_CARDS, TOTAL_SPAN, HALF_SPAN, STEP_ANGLE]);

  useEffect(() => {
    const section = sectionRef.current;
    const pinEl = pinContainerRef.current;
    if (!section || !pinEl) return;

    const ctx = gsap.context(() => {
      // Pinned GSAP ScrollTrigger timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=2400',
          pin: pinEl,
          scrub: 0.9,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            updateArcLayout(self.progress);
          }
        }
      });

      scrollTriggerRef.current = tl.scrollTrigger;

      // Initial layout update
      setTimeout(() => updateArcLayout(0), 40);

      const handleResize = () => {
        ScrollTrigger.refresh();
        if (scrollTriggerRef.current) {
          updateArcLayout(scrollTriggerRef.current.progress);
        }
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, section);

    return () => ctx.revert();
  }, [updateArcLayout]);

  // Step left/right along the arc via nav buttons by smoothly scrolling ScrollTrigger
  const stepArc = (direction) => {
    const st = scrollTriggerRef.current;
    if (!st) return;

    const scrollTotal = st.end - st.start;
    const totalScrollRotation = (TOTAL_CARDS / 2) * STEP_ANGLE; // 90 deg
    const stepProgress = STEP_ANGLE / totalScrollRotation; // 1/6
    const stepScroll = stepProgress * scrollTotal;

    const currentScroll = window.scrollY;
    let targetScroll;

    if (currentScroll < st.start) {
      targetScroll = st.start + (direction > 0 ? stepScroll : 0);
    } else if (currentScroll > st.end) {
      targetScroll = st.end - (direction < 0 ? stepScroll : 0);
    } else {
      targetScroll = currentScroll + direction * stepScroll;
      if (targetScroll > st.end + 5) {
        targetScroll = st.start;
      } else if (targetScroll < st.start - 5) {
        targetScroll = st.end;
      }
    }

    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    });
  };

  return (
    <section ref={sectionRef} className="about-industries-phase arc-carousel-section" aria-label="Industries We Power">
      {/* Top Atmospheric Ambient Vignette */}
      <div className="arc-top-vignette" aria-hidden="true" />

      <div ref={pinContainerRef} className="industries-pin-container arc-pin-container">
        <div className="about-industries-container arc-container">
          {/* Header */}
          <div className="industries-header arc-header">
            <div className="industries-eyebrow">
              <span className="eyebrow-accent-bar" />
              <span className="eyebrow-text">MISSION-CRITICAL SECTORS</span>
            </div>
            <h3 className="industries-heading">
              Industries We <span className="highlight-red">Power</span>
            </h3>
            <p className="industries-subhead">
              One comprehensive steel supply ecosystem engineering specialized grades for the world's most unforgiving operating conditions.
            </p>

            {/* Active Indicator HUD */}
            <div className="arc-hud-bar" aria-hidden="true">
              <span className="arc-hud-label">SECTOR FOCUS //</span>
              <div className="arc-hud-dots">
                {aboutIndustriesData.map((item, idx) => (
                  <span
                    key={item.id}
                    className={`arc-hud-dot ${activeCenterIdx === idx ? 'is-active' : ''}`}
                    title={item.name}
                  />
                ))}
              </div>
              <span className="arc-hud-name">
                {aboutIndustriesData[activeCenterIdx]?.name}
              </span>
            </div>
          </div>

          {/* Curved Arc Carousel Stage */}
          <div
            ref={arcStageRef}
            className="arc-carousel-stage"
            role="region"
            aria-label="Arc Carousel"
          >
            {arcCards.map((item, index) => (
              <article
                key={item.uniqueKey}
                ref={(el) => (cardElementsRef.current[index] = el)}
                data-index={index}
                className="arc-industry-card"
              >
                {/* Clear Industrial Photo Frame (100% visible, sharp, no blur/fade) */}
                <div className="arc-card-image-box">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="arc-card-img"
                    loading="lazy"
                  />
                  <span className="arc-card-badge">
                    {item.tagline}
                  </span>
                </div>

                {/* Card Content Hierarchy: Industry Name -> Short Description */}
                <div className="arc-card-body">
                  <h4 className="arc-card-title">{item.name}</h4>
                  <p className="arc-card-desc">{item.desc}</p>
                </div>
              </article>
            ))}
          </div>

          {/* Quick Navigation Stepper Controls */}
          <div className="arc-nav-controls" aria-label="Arc Carousel Controls">
            <button
              type="button"
              className="arc-nav-btn btn-prev"
              aria-label="Previous Sector"
              onClick={() => stepArc(-1)}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              className="arc-nav-btn btn-next"
              aria-label="Next Sector"
              onClick={() => stepArc(1)}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}



