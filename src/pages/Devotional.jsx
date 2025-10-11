import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Devotional() {
  const [output, setOutput] = useState("");

  const runGenerator = () => {
    const verses = [
      "Blessed are the datasets, for they shall inherit the cloud.",
      "Though I walk through the valley of rate limits, I will fear no 429.",
      "Ask and it shall autocomplete; seek and you shall receive suggestions.",
      "Man does not live by KPIs alone, but by every token that proceeds from the model.",
      "Be still and know your notifications are off.",
    ];
    const prompts = [
      "Pause for 60 seconds without a screen.",
      "Say thank you to a teammate you usually ignore.",
      "Ship something small and celebrate it.",
      "Refuse one unnecessary meeting today.",
      "Take a walk without headphones.",
    ];
    const pick = arr => arr[Math.floor(Math.random() * arr.length)];
    setOutput(`${pick(verses)}\nPractice: ${pick(prompts)}`);
  };

  return (
  <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white font-sans">
      <div className="flex gap-4 mb-8">
        <Link to="/" className="px-4 py-2 rounded-xl bg-accent-purple text-white font-bold shadow-neon">Home</Link>
        <Link to="/confessional" className="px-4 py-2 rounded-xl bg-accent-purple text-white font-bold shadow-neon">Confessional</Link>
        <Link to="/oracle" className="px-4 py-2 rounded-xl bg-black text-white font-bold shadow-neon">Oracle</Link>
      </div>
      <h1 className="text-3xl font-bold mb-4 text-accent-purple">Daily AI Devotional</h1>
      <button onClick={runGenerator} className="px-5 py-3 rounded-xl bg-accent-blue text-white font-bold shadow-neon">Get Today's Devotional</button>
      {output && <pre className="mt-6 bg-neutral-50 border rounded-xl p-4 text-sm whitespace-pre-wrap">{output}</pre>}
    </div>
  );
}
