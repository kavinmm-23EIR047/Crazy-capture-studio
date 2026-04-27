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
        'data:image/jpeg;base64,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',
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