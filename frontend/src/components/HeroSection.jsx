import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { FaInstagram, FaWhatsapp, FaFacebook } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

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
  ["#FFD700", "#FFFFFF"], // Wedding Shoot
  ["#FFEEAA", "#E0E0E0"], // Baby Shoot
  ["#FFFFF0", "#FFD700"], // Concert Photography
  ["#FFD700", "#F5F5F5"], // Festival Coverage
  ["#FFFFFF", "#FFD700"], // Model Shoots
  ["#FFD700", "#E0E0E0"], // Baby Shower
  ["#FFFFE0", "#FFFFFF"], // Engagement Shoot
  ["#FFD700", "#DCDCDC"], // Corporate Events
  ["#FFFACD", "#FFFFFF"], // Birthday Events
];

  const videos = [
    "https://res.cloudinary.com/dxm3glvjq/video/upload/f_mp4,q_auto/v1755096659/H1_z5fq4n.mov",
    "https://res.cloudinary.com/dxm3glvjq/video/upload/f_mp4,q_auto/v1754750165/Recent_shoot_with_pradeep_kumar1123_trending_livemusic_loveislove_songs_psp6wk.mp4",
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
    }, 10000);
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

  return (
    <section
      id="home"
      className="relative h-screen flex flex-col justify-center items-center text-white overflow-hidden px-6 sm:px-10 md:px-16"
    >
      {/* Background Video */}
      <motion.div className="absolute inset-0 z-0 overflow-hidden" style={{ y: backgroundY }}>
        <AnimatePresence mode="wait">
          <motion.video
            key={videoIndex}
            src={videos[videoIndex]}
            autoPlay
            muted
            playsInline
            loop
            preload="auto"
            className="w-full h-full object-cover scale-105"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/90" />
      </motion.div>

      {/* REC Indicator */}
      <motion.div
        className="absolute top-14 right-5 z-10 flex items-center gap-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(255,0,0,0.8)]" />
        <span className="text-sm tracking-widest text-red-400 font-semibold drop-shadow-[0_0_5px_rgba(255,0,0,0.8)]">
          REC
        </span>
      </motion.div>

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl sm:text-5xl md:text-7xl font-extrabold z-10 text-center tracking-wide drop-shadow-lg"
      >
        Capture <span className="text-yellow-400">Your Story</span>
      </motion.h1>

<AnimatePresence mode="wait">
  <motion.div
    key={index}
    initial={{ opacity: 0, rotateX: -90 }}
    animate={{ opacity: 1, rotateX: 0 }}
    exit={{ opacity: 0, rotateX: 90 }}
    transition={{ duration: 0.6 }}
    className="mt-5 sm:mt-6 md:mt-10 text-center z-10"
  >
    <p className="text-xl sm:text-xl md:text-3xl font-bold tracking-wide">
      {services[index].map((word, wordIndex) => (
        <span
          key={wordIndex}
          style={{ color: colors[index][wordIndex] }}
          className="mx-1"
        >
          {word}
        </span>
      ))}
    </p>
  </motion.div>
</AnimatePresence>



      {/* Buttons */}
      <motion.div
        className="mt-8 sm:mt-10 flex flex-wrap justify-center gap-4 z-10"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <button
          onClick={() => navigate("/gallery")}
          className="bg-yellow-400/90 backdrop-blur-sm text-black px-6 py-3 rounded-full 
                     font-semibold shadow-lg hover:bg-yellow-300 
                     transition transform hover:scale-105"
        >
          View Portfolio
        </button>
       <button
  onClick={() => {
    const section = document.getElementById("contact");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }}
  className="px-6 py-3 rounded-full font-semibold border border-yellow-400/80 
             bg-white/10 backdrop-blur-lg text-yellow-300 
             shadow-lg shadow-yellow-400/20
             hover:bg-yellow-300 hover:text-black hover:shadow-yellow-400/40
             transition-transform duration-300 ease-in-out transform hover:scale-105"
>
  Book Session
</button>

      </motion.div>

      {/* Social Icons */}
      <motion.div
        className="absolute bottom-20 flex flex-row gap-5 z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        {[
          { icon: FaInstagram, color: "#E1306C", link: "https://instagram.com" },
          { icon: FaWhatsapp, color: "#25D366", link: "https://wa.me/1234567890" },
          { icon: FaFacebook, color: "#1877F2", link: "https://facebook.com" },
        ].map(({ icon: Icon, color, link }, i) => (
          <a
            key={i}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 flex items-center justify-center rounded-full hover:scale-110 transition shadow-lg"
            style={{ backgroundColor: color }}
          >
            <Icon size={26} />
          </a>
        ))}
      </motion.div>

      {/* Scroll Arrow */}
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
