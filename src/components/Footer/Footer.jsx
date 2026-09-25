import React from 'react';
import { brandDetails } from '../../data/navigationData';
import Button from '../UI/Button';
import { MapPin, Phone, Mail, ArrowUp, ShieldCheck } from 'lucide-react';
import { BHAWAL_CATALOG_URL } from '../../constants/catalog';
import './Footer.css';

export default function Footer({ onNavigate }) {
  const { contact } = brandDetails;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = (e, page, sectionId = null) => {
    if (onNavigate) {
      e.preventDefault();
      if (typeof page === 'string' && page.startsWith('/')) {
        onNavigate(page);
      } else {
        onNavigate(page, sectionId);
      }
    }
  };

  return (
    <footer id="contact" className="site-footer" aria-label={`${brandDetails.name} Corporate Footer`}>
      {/* Top Ambient Brand Accent Bar */}
      <div className="footer-top-glow" aria-hidden="true" />

      <div className="footer-container">
        {/* Main 4-Column Grid */}
        <div className="footer-main-grid">
          {/* Column 1: Brand */}
          <div className="footer-brand-col">
            <a
              href="#home"
              className="footer-logo-link"
              onClick={(e) => handleLinkClick(e, 'home')}
              aria-label={`${brandDetails.name} Home`}
            >
              <div className="footer-logo-wrap">
                <img
                  src={brandDetails.logoUrl}
                  alt={brandDetails.name}
                  className="footer-logo-img"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </a>

            <p className="footer-brand-desc">
              Premier manufacturer, stockist, and global exporter of Ferrous &amp; Non-Ferrous Metals — Stainless Steel, Carbon Steel, Duplex, Super Duplex, Inconel, Monel, Hastelloy, Sheets, Pipes &amp; Pipe Fittings.
            </p>

            <div className="footer-cert-tags">
              <div className="cert-tag">
                <ShieldCheck size={14} className="cert-icon" />
                <span>ISO 9001:2015 CERTIFIED COMPANY</span>
              </div>

            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col">
            <h4 className="footer-col-title">
              Quick Links
              <span className="title-accent-dot" />
            </h4>
            <ul className="footer-links-list">
              <li><a href="/" className="footer-link" onClick={(e) => handleLinkClick(e, 'home')}>Home</a></li>
              <li><a href="/about" className="footer-link" onClick={(e) => handleLinkClick(e, 'about')}>About Us</a></li>
              <li><a href="/products" className="footer-link" onClick={(e) => handleLinkClick(e, '/products')}>Products</a></li>
              <li><a href="/materials" className="footer-link" onClick={(e) => handleLinkClick(e, '/materials')}>Materials</a></li>
              <li><a href="/request-for-quote" className="footer-link" onClick={(e) => handleLinkClick(e, '/request-for-quote')}>Request for Quote</a></li>
              <li>
                <a
                  href={BHAWAL_CATALOG_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link footer-catalog-link"
                  title="Explore Bhawal Steel & Engineering Official Product Catalog (PDF)"
                >
                  <span>Explore Catalog</span>
                  <span className="footer-catalog-badge">PDF</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="footer-col">
            <h4 className="footer-col-title">
              Company
              <span className="title-accent-dot" />
            </h4>
            <ul className="footer-links-list">
              <li><a href="#certificate" className="footer-link">Certifications</a></li>
              <li><a href="#industries" className="footer-link">Industries</a></li>
              <li><a href="#certificate" className="footer-link">Client Network</a></li>
              <li><a href="/contact" className="footer-link" onClick={(e) => handleLinkClick(e, 'contact')}>Contact</a></li>
            </ul>
          </div>

          {/* Column 4: Products */}
          <div className="footer-col">
            <h4 className="footer-col-title">
              Products
              <span className="title-accent-dot" />
            </h4>
            <ul className="footer-links-list">
              <li><a href="/products" className="footer-link" onClick={(e) => handleLinkClick(e, '/products')}>All Products Catalog</a></li>
              <li>
                <a
                  href={BHAWAL_CATALOG_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link footer-catalog-link"
                  title="Explore Bhawal Steel Engineering Client Catalog (PDF)"
                >
                  <span>Client Product Catalog</span>
                  <span className="footer-catalog-badge">PDF</span>
                </a>
              </li>
              <li><a href="/products/manufacturer" className="footer-link" onClick={(e) => handleLinkClick(e, '/products/manufacturer')}>Manufacturer Division</a></li>
              <li><a href="/products/supplier" className="footer-link" onClick={(e) => handleLinkClick(e, '/products/supplier')}>Supplier Division</a></li>
              <li><a href="/products/manufacturer/butt-weld-fittings" className="footer-link" onClick={(e) => handleLinkClick(e, '/products/manufacturer/butt-weld-fittings')}>Butt Weld Fittings</a></li>
              <li><a href="/products/supplier/pipes-tubes" className="footer-link" onClick={(e) => handleLinkClick(e, '/products/supplier/pipes-tubes')}>Pipes & Tubes</a></li>
              <li><a href="/products/manufacturer/flanges" className="footer-link" onClick={(e) => handleLinkClick(e, '/products/manufacturer/flanges')}>Flanges</a></li>
            </ul>
          </div>
        </div>

        {/* Contact Us Row — compact, below grid */}
        <div className="footer-contact-row">
          <h4 className="footer-contact-row-title">
            Contact Us
            <span className="title-accent-dot" />
          </h4>

          <div className="footer-contact-items">
            {/* Phone Numbers */}
            <div className="contact-line">
              <Phone size={15} className="contact-icon" />
              <div>
                <span className="contact-lbl">Direct &amp; Export Desk</span>
                <div className="contact-phones-wrap">
                  <a href={`tel:${contact.phone1Raw}`} className="contact-val">{contact.phone1}</a>
                  <span className="contact-sep">/</span>
                  <a href={`tel:${contact.phone2Raw}`} className="contact-val">{contact.phone2}</a>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="contact-line">
              <Mail size={15} className="contact-icon" />
              <div>
                <span className="contact-lbl">Commercial Enquiries</span>
                <div className="contact-phones-wrap">
                  <a href={`mailto:${contact.email}`} className="contact-val">{contact.email}</a>
                  {contact.secondaryEmail && (
                    <>
                      <span className="contact-sep">/</span>
                      <a href={`mailto:${contact.secondaryEmail}`} className="contact-val">{contact.secondaryEmail}</a>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="contact-line">
              <MapPin size={15} className="contact-icon" />
              <div>
                <span className="contact-lbl">Registered Office</span>
                <address className="contact-val contact-address">
                  139 Sant Sena Maharaja Marg,<br />
                  Near Round Temple,<br />
                  Mumbai - 400 004,<br />
                  Maharashtra, India
                </address>
              </div>
            </div>

            {/* Warehouse / Godown */}
            <div className="contact-line">
              <div>
                <span className="contact-lbl">Warehouse / Godown</span>
                <span className="contact-val">Kalamboli,Taloja Navi mumbai, Maharashtra</span>
              </div>
            </div>

            {/* CTA */}
            <div className="footer-cta-wrap">
              <Button
                href="/request-for-quote"
                variant="primary"
                size="sm"
                icon="arrow"
                onClick={(e) => handleLinkClick(e, '/request-for-quote')}
              >
                Get a Quote
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="footer-bottom-bar">
          <div className="footer-copy">
            <span>&copy; {new Date().getFullYear()} Bhawal Steel &amp; Engineering Company. All rights reserved.</span>
            <span className="copy-divider">|</span>
            <span className="copy-tag">Steel Products &amp; Engineering Solutions • Export • Supply</span>
          </div>

          <div className="footer-legal-links">
            <a href="#home" className="legal-link">Privacy Policy</a>
            <span className="legal-dot">&bull;</span>
            <a href="#home" className="legal-link">Terms & Conditions</a>
            <span className="legal-dot">&bull;</span>
            <a href="#home" className="legal-link">Quality Policy</a>
          </div>

          <button
            type="button"
            className="back-to-top-btn"
            onClick={scrollToTop}
            aria-label="Back to top of page"
          >
            <span className="back-top-text">Back to Top</span>
            <ArrowUp size={16} className="back-top-arrow" />
          </button>
        </div>
      </div>
    </footer>
  );
}
