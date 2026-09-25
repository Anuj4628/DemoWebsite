import React from 'react';
import { ShieldCheck, Award, CheckCircle2, ExternalLink } from 'lucide-react';
import isoCertificate from '../../assets/Certificates/BSEC ISO CERTIFICATE.pdf';
import iecCertificate from '../../assets/Certificates/BSEC IEC CERTIFICATE 1.pdf';
import udhyamCertificate from '../../assets/Certificates/BSEC UDHYAM CERTIFICATE.pdf';
import './CertificatesDropdown.css';

/**
 * 3 Official Certificates of Bhawal Steel & Engineering Co.
 */
export const CERTIFICATES_DATA = [
  {
    id: 'iso-cert',
    name: 'ISO 9001:2015 Certificate',
    category: 'Quality Management System',
    tag: 'QMS CERTIFIED',
    file: isoCertificate,
    icon: ShieldCheck,
    description: 'Certified for manufacturing, stockholding & global supply of steel products'
  },
  {
    id: 'iec-cert',
    name: 'IEC Certificate',
    category: 'Directorate General of Foreign Trade',
    tag: 'EXPORT ACCREDITED',
    file: iecCertificate,
    icon: Award,
    description: 'Authorized Importer-Exporter Code for international trade operations'
  },
  {
    id: 'udhyam-cert',
    name: 'Udyam Registration Certificate',
    category: 'Ministry of MSME, Govt. of India',
    tag: 'MSME VERIFIED',
    file: udhyamCertificate,
    icon: CheckCircle2,
    description: 'Official enterprise registration verifying manufacturing classification'
  }
];

function CertificatesDropdown({ isOpen, onClose }) {
  const handleItemClick = () => {
    // PDF opens natively in new tab via href & target="_blank"
    if (onClose) {
      onClose();
    }
  };

  return (
    <div
      className={`certificates-dropdown-panel ${isOpen ? 'is-open' : ''}`}
      role="region"
      aria-label="Certificates Navigation Menu"
    >
      {/* Header */}
      <div className="certificates-dropdown-header">
        <div className="certificates-header-eyebrow">
          <span className="certificates-eyebrow-bar" />
          <span className="certificates-eyebrow-text">OFFICIAL ACCREDITATIONS</span>
        </div>
        <span className="certificates-header-count">3 Verified Documents</span>
      </div>

      {/* Certificates List */}
      <div className="certificates-list-container">
        {CERTIFICATES_DATA.map((cert) => {
          const IconComponent = cert.icon;
          return (
            <a
              key={cert.id}
              href={cert.file}
              target="_blank"
              rel="noopener noreferrer"
              className="certificate-drop-item"
              onClick={(e) => handleItemClick(e, cert.file)}
              title={`Open ${cert.name} (PDF)`}
            >
              <div className="cert-drop-icon-box">
                <IconComponent className="cert-drop-icon" size={20} />
              </div>

              <div className="cert-drop-content">
                <div className="cert-drop-header-row">
                  <span className="cert-drop-title">{cert.name}</span>
                  <span className="cert-drop-tag">{cert.tag}</span>
                </div>
                <span className="cert-drop-desc">{cert.category}</span>
              </div>

              <div className="cert-drop-action">
                <span className="cert-drop-badge">PDF</span>
                <ExternalLink className="cert-drop-ext" size={14} />
              </div>
            </a>
          );
        })}
      </div>

      {/* Footer Strip */}
      <div className="certificates-dropdown-footer">
        <div className="certificates-footer-status">
          <span className="cert-status-dot" />
          <span>Audited &amp; Active Govt. Accreditations</span>
        </div>
        <span className="certificates-footer-note">Click to open PDF</span>
      </div>
    </div>
  );
}

export default React.memo(CertificatesDropdown);
