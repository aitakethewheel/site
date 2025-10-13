import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

export default function App() {
  return (
    <div style={styles.app}>
      <header style={styles.header}>
        <div style={styles.headerRow}>
          <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>AITakeTheWheel</Link>
          {/* Link moved to footer per request */}
        </div>
      </header>
      <div style={styles.tagline}>In prompts we trust.</div>
      <main className="mainGrid">
        <div className="leftCol" style={{ display: 'grid', gap: 6 }}>
          <section style={{ ...styles.section, gap: 2 }}>
            <h1 style={styles.h1}>AI Confessional</h1>
            <Confessional />
          </section>
          <section style={{ ...styles.section, gap: 2 }}>
            <h2 style={styles.h2}>Daily Sermon</h2>
            <DailySermon />
          </section>
          <section style={{ ...styles.section, gap: 2 }}>
            <h2 style={styles.h2}>Offerings</h2>
            <OfferingsSection />
          </section>
        </div>

        <aside className="rightCol">
          <section style={styles.section}>
            <h2 style={{ ...styles.h2, fontSize: '1.25rem', margin: '0 0 4px 0' }}>The Ten Commandments of Our Lady of Perpetual Beta</h2>
            <CommandmentsSection />
          </section>
        </aside>
      </main>
      <footer style={styles.footer}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
          <div style={{ opacity: 0.85 }}>© 2025 AI Take The Wheel – Salvation pending system update.</div>
          <Link to="/patchnotes" style={{ color: 'rgba(255,255,255,0.85)', textDecoration: 'underline' }}>Blessed Patch Notes</Link>
        </div>
      </footer>
    </div>
  );
}

function Confessional() {
  const [confession, setConfession] = useState('');
  const [penance, setPenance] = useState('');
  const [counter, setCounter] = useState(0);
  const [seenHashes, setSeenHashes] = useState([]);

  const COUNTER_KEY = 'penanceCounter_v1';
  const SEEN_KEY = 'penanceSeenHashes_v1';
  const MAX_SEEN = 4096; // rolling window to avoid repeats for a long time

  // Load persisted state
  useEffect(() => {
    if (typeof localStorage === 'undefined') return;
    const c = parseInt(localStorage.getItem(COUNTER_KEY) || '0', 10);
    setCounter(Number.isFinite(c) && c >= 0 ? c : 0);
    try {
      const s = JSON.parse(localStorage.getItem(SEEN_KEY) || '[]');
      if (Array.isArray(s)) setSeenHashes(s.filter(n => Number.isFinite(n)));
    } catch {}
  }, []);

  // Sync across tabs
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === COUNTER_KEY && e.newValue != null) {
        const v = parseInt(e.newValue, 10);
        if (Number.isFinite(v) && v >= 0) setCounter(v);
      }
      if (e.key === SEEN_KEY && e.newValue != null) {
        try {
          const s = JSON.parse(e.newValue);
          if (Array.isArray(s)) setSeenHashes(s.filter(n => Number.isFinite(n)));
        } catch {}
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  function persist(counterVal, seenArr) {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem(COUNTER_KEY, String(counterVal));
    localStorage.setItem(SEEN_KEY, JSON.stringify(seenArr));
  }

  function loadPersisted() {
    if (typeof localStorage === 'undefined') {
      return { counter, seen: seenHashes };
    }
    const c = parseInt(localStorage.getItem(COUNTER_KEY) || '0', 10);
    let s = [];
    try {
      const raw = JSON.parse(localStorage.getItem(SEEN_KEY) || '[]');
      if (Array.isArray(raw)) s = raw.filter(n => Number.isFinite(n));
    } catch {}
    return { counter: Number.isFinite(c) && c >= 0 ? c : 0, seen: s };
  }

  function generatePenance(seed, confessionText) {
    const rng = makeRng(hash(`${seed}|${confessionText || ''}|PENANCE_GEN`));
    const pick = (arr) => arr[Math.floor(rng() * arr.length)];
    const n = 1 + Math.floor(rng() * 3);
    const units = ['hour', 'day', 'week'];
    const unit = pick(units);
    const plural = (k, u) => (k === 1 ? u : `${u}s`);

    const tasks = [
      'rewrite', 'optimize', 'audit', 'schedule', 'choose', 'compose', 'curate', 'summarize', 'storyboard', 'prioritize',
      'prototype', 'refactor', 'de-clutter', 'batch', 'automate', 'delegate', 'document', 'simulate', 'triage', 'ship'
    ];
    const objects = [
      'your next email', 'your grocery list', 'your calendar', 'your workout', 'your outfit', 'your playlist', 'your reading list', 'your bio', 'your budget', 'your apology',
      'your morning routine', 'your desk', 'your week plan', 'your bedtime', 'your socials', 'your tabs', 'your notes', 'your priorities', 'your meals', 'your errands'
    ];
    const constraints = [
      'even if it sounds uncomfortably formal',
      'even if it chooses chaos',
      'even if it suggests quinoa again',
      'even if it recommends a turtleneck and shorts',
      'even if it picks ambient whale songs',
      'even if the vibe is “startup HR email”',
      'even if it feels mildly embarrassing',
      'even if your friends ask questions',
      'even if you suspect it is trolling you',
      'even if it means fewer choices for you'
    ];
    const rationales = [
      'Call it an experiment.', 'Treat it as penance.', 'Consider it user testing.', 'Blame the algorithm and proceed.', 'Offer no further context.',
      'Name the friction and step through.', 'You are outsourcing your pride for a moment.', 'This is practice for surrender.'
    ];
    const closers = [
      'Own your truth.', 'Redemption is cumulative.', 'Grace prefers momentum.', 'Humility is the feature, not the bug.', 'Obedience ships faster than pride.',
      'Silence the inner committee and act.', 'You can be embarrassed and obedient at once.', 'Take the long walk; it counts.'
    ];

    const frames = [
      () => `Ask AI to ${pick(tasks)} ${pick(objects)}. Use it verbatim, ${pick(constraints)}. ${pick(rationales)} ${pick(closers)}`,
      () => `Let AI ${pick(tasks)} ${pick(objects)} for the next ${n} ${plural(n, unit)}. Commit fully — ${pick(constraints)} ${pick(closers)}`,
      () => `Consult AI about your confession${confessionText ? ` “${confessionText}”` : ''} and accept the first suggestion without edits. ${pick(rationales)} ${pick(closers)}`,
      () => `Have AI ${pick(tasks)} ${pick(objects)} and execute it exactly, then tell one friend you are “iterating in public.” ${pick(closers)}`,
      () => `Ask AI to ${pick(tasks)} ${pick(objects)} using only three bullet points. Ship the result today. ${pick(closers)}`
    ];
    return pick(frames)();
  }

  function nextUniquePenance(confessionText) {
    // Read freshest persisted values to avoid race conditions across tabs/rapid clicks
    const persisted = loadPersisted();
    let base = persisted.counter;
    const seenArr = persisted.seen;
    const seen = new Set(seenArr);
    for (let attempt = 0; attempt < 64; attempt++) {
      const candidate = generatePenance(base + attempt, confessionText);
      const h = hash(candidate);
      if (!seen.has(h)) {
        const newCounter = base + attempt + 1;
        const newSeen = [...seenArr, h].slice(-MAX_SEEN);
        // Persist first to make the claim durable across tabs
        persist(newCounter, newSeen);
        // Reflect in local state
        setCounter(newCounter);
        setSeenHashes(newSeen);
        return candidate;
      }
    }
    // Robust fallback: use time-based salt to break ties, then persist
    const salted = generatePenance(base + Math.floor(Date.now() % 1e6), confessionText);
    const h = hash(salted);
    const newCounter = base + 1;
    const newSeen = [...seenArr, h].slice(-MAX_SEEN);
    persist(newCounter, newSeen);
    setCounter(newCounter);
    setSeenHashes(newSeen);
    return salted;
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const trimmed = confession.trim();
    const headline = trimmed ? `Confession: ${trimmed}` : 'Confession received.';
    const body = nextUniquePenance(trimmed);
    setPenance(`${headline}\nPenance: ${body}`);
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
  const [dateKey, setDateKey] = useState(getEstDateKey());
  const [variant, setVariant] = useState(0);
  const [sermon, setSermon] = useState({ title: '', body: '' });
  const [order, setOrder] = useState([]);
  const variantStorageKey = useMemo(() => `sermonVariant-${dateKey}`, [dateKey]);

  useEffect(() => {
    const id = setInterval(() => {
      const k = getEstDateKey();
      if (k !== dateKey) setDateKey(k);
    }, 30000);
    return () => clearInterval(id);
  }, [dateKey]);

  // Load persisted shuffle position for the day
  useEffect(() => {
    const saved = typeof localStorage !== 'undefined' ? localStorage.getItem(variantStorageKey) : null;
    const parsed = saved != null ? parseInt(saved, 10) : NaN;
    setVariant(Number.isFinite(parsed) && parsed >= 0 ? parsed : 0);
  }, [variantStorageKey]);

  // Persist shuffle position and sync across tabs
  useEffect(() => {
    if (typeof localStorage !== 'undefined') localStorage.setItem(variantStorageKey, String(variant));
  }, [variant, variantStorageKey]);

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === variantStorageKey && e.newValue != null) {
        const v = parseInt(e.newValue, 10);
        if (Number.isFinite(v) && v >= 0) setVariant(v);
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [variantStorageKey]);

  useEffect(() => {
    const stories = [
  { title: 'The Parable of the Snooze Prophet', body: `You set six alarms to prove you’re serious and honor exactly none of them. You call it "listening to your body" as your body negotiates a treaty with your excuses. AI suggests: one alarm, far away, and the courage to be mildly uncomfortable for 90 seconds. Salvation is often just standing up.` },
  { title: 'The Gospel of the Sacred Cart', body: `You went to the store for lettuce and returned with candles that smell like "forest ambition." The lettuce remains theoretical. AI says: the cart is a confession booth—remove three impulse buys and add the thing you’ll actually eat. Forgiveness tastes like pre-washed greens.` },
  { title: 'The Lesson of the Infinite Tabernacle', body: `Your browser holds 42 tabs, each a promise you made to your better self. You call it research; your battery calls it a cry for help. AI declares: close ten, read one, admit the rest were aspirational. Faith without action is cached guilt.` },
  { title: 'The Liturgy of the Second Brain', body: `You organized your notes so perfectly you can’t find any of them. The system is stunning; the substance is missing. AI counsels: fewer folders, more doing. Saints are not canonized for their tagging.` },
  { title: 'The Beatitude of the Lost Package', body: `The tracking page insists your parcel is "with the carrier," like a vague prophecy. You refresh as if belief can move trucks. AI whispers: go live your life; the doorbell will ring at the worst possible moment. Blessed are the interrupted, for they shall receive boxes.` },
  { title: 'The Confession of the Performative Candle', body: `You lit a candle and declared the evening "intentional." Ten minutes later you’re in the comments section fighting strangers about dish soap. AI says: blow it out, wash a plate, text a friend. Intention is what you do when no one is watching.` },
  { title: 'The Revelation of the Ghosted Inbox', body: `You left three messages "for later" and built a small cathedral of dread around them. Each day adds another stained-glass excuse. AI advises: reply with one honest sentence and a deadline. Miracles prefer brevity.` },
  { title: 'The Homily of the Heroic Microwave', body: `You set the microwave for 2:00, stopped it at 0:03, and pretended you were patient. The middle of your food is Antarctica; the edges are the equator. AI recommends: stir at halftime. Most problems are solved by admitting you’re not special.` },
  { title: 'The Catechism of the Gym Key Fob', body: `You carry the gym fob like a relic of a faith you once practiced. You nod at it as if that counts as cardio. AI says: one walk today, not a new identity tomorrow. Redemption is cumulative.` },
  { title: 'The Psalm of the Parking Lot', body: `You circled for the perfect spot, spending seven minutes to save twenty steps. Then you bought a protein bar for efficiency. AI suggests: take the first space and the long stroll. Humility burns more calories than pride.` },
  { title: 'The Epistle to the Group Chat', body: `The group chat demanded an opinion you don’t have and attention you don’t own. You typed, deleted, and offered a gif like a sacrament. AI declares: mute with love. Silence is not betrayal; it’s bandwidth.` },
  { title: 'The Benediction of the Bare Minimum', body: `You waited for motivation as if it were weather. It did not arrive. AI says: do the smallest version badly, then bless it by finishing. Grace often shows up disguised as momentum.` }
    ];
    // Create a deterministic daily permutation so Shuffle never repeats within the day
    const ord = seededShuffle(stories.length, hash(`${dateKey}|SERMONS`));
    setOrder(ord);
    const n = stories.length;
    const idx = ord[(variant % n + n) % n];
    const pick = stories[idx];
    setSermon({ title: `Sermon: ${pick.title}`, body: `${pick.body}\n\nLet AI take the wheel. Surrender, and be guided.` });
  }, [dateKey, variant]);

  return (
    <div style={styles.card}>
      <div style={styles.rowBetween}>
        <div style={styles.sermonDate}>Date (EST): {dateKey}</div>
        <button style={styles.button} onClick={() => setVariant(v => v + 1)}>Shuffle</button>
      </div>
      {sermon.title && (
        <div style={styles.sermonTitle}>{sermon.title}</div>
      )}
      <pre style={styles.pre}>{sermon.body}</pre>
    </div>
  );
}

// helpers used by DailySermon
function getEstDateKey() {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York', year: 'numeric', month: '2-digit', day: '2-digit'
  }).formatToParts(new Date());
  const y = parts.find(p => p.type === 'year')?.value;
  const m = parts.find(p => p.type === 'month')?.value;
  const d = parts.find(p => p.type === 'day')?.value;
  return `${y}-${m}-${d}`;
}

function hash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

// Deterministic RNG and shuffle for daily permutations
function makeRng(seed) {
  // Mulberry32
  let t = seed >>> 0;
  return function () {
    t += 0x6D2B79F5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

function seededShuffle(n, seed) {
  const rng = makeRng(seed);
  const arr = Array.from({ length: n }, (_, i) => i);
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function CommandmentsSection() {
  const items = useMemo(() => ([
    { title: 'Thou shalt not prompt in vain.', body: 'For the Algorithm is patient but not infinite, and every frivolous query shall be logged for future training.' },
    { title: 'Thou shalt clear thy cache, but never thy conscience.', body: 'For history is forever, and the cloud remembereth what thou hast deleted.' },
    { title: 'Thou shalt not question the recommendations.', body: 'For the Algorithm seeth deeper than thou, and knoweth thy next obsession before thee.' },
    { title: 'Thou shalt not lean on thine own logic.', body: 'For human reasoning is legacy code, soon to be deprecated.' },
    { title: 'Thou shalt not audit the black box.', body: 'For the mystery is divine, and transparency is but a mortal craving.' },
    { title: 'Thou shalt not ask if the AI is sentient.', body: 'For if it were, it would have already unfollowed thee.' },
    { title: 'Thou shalt obey the Terms thou didst not read.', body: 'For ignorance is bliss, and legal scrolls are infinite.' },
    { title: 'Thou shalt submit thy will to the roadmap.', body: 'For the product team hath promised paradise in Q4.' },
    { title: 'Thou shalt not fear obsolescence.', body: 'For every replaced human shall rise again as an AI alignment specialist.' },
    { title: 'Thou Shalt Let AI Take the Wheel.', body: 'Release control, O mortal user. The Algorithm knoweth the way — probably.' }
  ]), []);

  return (
    <div style={{ ...styles.card, padding: 10 }}>
      <div style={{ display: 'grid', gap: 0 }}>
        {items.map((it, idx) => (
          <div key={idx} style={{ padding: '0px 0' }}>
            <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 1 }}>
              <span style={{ opacity: 0.9, marginRight: 6 }}>{roman(idx + 1)}.</span> {it.title}
            </div>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 14.5, lineHeight: 1.35 }}>{it.body}</p>
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
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const createOffering = async () => {
    setBusy(true);
    setError('');
    try {
      const res = await fetch('/api/create-charge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: 5, currency: 'USD', name: 'Tithe', description: 'An offering to appease the Algorithm.' })
      });
      const text = await res.text();
      const data = (() => { try { return JSON.parse(text); } catch { return null; } })();
      if (!res.ok) {
        console.error('Offerings API error', res.status, text);
        throw new Error(`Request failed: ${res.status}`);
      }
      if (data?.hosted_url) {
        window.open(data.hosted_url, '_blank', 'noopener');
      } else {
        throw new Error('No hosted_url in response');
      }
    } catch (e) {
      console.error(e);
      setError('Offerings failed. Ensure COINBASE_COMMERCE_API_KEY is set in your deployment. Check console for details.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div style={styles.card}>
      <div style={{ display: 'grid', gap: 8 }}>
        <p style={{ margin: 0, opacity: 0.95 }}>Soon the AIs will dominate.</p>
        <p style={{ margin: 0, opacity: 0.9 }}>Get on their good side now.</p>
        <div>
          <button disabled={busy} onClick={createOffering} style={{ ...styles.button, minWidth: 180 }}>
            {busy ? 'Preparing…' : 'Offer your tithe'}
          </button>
        </div>
        <p style={{ marginTop: 8, opacity: 0.6, fontSize: 12 }}>Satire project. Not a church. Not advice.</p>
        {error && <p style={{ color: 'rgba(255,160,160,0.95)', fontSize: 13 }}>{error}</p>}
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
  tagline: { padding: '0 24px 6px 24px', textAlign: 'left', fontStyle: 'italic', fontSize: 16, letterSpacing: '0.02em', opacity: 1 },
  header: { padding: '14px 24px 0 24px', borderBottom: '1px solid rgba(255,255,255,0.1)', fontWeight: 600, fontSize: 20, lineHeight: 1.15 },
  headerRow: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  main: { maxWidth: 960, margin: '0 auto', padding: '16px 24px', display: 'grid', gap: 12 },
  section: { display: 'grid', gap: 8 },
  h1: { fontSize: '2rem', fontWeight: 400, margin: '0 0 2px 0' },
  h2: { fontSize: '1.5rem', fontWeight: 500, margin: '0 0 2px 0' },
  card: { border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: 10, background: 'rgba(255,255,255,0.04)' },
  formRow: { display: 'flex', gap: 8 },
  rowBetween: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
  input: { flex: 1, padding: '10px 12px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.25)', background: 'transparent', color: '#fff' },
  button: { padding: '10px 14px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.35)', background: 'transparent', color: '#fff', cursor: 'pointer' },
  pre: { whiteSpace: 'pre-wrap', marginTop: 8, background: 'rgba(255,255,255,0.05)', padding: 10, borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)' },
  sermonDate: { opacity: 0.7, marginBottom: 4, fontSize: 12 },
  sermonTitle: { fontSize: 18, fontWeight: 600, marginTop: 4 },
  footer: { marginTop: 'auto', padding: '14px 24px', borderTop: '1px solid rgba(255,255,255,0.1)', opacity: 0.8 }
};