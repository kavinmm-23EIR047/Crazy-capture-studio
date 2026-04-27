import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { FaInstagram, FaWhatsapp, FaFacebook } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Camera, ChevronDown } from "lucide-react";

const SERVICES = [
  { words: ["Wedding", "Photography"], colors: ["#E8B84B", "#FFFFFF"] },
  { words: ["Baby", "Shoots"],         colors: ["#FFEEAA", "#E0E0E0"] },
  { words: ["Concert", "Coverage"],    colors: ["#FFFFF0", "#E8B84B"] },
  { words: ["Birthday", "Events"],     colors: ["#E8B84B", "#F5F5F5"] },
  { words: ["Model", "Shoots"],        colors: ["#FFFFFF", "#E8B84B"] },
  { words: ["Baby", "Shower"],         colors: ["#FFFFE0", "#FFFFFF"] },
  { words: ["Corporate", "Ads"],       colors: ["#E8B84B", "#DCDCDC"] },
  { words: ["Engagement", "Shoot"],    colors: ["#FFFACD", "#FFFFFF"] },
];

const VIDEOS = [
  "https://res.cloudinary.com/dxm3glvjq/video/upload/f_mp4,q_auto/v1755096659/H1_z5fq4n.mov",
  "https://res.cloudinary.com/dxm3glvjq/video/upload/f_mp4,q_auto/v1754750165/Recent_shoot_with_pradeep_kumar1123_trending_livemusic_loveislove_songs_psp6wk.mp4",
  "https://res.cloudinary.com/dxm3glvjq/video/upload/v1755315362/h4_djz028.mov",
];

const SOCIALS = [
  { Icon: FaInstagram, gradient: "linear-gradient(45deg,#feda75,#fa7e1e,#d62976,#962fbf,#4f5bd5)", href: "https://www.instagram.com/crazy_capture_studio/", label: "Instagram" },
  { Icon: FaWhatsapp,  gradient: "linear-gradient(45deg,#25D366,#128C7E)",                          href: "https://wa.me/918124787002",                   label: "WhatsApp" },
  { Icon: FaFacebook,  gradient: "linear-gradient(45deg,#1877F2,#42A5F5)",                          href: "https://www.facebook.com/people/%F0%9D%91%AA%F0%9D%92%93%F0%9D%92%82%F0%9D%92%9B%F0%9D%92%9A-%F0%9D%91%AA%F0%9D%92%82%F0%9D%92%91%F0%9D%92%95%F0%9D%92%96%F0%9D%92%93%F0%9D%92%86-%F0%9D%91%BA%F0%9D%92%95%F0%9D%92%96%F0%9D%92%85%F0%9D%92%8A%F0%9D%92%90/61565983881585/", label: "Facebook" },
];

export default function HeroSection() {
  const navigate     = useNavigate();
  const [svcIdx,  setSvcIdx]  = useState(0);
  const [vidIdx,  setVidIdx]  = useState(0);

  /* Service text rotation */
  useEffect(() => {
    const t = setInterval(() => setSvcIdx(p => (p + 1) % SERVICES.length), 3200);
    return () => clearInterval(t);
  }, []);

  /* Video rotation */
  useEffect(() => {
    const t = setInterval(() => setVidIdx(p => (p + 1) % VIDEOS.length), 14000);
    return () => clearInterval(t);
  }, []);

  const scrollNext = () => window.scrollTo({ top: window.innerHeight, behavior: "smooth" });

  return (
    <section
      id="home"
      className="relative h-[100svh] min-h-[600px] flex flex-col items-center justify-center text-white overflow-hidden"
    >
      {/* ── Background Video ── */}
      <div className="absolute inset-0 z-0 bg-black">
        <AnimatePresence mode="wait">
          <motion.video
            key={vidIdx}
            src={VIDEOS[vidIdx]}
            autoPlay muted playsInline loop preload="metadata"
            className="video-fill"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4 }}
          />
        </AnimatePresence>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/45 to-black/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
      </div>

      {/* ── REC Badge ── */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="absolute top-[90px] right-4 sm:top-[92px] sm:right-6 z-20
                   flex items-center gap-2 px-3 py-1.5 rounded-full
                   bg-black/50 backdrop-blur-md border border-red-500/25"
      >
        <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
        <span className="text-[10px] sm:text-xs tracking-[0.2em] text-red-400 font-semibold uppercase">Live Rec</span>
      </motion.div>

      {/* ── Main Content ── */}
      <div className="relative z-10 text-center px-4 sm:px-6 w-full max-w-5xl mx-auto">

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                     bg-white/5 border border-white/15 backdrop-blur-sm
                     text-[11px] sm:text-xs text-white/70 font-medium tracking-[0.25em] uppercase mb-6"
        >
          <Camera size={11} className="text-[#E8B84B]" />
          Professional Photography Studio · Tiruppur
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.9, ease: "easeOut" }}
          className="display-xl text-white tracking-tighter mb-3"
        >
          CAPTURE{" "}
          <span className="gradient-text">MOMENTS</span>
        </motion.h1>

        {/* Sub-heading */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55, duration: 0.7 }}
          className="text-white/50 text-xs sm:text-sm tracking-[0.45em] font-light uppercase mb-8 sm:mb-10"
        >
          Crazy Capture Studio
        </motion.p>

        {/* Rotating Services */}
        <div className="h-10 sm:h-12 mb-8 sm:mb-10 flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={svcIdx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.55 }}
              className="text-xl sm:text-2xl md:text-3xl font-light tracking-tight"
            >
              {SERVICES[svcIdx].words.map((w, i) => (
                <span key={i} style={{ color: SERVICES[svcIdx].colors[i] }} className="mx-1">{w}</span>
              ))}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4"
        >
          <button
            onClick={() => navigate("/gallery")}
            className="btn btn-secondary btn-sm sm:btn-lg"
          >
            View Portfolio
          </button>
          <button
            onClick={() => document.getElementById("studio-box")?.scrollIntoView({ behavior: "smooth" })}
            className="btn btn-primary btn-sm sm:btn-lg gap-2 animate-pulse"
          >
            <Camera size={16} />
            Studio Box
          </button>
          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="btn btn-secondary btn-sm sm:btn-lg"
            style={{ borderColor: "rgba(232,184,75,0.5)", color: "#E8B84B" }}
          >
            Book Session
          </button>
        </motion.div>
      </div>

      {/* ── Social Icons ── */}
      <motion.nav
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.7 }}
        aria-label="Social media"
        className="absolute bottom-16 sm:bottom-20 z-10 flex gap-3 sm:gap-4"
      >
        {SOCIALS.map(({ Icon, gradient, href, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center
                       hover:scale-110 active:scale-95 transition-transform duration-250 shadow-lg"
            style={{ background: gradient }}
          >
            <Icon size={16} className="text-white" />
          </a>
        ))}
      </motion.nav>

      {/* ── Scroll Arrow ── */}
      <motion.button
        onClick={scrollNext}
        aria-label="Scroll down"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ delay: 1.2, duration: 1.8, y: { repeat: Infinity, duration: 1.8, ease: "easeInOut" } }}
        className="absolute bottom-4 sm:bottom-6 z-10 flex flex-col items-center gap-1 text-white/40 hover:text-white/80 transition-colors"
      >
        <span className="text-[9px] tracking-[0.3em] uppercase">Scroll</span>
        <ChevronDown size={18} />
      </motion.button>

      {/* Hidden SEO text */}
      <p className="sr-only">
        Crazy Capture Studio offers professional wedding, baby, birthday, model, corporate and event photography services in Tiruppur, Tamil Nadu.
      </p>
    </section>
  );
}
