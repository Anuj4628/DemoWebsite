import React, { useState } from 'react';
import { brandDetails } from '../../data/navigationData';
import './InquiryForm.css';

/**
 * Dedicated Product Quotation & RFQ Form (Bright White Theme)
 */
export default function InquiryForm({
  productName = "Industrial Steel Product",
  materialGrade = "Standard Commercial Grade",
  division = "Manufacturer Division"
}) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    quantity: '',
    unit: 'Pieces (PCS)',
    deliveryLocation: '',
    notes: ''
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full name is required';
    if (!formData.email.trim()) {
      errs.email = 'Corporate email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email address';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required';
    } else if (formData.phone.trim().length < 8) {
      errs.phone = 'Please enter a valid phone number';
    }
    if (!formData.company.trim()) errs.company = 'Company name is required';
    if (!formData.quantity.trim()) errs.quantity = 'Quantity is required';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined, submit: undefined }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const recipient = brandDetails.contact.email;
    const subject = `Get Quote Enquiry - ${productName}`;

    const lines = [
      `Name: ${formData.fullName.trim()}`,
      `Company: ${formData.company.trim()}`,
      `Email: ${formData.email.trim()}`,
      `Phone: ${formData.phone.trim()}`,
      `Product: ${productName}${materialGrade ? ` (${materialGrade})` : ''}`,
      `Quantity: ${formData.quantity.trim()} ${formData.unit}`,
      ...(formData.deliveryLocation.trim() ? [`Delivery Location: ${formData.deliveryLocation.trim()}`] : []),
      `Message: ${formData.notes.trim() || 'Please provide quotation and delivery schedule.'}`
    ];

    const body = lines.join('\n');
    const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(recipient)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // 1. Open Gmail compose directly in a new tab (guarantees Gmail opens with populated details)
    const gmailWindow = window.open(gmailUrl, '_blank');

    // 2. Also trigger standard mailto: link action for default system email clients
    try {
      const mailtoLink = document.createElement('a');
      mailtoLink.href = mailtoUrl;
      mailtoLink.style.display = 'none';
      document.body.appendChild(mailtoLink);
      mailtoLink.click();
      setTimeout(() => {
        if (document.body.contains(mailtoLink)) {
          document.body.removeChild(mailtoLink);
        }
      }, 1000);
    } catch {
      if (!gmailWindow) {
        window.location.href = mailtoUrl;
      }
    }
  };

  return (
    <section id="product-inquiry-section" className="bright-rfq-section">
      <div className="rfq-card-white">
        <div className="rfq-top-bar"></div>

        <div className="rfq-head">
          <div className="rfq-badge-row">
            <span className="rfq-badge-red">OFFICIAL RFQ SPECIFICATION</span>
            <span className="rfq-division-tag">{division}</span>
          </div>
          <h3 className="rfq-title">Request Quotation & Material Test Certificate (MTC)</h3>
          <p className="rfq-subtitle">
            Submit your required schedule, size, and quantity. Our technical sales engineering team provides formal CIF/FOB pricing within 4 hours.
          </p>
        </div>

        {/* Pre-filled Product Summary Bar */}
        <div className="rfq-summary-strip">
          <div className="summary-col">
            <span className="sc-lbl">Target Product:</span>
            <strong className="sc-val">{productName}</strong>
          </div>
          <div className="summary-col">
            <span className="sc-lbl">Material / Grade:</span>
            <strong className="sc-val">{materialGrade}</strong>
          </div>
          <div className="summary-col">
            <span className="sc-lbl">Compliance:</span>
            <strong className="sc-val">EN 10204 3.1 & 3.2 / NACE MR0175</strong>
          </div>
        </div>

        <form className="bright-rfq-form" onSubmit={handleSubmit} noValidate>
          <div className="rfq-fields-grid">
              {/* Full Name */}
              <div className="form-group">
                <label htmlFor="fullName">Procurement Officer / Full Name <span className="req">*</span></label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="e.g. Rajesh Sharma"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={errors.fullName ? 'has-error' : ''}
                />
                {errors.fullName && <span className="err-text">{errors.fullName}</span>}
              </div>

              {/* Email */}
              <div className="form-group">
                <label htmlFor="email">Corporate Email Address <span className="req">*</span></label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="e.g. procurement@company.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'has-error' : ''}
                />
                {errors.email && <span className="err-text">{errors.email}</span>}
              </div>

              {/* Phone */}
              <div className="form-group">
                <label htmlFor="phone">Phone / WhatsApp (with Country Code) <span className="req">*</span></label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="e.g. +91 98200 XXXXX"
                  value={formData.phone}
                  onChange={handleChange}
                  className={errors.phone ? 'has-error' : ''}
                />
                {errors.phone && <span className="err-text">{errors.phone}</span>}
              </div>

              {/* Company */}
              <div className="form-group">
                <label htmlFor="company">Company / Project Name <span className="req">*</span></label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  placeholder="e.g. Larsen & Toubro / Refinery Project"
                  value={formData.company}
                  onChange={handleChange}
                  className={errors.company ? 'has-error' : ''}
                />
                {errors.company && <span className="err-text">{errors.company}</span>}
              </div>

              {/* Quantity */}
              <div className="form-group">
                <label htmlFor="quantity">Required Quantity & Unit <span className="req">*</span></label>
                <div className="qty-wrap">
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    placeholder="e.g. 500"
                    value={formData.quantity}
                    onChange={handleChange}
                    className={errors.quantity ? 'has-error' : ''}
                    min="1"
                  />
                  <select name="unit" value={formData.unit} onChange={handleChange}>
                    <option value="Pieces (PCS)">Pieces (PCS)</option>
                    <option value="Metric Tons (MT)">Metric Tons (MT)</option>
                    <option value="Meters (MTR)">Meters (MTR)</option>
                    <option value="Kilograms (KG)">Kilograms (KG)</option>
                    <option value="Project Lot">Project Lot</option>
                  </select>
                </div>
                {errors.quantity && <span className="err-text">{errors.quantity}</span>}
              </div>

              {/* Delivery Location */}
              <div className="form-group">
                <label htmlFor="deliveryLocation">Delivery Location / Port of Discharge</label>
                <input
                  type="text"
                  id="deliveryLocation"
                  name="deliveryLocation"
                  placeholder="e.g. Nhava Sheva (JNPT) / Mundra / Dubai / Houston"
                  value={formData.deliveryLocation}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Notes */}
            <div className="form-group full-width">
              <label htmlFor="notes">
                Technical Specifications, Wall Thickness, Testing Requirements (PMI, Radiography, TPI):
              </label>
              <textarea
                id="notes"
                name="notes"
                rows="3"
                placeholder="Mention any specific dimensional tolerances, schedule requirements, NACE compliance, TPI inspection (TUV, DNV, Lloyds), or required delivery schedules..."
                value={formData.notes}
                onChange={handleChange}
              ></textarea>
            </div>

            {/* Bottom Actions */}
            <div className="rfq-submit-row">
              <button
                type="submit"
                className="btn-transmit-rfq"
              >
                <span>SEND / GET QUOTE</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>

              <div className="rfq-instant-links">
                <span className="direct-hint">Or speak directly to sales:</span>
                <div className="direct-btns-wrap">
                  <a
                    href={`https://wa.me/${brandDetails.contact.whatsAppRaw}?text=${encodeURIComponent(`Hello ${brandDetails.name}, I need a quotation for ${productName} (${materialGrade}).`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-wa-direct"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.174.086.275.073.376-.044.101-.116.433-.506.549-.68.116-.173.231-.145.39-.086.159.058 1.011.477 1.184.564.173.086.289.13.332.202.043.073.043.419-.101.824z"/>
                    </svg>
                    <span>WhatsApp Desk</span>
                  </a>
                  <a href={`tel:${brandDetails.contact.phone1Raw}`} className="btn-call-direct">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                    <span>Direct Call</span>
                  </a>
                </div>
              </div>
            </div>
          </form>
      </div>
    </section>
  );
}
