import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from '../UI/Button';
import slide1Img from '../../assets/images/slide-1.jpg';
import { Mail, Clock, ShieldCheck } from 'lucide-react';
import './FinalCTASection.css';

gsap.registerPlugin(ScrollTrigger);

export default function FinalCTASection({ onNavigate }) {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current || !cardRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 35, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="quote" ref={sectionRef} className="final-cta-section" aria-label="Discuss Steel Requirements">
      <div className="section-container">
        <div ref={cardRef} className="cta-banner-card">
          {/* Background Industrial Photographic Layer */}
          <div className="cta-bg-layer">
            <img
              src={slide1Img}
              alt="Industrial steel manufacturing infrastructure"
              className="cta-bg-image"
              loading="lazy"
            />
            <div className="cta-dark-overlay" aria-hidden="true" />
            <div className="cta-red-gradient" aria-hidden="true" />
          </div>

          {/* Top Accent Line */}
          <div className="cta-top-accent" aria-hidden="true" />

          {/* Content Wrapper */}
          <div className="cta-content-wrapper">
            <div className="cta-eyebrow">
              <span className="cta-accent-dot" />
              <span className="cta-eyebrow-text">ESTIMATE & TECHNICAL CONSULTATION</span>
            </div>

            <h2 className="cta-main-heading">
              READY TO DISCUSS YOUR <span className="cta-heading-highlight">STEEL REQUIREMENT?</span>
            </h2>

            <p className="cta-subheading">
              Talk to our metallurgical engineering desk for immediate product availability, code compliance, and worldwide project dispatch.
            </p>

            {/* CTA Buttons Group (with bottom-to-top Redcore Red fill) */}
            <div className="cta-buttons-group">
              <Button
                href="/contact"
                variant="primary"
                size="lg"
                icon="arrow"
                onClick={(e) => {
                  if (onNavigate) {
                    e.preventDefault();
                    onNavigate('contact');
                  }
                }}
              >
                Get a Quote
              </Button>

              <Button
                href="/products"
                variant="secondary"
                size="lg"
                icon="chevron"
                onClick={(e) => {
                  if (onNavigate) {
                    e.preventDefault();
                    onNavigate('/products');
                  }
                }}
              >
                Explore Products
              </Button>
            </div>

            {/* Quick Contact & Assurance Micro-Strip */}
            <div className="cta-assurance-strip">
              <div className="assurance-item">
                <Clock size={16} className="assurance-icon" />
                <span>Response within 4 Business Hours</span>
              </div>
              <div className="assurance-item">
                <ShieldCheck size={16} className="assurance-icon" />
                <span>100% Certified Heat Lots & MTRs</span>
              </div>
              <div className="assurance-item">
                <Mail size={16} className="assurance-icon" />
                <span>sales@redcoresteels.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
