import React, { useEffect } from 'react';
import ContactHero from './ContactHero';
import ContactIntro from './ContactIntro';
import ContactCatalogSection from './ContactCatalogSection';
import ContactInfoMap from './ContactInfoMap';
import ContactRFQ from './ContactRFQ';
import ContactFAQ from './ContactFAQ';
import ContactDirectCTA from './ContactDirectCTA';
import './Contact.css';

/**
 * Bhawal Steel & Engineering Company — Master Contact Page Orchestrator
 * Integrates all sections seamlessly into the existing site architecture.
 */
export default function ContactPage({ initialSection = null }) {
  useEffect(() => {
    // If targeted for RFQ or URL has rfq/quote
    const isRfqTarget = initialSection === 'rfq-section' || 
      window.location.pathname.includes('quote') || 
      window.location.pathname.includes('rfq') ||
      window.location.hash === '#rfq-section';

    if (isRfqTarget) {
      setTimeout(() => {
        const el = document.getElementById('rfq-section');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 150);
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [initialSection]);

  return (
    <div className="contact-page-master" id="contact-page-top">
      {/* SECTION 0 — CONTACT HERO */}
      <ContactHero />

      {/* SECTION 1 — CONNECT WITH OUR TECHNICAL TEAM */}
      <ContactIntro />

      {/* HIGHLIGHTED DEDICATED CATALOG SECTION */}
      <ContactCatalogSection />

      {/* SECTION 2 — CONTACT INFORMATION + EXACT MAP */}
      <ContactInfoMap />

      {/* SECTION 3 — REQUEST A QUOTE / RFQ */}
      <ContactRFQ />

      {/* SECTION 4 — FREQUENTLY ASKED QUESTIONS */}
      <ContactFAQ />

      {/* SECTION 5 & 6 — CALL / TECHNICAL ANALYST & EMAIL CONTACT */}
      <ContactDirectCTA />
    </div>
  );
}
