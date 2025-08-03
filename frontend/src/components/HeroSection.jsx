import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Instagram, Facebook, Twitter, Linkedin } from 'lucide-react';

const heroSlides = [
  {
    src: 'https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4',
    title: 'Wedding Cinematography',
    subtitle: 'Capturing love stories in motion',
    description:
      'Experience the magic of your special day through our cinematic lens. We capture every emotion, every glance, and every precious moment that makes your wedding unique.',
  },
  {
    src: 'https://videos.pexels.com/video-files/3195394/3195394-uhd_2560_1440_25fps.mp4',
    title: 'Portrait Sessions',
    subtitle: 'Bringing personalities to life',
    description:
      "Whether it's headshots, family portraits, or creative expressions, we capture your essence with dynamic portrait sessions.",
  },
];

const SLIDE_DURATION = 8000;

const CircleProgress = ({ progress }) => {
  const radius = 9;
  const circumference = 2 * Math.PI * radius;
  const dashoffset = circumference * (1 - progress);

  return (
    <svg className="absolute top-0 left-0 w-6 h-6" viewBox="0 0 24 24" fill="none">
      <circle
        stroke="#FFCB05"
        strokeWidth="2"
        strokeLinecap="round"
        cx="12"
        cy="12"
        r={radius}
        style={{
          strokeDasharray: circumference,
          strokeDashoffset: dashoffset,
          transition: 'stroke-dashoffset 0.1s linear',
        }}
      />
    </svg>
  );
};

const HomeSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const [videoReady, setVideoReady] = useState(false);

  const rafId = useRef(null);
  const startTime = useRef(null);

  const animateProgress = (timestamp) => {
    if (!startTime.current) startTime.current = timestamp;
    const elapsed = timestamp - startTime.current;
    const newProgress = Math.min(elapsed / SLIDE_DURATION, 1);
    setProgress(newProgress);

    if (elapsed < SLIDE_DURATION) {
      rafId.current = requestAnimationFrame(animateProgress);
    } else {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      startTime.current = null;
      setProgress(0);
      setVideoReady(false);
      rafId.current = requestAnimationFrame(animateProgress);
    }
  };

  useEffect(() => {
    rafId.current = requestAnimationFrame(animateProgress);
    return () => cancelAnimationFrame(rafId.current);
  }, [currentSlide]);

  const handleDotClick = (index) => {
    cancelAnimationFrame(rafId.current);
    setCurrentSlide(index);
    setProgress(0);
    startTime.current = null;
    rafId.current = requestAnimationFrame(animateProgress);
    setVideoReady(false);
  };
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  const current = heroSlides[currentSlide];

  return (
    <section
      id="home"
      className="relative pt-28 pb-12 flex items-center justify-center bg-black overflow-hidden"
      style={{ minHeight: '100vh' }}
    >
      <AnimatePresence initial={false} mode="wait">
        <motion.video
          key={current.src}
          autoPlay
          muted
          loop
          playsInline
          onCanPlay={() => setVideoReady(true)}
          initial={{ opacity: 0 }}
          animate={{ opacity: videoReady ? 1 : 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 w-full h-full object-cover bg-black"
        >
          <source src={current.src} type="video/mp4" />
        </motion.video>
      </AnimatePresence>

      <div className="absolute inset-0 bg-black bg-opacity-70 z-10" />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="relative z-20 flex flex-col items-center justify-center px-6 text-center max-w-xl mx-auto text-white"
        style={{ minHeight: 'calc(100vh - 7rem)' }}
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
          <span>{current.title.split(' ')[0]} </span>
          <span className="text-[#FFCB05]">{current.title.split(' ').slice(1).join(' ')}</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-[#FFD84A] mb-3 font-semibold max-w-[320px] sm:max-w-md">
          {current.subtitle}
        </p>
        <p className="text-sm sm:text-base md:text-lg text-[#B0B0B0] mb-8 leading-relaxed max-w-md px-4 sm:px-0">
          {current.description}
        </p>

        <div className="flex flex-row flex-wrap gap-3 justify-center items-center w-full max-w-xs mx-auto sm:max-w-sm px-4 sm:px-0">
          <Link
            to="/gallery"
            className="flex-1 min-w-[120px] text-center bg-[#FFCB05] text-black px-4 py-2 rounded-md text-sm font-semibold hover:bg-[#e6b800] transition-all"
          >
            View Portfolio
          </Link>
          
           <button
                onClick={() => scrollToSection('contact')}
                className="flex-1 min-w-[120px] text-center border border-[#FFCB05] text-[#FFCB05] px-4 py-2 rounded-md text-sm font-semibold hover:bg-[#FFCB05] hover:text-black transition-all"
              >
                 Book Session
              </button>
        </div>

        <div className="flex justify-center gap-6 relative z-30 mt-10 mb-8">
          {heroSlides.map((_, i) => {
            const isActive = i === currentSlide;
            return (
              <button
                key={i}
                onClick={() => handleDotClick(i)}
                aria-label={`Go to slide ${i + 1}`}
                className="relative w-6 h-6 rounded-full flex items-center justify-center focus:outline-none"
              >
                <motion.div
                  animate={{
                    scale: isActive ? 1.3 : 1,
                    backgroundColor: isActive ? '#FFCB05' : 'rgba(255, 203, 5, 0.3)',
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="w-4 h-4 rounded-full"
                />
                {isActive && <CircleProgress progress={progress} />}
              </button>
            );
          })}
        </div>

        <div className="flex justify-center gap-10 text-[#FFCB05] z-30">
          <a href="https://instagram.com/yourprofile" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-yellow-400 transition">
            <Instagram className="w-7 h-7 sm:w-8 sm:h-8" />
          </a>
          <a href="https://facebook.com/yourprofile" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-yellow-400 transition">
            <Facebook className="w-7 h-7 sm:w-8 sm:h-8" />
          </a>
          <a href="https://twitter.com/yourprofile" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-yellow-400 transition">
            <Twitter className="w-7 h-7 sm:w-8 sm:h-8" />
          </a>
          <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-yellow-400 transition">
            <Linkedin className="w-7 h-7 sm:w-8 sm:h-8" />
          </a>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
      >
        <div className="w-6 h-10 border-2 border-[#FFCB05] rounded-full flex justify-center items-start">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-3 bg-[#FFCB05] rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HomeSection;
