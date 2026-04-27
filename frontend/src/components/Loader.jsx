import React, { useState, useEffect } from 'react';
import { Camera, Focus, Aperture, Image, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const Loader = () => {
  const [currentIcon, setCurrentIcon] = useState(0);
  const [dotCount, setDotCount] = useState(1);

  const icons = [
    { Icon: Camera, color: 'text-white' },
    { Icon: Focus, color: 'text-yellow-400' },
    { Icon: Aperture, color: 'text-white' },
    { Icon: Image, color: 'text-yellow-400' },
    { Icon: Zap, color: 'text-white' }
  ];

  useEffect(() => {
    // Change icons every 800ms
    const iconInterval = setInterval(() => {
      setCurrentIcon(prev => (prev + 1) % icons.length);
    }, 800);

    // Animate dots every 500ms
    const dotInterval = setInterval(() => {
      setDotCount(prev => prev === 3 ? 1 : prev + 1);
    }, 500);

    return () => {
      clearInterval(iconInterval);
      clearInterval(dotInterval);
    };
  }, []);

  const { Icon, color } = icons[currentIcon];

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[200] bg-[#0c0c1d]">
      <div className="text-center relative">
        {/* Decorative Ring */}
        <div className="absolute inset-0 -m-10 border border-yellow-400/10 rounded-full animate-[spin_10s_linear_infinite]" />
        <div className="absolute inset-0 -m-16 border border-white/5 rounded-full animate-[spin_15s_linear_infinite_reverse]" />

        {/* Animated icon */}
        <div className="mb-10 relative flex justify-center">
          <div className="w-24 h-24 glass-morphism rounded-3xl flex items-center justify-center shadow-[0_0_40px_rgba(255,203,5,0.2)]">
            <Icon 
              size={48} 
              className={`${color} transition-all duration-500 transform`}
              key={currentIcon}
            />
          </div>
          <div className="absolute inset-0 flex justify-center animate-ping opacity-10">
            <Icon size={48} className={color} />
          </div>
        </div>

        {/* Studio name */}
        <div className="space-y-1">
          <h1 className="text-4xl font-black tracking-tighter text-white">
            CRAZY <span className="gradient-text">CAPTURE</span>
          </h1>
          <p className="text-xs tracking-[0.5em] text-white/50 uppercase font-light">
            Professional Studio
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mt-12 w-48 mx-auto h-1 bg-white/5 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-yellow-400"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 5, ease: "linear" }}
          />
        </div>

        {/* Loading text */}
        <div className="text-gray-500 text-[10px] mt-4 font-bold tracking-widest uppercase">
          Initializing Camera{'.'.repeat(dotCount)}
        </div>
      </div>
    </div>
  );
};

export default Loader;