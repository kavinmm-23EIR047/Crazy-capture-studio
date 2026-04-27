import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FaArrowUp, FaPhoneAlt } from "react-icons/fa";

import HomePage    from "./pages/HomePage";
import GalleryPage from "./pages/GalleryPage";
import Navigation   from "./components/Navigation";
import FooterSection from "./components/FooterSection";
import WhatsAppChatbot from "./components/WhatsAppChatbot";
import Loader from "./components/Loader";

function ScrollToTopOnNav() {
  // Scrolls to top on gallery route change
  return null;
}

function App() {
  const [loading,       setLoading]       = useState(true);
  const [scrolled,      setScrolled]      = useState(false);
  const [progress,      setProgress]      = useState(0);
  const [showCallLabel, setShowCallLabel] = useState(false);

  /* Loader */
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 3600);
    return () => clearTimeout(t);
  }, []);

  /* Scroll tracking */
  useEffect(() => {
    const fn = () => {
      const top      = window.scrollY;
      const docH     = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(top > 280);
      setProgress(docH > 0 ? (top / docH) * 100 : 0);
    };
    window.addEventListener("scroll", fn, { passive: true });
    fn();
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* Go to top */
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  /* Show loader */
  if (loading) return <Loader />;

  return (
    <Router>
      <div className="min-h-screen relative overflow-x-hidden text-white bg-[#080810]">

        {/* ── Navigation ── */}
        <Navigation />

        {/* ── Pages ── */}
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/"        element={<HomePage />} />
            <Route path="/gallery" element={<GalleryPage />} />
          </Routes>
        </AnimatePresence>

        {/* ── Footer ── */}
        <FooterSection />

        {/* ── WhatsApp chatbot ── */}
        <WhatsAppChatbot />

        {/* ── FAB cluster (bottom right) ── */}
        <div className="fixed bottom-5 right-4 sm:right-5 z-[300] flex flex-col items-center gap-3">

          {/* Call button */}
          <div className="relative flex items-center">
            <AnimatePresence>
              {showCallLabel && (
                <motion.a
                  key="label"
                  href="tel:+918124787002"
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  className="absolute right-full mr-3 whitespace-nowrap px-4 py-2.5 rounded-xl
                             bg-[#E8B84B] text-black text-sm font-bold shadow-xl"
                >
                  +91 81247 87002
                </motion.a>
              )}
            </AnimatePresence>

            <button
              onClick={() => { setShowCallLabel(v => !v); }}
              aria-label="Call Crazy Capture Studio"
              className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#E8B84B] text-black
                         flex items-center justify-center shadow-[0_0_20px_rgba(232,184,75,0.45)]
                         hover:scale-110 active:scale-95 transition-transform duration-200"
            >
              {/* ping */}
              <span className="absolute inset-0 rounded-full bg-[#E8B84B] animate-ping opacity-30" />
              <FaPhoneAlt
                size={18}
                className="relative z-10"
                style={{ animation: "phone-ring 1.4s ease-in-out infinite" }}
              />
            </button>
          </div>

          {/* Scroll to top (with conic progress ring) */}
          {scrolled && (
            <motion.button
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.93 }}
              onClick={scrollTop}
              aria-label="Scroll to top"
              title="Back to top"
              className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center
                         shadow-xl bg-[#111]"
            >
              {/* SVG progress ring */}
              <svg
                className="absolute inset-0 w-full h-full -rotate-90"
                viewBox="0 0 56 56"
              >
                <circle cx="28" cy="28" r="24"
                  fill="none" stroke="rgba(232,184,75,0.15)" strokeWidth="3" />
                <circle cx="28" cy="28" r="24"
                  fill="none" stroke="#E8B84B" strokeWidth="3"
                  strokeDasharray={`${2 * Math.PI * 24}`}
                  strokeDashoffset={`${2 * Math.PI * 24 * (1 - progress / 100)}`}
                  strokeLinecap="round"
                  style={{ transition: "stroke-dashoffset 0.2s ease" }}
                />
              </svg>
              <FaArrowUp size={16} className="text-[#E8B84B] relative z-10" />
            </motion.button>
          )}
        </div>
      </div>
    </Router>
  );
}

export default App;