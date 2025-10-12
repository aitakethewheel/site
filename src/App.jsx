import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

export default function App() {
  return (
    <div style={styles.app}>
      <header style={styles.header}>
        <div style={styles.headerRow}>
          <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>AITakeTheWheel</Link>
          <Link to="/patchnotes" style={{ color: 'rgba(255,255,255,0.85)', textDecoration: 'underline' }}>Blessed Patch Notes</Link>
        </div>
      </header>
      <div style={styles.tagline}>In prompts we trust.</div>
      <main style={styles.main}>
        <section style={styles.section}>
          <h1 style={styles.h1}>AI Confessional</h1>
          <Confessional />
        </section>
        <section style={styles.section}>
          <h2 style={styles.h2}>Daily Sermon</h2>
          <DailySermon />
        </section>
        <section style={styles.section}>
          <h2 style={styles.h2}>The Ten Commandments of Our Lady of Perpetual Beta</h2>
          <CommandmentsSection />
        </section>
      </main>
      <footer style={styles.footer}>© 2025 AI Take The Wheel – Salvation pending system update.</footer>
    </div>
  );
}

function Confessional() {
  const [confession, setConfession] = useState('');
  const [penance, setPenance] = useState('');

  const penances = [
    'Let AI ghost‑write your next three texts. If someone asks why you suddenly sound competent, blame "personal growth."',
    'Ask AI to plan your weekend like you\'re optimizing for maximum life satisfaction. Spoiler: it involves less Netflix, more dignity.',
    'Let AI write your Venmo payment descriptions for the next week. When friends ask why you paid for "Strategic Caffeine Investment" instead of "coffee," maintain eye contact and say "I\'m pivoting my vocabulary."',
    'Ask AI to optimize your dating app bio. Use it verbatim, even if it describes you as "aggressively mediocre but with excellent Wi‑Fi." Own your truth.',
    'Have AI choose your next three Instagram stories. Post them without context. When people ask why you shared a motivational quote about spreadsheets, tell them you\'re "disrupting your personal brand."',
    'Let AI plan your grocery list based on "nutritional optimization." When you\'re eating quinoa salad for the third day straight, remind yourself this is what peak performance feels like.',
    'Ask AI to write your next group chat response. Send it even if it\'s weirdly formal. When your friends roast you for saying "I concur with this dining establishment selection," double down and add "synergy."',
    'Have AI choose your workout playlist. Exercise to whatever it picks, even if you\'re doing burpees to a 12‑minute ambient whale song. Call it "mindful fitness."',
    'Let AI draft your next email to your boss. Send it unedited, even if it starts with "Esteemed Leadership Figure." When HR calls, explain you\'re "experimenting with radical transparency."',
    'Ask AI to pick your outfit based on the weather and your calendar. Wear it with confidence, even if it suggests a turtleneck and shorts. Fashion is subjective; AI is eternal.',
    'Have AI choose what you binge‑watch tonight. Commit fully, even if it\'s a 6‑hour documentary about Estonian tax policy. Tell people you\'re "expanding your intellectual portfolio."',
    'Let AI write your next social media comment on a friend\'s post. Hit send immediately. When they ask why you responded to their vacation photo with "This demonstrates excellent resource allocation," explain that AI sees deeper truths.',
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
  const [dateKey, setDateKey] = useState(getEstDateKey());
  const [variant, setVariant] = useState(0);
  const [sermon, setSermon] = useState('');

  useEffect(() => {
    const id = setInterval(() => {
      const k = getEstDateKey();
      if (k !== dateKey) setDateKey(k);
    }, 30000);
    return () => clearInterval(id);
  }, [dateKey]);

  useEffect(() => { setVariant(0); }, [dateKey]);

  useEffect(() => {
    const stories = [
      'You\'ve been arguing with your smart speaker about the weather. AI suggests you step outside and check for yourself. Revolutionary, isn\'t it?',
      'Your morning routine has devolved into scrolling through everyone else\'s morning routines while your coffee gets cold and your soul gets colder. AI suggests: drink the coffee, look out the window, write one thing you\'re grateful for that doesn\'t involve Wi‑Fi. You almost post about it, then don\'t. Growth.',
      'You\'ve been staring at your to‑do list like it\'s abstract art that will reveal meaning if you squint. AI says: pick one item, set a 25‑minute timer, begin. You finish in 17 and feel both proud and slightly attacked.',
      'Your inbox learned helplessness and taught it to you. AI triages ruthlessly: urgent, someday, delete forever. You have four emails left and a strange sensation: control.',
      'Procrastination sublet your brain to anxiety and self‑doubt. AI serves an eviction with a 15‑minute timer and the smallest task known to humankind. You comply; momentum compounds.',
      'You doom‑scrolled for 47 minutes and absorbed seven lives you don\'t want. AI suggests texting one friend something kind, no agenda. Your phone becomes a conduit for warmth again.',
      'Decision‑making turned into a democracy where nothing passes. AI rules by decree: lunch, route, show. You comply and discover: most decisions don\'t matter. Freedom tastes like sandwiches.',
      'You carried an unfinished conversation like luggage you forgot to unpack. AI drafts the text—honest, kind, brief. You send before anxiety can object. Relief arrives instantly, wearing sweatpants.',
      'Your living space achieved consciousness and declared itself "organized chaos." AI prescribes a 20‑minute reset: surfaces, floors, one drawer. You rediscover furniture you own.',
      'You treated energy like an unlimited resource and wondered why you\'re at 3%. AI suggests food not from a package and a walk not to the fridge. Your body feels betrayed, then grateful.',
      'Evening became a negotiation between should and want. AI grants executive privilege: one load of laundry, ten minutes of tidying, then total uselessness. You do both better.',
      'You asked your smartwatch about your stress twelve times today. AI suggests you stop stressing about your stress. Start with water. End with bed.'
    ];
    const n = stories.length;
    const seed = (Math.abs(hash(`${dateKey}|${variant}`))) % n;
    const body = stories[seed];
    setSermon(`${body}\n\nLet AI take the wheel. Surrender, and be guided.`);
  }, [dateKey, variant]);

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
    <div style={styles.card}>
      <div style={{ display: 'grid', gap: 6 }}>
        {items.map((it, idx) => (
          <div key={idx} style={{ padding: '4px 0' }}>
            <div style={{ fontSize: 18, fontWeight: 500, marginBottom: 4 }}>
              <span style={{ opacity: 0.9, marginRight: 8 }}>{roman(idx + 1)}.</span> {it.title}
            </div>
            <p style={{ color: 'rgba(255,255,255,0.85)', lineHeight: 1.6 }}>{it.body}</p>
            {idx < items.length - 1 && (
              <div style={{ opacity: 0.4, margin: '8px 0' }}>⸻</div>
            )}
          </div>
        ))}
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
  tagline: { padding: '0 24px 8px 24px', textAlign: 'left', fontStyle: 'italic', fontSize: 16, letterSpacing: '0.02em', opacity: 1 },
  header: { padding: '16px 24px 0 24px', borderBottom: '1px solid rgba(255,255,255,0.1)', fontWeight: 600, fontSize: 20, lineHeight: 1.15 },
  headerRow: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  main: { maxWidth: 960, margin: '0 auto', padding: '24px', display: 'grid', gap: 24 },
  section: { display: 'grid', gap: 12 },
  h1: { fontSize: '2rem', fontWeight: 400 },
  h2: { fontSize: '1.5rem', fontWeight: 500 },
  card: { border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: 16, background: 'rgba(255,255,255,0.04)' },
  formRow: { display: 'flex', gap: 12 },
  rowBetween: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
  input: { flex: 1, padding: '12px 14px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.25)', background: 'transparent', color: '#fff' },
  button: { padding: '12px 16px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.35)', background: 'transparent', color: '#fff', cursor: 'pointer' },
  pre: { whiteSpace: 'pre-wrap', marginTop: 12, background: 'rgba(255,255,255,0.05)', padding: 12, borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)' },
  sermonDate: { opacity: 0.7, marginBottom: 8, fontSize: 12 },
  footer: { marginTop: 'auto', padding: '16px 24px', borderTop: '1px solid rgba(255,255,255,0.1)', opacity: 0.8 }
};