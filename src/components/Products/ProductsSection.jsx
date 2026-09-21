import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { productsData } from '../../data/homeSectionsData';
import ProductCard from './ProductCard';
import './ProductsSection.css';

gsap.registerPlugin(ScrollTrigger);

export default function ProductsSection({ onNavigate }) {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);
  const ctaRef = useRef(null);

  // GSAP ScrollTrigger animation on section entrance
  useEffect(() => {
    if (!sectionRef.current || !gridRef.current) return;

    const ctx = gsap.context(() => {
      // Header reveal
      gsap.fromTo(
        headerRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.14,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 82%',
            toggleActions: 'play none none none'
          }
        }
      );

      // Product cards stagger reveal with subtle 3D depth
      const cards = gridRef.current.querySelectorAll('.product-card');
      gsap.fromTo(
        cards,
        { opacity: 0, y: 38, scale: 0.96, rotateX: 4 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          duration: 0.75,
          stagger: 0.07,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );

      // Bottom Button reveal
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: ctaRef.current,
              start: 'top 90%',
              toggleActions: 'play none none none'
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="products" ref={sectionRef} className="products-section" aria-label="Our Products">
      <div className="section-container">
        {/* Section Header */}
        <div ref={headerRef} className="products-header">
          <div className="section-eyebrow">
            <span className="eyebrow-accent-bar" />
            <span className="eyebrow-text">ENGINEERING INVENTORY & PRODUCTION</span>
          </div>

          <h2 className="section-display-heading">
            OUR <span className="text-highlight-red">PRODUCTS</span>
          </h2>

          <p className="section-description">
            Precision-engineered steel products for demanding industrial and engineering applications.
          </p>
        </div>

        {/* 9 Products Grid */}
        <div ref={gridRef} className="products-grid">
          {productsData.map(product => (
            <ProductCard key={product.id} product={product} onNavigate={onNavigate} />
          ))}
        </div>

        {/* Medium-sized Centered Button: ALL PRODUCTS → */}
        <div ref={ctaRef} className="products-action-center">
          <a
            href="/products"
            className="all-products-main-btn"
            aria-label="View All Products"
            onClick={(e) => {
              if (onNavigate) {
                e.preventDefault();
                onNavigate('/products');
              }
            }}
          >
            <span>ALL PRODUCTS</span>
            <span className="btn-arrow" aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </section>
  );
}
