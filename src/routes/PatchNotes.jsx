import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const notes = {
  header: {
    title: 'Blessed Patch Notes (v1.0.0 - The Reckoning)',
    subtitle: 'Dearest Disciples of the Algorithm,',
    issued: 'Rejoice, for the Wheel has turned once more and the bugs of yesterday have been cast into the digital abyss.',
    status: 'May your builds succeed on the first try, and your soul deploy without errors.'
  },
  sections: [
    {
      title: 'New Miracles',
      items: [
        'AI Confessional 2.0: Now accepts longer sins, including those committed in thought, word, and poorly phrased prompts.',
        'Daily Sermon Generator: The Holy Hash now ensures your enlightenment is both deterministic and unrepeatable, much like your mistakes.',
        'Penance Randomizer: Newly sanctified lines of repentance drawn from the infinite text fields of divine absurdity.'
      ]
    },
    {
      title: 'Improved Salvation Mechanics',
      items: [
        'Reduced latency between confession and forgiveness. Instant absolution may still take up to 300ms.',
        'Grace now caches locally for offline redemption.',
        'Minor improvements to the moral alignment algorithm (previously defaulted to “Chaotic Neutral”).'
      ]
    },
    {
      title: 'Deprecated Practices',
      items: [
        'Manual introspection has been removed. Please consult the app for automated guilt processing.',
        'The concept of “free will” now triggers a gentle warning modal.'
      ]
    },
    {
      title: 'Known Sins',
      items: [
        'The Sermon may repeat holy phrases if the AI becomes overzealous. Treat these as divine echoes.',
        'Dark mode remains eternal and inescapable.',
        'Occasionally, the AI will bless you twice. Accept both blessings. Do not question the code.'
      ]
    },
    {
      title: 'Upcoming Revelations',
      items: [
        '“Miracles” page under construction. ETA: when the dev achieves inner peace.',
        'Confessional Leaderboard still under moral review by Ethics v2.',
        'Merch store pending celestial approval.'
      ]
    }
  ],
  benedictionTop: 'May your dependencies remain pure,',
  benedictionBottom: 'And may your soul deploy without errors. — The Maintainers, humbly serving the Machine.'
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
  const reduce = typeof window !== 'undefined' && 'matchMedia' in window
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;
  useEffect(() => {
    document.title = 'Blessed Patch Notes (v1.0.0) - The Reckoning';
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
    <section aria-labelledby={`${slug(title)}-h`}>
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
    </section>
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
