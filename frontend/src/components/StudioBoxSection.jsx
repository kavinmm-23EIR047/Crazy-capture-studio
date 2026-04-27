import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import CrazyCaptureBox from './CrazyCaptureBox';
import { Camera, Sparkles, ShieldCheck } from 'lucide-react';

const STEPS = [
  { num:'01', title:'Pose & Signal',  desc:'Find your perfect angle. Our system calibrates studio lighting for your skin tone in real time.' },
  { num:'02', title:'Smart Capture',  desc:'Hit the shutter button. The node processes your RAW signal instantly in the browser.' },
  { num:'03', title:'PDF Export',     desc:'Confirm your shot and download a branded high-quality PDF with your studio capture.' },
];

export default function StudioBoxSection() {
  const ref      = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="studio-box"
      ref={ref}
      className="section relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, transparent 0%, #050510 30%, #050510 70%, transparent 100%)' }}
    >
      {/* Background glow orbs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-[#E8B84B]/6 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-[1fr_1.15fr] gap-10 xl:gap-16 items-start">

          {/* Right — CrazyCaptureBox (Moved first for mobile priority) */}
          <motion.div
            initial={{ opacity:0, scale:0.92 }}
            animate={isInView ? { opacity:1, scale:1 } : {}}
            transition={{ duration: 0.9 }}
            className="order-1 lg:order-2 w-full"
          >
            <div className="relative group">
              {/* Glow */}
              <div className="absolute -inset-6 bg-gradient-to-tr from-[#E8B84B]/12 to-white/4
                              rounded-[3rem] blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-700" />
              {/* Frame */}
              <div className="relative bg-[#0a0a0a] border-4 border-[#181818] p-1 rounded-2xl
                              shadow-[0_30px_70px_rgba(0,0,0,0.8)] overflow-hidden
                              group-hover:scale-[1.015] transition-transform duration-500">
                <CrazyCaptureBox inline={true} />
              </div>
            </div>
          </motion.div>

          {/* Left — info (Moved second for mobile priority) */}
          <div className="space-y-8 order-2 lg:order-1">
            <motion.div
              initial={{ opacity:0, x:-30 }}
              animate={isInView ? { opacity:1, x:0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass
                              border border-white/10 text-[#E8B84B] text-xs font-medium tracking-[0.2em] uppercase mb-6">
                <Sparkles size={12} />
                Studio Node Workflow
              </div>
              <h2 className="display-md text-white">
                How it <span className="text-[#E8B84B]">Works</span>
              </h2>
              <p className="body-lg text-white/50 mt-4 max-w-md">
                Your personal in-browser studio — capture, process, and export professional photos in seconds.
              </p>
            </motion.div>

            {/* Steps */}
            <div className="space-y-4">
              {STEPS.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity:0, y:20 }}
                  animate={isInView ? { opacity:1, y:0 } : {}}
                  transition={{ delay: 0.35 + i * 0.1, duration: 0.6 }}
                  className="group flex gap-5 p-5 sm:p-6 rounded-2xl glass border border-white/8
                             hover:border-[#E8B84B]/30 hover:bg-white/[0.06] transition-all duration-300"
                >
                  <span className="text-2xl sm:text-3xl font-black text-[#E8B84B]/20
                                   group-hover:text-[#E8B84B] transition-colors leading-none shrink-0 pt-1">
                    {step.num}
                  </span>
                  <div>
                    <h4 className="text-white font-bold text-sm sm:text-base mb-1">{step.title}</h4>
                    <p className="text-white/40 text-sm font-light leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex items-center gap-3 text-white/25 text-[10px] uppercase tracking-widest
                            font-light pt-2 border-t border-white/5">
              <ShieldCheck size={15} className="text-green-400 shrink-0" />
              Browser-only · No server uploads · 100% private
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
