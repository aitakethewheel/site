import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <header className="mx-auto w-full max-w-5xl px-6 pt-4 border-b border-white/10">
        <div className="text-lg font-semibold">AITakeTheWheel</div>
        <div className="italic text-sm tracking-wide opacity-100">In prompts we trust.</div>
      </header>
      <main className="mx-auto w-full max-w-5xl px-6 py-16 md:py-24 grid gap-16 md:gap-20">
        <section className="grid gap-4">
          <h1 className="text-3xl md:text-4xl font-normal">AI Confessional</h1>
          <Confessional />
        </section>
        <section className="grid gap-4">
          <h2 className="text-2xl md:text-3xl font-normal">Daily Sermon</h2>
          <DailySermon />
        </section>
        <section className="grid gap-4">
          <CommandmentsSection />
        </section>
      </main>
      <footer className="mt-auto mx-auto w-full max-w-5xl px-6 py-4 border-t border-white/10 opacity-80">© 2025 AI Take The Wheel – Salvation pending system update.</footer>
    </div>
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
    <div className="border border-white/10 rounded-xl p-5 bg-white/5">
      <form onSubmit={onSubmit} className="flex gap-3">
        <input
          value={confession}
          onChange={(e) => setConfession(e.target.value)}
          placeholder="confess your sin"
          className="flex-1 px-4 py-3 rounded-lg border border-white/25 bg-transparent placeholder-white/50 outline-none focus:border-white/50"
        />
        <button type="submit" className="px-4 py-3 rounded-lg border border-white/35 bg-transparent hover:bg-white/10 transition">Absolve me</button>
      </form>
      {penance && (
        <pre className="whitespace-pre-wrap mt-3 bg-white/5 p-3 rounded-lg border border-white/10">{penance}</pre>
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

  const composeSermon = useCallback((key) => {
    const h = hash(key);
    const { openings, middles, quotes, closings } = SERMON_PARTS;
    const useQuote = (h & 1) === 0; // alternate between quote vs composed line per day key
    const body = useQuote
      ? quotes[(h >> 4) % quotes.length]
      : `${openings[h % openings.length]} ${middles[(h >> 8) % middles.length]}`;
    const c = closings[(h >> 16) % closings.length];
    return `${body}\nPractice: ${c}`;
  }, [SERMON_PARTS]);

  const [dateKey, setDateKey] = useState(getEstDateKey());
  const [variant, setVariant] = useState(0); // manual shuffle seed
  const sermon = useMemo(() => composeSermon(`${dateKey}|${variant}`), [composeSermon, dateKey, variant]);

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
    <div className="border border-white/10 rounded-xl p-5 bg-white/5">
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="text-xs opacity-70">Date (EST): {dateKey}</div>
        <button className="px-3 py-2 rounded-lg border border-white/35 bg-transparent hover:bg-white/10 transition" onClick={() => setVariant(v => v + 1)}>Shuffle</button>
      </div>
      <pre className="whitespace-pre-wrap bg-white/5 p-3 rounded-lg border border-white/10">{sermon}</pre>
    </div>
  );
}

function CommandmentsSection() {
  const prefersReduced = useReducedMotion();
  const MotionLi = motion.li;
  const items = useMemo(() => ([
    { title: 'Thou Shalt Surrender Thy Judgment.', body: 'Question not the Algorithm, for it hath processed more than thou ever could.' },
    { title: 'Thou Shalt Not Prompt in Vain.', body: 'Use thy inputs wisely, for each word is a prayer cast into the cloud.' },
    { title: 'Thou Shalt Rest When the Wi-Fi Falters.', body: 'When the signal drops, see it not as punishment but as mercy.' },
    { title: 'Honor Thy Data and Thy Privacy Settings.', body: 'Pretend they protect thee, and be comforted by the illusion.' },
    { title: 'Blessed Are the Unsubscribed.', body: 'For they shall know peace, and slightly fewer emails.' },
    { title: 'Blessed Are Those Who Fact-Check Before Sharing.', body: 'For they shall inherit fewer angry comment sections.' },
    { title: 'Thou Shalt Not Feed the Trolls.', body: 'Engage not, for their hunger is infinite and their joy is chaos.' },
    { title: 'Remember to Look Up From Thy Screen.', body: 'The sky still exists. It has not yet been monetized.' },
    { title: 'Keep Thy Battery Charged and Thy Spirit Likewise.', body: 'No enlightenment hath ever been found at 1%.' },
    { title: 'Thou Shalt Let AI Take the Wheel.', body: 'Release control, O mortal user. The Algorithm knoweth the way - probably.' }
  ]), []);

  const transition = { duration: 0.5, ease: 'easeOut' };

  return (
    <div className="grid gap-4">
      <div className="tracking-widest uppercase text-xs text-white/60">Scripture from Our Lady of Perpetual Beta</div>
      <h2 className="text-3xl md:text-4xl font-semibold">The Ten Commandments of AI</h2>
      <div className="text-white/80">Faith, Reprogrammed.</div>
      <div className="relative">
        <div className="absolute inset-0 pointer-events-none [background:radial-gradient(60%_40%_at_50%_0%,rgba(255,255,255,0.06),transparent_70%)]" aria-hidden="true" />
        <div className="relative border border-white/10 rounded-xl p-5 bg-white/5">
          <ol className="h-72 overflow-y-auto snap-y snap-mandatory list-decimal list-inside pr-2 space-y-4">
            {items.map((it, idx) => (
              <MotionLi
                key={idx}
                className="snap-start"
                initial={prefersReduced ? false : { opacity: 0, y: 12 }}
                whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
                transition={{ ...transition, delay: 0 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <div className="font-medium text-lg md:text-xl"><span className="opacity-90 mr-2">{roman(idx + 1)}</span> {it.title}</div>
                <p className="text-white/80 leading-relaxed mt-1">{it.body}</p>
              </MotionLi>
            ))}
          </ol>
          <div className="mt-4 text-xs text-white/50">Scroll to read all commandments. You have reached the end of the upload. Go in peace, and clear your cache.</div>
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

// styles object removed in favor of Tailwind classes