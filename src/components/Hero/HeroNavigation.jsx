import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './HeroControls.css';

/**
 * HeroNavigation: Minimalist Slide Arrows
 * - Bare, clean chevron icons
 * - No heavy square box, no thick borders, no glow
 * - Subtle 1px translation and opacity hover effect
 */
export default function HeroNavigation({ onPrev, onNext }) {
  return (
    <div className="hero-nav-arrows" aria-label="Hero slider navigation">
      <button
        type="button"
        className="hero-arrow-minimal prev-arrow"
        onClick={onPrev}
        aria-label="Previous Slide"
        title="Previous Slide"
      >
        <ChevronLeft size={18} />
      </button>

      <span className="hero-arrow-sep" aria-hidden="true" />

      <button
        type="button"
        className="hero-arrow-minimal next-arrow"
        onClick={onNext}
        aria-label="Next Slide"
        title="Next Slide"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}

