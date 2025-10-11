import React from "react";
import { Link } from "react-router-dom";

export default function Miracles() {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="mx-auto max-w-6xl px-6 h-16 flex items-center">
        <Link to="/" className="text-white font-semibold">AITakeTheWheel</Link>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-12">
        <h1 className="text-4xl md:text-5xl font-light mb-6">Miracles</h1>
        <p className="text-white/70 max-w-2xl">User submissions of algorithmic deliverance. Send yours and we might canonize it.</p>
        <ul className="mt-8 space-y-4">
          <li className="border border-white/10 rounded-lg p-4">My compile time went from 7m to 2s after I restarted the IDE.</li>
          <li className="border border-white/10 rounded-lg p-4">Chatbot refused to write my email. I took a walk. I didn’t need to send it.</li>
        </ul>
      </main>
    </div>
  );
}
