import React, { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";

/* ── Animated counter ── */
function useCounter(target, active, duration = 1800) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setValue(Math.floor(ease * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return value;
}

/* ── Stat tile ── */
function StatTile({ stat, active }) {
  const count = useCounter(stat.target, active);
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: stat.delay }}
      className={`flex flex-col items-center justify-center gap-1 rounded-2xl p-5 sm:p-6 border ${
        stat.accent
          ? "bg-[#E8B84B] border-[#E8B84B] text-black"
          : "glass border-white/8"
      }`}
    >
      <span className={`text-3xl sm:text-4xl font-black leading-none tracking-tighter ${stat.accent ? "text-black" : "text-white"}`}>
        {count}{stat.suffix}
      </span>
      <span className={`text-[9px] sm:text-[10px] font-medium tracking-[0.15em] uppercase ${stat.accent ? "text-black/60" : "text-white/40"}`}>
        {stat.label}
      </span>
    </motion.div>
  );
}

/* ── Viewfinder corners ── */
const Corner = ({ pos }) => {
  const cls = {
    tl: "top-3 left-3 border-t-2 border-l-2 rounded-tl-sm",
    tr: "top-3 right-3 border-t-2 border-r-2 rounded-tr-sm",
    bl: "bottom-3 left-3 border-b-2 border-l-2 rounded-bl-sm",
    br: "bottom-3 right-3 border-b-2 border-r-2 rounded-br-sm",
  };
  return <div className={`absolute w-4 h-4 border-[#E8B84B] ${cls[pos]}`} />;
};

const STATS = [
  { key:"clients",      target:500,  suffix:"+", label:"Happy Clients",    delay:0,    accent:true  },
  { key:"awards",       target:15,   suffix:"+", label:"Awards Won",       delay:0.07, accent:false },
  { key:"projects",     target:1000, suffix:"+", label:"Projects Done",    delay:0.14, accent:false },
  { key:"experience",   target:5,    suffix:"+", label:"Years Active",     delay:0.21, accent:false },
  { key:"satisfaction", target:98,   suffix:"%", label:"Satisfaction",     delay:0.28, accent:true  },
  { key:"events",       target:950,  suffix:"+", label:"Events Captured",  delay:0.35, accent:false },
];

export default function AboutSection() {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef1 = useRef(null);
  const videoRef2 = useRef(null);
  const statsRef  = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-80px" });

  useEffect(() => {
    const makeObs = (ref, onPlay, onPause) =>
      new IntersectionObserver(([e]) => {
        if (!ref.current) return;
        if (e.isIntersecting) { ref.current.play().catch(()=>{}); onPlay?.(); }
        else                  { ref.current.pause(); onPause?.(); }
      }, { threshold: 0.35 });

    const o1 = makeObs(videoRef1);
    const o2 = makeObs(videoRef2, () => setIsPlaying(true), () => setIsPlaying(false));
    if (videoRef1.current) o1.observe(videoRef1.current);
    if (videoRef2.current) o2.observe(videoRef2.current);
    return () => { o1.disconnect(); o2.disconnect(); };
  }, []);

  const togglePlay = () => {
    const v = videoRef2.current;
    if (!v) return;
    isPlaying ? v.pause() : v.play().catch(()=>{});
    setIsPlaying(!isPlaying);
  };

  return (
    <section id="about" className="section bg-transparent">
      <div className="container">

        {/* ─── ABOUT ─── */}
        <div className="section-header">
          <p className="eyebrow">About Us</p>
          <div className="divider-gold" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center mb-24 sm:mb-32">

          {/* Video Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative mx-auto w-full max-w-sm sm:max-w-md"
          >
            {/* Outer glow frame */}
            <div className="absolute -inset-3 sm:-inset-4 rounded-3xl bg-gradient-to-br from-[#E8B84B]/20 to-transparent blur-xl" />
            <div className="relative glass border-white/10 p-2 sm:p-3 rounded-3xl overflow-hidden shadow-2xl">
              {/* Video */}
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5]">
                <video
                  ref={videoRef1}
                  src="https://res.cloudinary.com/dxm3glvjq/video/upload/v1754756318/Passionate_work_enjoyable_crazy_capture_studio_praba_prince_love_passion_work_enjoy_nrkz1c.mp4"
                  muted playsInline loop preload="metadata"
                  className="video-fill"
                  style={{ filter: "grayscale(1) contrast(1.1) brightness(0.88)" }}
                />
                {/* HUD Overlay */}
                <div className="absolute inset-0 p-3 sm:p-4 flex flex-col justify-between pointer-events-none
                                bg-gradient-to-b from-black/50 via-transparent to-black/50">
                  {/* Top row */}
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/50 backdrop-blur-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                      <span className="text-[9px] text-white font-bold tracking-widest">REC</span>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <div className="flex items-center gap-1.5">
                        <div className="w-7 h-3.5 border border-white/50 rounded-sm flex items-center p-0.5">
                          <div className="w-full h-full bg-green-400 rounded-[2px]" />
                        </div>
                        <span className="text-[8px] font-mono text-white">100%</span>
                      </div>
                      <span className="text-[8px] font-mono text-white/70 tracking-widest">999 RAW</span>
                    </div>
                  </div>
                  {/* Grid */}
                  <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 opacity-[0.12]">
                    {[...Array(9)].map((_,i) => (
                      <div key={i} className="border border-white" />
                    ))}
                  </div>
                  {/* Crosshair */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="relative w-8 h-8">
                      <div className="absolute top-1/2 inset-x-0 h-px bg-white/30" />
                      <div className="absolute left-1/2 inset-y-0 w-px bg-white/30" />
                    </div>
                  </div>
                  {/* Bottom row */}
                  <div className="flex justify-between items-end">
                    <div className="flex gap-3">
                      {[["ISO","400"],["Shutter","1/125"]].map(([k,v]) => (
                        <div key={k}>
                          <span className="text-[8px] text-white/50 uppercase block">{k}</span>
                          <span className="text-[10px] font-mono text-white font-bold">{v}</span>
                        </div>
                      ))}
                    </div>
                    <span className="text-[9px] font-mono text-white font-bold tracking-tight">00:42:15:09</span>
                  </div>
                </div>
                {/* Corners */}
                <Corner pos="tl"/><Corner pos="tr"/><Corner pos="bl"/><Corner pos="br"/>
              </div>
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="space-y-6 sm:space-y-8"
          >
            <h2 className="display-md text-white">
              We capture<br />
              <span className="text-[#E8B84B]">golden</span> moments
            </h2>

            <p className="body-lg text-white/60 border-l-2 border-[#E8B84B]/30 pl-5">
              Hello and welcome! I'm <strong className="text-white font-semibold">Prabakaran</strong>, founder of{" "}
              <strong className="text-white font-semibold">Crazy Capture Studio</strong>. Photography has been more
              than a profession — it's my lifelong passion. Every frame we capture is a story, a memory,
              a feeling frozen in time.
            </p>

            {/* Quote */}
            <div className="glass border-l-[3px] border-[#E8B84B] rounded-r-2xl px-5 sm:px-6 py-5">
              <p className="text-white/50 text-sm sm:text-base italic font-light leading-relaxed mb-3">
                "Thank you for trusting us to tell your story through our lens. We look forward
                to creating timeless memories with you."
              </p>
              <span className="text-[#E8B84B] text-xs font-semibold tracking-wider uppercase">
                — Prabakaran, Founder & CEO
              </span>
            </div>

            {/* CTA */}
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="btn btn-primary"
            >
              Work With Us
            </button>
          </motion.div>
        </div>

        {/* ─── MILESTONES ─── */}
        <div ref={statsRef}>
          <div className="section-header">
            <p className="eyebrow">Our Milestones</p>
            <div className="divider-gold" />
            <h2 className="display-md text-white mt-4">
              Built on <span className="text-[#E8B84B]">trust</span> & craft
            </h2>
            <p className="body-lg text-white/50 mt-3 max-w-xl">
              Celebrating excellence in every frame we capture — one story at a time.
            </p>
          </div>

          <div className="grid lg:grid-cols-[1fr_1.6fr] gap-5 sm:gap-6">
            {/* Award Video */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative rounded-2xl overflow-hidden aspect-[4/3] group"
            >
              <video
                ref={videoRef2}
                src="https://res.cloudinary.com/dxm3glvjq/video/upload/v1754840452/Honored_to_receive_this_photography_award.Behind_every_frame_is_a_story_thank_you_for_seeing_m_1_pdopyf.mp4"
                autoPlay loop muted={isMuted} playsInline preload="metadata"
                className="video-fill"
                style={{ filter: "contrast(1.1) saturate(1.15)" }}
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/20" />
              {/* Controls */}
              <div className="absolute top-3 right-3 flex gap-2">
                {[
                  { label: isPlaying ? "⏸" : "▶", fn: togglePlay },
                  { label: isMuted  ? "🔇" : "🔊", fn: () => setIsMuted(m => !m) },
                ].map(({ label, fn }) => (
                  <button key={label} onClick={fn}
                    className="w-9 h-9 rounded-full bg-black/60 border border-white/15 text-white text-sm
                               hover:bg-[#E8B84B] hover:text-black hover:border-[#E8B84B] transition-all"
                  >
                    {label}
                  </button>
                ))}
              </div>
              {/* Info */}
              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                <span className="inline-flex items-center gap-1.5 bg-[#E8B84B] text-black text-[10px] font-black
                                 uppercase tracking-wider px-3 py-1 rounded-full mb-3">
                  🏆 Award
                </span>
                <h3 className="heading-md text-white mb-1">Unique Excellence Award</h3>
                <p className="text-white/50 text-sm font-light">Prestigious recognition for cinematic photography</p>
              </div>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 content-start">
              {STATS.map(stat => (
                <StatTile key={stat.key} stat={stat} active={statsInView} />
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
