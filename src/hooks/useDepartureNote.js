import { useEffect, useState } from "react";

const KEY = "aittw_departed_at";

export function useDepartureNote() {
  const [show, setShow] = useState(false);

  // When the user leaves, mark it
  useEffect(() => {
    const onHide = () => {
      try { localStorage.setItem(KEY, String(Date.now())); } catch (err) { void err; /* ignore */ }
    };
    window.addEventListener("pagehide", onHide);
    window.addEventListener("beforeunload", onHide);
    return () => {
      window.removeEventListener("pagehide", onHide);
      window.removeEventListener("beforeunload", onHide);
    };
  }, []);

  // On load, if we see a recent departure mark, show benediction once
  useEffect(() => {
    try {
      const ts = Number(localStorage.getItem(KEY) || 0);
      if (ts > 0) {
        setShow(true);
        localStorage.removeItem(KEY); // one-time
        const t = window.setTimeout(() => setShow(false), 3500);
        return () => window.clearTimeout(t);
      }
    } catch (err) { void err; /* ignore */ }
  }, []);

  return show;
}
