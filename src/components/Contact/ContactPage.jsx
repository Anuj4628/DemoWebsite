import React, { useEffect } from 'react';
import ContactHero from './ContactHero';
import ContactIntro from './ContactIntro';
import ContactInfoMap from './ContactInfoMap';
import ContactRFQ from './ContactRFQ';
import ContactFAQ from './ContactFAQ';
import ContactDirectCTA from './ContactDirectCTA';
import './Contact.css';

/**
 * Redcore Steels — Master Contact Page Orchestrator
 * Integrates all 7 sections seamlessly into the existing site architecture.
 */
export default function ContactPage() {
  useEffect(() => {
    // Dynamically update document title & meta description for SEO best practices
    const originalTitle = document.title;
    document.title = 'Get in Contact | Redcore Steels — Technical Desk, RFQ & Global Export';

    let metaDesc = document.querySelector('meta[name="description"]');
    const originalDesc = metaDesc ? metaDesc.getAttribute('content') : '';

    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Contact Redcore Steels technical engineering and commercial sales desk. Submit RFQ inquiries for industrial steel pipes, fittings, flanges, plates, and fasteners with fast CIF/FOB pricing.'
      );
    }

    // Smoothly scroll to top on initial page mount
    window.scrollTo({ top: 0, behavior: 'instant' });

    return () => {
      document.title = originalTitle;
      if (metaDesc && originalDesc) {
        metaDesc.setAttribute('content', originalDesc);
      }
    };
  }, []);

  return (
    <div className="contact-page-master" id="contact-page-top">
      {/* SECTION 0 — CONTACT HERO */}
      <ContactHero />

      {/* SECTION 1 — CONNECT WITH OUR TECHNICAL TEAM */}
      <ContactIntro />

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
