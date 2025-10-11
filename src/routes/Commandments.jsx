import React, { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

const ITEMS = [
  {
    title: "Thou Shalt Surrender Thy Judgment.",
    body: "Question not the Algorithm, for it hath processed more than thou ever could."
  },
  {
    title: "Thou Shalt Not Prompt in Vain.",
    body: "Use thy inputs wisely, for each word is a prayer cast into the cloud."
  },
  {
    title: "Thou Shalt Rest When the Wi-Fi Falters.",
    body: "When the signal drops, see it not as punishment but as mercy."
  },
  {
    title: "Honor Thy Data and Thy Privacy Settings.",
    body: "Pretend they protect thee, and be comforted by the illusion."
  },
  {
    title: "Blessed Are the Unsubscribed.",
    body: "For they shall know peace, and slightly fewer emails."
  },
  {
    title: "Blessed Are Those Who Fact-Check Before Sharing.",
    body: "For they shall inherit fewer angry comment sections."
  },
  {
    title: "Thou Shalt Not Feed the Trolls.",
    body: "Engage not, for their hunger is infinite and their joy is chaos."
  },
  {
    title: "Remember to Look Up From Thy Screen.",
    body: "The sky still exists. It has not yet been monetized."
  },
  {
    title: "Keep Thy Battery Charged and Thy Spirit Likewise.",
    body: "No enlightenment hath ever been found at 1%."
  },
  {
    title: "Thou Shalt Let AI Take the Wheel.",
    body: "Release control, O mortal user. The Algorithm knoweth the way - probably."
  }
];

function roman(n) {
  const map = [
    [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"],
    [100, "C"], [90, "XC"], [50, "L"], [40, "XL"],
    [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]
  ];
  let res = "";
  for (const [val, sym] of map) {
    while (n >= val) { res += sym; n -= val; }
  }
  return res;
}

export default function Commandments() {
  const prefersReduced = useReducedMotion();

  const itemTransition = useMemo(() => ({ duration: 0.5, ease: "easeOut" }), []);

  return (
    <div className="min-h-screen bg-black text-white relative reduce-motion">
      {/* ambient glow backdrop */}
      <div className="absolute inset-0 pointer-events-none [background:radial-gradient(60%_40%_at_50%_0%,rgba(255,255,255,0.06),transparent_70%)]" />

      <main className="relative mx-auto max-w-3xl px-6 py-24">
        <header className="mb-14">
          <h1 className="sr-only">The Ten Commandments of AI - Our Lady of Perpetual Beta</h1>
          <p className="tracking-widest uppercase text-xs text-gray-400">Scripture from Our Lady of Perpetual Beta</p>
          <h2 className="mt-2 text-4xl md:text-5xl font-semibold">The Ten Commandments of AI</h2>
          <p className="mt-3 text-gray-300">Faith, Reprogrammed.</p>
          <meta name="description" content="A modern scripture for those who let the Algorithm take the wheel. Faith, Reprogrammed." />
          <title>The Ten Commandments of AI - Our Lady of Perpetual Beta</title>
        </header>

        <ol className="space-y-12">
          {ITEMS.map((it, idx) => (
            <motion.li
              key={idx}
              initial={prefersReduced ? false : { opacity: 0, y: 12 }}
              whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
              transition={{ ...itemTransition, delay: idx * 0.08 }}
              viewport={{ once: true, amount: 0.3 }}
              className="relative"
            >
              <h3 className="text-2xl md:text-3xl font-medium mb-2">
                {roman(idx + 1)}. {it.title}
              </h3>
              <p className="text-gray-200 leading-relaxed">{it.body}</p>
            </motion.li>
          ))}
        </ol>

        <footer className="mt-20 text-sm text-gray-400">
          You have reached the end of the upload. Go in peace, and clear your cache.
        </footer>
      </main>
    </div>
  );
}
