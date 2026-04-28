import React, { useEffect, useState } from "react";
import {
  Camera,
  Video,
  Clapperboard,
  Image,
  MonitorPlay,
  Heart,
  User,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SERVICES = [
  { Icon: Camera, title: "Photographing" },
  { Icon: Video, title: "Videography" },
  { Icon: Clapperboard, title: "Editing" },
  { Icon: Image, title: "Albums" },
  { Icon: Heart, title: "Weddings" },
  { Icon: User, title: "Portraits" },
  { Icon: Sparkles, title: "Events" },
  { Icon: MonitorPlay, title: "Social Media" },
];

export default function Loader() {
  const [idx, setIdx] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIdx((p) => (p + 1) % SERVICES.length);
    }, 800);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setProgress((p) => (p >= 100 ? 100 : p + 1));
    }, 55);
    return () => clearInterval(t);
  }, []);

  const { Icon, title } = SERVICES[idx];

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#080810]">
      {/* Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-[-15%] left-[-15%] w-[60%] h-[60%] rounded-full bg-[#E8B84B]/10 blur-[140px] animate-dance-bg" />
        <div
          className="absolute bottom-[-15%] right-[-15%] w-[60%] h-[60%] rounded-full bg-purple-900/20 blur-[140px] animate-dance-bg"
          style={{ animationDelay: "-4s" }}
        />
        <div
          className="absolute top-[30%] right-[-5%] w-[45%] h-[45%] rounded-full bg-[#E8B84B]/5 blur-[120px] animate-dance-bg"
          style={{ animationDelay: "-8s" }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-4">
        {/* Icon */}
        <motion.div
          className="relative w-32 h-32 mb-10"
          animate={{
            y: [0, -12, 0],
            rotate: [-2, 2, -2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="absolute inset-0 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl" />
          <div className="absolute inset-0 rounded-full border border-[#E8B84B]/20 animate-ping opacity-20" />

          <div className="relative w-full h-full flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 1.5, rotate: 45 }}
                transition={{ duration: 0.3, ease: "backOut" }}
              >
                <Icon size={44} className="text-[#E8B84B]" />
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* BRANDING FIXED STRAIGHT FONT */}
        <div className="space-y-2">
          <h1
            className="text-3xl sm:text-4xl font-black uppercase tracking-[0.12em] text-white leading-none"
            style={{
              fontFamily:
                "Inter, Poppins, Montserrat, system-ui, sans-serif",
              fontStyle: "normal",
              transform: "none",
            }}
          >
            CRAZY{" "}
            <span className="text-[#E8B84B]">
              CAPTURE
            </span>
          </h1>

          <p className="text-[10px] tracking-[0.45em] uppercase text-white/40 font-semibold">
            STUDIO
          </p>

          <div className="h-5 overflow-hidden mt-2">
            <AnimatePresence mode="wait">
              <motion.p
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.2 }}
                className="text-[10px] font-bold tracking-[0.4em] text-[#E8B84B] uppercase"
              >
                {title}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        {/* Progress */}
        <div className="mt-12 w-44 h-1 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-[#E8B84B]"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1, ease: "linear" }}
          />
        </div>
      </div>

      <style>{`
        @keyframes dance-bg {
          0%, 100% { transform: translate(0,0) scale(1); }
          33% { transform: translate(30px,-40px) scale(1.1); }
          66% { transform: translate(-30px,20px) scale(0.9); }
        }

        .animate-dance-bg {
          animation: dance-bg 15s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}