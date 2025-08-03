import React, { useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import HomePage from './pages/HomePage';
import GalleryPage from './pages/GalleryPage';
import Navigation from './components/Navigation';

function App() {
  const contactRef = useRef(null);

  const scrollToSection = (section) => {
    if (section === 'contact' && contactRef.current) {
      contactRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Router>
      <div className="bg-gray-900 min-h-screen relative">
        <Navigation scrollToSection={scrollToSection} />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<HomePage contactRef={contactRef} />} />
            <Route path="/gallery" element={<GalleryPage />} />
          </Routes>
        </AnimatePresence>

        {/* Floating Call Button */}
       <a
  href="tel:+918124787002"
  className="fixed bottom-5 right-5 z-50 bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-full shadow-lg transition-all duration-300 flex items-center gap-2"
>
  <div className="animate-phone-ring">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
      viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M3 5a2 2 0 012-2h1.6a1 1 0 01.98.804l.53 2.65a1 1 0 01-.272.941l-1.272 1.272a16.978 16.978 0 007.416 7.416l1.272-1.272a1 1 0 01.941-.272l2.65.53a1 1 0 01.804.98V19a2 2 0 01-2 2h-1C9.163 21 3 14.837 3 7V5z"
      />
    </svg>
  </div>
  Call Now
</a>

      </div>
    </Router>
  );
}

export default App;
