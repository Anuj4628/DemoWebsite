import React from 'react';
import { PhoneCall } from 'lucide-react';
import { brandDetails } from '../../data/navigationData';
import './FloatingContactButtons.css';

export default function FloatingContactButtons() {
  const { contact, shortName } = brandDetails;

  return (
    <aside className="floating-contact-container" aria-label="Direct Contact Shortcuts">
      {/* WhatsApp Click-to-Chat Button */}
      <a
        href={contact.whatsAppUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-btn whatsapp-btn"
        aria-label={`Direct WhatsApp chat with ${shortName || brandDetails.name}`}
        title={`Chat on WhatsApp (${contact.whatsApp})`}
      >
        <span className="floating-btn-glow" aria-hidden="true" />
        {/* Exact Official WhatsApp SVG */}
        <svg
          className="floating-icon whatsapp-icon"
          viewBox="0 0 24 24"
          width="26"
          height="26"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.264 8.264 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.23 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.84-.86 2.05 0 1.21.88 2.38 1 2.54.12.17 1.74 2.66 4.21 3.73.59.25 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.07-.1-.23-.16-.48-.28z" />
        </svg>
        <span className="floating-tooltip">WhatsApp</span>
      </a>

      {/* Direct Phone Call Button */}
      <a
        href={`tel:${contact.phone1Raw}`}
        className="floating-btn phone-btn"
        aria-label={`Call ${shortName || brandDetails.name} Export Desk`}
        title={`Call ${contact.phone1}`}
      >
        <span className="floating-btn-glow" aria-hidden="true" />
        <PhoneCall size={22} className="floating-icon phone-icon" aria-hidden="true" />
        <span className="floating-tooltip">Call Desk</span>
      </a>
    </aside>
  );
}
