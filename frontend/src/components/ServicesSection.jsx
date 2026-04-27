import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import {
  Heart,
  Camera,
  Baby,
  Gift,
  Megaphone,
  Download,
  UserCheck
} from 'lucide-react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const services = [
    {
      icon: Baby,
      title: 'Baby Shoot',
      description: 'Capture those adorable giggles and first milestones forever.',
      image:
        'https://res.cloudinary.com/dxm3glvjq/image/upload/v1754574465/HELLO_ALL_HOPE_YOU_ALL_ARE_GOOD_AND_SAFE_%EF%B8%8F_Yes_we_are_back_With_all_your_blessings_here_is_ou_dpvfwz.jpg',
      features: ['Newborn Themes', 'Natural Light', 'Candid Emotions', 'Safe Props'],
      link: 'https://www.instagram.com/crazy_capture_studio/',
      pdf: '/babyshoot.pdf'
    },
    {
      icon: Heart,
      title: 'Wedding Photography',
      description: 'Relive your big day through timeless cinematic captures.',
      image:
        'https://res.cloudinary.com/dxm3glvjq/image/upload/v1754497314/VIDE5698_xpws5g.jpg',
      features: ['Candid Moments', 'Couple Portraits', 'Drone Shots', 'Cinematic Editing'],
      link: 'https://www.instagram.com/crazy_capture_studio/',
      pdf: '/wedding_brochure (1).pdf'
    },
    {
      icon: Gift,
      title: 'Baby Shower',
      description: 'Celebrate new beginnings with warm and joyful frames.',
      image:
        'https://res.cloudinary.com/dxm3glvjq/image/upload/v1754575850/get_2_q82lgm.jpg',
      features: ['Decor Details', 'Family Portraits', 'Games & Candid', 'Gift Reveal'],
      link: 'https://www.instagram.com/crazy_capture_studio/',
      pdf: '/babyshowerbrochure.pdf'
    },
    {
      icon: Megaphone,
      title: 'Corporate Ads',
      description: 'Showcase your brand with powerful visuals.',
      image:
        'https://res.cloudinary.com/dxm3glvjq/image/upload/v1754574978/Modeling_shoot_EVERYONEHASTALENT..._Teamwork_makes_the_Dreamwork_Inframe_-_methagu_lead_c_omidzp.jpg',
      features: ['Product Styling', 'Model Shoot', 'Studio Lights', 'Creative Team'],
      link: 'https://www.instagram.com/crazy_capture_studio/',
      pdf: '/corporate.pdf'
    },
    {
      icon: UserCheck,
      title: 'Puberty Shoot',
      description: 'Document the beautiful coming-of-age celebration.',
      image:
        'https://res.cloudinary.com/dxm3glvjq/image/upload/v1754574963/aranthainisha_special_thanks_to_d_squad_studio_unique_surprise_plannerss_likes_like_follow_a8ocpp.jpg',
      features: ['Traditional Portraits', 'Family', 'Culture', 'Candid Emotions'],
      link: 'https://www.instagram.com/crazy_capture_studio/',
      pdf: null
    },
    {
      icon: Camera,
      title: 'Birthday Shoot',
      description: 'Fun, vibrant and memorable birthday moments.',
      image:
        'https://res.cloudinary.com/dxm3glvjq/image/upload/v1754574464/317273066_854165815854107_4457544914850071124_n_j5nwf1.jpg',
      features: ['Cake Shot', 'Candids', 'Decor', 'Family Frames'],
      link: 'https://www.instagram.com/crazy_capture_studio/',
      pdf: '/brithday shoot.pdf'
    }
  ];

  return (
    <section
      id="services"
      className="relative py-20 md:py-24 overflow-hidden text-white bg-transparent"
    >
      <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 35 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <p className="text-[11px] md:text-xs font-bold uppercase tracking-[0.25em] text-[#E8B84B] mb-3">
            OUR EXPERTISE
          </p>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[0.95] mb-5">
            Our Professional Services
          </h2>

          <div className="w-14 h-[3px] bg-[#E8B84B] rounded-full mb-7" />

          <p className="text-base sm:text-lg text-white/60 max-w-2xl leading-relaxed">
            Explore our range of specialized photography services crafted to suit
            every story, emotion, and vision.
          </p>
        </motion.div>

        {/* Slider */}
        <motion.div
          initial={{ opacity: 0, y: 45 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={20}
            slidesPerView={1}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false
            }}
            navigation
            pagination={{
              clickable: true,
              bulletClass: 'swiper-pagination-bullet',
              bulletActiveClass: 'swiper-pagination-bullet-active'
            }}
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 14
              },
              480: {
                slidesPerView: 1.05,
                spaceBetween: 16
              },
              640: {
                slidesPerView: 1.22,
                spaceBetween: 18
              },
              768: {
                slidesPerView: 1.45,
                spaceBetween: 20
              },
              1024: {
                slidesPerView: 1.9,
                spaceBetween: 24
              },
              1280: {
                slidesPerView: 2.25,
                spaceBetween: 26
              },
              1536: {
                slidesPerView: 2.55,
                spaceBetween: 28
              }
            }}
            className="services-swiper pb-14"
          >
            {services.map((service, index) => (
              <SwiperSlide key={index} className="h-auto flex">
                <div className="group w-full flex flex-col overflow-hidden rounded-[28px] border border-white/8 min-h-[520px] md:min-h-[540px] lg:min-h-[560px] bg-transparent backdrop-blur-0 shadow-none">

                  {/* Image */}
                  <div className="relative h-60 md:h-64 lg:h-72 overflow-hidden rounded-t-[28px]">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />

                    <div className="absolute bottom-4 left-4 w-12 h-12 rounded-2xl bg-[#E8B84B] text-black flex items-center justify-center shadow-xl">
                      <service.icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-7 md:p-8 flex flex-col flex-1 bg-transparent">

                    <h3 className="text-3xl font-black leading-tight mb-3">
                      {service.title}
                    </h3>

                    <p className="text-white/60 text-[15px] leading-relaxed mb-6">
                      {service.description}
                    </p>

                    <ul className="space-y-3 mb-8 flex-1">
                      {service.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-center text-[11px] tracking-wide uppercase font-bold text-white/45"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#E8B84B] mr-3 shrink-0"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* Buttons */}
                    <div className="grid grid-cols-2 gap-3 mt-auto">
                      {service.pdf ? (
                        <a
                          href={service.pdf}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="h-12 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-sm font-bold flex items-center justify-center gap-2 transition"
                        >
                          <Download className="w-4 h-4 text-[#E8B84B]" />
                          Catalog
                        </a>
                      ) : (
                        <div />
                      )}

                      <a
                        href={service.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="h-12 rounded-xl bg-[#E8B84B] hover:bg-[#D4A742] text-black text-sm font-bold flex items-center justify-center transition"
                      >
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
};

export default ServicesSection;