/* eslint-env node */
// Server-side proxy to fetch Reddit JSON for r/aitakethewheel.
// This avoids CORS and client-side blocking by making the request from the server.
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const REDDIT_URL = 'https://www.reddit.com/r/aitakethewheel/.json';

  try {
    const upstream = await fetch(REDDIT_URL, {
      headers: {
        // A simple, honest user-agent helps some upstreams differentiate bot traffic.
        'User-Agent': 'AITakeTheWheel/1.0 (+https://aitakethewheel.com)'
      }
    });

    const body = await upstream.text();

    // Try to parse JSON; if parsing fails, return a 502 with a short snippet so the client can show a friendly message.
    try {
      const json = JSON.parse(body);
      // Cache on the CDN for a short period to reduce requests to Reddit.
      res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=30');
      return res.status(200).json(json);
    } catch (err) {
      console.warn('[api/reddit] Upstream did not return JSON', { status: upstream.status });
      return res.status(502).json({ error: 'Upstream did not return JSON', status: upstream.status, snippet: body.slice(0, 1024) });
    }
  } catch (err) {
    console.error('[api/reddit] Fetch error', { error: String(err) });
    return res.status(500).json({ error: 'Server error', details: String(err) });
  }
}
