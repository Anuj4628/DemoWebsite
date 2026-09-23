import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { aboutCertificationsData } from '../../data/aboutData';
import { ShieldCheck, Award, CheckCircle2, Layers, FileCheck, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function AboutCertifications() {
  const containerRef = useRef(null);
  const certColRef = useRef(null);
  const matColRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Subtle reveal for left certification cards
      const certRows = certColRef.current?.querySelectorAll('.cert-tech-card');
      if (certRows) {
        gsap.fromTo(
          certRows,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: certColRef.current,
              start: 'top 85%'
            }
          }
        );
      }

      // Subtle reveal for right material cards
      const matItems = matColRef.current?.querySelectorAll('.material-spec-card');
      if (matItems) {
        gsap.fromTo(
          matItems,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: matColRef.current,
              start: 'top 85%'
            }
          }
        );
      }
    }, el);

    return () => ctx.revert();
  }, []);

  // Enhanced metadata for certification items
  const enhancedCertifications = [
    {
      title: "ISO 9001:2015",
      desc: "Certified Quality Management System covering procurement, testing, and global distribution.",
      status: "ACTIVE & AUDITED",
      icon: ShieldCheck,
      specRef: "CERT: QMS-IND-2024"
    },
    {
      title: "Govt. Recognized Export House",
      desc: "Accredited international status ensuring expedited customs and priority global shipping lanes.",
      status: "DGFT ACCREDITED",
      icon: Award,
      specRef: "STATUS: THREE-STAR EXPORT"
    },
    {
      title: "MSME Registered Enterprise",
      desc: "Recognized industrial enterprise with verified manufacturing and supply infrastructure.",
      status: "VERIFIED VENDOR",
      icon: CheckCircle2,
      specRef: "REG: UDYAM-MH-19-002"
    }
  ];

  // Enhanced metadata for material specifications with accurate standards
  const enhancedMaterials = [
    {
      num: "01",
      category: "STAINLESS STEEL",
      grades: "304 / 304L / 316 / 316L / 316Ti / 321 / 310S / 347 / 410 / 446",
      standard: "ASTM A312 / ASME SA312",
      badge: "HIGH CORROSION"
    },
    {
      num: "02",
      category: "DUPLEX & SUPER DUPLEX",
      grades: "UNS S31803 / S32205 / S32750 / S32760 (F51 / F53 / F55)",
      standard: "ASTM A790 / A928",
      badge: "SOUR SERVICE"
    },
    {
      num: "03",
      category: "NICKEL & EXOTIC ALLOYS",
      grades: "Inconel 600/625 / Incoloy 800/825 / Monel 400/K500 / Hastelloy C276",
      standard: "ASTM B444 / B163",
      badge: "EXTREME TEMP"
    },
    {
      num: "04",
      category: "TITANIUM & SPECIAL ALLOYS",
      grades: "Grade 1 / Grade 2 / Grade 5 (Ti-6Al-4V) / Grade 7 / Cu-Ni 90/10 & 70/30",
      standard: "ASTM B861 / B111",
      badge: "AEROSPACE & MARINE"
    }
  ];

  return (
    <div ref={containerRef} className="about-certifications-phase">
      <div className="about-certifications-container">
        {/* Section Header */}
        <div className="cert-header">
          <div className="cert-eyebrow">
            <span className="eyebrow-accent-bar" />
            <span className="eyebrow-text">STANDARDS & MATERIAL CAPABILITY</span>
          </div>
          <h3 className="cert-heading">
            Certified Quality & <span className="highlight-teal">Metallurgical Spectrum</span>
          </h3>
          <p className="cert-subhead">
            Rigorous international accreditations paired with an extensive ready-stock inventory across mission-critical alloys.
          </p>
          
          <div className="cert-status-ribbon">
            <span className="status-item"><Check size={12} className="ribbon-check" /> CERTIFIED ISO 9001</span>
            <span className="status-bullet">•</span>
            <span className="status-item"><Check size={12} className="ribbon-check" /> GOVT. EXPORT HOUSE</span>
            <span className="status-bullet">•</span>
            <span className="status-item"><Check size={12} className="ribbon-check" /> 100% PMI AUDITED</span>
            <span className="status-bullet">•</span>
            <span className="status-item"><Check size={12} className="ribbon-check" /> EN 10204 3.1 & 3.2</span>
          </div>
        </div>

        {/* Dual Layout: Certifications (Left) & Material Capability (Right) */}
        <div className="cert-laboratory-grid">
          {/* Left Panel: Quality Credentials & Certifications */}
          <div ref={certColRef} className="cert-col-wrapper">
            <div className="tech-panel cert-panel">
              <div className="tech-panel-header">
                <div className="panel-header-left">
                  <div className="panel-icon-indicator">
                    <FileCheck size={18} className="panel-icon" />
                  </div>
                  <div>
                    <h4 className="panel-title">QUALITY CREDENTIALS</h4>
                    <span className="panel-sub">ACCREDITATIONS & AUDIT RECORDS</span>
                  </div>
                </div>
                <div className="panel-badge cert-system-badge">
                  <span className="badge-pulse" />
                  <span>ISO ACCREDITED</span>
                </div>
              </div>

              <div className="cert-tech-list">
                {enhancedCertifications.map((cert, idx) => {
                  const IconComponent = cert.icon;
                  return (
                    <div key={idx} className="cert-tech-card">
                      <div className="cert-tech-icon-box">
                        <IconComponent size={22} className="cert-tech-icon" />
                      </div>
                      <div className="cert-tech-content">
                        <div className="cert-tech-top-line">
                          <h5 className="cert-tech-name">{cert.title}</h5>
                          <span className="cert-tech-status">{cert.status}</span>
                        </div>
                        <p className="cert-tech-desc">{cert.desc}</p>
                        <div className="cert-tech-meta">
                          <span className="cert-spec-ref">{cert.specRef}</span>
                          <span className="cert-verified-label">✓ Certified & Documented</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Integrated Quality Assurance Footer */}
              <div className="panel-tech-footer">
                <div className="tech-footer-icon">
                  <ShieldCheck size={16} />
                </div>
                <div className="tech-footer-content">
                  <span className="tech-footer-heading">MTC EN 10204 3.1 & 3.2 Traceability</span>
                  <span className="tech-footer-text">Original heat-to-melt test certificates and third-party inspection dossiers accompany every export dispatch.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel: Metallurgical Capability Spectrum */}
          <div ref={matColRef} className="cert-col-wrapper">
            <div className="tech-panel materials-panel">
              <div className="tech-panel-header">
                <div className="panel-header-left">
                  <div className="panel-icon-indicator">
                    <Layers size={18} className="panel-icon" />
                  </div>
                  <div>
                    <h4 className="panel-title">MATERIAL CAPABILITY</h4>
                    <span className="panel-sub">METALLURGICAL SPECTRUM & GRADES</span>
                  </div>
                </div>
                <div className="panel-badge mat-stock-badge">
                  <span>READY STOCK</span>
                </div>
              </div>

              <div className="material-tech-list">
                {enhancedMaterials.map((mat) => (
                  <div key={mat.num} className="material-spec-card">
                    <div className="spec-card-top">
                      <div className="spec-card-title-group">
                        <span className="spec-card-num">{mat.num}</span>
                        <h5 className="spec-card-category">{mat.category}</h5>
                      </div>
                      <span className="spec-card-tag">{mat.badge}</span>
                    </div>

                    <div className="spec-card-grades-box">
                      <span className="spec-grades-label">ALLOY GRADES:</span>
                      <p className="spec-card-grades">{mat.grades}</p>
                    </div>

                    <div className="spec-card-footer">
                      <span className="spec-standard-code">SPEC: {mat.standard}</span>
                      <span className="spec-stock-status">✓ Ready Stock Available</span>
                    </div>
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
