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
      // Header entrance
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { opacity: 0, y: 22 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          }
        );
      }

      // Filter controls entrance
      if (filterRef.current) {
        gsap.fromTo(
          filterRef.current,
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: filterRef.current,
              start: 'top 88%',
              toggleActions: 'play none none none'
            }
          }
        );
      }

      // Cards initial entrance
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll('.export-country-card');
        if (cards.length > 0) {
          gsap.fromTo(
            cards,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              stagger: 0.015,
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

  // Filter change animation
  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll('.export-country-card');
    if (cards.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.35,
          stagger: 0.012,
          ease: 'power3.out',
          overwrite: 'auto'
        }
      );
    }, gridRef);

    return () => ctx.revert();
  }, [activeCategory, searchQuery]);

  return (
    <section id="export" ref={sectionRef} className="global-export-section" aria-label="Our Global Presence">
      {/* Background Precision Grid */}
      <div className="export-bg-grid" aria-hidden="true" />

      <div className="section-container">
        {/* 1. Centered Section Header */}
        <div ref={headerRef} className="export-centered-header">
          <div className="section-eyebrow">
            <span className="eyebrow-accent-bar" aria-hidden="true" />
            <span className="eyebrow-text">INTERNATIONAL EXPORT DESTINATIONS</span>
            <span className="eyebrow-accent-bar" aria-hidden="true" />
          </div>

          <h2 className="export-display-heading">
            OUR GLOBAL <span className="heading-accent">PRESENCE</span>
          </h2>

          <p className="export-lead-desc">
            Supplying certified steel, alloy, and nickel piping materials to mission-critical infrastructure projects across worldwide industrial hubs.
          </p>
        </div>

        {/* 2. Interactive Controls: Region Tabs & Live Search */}
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

          {/* Live Search Input */}
          <div className="export-search-wrapper">
            <Search size={15} className="search-icon" aria-hidden="true" />
            <input
              type="text"
              placeholder="Search destination..."
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

        {/* 3. Compact Status Bar */}
        <div className="export-status-bar">
          <div className="status-counter-wrap">
            <Globe size={14} className="status-globe-icon" aria-hidden="true" />
            <span className="status-counter-text">
              Showing <strong>{filteredCountries.length}</strong> of <strong>{exportCountriesList.length}</strong> destinations
            </span>
          </div>
          {searchQuery && (
            <span className="status-filter-tag">Filter: "{searchQuery}"</span>
          )}
        </div>

        {/* 4. Clean Minimal Country Cards Grid — ONLY Flag + Country Name */}
        <div ref={gridRef} className="export-countries-grid">
          {filteredCountries.map(country => (
            <article
              key={country.code}
              className="export-country-card"
              tabIndex={0}
              role="group"
              aria-label={country.name}
            >
              {/* Centered Large Flag Container */}
              <div className="country-flag-box">
                <img
                  src={`https://flagcdn.com/w80/${country.code.toLowerCase()}.png`}
                  srcSet={`https://flagcdn.com/w160/${country.code.toLowerCase()}.png 2x`}
                  alt={`${country.name} flag`}
                  className="country-flag-img"
                  loading="lazy"
                  onError={(e) => {
                    if (!e.currentTarget.dataset.fallback) {
                      e.currentTarget.dataset.fallback = 'true';
                      e.currentTarget.src = `https://hatscripts.github.io/circle-flags/flags/${country.code.toLowerCase()}.svg`;
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
            </article>
          ))}

          {filteredCountries.length === 0 && (
            <div className="no-countries-state">
              <p>No export destinations found matching "{searchQuery}".</p>
              <button
                type="button"
                className="reset-filters-btn"
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
