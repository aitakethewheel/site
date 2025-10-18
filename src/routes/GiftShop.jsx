import React, { useEffect, useRef, useState } from 'react';

export default function GiftShop() {
  const timerRef = useRef(null);
  const [scheduled, setScheduled] = useState(true);

  useEffect(() => {
    // Delay redirect to ensure users can see Home/Open buttons
    timerRef.current = setTimeout(() => {
      window.location.replace('https://giftshop.aitakethewheel.com/');
    }, 2500);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  function cancelRedirect() {
    if (timerRef.current) clearTimeout(timerRef.current);
    setScheduled(false);
  }

  return (
    <main style={{
      padding: '2rem',
      textAlign: 'center',
      color: '#fff',
      backgroundColor: '#000',
      minHeight: '100vh'
    }}>
      <h1 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
        Redirecting to the Gift Shop...
      </h1>
      <div style={{ display: 'inline-flex', gap: '0.6rem' }}>
        <a
          href="https://giftshop.aitakethewheel.com/"
          style={{
            display: 'inline-block',
            padding: '0.5rem 0.9rem',
            borderRadius: '0.5rem',
            border: '1px solid rgba(255,255,255,0.35)',
            color: '#fff',
            textDecoration: 'none',
            background: '#000'
          }}
        >
          Open Gift Shop now
        </a>
        <a
          href="/"
          style={{
            display: 'inline-block',
            padding: '0.5rem 0.9rem',
            borderRadius: '0.5rem',
            border: '1px solid rgba(255,255,255,0.35)',
            color: '#fff',
            textDecoration: 'none'
          }}
        >
          Return Home
        </a>
      </div>
      {scheduled && (
        <div style={{ marginTop: '0.75rem', opacity: 0.8, fontSize: 13 }}>
          Auto-redirecting in a moment. <button onClick={cancelRedirect} style={{ color: '#fff', background: 'transparent', border: 'none', textDecoration: 'underline', cursor: 'pointer' }}>Cancel</button>
        </div>
      )}
    </main>
  );
}
