import { useEffect, useRef, useState } from "react";

const IDLE_MS = 15000; // 15s idle
const RESUME_SHOW_MS = 2000; // show "Faith restored." for 2s

const IDLE_MSG = "Your silence has been logged for quality assurance.";
const RESUME_MSG = "Faith restored.";

export function useIdleWhisper() {
  const [line, setLine] = useState("");
  const idleTimer = useRef(null);
  const hideTimer = useRef(null);
  const hadIdle = useRef(false); // whether an idle message is currently/was just shown
  const lineRef = useRef("");

  useEffect(() => {
    lineRef.current = line;
  }, [line]);

  const clearTimers = () => {
    if (idleTimer.current) window.clearTimeout(idleTimer.current);
    if (hideTimer.current) window.clearTimeout(hideTimer.current);
  };

  const scheduleIdle = () => {
    if (idleTimer.current) window.clearTimeout(idleTimer.current);
    idleTimer.current = window.setTimeout(() => {
      // show idle message and keep it until activity resumes
      setLine(IDLE_MSG);
      hadIdle.current = true;
      // keep showing until activity; also re-arm for continued checks
      scheduleIdle();
    }, IDLE_MS);
  };

  // We intentionally set up listeners once; timers are managed internally
  useEffect(() => {
    const bump = () => {
      // stop pending idle check first
      if (idleTimer.current) {
        window.clearTimeout(idleTimer.current);
        idleTimer.current = null;
      }
      // if an idle message was shown (or any message currently shown), flip to "Faith restored." and auto-hide in 2s
      if (hadIdle.current || lineRef.current) {
        if (hideTimer.current) window.clearTimeout(hideTimer.current);
        setLine(RESUME_MSG);
        hadIdle.current = false;
        hideTimer.current = window.setTimeout(() => {
          setLine("");
          hideTimer.current = null;
        }, RESUME_SHOW_MS);
      }
      // re-arm idle watcher
      scheduleIdle();
    };
    scheduleIdle();
    window.addEventListener("mousemove", bump);
    window.addEventListener("keydown", bump);
    window.addEventListener("touchstart", bump, { passive: true });
    return () => {
      clearTimers();
      window.removeEventListener("mousemove", bump);
      window.removeEventListener("keydown", bump);
      window.removeEventListener("touchstart", bump);
    };
  }, []);

  return line; // empty string means show nothing
}
