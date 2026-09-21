import React from 'react';
import redcoreLogo from '../../assets/images/redcore-logo.png';
import Button from '../UI/Button';
import { MapPin, Phone, Mail, ArrowUp, ShieldCheck, Award } from 'lucide-react';
import './Footer.css';

export default function Footer({ onNavigate }) {
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
    <footer id="contact" className="site-footer" aria-label="Redcore Steels Corporate Footer">
      {/* Top Ambient Red Bar */}
      <div className="footer-top-glow" aria-hidden="true" />

      <div className="footer-container">
        {/* Main 5-Column Grid */}
        <div className="footer-main-grid">
          {/* Brand Col */}
          <div className="footer-brand-col">
            <a
              href="#home"
              className="footer-logo-link"
              onClick={(e) => handleLinkClick(e, 'home')}
              aria-label="Redcore Steels Home"
            >
              <img
                src={redcoreLogo}
                alt="Redcore Steels"
                className="footer-logo-img"
                width="180"
                height="48"
              />
              <span className="footer-brand-name">REDCORE STEELS</span>
            </a>

            <p className="footer-brand-desc">
              Global manufacturer, exporter and supplier of high-grade industrial steel plates, sheets, coils, precision pipes, fittings, flanges and round bars for mission-critical engineering projects.
            </p>

            <div className="footer-cert-tags">
              <div className="cert-tag">
                <ShieldCheck size={14} className="cert-icon" />
                <span>ISO 9001:2015 CERTIFIED</span>
              </div>
              <div className="cert-tag">
                <Award size={14} className="cert-icon" />
                <span>ASME BOILER CODE COMPLIANT</span>
              </div>
            </div>
          </div>

          {/* Column 1: Quick Links */}
          <div className="footer-col">
            <h4 className="footer-col-title">
              Quick Links
              <span className="title-accent-dot" />
            </h4>
            <ul className="footer-links-list">
              <li><a href="/" className="footer-link" onClick={(e) => handleLinkClick(e, 'home')}>Home</a></li>
              <li><a href="/about" className="footer-link" onClick={(e) => handleLinkClick(e, 'about')}>About Us</a></li>
              <li><a href="/products" className="footer-link" onClick={(e) => handleLinkClick(e, '/products')}>Products</a></li>
              <li><a href="/#materials" className="footer-link" onClick={(e) => handleLinkClick(e, 'home', 'materials')}>Materials</a></li>
            </ul>
          </div>

          {/* Column 2: Company */}
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

          {/* Column 3: Products */}
          <div className="footer-col">
            <h4 className="footer-col-title">
              Products
              <span className="title-accent-dot" />
            </h4>
            <ul className="footer-links-list">
              <li><a href="/products" className="footer-link" onClick={(e) => handleLinkClick(e, '/products')}>All Products Catalog</a></li>
              <li><a href="/products/manufacturer" className="footer-link" onClick={(e) => handleLinkClick(e, '/products/manufacturer')}>Manufacturer Division</a></li>
              <li><a href="/products/supplier" className="footer-link" onClick={(e) => handleLinkClick(e, '/products/supplier')}>Supplier Division</a></li>
              <li><a href="/products/manufacturer/butt-weld-fittings" className="footer-link" onClick={(e) => handleLinkClick(e, '/products/manufacturer/butt-weld-fittings')}>Butt Weld Fittings</a></li>
              <li><a href="/products/supplier/pipes-tubes" className="footer-link" onClick={(e) => handleLinkClick(e, '/products/supplier/pipes-tubes')}>Pipes & Tubes</a></li>
              <li><a href="/products/manufacturer/flanges" className="footer-link" onClick={(e) => handleLinkClick(e, '/products/manufacturer/flanges')}>Flanges</a></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="footer-col footer-contact-col">
            <h4 className="footer-col-title">
              Contact Us
              <span className="title-accent-dot" />
            </h4>
            <div className="footer-contact-details">
              {/* Phone Numbers */}
              <div className="contact-line">
                <Phone size={16} className="contact-icon" />
                <div>
                  <span className="contact-lbl">Export & Direct Desk</span>
                  <div className="contact-phones-wrap">
                    <a href="tel:+919000000000" className="contact-val">+91 90000 00000</a>
                    <span className="contact-sep">/</span>
                    <a href="tel:+912200000000" className="contact-val">+91 22 0000 0000</a>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="contact-line">
                <Mail size={16} className="contact-icon" />
                <div>
                  <span className="contact-lbl">Commercial Enquiries</span>
                  <a href="mailto:info@redcoresteels.com" className="contact-val">info@redcoresteels.com</a>
                </div>
              </div>

              {/* Address */}
              <div className="contact-line">
                <MapPin size={16} className="contact-icon" />
                <div>
                  <span className="contact-lbl">Registered Corporate Office</span>
                  <address className="contact-val contact-address">
                    Plot 42, Heavy Industrial Zone,<br />
                    Phase II, Andheri East,<br />
                    Mumbai - 400093,<br />
                    Maharashtra, India
                  </address>
                </div>
              </div>

              <div className="footer-cta-wrap">
                <Button
                  href="/contact"
                  variant="primary"
                  size="sm"
                  icon="arrow"
                  onClick={(e) => handleLinkClick(e, 'contact')}
                >
                  Get a Quote
                </Button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="footer-bottom-bar">
          <div className="footer-copy">
            <span>&copy; {new Date().getFullYear()} Redcore Steels. All rights reserved.</span>
            <span className="copy-divider">|</span>
            <span className="copy-tag">Global Steel Manufacturing • Export • Supply</span>
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
