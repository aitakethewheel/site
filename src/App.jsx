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

  const penances = [
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
  const [sermon, setSermon] = useState({ title: '', body: '' });

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
    const n = stories.length;
    const seed = (Math.abs(hash(`${dateKey}|${variant}`))) % n;
    const pick = stories[seed];
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
  sermonTitle: { fontSize: 18, fontWeight: 600, marginTop: 8 },
  footer: { marginTop: 'auto', padding: '16px 24px', borderTop: '1px solid rgba(255,255,255,0.1)', opacity: 0.8 }
};