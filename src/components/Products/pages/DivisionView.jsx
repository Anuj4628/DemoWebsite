import React, { useState, useMemo, useEffect, useRef } from 'react';
import gsap from 'gsap';
import FamilyCard from '../FamilyCard';
import { getDivisionData, DIVISIONS } from '../../../data/productCatalogData';
import mfrBgImage from '../../../assets/Product BG/precision pipes and fitting.png';
import supBgImage from '../../../assets/Product BG/superior round and bars engineeres to be perfomed.png';
import { Package, Layers, Search, X, FileText } from 'lucide-react';
import './DivisionView.css';

/**
 * Dedicated Division View (/products/manufacturer OR /products/supplier)
 * Displays all 9 product families belonging to that division with industrial hero and compact grid.
 */
export default function DivisionView({ divisionSlug, onNavigate }) {
  const divisionData = getDivisionData(divisionSlug);
  const [searchQuery, setSearchQuery] = useState('');

  const heroCardRef = useRef(null);
  const gridContainerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (heroCardRef.current) {
        gsap.fromTo(
          heroCardRef.current,
          { opacity: 0, x: -40 },
          { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' }
        );
      }
    });
    return () => ctx.revert();
  }, [divisionSlug]);

  useEffect(() => {
    if (!gridContainerRef.current) return;
    const cards = gridContainerRef.current.querySelectorAll('.ref-product-card');
    if (cards.length > 0) {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.45, stagger: 0.04, ease: 'power2.out' }
      );
    }
  }, [searchQuery, divisionSlug]);

  const groups = divisionData?.groups || [];
  const division = divisionData?.division;
  const isManufacturer = division?.slug === 'manufacturer';
  const otherSlug = isManufacturer ? 'supplier' : 'manufacturer';
  const otherDivision = DIVISIONS[otherSlug];
  const heroImage = isManufacturer ? mfrBgImage : supBgImage;

  // Filter groups
  const filteredGroups = useMemo(() => {
    if (!searchQuery.trim()) return groups;
    const q = searchQuery.toLowerCase().trim();
    return groups.filter(g =>
      g.name.toLowerCase().includes(q) ||
      g.shortDesc?.toLowerCase().includes(q) ||
      g.tagline?.toLowerCase().includes(q) ||
      (g.categories && g.categories.some(c =>
        c.name.toLowerCase().includes(q) ||
        c.grade?.toLowerCase().includes(q) ||
        c.materialName?.toLowerCase().includes(q) ||
        (c.specs && JSON.stringify(c.specs).toLowerCase().includes(q))
      ))
    );
  }, [groups, searchQuery]);

  if (!divisionData) {
    return (
      <div className="division-not-found">
        <div className="not-found-box">
          <h2>Division Not Found</h2>
          <p>The requested division could not be located in our catalog.</p>
          <button
            type="button"
            className="btn-back-all-cat"
            onClick={() => onNavigate('/products')}
          >
            Return to Products Catalog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="premium-division-view">
      {/* 1. Large Industrial Hero Section (Reference Image 1 Style) */}
      <section
        className="division-hero-section"
        style={{ backgroundImage: `url("${heroImage}")` }}
      >
        <div className="division-hero-overlay" aria-hidden="true" />

        <div className="division-hero-inner">
          {/* Floating Dark Glassmorphic Card (Matching Image 1) */}
          <div ref={heroCardRef} className="division-hero-card">
            
            {/* Breadcrumb inside Card: Home > Products > [Division Name] */}
            <nav className="division-breadcrumb-nav" aria-label="Breadcrumb">
              <span className="crumb-text" onClick={() => onNavigate('/')}>Home</span>
              <span className="crumb-arrow">&gt;</span>
              <span className="crumb-text" onClick={() => onNavigate('/products')}>Products</span>
              <span className="crumb-arrow">&gt;</span>
              <span className="crumb-active">{division.name}</span>
            </nav>

            {/* Tag Pill: [ 📄 MANUFACTURER DIVISION — PRODUCT FAMILIES ] */}
            <div className="division-tag-pill">
              <span className="tag-bracket">[</span>
              <FileText size={13} className="tag-file-icon" />
              <span className="tag-pill-text">
                {division.badge} DIVISION — PRODUCT FAMILIES
              </span>
              <span className="tag-bracket">]</span>
            </div>

            {/* Main Heading */}
            <h1 className="division-hero-title">{division.name}</h1>

            {/* Description */}
            <p className="division-hero-desc">
              {division.description}
            </p>

            {/* Two Metric Pills (Matching Image 1) */}
            <div className="division-metrics-pills-row">
              <div className="metric-pill">
                <Package size={14} className="metric-pill-icon" />
                <span className="metric-pill-label">Total Families:</span>
                <strong className="metric-pill-value">{groups.length} Lines</strong>
              </div>

              <div className="metric-pill">
                <Layers size={14} className="metric-pill-icon" />
                <span className="metric-pill-label">Material Grades:</span>
                <strong className="metric-pill-value">80+ Alloys</strong>
              </div>
            </div>

            {/* Search Within Division Inside Card */}
            <div className="division-search-block">
              <div className="search-label-eyebrow">
                SEARCH WITHIN {division.name.toUpperCase()}
              </div>

              <div className="division-card-search-input-wrap">
                <Search size={16} className="search-glass-icon" />
                <input
                  type="text"
                  placeholder={`Search ${division.name} product lines...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="division-card-search-input"
                  aria-label={`Search ${division.name}`}
                />
                {searchQuery && (
                  <button
                    type="button"
                    className="search-clear-btn"
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search"
                  >
                    <X size={15} />
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Product Families Catalogue Section (3-Column Desktop Grid) */}
      <section className="division-catalogue-section">
        <div className="division-catalogue-container">
          <div className="division-status-row">
            <div>
              <span className="division-status-eyebrow">{division.badge} CATALOGUE</span>
              <h2 className="division-status-title">
                {division.name} Families ({filteredGroups.length})
              </h2>
            </div>

            <button
              type="button"
              className="btn-switch-division"
              onClick={() => onNavigate(`/products/${otherSlug}`)}
            >
              <span>Explore {otherDivision.name} &rarr;</span>
            </button>
          </div>

          {/* 3-Column Desktop Grid */}
          {filteredGroups.length > 0 ? (
            <div className="compact-families-grid">
              {filteredGroups.map((group) => (
                <FamilyCard
                  key={group.id}
                  group={group}
                  onSelect={onNavigate}
                />
              ))}
            </div>
          ) : (
            <div className="division-empty-state">
              <h3>No product families matched your search</h3>
              <p>Try searching for a different term or clear the filter.</p>
              <button
                type="button"
                className="btn-clear-search"
                onClick={() => setSearchQuery('')}
              >
                Reset Search
              </button>
            </div>
          )}

          {/* Capabilities Panel */}
          <div className="division-capabilities-card">
            <div className="capabilities-info">
              <span className="capabilities-eyebrow">{division.name} ADVANTAGE</span>
              <h3>Certified Industrial Infrastructure</h3>
              <ul className="capabilities-list">
                {division.features.map((feat, i) => (
                  <li key={i}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D3122A" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="capabilities-cta">
              <h4>Direct Tender & Export Desk</h4>
              <p>We supply project packages with complete MTC 3.1, hydro-testing, and third-party inspection (TPI).</p>
              <a
                href="https://wa.me/919000000000?text=Hello%20Redcore%20Steels,%20I%20have%20an%20inquiry%20for%20the%20commercial%20desk."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-capabilities-rfq"
              >
                <span>Request Project Quotation</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
