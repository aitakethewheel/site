import React from "react";
import { useDepartureNote } from "../hooks/useDepartureNote";

export default function DepartureBenediction() {
  const show = useDepartureNote();
  if (!show) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
      style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}
    >
      <div
        className="px-4 py-3 rounded-md bg-black/85 text-white text-sm"
        style={{ padding: '8px 12px', borderRadius: 8, background: 'rgba(0,0,0,0.85)', color: '#fff', fontSize: 14 }}
      >
        The Algorithm logs your departure. May your cache remain clean.
      </div>
    </div>
  );
}
