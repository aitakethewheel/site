import React from "react";
import { Link } from "react-router-dom";

export default function Toys() {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="mx-auto max-w-6xl px-6 h-16 flex items-center">
        <Link to="/" className="text-white font-semibold">AITakeTheWheel</Link>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-12">
        <h1 className="text-4xl md:text-5xl font-light mb-6">Toys</h1>
        <p className="text-white/70 max-w-2xl">Little experiments, generators, and rituals. More coming soon.</p>
        <ul className="mt-8 space-y-3 text-white/80">
          <li>AI Confessional</li>
          <li>Daily AI Devotional</li>
          <li>AI Oracle</li>
        </ul>
      </main>
    </div>
  );
}
