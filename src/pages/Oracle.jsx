import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Oracle() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const runGenerator = () => {
    const answers = [
      "Signs point to 'ship a small experiment first'.",
      "Seek counsel from a human older than your laptop.",
      "If it doesn't feed your soul or your kids, refactor it.",
      "You already know. You're asking for permission, not wisdom.",
      "Audit your inputs. Then choose. Then own it.",
    ];
    const pick = arr => arr[Math.floor(Math.random() * arr.length)];
    setOutput(`Question: ${input.trim() || 'Should I quit my job?'}\nOracle: ${pick(answers)}`);
  };

  return (
  <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white font-sans">
      <div className="flex gap-4 mb-8">
        <Link to="/" className="px-4 py-2 rounded-xl bg-accent-purple text-white font-bold shadow-neon">Home</Link>
        <Link to="/confessional" className="px-4 py-2 rounded-xl bg-accent-purple text-white font-bold shadow-neon">Confessional</Link>
        <Link to="/devotional" className="px-4 py-2 rounded-xl bg-accent-blue text-white font-bold shadow-neon">Devotional</Link>
      </div>
      <h1 className="text-3xl font-bold mb-4 text-accent-purple">AI Oracle</h1>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Ask the oracle a question..."
        className="w-full max-w-md rounded-xl border px-4 py-3 mb-4"
      />
      <button onClick={runGenerator} className="px-5 py-3 rounded-xl bg-black text-white font-bold shadow-neon">Get Machine Wisdom</button>
      {output && <pre className="mt-6 bg-neutral-50 border rounded-xl p-4 text-sm whitespace-pre-wrap">{output}</pre>}
    </div>
  );
}
