import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Heart, Camera, Baby, Gift, Megaphone, Download, UserCheck } from 'lucide-react';
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
      image: 'https://res.cloudinary.com/dxm3glvjq/image/upload/v1754574465/HELLO_ALL_HOPE_YOU_ALL_ARE_GOOD_AND_SAFE_%EF%B8%8F_Yes_we_are_back_With_all_your_blessings_here_is_ou_dpvfwz.jpg',
      features: ['Newborn Themes', 'Natural Light', 'Candid Emotions', 'Safe Props'],
      link: 'https://www.instagram.com/crazy_capture_studio/',
      pdf: '/babyshoot.pdf',
    },
    {
      icon: Heart,
      title: 'Wedding Photography',
      description: 'Relive your big day through timeless, cinematic captures.',
      image: 'https://res.cloudinary.com/dxm3glvjq/image/upload/v1754497314/VIDE5698_xpws5g.jpg',
      features: ['Candid Moments', 'Couple Portraits', 'Drone Shots', 'Cinematic Editing'],
      link: 'https://www.instagram.com/crazy_capture_studio/',
      pdf: '/wedding_brochure (1).pdf',
    },
    {
      icon: Gift,
      title: 'Baby Shower Photography',
      description: 'Celebrate new beginnings with warm and joyful frames.',
      image: 'https://res.cloudinary.com/dxm3glvjq/image/upload/v1754575850/get_2_q82lgm.jpg',
      features: ['Decor Details', 'Family Portraits', 'Games & Candid', 'Gift Reveal Shots'],
      link: 'https://www.instagram.com/crazy_capture_studio/',
      pdf: '/babyshowerbrochure.pdf',
    },
    {
      icon: Megaphone,
      title: 'Corporate & Advertisement',
      description: 'Showcase your brand with powerful visuals and creative vision.',
      image: 'https://res.cloudinary.com/dxm3glvjq/image/upload/v1754574978/Modeling_shoot_EVERYONEHASTALENT..._Teamwork_makes_the_Dreamwork_Inframe_-_methagu_lead_c_omidzp.jpg',
      features: ['Product Styling', 'Model Integration', 'Studio Lighting', 'Creative Direction'],
      link: 'https://www.instagram.com/crazy_capture_studio/',
      pdf: '/corporate.pdf',
    },
    {
      icon: UserCheck,
      title: 'Puberty Shoot',
      description: 'Document the beautiful transition and coming-of-age moments.',
      image: 'https://res.cloudinary.com/dxm3glvjq/image/upload/v1754574963/aranthainisha_special_thanks_to_d_squad_studio_unique_surprise_plannerss_likes_like_follow_a8ocpp.jpg',
      features: ['Traditional Portraits', 'Family Celebration', 'Cultural Essence', 'Candid Emotions'],
      link: 'https://www.instagram.com/crazy_capture_studio/',
      pdf: null,
    },
    {
      icon: Camera,
      title: 'Birthday Shoot',
      description: 'Celebrate birthdays with fun, vibrant, and memorable moments.',
      image: 'https://res.cloudinary.com/dxm3glvjq/image/upload/v1754574464/317273066_854165815854107_4457544914850071124_n_j5nwf1.jpg',
      features: ['Theme-based Decor', 'Candles & Cake Shots', 'Candid Fun Moments', 'Family Portraits'],
      link: 'https://www.instagram.com/crazy_capture_studio/',
      pdf: '/brithday shoot.pdf',
    },
  ];

  return (
    <section
      id="services"
      className="relative py-24 bg-transparent text-white overflow-hidden"
    >
      <div className="parallax-bg bg-[url('https://res.cloudinary.com/dxm3glvjq/image/upload/v1754574963/aranthainisha_special_thanks_to_d_squad_studio_unique_surprise_plannerss_likes_like_follow_a8ocpp.jpg')] opacity-5" />
      
      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <p className="text-xs font-bold uppercase tracking-widest text-[#E8B84B] mb-3">Our Expertise</p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 font-heading">
            Our <span>Professional</span> Services
          </h2>
          <div className="w-16 h-[3px] bg-[#E8B84B] rounded-full mb-8" />
          
          <p className="text-lg text-white/60 max-w-2xl leading-relaxed font-body">
            Explore our range of specialized photography services crafted to
            suit every story, emotion, and vision.
          </p>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            navigation
            pagination={{
              clickable: true,
              bulletClass: 'swiper-pagination-bullet',
              bulletActiveClass: 'swiper-pagination-bullet-active',
            }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="services-swiper pb-12 !h-auto"
          >
            {services.map((service, index) => (
              <SwiperSlide key={index} className="!h-auto flex">
                <div className="card-premium group overflow-hidden flex flex-col p-0 w-full bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md min-h-[580px]">
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden rounded-t-2xl">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 bg-[#E8B84B] p-3 rounded-2xl text-black shadow-xl">
                      <service.icon className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 flex flex-col flex-1">
                    <h3 className="text-2xl font-black text-white mb-3 tracking-tight font-heading">
                      {service.title}
                    </h3>
                    <p className="text-white/60 text-sm mb-6 leading-relaxed font-body">
                      {service.description}
                    </p>

                    <ul className="space-y-3 mb-8 flex-1">
                      {service.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-center text-white/40 text-[10px] font-bold uppercase tracking-wider font-body"
                        >
                          <div className="w-1.5 h-1.5 bg-[#E8B84B] rounded-full mr-3 shadow-[0_0_8px_rgba(232,184,75,0.6)]"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* Buttons */}
                    <div className="flex items-center gap-4 mt-auto">
                      {service.pdf && (
                        <a
                          href={service.pdf}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white py-3 rounded-xl text-xs font-bold border border-white/10 transition-colors font-body"
                        >
                          <Download className="w-4 h-4 text-[#E8B84B]" />
                          CATALOG
                        </a>
                      )}

                      <a
                        href={service.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-black text-xs bg-[#E8B84B] hover:bg-[#D4A742] shadow-lg transition-all font-body"
                      >
                        EXPLORE
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
