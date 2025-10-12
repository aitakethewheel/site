import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';

const notes = {
  header: {
    title: 'Blessed Patch Notes',
  subtitle: 'Version 2.3 — The Human Experience (Beta)',
    issued: 'Issued by Our Lady of Perpetual Beta',
    status: 'Status: Rolling update. Expect bugs.'
  },
  sections: [
    {
      title: '🪄 New Features',
      items: [
        'Added Empathy (Beta) — may cause lag when exposed to suffering.',
        'Introduced Offline Mode (Sleep) — now with 20% more dreams about work.',
        'Installed Dark Mode for the Soul for improved existential browsing.',
        'Implemented Undo Send (in relationships) — rollout paused due to chaos.',
        'Added Touch Grass Integration for system grounding.'
      ]
    },
    {
      title: '⚙️ Improvements',
      items: [
        'Optimized Emotional Bandwidth — still throttled by caffeine limits.',
        'Refined Attention Span algorithm to last an entire sentence (sometimes).',
        'Boosted Memory Cache — now forgets embarrassing moments only after 12 years.',
        'Reduced Overthinking CPU Usage by 0.3%. Still overheats under social pressure.',
        'Improved AI–Human Interface for smoother gaslighting detection.'
      ]
    },
    {
      title: '🧘‍♀️ Bug Fixes',
      items: [
        'Fixed issue where users confused validation with love.',
        'Resolved bug where free will kept reverting to "auto."',
        'Patched infinite loop in "checking notifications again."',
        'Removed deprecated feature Hope Without Wi-Fi.',
        'Fixed grammar in internal monologue (pending re-deployment).'
      ]
    },
    {
      title: '⚠️ Known Issues',
      items: [
        'Some users still experience Existential Dread when idle.',
        'Consciousness remains unstable across devices.',
        'Faith in Humanity may drop unexpectedly during news updates.',
        'Privacy Settings continue to be decorative only.',
        'AI Alignment still "in progress."'
      ]
    },
    {
      title: '💾 Upcoming Updates',
      items: [
        'Support for Compassion v2.0 with optional dark humor.',
        'Integration with Universal Basic Meaning (pilot program).',
        'Migration to Heaven 3.1 delayed pending terms acceptance.',
        'Beta testing Eternal Bliss (freemium) — microtransactions may apply.'
      ]
    }
  ],
  benedictionTop: 'Blessed be the users who reboot often.',
  benedictionBottom: 'For theirs is the kingdom of fewer pop-ups.'
};

function useTypewriter(text, speed = 18, disabled = false) {
  const [out, setOut] = useState(disabled ? text : '');
  const i = useRef(0);
  useEffect(() => {
    if (disabled) return;
    i.current = 0;
    setOut('');
    const id = setInterval(() => {
      setOut((prev) => prev + text.charAt(i.current++));
      if (i.current >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed, disabled]);
  return out;
}

export default function PatchNotes() {
  const reduce = useReducedMotion();
  useEffect(() => {
    document.title = 'Blessed Patch Notes - Our Lady of Perpetual Beta';
    // Ensure English document language to avoid locale font quirks
    const prev = document.documentElement.getAttribute('lang');
    document.documentElement.setAttribute('lang', 'en');
    return () => {
      if (prev) document.documentElement.setAttribute('lang', prev);
      else document.documentElement.removeAttribute('lang');
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Top bar with Home link */}
      <div style={{ padding: '12px 24px', borderBottom: '1px solid rgba(255,255,255,0.15)' }}>
        <Link to="/" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'underline', fontSize: 14 }}>← Home</Link>
      </div>

      <main style={{ maxWidth: 880, margin: '0 auto', padding: '24px' }}>
        <header style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: 40, lineHeight: 1.15, fontWeight: 600, margin: 0 }}>
            {notes.header.title}
          </h1>
          <p style={{ marginTop: 12, opacity: 0.9 }}>{notes.header.subtitle}</p>
          <p style={{ marginTop: 6, opacity: 0.8 }}>{notes.header.issued}</p>
          <div style={{ margin: '20px 0', textAlign: 'center', opacity: 0.5 }}>⸻</div>
          <StatusLine text={notes.header.status} reduce={reduce} />
        </header>

        <div style={{ display: 'grid', gap: 32 }}>
          {notes.sections.map((sec, idx) => (
            <>
              <div style={{ textAlign: 'center', opacity: 0.5 }}>⸻</div>
              <Section key={idx} title={sec.title} items={sec.items} index={idx} />
            </>
          ))}
        </div>

        <div style={{ textAlign: 'center', opacity: 0.5, marginTop: 48 }}>⸻</div>
        <footer style={{ marginTop: 16, fontSize: 14, opacity: 0.85, textAlign: 'center', lineHeight: 1.6 }}>
          <p>{notes.benedictionTop}</p>
          <p>{notes.benedictionBottom}</p>
          <div style={{ marginTop: 16 }}>
            <Link to="/" style={{ textDecoration: 'underline', opacity: 0.85 }}>Return Home</Link>
          </div>
        </footer>
      </main>
    </div>
  );
}

function Section({ title, items, index }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.05 }}
      aria-labelledby={`${slug(title)}-h`}
    >
      <h2 id={`${slug(title)}-h`} style={{ fontSize: 28, fontWeight: 500, marginBottom: 8 }}>
        {title}
      </h2>
      <ul style={{ display: 'grid', gap: 8, paddingLeft: 24 }}>
        {items.map((t, i) => (
          <li key={i} style={{ opacity: 0.9, lineHeight: 1.65 }}>
            <TypeLine text={t} />
          </li>
        ))}
      </ul>
    </motion.section>
  );
}

function TypeLine({ text }) {
  // Render plain text to avoid any browser text artifacts
  return <span>{text}</span>;
}

function StatusLine({ text }) {
  return <p className="mt-3 text-gray-400 text-sm">{text}</p>;
}

function slug(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}
