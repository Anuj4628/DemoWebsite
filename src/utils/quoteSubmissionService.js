import { brandDetails } from '../data/navigationData';

/**
 * Centralized Quote & RFQ Submission Service
 * Triggers direct mailto: action with prefilled recipient, subject, and formatted enquiry body.
 */
export async function submitQuoteRequest(quotePayload) {
  try {
    const recipient = brandDetails.contact.email;
    const productName = quotePayload.product || quotePayload.productName || 'Steel Products';
    const subject = `Get Quote Enquiry - ${productName}`;

    const lines = [
      `Name: ${quotePayload.fullName || ''}`,
      `Company: ${quotePayload.companyName || quotePayload.company || ''}`,
      `Email: ${quotePayload.email || ''}`,
      `Phone: ${quotePayload.phone || ''}`,
      `Product: ${productName}`,
      `Quantity: ${quotePayload.quantity || quotePayload.specsAndQuantity || 'Standard requirement'}`,
      `Message: ${quotePayload.notes || quotePayload.specsAndQuantity || 'Please provide quotation and technical details.'}`
    ];

    const body = lines.join('\n');
    const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(recipient)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    const gmailWindow = window.open(gmailUrl, '_blank');

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

    return {
      success: true,
      message: 'Email client opened.'
    };
  } catch (err) {
    console.error('[Quote Submission Error]:', err);
    return {
      success: false,
      error: 'Unable to open mail client.'
    };
  }
}

