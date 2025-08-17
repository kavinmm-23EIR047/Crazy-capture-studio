import React, { useState, useEffect } from 'react';
import { Camera, Focus, Aperture, Image, Zap } from 'lucide-react';

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
    <div className="fixed inset-0 flex items-center justify-center z-50" style={{backgroundColor: '#000F1A'}}>
      <div className="text-center">
        {/* Animated icon */}
        <div className="mb-8 relative flex justify-center">
          <Icon 
            size={64} 
            className={`${color} transition-all duration-300 transform hover:scale-110`}
            key={currentIcon}
          />
          <div className="absolute inset-0 flex justify-center animate-ping opacity-20">
            <Icon size={64} className={color} />
          </div>
        </div>

        {/* Studio name */}
        <h1 className="text-3xl font-bold text-white mb-12 tracking-wider">
          CRAZY <span className="text-yellow-400">CAPTURE</span>
        </h1>
        <h2 className="text-lg font-semibold text-yellow-400 -mt-10 mb-8 tracking-widest">
          STUDIO
        </h2>

        {/* Loading dots */}
        <div className="flex justify-center items-center space-x-3">
          {[1, 2, 3].map((dot) => (
            <div
              key={dot}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                dot <= dotCount 
                  ? 'bg-yellow-400 scale-125' 
                  : 'bg-slate-600 scale-100'
              }`}
            />
          ))}
        </div>

        {/* Loading text */}
        <div className="text-gray-300 text-sm mt-6 font-medium tracking-wide">
          Crafting visuals{'.'.repeat(dotCount)}
        </div>
      </div>
    </div>
  );
};

export default Loader;