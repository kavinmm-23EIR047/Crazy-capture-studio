import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const GalleryPreview = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // SEO-friendly gallery images with src and alt
  const galleryImages = [
    {
      src: "https://res.cloudinary.com/dxm3glvjq/image/upload/v1754575418/get_ty5cuf.jpg",
      alt: "Beautiful Wedding Photography in Tiruppur by Crazy Capture Studio"
    },
    {
      src: "https://res.cloudinary.com/dxm3glvjq/image/upload/v1754574461/dm_for_more_enquire.......8124787002_1_gwlgmr.jpg",
      alt: "Birthday Celebration Photography in Tiruppur by Crazy Capture Studio"
    },
    {
      src: "https://res.cloudinary.com/dxm3glvjq/image/upload/v1754574980/Recent_shoot_with_pradeep_kumar1123_trending_livemusic_loveislove_songs_idk6ur.jpg",
      alt: "Concert Photography in Tiruppur capturing live music moments"
    },
    {
      src: "https://res.cloudinary.com/dxm3glvjq/image/upload/v1754575850/441211858_1516889262195295_5631550106516590248_n_ztz91b.jpg",
      alt: "Baby Shower Photography in Tiruppur by Crazy Capture Studio"
    },
    {
      src: "https://res.cloudinary.com/dxm3glvjq/image/upload/v1754574963/aranthainisha_special_thanks_to_d_squad_studio_unique_surprise_plannerss_likes_like_follow_a8ocpp.jpg",
      alt: "Special Event Photography in Tiruppur by Crazy Capture Studio"
    },
    {
      src: "https://res.cloudinary.com/dxm3glvjq/image/upload/v1754574464/317146553_3370299676574390_6411223539222079084_n_qaagqe.jpg",
      alt: "Professional Portrait Photography in Tiruppur"
    },
    {
      src: "https://res.cloudinary.com/dxm3glvjq/image/upload/v1754497079/DONE6877_wbi80g.jpg",
      alt: "Creative Wedding Photoshoot in Tiruppur"
    },
    {
      src: "https://res.cloudinary.com/dxm3glvjq/image/upload/v1754576215/get_3_dquye5.jpg",
      alt: "Event Photography Portfolio in Tiruppur by Crazy Capture Studio"
    },
  ];

  return (
    <section className="relative py-24 bg-transparent overflow-hidden">
      <div className="parallax-bg bg-[url('https://res.cloudinary.com/dxm3glvjq/image/upload/v1754574980/Recent_shoot_with_pradeep_kumar1123_trending_livemusic_loveislove_songs_idk6ur.jpg')] opacity-5" />
      
      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <p className="text-xs font-bold uppercase tracking-widest text-[#E8B84B] mb-3">Portfolio</p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 font-heading">
            Featured <span>Work</span>
          </h2>
          <div className="w-16 h-[3px] bg-[#E8B84B] rounded-full mb-8" />
          
          <p className="text-lg text-white/60 max-w-2xl leading-relaxed font-body">
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
                src={image.src}
                alt={image.alt} // ✅ Use proper alt text for SEO
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
            className="inline-flex items-center bg-[#E8B84B] text-black px-8 py-4 rounded-full text-lg font-bold hover:bg-[#D4A742] transition-all duration-300 transform hover:scale-105 shadow-lg font-heading"
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
