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
      {/* ✅ SEO Meta */}
      <Helmet>
        <title>Crazy Capture Studio | Wedding, Baby & Event Photography in Tiruppur</title>
        <meta
          name="description"
          content="Crazy Capture Studio in Tiruppur offers professional wedding, baby, birthday, and event photography services. Capture your story with our expert photographers."
        />
        <meta
          name="keywords"
          content="Photography Tiruppur, Wedding Photography, Baby Shoot, Event Photographer, Birthday Photography, Crazy Capture Studio"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://crazy-capture-studio.vercel.app" />
        <script type="application/ld+json">
          {JSON.stringify({
           "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "Crazy Capture Studio",
        "image": "https://crazy-capture-studio.vercel.app/Crazylogo.jpg",
        "logo": "https://crazy-capture-studio.vercel.app/Crazylogo.jpg",
        "url": "https://crazy-capture-studio.vercel.app",
        "telephone": "+91-9876543210",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Your Street Name",
          "addressLocality": "Tiruppur",
          "addressRegion": "TN",
          "postalCode": "641602",
          "addressCountry": "IN"
        },
        "openingHours": "Mo-Su 09:00-20:00",
        "sameAs": [
          "https://www.instagram.com/crazy_capture_studio/",
          "https://www.justdial.com/Tirupur/Crazy-Capture-Studio-Near-Scm-Company-Kumarnagar/9999PX421-X421-220326152251-J3C2_BZDET/photos"
        ],
          })}
        </script>
      </Helmet>

      {/* Background Video with Overlay */}
      <motion.div className="absolute inset-0 z-0 overflow-hidden" style={{ y: backgroundY }}>
        <AnimatePresence mode="wait">
          <motion.video
            key={videoIndex}
            src={videos[videoIndex]}
            autoPlay
            muted
            playsInline
            loop
            preload="metadata"
            loading="lazy"
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
        <span className="text-sm tracking-widest text-red-400 font-semibold">REC</span>
      </motion.div>

      {/* Main Heading */}
      <h1 className="sr-only">
        Crazy Capture Studio - Wedding, Baby, Birthday, and Event Photography in Tiruppur
      </h1>
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl sm:text-5xl md:text-7xl font-extrabold z-10 text-center tracking-wide drop-shadow-lg"
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
          className="mt-5 sm:mt-6 md:mt-10 text-center z-10"
        >
          <p className="text-lg sm:text-xl md:text-3xl font-bold tracking-wide">
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

      {/* Action Buttons */}
      <motion.div
        className="mt-8 sm:mt-10 flex flex-wrap justify-center gap-4 z-10"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <button
          aria-label="View Portfolio"
          onClick={() => navigate("/gallery")}
          className="bg-yellow-400/90 text-black px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-yellow-300 transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        >
          View Portfolio
        </button>
        <button
          aria-label="Book a Photography Session"
          onClick={() => {
            const section = document.getElementById("contact");
            if (section) section.scrollIntoView({ behavior: "smooth" });
          }}
          className="px-6 py-3 rounded-full font-semibold border border-yellow-400/80 bg-white/10 text-yellow-300 shadow-lg hover:bg-yellow-300 hover:text-black hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        >
          Book Session
        </button>
      </motion.div>

      {/* Social Icons */}
      <nav className="absolute bottom-20 flex gap-5 z-10" aria-label="Social Media Links">
        {[
          { icon: FaInstagram, color: "#E1306C", link: "https://instagram.com", label: "Instagram" },
          { icon: FaWhatsapp, color: "#25D366", link: "https://wa.me/1234567890", label: "WhatsApp" },
          { icon: FaFacebook, color: "#1877F2", link: "https://facebook.com", label: "Facebook" },
        ].map(({ icon: Icon, color, link, label }, i) => (
          <a
            key={i}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="w-12 h-12 flex items-center justify-center rounded-full hover:scale-110 transition shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            style={{ backgroundColor: color }}
          >
            <Icon size={26} />
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
