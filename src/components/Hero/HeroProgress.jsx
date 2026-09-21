import React from 'react';
import './HeroControls.css';

export default function HeroProgress({
  currentSlideIndex,
  totalSlides,
  progressPercent,
  onSelectSlide
}) {
  const currentFormatted = String(currentSlideIndex + 1).padStart(2, '0');
  const totalFormatted = String(totalSlides).padStart(2, '0');

  return (
    <div className="hero-progress-wrapper" aria-label="Hero Slider Progress">
      {/* Slide Index Counter */}
      <div className="hero-counter">
        <span className="counter-current">{currentFormatted}</span>
        <span className="counter-divider">/</span>
        <span className="counter-total">{totalFormatted}</span>
      </div>

      {/* Segmented Interactive Progress Bars */}
      <div className="hero-progress-segments" role="tablist">
        {Array.from({ length: totalSlides }).map((_, idx) => {
          const isActive = idx === currentSlideIndex;
          const isPassed = idx < currentSlideIndex;
          const fillWidth = isActive ? `${progressPercent}%` : isPassed ? '100%' : '0%';

          return (
            <button
              key={idx}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={`Go to slide ${idx + 1}`}
              className={`progress-segment-btn ${isActive ? 'is-active' : ''}`}
              onClick={() => onSelectSlide(idx)}
            >
              <span className="progress-segment-track">
                <span
                  className="progress-segment-fill"
                  style={{ width: fillWidth }}
                />
              </span>
              <span className="progress-segment-number">0{idx + 1}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
