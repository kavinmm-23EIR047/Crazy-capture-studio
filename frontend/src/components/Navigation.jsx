import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import CrazyLogo from '../assets/Crazylogo.png';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollTarget, setScrollTarget] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname === '/' && scrollTarget) {
      const el = document.getElementById(scrollTarget);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
          setScrollTarget(null);
        }, 300);
      }
    }
  }, [location, scrollTarget]);

  const scrollToSection = (id) => {
    if (location.pathname === '/') {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      setScrollTarget(id);
      navigate('/');
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-500 ease-in-out ${
        isScrolled ? 'bg-[rgba(17,24,39,255)] backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 relative">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img
              src={CrazyLogo}
              alt="Crazy Capture Logo"
              className="w-20 h-15 object-contain mx-auto md:mx-0"
              draggable={false}
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {['home', 'about', 'services', 'testimonials'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="text-gray-300 hover:text-[#FFCB05] transition"
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            ))}
            <Link
              to="/gallery"
              className="text-gray-300 hover:text-[#FFCB05] transition"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Gallery
            </Link>
            <button
              onClick={() => scrollToSection('contact')}
              className="bg-[#FFCB05] text-black px-4 py-2 rounded-full hover:bg-yellow-400 font-medium"
            >
              Contact
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="md:hidden text-white absolute right-4 top-1/2 transform -translate-y-1/2"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`md:hidden rounded-lg p-4 space-y-4 transition-all duration-300 ${
                isScrolled ? 'bg-[rgba(17,24,39,255)] backdrop-blur-md' : 'bg-transparent'
              }`}
              style={{ boxShadow: isScrolled ? '0 8px 24px rgba(0,0,0,0.5)' : 'none' }}
            >
              {['home', 'about', 'services', 'testimonials'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="block text-left text-gray-300 hover:text-[#FFCB05] w-full"
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </button>
              ))}
              <Link
                to="/gallery"
                className="block text-gray-300 hover:text-[#FFCB05]"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                Gallery
              </Link>
              <button
                onClick={() => scrollToSection('contact')}
                className="w-full bg-[#FFCB05] text-black py-2 rounded-full hover:bg-yellow-400 font-medium"
              >
                Contact
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navigation;
