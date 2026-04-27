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
    }
  ];

  return (
    <section
      id="services"
      className="relative py-20 md:py-24 overflow-hidden text-white bg-[#020617]"
    >
      <div className="max-w-[1700px] mx-auto px-0 sm:px-6 lg:px-10 relative z-10">

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 35 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-12 px-5 sm:px-0"
        >
          <p className="text-[11px] md:text-xs font-bold uppercase tracking-[0.25em] text-[#E8B84B] mb-3">
            OUR EXPERTISE
          </p>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[0.95] mb-5">
            Our Professional Services
          </h2>

          <div className="w-14 h-[3px] bg-[#E8B84B] rounded-full mb-7" />

          <p className="text-base sm:text-lg text-white/60 max-w-2xl leading-relaxed">
            Explore our range of specialized photography services crafted to suit every story.
          </p>
        </motion.div>

        {/* Slider */}
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={18}
          slidesPerView={1}
          centeredSlides={true}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false
          }}
          navigation
          pagination={{
            clickable: true
          }}
          breakpoints={{
            0: {
              slidesPerView: 1.15,
              spaceBetween: 16
            },
            640: {
              slidesPerView: 1.2,
              spaceBetween: 18
            },
            768: {
              slidesPerView: 1.45,
              spaceBetween: 22
            },
            1024: {
              slidesPerView: 2,
              spaceBetween: 24
            },
            1280: {
              slidesPerView: 2.35,
              spaceBetween: 28
            }
          }}
          className="services-swiper pb-14"
        >
          {services.map((service, index) => (
            <SwiperSlide key={index}>
              <div className="w-full overflow-hidden rounded-[28px] border border-[#1e293b] bg-[#020617] shadow-[0_20px_50px_rgba(0,0,0,.45)]">

                {/* Image */}
                <div className="relative h-52 sm:h-64 md:h-72 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent" />

                  <div className="absolute bottom-4 left-4 w-12 h-12 rounded-2xl bg-[#E8B84B] text-black flex items-center justify-center">
                    <service.icon className="w-5 h-5" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-7">

                  <h3 className="text-3xl font-black leading-tight mb-3">
                    {service.title}
                  </h3>

                  <p className="text-white/60 text-[15px] leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-center text-[11px] uppercase font-bold tracking-wide text-white/45"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E8B84B] mr-3"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="grid grid-cols-2 gap-3">
                    <a
                      href={service.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-12 rounded-xl border border-[#1e293b] bg-[#0f172a] hover:bg-[#111827] text-sm font-bold flex items-center justify-center gap-2 transition"
                    >
                      <Download className="w-4 h-4 text-[#E8B84B]" />
                      Catalog
                    </a>

                    <a
                      href={service.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-12 rounded-xl bg-[#E8B84B] hover:bg-[#d4a742] text-black text-sm font-bold flex items-center justify-center transition"
                    >
                      Explore
                    </a>
                  </div>

                </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
};

export default ServicesSection;