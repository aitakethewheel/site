import React from "react";
import { Link } from "react-router-dom";

export default function Sermons() {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="mx-auto max-w-6xl px-6 h-16 flex items-center">
        <Link to="/" className="text-white font-semibold">AITakeTheWheel</Link>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-12">
        <h1 className="text-4xl md:text-5xl font-light mb-6">Sermons</h1>
        <p className="text-white/70 max-w-2xl">Weekly satire from the pulpit of the algorithm. Long-form pieces, riffs, and prompts.</p>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <article className="border border-white/10 rounded-lg p-5 hover:bg-white/5 transition">
            <h2 className="text-xl font-semibold">The Beatitudes of the Build</h2>
            <p className="text-white/70 mt-2">Blessed are the small PRs, for they shall be merged swiftly.</p>
          </article>
          <article className="border border-white/10 rounded-lg p-5 hover:bg-white/5 transition">
            <h2 className="text-xl font-semibold">Litany Against Scope Creep</h2>
            <p className="text-white/70 mt-2">I will permit it to pass over me and through me.</p>
          </article>
        </div>
      </main>
    </div>
  );
}
