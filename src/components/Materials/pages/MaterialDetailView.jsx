import React, { useState, useMemo, useEffect, useRef } from 'react';
import gsap from 'gsap';
import GradeCard from '../../Products/GradeCard';
import { getMaterialBySlug, getProductsByMaterial, getMaterialCategories } from '../../../data/materialsData';
import { brandDetails } from '../../../data/navigationData';
import { ArrowLeft, Package, Layers, Search, X, ShieldCheck } from 'lucide-react';
import './MaterialDetailView.css';

/**
 * Material-Specific Product Listing View
 * Displays exclusively the products belonging to the selected material.
 */
export default function MaterialDetailView({ materialSlug, onNavigate }) {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const heroRef = useRef(null);
  const gridContainerRef = useRef(null);

  const material = useMemo(() => {
    return getMaterialBySlug(materialSlug);
  }, [materialSlug]);

  // Dynamic collection of ALL products strictly belonging to this material
  const allMaterialProducts = useMemo(() => {
    if (!material) return [];
    return getProductsByMaterial(material.slug);
  }, [material]);

  // Product categories/families that actually contain products for this material
  const categoryFilters = useMemo(() => {
    if (!material) return [];
    return getMaterialCategories(material.slug);
  }, [material]);

  // Filter products by selected category and search query
  const filteredProducts = useMemo(() => {
    return allMaterialProducts.filter(item => {
      // Category / Family filter
      if (selectedCategory !== 'ALL' && item.groupSlug !== selectedCategory) {
        return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = (item.name || '').toLowerCase().includes(q);
        const matchGrade = (item.grade || '').toLowerCase().includes(q);
        const matchGroup = (item.groupName || '').toLowerCase().includes(q);
        const matchDesc = (item.shortDesc || '').toLowerCase().includes(q);
        const matchSpecs = item.specs ? JSON.stringify(item.specs).toLowerCase().includes(q) : false;
        return matchName || matchGrade || matchGroup || matchDesc || matchSpecs;
      }
      return true;
    });
  }, [allMaterialProducts, selectedCategory, searchQuery]);

  // GSAP Entrance Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (heroRef.current) {
        gsap.fromTo(
          heroRef.current,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
        );
      }
    });
    return () => ctx.revert();
  }, [materialSlug]);

  // Animate grid cards when category or search changes
  useEffect(() => {
    if (!gridContainerRef.current) return;
    const cards = gridContainerRef.current.querySelectorAll('.ref-grade-card');
    if (cards.length > 0) {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.03, ease: 'power2.out' }
      );
    }
  }, [selectedCategory, searchQuery, materialSlug]);

  if (!material) {
    return (
      <div className="material-not-found-view">
        <div className="material-not-found-card">
          <h2>Material Category Not Found</h2>
          <p>We couldn't locate the requested material specification. Please browse our 9 standard materials.</p>
          <button
            type="button"
            className="btn-back-to-materials"
            onClick={() => onNavigate && onNavigate('/materials')}
          >
            Explore All 9 Materials
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="material-detail-page">
      {/* 1. Header & Hero Area with Breadcrumb */}
      <section className="material-page-hero" ref={heroRef}>
        <div className="material-hero-container">

          {/* Breadcrumb Navigation */}
          <nav className="material-breadcrumb" aria-label="Breadcrumb">
            <ol className="breadcrumb-list">
              <li className="breadcrumb-item">
                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onNavigate) onNavigate('home');
                  }}
                >
                  Home
                </a>
              </li>
              <li className="breadcrumb-separator">/</li>
              <li className="breadcrumb-item">
                <a
                  href="/materials"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onNavigate) onNavigate('/materials');
                  }}
                >
                  Materials
                </a>
              </li>
              <li className="breadcrumb-separator">/</li>
              <li className="breadcrumb-item active" aria-current="page">
                {material.name}
              </li>
            </ol>
          </nav>

          {/* Main Material Header Card */}
          <div className="material-header-card">
            <div className="material-header-info">
              <div className="material-badge-row">
                <span className="mat-pill-badge">{material.badge}</span>
                <span className="mat-pill-spec">METALLURGICAL SPECIFICATIONS</span>
              </div>

              <h1 className="material-display-title">
                {material.name} <span className="text-highlight-teal">Products</span>
              </h1>

              <p className="material-lead-desc">
                {material.shortDesc}
              </p>

              {/* Key Grade & Standard Tags */}
              <div className="material-standards-list">
                <span className="standards-label">KEY STANDARDS:</span>
                {material.standards.map((std) => (
                  <span key={std} className="standard-tag">
                    {std}
                  </span>
                ))}
              </div>

              {/* Summary Metrics */}
              <div className="material-metrics-strip">
                <div className="metric-badge">
                  <Package size={14} className="metric-icon" />
                  <span className="metric-label">Total Products:</span>
                  <strong>{allMaterialProducts.length} Items</strong>
                </div>

                <div className="metric-badge">
                  <Layers size={14} className="metric-icon" />
                  <span className="metric-label">Product Families:</span>
                  <strong>{categoryFilters.length} Categories</strong>
                </div>

                <div className="metric-badge">
                  <ShieldCheck size={14} className="metric-icon" />
                  <span className="metric-label">Quality:</span>
                  <strong>100% PMI Tested</strong>
                </div>
              </div>
            </div>

            {/* Right Side: Visual Material Representative Showcase */}
            <div className="material-header-visual">
              <div className="material-visual-frame">
                <img
                  src={material.heroImage}
                  alt={`${material.name} representative industrial component`}
                  className="material-visual-img"
                  loading="eager"
                  decoding="async"
                />
                <div className="material-visual-meta">
                  <span className="meta-grade-label">PRIMARY GRADES</span>
                  <span className="meta-grade-value">{material.grade}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Product Browsing & Filtering Section */}
      <section className="material-products-section" aria-label={`${material.name} Product Catalog`}>
        <div className="material-products-container">

          {/* Top Bar with Back Link & Search */}
          <div className="material-action-bar">
            <button
              type="button"
              className="btn-back-materials-nav"
              onClick={() => onNavigate && onNavigate('/materials')}
              aria-label="Back to All Materials"
            >
              <ArrowLeft size={16} />
              <span>Back to All Materials</span>
            </button>

            {/* Search Input */}
            <div className="material-search-wrap">
              <Search size={16} className="material-search-icon" />
              <input
                type="text"
                placeholder={`Search in ${material.name} (grade, category, spec)...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="material-search-input"
                aria-label={`Search ${material.name} products`}
              />
              {searchQuery && (
                <button
                  type="button"
                  className="material-search-clear"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                >
                  <X size={15} />
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Pills (Only categories containing products for this material) */}
          <div className="material-categories-filter-row">
            <span className="cat-filter-label">FILTER BY FAMILY:</span>
            <div className="cat-filter-pills">
              <button
                type="button"
                className={`cat-pill ${selectedCategory === 'ALL' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('ALL')}
              >
                ALL ({allMaterialProducts.length})
              </button>
              {categoryFilters.map((cat) => (
                <button
                  key={cat.slug}
                  type="button"
                  className={`cat-pill ${selectedCategory === cat.slug ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat.slug)}
                >
                  {cat.name} ({cat.count})
                </button>
              ))}
            </div>
          </div>

          {/* Results Counter Bar */}
          <div className="material-results-status-bar">
            <span className="results-count-info">
              Displaying <strong>{filteredProducts.length}</strong> of {allMaterialProducts.length} {material.name} specifications
            </span>
            {(selectedCategory !== 'ALL' || searchQuery) && (
              <button
                type="button"
                className="btn-reset-material-filter"
                onClick={() => {
                  setSelectedCategory('ALL');
                  setSearchQuery('');
                }}
              >
                Reset Filters
              </button>
            )}
          </div>

          {/* 3-Column Desktop Grid with Reused GradeCard Components */}
          {filteredProducts.length > 0 ? (
            <div ref={gridContainerRef} className="material-products-grid">
              {filteredProducts.map((prod) => (
                <GradeCard
                  key={`${prod.groupSlug}-${prod.slug}`}
                  category={prod}
                  groupSlug={prod.groupSlug}
                  divisionSlug={prod.divisionSlug}
                  onSelect={onNavigate}
                />
              ))}
            </div>
          ) : (
            <div className="material-empty-box">
              <Package size={40} className="empty-box-icon" />
              <h3>No {material.name} Products Found</h3>
              <p>No specifications matched your filter query. Reset your search or select "ALL" to view the complete catalog.</p>
              <button
                type="button"
                className="btn-empty-reset"
                onClick={() => {
                  setSelectedCategory('ALL');
                  setSearchQuery('');
                }}
              >
                Show All {material.name} Products
              </button>
            </div>
          )}

        </div>
      </section>

      {/* 3. Bottom RFQ Direct Sourcing Strip */}
      <section className="material-bottom-cta">
        <div className="material-products-container">
          <div className="material-rfq-banner">
            <div className="material-rfq-info">
              <span className="rfq-eyebrow">CUSTOM ORDERS &amp; MILL DISPATCH</span>
              <h3>Need Custom Thickness, Flange Schedules or Mill Quantities in {material.name}?</h3>
              <p>
                Our manufacturing and distribution teams provide rapid turnarounds, custom cut-to-length services,
                and full third-party inspection (TUV, BV, DNV, Lloyd's) on all {material.name} supplies.
              </p>
            </div>
            <div className="material-rfq-btns">
              <a
                href={`https://wa.me/${brandDetails.contact.whatsAppRaw}?text=${encodeURIComponent(`Hello ${brandDetails.name}, I need a quote for ${material.name} products.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-rfq-wa"
              >
                <span>WhatsApp Inquiry</span>
              </a>
              <a
                href={`mailto:${brandDetails.contact.email}?subject=${encodeURIComponent(`RFQ for ${material.name} Products — Bhawal Steel`)}`}
                className="btn-rfq-mail"
              >
                <span>Email RFQ</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
