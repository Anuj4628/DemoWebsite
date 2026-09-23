import React, { useRef, useState, useEffect, useCallback } from 'react';
import { aboutIndustriesData } from '../../data/aboutData';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * AboutIndustries: Premium Infinite Looping Horizontal Slider
 * - Seamless infinite translation (tripled dataset, zero clipping, zero dead-ends)
 * - Pixel-perfect alignment matching the rest of the About page
 * - Brisk auto-play speed (1.8s) with hover pause
 * - Interactive prev/next navigation and active card counter
 */
export default function AboutIndustries() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const cardRef = useRef(null);

  const totalCards = aboutIndustriesData.length; // 6
  // Tripled dataset to provide mathematically infinite looping forward and backward
  const extendedCards = [
    ...aboutIndustriesData,
    ...aboutIndustriesData,
    ...aboutIndustriesData
  ];

  // Start at index 6 (Card 1 of the middle set)
  const [currentIndex, setCurrentIndex] = useState(totalCards);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [stepWidth, setStepWidth] = useState(364);

  // Measure card width + gap dynamically to ensure exact pixel-perfect translation across all screens
  const measureStep = useCallback(() => {
    if (cardRef.current && trackRef.current) {
      const cardRect = cardRef.current.getBoundingClientRect();
      const style = window.getComputedStyle(trackRef.current);
      const gap = parseFloat(style.columnGap || style.gap || '24') || 24;
      setStepWidth(cardRect.width + gap);
    }
  }, []);

  useEffect(() => {
    measureStep();
    window.addEventListener('resize', measureStep);
    return () => window.removeEventListener('resize', measureStep);
  }, [measureStep]);

  // Navigate forward
  const handleNext = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  }, []);

  // Navigate backward
  const handlePrev = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  }, []);

  // Handle manual card click
  const handleCardClick = (targetIndex) => {
    setIsPaused(true);
    setIsTransitioning(true);
    setCurrentIndex(targetIndex);
    setTimeout(() => setIsPaused(false), 3200);
  };

  // Seamless jump at cloned dataset boundaries (zero glitch or jump)
  const handleTransitionEnd = () => {
    if (currentIndex >= totalCards * 2) {
      // Reached item 12 (first item of 3rd set) -> jump silently back to item 6 (first item of 2nd set)
      setIsTransitioning(false);
      setCurrentIndex(totalCards + (currentIndex % totalCards));
    } else if (currentIndex < totalCards) {
      // Reached item < 6 -> jump silently forward to item in middle set
      setIsTransitioning(false);
      setCurrentIndex(totalCards + (currentIndex % totalCards));
    }
  };

  // Re-enable CSS transition after silent boundary jump
  useEffect(() => {
    if (!isTransitioning) {
      const raf1 = requestAnimationFrame(() => {
        const raf2 = requestAnimationFrame(() => {
          setIsTransitioning(true);
        });
        return () => cancelAnimationFrame(raf2);
      });
      return () => cancelAnimationFrame(raf1);
    }
  }, [isTransitioning]);

  // Brisk Auto-Play: Increased speed to 1.8s (1800ms) with hover pause
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      handleNext();
    }, 1800);

    return () => clearInterval(timer);
  }, [isPaused, handleNext]);

  // Compute active 1-indexed counter (1 to 6)
  const activeNumber = (currentIndex % totalCards) + 1;

  return (
    <section className="about-industries-slider-phase" aria-label="Industries We Power">
      <div className="industries-slider-container">
        {/* Header Row: Perfectly Aligned with Section Grid */}
        <div className="industries-slider-header-container">
          <div className="industries-slider-eyebrow">
            <span className="eyebrow-accent-bar" />
            <span className="eyebrow-text">MISSION-CRITICAL SECTORS</span>
          </div>

          <div className="industries-title-row">
            <div className="industries-title-block">
              <h2 className="industries-slider-heading">
                Industries We <span className="highlight-teal">Power</span>
              </h2>
              <p className="industries-slider-subhead">
                Supplying specialized steel and exotic alloys to high-consequence global engineering operations.
              </p>
            </div>

            {/* Fast Slider Controls: Counter + Chevron Buttons */}
            <div className="industries-nav-actions">
              <div className="industries-counter-pill" aria-label={`Card ${activeNumber} of ${totalCards}`}>
                <span className="active-idx">0{activeNumber}</span>
                <span className="idx-separator">/</span>
                <span className="total-idx">0{totalCards}</span>
              </div>

              <div className="industries-arrow-buttons">
                <button
                  type="button"
                  className="industry-arrow-btn"
                  aria-label="Previous Industry"
                  onClick={() => {
                    setIsPaused(true);
                    handlePrev();
                    setTimeout(() => setIsPaused(false), 3000);
                  }}
                  title="Previous Industry"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  className="industry-arrow-btn"
                  aria-label="Next Industry"
                  onClick={() => {
                    setIsPaused(true);
                    handleNext();
                    setTimeout(() => setIsPaused(false), 3000);
                  }}
                  title="Next Industry"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Seamless Infinite Slider Viewport: Left Edge Aligns Perfectly with Header */}
        <div
          ref={containerRef}
          className="industries-slider-viewport"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setTimeout(() => setIsPaused(false), 2400)}
        >
          <div
            ref={trackRef}
            className="industries-slider-track"
            onTransitionEnd={handleTransitionEnd}
            style={{
              transform: `translate3d(-${currentIndex * stepWidth}px, 0, 0)`,
              transition: isTransitioning ? 'transform 0.42s cubic-bezier(0.2, 0.85, 0.25, 1)' : 'none'
            }}
          >
            {extendedCards.map((item, index) => {
              const isFrontCard = index === currentIndex;
              const sectorNum = (index % totalCards) + 1;

              return (
                <article
                  key={`sector-${index}-${item.id}`}
                  ref={index === 0 ? cardRef : null}
                  className={`industry-showcase-card ${isFrontCard ? 'is-in-focus' : ''}`}
                  onClick={() => handleCardClick(index)}
                  tabIndex={0}
                  role="group"
                  aria-label={`${item.name} - Sector 0${sectorNum}`}
                >
                  {/* Industrial Photo Frame */}
                  <div className="industry-card-photo-box">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="industry-card-photo"
                      loading="lazy"
                    />
                    <div className="industry-photo-gradient" />
                    <span className="industry-tagline-badge">{item.tagline}</span>
                  </div>

                  {/* Card Body */}
                  <div className="industry-card-content">
                    <div className="industry-index-row">
                      <span className="industry-code-num">SECTOR 0{sectorNum}</span>
                    </div>
                    <h3 className="industry-card-name">{item.name}</h3>
                    <p className="industry-card-description">{item.desc}</p>
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

