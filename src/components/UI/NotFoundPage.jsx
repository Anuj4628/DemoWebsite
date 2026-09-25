import React from 'react';
import { Home, Package, Layers, PhoneCall } from 'lucide-react';
import './NotFoundPage.css';

export default function NotFoundPage({ onNavigate }) {
  const handleClick = (e, path) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(path);
    }
  };

  return (
    <section className="not-found-section" aria-label="Page Not Found">
      <div className="not-found-container">
        <div className="not-found-badge">
          <span className="not-found-dot" aria-hidden="true" />
          <span>HTTP STATUS 404 // SPECIFICATION NOT LOCATED</span>
        </div>

        <h1 className="not-found-title">Page Not Found</h1>

        <p className="not-found-desc">
          The requested page or metallurgical product specification could not be located at this address.
          It may have been moved, renamed, or restructured in our industrial catalogue.
        </p>

        <div className="not-found-actions">
          <a
            href="/"
            className="btn-nf-primary"
            onClick={(e) => handleClick(e, '/')}
          >
            <Home size={16} aria-hidden="true" />
            <span>Return to Homepage</span>
          </a>

          <a
            href="/products"
            className="btn-nf-secondary"
            onClick={(e) => handleClick(e, '/products')}
          >
            <Package size={16} aria-hidden="true" />
            <span>Browse Products</span>
          </a>

          <a
            href="/materials"
            className="btn-nf-secondary"
            onClick={(e) => handleClick(e, '/materials')}
          >
            <Layers size={16} aria-hidden="true" />
            <span>Explore Materials</span>
          </a>

          <a
            href="/contact"
            className="btn-nf-secondary"
            onClick={(e) => handleClick(e, '/contact')}
          >
            <PhoneCall size={16} aria-hidden="true" />
            <span>Contact Desk</span>
          </a>
        </div>
      </div>
    </section>
  );
}
