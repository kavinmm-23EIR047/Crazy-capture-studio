import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import CrazyCaptureBox from './CrazyCaptureBox';
import { Camera, Sparkles, ShieldCheck } from 'lucide-react';

const StudioBoxSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="studio-box"
      ref={ref}
      className="relative py-24 px-4 sm:px-6 bg-[#050510] overflow-hidden"
    >
      <div className="parallax-bg bg-[url('https://res.cloudinary.com/dxm3glvjq/image/upload/v1754574464/317146553_3370299676574390_6411223539222079084_n_qaagqe.jpg')] opacity-5" />

      {/* Parallax Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 bg-yellow-400 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-[150px] animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_1.2fr] items-center gap-8 px-4 sm:px-12 relative z-10">
        
        {/* Left Side: Steps & Works */}
        <div className="space-y-10 order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-yellow-400 text-xs font-bold mb-8 uppercase tracking-widest">
              <Sparkles size={14} />
              Studio Node Workflow
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-white font-heading tracking-tighter uppercase leading-[0.9] mb-8">
               How it <br />
               <span className="gradient-text">Works</span>
            </h2>
          </motion.div>

          <div className="grid gap-6 max-w-lg">
            {[
              { num: '01', title: 'Pose & Signal', desc: 'Find your perfect angle. Our system automatically calibrates studio lighting for your skin tone.' },
              { num: '02', title: 'Smart Capture', desc: 'Hit the iPhone-style shutter button. The node processes the RAW signal instantly.' },
              { num: '03', title: 'PDF Export', desc: 'Confirm your shot and download a high-quality PDF brochure with your studio capture.' }
            ].map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + (i * 0.1) }}
                className="group flex gap-6 p-6 rounded-[2rem] bg-white/[0.03] border border-white/10 hover:border-yellow-400/30 hover:bg-white/[0.06] transition-all"
              >
                <div className="text-3xl font-black text-yellow-400/20 group-hover:text-yellow-400 transition-colors leading-none">{step.num}</div>
                <div>
                  <h4 className="text-white font-black uppercase text-sm mb-1 tracking-tighter">{step.title}</h4>
                  <p className="text-white/40 text-[11px] leading-relaxed font-medium uppercase tracking-tight">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex items-center gap-4 text-white/30 text-[9px] uppercase font-black tracking-[0.3em] border-t border-white/5 pt-8">
             <ShieldCheck size={16} className="text-green-500" />
             Browser Signal Processing • No Server Uploads
          </div>
        </div>

        {/* Right Side: Interactive Studio Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1 }}
          className="order-1 lg:order-2 w-full flex justify-start"
        >
          <div className="relative group w-full max-w-[650px]">
            {/* Decorative background for the box */}
            <div className="absolute -inset-10 bg-gradient-to-tr from-yellow-400/10 to-white/5 rounded-[60px] blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />
            
            <div className="relative bg-[#0a0a0a] border-4 border-[#1a1a1a] p-1 rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.8)] overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent pointer-events-none z-20" />
              <CrazyCaptureBox inline={true} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StudioBoxSection;
