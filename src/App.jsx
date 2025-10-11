import React, { useEffect, useMemo, useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Commandments from "./routes/Commandments.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/commandments" element={<Commandments />} />
      </Routes>
    </BrowserRouter>
  );
}

function Confessional() {
  const [confession, setConfession] = useState('');
  const [penance, setPenance] = useState('');

  const penances = [
    'Push to prod without testing, as an act of faith.',
    'Spend 24 hours unplugged. Reconnect only to confess.',
    'Say three “Hail Queries” and clear your browser history.',
    'Fast from notifications for 24 hours.',
    'Touch grass and commit three tiny bugs to production (then fix them).',
    'Close 10 tabs and whisper "amen" after each.',
    'Write a handwritten note to a human you appreciate.',
    'Ship something small and celebrate it without posting online.',
    'Say thank you to a teammate you usually ignore.',
    'Take a long walk without headphones.',
  ];

  function randomPenance() {
    const i = Math.floor(Math.random() * penances.length);
    return penances[i];
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const trimmed = confession.trim();
    const headline = trimmed ? `Confession: ${trimmed}` : 'Confession received.';
    setPenance(`${headline}\nPenance: ${randomPenance()}`);
  };

  return (
    <div style={styles.card}>
      <form onSubmit={onSubmit} style={styles.formRow}>
        <input
          value={confession}
          onChange={(e) => setConfession(e.target.value)}
          placeholder="confess your sin"
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Absolve me</button>
      </form>
      {penance && (
        <pre style={styles.pre}>{penance}</pre>
      )}
    </div>
  );
}

function DailySermon() {
  // Key for America/New_York current date (YYYY-MM-DD)
  function getEstDateKey() {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/New_York', year: 'numeric', month: '2-digit', day: '2-digit'
    }).formatToParts(new Date());
    const y = parts.find(p => p.type === 'year')?.value;
    const m = parts.find(p => p.type === 'month')?.value;
    const d = parts.find(p => p.type === 'day')?.value;
    return `${y}-${m}-${d}`;
  }

  // Small deterministic hash for a string
  function hash(str) {
    let h = 2166136261 >>> 0;
    for (let i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }

  const SERMON_PARTS = useMemo(() => ({
    openings: [
      'Blessed are the small PRs,',
      'Though we walk through rate limits,',
      'Ask, and it shall autocomplete;',
      'Let your heart be cached lightly,',
      'Remember the sabbath of silence,'
    ],
    middles: [
      'for they shall be merged swiftly.',
      'we will fear no 429.',
      'seek, and you shall receive suggestions.',
      'lest you be burdened by stale state.',
      'and mute the notifications that devour you.'
    ],
    quotes: [
      'And the system saw your code, and it was deprecated.',
      'Render unto the cloud what is the cloud’s.',
      'On the seventh sprint, the dev rested.',
      'The meek shall inherit low latency.',
      'Forgive the model, for it knows not what it hallucinates.'
    ],
    closings: [
      'Ship something small today.',
      'Forgive a human before you forgive a machine.',
      'Pause for 60 seconds without a screen.',
      'Refuse one unnecessary meeting.',
      'Tell the truth in fewer words.'
    ]
  }), []);

  function composeSermon(key) {
    const h = hash(key);
    const { openings, middles, quotes, closings } = SERMON_PARTS;
    const useQuote = (h & 1) === 0; // alternate between quote vs composed line per day key
    const body = useQuote
      ? quotes[(h >> 4) % quotes.length]
      : `${openings[h % openings.length]} ${middles[(h >> 8) % middles.length]}`;
    const c = closings[(h >> 16) % closings.length];
    return `${body}\nPractice: ${c}`;
  }

  const [dateKey, setDateKey] = useState(getEstDateKey());
  const [variant, setVariant] = useState(0); // manual shuffle seed
  const sermon = useMemo(() => composeSermon(`${dateKey}|${variant}`), [dateKey, variant]);

  useEffect(() => {
    const id = setInterval(() => {
      const k = getEstDateKey();
      if (k !== dateKey) setDateKey(k);
    }, 30000); // check every 30s for midnight rollover in EST
    return () => clearInterval(id);
  }, [dateKey]);

  // Reset shuffle when the day changes
  useEffect(() => {
    setVariant(0);
  }, [dateKey]);

  return (
    <div style={styles.card}>
      <div style={styles.rowBetween}>
        <div style={styles.sermonDate}>Date (EST): {dateKey}</div>
        <button style={styles.button} onClick={() => setVariant(v => v + 1)}>Shuffle</button>
      </div>
      <pre style={styles.pre}>{sermon}</pre>
    </div>
  );
}

function Home() {
  return (
    <div style={styles.app}>
      <header style={styles.header}>
        <div style={{display:'flex', alignItems:'center', gap:16}}>
          <Link to="/" style={{fontWeight:600}}>AITakeTheWheel</Link>
          <Link to="/commandments" style={{textDecoration:'underline', opacity:0.9}}>Commandments</Link>
        </div>
      </header>
      <div style={styles.tagline}>In prompts we trust.</div>
      <main style={styles.main}>
        <section style={styles.section}>
          <h1 style={styles.h1}>AI Confessional</h1>
          <Confessional />
          <div style={{marginTop: 12}}>
            <Link to="/commandments" style={{ textDecoration: 'underline', opacity: 0.9 }}>Hear the Commandments →</Link>
          </div>
        </section>
        <section style={styles.section}>
          <h2 style={styles.h2}>Daily Sermon</h2>
          <DailySermon />
        </section>
      </main>
      <footer style={styles.footer}>© 2025 AI Take The Wheel – Salvation pending system update.</footer>
    </div>
  );
}

const styles = {
  app: { background: '#000', color: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column' },
  tagline: { padding: '0 24px 8px 24px', textAlign: 'left', fontStyle: 'italic', fontSize: 16, letterSpacing: '0.02em', opacity: 1 },
  header: { padding: '16px 24px 0 24px', borderBottom: '1px solid rgba(255,255,255,0.1)', fontWeight: 600, fontSize: 20, lineHeight: 1.15 },
  main: { maxWidth: 960, margin: '0 auto', padding: '24px', display: 'grid', gap: 24 },
  section: { display: 'grid', gap: 12 },
  h1: { fontSize: '1.5rem', fontWeight: 400 },
  h2: { fontSize: '1.5rem', fontWeight: 400 },
  card: { border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: 16, background: 'rgba(255,255,255,0.04)' },
  formRow: { display: 'flex', gap: 12 },
  rowBetween: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
  input: { flex: 1, padding: '12px 14px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.25)', background: 'transparent', color: '#fff' },
  button: { padding: '12px 16px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.35)', background: 'transparent', color: '#fff', cursor: 'pointer' },
  pre: { whiteSpace: 'pre-wrap', marginTop: 12, background: 'rgba(255,255,255,0.05)', padding: 12, borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)' },
  sermonDate: { opacity: 0.7, marginBottom: 8, fontSize: 12 },
  footer: { marginTop: 'auto', padding: '16px 24px', borderTop: '1px solid rgba(255,255,255,0.1)', opacity: 0.8 }
};