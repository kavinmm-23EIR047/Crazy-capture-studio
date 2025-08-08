import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const GalleryPreview = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const galleryImages = [
     "https://res.cloudinary.com/dxm3glvjq/image/upload/v1754575418/get_ty5cuf.jpg",
  "https://res.cloudinary.com/dxm3glvjq/image/upload/v1754574461/dm_for_more_enquire.......8124787002_1_gwlgmr.jpg",
  "https://res.cloudinary.com/dxm3glvjq/image/upload/v1754574980/Recent_shoot_with_pradeep_kumar1123_trending_livemusic_loveislove_songs_idk6ur.jpg",
  "https://res.cloudinary.com/dxm3glvjq/image/upload/v1754575850/441211858_1516889262195295_5631550106516590248_n_ztz91b.jpg",
  "https://res.cloudinary.com/dxm3glvjq/image/upload/v1754574963/aranthainisha_special_thanks_to_d_squad_studio_unique_surprise_plannerss_likes_like_follow_a8ocpp.jpg",
  "https://res.cloudinary.com/dxm3glvjq/image/upload/v1754574464/317146553_3370299676574390_6411223539222079084_n_qaagqe.jpg",
  "https://res.cloudinary.com/dxm3glvjq/image/upload/v1754497079/DONE6877_wbi80g.jpg",
  "https://res.cloudinary.com/dxm3glvjq/image/upload/v1754576215/get_3_dquye5.jpg",

  ];

  return (
    <section className="py-24 bg-transparent relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Featured <span className="text-[#FFCB05]">Work</span>
          </h2>
          <p className="text-xl text-[#B0B0B0] max-w-3xl mx-auto">
            A glimpse into our portfolio showcasing the artistry and emotion we capture in every frame.
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-16"
        >
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-xl aspect-square shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer backdrop-blur-md bg-white/5 border border-white/10"
            >
              <img
                src={image}
                alt={`Gallery ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <Link
            to="/gallery"
            className="inline-flex items-center bg-[#FFCB05] text-black px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#e6b800] transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            View Full Gallery
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default GalleryPreview;
