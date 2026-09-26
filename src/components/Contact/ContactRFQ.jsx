import React, { useState, useMemo, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Send,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { getAllProductGroups } from '../../data/productCatalogData';
import { brandDetails } from '../../data/navigationData';

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

    // Clear error inline as user types
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateAll();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Focus the first invalid input
      const firstInvalidField = Object.keys(validationErrors)[0];
      const el = document.getElementById(firstInvalidField);
      if (el) el.focus();
      return;
    }

    const recipient = brandDetails.contact.email;
    const subject = formData.product
      ? `Get Quote Enquiry - ${formData.product}`
      : 'Get Quote Enquiry';

    const bodyLines = [
      `Name: ${formData.fullName.trim()}`,
      `Company: ${formData.companyName.trim()}`,
      `Email: ${formData.email.trim()}`,
      `Phone: ${formData.phone.trim()}`,
      `Product: ${formData.product}`,
      `Quantity: ${formData.specsAndQuantity.trim() || 'Standard requirement'}`,
      `Message: ${formData.specsAndQuantity.trim() || 'Please provide quotation and technical details.'}`
    ];

    const body = bodyLines.join('\n');
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

          {/* INTERACTIVE RFQ FORM */}
          <form className="rfq-form" onSubmit={handleSubmit} noValidate>
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
              >
                <span className="btn-submit-bg" aria-hidden="true" />
                <span className="btn-submit-content">
                  <Send size={16} className="btn-send-icon" aria-hidden="true" />
                  <span>SEND / GET QUOTE</span>
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
        </div>
      </div>
    </section>
  );
}
