import React, { useState, useEffect, useRef, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  exportCountriesList,
  exportCountryCategories
} from '../../data/homeSectionsData';
import { Search, X, Globe } from 'lucide-react';
import './GlobalExportSection.css';

gsap.registerPlugin(ScrollTrigger);

export default function GlobalExportSection() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const filterRef = useRef(null);
  const gridRef = useRef(null);

  // Filter countries based on region category and search query
  const filteredCountries = useMemo(() => {
    return exportCountriesList.filter(country => {
      const matchesCategory =
        activeCategory === 'all' || country.region === activeCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        country.name.toLowerCase().includes(q) ||
        country.code.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Section entrance reveal with ScrollTrigger
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Header GSAP entrance
      gsap.fromTo(
        headerRef.current.children,
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.14,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );

      // Filter bar entrance
      gsap.fromTo(
        filterRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: filterRef.current,
            start: 'top 88%',
            toggleActions: 'play none none none'
          }
        }
      );

      // Initial Country cards scroll entrance
      if (gridRef.current) {
        const initialCards = gridRef.current.querySelectorAll('.export-country-card');
        if (initialCards.length > 0) {
          gsap.fromTo(
            initialCards,
            { opacity: 0, y: 30, scale: 0.95 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.65,
              stagger: 0.02,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: gridRef.current,
                start: 'top 86%',
                toggleActions: 'play none none none'
              }
            }
          );
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // GSAP animation triggered when region category or search query changes
  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll('.export-country-card');
    if (cards.length === 0) return;

    // Smooth stagger fade, slide & subtle 3D lift transition
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 18, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.45,
          stagger: {
            each: 0.02,
            from: 'start'
          },
          ease: 'power3.out',
          overwrite: 'auto'
        }
      );
    }, gridRef);

    return () => ctx.revert();
  }, [activeCategory, searchQuery]);

  return (
    <section id="export" ref={sectionRef} className="global-export-section" aria-label="Countries We Export To">
      {/* Background Precision Grid */}
      <div className="export-bg-grid" aria-hidden="true" />

      <div className="section-container">
        {/* Standardized Section Header */}
        <div ref={headerRef} className="export-header">
          <div className="section-eyebrow">
            <span className="eyebrow-accent-bar" />
            <span className="eyebrow-text">GLOBAL EXPORT NETWORK // INTERNATIONAL TRADE</span>
          </div>

          <h2 className="section-display-heading">
            COUNTRIES WE <span className="text-highlight-red">EXPORT TO</span>
          </h2>

          <p className="section-description">
            Approved material supplier providing seaworthy packed stainless, alloy, and nickel piping products to mission-critical infrastructure across 45+ international destinations.
          </p>

          {/* Compact Supporting Metric Badge */}
          <div className="export-metric-pill-badge">
            <span className="metric-pill-accent">45+</span>
            <span className="metric-pill-label">GLOBAL EXPORT DESTINATIONS &bull; 100% TRACEABLE DISPATCH</span>
          </div>
        </div>

        {/* Interactive Controls: Region Filters & Live Search */}
        <div ref={filterRef} className="export-controls-container">
          {/* Region Filter Tabs */}
          <div className="export-region-tabs" role="tablist" aria-label="Filter countries by region">
            {exportCountryCategories.map(cat => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`region-tab-btn ${isActive ? 'is-active' : ''}`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Live Search Country Input */}
          <div className="export-search-wrapper">
            <Search size={16} className="search-icon" aria-hidden="true" />
            <input
              type="text"
              placeholder="Search country..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="country-search-input"
              aria-label="Search countries"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="search-clear-btn"
                aria-label="Clear search field"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Count Status Indicator */}
        <div className="export-status-bar">
          <div className="status-counter-wrap">
            <Globe size={14} className="status-globe-icon" />
            <span className="status-counter-text">
              Showing <strong>{filteredCountries.length}</strong> of <strong>{exportCountriesList.length}</strong> Export Destinations
            </span>
          </div>
          {searchQuery && (
            <span className="status-filter-tag">Filter: "{searchQuery}"</span>
          )}
        </div>

        {/* Clean, Minimal Country Cards Grid — Circular Flag + Country Name */}
        <div ref={gridRef} className="export-countries-grid">
          {filteredCountries.map(country => (
            <div
              key={country.code}
              className="export-country-card"
              tabIndex={0}
              role="group"
              aria-label={country.name}
            >
              {/* Circular Flag Container */}
              <div className="country-flag-box">
                <img
                  src={`https://hatscripts.github.io/circle-flags/flags/${country.code.toLowerCase()}.svg`}
                  alt={`${country.name} flag`}
                  className="country-flag-img"
                  loading="lazy"
                  onError={(e) => {
                    if (!e.currentTarget.dataset.fallback) {
                      e.currentTarget.dataset.fallback = 'true';
                      e.currentTarget.src = `https://flagcdn.com/w80/${country.code.toLowerCase()}.png`;
                    } else {
                      e.currentTarget.style.display = 'none';
                      const fallback = e.currentTarget.parentElement.querySelector('.country-flag-fallback');
                      if (fallback) fallback.style.display = 'inline-block';
                    }
                  }}
                />
                <span className="country-flag-fallback" style={{ display: 'none' }}>
                  {country.flag}
                </span>
              </div>

              {/* Country Name */}
              <h3 className="country-name-text">{country.name}</h3>
            </div>
          ))}

          {filteredCountries.length === 0 && (
            <div className="no-countries-state">
              <p>No export countries found matching "{searchQuery}".</p>
              <button
                type="button"
                className="reset-filters-btn"
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
              >
                Reset Search & Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
