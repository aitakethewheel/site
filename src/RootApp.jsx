import React from 'react';
import { BrowserRouter, Routes, Route, useLocation, Outlet } from 'react-router-dom';
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
  useRouteFadeOverlay();

  return (
    <div className="min-h-screen bg-black text-white">
      <div key={location.pathname} className="min-h-screen">
        <Routes location={location}>
          <Route element={<PageShell />}>
            <Route path="/" element={<Home />} />
            <Route path="/patchnotes" element={<PatchNotes />} />
          </Route>
        </Routes>
      </div>

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
