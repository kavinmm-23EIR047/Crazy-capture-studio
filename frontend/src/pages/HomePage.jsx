import React from 'react';
import { motion } from 'framer-motion';

import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ServicesSection from '../components/ServicesSection';
import GalleryPreview from '../components/GalleryPreview';
import TestimonialsSection from '../components/TestimonialsSection';
import ContactSection from '../components/ContactSection';

const HomePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full min-h-screen text-white pt-24"
      style={{
        backgroundColor: "#000F1A", // Static navy background
        margin: 0,                  // Remove default body margin
        padding: 0                  // Remove extra padding
      }}
    >
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <GalleryPreview />
      <TestimonialsSection />
      <ContactSection />
    </motion.div>
  );
};

export default HomePage;
