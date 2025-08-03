import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Camera, Award, Users, Heart } from 'lucide-react';
import logo from '../assets/Crazylogo.png';

const Counter = ({ target, label }) => {
  const [count, setCount] = useState(0);
  const ref = useRef();
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = parseInt(target.replace('+', ''));
    const duration = 1200;
    const stepTime = Math.max(Math.floor(duration / end), 20);

    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) clearInterval(timer);
    }, stepTime);
  }, [isInView, target]);

  return (
    <div
      ref={ref}
      className="text-center p-4 rounded-xl backdrop-blur-md bg-white/5 border border-white/10 transition-all duration-300 hover:scale-105"
    >
      <div className="flex justify-center mb-3">
        {label === 'Years Experience' ? <Heart className="w-8 h-8 text-[#FFCB05]" /> :
          label === 'Awards Won' ? <Award className="w-8 h-8 text-[#FFCB05]" /> :
            label === 'Happy Clients' ? <Users className="w-8 h-8 text-[#FFCB05]" /> :
              <Camera className="w-8 h-8 text-[#FFCB05]" />}
      </div>
      <div className="text-3xl font-bold mb-1">{count}+</div>
      <div className="text-[#B0B0B0] text-sm">{label}</div>
    </div>
  );
};

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="py-24 bg-transparent text-white relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <img
            src={logo}
            alt="Crazy Capture Logo"
            className="mx-auto w-24 sm:w-28 object-contain"
          />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="backdrop-blur-md bg-white/5 border border-white/10 p-8 rounded-2xl shadow-xl"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              About <span className="text-[#FFCB05]">Our Studio</span>
            </h2>
            <p className="text-lg text-[#B0B0B0] mb-6 leading-relaxed">
              Founded in 2016, Crazy Capture Studio has been at the forefront of creative photography,
              transforming ordinary moments into extraordinary memories.
            </p>
            <p className="text-lg text-[#B0B0B0] mb-8 leading-relaxed">
              Our team blends artistic creativity with technical excellence to deliver photos that are both timeless and emotionally impactful.
            </p>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-inner">
              <h3 className="text-xl font-semibold text-[#FFCB05] mb-3">Our Mission</h3>
              <p className="text-[#CCCCCC] text-base">
                To create timeless photographs that celebrate life’s most precious moments while delivering
                a seamless, heart-centered experience.
              </p>
            </div>
          </motion.div>

          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-xl overflow-hidden shadow-lg">
              <img
                src="https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg"
                alt="Crazy Capture Studio"
                className="w-full h-96 object-cover rounded-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="absolute -bottom-6 -left-6 bg-[#FFCB05] text-black px-6 py-4 rounded-xl shadow-2xl"
            >
              <div className="text-2xl font-bold leading-tight">8+ Years</div>
              <div className="text-sm font-medium">of Excellence</div>
            </motion.div>
          </motion.div>
        </div>

        {/* Animated Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20"
        >
          <Counter target="500+" label="Sessions Completed" />
          <Counter target="15+" label="Awards Won" />
          <Counter target="1000+" label="Happy Clients" />
          <Counter target="8+" label="Years Experience" />
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
