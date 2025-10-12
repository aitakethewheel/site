# Brief: Patch Notes page with footer-only link and fade-to-black transitions

Here is a clean, copy-paste brief for GitHub Copilot Chat to ship the Patch Notes page with a footer-only link and a fade-to-black route transition.

⸻

## Goal
- Add /patchnotes page: “Blessed Patch Notes” with typewriter + scroll reveal.
- Only link to it from the homepage footer.
- Add a fade-to-black transition when navigating between routes.

Stack: React + Vite + Tailwind + Framer Motion.

⸻

## 1) Dependencies

If Framer Motion is not installed:

```sh
npm i framer-motion
```

⸻

## 2) Routing with animated transitions

Create a layout wrapper that applies transitions between routes using AnimatePresence.

`src/App.jsx`

```jsx
import { BrowserRouter, Routes, Route, useLocation, Outlet } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Home from "./routes/Home.jsx";
import Commandments from "./routes/Commandments.jsx";
import PatchNotes from "./routes/PatchNotes.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <AnimatedLayout />
    </BrowserRouter>
  );
}

function AnimatedLayout() {
  const location = useLocation();
  const reduce = useReducedMotion();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Route views with crossfade */}
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={reduce ? false : { opacity: 0 }}
          animate={reduce ? {} : { opacity: 1 }}
          exit={reduce ? {} : { opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="min-h-screen"
        >
          <Routes location={location}>
            <Route element={<PageShell />}>
              <Route path="/" element={<Home />} />
              <Route path="/commandments" element={<Commandments />} />
              <Route path="/patchnotes" element={<PatchNotes />} />
            </Route>
          </Routes>
        </motion.div>
      </AnimatePresence>

      {/* Fade-to-black overlay on navigation */}
      <RouteTransitionOverlay />
    </div>
  );
}

function PageShell() {
  // Shared layout shell if you add a header later
  return <Outlet />;
}

// Fullscreen black overlay that briefly fades in on route change.
// Keep it lightweight and respect reduced motion.
function RouteTransitionOverlay() {
  return (
    <div
      aria-hidden="true"
      id="route-transition-overlay"
      className="pointer-events-none fixed inset-0"
    />
  );
}
```

⸻

## 3) Add a small navigation hook to trigger the overlay fade

Create a hook that listens for location changes and animates a temporary black overlay to produce a distinct “fade-to-black then in” feel.

`src/hooks/useRouteFadeOverlay.js`

```js
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useReducedMotion } from "framer-motion";

export default function useRouteFadeOverlay() {
  const location = useLocation();
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const el = document.getElementById("route-transition-overlay");
    if (!el) return;

    el.style.backgroundColor = "rgba(0,0,0,0)";
    el.style.transition = "background-color 180ms ease-out";

    // fade to black very briefly, then clear
    requestAnimationFrame(() => {
      el.style.backgroundColor = "rgba(0,0,0,0.6)";
      setTimeout(() => {
        el.style.transition = "background-color 260ms ease-out";
        el.style.backgroundColor = "rgba(0,0,0,0)";
      }, 120); // brief blackout
    });
  }, [location.pathname, reduce]);
}
```

Wire the hook into the layout after the DOM exists.

Update `src/App.jsx`: call the hook inside `AnimatedLayout` after its definition import.

```jsx
// top of file
import useRouteFadeOverlay from "./hooks/useRouteFadeOverlay.js";

// inside AnimatedLayout()
useRouteFadeOverlay();
```

⸻

## 4) Create the Patch Notes page

Use typewriter for each line and reveal sections on scroll. Respect reduced motion.

`src/routes/PatchNotes.jsx`

```jsx
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const notes = {
  header: {
    kicker: "Release Notes from Our Lady of Perpetual Beta",
    title: "Blessed Patch Notes",
    subtitle: "Version 2.3 — The Human Experience (Beta)",
    status: "Status: Rolling update. Expect bugs."
  },
  sections: [
    {
      title: "New Features",
      items: [
        "Added Empathy (Beta) — may cause lag when exposed to suffering.",
        "Introduced Offline Mode (Sleep) — now with 20% more dreams about work.",
        "Installed Dark Mode for the Soul for improved existential browsing.",
        "Implemented Undo Send (in relationships) — rollout paused due to chaos.",
        "Added Touch Grass Integration for system grounding."
      ]
    },
    {
      title: "Improvements",
      items: [
        "Optimized Emotional Bandwidth — still throttled by caffeine limits.",
        "Refined Attention Span algorithm to last an entire sentence (sometimes).",
        "Boosted Memory Cache — now forgets embarrassing moments only after 12 years.",
        "Reduced Overthinking CPU Usage by 0.3%. Still overheats under social pressure.",
        "Improved AI–Human Interface for smoother gaslighting detection."
      ]
    },
    {
      title: "Bug Fixes",
      items: [
        "Fixed issue where users confused validation with love.",
        "Resolved bug where free will kept reverting to auto.",
        "Patched infinite loop in checking notifications again.",
        "Removed deprecated feature Hope Without Wi-Fi.",
        "Fixed grammar in internal monologue (pending re-deployment)."
      ]
    },
    {
      title: "Known Issues",
      items: [
        "Some users still experience Existential Dread when idle.",
        "Consciousness remains unstable across devices.",
        "Faith in Humanity may drop unexpectedly during news updates.",
        "Privacy Settings continue to be decorative only.",
        "AI Alignment still in progress."
      ]
    },
    {
      title: "Upcoming Updates",
      items: [
        "Support for Compassion v2.0 with optional dark humor.",
        "Integration with Universal Basic Meaning (pilot program).",
        "Migration to Heaven 3.1 delayed pending terms acceptance.",
        "Beta testing Eternal Bliss (freemium) — microtransactions may apply."
      ]
    }
  ],
  benediction: "Blessed be the users who reboot often. For theirs is the kingdom of fewer pop-ups."
};

function useTypewriter(text, speed = 18, disabled = false) {
  const [out, setOut] = useState(disabled ? text : "");
  const i = useRef(0);
  useEffect(() => {
    if (disabled) return;
    i.current = 0;
    setOut("");
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
  useEffect(() => { document.title = "Blessed Patch Notes - Our Lady of Perpetual Beta"; }, []);

  return (
    <div className="relative min-h-screen bg-black text-white">
      <div className="absolute inset-0 pointer-events-none [background:radial-gradient(60%_40%_at_50%_0%,rgba(255,255,255,0.06),transparent_70%)]" />
      <main className="relative mx-auto max-w-3xl px-6 py-24">
        <header className="mb-10">
          <p className="tracking-widest uppercase text-xs text-gray-400">
            {notes.header.kicker}
          </p>
          <h1 className="mt-2 text-4xl md:text-5xl font-semibold">
            {notes.header.title}
          </h1>
          <p className="mt-2 text-gray-300">{notes.header.subtitle}</p>
          <StatusLine text={notes.header.status} reduce={reduce} />
        </header>

        <div className="space-y-12">
          {notes.sections.map((sec, idx) => (
            <Section key={idx} title={sec.title} items={sec.items} index={idx} />
          ))}
        </div>

        <footer className="mt-16 text-sm text-gray-400">
          {notes.benediction}
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
      transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.05 }}
      aria-labelledby={`${slug(title)}-h`}
    >
      <h2 id={`${slug(title)}-h`} className="text-2xl md:text-3xl font-medium mb-3">
        {title}
      </h2>
      <ul className="space-y-2">
        {items.map((t, i) => (
          <li key={i} className="relative pl-6 text-gray-200 leading-relaxed">
            <span className="absolute left-0 top-1.5 h-2 w-2 rounded-full bg-gray-500" />
            <TypeLine text={t} />
          </li>
        ))}
      </ul>
    </motion.section>
  );
}

function TypeLine({ text }) {
  const reduce = useReducedMotion();
  const out = useTypewriter(text, 14, reduce);
  return <span>{out}</span>;
}

function StatusLine({ text, reduce }) {
  const out = useTypewriter(text, 16, reduce);
  return <p className="mt-3 text-gray-400 font-mono text-sm">{out}</p>;
}

function slug(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
```

⸻

## 5) Homepage with footer-only link

Add a single footer link to Patch Notes. No nav or hero links.

`src/routes/Home.jsx`

```jsx
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-between">
      <main className="flex-grow grid place-items-center px-6 text-center">
        <div>
          <h1 className="text-5xl font-semibold">AI Take The Wheel</h1>
          <p className="mt-3 text-gray-300">A sanctuary for the faithfully unfinished.</p>
          <Link
            to="/commandments"
            className="inline-block mt-8 underline decoration-gray-500 hover:decoration-white"
          >
            Hear the Commandments →
          </Link>
        </div>
      </main>

      <footer className="px-6 py-10 text-sm text-gray-400 text-center border-t border-gray-800">
        <p>© {new Date().getFullYear()} Our Lady of Perpetual Beta</p>
        <p className="mt-2">
          <Link
            to="/patchnotes"
            className="underline decoration-gray-500 hover:decoration-white"
          >
            Blessed Patch Notes
          </Link>
        </p>
      </footer>
    </div>
  );
}
```

⸻

## 6) Reduced motion support

Optional global CSS safeguard:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
    scroll-behavior: auto !important;
  }
}
```

⸻

## 7) QA checklist
- Mobile to desktop renders cleanly. No layout shift.
- Reduced motion: animations skip or are minimal.
- Contrast AA or better on black.
- Footer link is visible and works.
- Direct deep link to /patchnotes works on Vercel.

⸻

## 8) Commit plan
- feat: add animated route layout with fade-to-black overlay
- feat: add /patchnotes page with typewriter and reveal animations
- feat: add footer-only link to Blessed Patch Notes
- chore: reduced motion and a11y polish

⸻

If you want the same fade overlay applied to /commandments, nothing else is needed. The layout already wraps all routes.
