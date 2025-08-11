import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { FaInstagram, FaWhatsapp, FaFacebook } from "react-icons/fa";

function HomeSection() {
  const services = [
    "Wedding Shoot",
    "Baby Shoot",
    "Concert Photography",
    "Festival Coverage",
    "Model Shoots",
    "Baby Shower Photography",
    "Engagement Shoot",
    "Corporate Events",
  ];

  const desktopVideos = [
    "https://res.cloudinary.com/dxm3glvjq/video/upload/v1754752696/Timeline_1_tbozco.mov",
    "https://res.cloudinary.com/dxm3glvjq/video/upload/v1754752274/Timeline_1_bpm6tv.mov",
    "https://res.cloudinary.com/dxm3glvjq/video/upload/v1754750165/Recent_shoot_with_pradeep_kumar1123_trending_livemusic_loveislove_songs_psp6wk.mp4",
  ];

  const mobileVideos = [
    "https://res.cloudinary.com/dxm3glvjq/video/upload/v1754752696/Timeline_1_tbozco.mov",
    "https://res.cloudinary.com/dxm3glvjq/video/upload/v1754755112/Timeline_3_czgfco.mp4",
    "https://res.cloudinary.com/dxm3glvjq/video/upload/v1754750165/Recent_shoot_with_pradeep_kumar1123_trending_livemusic_loveislove_songs_psp6wk.mp4",
  ];

  const [index, setIndex] = useState(0);
  const [videoIndex, setVideoIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Track scroll Y position using motion value
  const scrollY = useMotionValue(0);
  // Create a slow parallax effect: move background up at 30% scroll speed
  const backgroundY = useTransform(scrollY, (value) => `translateY(${value * 0.3}px)`);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const textInterval = setInterval(() => {
      setIndex((prev) => (prev + 1) % services.length);
    }, 4000);
    return () => clearInterval(textInterval);
  }, [services.length]);

  useEffect(() => {
    const videoInterval = setInterval(() => {
      setVideoIndex((prev) => (prev + 1) % desktopVideos.length);
    }, 10000);
    return () => clearInterval(videoInterval);
  }, [desktopVideos.length]);

  const getVideoUrl = () => {
    return isMobile ? mobileVideos[videoIndex] : desktopVideos[videoIndex];
  };

  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const onScroll = () => {
      scrollY.set(window.scrollY);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollY]);

  return (
    <section className="relative h-screen flex flex-col justify-center items-center text-white overflow-hidden px-6 sm:px-10 md:px-16">
      {/* Background video with parallax */}
      <motion.div
        className="absolute inset-0 z-0 overflow-hidden"
        style={{ y: backgroundY }}
      >
        <AnimatePresence mode="wait">
          <motion.video
            key={videoIndex + (isMobile ? "-m" : "-d")}
            src={getVideoUrl()}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-black/50" />
      </motion.div>

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl sm:text-5xl md:text-6xl font-bold z-10 text-center tracking-wide drop-shadow-lg"
      >
        Capture <span className="text-yellow-400">Your Moments</span>
      </motion.h1>

      {/* Animated service text */}
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="mt-3 text-lg sm:text-xl md:text-2xl font-medium text-yellow-300 z-10 drop-shadow-lg"
        >
          {services[index]}
        </motion.p>
      </AnimatePresence>

      {/* CTA Buttons */}
      <div className="mt-6 flex flex-row flex-wrap justify-center gap-4 z-10">
        <button className="bg-yellow-400 text-black px-5 py-3 rounded-full font-semibold hover:bg-yellow-300 transition transform hover:scale-105">
          View Portfolio
        </button>
        <button className="border border-yellow-400 px-5 py-3 rounded-full font-semibold hover:bg-yellow-300 hover:text-black transition transform hover:scale-105">
          Book Session
        </button>
      </div>

      {/* Social media links */}
      <div className="absolute bottom-20 flex flex-row gap-5 z-10">
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 flex items-center justify-center rounded-full transition hover:scale-110"
          style={{ backgroundColor: "#E1306C" }}
        >
          <FaInstagram size={28} />
        </a>
        <a
          href="https://wa.me/1234567890"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 flex items-center justify-center rounded-full transition hover:scale-110"
          style={{ backgroundColor: "#25D366" }}
        >
          <FaWhatsapp size={28} />
        </a>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 flex items-center justify-center rounded-full transition hover:scale-110"
          style={{ backgroundColor: "#1877F2" }}
        >
          <FaFacebook size={28} />
        </a>
      </div>

      {/* Scroll arrow */}
      <motion.div
        className="absolute bottom-6 cursor-pointer z-10 text-3xl text-yellow-400"
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
