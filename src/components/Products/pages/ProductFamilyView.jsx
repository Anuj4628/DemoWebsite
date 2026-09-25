import React, { useState, useMemo, useEffect, useRef } from 'react';
import gsap from 'gsap';
import GradeCard from '../GradeCard';
import { getProductGroup, DIVISIONS } from '../../../data/productCatalogData';
import { brandDetails } from '../../../data/navigationData';
import { FileText, Package, Layers, Search, X } from 'lucide-react';
import './ProductFamilyView.css';

/**
 * Premium Industrial Product Family View (Matching Exact Reference Image 1)
 */
export default function ProductFamilyView({
  divisionSlug,
  groupSlug,
  onNavigate
}) {
  const [selectedMaterial, setSelectedMaterial] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const heroCardRef = useRef(null);
  const gridContainerRef = useRef(null);

  const group = useMemo(() => {
    return getProductGroup(divisionSlug, groupSlug);
  }, [divisionSlug, groupSlug]);


  // Extract unique materials that actually exist in this family
  const materialList = useMemo(() => {
    if (!group || !group.categories) return [];
    const set = new Set();
    group.categories.forEach(c => {
      if (c.materialName) set.add(c.materialName);
    });
    return Array.from(set);
  }, [group]);

  // Filter categories
  const filteredCategories = useMemo(() => {
    if (!group || !group.categories) return [];
    return group.categories.filter(cat => {
      // Material filter
      if (selectedMaterial !== 'ALL' && cat.materialName !== selectedMaterial) {
        return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = (cat.name || '').toLowerCase().includes(q);
        const matchGrade = (cat.grade || '').toLowerCase().includes(q);
        const matchDesc = (cat.shortDesc || '').toLowerCase().includes(q);
        const matchSpecs = cat.specs ? JSON.stringify(cat.specs).toLowerCase().includes(q) : false;
        return matchName || matchGrade || matchDesc || matchSpecs;
      }
      return true;
    });
  }, [group, selectedMaterial, searchQuery]);

  // GSAP Entrance Animations
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
  }, []);

  useEffect(() => {
    if (!gridContainerRef.current) return;
    const cards = gridContainerRef.current.querySelectorAll('.ref-grade-card');
    if (cards.length > 0) {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.45, stagger: 0.04, ease: 'power2.out' }
      );
    }
  }, [selectedMaterial, searchQuery]);

  if (!group) {
    return (
      <div className="product-family-not-found">
        <div className="not-found-card">
          <h2>Product Family Not Found</h2>
          <p>We couldn't locate the requested product group. It may have been moved or updated.</p>
          <button
            type="button"
            className="btn-back-catalog"
            onClick={() => onNavigate && onNavigate('/products')}
          >
            Return to Products Catalog
          </button>
        </div>
      </div>
    );
  }

  const shortDescription = group.shortDesc || group.fullDesc;

  return (
    <div className="premium-family-view">
      {/* 1. Large Industrial Hero Section (Exact Match to Reference Image 1) */}
      <section
        className="family-hero-section"
        style={{ backgroundImage: `url("${group.heroImage}")` }}
      >
        <div className="family-hero-overlay" aria-hidden="true" />

        <div className="family-hero-inner">
          {/* Floating Dark Glassmorphic Card (Matching Image 1) */}
          <div ref={heroCardRef} className="family-hero-card">
            
            {/* Breadcrumb inside Card: Home > Products > [Family Name] */}
            <nav className="family-breadcrumb-nav" aria-label="Breadcrumb">
              <a
                href="/"
                className="crumb-text"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/');
                }}
              >
                Home
              </a>
              <span className="crumb-arrow">&gt;</span>
              <a
                href="/products"
                className="crumb-text"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/products');
                }}
              >
                Products
              </a>
              <span className="crumb-arrow">&gt;</span>
              <span className="crumb-active">{group.name}</span>
            </nav>

            {/* Tag Pill: [ 📦 PRODUCT FAMILY SPECIFICATIONS ] */}
            <div className="family-tag-pill">
              <span className="tag-bracket">[</span>
              <FileText size={13} className="tag-file-icon" />
              <span className="tag-pill-text">
                PRODUCT FAMILY SPECIFICATIONS
              </span>
              <span className="tag-bracket">]</span>
            </div>

            {/* Main Category Title */}
            <h1 className="family-hero-title">{group.name}</h1>

            {/* Short Category Description */}
            <p className="family-hero-desc">
              {shortDescription}
            </p>

            {/* Two Metric Pills: [ Total Products: X Items ] [ Materials Supported: Y Alloys ] */}
            <div className="family-metrics-pills-row">
              <div className="metric-pill">
                <Package size={14} className="metric-pill-icon" />
                <span className="metric-pill-label">Total Products:</span>
                <strong className="metric-pill-value">{group.categories.length} Items</strong>
              </div>

              <div className="metric-pill">
                <Layers size={14} className="metric-pill-icon" />
                <span className="metric-pill-label">Materials Supported:</span>
                <strong className="metric-pill-value">{materialList.length} Alloys</strong>
              </div>
            </div>

            {/* Search Within Category Inside Card */}
            <div className="family-search-block">
              <div className="search-label-eyebrow">
                SEARCH WITHIN {group.name.toUpperCase()}
              </div>

              <div className="family-card-search-input-wrap">
                <Search size={16} className="search-glass-icon" />
                <input
                  type="text"
                  placeholder={`Search by grade (316L, 2205, Inconel)...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="family-card-search-input"
                  aria-label={`Search ${group.name}`}
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

      {/* 2. Product Family Browsing Area */}
      <section className="family-catalogue-section">
        <div className="family-catalogue-container">
          
          {/* Header */}
          <div className="family-browsing-header">
            <div className="browsing-title-col">
              <span className="browsing-eyebrow">PRODUCT SPECIFICATIONS</span>
              <h2 className="browsing-title">EXPLORE {group.name.toUpperCase()}</h2>
            </div>

            {searchQuery && (
              <div className="browsing-query-indicator">
                <span className="query-text">Matching "{searchQuery}" ({filteredCategories.length})</span>
                <button
                  type="button"
                  className="btn-query-clear"
                  onClick={() => setSearchQuery('')}
                >
                  Clear
                </button>
              </div>
            )}
          </div>

          {/* Compact Material Filter Pills */}
          <div className="family-filters-row">
            <div className="filters-label">FILTER ALLOY:</div>
            <div className="filter-pills-list">
              <button
                type="button"
                className={`compact-filter-pill ${selectedMaterial === 'ALL' ? 'active' : ''}`}
                onClick={() => setSelectedMaterial('ALL')}
              >
                ALL ({group.categories.length})
              </button>
              {materialList.map((mat) => {
                const count = group.categories.filter(c => c.materialName === mat).length;
                return (
                  <button
                    key={mat}
                    type="button"
                    className={`compact-filter-pill ${selectedMaterial === mat ? 'active' : ''}`}
                    onClick={() => setSelectedMaterial(mat)}
                  >
                    {mat} ({count})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Summary */}
          <div className="family-results-bar">
            <span className="results-count-text">
              Showing <strong>{filteredCategories.length}</strong> of {group.categories.length} specifications
            </span>
            {(selectedMaterial !== 'ALL' || searchQuery) && (
              <button
                type="button"
                className="btn-reset-filters"
                onClick={() => {
                  setSelectedMaterial('ALL');
                  setSearchQuery('');
                }}
              >
                Reset All Filters
              </button>
            )}
          </div>

          {/* 3-Column Desktop Grid with Compact GradeCards Matching Reference Image 2 */}
          {filteredCategories.length > 0 ? (
            <div ref={gridContainerRef} className="compact-grades-grid">
              {filteredCategories.map((cat) => (
                <GradeCard
                  key={cat.slug}
                  category={cat}
                  groupSlug={group.slug}
                  divisionSlug={group.divisionSlug}
                  onSelect={onNavigate}
                />
              ))}
            </div>
          ) : (
            <div className="family-empty-box">
              <Package size={38} className="empty-icon-box" />
              <h3>No specifications match your filter criteria</h3>
              <p>Try searching for a different grade or select "ALL" to view all supported alloys.</p>
              <button
                type="button"
                className="btn-reset-filters-btn"
                onClick={() => {
                  setSelectedMaterial('ALL');
                  setSearchQuery('');
                }}
              >
                Show All Specifications
              </button>
            </div>
          )}

        </div>
      </section>

      {/* 3. Compact RFQ Assistance Footer Banner */}
      <section className="family-rfq-strip">
        <div className="family-catalogue-container">
          <div className="rfq-compact-card">
            <div className="rfq-compact-content">
              <span className="rfq-compact-eyebrow">CUSTOM ORDERS &amp; TECHNICAL SOURCING</span>
              <h3>Need a Custom Schedule, Non-Standard Dimension or Specific Heat?</h3>
              <p>
                Our engineering team manufactures tailored schedules, heavy wall dimensions, and supplies tested materials certified to client specifications.
              </p>
            </div>
            <div className="rfq-compact-actions">
              <a
                href={`https://wa.me/${brandDetails.contact.whatsAppRaw}?text=${encodeURIComponent(`Hello ${brandDetails.name}, I need a quote for ${group.name}.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-rfq-whatsapp"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
                </svg>
                <span>WhatsApp Inquiry</span>
              </a>
              <a href={`tel:${brandDetails.contact.phone1Raw}`} className="btn-rfq-call">
                <span>Call Desk</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
