import React, { useState, useEffect, useRef, useCallback } from 'react';
import { heroSlides } from '../../data/slidesData';
import HeroSlide from './HeroSlide';
import HeroProgress from './HeroProgress';
import HeroNavigation from './HeroNavigation';
import './Hero.css';

const SLIDE_DURATION_MS = 3800;
const PROGRESS_INTERVAL_MS = 40;

export default function Hero({ onNavigate }) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [progressPercent, setProgressPercent] = useState(0);
  const totalSlides = heroSlides.length;

  const progressRef = useRef(0);

  // Transition to a specific slide without interrupting continuous autoplay
  const goToSlide = useCallback((newIndex, newDirection = 1) => {
    setDirection(newDirection);
    setCurrentSlideIndex(newIndex);
    progressRef.current = 0;
    setProgressPercent(0);
  }, []);

  const handleNext = useCallback(() => {
    goToSlide((currentSlideIndex + 1) % totalSlides, 1);
  }, [currentSlideIndex, totalSlides, goToSlide]);

  const handlePrev = useCallback(() => {
    goToSlide((currentSlideIndex - 1 + totalSlides) % totalSlides, -1);
  }, [currentSlideIndex, totalSlides, goToSlide]);

  // Continuous uninterrupted autoplay loop
  useEffect(() => {
    const step = PROGRESS_INTERVAL_MS;
    const increment = (step / SLIDE_DURATION_MS) * 100;

    const interval = setInterval(() => {
      if (document.hidden) return;

      progressRef.current += increment;
      if (progressRef.current >= 100) {
        progressRef.current = 0;
        setProgressPercent(0);
        setCurrentSlideIndex((prev) => (prev + 1) % totalSlides);
        setDirection(1);
      } else {
        setProgressPercent(progressRef.current);
      }
    }, step);

    return () => clearInterval(interval);
  }, [totalSlides]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  return (
    <section
      id="home"
      className="hero-section"
      aria-label="Bhawal Steel &amp; Engineering Company Hero Showcase"
    >
      {/* Slides Viewport */}
      <div className="hero-slides-viewport">
        {heroSlides.map((slide, index) => (
          <HeroSlide
            key={slide.id}
            slide={slide}
            isActive={index === currentSlideIndex}
            direction={direction}
            onNavigate={onNavigate}
          />
        ))}
      </div>

      {/* Persistent Bottom Bar (Progress & Navigation Controls) */}
      <div className="hero-bottom-bar">
        <div className="hero-bottom-container">
          <HeroProgress
            currentSlideIndex={currentSlideIndex}
            totalSlides={totalSlides}
            progressPercent={progressPercent}
            onSelectSlide={(idx) => goToSlide(idx, idx > currentSlideIndex ? 1 : -1)}
          />

          <HeroNavigation
            onPrev={handlePrev}
            onNext={handleNext}
          />
        </div>
      </div>
    </section>
  );
}
