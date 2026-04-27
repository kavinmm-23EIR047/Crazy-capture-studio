import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink } from 'lucide-react';

const IMAGES = [
  { src: "https://res.cloudinary.com/dxm3glvjq/image/upload/v1754575418/get_ty5cuf.jpg",                           alt: "Wedding Photography Tiruppur" },
  { src: "https://res.cloudinary.com/dxm3glvjq/image/upload/v1754574461/dm_for_more_enquire.......8124787002_1_gwlgmr.jpg", alt: "Birthday Photography Tiruppur" },
  { src: "https://res.cloudinary.com/dxm3glvjq/image/upload/v1754574980/Recent_shoot_with_pradeep_kumar1123_trending_livemusic_loveislove_songs_idk6ur.jpg", alt: "Concert Photography" },
  { src: "https://res.cloudinary.com/dxm3glvjq/image/upload/v1754575850/441211858_1516889262195295_5631550106516590248_n_ztz91b.jpg", alt: "Baby Shower Photography" },
  { src: "https://res.cloudinary.com/dxm3glvjq/image/upload/v1754574963/aranthainisha_special_thanks_to_d_squad_studio_unique_surprise_plannerss_likes_like_follow_a8ocpp.jpg", alt: "Special Event Photography" },
  { src: "https://res.cloudinary.com/dxm3glvjq/image/upload/v1754574464/317146553_3370299676574390_6411223539222079084_n_qaagqe.jpg", alt: "Portrait Photography Tiruppur" },
  { src: "https://res.cloudinary.com/dxm3glvjq/image/upload/v1754497079/DONE6877_wbi80g.jpg",                     alt: "Wedding Shoot Creative" },
  { src: "https://res.cloudinary.com/dxm3glvjq/image/upload/v1754576215/get_3_dquye5.jpg",                        alt: "Event Photography Portfolio" },
];

export default function GalleryPreview() {
  const ref      = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="section bg-transparent" ref={ref}>
      {/* Subtle bg image watermark */}
      <div
        className="absolute inset-0 opacity-[0.04] bg-cover bg-center pointer-events-none"
        style={{ backgroundImage: `url(${IMAGES[2].src})` }}
      />

      <div className="container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="section-header"
        >
          <p className="eyebrow">Portfolio</p>
          <div className="divider-gold" />
          <h2 className="display-md text-white mt-4">
            Featured <span className="text-[#E8B84B]">Work</span>
          </h2>
          <p className="body-lg text-white/50 mt-4 max-w-xl">
            A glimpse into our portfolio — artistry and emotion captured in every frame.
          </p>
        </motion.div>

        {/* Masonry-style Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4 mb-10 sm:mb-14"
        >
          {IMAGES.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.07 }}
              className={`group card-image overflow-hidden rounded-2xl shadow-md border border-white/8
                          hover:border-[#E8B84B]/40 transition-all duration-350 cursor-pointer
                          ${i === 0 || i === 5 ? 'col-span-2 aspect-[16/9]' : 'aspect-square'}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-[1.07] transition-transform duration-650"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent
                              opacity-0 group-hover:opacity-100 transition-opacity duration-350 flex items-end p-4">
                <span className="text-white text-xs font-light tracking-wide">{img.alt}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to="/gallery" className="btn btn-primary btn-lg gap-2">
            View Full Gallery
            <ArrowRight size={17} />
          </Link>
          <a
            href="https://crazycapturestudio.pixieset.com/crazycapturesamples/"
            target="_blank" rel="noopener noreferrer"
            className="btn btn-secondary btn-lg gap-2"
          >
            <ExternalLink size={15} />
            Pixieset Gallery
          </a>
        </motion.div>
      </div>
    </section>
  );
}
