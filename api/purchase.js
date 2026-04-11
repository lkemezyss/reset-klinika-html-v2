const crypto = require('crypto');

// SHA-256 hash helper
function sha256(value) {
  if (!value) return null;
  return crypto.createHash('sha256').update(value.toLowerCase().trim()).digest('hex');
}

export default async function handler(req, res) {
  // CORS headers - restrict to allowed origins
  const allowedOrigins = [
    'https://reset-klinika.vercel.app',
    'https://resetklinika.lt',
    'http://localhost:3000'
  ];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, fbp, fbc, event_id, source_url } = req.body;

  const PIXEL_ID = process.env.META_PIXEL_ID;
  const ACCESS_TOKEN = process.env.META_CAPI_ACCESS_TOKEN;

  if (!PIXEL_ID || !ACCESS_TOKEN) {
    console.error('Missing META_PIXEL_ID or META_CAPI_ACCESS_TOKEN');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  // Build user_data object
  const user_data = {};

  if (email) {
    user_data.em = [sha256(email)];
  }
  if (fbp) {
    user_data.fbp = fbp;
  }
  if (fbc) {
    user_data.fbc = fbc;
  }

  // Get client IP from headers (Vercel provides this)
  const clientIp = req.headers['x-forwarded-for']?.split(',')[0] || req.headers['x-real-ip'];
  if (clientIp) {
    user_data.client_ip_address = clientIp;
  }

  // Get user agent
  const userAgent = req.headers['user-agent'];
  if (userAgent) {
    user_data.client_user_agent = userAgent;
  }

  // Build the event
  const event = {
    event_name: 'Purchase',
    event_time: Math.floor(Date.now() / 1000),
    event_id: event_id,
    event_source_url: source_url || 'https://resetklinika.lt/success.html',
    action_source: 'website',
    user_data: user_data,
    custom_data: {
      currency: 'EUR',
      value: 57.00
    }
  };

  const payload = {
    data: [event]
  };

  try {
    const response = await fetch(
      `https://graph.facebook.com/v18.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.error('Meta CAPI error:', result);
      return res.status(response.status).json({ error: 'Meta API error', details: result });
    }

    return res.status(200).json({ success: true, events_received: result.events_received });
  } catch (error) {
    console.error('CAPI request failed:', error);
    return res.status(500).json({ error: 'Failed to send event' });
  }
}
