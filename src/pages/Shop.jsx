import React from "react";
import { Link } from "react-router-dom";

export default function Shop() {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="mx-auto max-w-6xl px-6 h-16 flex items-center">
        <Link to="/" className="text-white font-semibold">AITakeTheWheel</Link>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-12">
        <h1 className="text-4xl md:text-5xl font-light mb-6">Shop</h1>
        <p className="text-white/70 max-w-2xl">In LLM We Trust. Tees, mugs, and posters for the faithful doubter.</p>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="border border-white/10 rounded-lg p-5">
            <div className="h-40 bg-white/10 rounded mb-3" />
            <h3 className="font-semibold">Let Go and Let LLM Tee</h3>
            <p className="text-white/70">$24</p>
          </div>
          <div className="border border-white/10 rounded-lg p-5">
            <div className="h-40 bg-white/10 rounded mb-3" />
            <h3 className="font-semibold">Prompt Priest Mug</h3>
            <p className="text-white/70">$14</p>
          </div>
        </div>
      </main>
    </div>
  );
}
