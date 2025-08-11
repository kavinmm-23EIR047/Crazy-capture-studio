import React, { useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { FaWhatsapp } from "react-icons/fa";

import HomePage from './pages/HomePage';
import GalleryPage from './pages/GalleryPage';

import Navigation from './components/Navigation';
import FooterSection from './components/FooterSection';
import WhatsAppChatbot from './components/WhatsAppChatbot';

function App() {
  const contactRef = useRef(null);

  const scrollToSection = (section) => {
    if (section === 'contact' && contactRef.current) {
      contactRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const phoneNumber = "918124787002"; // without +
  const message = "Hi, I’m interested in your photography services!";
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

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

           {/* WhatsApp Chatbot Button */}
        <WhatsAppChatbot />

        {/* Floating Call Now Button */}
        <a
          href="tel:+918124787002"
          className="fixed bottom-4 right-5 z-50 bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-4 rounded-full shadow-xl transition-all duration-300 flex items-center group overflow-hidden"
          aria-label="Call Now"
        >
          <div className="animate-phoneRing">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
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
            className="ml-2 max-w-0 overflow-hidden whitespace-nowrap transition-all duration-300 group-hover:max-w-xs group-hover:ml-3 font-semibold"
          >
            Call Now
          </span>
        </a>
      </div>
    </Router>
  );
}

export default App;
