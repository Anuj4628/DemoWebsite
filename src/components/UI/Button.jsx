import React from 'react';
import { ArrowUpRight, ChevronRight } from 'lucide-react';
import './Button.css';

export default function Button({
  children,
  href,
  variant = 'primary',
  size = 'md',
  icon = 'arrow',
  className = '',
  onClick,
  ...props
}) {
  const Component = href ? 'a' : 'button';
  
  return (
    <Component
      href={href}
      className={`btn btn-${variant} btn-${size} ${className}`}
      onClick={onClick}
      {...props}
    >
      <span className="btn-content">
        <span className="btn-text">{children}</span>
        {icon === 'arrow' && (
          <span className="btn-icon-wrap" aria-hidden="true">
            <ArrowUpRight className="btn-icon" size={15} />
          </span>
        )}
        {icon === 'chevron' && (
          <span className="btn-icon-wrap" aria-hidden="true">
            <ChevronRight className="btn-icon" size={15} />
          </span>
        )}
      </span>
    </Component>
  );
}

