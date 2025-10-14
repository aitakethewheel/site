/* eslint-env node */
export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const coinbaseConfigured = !!(globalThis.process && globalThis.process.env && globalThis.process.env.COINBASE_COMMERCE_API_KEY);
  return res.status(200).json({ ok: true, coinbaseConfigured });
}
