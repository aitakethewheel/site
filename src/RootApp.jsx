import React from 'react';
import { BrowserRouter, Routes, Route, useLocation, Outlet } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import useRouteFadeOverlay from './hooks/useRouteFadeOverlay.js';
import Home from './routes/Home.jsx';
import PatchNotes from './routes/PatchNotes.jsx';

export default function RootApp() {
  return (
    <BrowserRouter>
      <AnimatedLayout />
    </BrowserRouter>
  );
}

function AnimatedLayout() {
  const location = useLocation();
  const reduce = useReducedMotion();
  useRouteFadeOverlay();

  return (
    <div className="min-h-screen bg-black text-white">
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={reduce ? false : { opacity: 0 }}
          animate={reduce ? {} : { opacity: 1 }}
          exit={reduce ? {} : { opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="min-h-screen"
        >
          <Routes location={location}>
            <Route element={<PageShell />}>
              <Route path="/" element={<Home />} />
              <Route path="/patchnotes" element={<PatchNotes />} />
            </Route>
          </Routes>
        </motion.div>
      </AnimatePresence>

      <RouteTransitionOverlay />
    </div>
  );
}

function PageShell() {
  return <Outlet />;
}

function RouteTransitionOverlay() {
  return (
    <div aria-hidden="true" id="route-transition-overlay" className="pointer-events-none fixed inset-0" />
  );
}
