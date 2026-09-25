import React, { useState, useMemo, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Send,
  CheckCircle,
  AlertCircle,
  Clock,
  ShieldCheck,
  RotateCcw,
  Copy,
  Check,
  MessageSquare
} from 'lucide-react';
import { getAllProductGroups } from '../../data/productCatalogData';
import { brandDetails } from '../../data/navigationData';
import { submitQuoteRequest } from '../../utils/quoteSubmissionService';

gsap.registerPlugin(ScrollTrigger);

export default function ContactRFQ() {
  const sectionRef = useRef(null);

  // Dynamically compile product list from central catalog
  const productOptions = useMemo(() => {
    try {
      const groups = getAllProductGroups();
      if (!groups || !Array.isArray(groups)) return [];

      const manufacturerItems = [];
      const supplierItems = [];

      groups.forEach((group) => {
        const div = (group.divisionSlug || '').toLowerCase();
        const groupLabel = group.name;

        const catNames = (group.categories || []).map((c) => c.name);

        const groupEntry = {
          groupId: group.id || group.slug,
          groupName: groupLabel,
          division: group.division,
          categories: catNames
        };

        if (div === 'manufacturer') {
          manufacturerItems.push(groupEntry);
        } else {
          supplierItems.push(groupEntry);
        }
      });

      return { manufacturerItems, supplierItems };
    } catch (err) {
      console.error('Failed to load dynamic product groups:', err);
      return { manufacturerItems: [], supplierItems: [] };
    }
  }, []);

  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    product: '',
    specsAndQuantity: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [ticketNumber, setTicketNumber] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.rfq-master-card',
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Validation logic
  const validateField = (name, value) => {
    switch (name) {
      case 'fullName':
        if (!value.trim()) return 'Full Name is required';
        if (value.trim().length < 2) return 'Please enter at least 2 characters';
        return '';
      case 'companyName':
        if (!value.trim()) return 'Company Name is required';
        return '';
      case 'email':
        if (!value.trim()) return 'Corporate Email Address is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
          return 'Please enter a valid corporate email address';
        }
        return '';
      case 'phone':
        if (!value.trim()) return 'Mobile / Phone Number is required';
        if (!/^[+0-9\s\-()]{7,20}$/.test(value.trim())) {
          return 'Please enter a valid phone number with country code';
        }
        return '';
      case 'product':
        if (!value.trim()) return 'Please select a required product from the catalog';
        return '';
      default:
        return '';
    }
  };

  const validateAll = () => {
    const newErrors = {};
    const keys = ['fullName', 'companyName', 'email', 'phone', 'product'];
    keys.forEach((key) => {
      const err = validateField(key, formData[key]);
      if (err) newErrors[key] = err;
    });
    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setSubmitError('');

    // Clear error inline as user types
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent duplicate submissions
    if (isSubmitting) return;

    const validationErrors = validateAll();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Focus the first invalid input
      const firstInvalidField = Object.keys(validationErrors)[0];
      const el = document.getElementById(firstInvalidField);
      if (el) el.focus();
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    const submissionTime = new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'full',
      timeStyle: 'medium'
    });

    const emailBodyText = [
      `Full Name: ${formData.fullName.trim()}`,
      `Company Name: ${formData.companyName.trim()}`,
      `Email: ${formData.email.trim()}`,
      `Mobile: ${formData.phone.trim()}`,
      `Selected Product: ${formData.product}`,
      `Specifications & Quantities: ${formData.specsAndQuantity.trim() || 'Not specified (Standard catalogue inquiry)'}`,
      `Submission Date/Time: ${submissionTime} (IST)`
    ].join('\n');

    try {
      const result = await submitQuoteRequest({
        fullName: formData.fullName.trim(),
        companyName: formData.companyName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        product: formData.product,
        specsAndQuantity: formData.specsAndQuantity.trim(),
        source: 'Contact Page RFQ Form'
      });

      if (result.success) {
        setTicketNumber(result.ticketId);
        setSubmitSuccess(true);
        setIsSubmitting(false);

        // Store formatted summary text for easy clipboard copy in the success banner
        setFormData((prev) => ({
          ...prev,
          _formattedEmail: emailBodyText
        }));
      } else {
        setIsSubmitting(false);
        setSubmitError(result.error || 'Failed to transmit RFQ inquiry. Please try again or reach our desk directly.');
      }
    } catch {
      setIsSubmitting(false);
      setSubmitError('An unexpected transmission error occurred. Please retry or contact our desk directly.');
    }
  };

  const handleResetForm = () => {
    setFormData({
      fullName: '',
      companyName: '',
      email: '',
      phone: '',
      product: '',
      specsAndQuantity: ''
    });
    setErrors({});
    setSubmitSuccess(false);
    setSubmitError('');
    setTicketNumber('');
  };

  const handleCopyInquiry = () => {
    if (formData._formattedEmail) {
      navigator.clipboard.writeText(formData._formattedEmail).then(() => {
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2500);
      });
    }
  };

  return (
    <section
      id="rfq-section"
      ref={sectionRef}
      className="contact-rfq-section"
      aria-label="Request For Quotation RFQ Form"
    >
      <div className="section-container">
        <div className="rfq-master-card">
          {/* Top Industrial Red Accent Bar */}
          <div className="rfq-top-glow" aria-hidden="true" />

          {/* Header Block */}
          <div className="rfq-header-block">
            <div className="rfq-eyebrow-row">
              <span className="rfq-official-badge">OFFICIAL PROCUREMENT PORTAL</span>
              <span className="rfq-speed-badge">
                <Clock size={13} aria-hidden="true" />
                <span>Formal Quotation Within 4 Business Hours</span>
              </span>
            </div>

            <h2 className="rfq-title">
              REQUEST FOR QUOTE <span className="text-red">(RFQ)</span>
            </h2>

            <p className="rfq-subtitle">
              Submit your required material grades, outer diameters, dimensional schedules, and project volumes. Our commercial estimation team reviews project codes and provides formal CIF, FOB, or Ex-Works quotation packages.
            </p>
          </div>

          {/* Success State Confirmation Box */}
          {submitSuccess ? (
            <div className="rfq-success-container" role="status" aria-live="polite">
              <div className="success-icon-badge">
                <CheckCircle size={38} className="success-icon" aria-hidden="true" />
              </div>

              <h3 className="success-heading">RFQ Inquiry Successfully Transmitted</h3>

              <p className="success-primary-msg">
                Thank you, <strong>{formData.fullName}</strong>. Your RFQ inquiry for <strong>{formData.product}</strong> has been registered under ticket reference <strong>#{ticketNumber}</strong>.
              </p>

              <div className="success-summary-box">
                <div className="summary-data-row">
                  <span className="data-lbl">Assigned Receiving Desk:</span>
                  <strong className="data-val">{brandDetails.contact.email}</strong>
                </div>
                <div className="summary-data-row">
                  <span className="data-lbl">Company / Entity:</span>
                  <span className="data-val">{formData.companyName}</span>
                </div>
                <div className="summary-data-row">
                  <span className="data-lbl">Product Requirement:</span>
                  <span className="data-val font-semibold">{formData.product}</span>
                </div>
                <div className="summary-data-row">
                  <span className="data-lbl">Specifications & Quantities:</span>
                  <span className="data-val">{formData.specsAndQuantity || 'Standard catalogue specification'}</span>
                </div>
              </div>

              <p className="success-reassurance">
                Our metallurgical commercial desk will transmit your technical pricing and EN 10204 MTC compliance pack to <strong>{formData.email}</strong> shortly.
              </p>

              <div className="success-actions-row">
                <button
                  type="button"
                  className="btn-success-action btn-submit-another"
                  onClick={handleResetForm}
                >
                  <RotateCcw size={15} aria-hidden="true" />
                  <span>Submit Another RFQ</span>
                </button>

                {formData._formattedEmail && (
                  <button
                    type="button"
                    className="btn-success-action btn-copy-inquiry"
                    onClick={handleCopyInquiry}
                  >
                    {copiedEmail ? <Check size={15} /> : <Copy size={15} />}
                    <span>{copiedEmail ? 'Copied to Clipboard' : 'Copy Inquiry Summary'}</span>
                  </button>
                )}

                <a
                  href={`https://wa.me/${brandDetails.contact.whatsAppRaw}?text=${encodeURIComponent(`Hello Bhawal Steel & Engineering Company, I have submitted RFQ #${ticketNumber} for ${formData.product}. Please advise dispatch availability.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-success-action btn-wa-followup"
                >
                  <MessageSquare size={15} aria-hidden="true" />
                  <span>Follow up on WhatsApp</span>
                </a>
              </div>
            </div>
          ) : (
            /* ========================================================= */
            /* INTERACTIVE RFQ FORM */
            /* ========================================================= */
            <form className="rfq-form" onSubmit={handleSubmit} noValidate>
              {submitError && (
                <div className="rfq-global-error" role="alert">
                  <AlertCircle size={18} className="error-icon" aria-hidden="true" />
                  <span>{submitError}</span>
                </div>
              )}

              <div className="rfq-fields-grid">
                {/* 1. Full Name (Required) */}
                <div className={`form-group ${errors.fullName ? 'has-error' : ''}`}>
                  <label htmlFor="fullName" className="form-label">
                    Full Name <span className="req-star">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    autoComplete="name"
                    placeholder="e.g. Vikram Singhania"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="form-input"
                    aria-invalid={!!errors.fullName}
                    aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                    disabled={isSubmitting}
                  />
                  {errors.fullName && (
                    <span id="fullName-error" className="field-error-text" role="alert">
                      {errors.fullName}
                    </span>
                  )}
                </div>

                {/* 2. Company Name (Required) */}
                <div className={`form-group ${errors.companyName ? 'has-error' : ''}`}>
                  <label htmlFor="companyName" className="form-label">
                    Company Name <span className="req-star">*</span>
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    autoComplete="organization"
                    placeholder="e.g. PetroTech Engineering Ltd."
                    value={formData.companyName}
                    onChange={handleInputChange}
                    className="form-input"
                    aria-invalid={!!errors.companyName}
                    aria-describedby={errors.companyName ? 'companyName-error' : undefined}
                    disabled={isSubmitting}
                  />
                  {errors.companyName && (
                    <span id="companyName-error" className="field-error-text" role="alert">
                      {errors.companyName}
                    </span>
                  )}
                </div>

                {/* 3. Corporate Email Address (Required) */}
                <div className={`form-group ${errors.email ? 'has-error' : ''}`}>
                  <label htmlFor="email" className="form-label">
                    Corporate Email Address <span className="req-star">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    autoComplete="email"
                    placeholder="e.g. procurement@company.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-input"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    disabled={isSubmitting}
                  />
                  {errors.email && (
                    <span id="email-error" className="field-error-text" role="alert">
                      {errors.email}
                    </span>
                  )}
                </div>

                {/* 4. Mobile / Phone Number (Required) */}
                <div className={`form-group ${errors.phone ? 'has-error' : ''}`}>
                  <label htmlFor="phone" className="form-label">
                    Mobile / Phone Number <span className="req-star">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    autoComplete="tel"
                    placeholder="e.g. +91 98200 XXXXX"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="form-input"
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? 'phone-error' : undefined}
                    disabled={isSubmitting}
                  />
                  {errors.phone && (
                    <span id="phone-error" className="field-error-text" role="alert">
                      {errors.phone}
                    </span>
                  )}
                </div>

                {/* 5. Product Requirements (Required - Dynamically populated from catalog) */}
                <div className={`form-group full-span ${errors.product ? 'has-error' : ''}`}>
                  <label htmlFor="product" className="form-label">
                    Product Requirements <span className="req-star">*</span>
                  </label>
                  <div className="select-wrapper">
                    <select
                      id="product"
                      name="product"
                      value={formData.product}
                      onChange={handleInputChange}
                      className="form-select"
                      aria-invalid={!!errors.product}
                      aria-describedby={errors.product ? 'product-error' : undefined}
                      disabled={isSubmitting}
                    >
                      <option value="">-- Select Required Product From Active Catalog --</option>

                      {/* Manufacturer Division Products */}
                      {productOptions.manufacturerItems && productOptions.manufacturerItems.length > 0 && (
                        <optgroup label="── MANUFACTURER DIVISION ──">
                          {productOptions.manufacturerItems.map((group) => (
                            <React.Fragment key={group.groupId}>
                              <option value={`Manufacturer: ${group.groupName} (All Grades)`}>
                                {group.groupName} (Full Family)
                              </option>
                              {group.categories.map((catName, cIdx) => (
                                <option
                                  key={`${group.groupId}-${cIdx}`}
                                  value={`Manufacturer: ${catName}`}
                                >
                                  &nbsp;&nbsp;&nbsp;&nbsp;• {catName}
                                </option>
                              ))}
                            </React.Fragment>
                          ))}
                        </optgroup>
                      )}

                      {/* Supplier Division Products */}
                      {productOptions.supplierItems && productOptions.supplierItems.length > 0 && (
                        <optgroup label="── SUPPLIER DIVISION ──">
                          {productOptions.supplierItems.map((group) => (
                            <React.Fragment key={group.groupId}>
                              <option value={`Supplier: ${group.groupName} (All Grades)`}>
                                {group.groupName} (Full Family)
                              </option>
                              {group.categories.map((catName, cIdx) => (
                                <option
                                  key={`${group.groupId}-${cIdx}`}
                                  value={`Supplier: ${catName}`}
                                >
                                  &nbsp;&nbsp;&nbsp;&nbsp;• {catName}
                                </option>
                              ))}
                            </React.Fragment>
                          ))}
                        </optgroup>
                      )}

                      {/* General / Other Alloys */}
                      <optgroup label="── CUSTOM / SPECIALIZED LOTS ──">
                        <option value="Specialized Exotic Nickel Alloy Package (Inconel / Monel / Hastelloy)">
                          Specialized Exotic Nickel Alloy Package
                        </option>
                        <option value="Custom Project Piping Package (Pipes + Fittings + Flanges)">
                          Custom Project Piping Package
                        </option>
                        <option value="Comprehensive Mill Order / Bulk Project Supply">
                          Comprehensive Mill Order / Bulk Project Supply
                        </option>
                      </optgroup>
                    </select>
                  </div>
                  {errors.product && (
                    <span id="product-error" className="field-error-text" role="alert">
                      {errors.product}
                    </span>
                  )}
                </div>

                {/* 6. Specifications & Quantities (Explicitly OPTIONAL) */}
                <div className="form-group full-span">
                  <div className="form-label-row">
                    <label htmlFor="specsAndQuantity" className="form-label">
                      Specifications & Quantities
                    </label>
                    <span className="optional-badge">Optional</span>
                  </div>
                  <textarea
                    id="specsAndQuantity"
                    name="specsAndQuantity"
                    rows="4"
                    placeholder="Describe required specification, grade (e.g. SS 316L, UNS S32750, ASTM A106 Gr B), size, schedule/wall thickness, quantity (Pieces / MT / Meters), application, delivery requirement, or port of discharge..."
                    value={formData.specsAndQuantity}
                    onChange={handleInputChange}
                    className="form-textarea"
                    disabled={isSubmitting}
                  />
                  <span className="field-hint">
                    You can submit this RFQ without filling this field. Our technical sales team will contact you to verify exact dimensional drawings and mill heat lot requirements.
                  </span>
                </div>
              </div>

              {/* Submit Button Row */}
              <div className="rfq-submit-row">
                <button
                  type="submit"
                  className="btn-submit-rfq"
                  disabled={isSubmitting}
                >
                  <span className="btn-submit-bg" aria-hidden="true" />
                  <span className="btn-submit-content">
                    {isSubmitting ? (
                      <>
                        <span className="rfq-spinner" aria-hidden="true" />
                        <span>Transmitting RFQ to Commercial Desk...</span>
                      </>
                    ) : (
                      <>
                        <Send size={16} className="btn-send-icon" aria-hidden="true" />
                        <span>SUBMIT RFQ</span>
                      </>
                    )}
                  </span>
                </button>

                <div className="rfq-assurance-row">
                  <div className="rfq-assurance-pill">
                    <ShieldCheck size={14} className="pill-icon" aria-hidden="true" />
                    <span>Transmitted to: {brandDetails.contact.email}</span>
                  </div>
                  <div className="rfq-assurance-pill">
                    <Clock size={14} className="pill-icon" aria-hidden="true" />
                    <span>Guaranteed Response within 4 Hours</span>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
