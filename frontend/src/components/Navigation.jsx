import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Home,
  User,
  Camera,
  Star,
  Image,
  PhoneCall,
} from "lucide-react";
import CrazyLogo from "../assets/Crazylogo.png";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollTarget, setScrollTarget] = useState(null);
  const [activeSection, setActiveSection] = useState("home");

  const location = useLocation();
  const navigate = useNavigate();

  // Navbar background on scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when navigating
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Smooth scroll on homepage
  useEffect(() => {
    if (location.pathname === "/" && scrollTarget) {
      const el = document.getElementById(scrollTarget);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
          setScrollTarget(null);
        }, 300);
      }
    }
  }, [location, scrollTarget]);

  // Highlight active section
  useEffect(() => {
    if (location.pathname !== "/") return;

    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.6 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => sections.forEach((section) => observer.unobserve(section));
  }, [location.pathname]);

  const scrollToSection = (id) => {
    if (location.pathname === "/") {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      setScrollTarget(id);
      navigate("/");
    }
  };

  const navItems = [
    { id: "home", label: "Home", icon: <Home className="w-5 h-5 mr-2" /> },
    { id: "about", label: "About", icon: <User className="w-5 h-5 mr-2" /> },
    { id: "services", label: "Services", icon: <Camera className="w-5 h-5 mr-2" /> },
    { id: "reviews", label: "Reviews", icon: <Star className="w-5 h-5 mr-2" /> },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-500 ease-in-out ${
        isMobileMenuOpen || isScrolled
          ? "bg-[rgba(17,24,39,0.95)] backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 relative">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center transform transition-transform hover:scale-110 hover:rotate-3"
          >
            <img
              src={CrazyLogo}
              alt="Crazy Capture Logo"
              className="w-16 h-16 object-contain drop-shadow-lg"
              draggable={false}
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`flex items-center transition ${
                  activeSection === item.id
                    ? "text-[#FFCB05] font-semibold"
                    : "text-gray-300 hover:text-[#FFCB05]"
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
            <Link
              to="/gallery"
              className={`flex items-center transition ${
                location.pathname === "/gallery"
                  ? "text-[#FFCB05] font-semibold"
                  : "text-gray-300 hover:text-[#FFCB05]"
              }`}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <Image className="w-5 h-5 mr-2" /> Gallery
            </Link>
            <button
              onClick={() => scrollToSection("contact")}
              className="bg-[#FFCB05] text-black px-4 py-2 rounded-full hover:bg-yellow-400 font-medium flex items-center transition transform hover:scale-105"
            >
              <PhoneCall className="w-6 h-6 mr-2" /> Contact
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="md:hidden text-white absolute right-4 top-1/2 transform -translate-y-1/2 transition-transform hover:scale-110"
          >
            {isMobileMenuOpen ? (
              <X className="w-9 h-9 font-bold animate-pulse" />
            ) : (
              <Menu className="w-9 h-9 font-bold animate-pulse" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              {/* Background Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.9 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black z-40"
                onClick={() => setIsMobileMenuOpen(false)}
              />

              {/* Slide-in Menu */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="fixed top-0 right-0 h-screen w-3/4 md:hidden p-6 space-y-6 z-50 bg-[rgba(17,24,39,0.95)] backdrop-blur-lg shadow-xl flex flex-col"
              >
                {/* Close Button */}
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="absolute top-4 right-4 text-white z-[100]"
                >
                  <X className="w-9 h-9 font-bold animate-pulse" />
                </button>

                {/* Branding */}
                <div className="flex justify-center border-b border-gray-600 pb-4">
                  <img
                    src={CrazyLogo}
                    alt="Crazy Capture Logo"
                    className="w-14 h-14 object-contain drop-shadow-lg"
                  />
                </div>

                {/* Links */}
                <div className="flex-1 mt-6 space-y-5">
                  {navItems.map((item) => (
                    <motion.button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      whileHover={{ scale: 1.05, x: 8 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center w-full text-base font-medium transition ${
                        activeSection === item.id
                          ? "text-[#FFCB05] font-semibold"
                          : "text-white hover:text-[#FFCB05]"
                      }`}
                    >
                      {item.icon}
                      {item.label}
                    </motion.button>
                  ))}

                  <Link
                    to="/gallery"
                    className={`flex items-center text-base font-medium transition ${
                      location.pathname === "/gallery"
                        ? "text-[#FFCB05] font-semibold"
                        : "text-white hover:text-[#FFCB05]"
                    }`}
                    onClick={() =>
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                  >
                    <Image className="w-5 h-5 mr-2" /> Gallery
                  </Link>
                </div>

                {/* Contact Button */}
                <motion.button
                  onClick={() => scrollToSection("contact")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-[#FFCB05] text-black py-3 rounded-full hover:bg-yellow-400 font-bold flex items-center justify-center shadow-md transition"
                >
                  <PhoneCall className="w-6 h-6 mr-2" /> Contact Us
                </motion.button>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navigation;
