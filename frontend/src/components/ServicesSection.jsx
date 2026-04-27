import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Heart, Camera, Baby, Gift, Megaphone, Download, UserCheck } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const SERVICES = [
  {
    icon: Baby, title: 'Baby Shoot',
    description: 'Capture those adorable giggles and first milestones forever with warmth and care.',
    image: 'https://res.cloudinary.com/dxm3glvjq/image/upload/v1754574465/HELLO_ALL_HOPE_YOU_ALL_ARE_GOOD_AND_SAFE_%EF%B8%8F_Yes_we_are_back_With_all_your_blessings_here_is_ou_dpvfwz.jpg',
    features: ['Newborn Themes', 'Natural Light', 'Candid Emotions', 'Safe Props'],
    link: 'https://www.instagram.com/crazy_capture_studio/', pdf: '/babyshoot.pdf',
  },
  {
    icon: Heart, title: 'Wedding Photography',
    description: 'Relive your big day through timeless cinematic captures that tell your love story.',
    image: 'https://res.cloudinary.com/dxm3glvjq/image/upload/v1754497314/VIDE5698_xpws5g.jpg',
    features: ['Candid Moments', 'Couple Portraits', 'Drone Shots', 'Cinematic Edit'],
    link: 'https://www.instagram.com/crazy_capture_studio/', pdf: '/wedding_brochure (1).pdf',
  },
  {
    icon: Gift, title: 'Baby Shower',
    description: 'Celebrate new beginnings with warm and joyful frames full of family love.',
    image: 'https://res.cloudinary.com/dxm3glvjq/image/upload/v1754575850/get_2_q82lgm.jpg',
    features: ['Decor Details', 'Family Portraits', 'Games & Candid', 'Gift Reveal'],
    link: 'https://www.instagram.com/crazy_capture_studio/', pdf: '/babyshowerbrochure.pdf',
  },
  {
    icon: Megaphone, title: 'Corporate Ads',
    description: 'Showcase your brand with powerful visuals that make a lasting impression.',
    image: 'https://res.cloudinary.com/dxm3glvjq/image/upload/v1754574978/Modeling_shoot_EVERYONEHASTALENT..._Teamwork_makes_the_Dreamwork_Inframe_-_methagu_lead_c_omidzp.jpg',
    features: ['Product Styling', 'Model Shoot', 'Studio Lights', 'Creative Team'],
    link: 'https://www.instagram.com/crazy_capture_studio/', pdf: '/corporate.pdf',
  },
  {
    icon: UserCheck, title: 'Puberty Shoot',
    description: 'Document the beautiful coming-of-age celebration with grace and tradition.',
    image: 'https://wevaphotography.com/wp-content/uploads/2022/04/Hindu-Puberty-Ceremony.jpg',
    features: ['Traditional Portraits', 'Family', 'Culture', 'Candid Emotions'],
    link: 'https://www.instagram.com/crazy_capture_studio/', pdf: null,
  },
  {
    icon: Camera, title: 'Birthday Shoot',
    description: 'Fun, vibrant and memorable birthday moments frozen in time beautifully.',
    image: 'https://res.cloudinary.com/dxm3glvjq/image/upload/v1754574464/317273066_854165815854107_4457544914850071124_n_j5nwf1.jpg',
    features: ['Cake Shot', 'Candids', 'Decor', 'Family Frames'],
    link: 'https://www.instagram.com/crazy_capture_studio/', pdf: '/brithday shoot.pdf',
  },
];

export default function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="services" className="section bg-transparent">
      <div className="container">

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="section-header"
        >
          <p className="eyebrow">Our Expertise</p>
          <div className="divider-gold" />
          <h2 className="display-md text-white mt-4">
            Our Professional <span className="text-[#E8B84B]">Services</span>
          </h2>
          <p className="body-lg text-white/50 mt-4 max-w-2xl">
            Explore our range of specialized photography services crafted to suit
            every story, emotion, and vision.
          </p>
        </motion.div>

        {/* Swiper */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            autoplay={{ delay: 3800, disableOnInteraction: false }}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={20}
            breakpoints={{
              0: { slidesPerView: 1, spaceBetween: 14 },
              480: { slidesPerView: 1.1, spaceBetween: 16 },
              640: { slidesPerView: 1.3, spaceBetween: 18 },
              768: { slidesPerView: 1.6, spaceBetween: 20 },
              1024: { slidesPerView: 2.1, spaceBetween: 22 },
              1280: { slidesPerView: 2.5, spaceBetween: 24 },
              1536: { slidesPerView: 2.9, spaceBetween: 24 },
            }}
            className="services-swiper pb-16"
          >
            {SERVICES.map((svc, i) => (
              <SwiperSlide key={i} className="h-auto">
                <div className="group glass glass-hover card h-full flex flex-col overflow-hidden"
                  style={{ borderRadius: 'var(--radius-lg)' }}>

                  {/* Image */}
                  <div className="relative h-52 sm:h-60 md:h-64 overflow-hidden"
                    style={{ borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0' }}>
                    <img
                      src={svc.image}
                      alt={svc.title}
                      className="w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
                    {/* Icon badge */}
                    <div className="absolute bottom-4 left-4 w-11 h-11 rounded-xl bg-[#E8B84B] text-black
                                    flex items-center justify-center shadow-lg">
                      <svc.icon size={18} />
                    </div>
                  </div>

                  {/* Body */}
                  <div className="flex flex-col flex-1 p-5 sm:p-6 md:p-7 gap-4">
                    <h3 className="heading-md text-white">{svc.title}</h3>
                    <p className="body-md text-white/55 flex-1">{svc.description}</p>

                    {/* Features */}
                    <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                      {svc.features.map((f, j) => (
                        <li key={j} className="flex items-center gap-2 text-[11px] sm:text-xs text-white/40 font-light uppercase tracking-wide">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#E8B84B] shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>

                    {/* Actions */}
                    <div className="grid grid-cols-2 gap-3 pt-1">
                      {svc.pdf ? (
                        <a href={svc.pdf} target="_blank" rel="noopener noreferrer"
                          className="btn btn-secondary btn-sm gap-2 text-xs sm:text-sm">
                          <Download size={13} />
                          Catalog
                        </a>
                      ) : <div />}
                      <a href={svc.link} target="_blank" rel="noopener noreferrer"
                        className="btn btn-primary btn-sm text-xs sm:text-sm">
                        Explore
                      </a>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
}