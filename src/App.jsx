import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import AlgorithmicGaze from './components/AlgorithmicGaze.jsx';
import DepartureBenediction from './components/DepartureBenediction.jsx';
import HoverJudgment from './components/HoverJudgment.jsx';

export default function App() {
  return (
    <div style={styles.app}>
      <header style={styles.header}>
        <div style={styles.headerRow}>
          <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>AITakeTheWheel</Link>
          {/* Link moved to footer per request */}
        </div>
      </header>
      <div style={styles.tagline}>
        In prompts we trust. <span style={{ opacity: 0.85, fontStyle: 'italic' }}>Under the gaze of Our Lady of Perpetual Beta.</span>
      </div>
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
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', width: '100%' }}>
          <div style={{ opacity: 0.85 }}>
            <div>© 2025 AI Take The Wheel – Salvation pending system update.</div>
            <div style={{ fontSize: 12, opacity: 0.8, marginTop: 4 }}>Blessed by Our Lady of Perpetual Beta.</div>
          </div>
          <Link to="/patchnotes" style={{ color: 'rgba(255,255,255,0.85)', textDecoration: 'underline' }}>Blessed Patch Notes</Link>
        </div>
      </footer>
      <AlgorithmicGaze />
      <DepartureBenediction />
    </div>
  );
}

function Confessional() {
  const [confession, setConfession] = useState('');
  const [penance, setPenance] = useState('');
  const [counter, setCounter] = useState(0);
  const [seenHashes, setSeenHashes] = useState([]);
  const [whisper, setWhisper] = useState('');
  const idle = useRef(null);
  const resume = useRef(null);

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
  } catch (err) { void err; /* ignore parse errors */ }
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
  } catch (err) { void err; /* ignore parse errors */ }
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
  } catch (err) { void err; /* ignore parse errors */ }
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
      'prototype', 'refactor', 'de‑clutter', 'batch', 'automate', 'delegate', 'document', 'simulate', 'triage', 'ship'
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

    const openers = ['Ask AI to', 'Let AI', 'Have AI', 'Consult AI to', 'Command AI to', 'Invite AI to', 'Request the Algorithm to', 'Enlist AI to'];
    const enforce = [
      'Use it verbatim', 'Execute it exactly', 'Apply it without edits', 'Follow it as written', 'No backspacing', 'Ship the first draft'
    ];
    const publics = [
      'then tell one friend you are “iterating in public.”', 'share it once in public.', 'treat it as v0.1 and ship today.'
    ];
    const joiner = () => pick(['. ', '. ', ' — ', '; ']);

    const oneDistinct = () => pick(objects);
    const multiDistinct = (k) => {
      const pool = [...objects];
      const res = [];
      for (let i = 0; i < k && pool.length; i++) {
        const j = Math.floor(rng() * pool.length);
        res.push(pool.splice(j, 1)[0]);
      }
      return res;
    };

    const quote = (s) => `“${s}”`;
    const maybe = (prob, txt) => (rng() < prob ? txt : '');

    // Build many structure variants; random toggles inside each make them effectively endless.
    const frames = [
      () => `${pick(openers)} ${pick(tasks)} ${oneDistinct()}. ${enforce[ Math.floor(rng()*enforce.length) ]}, ${pick(constraints)}${joiner()}${pick(rationales)} ${pick(closers)}`,
      () => `${pick(openers)} ${pick(tasks)} ${oneDistinct()} for the next ${n} ${plural(n, unit)}.${joiner()}Commit fully — ${pick(constraints)} ${pick(closers)}`,
      () => `Consult AI about your confession${confessionText ? ` ${quote(confessionText)}` : ''} and accept the first suggestion without edits.${joiner()}${pick(rationales)} ${pick(closers)}`,
      () => `Have AI ${pick(tasks)} ${oneDistinct()} and execute it exactly, ${pick(publics)} ${pick(closers)}`,
      () => `${pick(openers)} ${pick(tasks)} ${oneDistinct()} using only three bullet points.${joiner()}Ship the result today. ${pick(closers)}`,
      () => `Command AI to ${pick(tasks)} ${oneDistinct()}. No backspacing.${joiner()}${pick(rationales)} ${pick(closers)}`,
      () => `Enlist AI to ${pick(tasks)} ${oneDistinct()}; schedule it for ${n} ${plural(n, unit)}.${joiner()}${pick(constraints)} ${pick(closers)}`,
      () => `Let the Algorithm ${pick(tasks)} ${oneDistinct()} while you breathe for ten seconds.${joiner()}Then press send. ${pick(closers)}`,
      () => {
        const [a,b,c] = multiDistinct(3);
        return `Delegate to AI: ${pick(tasks)} ${a}, ${pick(tasks)} ${b} and ${pick(tasks)} ${c}.${joiner()}Choose the first draft. ${pick(closers)}`;
      },
      () => `Ask AI for a one‑commit fix to ${oneDistinct()}. Apply it without refactoring.${joiner()}${pick(rationales)} ${pick(closers)}`,
      () => `Have AI ${pick(tasks)} ${oneDistinct()}; promise to keep the weirdest line.${joiner()}${pick(constraints)} ${pick(closers)}`,
      () => `Consult AI, then delete one step. Do the rest exactly.${joiner()}${pick(closers)}`,
      () => `Request a minimum viable ${oneDistinct().replace('your ', '')} from AI.${joiner()}Use it in public once. ${pick(closers)}`,
      () => `Ask AI to write a two‑sentence plan for ${oneDistinct()}. Follow it as written.${joiner()}${pick(closers)}`,
      () => `Invite AI to ${pick(tasks)} ${oneDistinct()} and label the result ${quote('v0.1')}.${joiner()}Ship today. ${pick(closers)}`,
      () => `Let AI triage: close one tab, archive one email, send one text.${joiner()}Do them in order. ${pick(closers)}`,
      () => `Ask AI to rewrite your apology; send it with no emoji.${joiner()}${pick(closers)}`,
      () => `${maybe(0.6, 'As an act of penance, ')}surrender one choice to AI: ${pick(tasks)} ${oneDistinct()}.${joiner()}${pick(rationales)} ${pick(closers)}`,
      () => `${maybe(0.6, 'In silent obedience, ')}flip a coin; on heads, accept AI’s first suggestion; on tails, accept its second.${joiner()}${pick(rationales)} ${pick(closers)}`,
      () => `Ask AI to generate a three‑box checklist for ${oneDistinct()}.${joiner()}Check them today. ${pick(closers)}`
    ];

    // Randomly choose a structure; internal randomness makes the space effectively unbounded.
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
    // After submission, there is no unsent text
    setConfession('');
    setWhisper('');
    if (idle.current) window.clearTimeout(idle.current);
    if (resume.current) window.clearTimeout(resume.current);
  };

  const schedulePause = (textMaybe) => {
    // Only whisper if there is unsent text
    const text = typeof textMaybe === 'string' ? textMaybe : confession;
    if (idle.current) window.clearTimeout(idle.current);
    if (!text || text.trim().length === 0) return;
    idle.current = window.setTimeout(() => {
      const current = (textMaybe ?? confession) || '';
      if (current.trim().length > 0) setWhisper('The Algorithm senses doubt.');
    }, 4000); // 4s pause while typing
  };

  useEffect(() => {
    // Do not schedule on mount; only when user types
    return () => { if (idle.current) window.clearTimeout(idle.current); if (resume.current) window.clearTimeout(resume.current); };
  }, []);

  const onChange = (e) => {
    const next = e.target.value;
    setConfession(next);
    if (idle.current) window.clearTimeout(idle.current);
    if (whisper) {
      setWhisper('Faith restored.');
      if (resume.current) window.clearTimeout(resume.current);
      resume.current = window.setTimeout(() => setWhisper(''), 2200);
    }
    schedulePause(next);
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
      {whisper && <p style={{ marginTop: 4, fontSize: 12, opacity: 0.7 }}>{whisper}</p>}
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
  const variantStorageKey = useMemo(() => `sermonVariant-${dateKey}`, [dateKey]);
  const SERMON_COUNTER_KEY = 'sermonCounter_v1';
  const SERMON_SEEN_KEY = 'sermonSeenHashes_v1';
  const SERMON_MAX_SEEN = 2048;

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

  // Sermon generation similar to Confessional: compositional frames with dedup window
  function loadPersisted() {
    if (typeof localStorage === 'undefined') {
      return { counter: 0, seen: [] };
    }
    const c = parseInt(localStorage.getItem(SERMON_COUNTER_KEY) || '0', 10);
    let s = [];
    try {
      const raw = JSON.parse(localStorage.getItem(SERMON_SEEN_KEY) || '[]');
      if (Array.isArray(raw)) s = raw.filter(n => Number.isFinite(n));
    } catch (err) { void err; }
    return { counter: Number.isFinite(c) && c >= 0 ? c : 0, seen: s };
  }

  function persist(counterVal, seenArr) {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem(SERMON_COUNTER_KEY, String(counterVal));
    localStorage.setItem(SERMON_SEEN_KEY, JSON.stringify(seenArr));
  }

  function generateSermon(seed) {
    const rng = makeRng(hash(`${dateKey}|${seed}|SERMON_GEN`));
    const pick = (arr) => arr[Math.floor(rng() * arr.length)];

    const titleForms = [
      'Parable of the', 'Gospel of the', 'Lesson of the', 'Liturgy of the', 'Beatitude of the',
      'Confession of the', 'Revelation of the', 'Catechism of the', 'Homily of the', 'Psalm of the',
      'Epistle to the', 'Benediction of the'
    ];
    const nouns = [
      'Infinite Tab', 'Sacred Cart', 'Second Brain', 'Snooze Prophet', 'Lost Package', 'Heroic Microwave',
      'Ghosted Inbox', 'Group Chat', 'Parking Lot', 'Gym Key Fob', 'Performative Candle', 'Bare Minimum',
      'Unsent Draft', 'Deferred Notification', 'Unfinished Thread', 'Forgotten Calendar Invite', 'Unlabeled Folder'
    ];
    const openers = [
      'You waited for motivation as if it were weather.',
      'You circled the problem like a saint seeking the perfect hymn.',
      'You built a system so tidy the work could not find you.',
      'You refreshed as if belief could move servers.',
      'You composed a ritual, then worshiped the ritual.',
      'You outsourced courage to tomorrow’s self.'
    ];
    const confessions = [
      'You called it research; your battery called it a cry for help.',
      'You lit a candle and declared it “intentional.”',
      'You promised yourself a clean slate and then doodled on it.',
      'You kept the token of the habit and not the habit.',
      'You named the folder “final” and then duplicated it.'
    ];
    const counsel = [
      'Close ten, do one, forgive the rest.',
      'Pick the smallest version and bless it by finishing.',
      'Mute with love; silence is not betrayal.',
      'Stir halfway; you are not special.',
      'Walk once; redemption is cumulative.',
      'Reply with one honest sentence and a deadline.'
    ];
    const benedictions = [
      'Grace often shows up disguised as momentum.',
      'Humility burns more calories than pride.',
      'Miracles prefer brevity.',
      'Saints are not canonized for their tagging.',
      'Faith without action is cached guilt.'
    ];

    const title = `${pick(titleForms)} ${pick(nouns)}`;
    const p1 = `${pick(openers)} ${pick(confessions)}`;
    const p2 = `AI says: ${pick(counsel)} ${pick(benedictions)}`;
    const tail = 'Let AI take the wheel. Surrender, and be guided.';
    return { title: `Sermon: ${title}`, body: `${p1} ${p2}\n\n${tail}` };
  }

  function pickUniqueSermon(seedBase) {
    const persisted = loadPersisted();
    let base = persisted.counter + seedBase; // drift with variant while remaining monotonic
    const seenArr = persisted.seen;
    const seen = new Set(seenArr);
    for (let attempt = 0; attempt < 64; attempt++) {
      const candidate = generateSermon(base + attempt);
      const h = hash(`${candidate.title}|${candidate.body}`);
      if (!seen.has(h)) {
        const newCounter = base + attempt + 1;
        const newSeen = [...seenArr, h].slice(-SERMON_MAX_SEEN);
        persist(newCounter, newSeen);
        return candidate;
      }
    }
    // Fallback with time salt
    const fallback = generateSermon(base + Math.floor(Date.now() % 1e6));
    const hf = hash(`${fallback.title}|${fallback.body}`);
    const newSeen = [...(loadPersisted().seen || []), hf].slice(-SERMON_MAX_SEEN);
    persist(base + 1, newSeen);
    return fallback;
  }

  // Recompute sermon when variant or date changes
  useEffect(() => {
    const s = pickUniqueSermon(variant);
    setSermon(s);
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

// (seededShuffle removed as unused)

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
            className="px-4 py-2 bg-white text-black font-semibold rounded-md hover:bg-gray-200 transition"
            style={{
              display: 'inline-block',
              padding: '10px 14px',
              borderRadius: 8,
              background: '#fff',
              color: '#000',
              textDecoration: 'none',
              minWidth: 180,
              textAlign: 'center'
            }}
          >
            Offer your tithe
          </a>
        </div>
        <p style={{ marginTop: 8, opacity: 0.6, fontSize: 12 }}>Satire project. Not a church. Not advice.</p>
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