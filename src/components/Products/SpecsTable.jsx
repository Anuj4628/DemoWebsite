import React from 'react';
import './SpecsTable.css';

/**
 * Technical Product Specifications Table (Bright White Theme)
 */
export default function SpecsTable({ specs, standards = [] }) {
  if (!specs) return null;

  const rows = [
    { label: "Nominal Size Range", value: specs.size },
    { label: "Schedule / Wall Thickness / Class", value: specs.schedule || specs.thickness || specs.class },
    { label: "Manufacturing Standard", value: specs.standards },
    { label: "Testing & Quality Verification", value: specs.testing },
    { label: "Mill Test Certification", value: specs.certification }
  ].filter(r => r.value);

  return (
    <div className="bright-specs-wrapper">
      <div className="specs-head">
        <span className="specs-eyebrow">ENGINEERING SPEC SHEET</span>
        <h3 className="specs-title">Technical Product Specifications</h3>
        <p className="specs-desc">
          Strictly conforms with international pressure equipment codes and metallurgical testing standards.
        </p>
      </div>

      <div className="specs-table-box">
        <table className="bright-table">
          <thead>
            <tr>
              <th scope="col" className="th-param">Technical Parameter</th>
              <th scope="col" className="th-spec">Standard Specification Limits</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className={i % 2 === 0 ? 'tr-even' : 'tr-odd'}>
                <td className="td-param">
                  <span className="param-bullet"></span>
                  {row.label}
                </td>
                <td className="td-spec">{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Governing Standards Badges */}
      {standards && standards.length > 0 && (
        <div className="standards-box">
          <h4 className="standards-title">Governing International Standards & Compliance</h4>
          <div className="standards-pill-wrap">
            {standards.map((std, i) => (
              <div key={i} className="std-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
                <span>{std}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
