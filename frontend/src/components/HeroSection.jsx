import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { FaInstagram, FaWhatsapp, FaFacebook } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

function HomeSection() {
  const navigate = useNavigate();

  const services = [
    ["Wedding", "Shoot"],
    ["Baby", "Shoot"],
    ["Concert", "Photography"],
    ["Festival", "Coverage"],
    ["Model", "Shoots"],
    ["Baby", "Shower Photography"],
    ["Engagement", "Shoot"],
    ["Corporate", "Events"],
    ["Birthday", "Events"],
  ];

  const colors = [
    ["#FFD700", "#FFFFFF"],
    ["#FFEEAA", "#E0E0E0"],
    ["#FFFFF0", "#FFD700"],
    ["#FFD700", "#F5F5F5"],
    ["#FFFFFF", "#FFD700"],
    ["#FFD700", "#E0E0E0"],
    ["#FFFFE0", "#FFFFFF"],
    ["#FFD700", "#DCDCDC"],
    ["#FFFACD", "#FFFFFF"],
  ];

  const videos = [
    "https://res.cloudinary.com/dxm3glvjq/video/upload/f_mp4,q_auto/v1755096659/H1_z5fq4n.mov",
    "https://res.cloudinary.com/dxm3glvjq/video/upload/f_mp4,q_auto/v1754750165/Recent_shoot_with_pradeep_kumar1123_trending_livemusic_loveislove_songs_psp6wk.mp4",
    "https://res.cloudinary.com/dxm3glvjq/video/upload/v1755315362/h4_djz028.mov",
  ];

  const [index, setIndex] = useState(0);
  const [videoIndex, setVideoIndex] = useState(0);
  const scrollY = useMotionValue(0);
  const backgroundY = useTransform(scrollY, (value) => `translateY(${value * 0.3}px)`);

  useEffect(() => {
    const textInterval = setInterval(() => {
      setIndex((prev) => (prev + 1) % services.length);
    }, 3500);
    return () => clearInterval(textInterval);
  }, []);

  useEffect(() => {
    const switchInterval = setInterval(() => {
      setVideoIndex((prev) => (prev + 1) % videos.length);
    }, 15000);
    return () => clearInterval(switchInterval);
  }, []);

  useEffect(() => {
    const onScroll = () => scrollY.set(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToNext = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

  const socialLinks = [
    {
      icon: FaInstagram,
      gradient: "linear-gradient(45deg, #feda75, #fa7e1e, #d62976, #962fbf, #4f5bd5)",
      link: "https://instagram.com",
      label: "Instagram",
    },
    {
      icon: FaWhatsapp,
      gradient: "linear-gradient(45deg, #25D366, #128C7E)",
      link: "https://wa.me/1234567890",
      label: "WhatsApp",
    },
    {
      icon: FaFacebook,
      gradient: "linear-gradient(45deg, #1877F2, #42A5F5)",
      link: "https://facebook.com",
      label: "Facebook",
    },
  ];

  return (
    <section className="relative h-screen flex flex-col justify-center items-center text-white overflow-hidden px-3 sm:px-8 md:px-16">
      {/* Background Video with Overlay */}
      <motion.div className="absolute inset-0 z-0 overflow-hidden bg-black" style={{ y: backgroundY }}>
        <AnimatePresence mode="wait">
          <motion.video
            key={videoIndex}
            src={videos[videoIndex]}
            autoPlay
            muted
            playsInline
            loop
            preload="metadata"
            className="w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/90" />
      </motion.div>

      {/* REC Indicator */}
      <motion.div
        className="absolute top-10 right-3 sm:top-14 sm:right-5 z-10 flex items-center gap-1 sm:gap-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <span className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(255,0,0,0.8)]" />
        <span className="text-[10px] sm:text-sm tracking-widest text-red-400 font-semibold">REC</span>
      </motion.div>

      {/* Main Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-2xl sm:text-5xl md:text-7xl font-extrabold z-10 text-center tracking-wide drop-shadow-lg"
      >
        Capture <span className="text-yellow-400">Your Story</span>
      </motion.h2>

      {/* Rotating Services */}
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, rotateX: -90 }}
          animate={{ opacity: 1, rotateX: 0 }}
          exit={{ opacity: 0, rotateX: 90 }}
          transition={{ duration: 0.6 }}
          className="mt-3 sm:mt-6 md:mt-10 text-center z-10"
        >
          <p className="text-sm sm:text-xl md:text-3xl font-bold tracking-wide">
            {services[index].map((word, wordIndex) => (
              <span key={wordIndex} style={{ color: colors[index][wordIndex] }} className="mx-0.5 sm:mx-1">
                {word}
              </span>
            ))}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Action Buttons */}
      <motion.div className="mt-5 sm:mt-10 flex flex-wrap justify-center gap-2 sm:gap-4 z-10"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <button
          onClick={() => navigate("/gallery")}
          className="bg-yellow-400/90 text-black px-3 py-1.5 sm:px-6 sm:py-3 rounded-full text-xs sm:text-base font-semibold shadow-lg hover:bg-yellow-300 transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        >
          View Portfolio
        </button>
        <button
          onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          className="px-3 py-1.5 sm:px-6 sm:py-3 rounded-full text-xs sm:text-base font-semibold border border-yellow-400/80 bg-white/10 text-yellow-300 shadow-lg hover:bg-yellow-300 hover:text-black hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        >
          Book Session
        </button>
      </motion.div>

      {/* Social Icons Horizontal with Gradient */}
      <nav className="absolute bottom-12 sm:bottom-20 flex flex-row gap-4 z-10" aria-label="Social Media Links">
        {socialLinks.map(({ icon: Icon, gradient, link, label }, i) => (
          <a
            key={i}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full hover:scale-110 transition shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            style={{ background: gradient }}
          >
            <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </a>
        ))}
      </nav>

      {/* Hidden Text for SEO */}
      <p className="sr-only">
        Crazy Capture Studio offers professional wedding, baby, birthday, and event photography services in Tiruppur, Tamil Nadu.
      </p>

      {/* Scroll Arrow */}
      <motion.div
        role="button"
        aria-label="Scroll Down"
        className="absolute bottom-4 cursor-pointer z-10 text-lg sm:text-3xl text-yellow-400"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        onClick={scrollToNext}
      >
        ↓
      </motion.div>
    </section>
  );
}

export default HomeSection;
