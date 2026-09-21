import React, { useState, useMemo, useEffect, useRef } from 'react';
import gsap from 'gsap';
import FamilyCard from '../FamilyCard';
import { PRODUCT_GROUPS } from '../../../data/productCatalogData';
import heroBgImage from '../../../assets/Product BG/premium steel solution build for industry.png';
import { Package, Factory, Globe, Search, X } from 'lucide-react';
import './ProductsLandingView.css';

/**
 * Products Landing View (Exact UI Replication of Reference Image 1 & 2)
 * Features:
 * - Industrial steel workshop background image
 * - Dark slate floating content card on the left
 * - [ 📦 MANUFACTURER & SUPPLIER DIVISIONS ] tag
 * - Bold white headline with Redcore Red highlight
 * - Search input inside the card
 * - Floating 3-card division selector underneath (All Divisions, Manufacturer, Supplier)
 * - 3-column desktop grid with exact Reference Image 2 Product Cards
 * - GSAP animations for hero card, division selector, and product cards
 */
export default function ProductsLandingView({ onNavigate }) {
  const [activeDivision, setActiveDivision] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const heroCardRef = useRef(null);
  const divisionCardsRef = useRef(null);
  const gridContainerRef = useRef(null);

  const totalCount = PRODUCT_GROUPS.length;

  // Filter groups
  const filteredGroups = useMemo(() => {
    let list = PRODUCT_GROUPS;
    if (activeDivision !== 'all') {
      list = list.filter(g => g.divisionSlug === activeDivision);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(g =>
        g.name.toLowerCase().includes(q) ||
        g.shortDesc.toLowerCase().includes(q) ||
        g.tagline.toLowerCase().includes(q) ||
        (g.categories && g.categories.some(c =>
          c.name.toLowerCase().includes(q) ||
          c.grade.toLowerCase().includes(q) ||
          c.materialName.toLowerCase().includes(q) ||
          (c.specs && JSON.stringify(c.specs).toLowerCase().includes(q))
        ))
      );
    }
    return list;
  }, [activeDivision, searchQuery]);

  // GSAP Animations on Mount
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (heroCardRef.current) {
        gsap.fromTo(
          heroCardRef.current,
          { opacity: 0, x: -40 },
          { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' }
        );
      }

      if (divisionCardsRef.current) {
        gsap.fromTo(
          divisionCardsRef.current.children,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out', delay: 0.2 }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  // Animate grid cards when division or search changes
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
  }, [activeDivision, searchQuery]);

  return (
    <div className="reference-products-landing">
      {/* 1. Large Industrial Hero Section (Image 1) */}
      <section
        className="reference-hero-section"
        style={{ backgroundImage: `url("${heroBgImage}")` }}
      >
        <div className="reference-hero-overlay" aria-hidden="true" />

        <div className="reference-hero-container">
          {/* Floating Dark Glassmorphic Card on the Left */}
          <div ref={heroCardRef} className="hero-floating-card">
            
            {/* Breadcrumbs inside the card: Home > Products System */}
            <nav className="card-breadcrumb-nav" aria-label="Breadcrumb">
              <span className="crumb-link" onClick={() => onNavigate('/')}>Home</span>
              <span className="crumb-sep">&gt;</span>
              <span className="crumb-current">Products System</span>
            </nav>

            {/* Tag Pill: [ 📦 MANUFACTURER & SUPPLIER DIVISIONS ] */}
            <div className="card-divisions-tag">
              <span className="tag-bracket">[</span>
              <Package size={14} className="tag-icon" />
              <span className="tag-text">MANUFACTURER &amp; SUPPLIER DIVISIONS</span>
              <span className="tag-bracket">]</span>
            </div>

            {/* Main Title with Redcore Red Highlight */}
            <h1 className="card-main-heading">
              Industrial Metals, <br />
              Engineered Products &amp; <br />
              <span className="heading-highlight-red">Critical Components</span>
            </h1>

            {/* Subtitle Paragraph */}
            <p className="card-sub-description">
              Supplied globally for mission-critical infrastructure. Select a division below to browse Manufacturer or Supplier divisions.
            </p>

            {/* Search Input Field inside Card */}
            <div className="card-search-container">
              <Search size={16} className="card-search-icon" />
              <input
                type="text"
                placeholder="Search products by grade (316L, 2205), standard, or name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="card-search-input"
                aria-label="Search catalog"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="card-search-clear"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                >
                  <X size={15} />
                </button>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* 2. Floating 3-Card Division Selector (Matching Image 1) */}
      <section className="floating-division-selector">
        <div className="reference-container">
          <div ref={divisionCardsRef} className="division-cards-row" role="tablist">
            
            {/* Card 1: All Divisions */}
            <button
              type="button"
              role="tab"
              aria-selected={activeDivision === 'all'}
              className={`div-select-card ${activeDivision === 'all' ? 'active-dark' : 'inactive-white'}`}
              onClick={() => setActiveDivision('all')}
            >
              <div className="div-card-content">
                <span className="div-card-eyebrow">COMPLETE CATALOGUE</span>
                <h3 className="div-card-title">All Divisions</h3>
                <span className="div-card-sub">All {totalCount} product families</span>
              </div>
              <div className="div-card-icon-wrap">
                <Package size={26} className="div-card-icon" />
              </div>
            </button>

            {/* Card 2: Manufacturer */}
            <button
              type="button"
              role="tab"
              aria-selected={activeDivision === 'manufacturer'}
              className={`div-select-card ${activeDivision === 'manufacturer' ? 'active-dark' : 'inactive-white'}`}
              onClick={() => setActiveDivision('manufacturer')}
            >
              <div className="div-card-content">
                <span className="div-card-eyebrow eyebrow-red">A. IN-HOUSE FABRICATION</span>
                <h3 className="div-card-title">Manufacturer</h3>
                <span className="div-card-sub">Fittings, Flanges &amp; Fasteners</span>
              </div>
              <div className="div-card-icon-wrap">
                <Factory size={26} className="div-card-icon" />
              </div>
            </button>

            {/* Card 3: Supplier */}
            <button
              type="button"
              role="tab"
              aria-selected={activeDivision === 'supplier'}
              className={`div-select-card ${activeDivision === 'supplier' ? 'active-dark' : 'inactive-white'}`}
              onClick={() => setActiveDivision('supplier')}
            >
              <div className="div-card-content">
                <span className="div-card-eyebrow eyebrow-blue">B. GLOBAL MILL STOCKIST</span>
                <h3 className="div-card-title">Supplier</h3>
                <span className="div-card-sub">Pipes, Plates, Bars &amp; Coils</span>
              </div>
              <div className="div-card-icon-wrap">
                <Globe size={26} className="div-card-icon" />
              </div>
            </button>

          </div>
        </div>
      </section>

      {/* 3. Catalogue Grid Area with Reference Image 2 Cards */}
      <section className="reference-catalogue-area">
        <div className="reference-container">
          
          {/* Section Heading Bar */}
          <div className="catalogue-heading-bar">
            <div className="heading-left">
              <span className="catalogue-micro-eyebrow">
                {activeDivision === 'all' && 'FULL INDUSTRIAL CATALOGUE'}
                {activeDivision === 'manufacturer' && 'MANUFACTURER DIVISION — IN-HOUSE FORGED'}
                {activeDivision === 'supplier' && 'SUPPLIER DIVISION — GLOBAL MILL STOCK'}
              </span>
              <h2 className="catalogue-main-title">
                {activeDivision === 'all' && `All Product Families (${filteredGroups.length})`}
                {activeDivision === 'manufacturer' && `Manufacturer Families (${filteredGroups.length})`}
                {activeDivision === 'supplier' && `Supplier Families (${filteredGroups.length})`}
              </h2>
            </div>

            {searchQuery && (
              <div className="heading-right">
                <span className="active-query-chip">
                  Results for "{searchQuery}"
                </span>
                <button
                  type="button"
                  className="btn-clear-query"
                  onClick={() => setSearchQuery('')}
                >
                  Clear search
                </button>
              </div>
            )}
          </div>

          {/* 3-Column Desktop Grid with Exact Reference Image 2 Cards */}
          {filteredGroups.length > 0 ? (
            <div ref={gridContainerRef} className="reference-products-grid">
              {filteredGroups.map((group) => (
                <FamilyCard
                  key={group.id}
                  group={group}
                  onSelect={onNavigate}
                />
              ))}
            </div>
          ) : (
            <div className="reference-empty-state">
              <Package size={40} className="empty-icon" />
              <h3>No matching product families found</h3>
              <p>Try searching for broader terms such as "Butt Weld", "Flanges", "Pipes", or "Plates".</p>
              <button
                type="button"
                className="btn-empty-reset"
                onClick={() => {
                  setSearchQuery('');
                  setActiveDivision('all');
                }}
              >
                Reset Filters &amp; View All 18 Families
              </button>
            </div>
          )}

        </div>
      </section>

      {/* 4. Industrial Quality Strip */}
      <section className="reference-quality-strip">
        <div className="reference-container">
          <div className="quality-inner-card">
            <div className="quality-text-part">
              <span className="quality-pill-eyebrow">QUALITY ASSURANCE</span>
              <h3>Certified Compliance &amp; 100% Heat Traceability</h3>
              <p>
                Every piping component, flange, fastener, and raw material is supplied with EN 10204 3.1 &amp; 3.2 Mill Test Certificates, Positive Material Identification (PMI), and third-party inspection (TPI) acceptance.
              </p>
            </div>
            <div className="quality-chips-grid">
              <div className="q-badge-box">
                <strong>EN 10204 3.1</strong>
                <span>MTC Certified</span>
              </div>
              <div className="q-badge-box">
                <strong>100% PMI</strong>
                <span>Alloy Verification</span>
              </div>
              <div className="q-badge-box">
                <strong>ISO 9001:2015</strong>
                <span>Quality Standard</span>
              </div>
              <div className="q-badge-box">
                <strong>Hydro Tested</strong>
                <span>Pressure Integrity</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
