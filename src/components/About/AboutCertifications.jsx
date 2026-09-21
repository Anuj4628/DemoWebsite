import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { aboutCertificationsData } from '../../data/aboutData';
import { Award, CheckCircle, Layers } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function AboutCertifications() {
  const containerRef = useRef(null);
  const scanBeamRef = useRef(null);
  const materialsStackRef = useRef(null);
  const badgesRowRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Laser scan beam sweep across certificates
      if (scanBeamRef.current) {
        gsap.fromTo(
          scanBeamRef.current,
          { top: '0%', opacity: 0 },
          {
            top: '100%',
            opacity: 1,
            duration: 2.2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
          }
        );
      }

      // Staggered reveal for certificate badges
      const badges = badgesRowRef.current?.querySelectorAll('.cert-badge-box');
      if (badges) {
        gsap.fromTo(
          badges,
          { y: 30, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            stagger: 0.12,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: badgesRowRef.current,
              start: 'top 82%'
            }
          }
        );
      }

      // Material capability rows horizontal reveal with metallic sweep
      const matRows = materialsStackRef.current?.querySelectorAll('.material-grade-item');
      if (matRows) {
        gsap.fromTo(
          matRows,
          { x: -40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            stagger: 0.15,
            duration: 0.85,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: materialsStackRef.current,
              start: 'top 80%'
            }
          }
        );
      }
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="about-certifications-phase">
      <div className="about-certifications-container">
        {/* Header */}
        <div className="cert-header">
          <div className="cert-eyebrow">
            <span className="eyebrow-accent-bar" />
            <span className="eyebrow-text">{aboutCertificationsData.eyebrow}</span>
          </div>
          <h3 className="cert-heading">
            {aboutCertificationsData.heading}
          </h3>
          <p className="cert-subhead">
            {aboutCertificationsData.subheading}
          </p>
          
          <div className="cert-status-ribbon">
            <span className="status-item">CERTIFIED</span>
            <span className="status-arrow">&bull;</span>
            <span className="status-item">CAPABLE</span>
            <span className="status-arrow">&bull;</span>
            <span className="status-item">PRECISE</span>
            <span className="status-arrow">&bull;</span>
            <span className="status-item highlight-red">READY</span>
          </div>
        </div>

        {/* Dual Layout: Certifications Laboratory (Left) & Material Capability Spectrum (Right) */}
        <div className="cert-laboratory-grid">
          {/* Left: Certifications Laboratory Box with Laser Scan Beam */}
          <div className="cert-scanning-col">
            <div className="cert-scan-panel">
              <div ref={scanBeamRef} className="scan-laser-beam" aria-hidden="true" />

              <div className="scan-panel-header">
                <div className="scan-chip">
                  <span className="chip-dot" />
                  <span>METALLURGY LAB QA // SCAN ACTIVE</span>
                </div>
                <span className="scan-ref-id">DOC: ISO-9001-2015-CERT</span>
              </div>

              <div ref={badgesRowRef} className="cert-badges-list">
                {aboutCertificationsData.certifications.map((cert) => (
                  <div key={cert.title} className="cert-badge-box">
                    <div className="cert-badge-icon-wrap">
                      <Award size={22} className="cert-icon" />
                    </div>
                    <div className="cert-badge-info">
                      <h4 className="cert-badge-title">{cert.title}</h4>
                      <p className="cert-badge-desc">{cert.desc}</p>
                    </div>
                    <CheckCircle size={18} className="cert-check-icon" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Material Grades Spectrum */}
          <div className="cert-materials-col">
            <div className="materials-spectrum-panel">
              <div className="spectrum-header">
                <div className="spectrum-title-wrap">
                  <Layers size={18} className="spectrum-icon" />
                  <span className="spectrum-title">METALLURGICAL SPECTRUM STOCK</span>
                </div>
                <span className="spectrum-badge">READY STOCK INVENTORIES</span>
              </div>

              <div ref={materialsStackRef} className="materials-grade-stack">
                {aboutCertificationsData.materialGrades.map((mat, idx) => (
                  <div key={mat.category} className="material-grade-item">
                    <div className="grade-item-header">
                      <span className="grade-idx">0{idx + 1}</span>
                      <h4 className="grade-category">{mat.category}</h4>
                    </div>
                    <p className="grade-codes">{mat.grades}</p>
                    <div className="grade-metallic-sweep" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
