import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { productsData, productCategories } from '../../data/homeSectionsData';
import ProductCard from './ProductCard';
import { ArrowRight, Layers, FileText, ArrowUpRight } from 'lucide-react';
import { BHAWAL_CATALOG_URL } from '../../constants/catalog';
import './ProductsSection.css';

gsap.registerPlugin(ScrollTrigger);

export default function ProductsSection({ onNavigate }) {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProducts = activeCategory === 'all'
    ? productsData
    : productsData.filter(p => p.category === activeCategory);

  // GSAP entrance reveal
  useEffect(() => {
    if (!sectionRef.current || !gridRef.current) return;

    const ctx = gsap.context(() => {
      // Header reveal
      gsap.fromTo(
        headerRef.current.children,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );

      // Product cards stagger reveal
      const cards = gridRef.current.querySelectorAll('.catalog-product-card');
      gsap.fromTo(
        cards,
        { opacity: 0, y: 35, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.65,
          stagger: 0.06,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 86%',
            toggleActions: 'play none none none'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="products" ref={sectionRef} className="products-section" aria-label="Our Products">
      <div className="section-container">
        {/* Section Header */}
        <div ref={headerRef} className="products-header">
          <div className="products-header-top">
            <div className="section-eyebrow">
              <span className="eyebrow-dash-bar" aria-hidden="true" />
              <span className="eyebrow-text">ENGINEERING INVENTORY &amp; PRODUCTION</span>
            </div>

            <h2 className="section-display-heading">
              OUR PRODUCTS
            </h2>

            <p className="products-lead-text">
              Precision-engineered steel products for demanding industrial and engineering applications.
            </p>
          </div>

          {/* Clean Category Filter Tabs */}
          <div className="products-filter-bar" role="tablist" aria-label="Product Categories">
            {productCategories.map(cat => (
              <button
                key={cat.id}
                role="tab"
                aria-selected={activeCategory === cat.id}
                className={`product-filter-btn ${activeCategory === cat.id ? 'is-active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                <span>{cat.label}</span>
                {activeCategory === cat.id && <span className="filter-active-indicator" />}
              </button>
            ))}
          </div>
        </div>

        {/* Vertical Catalog Grid */}
        <div ref={gridRef} className="products-catalog-grid">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} onNavigate={onNavigate} />
          ))}
        </div>

        {/* Bottom Comprehensive CTA */}
        <div className="products-bottom-cta-banner">
          <div className="cta-banner-info">
            <Layers className="banner-icon" size={24} />
            <div>
              <h4 className="banner-title">Complete ASME &amp; ASTM Dimensional Specifications</h4>
              <p className="banner-desc">Explore our full multi-grade industrial piping and steel inventory catalog.</p>
            </div>
          </div>

          <div className="cta-banner-actions">
            <a
              href={BHAWAL_CATALOG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="products-catalog-pdf-btn"
              title="Open Bhawal Steel Engineering Client Catalog (PDF)"
            >
              <FileText size={15} aria-hidden="true" />
              <span>Explore Catalog PDF</span>
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>

            <a
              href="/products"
              className="products-complete-catalog-btn"
              onClick={(e) => {
                if (onNavigate) {
                  e.preventDefault();
                  onNavigate('/products');
                }
              }}
            >
              <span>VIEW ALL 18 FAMILIES</span>
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
