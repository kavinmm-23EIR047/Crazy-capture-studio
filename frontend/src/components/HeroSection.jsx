import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { FaInstagram, FaWhatsapp, FaFacebook } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Camera } from "lucide-react";

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
    ["#E8B84B", "#FFFFFF"],
    ["#FFEEAA", "#E0E0E0"],
    ["#FFFFF0", "#E8B84B"],
    ["#E8B84B", "#F5F5F5"],
    ["#FFFFFF", "#E8B84B"],
    ["#E8B84B", "#E0E0E0"],
    ["#FFFFE0", "#FFFFFF"],
    ["#E8B84B", "#DCDCDC"],
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
      link: "https://www.instagram.com/crazy_capture_studio/",
      label: "Instagram",
    },
    {
      icon: FaWhatsapp,
      gradient: "linear-gradient(45deg, #25D366, #128C7E)",
      link: "https://wa.me/918124787002",
      label: "WhatsApp",
    },
    {
      icon: FaFacebook,
      gradient: "linear-gradient(45deg, #1877F2, #42A5F5)",
      link: "https://www.facebook.com/people/%F0%9D%91%AA%F0%9D%92%93%F0%9D%92%82%F0%9D%92%9B%F0%9D%92%9A-%F0%9D%91%AA%F0%9D%92%82%F0%9D%92%91%F0%9D%92%95%F0%9D%92%96%F0%9D%92%93%F0%9D%92%86-%F0%9D%91%BA%F0%9D%92%95%F0%9D%92%96%F0%9D%92%85%F0%9D%92%8A%F0%9D%92%90/61565983881585/",
      label: "Facebook",
    },
  ];

  return (
    <section
  id="home"
  className="relative h-screen flex flex-col justify-center items-center text-white overflow-hidden px-3 sm:px-8 md:px-16"
>

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
            className="w-full h-full object-cover parallax-bg"
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
        className="absolute top-10 right-3 sm:top-14 sm:right-10 z-20 flex items-center gap-2 px-3 py-1 bg-black/40 backdrop-blur-md rounded-full border border-red-500/30"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <span className="w-2.5 h-2.5 bg-red-600 rounded-full animate-pulse shadow-[0_0_15px_rgba(220,38,38,0.8)]" />
        <span className="text-[10px] sm:text-xs tracking-[0.2em] text-red-500 font-black">LIVE REC</span>
      </motion.div>

      {/* Main Heading */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="z-10 text-center"
      >
        <h2 className="text-4xl sm:text-7xl md:text-8xl font-black tracking-tighter drop-shadow-2xl mb-4 font-heading">
          CAPTURE <span className="gradient-text">MOMENTS</span>
        </h2>
        <p className="text-white/60 text-sm sm:text-lg tracking-[0.4em] font-bold uppercase font-body">
          Crazy Capture Studio
        </p>
      </motion.div>

      {/* Rotating Services */}
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8 }}
          className="mt-8 text-center z-10"
        >
          <p className="text-lg sm:text-3xl font-medium tracking-tight">
            {services[index].map((word, wordIndex) => (
              <span key={wordIndex} style={{ color: colors[index][wordIndex] }} className="mx-1">
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
          className="px-3 py-1.5 sm:px-6 sm:py-3 rounded-full text-xs sm:text-base font-bold border border-white/20 bg-white/5 backdrop-blur-md text-white shadow-lg hover:bg-white hover:text-black hover:scale-105 transition duration-300 font-heading"
        >
          View Portfolio
        </button>
        <button
          onClick={() => document.getElementById("studio-box")?.scrollIntoView({ behavior: "smooth" })}
          className="bg-[#E8B84B] text-black px-4 py-2 sm:px-8 sm:py-4 rounded-full text-sm sm:text-lg font-bold shadow-[0_0_20px_rgba(232,184,75,0.4)] hover:bg-[#D4A742] hover:scale-110 transition duration-300 flex items-center gap-2 animate-pulse font-heading"
        >
          <Camera className="w-5 h-5" /> Studio Box 📸
        </button>
        <button
          onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          className="px-3 py-1.5 sm:px-6 sm:py-3 rounded-full text-xs sm:text-base font-bold border border-[#E8B84B]/80 bg-white/5 text-[#E8B84B] shadow-lg hover:bg-[#E8B84B] hover:text-black hover:scale-105 transition duration-300 font-heading"
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
        className="absolute bottom-4 cursor-pointer z-10 text-lg sm:text-3xl text-[#E8B84B]"
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
