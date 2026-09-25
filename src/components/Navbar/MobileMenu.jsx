import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { navLinks, brandDetails } from '../../data/navigationData';
import { MATERIALS } from '../../data/materialsData';
import { PRODUCT_GROUPS } from '../../data/productCatalogData';
import { CERTIFICATES_DATA } from './CertificatesDropdown';
import Button from '../UI/Button';
import { ChevronDown, ExternalLink, FileText } from 'lucide-react';
import { BHAWAL_CATALOG_URL } from '../../constants/catalog';
import './MobileMenu.css';

export default function MobileMenu({ isOpen, onClose, activeLink, currentPage, onNavigate }) {
  const [materialsExpanded, setMaterialsExpanded] = useState(false);
  const [productsExpanded, setProductsExpanded] = useState(false);
  const [certificatesExpanded, setCertificatesExpanded] = useState(false);
  const menuRef = useRef(null);
  const linksContainerRef = useRef(null);
  const footerRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    const el = menuRef.current;
    if (!el) return;

    if (isOpen) {
      document.body.style.overflow = 'hidden';

      // Kill any running animations
      if (timelineRef.current) timelineRef.current.kill();

      const tl = gsap.timeline();
      timelineRef.current = tl;

      // Set initial state
      gsap.set(el, { display: 'flex', opacity: 0, y: -20 });
      gsap.set(linksContainerRef.current?.children || [], { opacity: 0, y: 25 });
      gsap.set(footerRef.current, { opacity: 0, y: 20 });

      // Animate in
      tl.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: 'power3.out'
      })
      .to(linksContainerRef.current?.children || [], {
        opacity: 1,
        y: 0,
        stagger: 0.05,
        duration: 0.35,
        ease: 'power3.out'
      }, '-=0.2')
      .to(footerRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: 'power2.out'
      }, '-=0.15');

    } else {
      document.body.style.overflow = '';

      if (timelineRef.current) timelineRef.current.kill();

      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(el, { display: 'none' });
        }
      });
      timelineRef.current = tl;

      tl.to(linksContainerRef.current?.children || [], {
        opacity: 0,
        y: -15,
        stagger: 0.03,
        duration: 0.2,
        ease: 'power2.in'
      })
      .to(el, {
        opacity: 0,
        y: -20,
        duration: 0.25,
        ease: 'power2.in'
      }, '-=0.1');
    }

    return () => {
      document.body.style.overflow = '';
      if (timelineRef.current) timelineRef.current.kill();
    };
  }, [isOpen]);

  const handleLinkClick = (e, id) => {
    e.preventDefault();
    if (id === 'materials') {
      setMaterialsExpanded(prev => !prev);
      return;
    }
    if (id === 'products') {
      setProductsExpanded(prev => !prev);
      return;
    }
    if (id === 'certificate') {
      setCertificatesExpanded(prev => !prev);
      return;
    }

    setMaterialsExpanded(false);
    setProductsExpanded(false);
    setCertificatesExpanded(false);
    onClose();
    if (onNavigate) {
      if (id === 'about') {
        onNavigate('about');
      } else if (id === 'contact') {
        onNavigate('contact');
      } else if (id === 'home') {
        onNavigate('home');
      } else {
        if (currentPage === 'about' || currentPage === 'materials' || currentPage === 'products' || currentPage === 'contact') {
          onNavigate('home', id);
        } else {
          const target = document.getElementById(id);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    }
  };

  const handleSubMaterialClick = (e, slug) => {
    e.preventDefault();
    setMaterialsExpanded(false);
    setProductsExpanded(false);
    onClose();
    if (onNavigate) {
      if (slug === 'all') {
        onNavigate('/materials');
      } else {
        onNavigate(`/materials/${slug}`);
      }
    }
  };

  const handleSubProductClick = (e, url) => {
    e.preventDefault();
    setProductsExpanded(false);
    setMaterialsExpanded(false);
    onClose();
    if (onNavigate) {
      onNavigate(url);
    }
  };

  return (
    <div
      ref={menuRef}
      className={`mobile-menu-overlay ${isOpen ? 'is-open' : ''}`}
      aria-hidden={!isOpen}
      role="dialog"
      aria-modal="true"
    >
      <div className="mobile-menu-inner">
        {/* Navigation items */}
        <ul ref={linksContainerRef} className="mobile-nav-list">
          {navLinks.map((link, index) => {
            const isActive = activeLink === link.id;
            const isMaterials = link.id === 'materials';
            const isProducts = link.id === 'products';
            const isCertificate = link.id === 'certificate';
            const hasSubnav = isMaterials || isProducts || isCertificate;

            let targetHref = link.href;
            if (link.id === 'about') targetHref = '/about';
            else if (link.id === 'contact') targetHref = '/contact';
            else if (link.id === 'products') targetHref = '/products';
            else if (link.id === 'materials') targetHref = '/materials';

            return (
              <li key={link.id} className={`mobile-nav-item ${hasSubnav ? 'has-subnav' : ''}`}>
                <div className="mobile-nav-row">
                  <a
                    href={targetHref}
                    className={`mobile-nav-link ${isActive ? 'active' : ''}`}
                    onClick={(e) => handleLinkClick(e, link.id)}
                  >
                    <span className="mobile-link-number">0{index + 1}</span>
                    <span className="mobile-link-title">{link.label}</span>
                    <span className="mobile-link-accent" />
                  </a>

                  {isMaterials && (
                    <button
                      type="button"
                      className={`mobile-subnav-toggle ${materialsExpanded ? 'expanded' : ''}`}
                      onClick={() => setMaterialsExpanded(prev => !prev)}
                      aria-label={materialsExpanded ? 'Collapse Materials Menu' : 'Expand Materials Menu'}
                      aria-expanded={materialsExpanded}
                    >
                      <ChevronDown size={18} />
                    </button>
                  )}

                  {isProducts && (
                    <button
                      type="button"
                      className={`mobile-subnav-toggle ${productsExpanded ? 'expanded' : ''}`}
                      onClick={() => setProductsExpanded(prev => !prev)}
                      aria-label={productsExpanded ? 'Collapse Products Menu' : 'Expand Products Menu'}
                      aria-expanded={productsExpanded}
                    >
                      <ChevronDown size={18} />
                    </button>
                  )}

                  {isCertificate && (
                    <button
                      type="button"
                      className={`mobile-subnav-toggle ${certificatesExpanded ? 'expanded' : ''}`}
                      onClick={() => setCertificatesExpanded(prev => !prev)}
                      aria-label={certificatesExpanded ? 'Collapse Certificate Menu' : 'Expand Certificate Menu'}
                      aria-expanded={certificatesExpanded}
                    >
                      <ChevronDown size={18} />
                    </button>
                  )}
                </div>

                {/* Expandable 9 Materials Sub-menu (Names Only) */}
                {isMaterials && materialsExpanded && (
                  <div className="mobile-subnav-container">
                    <a
                      href="/materials"
                      className="mobile-subnav-item mobile-subnav-overview"
                      onClick={(e) => handleSubMaterialClick(e, 'all')}
                    >
                      <span>Explore All 9 Materials</span>
                      <span className="mobile-subnav-badge">View All</span>
                    </a>

                    <div className="mobile-subnav-grid">
                      {MATERIALS.map((mat) => (
                        <a
                          key={mat.id}
                          href={`/materials/${mat.slug}`}
                          className="mobile-subnav-item"
                          onClick={(e) => handleSubMaterialClick(e, mat.slug)}
                        >
                          <span className="subnav-mat-name">{mat.name}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Expandable Unified 18 Products Sub-menu */}
                {isProducts && productsExpanded && (
                  <div className="mobile-subnav-container">
                    <a
                      href="/products"
                      className="mobile-subnav-item mobile-subnav-overview"
                      onClick={(e) => handleSubProductClick(e, '/products')}
                    >
                      <span>View Complete Products Catalog</span>
                      <span className="mobile-subnav-badge">18 Families</span>
                    </a>

                    <div className="mobile-subnav-grid">
                      {PRODUCT_GROUPS.map((group) => (
                        <a
                          key={group.id}
                          href={`/products/${group.divisionSlug}/${group.slug}`}
                          className="mobile-subnav-item"
                          onClick={(e) => handleSubProductClick(e, `/products/${group.divisionSlug}/${group.slug}`)}
                        >
                          <span className="subnav-mat-name">{group.name}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Expandable 3 Certificates Sub-menu */}
                {isCertificate && certificatesExpanded && (
                  <div className="mobile-subnav-container">
                    <div className="mobile-subnav-grid mobile-subnav-grid-single">
                      {CERTIFICATES_DATA.map((cert) => {
                        const IconComponent = cert.icon;
                        return (
                          <a
                            key={cert.id}
                            href={cert.file}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mobile-subnav-item mobile-cert-subnav-item"
                            onClick={() => {
                              setCertificatesExpanded(false);
                              onClose();
                            }}
                            title={`Open ${cert.name} (PDF)`}
                          >
                            <div className="mobile-cert-item-inner">
                              <span className="mobile-cert-icon-wrap">
                                <IconComponent size={16} />
                              </span>
                              <div className="mobile-cert-text">
                                <span className="subnav-mat-name">{cert.name}</span>
                                <span className="mobile-cert-category">{cert.category}</span>
                              </div>
                            </div>
                            <div className="mobile-cert-right">
                              <span className="mobile-subnav-badge">PDF</span>
                              <ExternalLink size={13} className="mobile-cert-ext" />
                            </div>
                          </a>
                        );
                      })}
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        {/* Footer info & CTA */}
        <div ref={footerRef} className="mobile-menu-footer">
          <a
            href={BHAWAL_CATALOG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-catalog-cta-btn"
            title="Open Bhawal Steel & Engineering Official Product Catalog (PDF)"
            onClick={onClose}
          >
            <FileText size={17} aria-hidden="true" />
            <span>Explore Catalog (PDF)</span>
            <ExternalLink size={14} aria-hidden="true" />
          </a>

          <Button
            href="/request-for-quote"
            variant="primary"
            size="md"
            icon="arrow"
            onClick={(e) => {
              e.preventDefault();
              onClose();
              if (onNavigate) onNavigate('rfq');
            }}
            className="mobile-quote-btn"
          >
            {brandDetails.quoteCta.label}
          </Button>

          <div className="mobile-brand-meta">
            <span className="mobile-brand-name">{brandDetails.name}</span>
            <span className="mobile-brand-desc">{brandDetails.tagline}</span>
          </div>
        </div>

      </div>
    </div>
  );
}
