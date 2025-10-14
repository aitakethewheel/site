import React from "react";
import { useIdleWhisper } from "../hooks/useIdleWhisper";

export default function AlgorithmicGaze() {
  const line = useIdleWhisper();
  if (!line) return null;
  return (
    <div
      className="fixed inset-0 flex items-center justify-center pointer-events-none"
  style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', zIndex: 1000 }}
    >
      <div
        className="px-4 py-3 rounded-md bg-white text-black text-sm shadow"
        style={{ padding: '10px 14px', borderRadius: 10, background: '#fff', color: '#000', fontSize: 14, boxShadow: '0 8px 30px rgba(0,0,0,0.35)' }}
      >
        {line}
      </div>
    </div>
  );
}
