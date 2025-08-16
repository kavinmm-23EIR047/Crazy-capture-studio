import React, { useRef, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { FaArrowUp } from "react-icons/fa";

import HomePage from './pages/HomePage';
import GalleryPage from './pages/GalleryPage';

import Navigation from './components/Navigation';
import FooterSection from './components/FooterSection';
import WhatsAppChatbot from './components/WhatsAppChatbot';

function App() {
  const contactRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Section IDs for scrolling
  const sectionIds = ["home", "about", "services", "reviews", "contact"];

  // Show/Hide scroll button & track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);

      setIsVisible(scrollTop > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (section) => {
    if (section === 'contact' && contactRef.current) {
      contactRef.current.scrollIntoView({ behavior: 'smooth' });
    } else {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Scroll to previous section
  const goToPreviousSection = () => {
    const currentScroll = window.scrollY;
    const sections = sectionIds
      .map(id => document.getElementById(id))
      .filter(Boolean);

    let previousSection = null;
    for (let i = sections.length - 1; i >= 0; i--) {
      if (sections[i].offsetTop < currentScroll - 50) {
        previousSection = sections[i];
        break;
      }
    }

    if (previousSection) {
      previousSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Router>
      <div className="bg-gradient-to-br from-[#0c0c1d] via-transparent to-[#1a1a2e] text-white min-h-screen relative">

        {/* Navigation */}
        <Navigation scrollToSection={scrollToSection} />

        {/* Pages */}
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<HomePage contactRef={contactRef} />} />
            <Route path="/gallery" element={<GalleryPage />} />
          </Routes>
        </AnimatePresence>

        {/* Footer */}
        <FooterSection />

        {/* WhatsApp Chatbot */}
        <WhatsAppChatbot />

      {/* Floating Buttons Group */}
<div className="fixed bottom-4 right-5 z-50 flex flex-col items-center space-y-4">

  {/* Floating Call Now Button */}
  <a
    href="tel:+918124787002"
    className="bg-[#FFD700] hover:bg-yellow-600 text-black 
               w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16
               rounded-full shadow-xl transition-all duration-300 flex items-center justify-center group overflow-hidden"
    aria-label="Call Now"
  >
    <div className="animate-phoneRing flex items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 5a2 2 0 012-2h1.6a1 1 0 01.98.804l.53 2.65a1 1 0 01-.272.941l-1.272 1.272a16.978 16.978 0 007.416 7.416l1.272-1.272a1 1 0 01.941-.272l2.65.53a1 1 0 01.804.98V19a2 2 0 01-2 2h-1C9.163 21 3 14.837 3 7V5z"
        />
      </svg>
    </div>
    <span
      className="ml-1 max-w-0 overflow-hidden whitespace-nowrap transition-all duration-300 
                 group-hover:max-w-xs group-hover:ml-2 font-semibold text-sm sm:text-base"
    >
      Call Now
    </span>
  </a>

  {/* Floating Previous Section Button */}
  {isVisible && (
    <button
      onClick={goToPreviousSection}
      className="rounded-full shadow-xl flex items-center justify-center 
                 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16
                 bg-[conic-gradient(#FFD700_var(--scroll),_#ffffffb1_0%)]"
      style={{
        ["--scroll"]: `${scrollProgress}%`,
      }}
      aria-label="Go to previous section"
    >
      <FaArrowUp 
        className="text-black w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" 
      />
    </button>
  )}
</div>

      </div>
    </Router>
  );
}

export default App;
