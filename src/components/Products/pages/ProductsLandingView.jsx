import React, { useState, useMemo, useEffect, useRef } from 'react';
import gsap from 'gsap';
import FamilyCard from '../FamilyCard';
import { PRODUCT_GROUPS } from '../../../data/productCatalogData';
import heroBgImage from '../../../assets/Product BG/premium steel solution build for industry.png';
import { Package, Search, X } from 'lucide-react';
import './ProductsLandingView.css';

/**
 * Products Landing View
 * Clean, Unified Product Catalog containing ALL 18 Product Families.
 * No Manufacturer or Supplier division separation in visible UI.
 */
export default function ProductsLandingView({ onNavigate }) {
  const [searchQuery, setSearchQuery] = useState('');

  const heroCardRef = useRef(null);
  const gridContainerRef = useRef(null);

  const totalCount = PRODUCT_GROUPS.length;

  // Filter all 18 groups by search query
  const filteredGroups = useMemo(() => {
    if (!searchQuery.trim()) return PRODUCT_GROUPS;
    const q = searchQuery.toLowerCase().trim();
    return PRODUCT_GROUPS.filter(g =>
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
  }, [searchQuery]);

  // GSAP Animations on Mount
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (heroCardRef.current) {
        gsap.fromTo(
          heroCardRef.current,
          { opacity: 0, x: -30 },
          { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out' }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  // Animate grid cards when search changes
  useEffect(() => {
    if (!gridContainerRef.current) return;
    const cards = gridContainerRef.current.querySelectorAll('.ref-product-card');
    if (cards.length > 0) {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.03, ease: 'power2.out' }
      );
    }
  }, [searchQuery]);

  return (
    <div className="reference-products-landing">
      {/* 1. Large Industrial Hero Section */}
      <section
        className="reference-hero-section"
        style={{ backgroundImage: `url("${heroBgImage}")` }}
      >
        <div className="reference-hero-overlay" aria-hidden="true" />

        <div className="reference-hero-container">
          {/* Floating Dark Card on the Left */}
          <div ref={heroCardRef} className="hero-floating-card">
            
            {/* Breadcrumbs inside the card: Home > Products */}
            <nav className="card-breadcrumb-nav" aria-label="Breadcrumb">
              <span className="crumb-link" onClick={() => onNavigate('/')}>Home</span>
              <span className="crumb-sep">&gt;</span>
              <span className="crumb-current">Products</span>
            </nav>

            {/* Tag Pill: [ 📦 COMPLETE INDUSTRIAL CATALOG ] */}
            <div className="card-divisions-tag">
              <span className="tag-bracket">[</span>
              <Package size={14} className="tag-icon" />
              <span className="tag-text">18 CERTIFIED PRODUCT FAMILIES</span>
              <span className="tag-bracket">]</span>
            </div>

            {/* Main Title */}
            <h1 className="card-main-heading">
              Industrial Metals, <br />
              Engineered Products &amp; <br />
              <span className="heading-highlight-gold">Critical Components</span>
            </h1>

            {/* Subtitle Paragraph */}
            <p className="card-sub-description">
              Precision-engineered steel components, piping products, and mill-certified industrial materials supplied globally for mission-critical infrastructure.
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

      {/* 2. Unified Catalogue Grid Area */}
      <section className="reference-catalogue-area">
        <div className="reference-container">
          
          {/* Section Heading Bar */}
          <div className="catalogue-heading-bar">
            <div className="heading-left">
              <span className="catalogue-micro-eyebrow">
                STANDARDIZED STEEL &amp; PIPING PORTFOLIO
              </span>
              <h2 className="catalogue-main-title">
                All Product Families ({filteredGroups.length})
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

          {/* 3-Column Desktop Grid with Clean Product Cards */}
          {filteredGroups.length > 0 ? (
            <div ref={gridContainerRef} className="reference-products-grid">
              {filteredGroups.map((group) => (
                <FamilyCard
                  key={group.id}
                  group={group}
                  onSelect={(url) => onNavigate && onNavigate(url)}
                />
              ))}
            </div>
          ) : (
            <div className="empty-catalog-box">
              <Package size={44} className="empty-icon" />
              <h3>No matching products found</h3>
              <p>Try searching for a different grade, standard, or component name.</p>
              <button
                type="button"
                className="btn-empty-reset"
                onClick={() => setSearchQuery('')}
              >
                View All {totalCount} Products
              </button>
            </div>
          )}

        </div>
      </section>
    </div>
  );
}
