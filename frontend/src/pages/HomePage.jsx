import React from 'react';
import { motion } from 'framer-motion';
import HeroSection        from '../components/HeroSection';
import AboutSection       from '../components/AboutSection';
import ServicesSection    from '../components/ServicesSection';
import StudioBoxSection   from '../components/StudioBoxSection';
import GalleryPreview     from '../components/GalleryPreview';
import TestimonialsSection from '../components/TestimonialsSection';
import ContactSection     from '../components/ContactSection';

export default function HomePage() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full min-h-screen"
    >
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <StudioBoxSection />
      <GalleryPreview />
      <TestimonialsSection />
      <ContactSection />
    </motion.main>
  );
}
