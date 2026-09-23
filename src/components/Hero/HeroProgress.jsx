import React from 'react';
import './HeroControls.css';

/**
 * HeroProgress: Minimalist Numbered Slider Navigation
 * - Clean horizontal 01, 02, 03, 04, 05 numbers
 * - Delicate, ultra-thin progress hairline under the active number
 * - Inactive numbers remain subtle and elegant
 * - Zero heavy container boxes, cards, or bulky borders
 */
export default function HeroProgress({
  currentSlideIndex,
  totalSlides,
  progressPercent,
  onSelectSlide
}) {
  return (
    <nav className="hero-minimal-nav" aria-label="Hero slide switcher">
      <div className="hero-nav-numbers" role="tablist">
        {Array.from({ length: totalSlides }).map((_, idx) => {
          const isActive = idx === currentSlideIndex;
          const formattedNum = String(idx + 1).padStart(2, '0');

          return (
            <button
              key={idx}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={`Switch to slide ${idx + 1}`}
              className={`hero-nav-num-btn ${isActive ? 'is-active' : ''}`}
              onClick={() => onSelectSlide(idx)}
            >
              <span className="hero-num-label">{formattedNum}</span>
              {/* Minimalist active progress hairline */}
              <span className="hero-num-indicator" aria-hidden="true">
                <span
                  className="hero-num-progress-fill"
                  style={{
                    width: isActive ? `${progressPercent}%` : '0%'
                  }}
                />
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

