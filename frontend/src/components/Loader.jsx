import React, { useEffect, useState } from 'react';
import { Camera, Video, Clapperboard, Image, MonitorPlay } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SERVICES = [
  { Icon: Camera,       title: 'Photography',    text: 'Capturing perfect moments' },
  { Icon: Video,        title: 'Videography',    text: 'Recording cinematic memories' },
  { Icon: Clapperboard, title: 'Editing',        text: 'Crafting stunning visuals' },
  { Icon: Image,        title: 'Album Design',   text: 'Designing timeless albums' },
  { Icon: MonitorPlay,  title: 'Reels & Shorts', text: 'Creating social content' },
];

export default function Loader() {
  const [idx,      setIdx]      = useState(0);
  const [dots,     setDots]     = useState(1);
  const [fading,   setFading]   = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setIdx(p => (p + 1) % SERVICES.length);
        setFading(false);
      }, 300);
    }, 1800);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setDots(p => (p === 3 ? 1 : p + 1)), 450);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setProgress(p => (p >= 100 ? 100 : p + 2)), 60);
    return () => clearInterval(t);
  }, []);

  const { Icon, title, text } = SERVICES[idx];

  return (
    <div className="fixed inset-0 z-[9999] bg-[#080810] flex items-center justify-center overflow-hidden">
      {/* Glow orbs — GPU composited */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-[#E8B84B]/8 rounded-full blur-[100px] animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-white/4 rounded-full blur-[80px]"
           style={{ animation: 'float-y 7s ease-in-out infinite 1.5s' }} />

      {/* Rotating ring decoration */}
      <div className="absolute w-[500px] h-[500px] border border-white/[0.04] rounded-full animate-spin-slow" />
      <div className="absolute w-[380px] h-[380px] border border-[#E8B84B]/[0.06] rounded-full animate-spin-slow"
           style={{ animationDirection: 'reverse', animationDuration: '28s' }} />

      {/* Main card */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-sm w-full">

        {/* Icon container */}
        <motion.div
          className="relative w-28 h-28 sm:w-32 sm:h-32 mb-7 sm:mb-8"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Glow ring */}
          <div className="absolute inset-0 rounded-3xl bg-[#E8B84B]/20 blur-lg animate-glow" />
          {/* Card */}
          <div className="relative w-full h-full glass border border-white/10 rounded-3xl
                          flex items-center justify-center shadow-xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.7, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.7, rotate: 10 }}
                transition={{ duration: 0.35 }}
              >
                <Icon size={48} className="text-[#E8B84B]" />
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Brand */}
        <h1 className="display-md text-white tracking-tighter mb-1">
          CRAZY <span className="text-[#E8B84B]">CAPTURE</span>
        </h1>
        <p className="eyebrow text-white/30 mb-7">Professional Photography Studio</p>

        {/* Rotating service label */}
        <div className="min-h-[52px] mb-7 flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <p className="text-lg sm:text-xl font-bold text-[#E8B84B] mb-1">{title}</p>
              <p className="text-sm text-white/40 font-light">{text}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress bar */}
        <div className="w-full max-w-xs mb-5">
          <div className="h-1.5 bg-white/8 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, #E8B84B, #fff8d6, #E8B84B)' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.12, ease: "linear" }}
            />
          </div>
        </div>

        {/* Loading dots */}
        <p className="label text-white/25">
          Loading{'.'.repeat(dots)}
        </p>
      </div>
    </div>
  );
}