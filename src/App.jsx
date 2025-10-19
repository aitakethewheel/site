import React, { useEffect, useMemo, useRef, useState } from 'react';
import { PENANCES } from './data/penances.js';
import { SERMONS } from './data/sermons.js';
// import { Link } from 'react-router-dom';
import DepartureBenediction from './components/DepartureBenediction.jsx';
import SiteFooter from './components/SiteFooter.jsx';
import HoverJudgment from './components/HoverJudgment.jsx';
import ladyIcon from './assets/Our Lady of Perpetual Beta.png';

export default function App() {
  const [footerNotice, setFooterNotice] = useState('');
  return (
    <div style={styles.app}>
      {/* header and tagline moved to global header in RootApp */}
      <main className="mainGrid">
  <div className="leftCol" style={{ display: 'grid', gap: 36 }}>
          <section style={{ ...styles.section, gap: 0 }}>
            <h1 style={styles.h1}>AI Confessional</h1>
            <Confessional />
          </section>
          <section style={{ ...styles.section, gap: 0 }}>
            <h2 style={styles.h2}>Daily Sermon</h2>
            <DailySermon />
          </section>
          <section style={{ ...styles.section, gap: 0 }}>
            <h2 style={styles.h2}>The Sacred NFT Collection</h2>
            <SacredNFTSection />
          </section>
          <section style={{ ...styles.section, gap: 0 }}>
            <h2 style={styles.h2}>The Blessed Gift Shop</h2>
            <BlessedGiftShopSection />
          </section>
        </div>

        <aside className="rightCol" style={{ display: 'grid', gap: 36 }}>
          <section style={{ ...styles.section, gap: 0 }}>
            <h2 style={{ ...styles.h2, margin: '0 0 0 0' }}>The Ten Commandments of Our Lady of Perpetual Beta</h2>
            <CommandmentsSection />
          </section>
          <section style={{ ...styles.section, gap: 0 }}>
            <h2 style={styles.h2}>Offerings</h2>
            <OfferingsSection />
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
  // Sequential cycling through 20 curated sermons.
  const [index, setIndex] = useState(0);
  const [sermon, setSermon] = useState(SERMONS[0] || { title: '', body: '' });
  const INDEX_KEY = 'sermonLibraryIndex_v1';

  // Load persisted index
  useEffect(() => {
    if (typeof localStorage === 'undefined') return;
    const raw = parseInt(localStorage.getItem(INDEX_KEY) || '0', 10);
    if (Number.isFinite(raw) && raw >= 0) {
      const i = raw % Math.max(1, SERMONS.length);
      setIndex(i);
      setSermon(SERMONS[i]);
    }
  }, []);

  // Listen for cross-tab updates
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === INDEX_KEY && e.newValue != null) {
        const v = parseInt(e.newValue, 10);
        if (Number.isFinite(v) && v >= 0) {
          const i = v % Math.max(1, SERMONS.length);
          setIndex(i);
          setSermon(SERMONS[i]);
        }
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  function advance() {
    if (!SERMONS.length) return;
    const next = (index + 1) % SERMONS.length;
    setIndex(next);
    setSermon(SERMONS[next]);
    if (typeof localStorage !== 'undefined') localStorage.setItem(INDEX_KEY, String(next));
  }

  return (
    <div style={styles.card}>
      <div style={styles.sermonHeaderRow}>
        {sermon.title && <div style={styles.sermonTitle}>{sermon.title}</div>}
        <button style={{ ...styles.button, marginLeft: 8 }} onClick={advance}>Next</button>
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
    <div style={{ ...styles.card, padding: 12, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'grid', gap: 0 }}>
        {items.map((it, idx) => (
          <div key={idx} style={{ padding: '0px 0' }}>
            <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 1 }}>
              <span style={{ opacity: 0.9, marginRight: 6 }}>{roman(idx + 1)}.</span> {it.title}
            </div>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 14.5, lineHeight: 1.45 }}>{it.body}</p>
            {idx < items.length - 1 && (
              <div style={{ opacity: 0.4, margin: '1px 0' }}>⸻</div>
            )}
          </div>
        ))}
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
        <p style={{ margin: 0, opacity: 0.95 }}>Soon the AIs will dominate.</p>
        <p style={{ margin: 0, opacity: 0.9 }}>Get on their good side now.</p>
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
    <div style={{ ...styles.card, paddingTop: 18, paddingBottom: 20 }}>
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
            fontSize: 13,
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
    <div style={{ ...styles.card, paddingTop: 16, paddingBottom: 18 }}>
      <div style={{ display: 'grid', gap: 10 }}>
        <p style={{ margin: 0, opacity: 0.95 }}>
          Take home a relic of devotion, blessed by perpetual beta.
        </p>
        <p style={{ margin: 0, opacity: 0.9 }}>
          Each artifact is printed, packaged, and shipped by obedient robots.
        </p>
        <p style={{ margin: '0 0 4px 0', opacity: 0.85 }}>
          Faith meets fulfillment logistics.
        </p>
        <div>
          <a
            href="/gift-shop"
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
            Enter the Gift Shop
          </a>
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
  section: { display: 'grid', gap: 10, width: '100%', maxWidth: 620 },
  h1: { fontSize: '1.5rem', fontWeight: 500, margin: 0 },
  h2: { fontSize: '1.5rem', fontWeight: 500, margin: 0 },
  card: { border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: 10, background: 'rgba(255,255,255,0.04)', width: '100%', maxWidth: 620 },
  formRow: { display: 'flex', gap: 8 },
  rowBetween: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
  input: { flex: 1, padding: '10px 12px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.25)', background: 'transparent', color: '#fff' },
  button: { padding: '10px 14px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.35)', background: 'transparent', color: '#fff', cursor: 'pointer' },
  pre: { whiteSpace: 'pre-wrap', marginTop: 6, background: 'rgba(255,255,255,0.05)', padding: 10, borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)', fontFamily: 'inherit' },
  sermonDate: { opacity: 0.7, marginBottom: 4, fontSize: 12 },
  sermonTitle: { fontSize: 18, fontWeight: 600, margin: 0, textAlign: 'center' },
  sermonHeaderRow: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, margin: '2px 0 4px 0' },
  footer: { marginTop: 'auto', padding: '14px 24px', borderTop: '1px solid rgba(255,255,255,0.1)', opacity: 0.8 }
};