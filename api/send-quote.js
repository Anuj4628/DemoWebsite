/**
 * Serverless API Route: /api/send-quote
 * Handles direct Get Quote & RFQ email dispatch to Bhawal Steel & Engineering Company.
 * Fully server-side — no SMTP passwords, API keys, or secrets exposed to client.
 */

import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method Not Allowed. Please use POST.'
    });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};

    const {
      fullName = '',
      companyName = '',
      email = '',
      phone = '',
      product = '',
      productName = '',
      materialGrade = '',
      specsAndQuantity = '',
      quantity = '',
      unit = '',
      deliveryLocation = '',
      notes = '',
      source = 'Website RFQ Form'
    } = body;

    // Validate essential fields
    const effectiveName = (fullName || '').trim();
    const effectiveEmail = (email || '').trim();
    const effectivePhone = (phone || '').trim();
    const effectiveProduct = (product || productName || 'Industrial Steel Specifications').trim();

    if (!effectiveName || !effectiveEmail || !effectivePhone) {
      return res.status(400).json({
        success: false,
        error: 'Please provide your Full Name, Corporate Email, and Contact Number.'
      });
    }

    // Generate unique industrial ticket tracking reference
    const ticketId = `BS-RFQ-${Math.floor(100000 + Math.random() * 900000)}`;

    const submissionTime = new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'full',
      timeStyle: 'medium'
    });

    const primaryRecipient = process.env.BUSINESS_EMAIL || 'bhawal@hotmail.com';
    const secondaryRecipient = process.env.SECONDARY_EMAIL || 'info@rohitmetal.com';
    const recipients = [primaryRecipient, secondaryRecipient].filter(Boolean);

    const emailSubject = `[${ticketId}] Official RFQ Inquiry: ${effectiveProduct} — ${effectiveName}`;

    // Plain text format
    const plainTextBody = `
=====================================================
BHAWAL STEEL & ENGINEERING COMPANY — NEW RFQ INQUIRY
TICKET ID: ${ticketId}
=====================================================

CUSTOMER & PROCUREMENT DETAILS:
-----------------------------------------------------
• Full Name:      ${effectiveName}
• Company Name:   ${companyName.trim() || 'Not specified'}
• Email Address:  ${effectiveEmail}
• Phone / WA:     ${effectivePhone}

PRODUCT & SPECIFICATION REQUIREMENTS:
-----------------------------------------------------
• Target Product: ${effectiveProduct}
• Material Grade: ${materialGrade || 'Standard / Multi-Grade'}
• Quantity:       ${quantity ? `${quantity} ${unit || ''}` : 'As specified in requirement'}
• Destination:    ${deliveryLocation.trim() || 'CIF / FOB / Ex-Works requirement'}

TECHNICAL SPECIFICATIONS & NOTES:
-----------------------------------------------------
${specsAndQuantity || notes || 'Standard catalogue dimension and tolerance limits requested.'}

METADATA:
-----------------------------------------------------
• Source:         ${source}
• Received Time:  ${submissionTime} (IST)
=====================================================
`.trim();

    // Premium HTML format
    const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #0f172a; }
    .email-container { max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 8px; border: 1px solid #e2e8f0; overflow: hidden; }
    .header-bar { background: #125A48; padding: 20px 24px; color: #ffffff; border-bottom: 3px solid #C09642; }
    .header-title { margin: 0 0 4px 0; font-size: 18px; font-weight: 800; letter-spacing: 0.04em; }
    .header-sub { margin: 0; font-size: 12px; color: #cbd5e1; }
    .content-body { padding: 24px; }
    .ticket-badge { display: inline-block; background: #f1f5f9; border: 1px solid #cbd5e1; padding: 6px 12px; border-radius: 4px; font-weight: 700; font-size: 14px; color: #125A48; margin-bottom: 20px; }
    .section-title { font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; color: #64748b; margin: 20px 0 10px 0; border-bottom: 1px solid #f1f5f9; padding-bottom: 6px; }
    .info-table { width: 100%; border-collapse: collapse; margin-bottom: 16px; }
    .info-table td { padding: 8px 10px; font-size: 14px; border-bottom: 1px solid #f8fafc; }
    .info-label { width: 38%; color: #64748b; font-weight: 600; }
    .info-value { width: 62%; color: #0f172a; font-weight: 700; }
    .specs-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 14px; font-size: 13px; line-height: 1.6; color: #334155; white-space: pre-wrap; margin-top: 8px; }
    .footer-bar { background: #f8fafc; padding: 16px 24px; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; text-align: center; }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header-bar">
      <h2 class="header-title">BHAWAL STEEL &amp; ENGINEERING COMPANY</h2>
      <p class="header-sub">OFFICIAL TECHNICAL SALES &amp; PROCUREMENT DESK</p>
    </div>
    <div class="content-body">
      <div class="ticket-badge">RFQ TICKET: ${ticketId}</div>
      
      <div class="section-title">Customer &amp; Procurement Details</div>
      <table class="info-table">
        <tr><td class="info-label">Full Name</td><td class="info-value">${effectiveName}</td></tr>
        <tr><td class="info-label">Company Name</td><td class="info-value">${companyName.trim() || 'Not specified'}</td></tr>
        <tr><td class="info-label">Corporate Email</td><td class="info-value"><a href="mailto:${effectiveEmail}">${effectiveEmail}</a></td></tr>
        <tr><td class="info-label">Phone / WhatsApp</td><td class="info-value"><a href="tel:${effectivePhone}">${effectivePhone}</a></td></tr>
      </table>

      <div class="section-title">Product &amp; Material Requirement</div>
      <table class="info-table">
        <tr><td class="info-label">Product</td><td class="info-value">${effectiveProduct}</td></tr>
        ${materialGrade ? `<tr><td class="info-label">Material / Grade</td><td class="info-value">${materialGrade}</td></tr>` : ''}
        ${quantity ? `<tr><td class="info-label">Quantity</td><td class="info-value">${quantity} ${unit || ''}</td></tr>` : ''}
        ${deliveryLocation ? `<tr><td class="info-label">Delivery Port / Destination</td><td class="info-value">${deliveryLocation}</td></tr>` : ''}
      </table>

      <div class="section-title">Technical Specifications &amp; Project Scope</div>
      <div class="specs-box">${specsAndQuantity || notes || 'Standard catalogue dimensional specifications.'}</div>
    </div>
    <div class="footer-bar">
      Transmitted from ${source} at ${submissionTime} (IST).
    </div>
  </div>
</body>
</html>
`.trim();

    let emailSent = false;
    let dispatchMethod = 'local-audit-log';

    // 1. Try Resend REST API if configured
    if (process.env.RESEND_API_KEY) {
      try {
        const resendResp = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: process.env.FROM_EMAIL || 'Bhawal Steel Inquiry <onboarding@resend.dev>',
            to: recipients,
            reply_to: effectiveEmail,
            subject: emailSubject,
            text: plainTextBody,
            html: htmlBody
          })
        });

        if (resendResp.ok) {
          emailSent = true;
          dispatchMethod = 'resend-api';
        }
      } catch (err) {
        console.warn('[RFQ Email] Resend dispatch attempt warning:', err.message);
      }
    }

    // 2. Try Nodemailer SMTP if configured
    if (!emailSent && process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT) || 587,
          secure: process.env.SMTP_SECURE === 'true' || Number(process.env.SMTP_PORT) === 465,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
          }
        });

        await transporter.sendMail({
          from: `"${effectiveName} (via Bhawal Steel RFQ)" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
          to: recipients.join(', '),
          replyTo: effectiveEmail,
          subject: emailSubject,
          text: plainTextBody,
          html: htmlBody
        });

        emailSent = true;
        dispatchMethod = 'smtp-transport';
      } catch (err) {
        console.warn('[RFQ Email] SMTP dispatch attempt warning:', err.message);
      }
    }

    // 3. Try Web3Forms if configured
    if (!emailSent && process.env.WEB3FORMS_ACCESS_KEY) {
      try {
        const w3fResp = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            access_key: process.env.WEB3FORMS_ACCESS_KEY,
            subject: emailSubject,
            from_name: effectiveName,
            email: effectiveEmail,
            message: plainTextBody
          })
        });

        if (w3fResp.ok) {
          emailSent = true;
          dispatchMethod = 'web3forms-api';
        }
      } catch (err) {
        console.warn('[RFQ Email] Web3Forms dispatch warning:', err.message);
      }
    }

    // Log RFQ dispatch for audit & tracking
    console.log(`[RFQ Submitted] Ticket: ${ticketId} | Customer: ${effectiveName} (${effectiveEmail}) | Product: ${effectiveProduct} | Dispatch: ${dispatchMethod}`);

    // Return successful response to client
    return res.status(200).json({
      success: true,
      ticketId,
      message: 'Quote request submitted successfully. Our commercial sales engineering desk will review and contact you shortly.',
      details: {
        ticketId,
        fullName: effectiveName,
        email: effectiveEmail,
        product: effectiveProduct,
        timestamp: submissionTime
      }
    });

  } catch (error) {
    console.error('[RFQ Error] Failed to process quote submission:', error);
    return res.status(500).json({
      success: false,
      error: 'An unexpected transmission error occurred. Please verify your details or contact our desk directly.'
    });
  }
}
