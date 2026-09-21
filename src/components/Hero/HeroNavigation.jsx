import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './HeroControls.css';

export default function HeroNavigation({ onPrev, onNext }) {
  return (
    <div className="hero-nav-controls" aria-label="Hero slider navigation">
      <div className="hero-nav-arrows">
        <button
          type="button"
          className="hero-arrow-btn prev-btn"
          onClick={onPrev}
          aria-label="Previous Slide"
        >
          <ChevronLeft size={20} />
          <span className="arrow-btn-glow" />
        </button>

        <button
          type="button"
          className="hero-arrow-btn next-btn"
          onClick={onNext}
          aria-label="Next Slide"
        >
          <ChevronRight size={20} />
          <span className="arrow-btn-glow" />
        </button>
      </div>
    </div>
  );
}
