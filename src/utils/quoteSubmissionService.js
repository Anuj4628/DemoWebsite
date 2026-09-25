/**
 * Centralized Quote & RFQ Submission Service
 * Direct backend submission without opening external mail applications or Gmail.
 */

export async function submitQuoteRequest(quotePayload) {
  try {
    const response = await fetch('/api/send-quote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(quotePayload)
    });

    let data;
    try {
      data = await response.json();
    } catch {
      data = null;
    }

    if (!response.ok || !data?.success) {
      const errorMsg = data?.error || `Server responded with status ${response.status}. Please retry or contact our desk.`;
      return {
        success: false,
        error: errorMsg
      };
    }

    return {
      success: true,
      ticketId: data.ticketId,
      message: data.message || 'Quote request sent successfully.',
      details: data.details
    };
  } catch (err) {
    console.error('[Quote Submission Error]:', err);
    return {
      success: false,
      error: 'Unable to reach the procurement transmission server. Please check your internet connection and retry.'
    };
  }
}
