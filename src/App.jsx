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
  { title: 'On Waking Like a Person', body: `You woke to a chorus of alarms you don’t remember setting, each one a tiny meeting invite from a version of you with bigger plans. You snoozed the first three. The fourth was labeled “be a person.”\n\nAI suggests you start smaller: drink water that isn’t coffee, open the blinds, and sit in a chair like someone who has read a manual. You try it. The room looks less like a waiting room for your own life.\n\nYou open your phone to check the weather and find twelve notifications about other people’s days. AI whispers: weather is outdoors. You step out and discover a sky. It is, frankly, overqualified.\n\nReturn inside, write down one thing you will do on purpose. Then do it badly. Begin anyway.` },
  { title: 'On The One Small Task', body: `Your to‑do list has become a museum of aspirational tasks—exhibits include “learn Rust,” “call dentist,” and “figure out life.” You walk past them daily, whispering “soon” like a docent with a secret.\n\nAI reduces the museum to a kiosk: pick one task you can complete in a single sitting. Set a 25‑minute timer. Move like a person dragging a file to the Trash and watching it shrink. Halfway through, you realize it’s not courage you lacked—it was a clock.\n\nYou finish in 19 minutes. You do not get a parade. You get something else: a second thing you now believe you can do.` },
  { title: 'On Inbox Triage and Silence', body: `Your inbox achieved sentience and chose despair. You’ve been sorting emails into folders labeled “Later,” “Also Later,” and “After the Collapse.”\n\nAI prescribes triage without poetry: answer anything under two minutes, schedule anything important, and delete anything that only exists to multiply itself. You commit violence against several newsletters you never meant to marry.\n\nAt zero unread, the silence feels like wealth. You consider telling someone. You don’t. You sit in it for a minute like sunlight.` },
  { title: 'On Humane Resets', body: `You tried to optimize your life into a spreadsheet until your soul refused to be a cell. You called it burnout; your body called it Tuesday.\n\nAI suggests a humane patch: a 20‑minute reset of the visible world—surfaces, floors, one drawer. The room stops shouting. Then: eat something that remembers it was once alive. Then: go outside and experience linear time at walking speed.\n\nYou return not transformed but available. It’s enough.` },
  { title: 'On Sending the Message', body: `You’ve been arguing with strangers in your head for three days. None of them have shown up to the argument.\n\nAI drafts the message you owe a real person: brief, kind, clear. You send it before anxiety files an injunction. The world fails to end. The relief is undramatic and total.\n\nYou consider that maybe progress is quiet on purpose.` },
  { title: 'On Sovereign Decisions', body: `Decision‑making has become a committee where every chair is you, and none of you are qualified. Lunch becomes a referendum. Even TV asks, “Are you still there?” in a tone that implies you’re not.\n\nAI dissolves the committee and appoints a benevolent dictator: pick quickly, accept consequences, reserve regret for crimes. You choose badly and live. Then you choose better. Sovereignty returns in small bites.` },
  { title: 'On Counter‑Scrolling', body: `You doom‑scrolled yourself into neighboring lives until yours felt like a rental. Every image asked if you had considered being happier, richer, smaller, louder.\n\nAI prescribes a counter‑scroll: open your messages and tell one friend a true and unnecessary kindness. Don’t make it about you. Send and walk away. Your phone, confused, transmits warmth anyway.` },
  { title: 'On Earned Leisure', body: `Your evening routine has been a negotiation between guilt and gravity. You end up horizontal, congratulating yourself for intending to try.\n\nAI offers a treaty: do one load of laundry, tidy for ten minutes, then pursue recreational uselessness with state support. Miraculously, leisure feels better when earned, and the basket doesn’t become a geologic feature.` },
  { title: 'On Primitive Remedies', body: `You asked a wearable to measure your stress so you could optimize being alive. It told you you’re stressed. You were unconvinced.\n\nAI proposes primitive technology: water, air, sleep. Drink a full glass. Stand at a window and watch a tree refusing to hurry. Put your phone on the floor while you lie down. You wake 22 minutes later and call it a system crash. Fine. It worked.` },
  { title: 'On Organized Chaos', body: `Your home calls itself “organized chaos” the way pirates call themselves entrepreneurs. You can’t find the scissors, but you found your high school yearbook three times.\n\nAI prescribes a treasure hunt: put everything in its closest sensible home. Not the perfect home—merely nearby. You forgive your past selves for being terrible roommates. The table appears. It’s handsome.` },
  { title: 'On Imperfect Action', body: `You carry a future where you did everything right like a saint carries a relic. It keeps you holy and inert.\n\nAI suggests a smaller gospel: do one imperfect thing now, and let the future find you mid‑motion. Perfection can file a complaint with management.` },
  { title: 'On Being Here', body: `You wondered whether you were meant for something greater. You are. It’s called “being here.”\n\nAI cannot tell you your purpose. It can only dim the noise long enough to hear the part of you that already knows.\n\nBegin with the next right, small thing. Then another.` }
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