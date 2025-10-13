// Vercel serverless function to create a Coinbase Commerce charge
// Note: Do NOT hardcode API keys. Use environment variables in deployment.

async function readJsonBody(req) {
  try {
    if (req.body) {
      return typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body;
    }
    // Fallback: read stream
    const raw = await new Promise((resolve, reject) => {
      let data = '';
      req.on('data', (chunk) => { data += chunk; });
      req.on('end', () => resolve(data));
      req.on('error', reject);
    });
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.COINBASE_COMMERCE_API_KEY;
  if (!apiKey) {
    console.error('[create-charge] Missing COINBASE_COMMERCE_API_KEY');
    return res.status(500).json({ error: 'Missing COINBASE_COMMERCE_API_KEY env var' });
  }

  const body = await readJsonBody(req);
  console.info('[create-charge] Request received', {
    hasKey: true,
    amount: body?.amount,
    currency: body?.currency,
    name: body?.name
  });
  const { amount = 5, currency = 'USD', name = 'Offering', description = 'A humble tithe.' } = body || {};

  try {
    const r = await fetch('https://api.commerce.coinbase.com/charges', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CC-Api-Key': apiKey,
        'X-CC-Version': '2018-03-22',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name,
        description,
        pricing_type: 'fixed_price',
        local_price: { amount: String(amount), currency }
      })
    });

    if (!r.ok) {
      const text = await r.text();
      console.error('[create-charge] Coinbase API error', { status: r.status, body: text.slice(0, 500) });
      return res.status(r.status).json({ error: 'Coinbase API error', details: text });
    }

    let data;
    try { data = await r.json(); } catch { data = null; }
    const hosted_url = data?.data?.hosted_url;
    console.info('[create-charge] Success', { hosted_url_present: !!hosted_url });
    return res.status(200).json({ hosted_url, raw: data });
  } catch (err) {
    console.error('[create-charge] Server error', { error: String(err), stack: err?.stack });
    return res.status(500).json({ error: 'Server error', details: String(err) });
  }
}
