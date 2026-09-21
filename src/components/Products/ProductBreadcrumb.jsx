import React from 'react';
import './ProductBreadcrumb.css';

/**
 * Industrial Breadcrumb Navigation (Bright Theme)
 */
export default function ProductBreadcrumb({ items = [], onNavigate }) {
  if (!items || items.length === 0) return null;

  const handleClick = (e, item) => {
    e.preventDefault();
    if (onNavigate && item.url) {
      onNavigate(item.url);
    }
  };

  return (
    <nav className="bright-breadcrumb" aria-label="Breadcrumb">
      <ol className="breadcrumb-list">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li
              key={item.label + index}
              className={`breadcrumb-item ${isLast ? 'active' : ''}`}
              aria-current={isLast ? 'page' : undefined}
            >
              {index > 0 && (
                <span className="breadcrumb-sep" aria-hidden="true">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </span>
              )}
              {isLast || !item.url ? (
                <span className="breadcrumb-current">{item.label}</span>
              ) : (
                <a
                  href={item.url}
                  className="breadcrumb-link"
                  onClick={(e) => handleClick(e, item)}
                >
                  {index === 0 && (
                    <svg className="home-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                      <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                  )}
                  <span>{item.label}</span>
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
