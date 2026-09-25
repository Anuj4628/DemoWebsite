import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ExternalLink,
  Navigation,
  MessageSquare,
  ShieldCheck,
  Building2
} from 'lucide-react';
import { brandDetails } from '../../data/navigationData';

gsap.registerPlugin(ScrollTrigger);

export default function ContactInfoMap() {
  const sectionRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);

  const { contact } = brandDetails;

  const mapSearchUrl = contact.mapSearchUrl;
  const mapDirectionsUrl = contact.mapDirectionsUrl;
  const mapEmbedUrl = contact.mapEmbedUrl;

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (leftColRef.current && rightColRef.current) {
        gsap.fromTo(
          leftColRef.current,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none'
            }
          }
        );

        gsap.fromTo(
          rightColRef.current,
          { opacity: 0, x: 30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none'
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact-info-map-section"
      ref={sectionRef}
      className="contact-info-map-section"
      aria-label="Contact Information and Registered Office Map"
    >
      <div className="section-container">
        {/* Two-Column Grid: Map on Left, Contact Details on Right */}
        <div className="info-map-grid">
          
          {/* ========================================================= */}
          {/* LEFT SIDE: EXACT INTERACTIVE GOOGLE MAP & LOCATION */}
          {/* ========================================================= */}
          <div ref={leftColRef} className="contact-map-col">
            <div className="map-wrapper-card">
              <div className="map-card-header">
                <div className="map-header-title-wrap">
                  <span className="map-live-indicator" aria-hidden="true">
                    <span className="live-ping" />
                    <span className="live-dot" />
                  </span>
                  <div>
                    <h4 className="map-header-title">Exact Office Location</h4>
                    <span className="map-header-subtitle">Sant Sena Maharaja Marg, Near Round Temple, Mumbai 400004</span>
                  </div>
                </div>

                <span className="map-coord-badge">18.9568° N, 72.8258° E</span>
              </div>

              {/* Map Viewport Container */}
              <div className="map-viewport">
                <iframe
                  title={`${brandDetails.name} Corporate Office Location Map`}
                  src={mapEmbedUrl}
                  className="interactive-map-iframe"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Action Buttons: Open in Maps & Get Directions */}
              <div className="map-actions-bar">
                <a
                  href={mapSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-map-action btn-open-maps"
                  title="Open exact location in Google Maps"
                >
                  <ExternalLink size={16} className="map-btn-icon" aria-hidden="true" />
                  <span>OPEN IN MAPS</span>
                </a>

                <a
                  href={mapDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-map-action btn-get-directions"
                  title="Get turn-by-turn navigation directions"
                >
                  <Navigation size={16} className="map-btn-icon" aria-hidden="true" />
                  <span>GET DIRECTIONS</span>
                </a>
              </div>

              {/* Transit & Landmark Note */}
              <div className="map-footer-note">
                <span>Nearest Railway Stations: Charni Road (0.6 km) • Marine Lines (1.1 km) • Churchgate (2.2 km)</span>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* RIGHT SIDE: VERIFIED CORPORATE CONTACT INFORMATION */}
          {/* ========================================================= */}
          <div ref={rightColRef} className="contact-info-col">
            <div className="contact-info-card">
              <div className="card-top-tag">
                <Building2 size={15} className="card-tag-icon" aria-hidden="true" />
                <span>OFFICIAL HEADQUARTERS & EXPORT DESK</span>
              </div>

              <h3 className="contact-info-heading">
                Corporate Office <span className="text-highlight-teal">&amp;</span> Communications
              </h3>
              
              <p className="contact-info-subtext">
                Visit our registered commercial office or connect with our international export desks via direct phone, WhatsApp, or official email.
              </p>

              <div className="contact-details-stack">
                {/* 1. Address Block (Clickable to open exact location in Maps) */}
                <div className="info-item-block address-block">
                  <div className="item-icon-box">
                    <MapPin size={20} className="info-item-icon" aria-hidden="true" />
                  </div>
                  <div className="item-content">
                    <div className="item-label-row">
                      <span className="item-label">Registered Corporate Office</span>
                      <span className="item-badge">Verified Location</span>
                    </div>
                    <a
                      href={mapSearchUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="item-value-address clickable-address"
                      title="Click to view exact location in Google Maps"
                    >
                      <address className="address-text">
                        139 Sant Sena Maharaja Marg,<br />
                        Near Round Temple,<br />
                        MUMBAI - 400 004, MAHARASHTRA, INDIA
                      </address>
                      <span className="address-click-hint">
                        <span>Open location in Maps</span>
                        <ExternalLink size={13} aria-hidden="true" />
                      </span>
                    </a>
                  </div>
                </div>

                {/* 2. Direct Phone Lines */}
                <div className="info-item-block">
                  <div className="item-icon-box">
                    <Phone size={20} className="info-item-icon" aria-hidden="true" />
                  </div>
                  <div className="item-content">
                    <span className="item-label">Telephone & Direct Desk</span>
                    <div className="phones-link-group">
                      <div className="phone-line-wrap">
                        <span className="phone-tag">Export Desk:</span>
                        <a
                          href={`tel:${contact.phone1Raw}`}
                          className="item-link phone-link"
                          title="Call Export Desk"
                        >
                          {contact.phone1}
                        </a>
                      </div>
                      <div className="phone-line-wrap">
                        <span className="phone-tag">Direct Line:</span>
                        <a
                          href={`tel:${contact.phone2Raw}`}
                          className="item-link phone-link"
                          title="Call Direct Line"
                        >
                          {contact.phone2}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Official Email */}
                <div className="info-item-block">
                  <div className="item-icon-box">
                    <Mail size={20} className="info-item-icon" aria-hidden="true" />
                  </div>
                  <div className="item-content">
                    <span className="item-label">Commercial & RFQ Inquiries</span>
                    <div className="phones-link-group">
                      <a
                        href={`mailto:${contact.email}`}
                        className="item-link email-link"
                        title="Send email to commercial desk"
                      >
                        {contact.email}
                      </a>
                      {contact.secondaryEmail && (
                        <a
                          href={`mailto:${contact.secondaryEmail}`}
                          className="item-link email-link"
                          title="Send email to secondary desk"
                        >
                          {contact.secondaryEmail}
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* 4. WhatsApp Technical Support */}
                <div className="info-item-block">
                  <div className="item-icon-box whatsapp-icon-box">
                    <MessageSquare size={20} className="info-item-icon whatsapp-icon" aria-hidden="true" />
                  </div>
                  <div className="item-content">
                    <span className="item-label">Instant Messaging / WhatsApp Desk</span>
                    <a
                      href={contact.whatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="item-link whatsapp-link"
                      title="Chat on WhatsApp"
                    >
                      <span>{contact.whatsApp}</span>
                      <ExternalLink size={13} aria-hidden="true" />
                    </a>
                  </div>
                </div>

                {/* 5. Business Hours */}
                <div className="info-item-block">
                  <div className="item-icon-box">
                    <Clock size={20} className="info-item-icon" aria-hidden="true" />
                  </div>
                  <div className="item-content">
                    <span className="item-label">Working Hours & Response Window</span>
                    <p className="working-hours-text">
                      <strong>Monday – Saturday:</strong> 9:30 AM – 6:30 PM (IST)<br />
                      <span className="timing-note">Export RFQs acknowledged within 4 business hours</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Verified Trust Strip */}
              <div className="info-card-trust-strip">
                <ShieldCheck size={16} className="trust-icon" aria-hidden="true" />
                <span>ISO 9001:2015 Registered • MSME Certified</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
