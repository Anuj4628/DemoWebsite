import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, Mail, ArrowUpRight, MessageSquare, Clock, Headphones } from 'lucide-react';
import { brandDetails } from '../../data/navigationData';

gsap.registerPlugin(ScrollTrigger);

export default function ContactDirectCTA() {
  const sectionRef = useRef(null);
  const { contact } = brandDetails;

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.cta-card-item',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
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
      id="direct-cta-section"
      ref={sectionRef}
      className="contact-direct-cta-section"
      aria-label="Direct Technical Support & Commercial Inquiries"
    >
      <div className="section-container">
        <div className="direct-cta-dual-grid">
          
          {/* ========================================================= */}
          {/* SECTION 5: TALK DIRECTLY TO OUR TECHNICAL TEAM / CALL DESK */}
          {/* ========================================================= */}
          <div className="cta-card-item call-cta-card">
            <div className="cta-card-glow" aria-hidden="true" />
            <div className="cta-card-top">
              <div className="cta-icon-badge call-badge">
                <Headphones size={22} className="cta-header-icon" aria-hidden="true" />
              </div>
              <span className="cta-desk-tag">IMMEDIATE METALLURGICAL CONSULTATION</span>
            </div>

            <h3 className="cta-card-heading">
              TALK DIRECTLY TO OUR <span className="cta-highlight-red">TECHNICAL TEAM</span>
            </h3>

            <p className="cta-card-description">
              Have an urgent technical specification, dimensional query, or urgent mill requirement? Speak directly with our metallurgical sales analyst for immediate technical assistance.
            </p>

            {/* Prominent Clickable Phone Number */}
            <div className="prominent-contact-display">
              <span className="prominent-label">Export & Technical Desk Line:</span>
              <a
                href={`tel:${contact.phone1Raw}`}
                className="prominent-number-link"
                title="Call Technical Analyst"
              >
                <Phone size={24} className="prominent-phone-icon" aria-hidden="true" />
                <span className="prominent-number-text">{contact.phone1}</span>
              </a>
            </div>

            {/* Action Buttons */}
            <div className="cta-card-actions">
              <a
                href={`tel:${contact.phone1Raw}`}
                className="btn-cta-action btn-call-primary"
                title="Call Redcore Steels Now"
              >
                <span className="btn-cta-fill" aria-hidden="true" />
                <span className="btn-cta-text-wrap">
                  <span>CALL NOW</span>
                  <ArrowUpRight size={16} aria-hidden="true" />
                </span>
              </a>

              <a
                href={contact.whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cta-action btn-wa-secondary"
                title="Open WhatsApp Consultation"
              >
                <MessageSquare size={16} aria-hidden="true" />
                <span>WHATSAPP DESK</span>
              </a>
            </div>

            <div className="cta-card-footer-info">
              <Clock size={13} aria-hidden="true" />
              <span>Available Mon–Sat 9:30 AM – 6:30 PM IST (Available for urgent global inquiries)</span>
            </div>
          </div>

          {/* ========================================================= */}
          {/* SECTION 6: DIRECT COMMERCIAL & RFQ EMAIL CONTACT */}
          {/* ========================================================= */}
          <div className="cta-card-item email-cta-card">
            <div className="cta-card-glow email-glow" aria-hidden="true" />
            <div className="cta-card-top">
              <div className="cta-icon-badge email-badge">
                <Mail size={22} className="cta-header-icon" aria-hidden="true" />
              </div>
              <span className="cta-desk-tag">FORMAL RFQ & TENDER TRANSMISSION</span>
            </div>

            <h3 className="cta-card-heading">
              TRANSMIT SPECIFICATIONS VIA <span className="cta-highlight-red">EMAIL</span>
            </h3>

            <p className="cta-card-description">
              Transmit purchase orders, project bill of materials (BOM), CAD drawings, and specialized alloy datasheets directly to our centralized commercial estimation inbox.
            </p>

            {/* Prominent Clickable Email */}
            <div className="prominent-contact-display">
              <span className="prominent-label">Official Commercial Enquiries Inbox:</span>
              <a
                href={`mailto:${contact.email}`}
                className="prominent-email-link"
                title="Send Email to Official Inbox"
              >
                <Mail size={22} className="prominent-email-icon" aria-hidden="true" />
                <span className="prominent-email-text">{contact.email}</span>
              </a>
            </div>

            {/* Action Buttons */}
            <div className="cta-card-actions">
              <a
                href={`mailto:${contact.email}`}
                className="btn-cta-action btn-email-primary"
                title="Launch Email Client"
              >
                <span className="btn-cta-fill" aria-hidden="true" />
                <span className="btn-cta-text-wrap">
                  <span>SEND EMAIL</span>
                  <ArrowUpRight size={16} aria-hidden="true" />
                </span>
              </a>

              <a
                href={`mailto:${contact.email}?subject=Urgent%20Tender%20Inquiry%20%E2%80%94%20Redcore%20Steels`}
                className="btn-cta-action btn-tender-secondary"
                title="Send Tender Specification"
              >
                <span>TENDER ENQUIRY</span>
              </a>
            </div>

            <div className="cta-card-footer-info">
              <Clock size={13} aria-hidden="true" />
              <span>Official commercial inquiries acknowledged within 4 business hours</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
