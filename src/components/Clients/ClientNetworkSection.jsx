import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { clientsData } from '../../data/homeSectionsData';
import './ClientNetworkSection.css';

gsap.registerPlugin(ScrollTrigger);

export default function ClientNetworkSection() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current) return;

    const ctx = gsap.context(() => {
      // Header GSAP entrance reveal
      gsap.fromTo(
        headerRef.current.children,
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.14,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 82%',
            toggleActions: 'play none none none'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Split into 2 rows for opposing continuous infinite marquees
  const row1Clients = clientsData.slice(0, 6);
  const row2Clients = clientsData.slice(6);

  // Replicate 4x for seamless jump-free infinite continuous scroll
  const marqueeRow1 = [...row1Clients, ...row1Clients, ...row1Clients, ...row1Clients];
  const marqueeRow2 = [...row2Clients, ...row2Clients, ...row2Clients, ...row2Clients];

  return (
    <section id="certificate" ref={sectionRef} className="client-network-section" aria-label="Client Network">
      {/* Dark Technical Grid Overlay */}
      <div className="client-network-bg-grid" aria-hidden="true" />
      <div className="client-network-ambient-glow" aria-hidden="true" />

      <div className="section-container">
        {/* Strong Section Heading */}
        <div ref={headerRef} className="client-network-header">
          <div className="section-eyebrow">
            <span className="eyebrow-accent-bar" />
            <span className="eyebrow-text">GLOBAL INDUSTRIAL ECOSYSTEM</span>
          </div>

          <h2 className="section-display-heading">
            CLIENT <span className="text-highlight-red">NETWORK</span>
          </h2>
        </div>
      </div>

      {/* Dual Continuous Infinite Logo Marquees */}
      <div className="client-marquees-wrapper" aria-label="Approved corporate client and partner logos">
        {/* ROW 1: Right to Left */}
        <div className="client-marquee-row marquee-reverse">
          <div className="client-marquee-track">
            {marqueeRow1.map((client, idx) => (
              <div
                key={`r1-${client.name}-${idx}`}
                className="client-logo-card"
                tabIndex={0}
                role="group"
                aria-label={client.name}
              >
                <div className="client-logo-surface">
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="partner-logo-img"
                    loading="lazy"
                  />
                </div>
                <span className="partner-company-name">{client.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ROW 2: Left to Right */}
        <div className="client-marquee-row marquee-forward">
          <div className="client-marquee-track">
            {marqueeRow2.map((client, idx) => (
              <div
                key={`r2-${client.name}-${idx}`}
                className="client-logo-card"
                tabIndex={0}
                role="group"
                aria-label={client.name}
              >
                <div className="client-logo-surface">
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="partner-logo-img"
                    loading="lazy"
                  />
                </div>
                <span className="partner-company-name">{client.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
