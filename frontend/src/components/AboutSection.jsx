import React, { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";

/* ─── Animated counter hook ──────────────────────────────────── */
function useCounter(target, active, duration = 1800) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(ease * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return value;
}

/* ─── Single stat tile ───────────────────────────────────────── */
function StatTile({ stat, active, accent }) {
  const count = useCounter(stat.target, active);
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: stat.delay }}
      className={`stat-tile ${accent ? 'accent' : ''}`}
    >
      <span className="stat-label">{stat.label}</span>
      <span className="stat-value">
        {count}{stat.suffix}
      </span>
    </motion.div>
  );
}

/* ─── Main component ─────────────────────────────────────────── */
const AboutAndAchievements = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  const videoRef1 = useRef(null);
  const videoRef2 = useRef(null);
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-80px" });

  const stats = [
    { key: "clients",      target: 500,  suffix: "+", label: "Happy Clients",    delay: 0.0,  accent: true  },
    { key: "awards",       target: 15,   suffix: "+", label: "Awards Won",       delay: 0.07, accent: false },
    { key: "projects",     target: 1000, suffix: "+", label: "Projects Done",    delay: 0.14, accent: false },
    { key: "experience",   target: 5,    suffix: "+", label: "Years Active",     delay: 0.21, accent: false },
    { key: "satisfaction", target: 98,   suffix: "%", label: "Satisfaction",     delay: 0.28, accent: true  },
    { key: "events",       target: 950,  suffix: "+", label: "Events Captured",  delay: 0.35, accent: false },
  ];

  const togglePlay = () => {
    const v = videoRef2.current;
    if (!v) return;
    isPlaying ? v.pause() : v.play();
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const v1 = videoRef1.current;
    const v2 = videoRef2.current;

    const ob1 = new IntersectionObserver(([e]) => {
      if (v1) e.isIntersecting ? v1.play() : v1.pause();
    }, { threshold: 0.4 });
    const ob2 = new IntersectionObserver(([e]) => {
      if (v2) {
        if (e.isIntersecting) { v2.play(); setIsPlaying(true); }
        else { v2.pause(); setIsPlaying(false); }
      }
    }, { threshold: 0.4 });

    if (v1) ob1.observe(v1);
    if (v2) ob2.observe(v2);
    return () => { ob1.disconnect(); ob2.disconnect(); };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@300;400;500;700&display=swap');

        .ccs-root { font-family: 'DM Sans', sans-serif; background: transparent; color: #fff; }

        /* ── About section ── */
        .about-wrap {
          max-width: 1400px;
          margin: 0 auto;
          padding: 80px 24px;
        }
        
        .about-header {
          margin-bottom: 40px;
          padding: 0 24px;
        }

        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
          align-items: stretch;
        }
        @media (max-width: 900px) {
          .about-grid { grid-template-columns: 1fr; gap: 48px; }
        }

        /* ── Video frame ── */
        .vid-border-box {
          background: rgba(40, 40, 40, 0.7);
          padding: 10px;
          border-radius: 24px;
          box-shadow: 0 40px 100px -20px rgba(0,0,0,0.5);
          width: 100%;
          max-width: 440px;
          margin: 0 auto;
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(12px);
        }

        .vid-frame {
          position: relative;
          border-radius: 18px;
          overflow: hidden;
          aspect-ratio: 3/3.8;
          background: #000;
        }
        .vid-frame video { width: 100%; height: 100%; object-fit: cover; display: block; }

        /* ── About text ── */
        .about-text { 
          display: flex; 
          flex-direction: column; 
          justify-content: center;
          gap: 28px;
          padding: 40px;
        }
        @media (max-width: 900px) { .about-text { padding: 0; } }

        .section-eyebrow {
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: #E8B84B;
        }
        .about-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(38px, 5vw, 64px);
          font-weight: 800;
          line-height: 1.05;
          letter-spacing: -0.02em;
          color: #FFFFFF;
          margin: 0;
        }
        .about-title span { color: #E8B84B; }

        .about-body {
          font-size: 16px; line-height: 1.75;
          color: rgba(255,255,255,0.6);
          font-weight: 300;
          border-left: 2px solid rgba(232,184,75,0.3);
          padding-left: 20px;
          margin: 0;
        }

        .quote-block {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-left: 3px solid #E8B84B;
          border-radius: 12px;
          padding: 20px 24px;
        }
        .quote-block p {
          font-size: 15px; font-style: italic;
          color: rgba(255,255,255,0.5);
          margin: 0 0 12px;
          line-height: 1.6;
        }
        .quote-author {
          font-size: 12px; font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #E8B84B;
        }

        /* ── Milestones section ── */
        .milestones-section {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 48px 100px;
        }
        @media (max-width: 900px) { .milestones-section { padding: 0 24px 80px; } }

        .milestones-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 48px;
          gap: 24px;
        }
        .milestones-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(34px, 4.5vw, 52px);
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -0.02em;
          color: #fff;
          margin: 0;
        }
        @media (max-width: 640px) {
          .milestones-title { font-size: 28px; text-align: center; width: 100%; }
          .milestones-header { flex-direction: column; align-items: center; text-align: center; }
        }
        .milestones-title span { color: #E8B84B; }

        /* ── Bento layout ── */
        .bento {
          display: grid;
          grid-template-columns: 1fr 1.8fr;
          gap: 20px;
        }
        @media (max-width: 1024px) {
          .bento { grid-template-columns: 1fr; }
        }

        .award-card {
          border-radius: 24px;
          overflow: hidden;
          position: relative;
          background: #111;
          aspect-ratio: 4/3;
        }
        @media (max-width: 1024px) { .award-card { aspect-ratio: 16/9; } }

        .award-card video { width: 100%; height: 100%; object-fit: cover; display: block; }
        .award-card-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 50%);
        }
        .award-card-info {
          position: absolute; bottom: 0; left: 0; right: 0;
          padding: 32px;
        }
        .award-tag {
          display: inline-flex; align-items: center; gap: 8px;
          background: #E8B84B; color: #0D0D12;
          font-size: 11px; font-weight: 800;
          letter-spacing: 0.18em; text-transform: uppercase;
          padding: 6px 16px; border-radius: 40px;
          margin-bottom: 12px;
        }
        .award-card-title {
          font-family: 'Syne', sans-serif;
          font-size: 24px; font-weight: 700;
          color: #fff; margin: 0 0 6px;
        }
        .award-card-desc {
          font-size: 14px; color: rgba(255,255,255,0.5);
          margin: 0;
        }
        .award-controls {
          position: absolute; top: 20px; right: 20px;
          display: flex; gap: 10px;
        }
        .ctrl-btn {
          width: 40px; height: 40px;
          border-radius: 50%;
          background: rgba(0,0,0,0.6);
          border: 1px solid rgba(255,255,255,0.15);
          color: #fff;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          font-size: 14px;
          transition: background 0.2s;
        }
        .ctrl-btn:hover { background: #E8B84B; color: #000; }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        @media (max-width: 640px) { 
          .stats-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; } 
        }

        .stat-tile {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          padding: 32px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }
        .stat-tile.accent {
          background: #E8B84B;
          border-color: #E8B84B;
        }
        .stat-label {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
          text-align: center;
        }
        .stat-tile.accent .stat-label { color: rgba(0,0,0,0.5); }
        
        .stat-value {
          font-size: 40px;
          font-weight: 800;
          line-height: 1;
          letter-spacing: -0.03em;
          color: #FFFFFF;
          font-family: 'Syne', sans-serif;
        }
        .stat-tile.accent .stat-value { color: #000; }

        @media (max-width: 640px) {
          .stat-tile { padding: 20px 12px; border-radius: 16px; }
          .stat-value { font-size: 28px; }
          .stat-label { font-size: 9px; }
        }

        .divider {
          width: 60px; height: 3px;
          background: #E8B84B;
          border-radius: 2px;
        }

        /* Viewfinder HUD styling */
        .rec-dot { width: 8px; height: 8px; border-radius: 50%; animation: pulse 1.5s infinite; }
        @keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.3; } 100% { opacity: 1; } }
        .badge { display: flex; align-items: center; gap: 8px; font-size: 10px; font-weight: 800; color: #fff; background: rgba(0,0,0,0.5); padding: 4px 12px; border-radius: 4px; }
        .corner { position: absolute; width: 16px; height: 16px; border-color: #E8B84B; border-style: solid; }
        .corner.tl { top: 12px; left: 12px; border-width: 2px 0 0 2px; }
        .corner.tr { top: 12px; right: 12px; border-width: 2px 2px 0 0; }
        .corner.bl { bottom: 12px; left: 12px; border-width: 0 0 2px 2px; }
        .corner.br { bottom: 12px; right: 12px; border-width: 0 2px 2px 0; }
      `}</style>

      <div className="ccs-root">

        {/* ══════════════ ABOUT SECTION ══════════════ */}
        <div className="about-wrap">
          {/* Top Title Section */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="about-header"
          >
            <p className="section-eyebrow">About Us</p>
            <div className="divider" style={{ marginTop: 12 }} />
          </motion.div>

          <div className="about-grid">
            {/* Video Frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="vid-border-box"
            >
              <div className="vid-frame">
                <video
                  ref={videoRef1}
                  src="https://res.cloudinary.com/dxm3glvjq/video/upload/v1754756318/Passionate_work_enjoyable_crazy_capture_studio_praba_prince_love_passion_work_enjoy_nrkz1c.mp4"
                  autoPlay loop muted playsInline preload="metadata"
                  style={{ filter: "grayscale(1) contrast(1.1) brightness(0.9)" }}
                />
                
                {/* Original Camera UI Overlay */}
                <div className="absolute inset-0 pointer-events-none p-5 flex flex-col justify-between bg-gradient-to-b from-black/40 via-transparent to-black/40">
                   <div className="flex justify-between items-start drop-shadow-md">
                      <div className="badge shadow-lg"><div className="rec-dot bg-red-600" /><span>REC</span></div>
                      <div className="flex flex-col items-end gap-1">
                         <div className="flex items-center gap-2">
                           <div className="w-8 h-4 border border-white/60 rounded-[2px] flex items-center p-[1px]">
                             <div className="w-full h-full bg-green-500 rounded-[1px]" />
                           </div>
                           <span className="text-[10px] font-mono text-white font-bold">100%</span>
                         </div>
                         <div className="text-[10px] font-mono text-white/80 font-bold tracking-widest">999+ RAW</div>
                      </div>
                   </div>

                   {/* 3x3 Grid Lines */}
                   <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 opacity-20">
                      <div className="border-r border-b border-white" />
                      <div className="border-r border-b border-white" />
                      <div className="border-b border-white" />
                      <div className="border-r border-b border-white" />
                      <div className="border-r border-b border-white" />
                      <div className="border-b border-white" />
                      <div className="border-r border-white" />
                      <div className="border-r border-white" />
                      <div />
                   </div>

                   <div className="flex justify-between items-end drop-shadow-md">
                      <div className="flex gap-4">
                         <div className="flex flex-col">
                            <span className="text-[9px] text-white/60 uppercase font-bold">ISO</span>
                            <span className="text-[11px] font-mono text-white font-bold">400</span>
                         </div>
                         <div className="flex flex-col">
                            <span className="text-[9px] text-white/60 uppercase font-bold">Shutter</span>
                            <span className="text-[11px] font-mono text-white font-bold">1/125</span>
                         </div>
                      </div>
                      <div className="text-[11px] font-mono text-white font-bold tracking-tighter">00:42:15:09</div>
                   </div>
                </div>

                <div className="corner tl" /><div className="corner tr" />
                <div className="corner bl" /><div className="corner br" />
                
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center">
                   <div className="w-4 h-[1px] bg-white/40" />
                   <div className="h-4 w-[1px] bg-white/40 absolute" />
                </div>
              </div>
            </motion.div>

            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="about-text"
            >
              <h2 className="about-title">
                We capture<br />
                <span>golden</span> moments
              </h2>

              <p className="about-body">
                Hello and welcome! I'm <strong>Prabakaran</strong>, founder of{" "}
                <strong>Crazy Capture Studio</strong>. Photography has been more than a
                profession — it's my lifelong passion. Every frame we capture is a
                story, a memory, a feeling frozen in time.
              </p>

              <div className="quote-block">
                <p>
                  "Thank you for trusting us to tell your story through our lens.
                  We look forward to creating timeless memories with you."
                </p>
                <div className="quote-author mt-2">— Prabakaran, Founder & CEO</div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ══════════════ MILESTONES SECTION ══════════════ */}
        <div className="milestones-section" ref={statsRef}>

          <div className="milestones-header">
            <div>
              <p className="section-eyebrow" style={{ marginBottom: 10 }}>Our Milestones</p>
              <h2 className="milestones-title">
                Built on<br /><span>trust</span> & craft
              </h2>
            </div>
            <p className="milestones-sub">
              Celebrating excellence in every frame we capture — one story at a time.
            </p>
          </div>

          <div className="bento">
            {/* Award video card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="award-card"
            >
              <video
                ref={videoRef2}
                src="https://res.cloudinary.com/dxm3glvjq/video/upload/v1754840452/Honored_to_receive_this_photography_award.Behind_every_frame_is_a_story_thank_you_for_seeing_m_1_pdopyf.mp4"
                autoPlay loop muted={isMuted} playsInline preload="metadata"
                style={{ filter: "contrast(1.1) saturate(1.2)" }}
              />
              <div className="award-card-overlay" />

              <div className="award-controls">
                <button className="ctrl-btn" onClick={togglePlay}>
                  {isPlaying ? "⏸" : "▶"}
                </button>
                <button className="ctrl-btn" onClick={() => setIsMuted(!isMuted)}>
                  {isMuted ? "🔇" : "🔊"}
                </button>
              </div>

              <div className="award-card-info">
                <div className="award-tag">🏆 Award</div>
                <h3 className="award-card-title">Unique Excellence Award</h3>
                <p className="award-card-desc">Prestigious recognition for cinematic photography</p>
              </div>
            </motion.div>

            {/* Stats grid */}
            <div className="stats-grid">
              {stats.map((stat) => (
                <StatTile key={stat.key} stat={stat} active={statsInView} accent={stat.accent} />
              ))}
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default AboutAndAchievements;
