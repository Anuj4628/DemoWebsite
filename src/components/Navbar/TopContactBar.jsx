import React from 'react';
import { Mail, Phone } from 'lucide-react';
import { brandDetails } from '../../data/navigationData';
import './TopContactBar.css';


export default function TopContactBar() {
  const { contact } = brandDetails;

  return (
    <div className="top-contact-bar" aria-label="Quick Contact and Export Desk">
      <div className="top-contact-container">
        {/* Contact Links (Email & Phones) */}
        <div className="top-contact-right">
          {/* Primary Email */}
          <a
            href={contact.gmailComposeUrl || `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(contact.email)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="top-contact-item"
            title={`Compose email to ${contact.email} in Gmail`}
          >
            <Mail size={13} className="top-icon email-icon" aria-hidden="true" />
            <span className="contact-text email-text">{contact.email}</span>
          </a>

          {contact.secondaryEmail && (
            <>
              <span className="top-bar-divider" aria-hidden="true">|</span>
              <a
                href={contact.secondaryGmailComposeUrl || `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(contact.secondaryEmail)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="top-contact-item"
                title={`Compose email to ${contact.secondaryEmail} in Gmail`}
              >
                <Mail size={13} className="top-icon email-icon" aria-hidden="true" />
                <span className="contact-text email-text">{contact.secondaryEmail}</span>
              </a>
            </>
          )}

          <span className="top-bar-divider" aria-hidden="true">|</span>

          {/* Phone 1 */}
          <a
            href={`tel:${contact.phone1Raw}`}
            className="top-contact-item"
            title="Call Mobile Export Desk"
          >
            <Phone size={13} className="top-icon" aria-hidden="true" />
            <span className="contact-text">{contact.phone1}</span>
          </a>

          <span className="top-bar-divider" aria-hidden="true">|</span>

          {/* Phone 2 */}
          <a
            href={`tel:${contact.phone2Raw}`}
            className="top-contact-item"
            title="Call Office Line"
          >
            <Phone size={13} className="top-icon" aria-hidden="true" />
            <span className="contact-text">{contact.phone2}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
