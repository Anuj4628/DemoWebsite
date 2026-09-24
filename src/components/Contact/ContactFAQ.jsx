import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, HelpCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const FAQ_DATA = [
  {
    id: 'faq-categories',
    question: 'What categories and products do you offer?',
    answer:
      'Bhawal Steel & Engineering Company operates two comprehensive core divisions: the Manufacturer Division and the Supplier Division. Our product families include Butt Weld Fittings, High-Pressure Forged Fittings, Flanges, Fasteners, Ferrule & Instrumentation Fittings, Dairy & Pharma Hygienic Fittings, Flexible Hose Pipes, Perforated Sheets, and Industrial Wire Mesh. In our Supplier Division, we maintain heavy inventory in Seamless and Welded Pipes & Tubes, Plates & Sheets, Coils, Circles, Flat Bars, Patapatti, and High-Tensile Wires across Stainless Steel (304, 316, 904L), Carbon Steel (ASTM A106), Alloy Steel (P11, P22, P91), Duplex (UNS S31803), Super Duplex (UNS S32750/S32760), Inconel (600, 625, 825), Monel 400, Hastelloy C276, and Titanium Alloys.'
  },
  {
    id: 'faq-specs-bulk',
    question: 'Can I request technical specifications, non-standard dimensions, or bulk quantities?',
    answer:
      'Yes. We regularly supply tailored dimensional schedules, non-standard wall thicknesses, custom lengths, and specialized machining. All project lots can be ordered in bulk containerized shipments or phased project deliveries. Every dispatch is accompanied by full mill test documentation compliant with EN 10204 3.1 or 3.2 Material Test Reports (MTR), Positive Material Identification (PMI) reports, and Third-Party Inspection (TPI) agency sign-offs (such as TUV, DNV, Lloyds, or Bureau Veritas).'
  },
  {
    id: 'faq-contact-channels',
    question: 'How can I contact the technical or sales team for an immediate requirement?',
    answer:
      'You can submit an inquiry through our official RFQ form on this page, email our commercial team directly at bhawal@hotmail.com or info@rohitmetal.com, or call our dedicated Export & Direct Desk at +91 92233 81575 or our direct line at +91 99697 32025. For quick specification exchanges, drawing reviews, and stock inquiries, you can also reach our instant messaging WhatsApp desk at +91 92233 81575 during business hours (Mon–Sat, 9:30 AM – 6:30 PM IST).'
  },
  {
    id: 'faq-response-time',
    question: 'How long does it take to receive a quotation and technical review?',
    answer:
      'Our estimation and metallurgy desk acknowledges and processes RFQs within 4 business hours for standard catalogue items and stocked materials. For complex project bills of materials (BOMs), custom alloy fabrications, or international CIF tender specifications requiring third-party testing schedules, formal pricing and dispatch timelines are delivered within 24 business hours.'
  }
];

export default function ContactFAQ() {
  const [openIndex, setOpenIndex] = useState(0); // Open first FAQ by default
  const sectionRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.faq-master-wrap',
        { opacity: 0, y: 30 },
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

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section
      id="faq-section"
      ref={sectionRef}
      className="contact-faq-section"
      aria-label="Frequently Asked Questions"
    >
      <div className="section-container">
        <div className="faq-master-wrap">
          {/* Header */}
          <div className="faq-header-block">
            <div className="section-eyebrow">
              <HelpCircle size={15} className="eyebrow-icon" aria-hidden="true" />
              <span className="eyebrow-text">PROCUREMENT & ENGINEERING CLARIFICATIONS</span>
            </div>

            <h2 className="section-main-heading">
              FREQUENTLY ASKED <span className="heading-highlight">QUESTIONS</span>
            </h2>

            <p className="faq-header-desc">
              Answers to common inquiries regarding our product divisions, technical certification standards, project scheduling, and quotation turnarounds.
            </p>
          </div>

          {/* Accordion List */}
          <div className="faq-accordion-list" role="region" aria-label="FAQ Accordion">
            {FAQ_DATA.map((item, index) => {
              const isOpen = openIndex === index;
              const contentId = `faq-ans-${item.id}`;
              const buttonId = `faq-btn-${item.id}`;

              return (
                <div
                  key={item.id}
                  className={`faq-item-card ${isOpen ? 'is-open' : ''}`}
                >
                  <button
                    type="button"
                    id={buttonId}
                    className="faq-question-button"
                    onClick={() => toggleFAQ(index)}
                    aria-expanded={isOpen}
                    aria-controls={contentId}
                  >
                    <span className="faq-num-pill">0{index + 1}</span>
                    <span className="faq-question-text">{item.question}</span>
                    <span className={`faq-chevron-box ${isOpen ? 'rotated' : ''}`} aria-hidden="true">
                      <ChevronDown size={18} />
                    </span>
                  </button>

                  <div
                    id={contentId}
                    role="region"
                    aria-labelledby={buttonId}
                    className={`faq-answer-collapse ${isOpen ? 'expanded' : ''}`}
                  >
                    <div className="faq-answer-inner">
                      <p className="faq-answer-text">{item.answer}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
