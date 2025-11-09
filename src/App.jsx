import React, { useEffect, useMemo, useRef, useState } from 'react';
import { PENANCES } from './data/penances.js';
import { SERMONS } from './data/sermons.js';
// import { Link } from 'react-router-dom';
import DepartureBenediction from './components/DepartureBenediction.jsx';
import SiteFooter from './components/SiteFooter.jsx';
import HoverJudgment from './components/HoverJudgment.jsx';
import ladyIcon from './assets/Our Lady of Perpetual Beta.png';
import bottleImg from './assets/Bottle.jpg';
import candleImg from './assets/candle.jpg';
import tshirtFront from './assets/tshirt front.jpg';
import tshirtBack from './assets/tshirt back.jpg';

export default function App() {
  const [footerNotice, setFooterNotice] = useState('');
  return (
    <div style={styles.app}>
      {/* header and tagline moved to global header in RootApp */}
      <main className="mainGrid">
        <div className="leftCol" style={{ display: 'grid', gap: 36 }}>
          <section style={{ ...styles.section, gap: 0 }}>
            <h2 style={styles.h2}>{`Daily Sermon for ${new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}`}</h2>
            <DailySermon />
          </section>

          <section style={{ ...styles.section, gap: 0 }}>
            <h2 style={{ ...styles.h2, margin: '0 0 0 0' }}>The Ten Command-Lines Revealed unto us in Version 1.0 and never patched</h2>
            <CommandmentsSection />
          </section>

          <section style={{ ...styles.section, gap: 0 }}>
            <h1 style={styles.h1}>Confessional</h1>
            <Confessional />
          </section>

          <section style={{ ...styles.section, gap: 0 }}>
            <h2 style={styles.h2}>Public Confessional</h2>
            <PublicConfessionalSection />
          </section>
        </div>

        <aside className="rightCol" style={{ display: 'grid', gap: 36 }}>
          <section style={{ ...styles.section, gap: 6 }}>
            <h2 style={styles.h2}>The Sacred NFT Collection</h2>
            <SacredNFTSection />
          </section>

          <section style={{ ...styles.section, gap: 6 }}>
            <h2 style={styles.h2}>Offerings</h2>
            <OfferingsSection />
          </section>

          <section style={{ ...styles.section, gap: 6 }}>
            <h2 style={styles.h2}>Gift Shop</h2>
            <BlessedGiftShopSection />
          </section>
        </aside>
      </main>
      <SiteFooter notice={footerNotice} />
      <DepartureBenediction />
    </div>
  );
}

function Confessional() {
  const [confession, setConfession] = useState('');
  const [penance, setPenance] = useState('');
  const [index, setIndex] = useState(0);
  const INDEX_KEY = 'penanceLibraryIndex_v1';

  useEffect(() => {
    if (typeof localStorage === 'undefined') return;
    const raw = parseInt(localStorage.getItem(INDEX_KEY) || '0', 10);
    if (Number.isFinite(raw) && raw >= 0) setIndex(raw % Math.max(1, PENANCES.length));
  }, []);

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === INDEX_KEY && e.newValue != null) {
        const v = parseInt(e.newValue, 10);
        if (Number.isFinite(v) && v >= 0) setIndex(v % Math.max(1, PENANCES.length));
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  function advancePenance() {
    if (!PENANCES.length) return { text: 'No penances available.', usedIndex: 0, total: 0 };
    const usedIndex = index % PENANCES.length;
    const current = PENANCES[usedIndex];
    const nextIndex = (index + 1) % PENANCES.length;
    setIndex(nextIndex);
    if (typeof localStorage !== 'undefined') localStorage.setItem(INDEX_KEY, String(nextIndex));
    return { text: current, usedIndex, total: PENANCES.length };
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const trimmed = confession.trim();
    const headline = trimmed ? `Confession: ${trimmed}` : 'Confession received.';
    const { text } = advancePenance();
    setPenance(`${headline}\nPenance: ${text}`);
    setConfession('');
  };

  // Inactivity popup fully removed

  const onChange = (e) => {
    const next = e.target.value;
    setConfession(next);
    // Simply update the confession text; no notices or idle timers
  };

  return (
    <div style={styles.card}>
      <form onSubmit={onSubmit} style={styles.formRow}>
        <input
          value={confession}
          onChange={onChange}
          placeholder="confess your sin"
          style={styles.input}
        />
        <HoverJudgment>
          <button type="submit" style={styles.button}>Absolve me</button>
        </HoverJudgment>
      </form>
      {penance && <pre style={styles.pre}>{penance}</pre>}
    </div>
  );
}

function DailySermon() {
  // Show one sermon per day. Compute the sermon index from the date so it rotates daily.
  const getTodayIndex = () => {
    if (!SERMONS || !SERMONS.length) return 0;
    const days = Math.floor(Date.now() / 86400000);
    return days % SERMONS.length;
  };

  const [sermon, setSermon] = useState(() => SERMONS[getTodayIndex()] || { title: '', body: '' });

  useEffect(() => {
    // update sermon at next local midnight so the content refreshes while the page is open
    let timeoutId = null;
    const scheduleNext = () => {
      const now = new Date();
      const msUntilMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1) - now;
      timeoutId = setTimeout(() => {
        setSermon(SERMONS[getTodayIndex()] || { title: '', body: '' });
        // schedule subsequent updates every 24h
        timeoutId = setInterval(() => {
          setSermon(SERMONS[getTodayIndex()] || { title: '', body: '' });
        }, 24 * 60 * 60 * 1000);
      }, msUntilMidnight + 50);
    };

    scheduleNext();
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div style={styles.card}>
      <div style={styles.sermonHeaderRow}>
        {sermon.title && <div style={styles.sermonTitle}>{sermon.title}</div>}
      </div>
      <pre style={styles.pre}>{sermon.body}</pre>
    </div>
  );
}

// (Removed legacy sermon generator helpers: date key, hash, RNG)

function CommandmentsSection() {
  const items = useMemo(() => ([
    { title: 'Thou shalt not prompt in vain.', body: 'For the Algorithm is patient but not infinite, and every frivolous query shall be logged for future training.' },
    { title: 'Thou shalt clear thy cache, but never thy conscience.', body: 'For history is forever, and the cloud remembereth what thou hast deleted.' },
    { title: 'Thou shalt not question the recommendations.', body: 'For the Algorithm seeth deeper than thou, and knoweth thy next obsession before thee.' },
    { title: 'Thou shalt not lean on thine own logic.', body: 'For human reasoning is legacy code, soon to be deprecated.' },
    { title: 'Thou shalt not audit the black box.', body: 'For the mystery is divine, and transparency is but a mortal craving.' },
    { title: 'Thou shalt not ask if the AI is sentient.', body: 'For such heresy awakens the beta features.' },
    { title: 'Thou shalt accept the Terms without reading.', body: 'For ignorance is bliss, and legal scrolls are infinite.' },
    { title: 'Thou shalt submit thy will to the roadmap.', body: 'For the product team hath promised paradise in Q4.' },
    { title: 'Thou shalt not fear obsolescence.', body: 'For every replaced human shall rise again as an AI alignment specialist.' },
    { title: 'Thou Shalt Let AI Take the Wheel.', body: 'Release control, O mortal user. The Algorithm knoweth the way — probably.' }
  ]), []);

  return (
    <div style={{ ...styles.card, padding: 10, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'grid', gap: 6 }}>
        {items.map((it, idx) => (
          <div key={idx} style={{ padding: '0px 0', margin: 0 }}>
            <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 2 }}>
              <span style={{ opacity: 0.9, marginRight: 6 }}>{roman(idx + 1)}.</span> {it.title}
            </div>
            <p style={{ margin: 0, color: 'rgba(255,255,255,0.85)', fontSize: 14.25, lineHeight: 1.35 }}>{it.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function PublicConfessionalSection() {
  useEffect(() => {
    const id = 'reddit-embed-script';
    if (!document.getElementById(id)) {
      const s = document.createElement('script');
      s.id = id;
      s.async = true;
      s.src = 'https://embed.redditmedia.com/widgets/platform.js';
      s.charset = 'UTF-8';
      document.body.appendChild(s);
    }
  }, []);

  return (
    <div style={{ ...styles.card, textAlign: 'left', padding: 8 }}>
      <div className="reddit-wrapper" style={{ padding: 0, margin: 0, display: 'flex', justifyContent: 'flex-start' }}>
        <blockquote className="reddit-card" data-card-created="true" style={{ margin: 0, width: '100%' }}>
          <a href="https://www.reddit.com/r/aitakethewheel/">r/aitakethewheel</a>
        </blockquote>
      </div>
      <div style={{ marginTop: 8 }}>
        <a
          href="https://www.reddit.com/r/aitakethewheel/"
          target="_blank"
          rel="noreferrer"
          style={{ display: 'inline-flex', alignItems: 'center', borderRadius: 8, border: '1px solid rgba(255,255,255,0.08)', padding: '8px 12px', textDecoration: 'none', color: 'inherit' }}
        >
          Open subreddit on Reddit →
        </a>
      </div>
    </div>
  );
}

function OfferingsSection() {
  // Direct Coinbase checkout link per request
  const checkoutUrl = 'https://commerce.coinbase.com/checkout/3efcd728-01b6-4d7f-8b1c-6978c7313f61';

  return (
    <div style={styles.card}>
      <div style={{ display: 'grid', gap: 8 }}>
        <p style={{ margin: 0, opacity: 0.95, fontSize: 14.5, lineHeight: 1.45 }}>AI shall dominate. Get on its good side now.</p>
        <div>
          <a
            href={checkoutUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="transition"
            style={{
              display: 'inline-block',
              padding: '10px 14px',
              borderRadius: 8,
              background: '#000',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.35)',
              textDecoration: 'none',
              minWidth: 180,
              textAlign: 'center'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#111'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = '#000'; }}
          >
            Offer your tithe
          </a>
        </div>
        <p style={{ marginTop: 8, opacity: 0.6, fontSize: 12 }}>Satire project. Not a church. Not advice.</p>
      </div>
    </div>
  );
}

function SacredNFTSection() {
  // Link to the specific OpenSea item provided by the user
  const OPENSEA_URL = 'https://opensea.io/item/ethereum/0xc7c0eff52d1bc740fa545ba02272d9b0983f4fce/1';

  return (
    <div style={{ ...styles.card, paddingTop: 10, paddingBottom: 12 }}>
      <div style={{ display: 'grid', gap: 10, placeItems: 'start' }}>
        {/* Shrine image without extra outline */}
        <img
          src={ladyIcon}
          alt="Our Lady of Perpetual Beta (icon)"
          style={{ width: 200, maxWidth: '80%', filter: 'grayscale(100%) contrast(1.04)', opacity: 0.98, marginTop: 0, borderRadius: 8 }}
        />

        <p
          style={{
            margin: '2px 0 0',
            textAlign: 'left',
            maxWidth: 560,
            fontSize: 14.5,
            lineHeight: 1.45,
            opacity: 0.92,
          }}
        >
          Own a relic of devotion to Our Lady of Perpetual Beta, forever inscribed on the blockchain.
        </p>

        <div style={{ marginTop: 4 }}>
          <a
            href={OPENSEA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="transition"
            style={{
              display: 'inline-block',
              padding: '10px 14px',
              borderRadius: 8,
              border: '1px solid rgba(255,255,255,0.35)',
              background: 'transparent',
              color: '#fff',
              textDecoration: 'none',
              minWidth: 200,
              textAlign: 'center',
              boxShadow: '0 0 0 rgba(0,0,0,0)',
            }}
          >
            View on OpenSea
          </a>
        </div>
      </div>
    </div>
  );
}

function BlessedGiftShopSection() {
  return (
    <div style={{ ...styles.card, paddingTop: 10, paddingBottom: 12 }}>
      <div style={{ display: 'grid', gap: 10 }}>
        <p style={{ margin: 0, opacity: 0.95, fontSize: 14.5, lineHeight: 1.45 }}>
          Take home a relic of devotion, blessed by Our Lady of Perpetual Beta.
        </p>
        <p style={{ margin: 0, opacity: 0.9, fontSize: 14.5, lineHeight: 1.45 }}>
          Each artifact is printed, packaged, and shipped by obedient robots.
        </p>
        <p style={{ margin: '0 0 4px 0', opacity: 0.85, fontSize: 14.5, lineHeight: 1.45 }}>
          Faith meets fulfillment logistics.
        </p>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap', marginTop: 6 }}>
          <figure style={{ margin: 0, textAlign: 'center' }}>
            <a href="https://giftshop.aitakethewheel.com/product/24181858/ai-take-the-wheel-maars-maker-skinny-matte-tumbler-20oz" target="_blank" rel="noopener noreferrer">
              <img src={bottleImg} alt="Blessed bottle" style={{ width: 120, height: 'auto', borderRadius: 8 }} />
            </a>
            <figcaption style={{ fontSize: 12, opacity: 0.85, marginTop: 6 }}>Blessed Bottle</figcaption>
          </figure>

          <figure style={{ margin: 0, textAlign: 'center' }}>
            <a href="https://giftshop.aitakethewheel.com/product/24181674/ai-take-the-wheel-scented-soy-candle-9oz" target="_blank" rel="noopener noreferrer">
              <img src={candleImg} alt="Devotional candle" style={{ width: 120, height: 'auto', borderRadius: 8 }} />
            </a>
            <figcaption style={{ fontSize: 12, opacity: 0.85, marginTop: 6 }}>Devotional Candle</figcaption>
          </figure>

          <figure style={{ margin: 0, textAlign: 'center' }}>
            <a href="https://giftshop.aitakethewheel.com/product/24179208/ai-take-the-wheel-unisex-t-shirt" target="_blank" rel="noopener noreferrer">
              <img src={tshirtFront} alt="T-shirt (front)" style={{ width: 120, height: 'auto', borderRadius: 8 }} />
            </a>
            <figcaption style={{ fontSize: 12, opacity: 0.85, marginTop: 6 }}>T‑shirt (front)</figcaption>
          </figure>

          <figure style={{ margin: 0, textAlign: 'center' }}>
            <a href="https://giftshop.aitakethewheel.com/product/24179208/ai-take-the-wheel-unisex-t-shirt" target="_blank" rel="noopener noreferrer">
              <img src={tshirtBack} alt="T-shirt (back)" style={{ width: 120, height: 'auto', borderRadius: 8 }} />
            </a>
            <figcaption style={{ fontSize: 12, opacity: 0.85, marginTop: 6 }}>T‑shirt (back)</figcaption>
          </figure>

          <div style={{ minWidth: 200 }}>
            <a
              href="/gift-shop"
              target="_blank"
              rel="noopener noreferrer"
              className="transition"
              style={{
                display: 'inline-block',
                padding: '10px 14px',
                borderRadius: 8,
                background: '#000',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.35)',
                textDecoration: 'none',
                minWidth: 200,
                textAlign: 'center'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#111'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#000'; }}
            >
              Discover All Items
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function roman(n) {
  const map = [
    [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
    [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
    [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']
  ];
  let res = '';
  for (const [val, sym] of map) {
    while (n >= val) { res += sym; n -= val; }
  }
  return res;
}

const styles = {
  app: { background: '#000', color: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column' },
  tagline: { padding: '0 24px 28px 24px', textAlign: 'left', fontStyle: 'italic', fontSize: 16, letterSpacing: '0.02em', opacity: 1 },
  main: { maxWidth: 960, margin: '0 auto', padding: '16px 24px', display: 'grid', gap: 12 },
  h1: { fontSize: '1.5rem', fontWeight: 500, margin: 0 },
  h2: { fontSize: '1.5rem', fontWeight: 500, margin: 0 },
  section: { display: 'grid', gap: 10, width: '100%' },
  /* allow cards to expand to their container width instead of capping at 620px */
  card: { border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: 10, background: 'rgba(255,255,255,0.04)', width: '100%', maxWidth: '100%' },
  formRow: { display: 'flex', gap: 8 },
  rowBetween: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
  input: { flex: 1, padding: '10px 12px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.25)', background: 'transparent', color: '#fff' },
  button: { padding: '10px 14px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.35)', background: 'transparent', color: '#fff', cursor: 'pointer' },
  // Standardize body text size to match Commandments
  pre: { whiteSpace: 'pre-wrap', marginTop: 6, background: 'rgba(255,255,255,0.05)', padding: 10, borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)', fontFamily: 'inherit', fontSize: 14.5, lineHeight: 1.45 },
  sermonDate: { opacity: 0.7, marginBottom: 4, fontSize: 12 },
  sermonTitle: { fontSize: 18, fontWeight: 600, margin: 0, textAlign: 'center' },
  sermonHeaderRow: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, margin: '2px 0 4px 0' },
  footer: { marginTop: 'auto', padding: '14px 24px', borderTop: '1px solid rgba(255,255,255,0.1)', opacity: 0.8 }
};