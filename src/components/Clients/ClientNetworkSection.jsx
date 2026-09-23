import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { clientsData } from '../../data/homeSectionsData';
import './ClientNetworkSection.css';

gsap.registerPlugin(ScrollTrigger);

// Organize the 11 verified partner logos into two curated sets
const row1Source = [
  clientsData[0], // Tata Steel
  clientsData[1], // Reliance Industries
  clientsData[3], // Indian Oil
  clientsData[4], // JSW Steel
  clientsData[6], // Aditya Birla Group
  clientsData[9]  // Godrej
];

const row2Source = [
  clientsData[2], // Adani Group
  clientsData[5], // Jindal Steel & Power
  clientsData[7], // Hindustan Petroleum
  clientsData[8], // Bhushan Power & Steel
  clientsData[10], // Haldia Petrochemicals
  clientsData[0]  // Tata Steel
];

// Repeat each source 3 times per half for a 4500px+ seamless marquee track
const row1Items = [...row1Source, ...row1Source, ...row1Source];
const row2Items = [...row2Source, ...row2Source, ...row2Source];

export default function ClientNetworkSection({ onNavigate }) {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current.children,
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="clients"
      ref={sectionRef}
      className="client-network-showcase"
      aria-label="Client Partners"
    >
      {/* Anchor shim for existing links targeting certificate */}
      <span id="certificate" className="section-anchor-shim" aria-hidden="true" />

      {/* Dark Industrial Ambience & Technical Grid */}
      <div className="network-bg-scrim" aria-hidden="true" />
      <div className="network-technical-grid" aria-hidden="true" />

      <div className="section-container">
        {/* 1. Centered Section Header */}
        <div ref={headerRef} className="client-section-header">
          <div className="section-eyebrow">
            <span className="eyebrow-accent-bar" aria-hidden="true" />
            <span className="eyebrow-text">APPROVED INDUSTRIAL NETWORK</span>
            <span className="eyebrow-accent-bar" aria-hidden="true" />
          </div>

          <h2 className="client-display-heading">
            CLIENT <span className="heading-accent-gold">PARTNERS</span>
          </h2>

          <p className="client-lead-desc">
            Trusted supply partner and verified vendor to premier energy, infrastructure, and heavy engineering corporations worldwide.
          </p>
        </div>
      </div>

      {/* 2. Two-Row Continuous Infinite Marquee Sliders */}
      <div className="client-sliders-wrapper" aria-label="Partner Logos Continuous Showcase">
        {/* Row 1: Right -> Left Continuous Marquee */}
        <div className="client-marquee-container">
          <div className="client-marquee-track client-marquee-track-1">
            {row1Items.map((client, idx) => (
              <div key={`r1-a-${idx}`} className="client-logo-card">
                <img
                  src={client.logo}
                  alt={client.name}
                  className="client-logo-img"
                  loading="lazy"
                />
              </div>
            ))}
            {row1Items.map((client, idx) => (
              <div key={`r1-b-${idx}`} className="client-logo-card" aria-hidden="true">
                <img
                  src={client.logo}
                  alt=""
                  className="client-logo-img"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Right -> Left Continuous Marquee (Decoupled Speed) */}
        <div className="client-marquee-container">
          <div className="client-marquee-track client-marquee-track-2">
            {row2Items.map((client, idx) => (
              <div key={`r2-a-${idx}`} className="client-logo-card">
                <img
                  src={client.logo}
                  alt={client.name}
                  className="client-logo-img"
                  loading="lazy"
                />
              </div>
            ))}
            {row2Items.map((client, idx) => (
              <div key={`r2-b-${idx}`} className="client-logo-card" aria-hidden="true">
                <img
                  src={client.logo}
                  alt=""
                  className="client-logo-img"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
