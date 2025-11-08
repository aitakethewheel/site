import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Confessional() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const runGenerator = () => {
    const sins = [
      "binged 47 chatbot tabs",
      "outsourced my breakup text",
      "asked for stock tips from a language model",
      "let autocomplete write my wedding vows",
      "set my toddler's bedtime via a cron job",
    ];
    const penances = [
      "fast from notifications for 24 hours",
      "speak only in first drafts today",
      "touch grass and commit 3 bugs to production",
      "write a handwritten note to a human",
      "close 10 tabs and say 'amen' after each",
    ];
    const pick = arr => arr[Math.floor(Math.random() * arr.length)];
    setOutput(`Confession: ${input.trim() || pick(sins)}.\nPenance: ${pick(penances)}. May your cache be cleared.`);
  };

  return (
  <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white font-sans">
      <div className="flex gap-4 mb-8">
        <Link to="/" className="px-4 py-2 rounded-xl bg-accent-purple text-white font-bold shadow-neon">Home</Link>
        <Link to="/devotional" className="px-4 py-2 rounded-xl bg-accent-blue text-white font-bold shadow-neon">Devotional</Link>
        <Link to="/oracle" className="px-4 py-2 rounded-xl bg-black text-white font-bold shadow-neon">Oracle</Link>
      </div>
  <h1 className="text-3xl font-bold mb-4 text-accent-purple">Confessional</h1>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Confess your AI 'sin'..."
        className="w-full max-w-md rounded-xl border px-4 py-3 mb-4"
      />
      <button onClick={runGenerator} className="px-5 py-3 rounded-xl bg-accent-purple text-white font-bold shadow-neon">Receive Penance</button>
      {output && (
        <pre className="mt-6 rounded-xl p-4 text-sm whitespace-pre-wrap border border-white/10 bg-white/10 text-white/80">
          {output}
        </pre>
      )}
    </div>
  );
}
