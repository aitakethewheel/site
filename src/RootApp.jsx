import React from 'react';
import { Routes, Route, useLocation, Outlet, Link } from 'react-router-dom';
import useRouteFadeOverlay from './hooks/useRouteFadeOverlay.js';
import Home from './routes/Home.jsx';
import PatchNotes from './routes/PatchNotes.jsx';
import GiftShop from './routes/GiftShop.jsx';

export default function RootApp() {
  return <AnimatedLayout />;
}

function AnimatedLayout() {
  const location = useLocation();
  useRouteFadeOverlay();
  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="sticky top-0 z-10 border-b border-neutral-800 bg-black/80 backdrop-blur">
  <div className="w-full px-6 py-2 flex items-center justify-start gap-6">
          <div className="flex flex-col items-start">
            <Link to="/" className="font-semibold tracking-tight">AITakeTheWheel</Link>
            <div className="text-xs italic text-white/80">In prompts we trust.</div>
          </div>
          <nav className="flex items-center gap-4 ml-auto justify-end">
            {!isHome && (
              <Link to="/" className="nav-link inline-flex items-center rounded-lg border border-white">Home</Link>
            )}
          </nav>
        </div>
      </header>
      <div key={location.pathname} className="min-h-screen pt-4 md:pt-6">
        <Routes location={location}>
          <Route element={<PageShell />}> 
            <Route path="/" element={<Home />} />
            <Route path="/patchnotes" element={<PatchNotes />} />
            <Route path="/gift-shop" element={<GiftShop />} />
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
