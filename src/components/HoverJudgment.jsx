import React, { useEffect, useRef, useState } from "react";

export default function HoverJudgment({ children }) {
  const t = useRef(null);
  const [centerPopup, setCenterPopup] = useState("");

  // No hover messages per request
  const onEnter = () => {};
  const onLeave = () => {};
  const onClick = () => {
    // Show centered popup; no hover tooltips
    setCenterPopup('Action acknowledged. Contrition recorded.');
    const hide = () => setCenterPopup("");
    // Delay binding hide listeners slightly to avoid the same click/move immediately hiding
    window.setTimeout(() => {
      document.addEventListener('mousemove', hide, { once: true });
      document.addEventListener('keydown', hide, { once: true });
      document.addEventListener('click', hide, { once: true });
      document.addEventListener('touchstart', hide, { once: true });
      document.addEventListener('wheel', hide, { once: true, passive: true });
      document.addEventListener('scroll', hide, { once: true, passive: true });
    }, 120);
    // Fallback auto-hide after 3s even if no action occurs
    window.setTimeout(hide, 3000);
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
