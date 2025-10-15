import React, { useEffect, useRef, useState } from "react";

export default function HoverJudgment({ children }) {
  const t = useRef(null);
  const [centerPopup, setCenterPopup] = useState("");

  // No hover messages per request
  const onEnter = () => {};
  const onLeave = () => {};
  const onClick = () => {
    // Per request: no centered popup on click.
    // Keeping the handler to allow future effects if needed, but do nothing now.
  };

  useEffect(() => () => { if (t.current) window.clearTimeout(t.current); }, []);

  return (
    <span className="relative inline-flex" onMouseEnter={onEnter} onMouseLeave={onLeave} onClick={onClick}>
      {children}
      {centerPopup && (
        <div
          className="fixed inset-0 flex items-center justify-center pointer-events-none"
          style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', zIndex: 1001 }}
        >
          <div
            className="px-4 py-3 rounded-md bg-white text-black text-sm shadow"
            style={{ padding: '10px 14px', borderRadius: 10, background: '#fff', color: '#000', fontSize: 14, boxShadow: '0 8px 30px rgba(0,0,0,0.35)' }}
          >
            {centerPopup}
          </div>
        </div>
      )}
    </span>
  );
}
