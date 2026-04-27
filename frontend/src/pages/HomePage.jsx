import React from 'react';
import { motion } from 'framer-motion';

import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ServicesSection from '../components/ServicesSection';
import StudioBoxSection from '../components/StudioBoxSection';
import GalleryPreview from '../components/GalleryPreview';
import TestimonialsSection from '../components/TestimonialsSection';
import ContactSection from '../components/ContactSection';

const HomePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full min-h-screen relative"
    >
      {/* Global Paradox Layers */}
      <div className="fixed inset-0 paradox-layer-1" />
      <div className="fixed inset-0 paradox-layer-2" />
      
      <div className="relative z-10 pt-24">
      <HeroSection />
      
      <AboutSection />

      <ServicesSection />

      <StudioBoxSection />

      <GalleryPreview />

      <TestimonialsSection />
      <ContactSection />
      </div>
    </motion.div>
  );
};

export default HomePage;
