import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Heart, Music, Baby, Gift, Megaphone } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const services = [
    {
      icon: Heart,
      title: 'Wedding Photography',
      description: 'Relive your big day through timeless, cinematic captures.',
      image: 'https://res.cloudinary.com/dxm3glvjq/image/upload/v1754497314/VIDE5698_xpws5g.jpg',
      features: ['Candid Moments', 'Couple Portraits', 'Drone Shots', 'Cinematic Editing'],
    },
    {
      icon: Music,
      title: 'Concert Coverage',
      description: 'High-energy concert moments captured with dynamic precision.',
      image: 'https://res.cloudinary.com/dxm3glvjq/image/upload/v1754574980/Recent_shoot_with_pradeep_kumar1123_trending_livemusic_loveislove_songs_idk6ur.jpg',
      features: ['Live Action Shots', 'Artist Closeups', 'Audience Reactions', 'Stage Lighting Focus'],
    },
    {
      icon: Baby,
      title: 'Baby Shoot',
      description: 'Capture those adorable giggles and first milestones forever.',
      image: 'https://res.cloudinary.com/dxm3glvjq/image/upload/v1754574464/317273066_854165815854107_4457544914850071124_n_j5nwf1.jpg',
      features: ['Newborn Themes', 'Natural Light', 'Candid Emotions', 'Safe Props', 'Birthday shoots'],
    },
    {
      icon: Gift,
      title: 'Baby Shower Photography',
      description: 'Celebrate new beginnings with warm and joyful frames.',
      image: 'https://res.cloudinary.com/dxm3glvjq/image/upload/v1754575850/get_2_q82lgm.jpg',
      features: ['Decor Details', 'Family Portraits', 'Games & Candid', 'Gift Reveal Shots'],
    },
    {
      icon: Megaphone,
      title: 'Advertisement Shoots',
      description: 'Showcase your brand with powerful visuals and creative vision.',
      image: 'https://res.cloudinary.com/dxm3glvjq/image/upload/v1754574978/Modeling_shoot_EVERYONEHASTALENT..._Teamwork_makes_the_Dreamwork_Inframe_-_methagu_lead_c_omidzp.jpg',
      features: ['Product Styling', 'Model Integration', 'Studio Lighting', 'Creative Direction'],
    },
  ];

  return (
    <section id="services" className="py-24 bg-transparent text-white relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Our <span className="text-[#FFCB05]">Services</span>
          </h2>
          <p className="text-xl text-[#B0B0B0] max-w-3xl mx-auto">
            Explore our range of specialized photography services crafted to suit every need and vision.
          </p>
        </motion.div>

        {/* Swiper Carousel */}
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
            className="services-swiper pb-12"
          >
            {services.map((service, index) => (
              <SwiperSlide key={index}>
                <div className="group bg-white/5 border border-white/10 backdrop-blur-md rounded-xl overflow-hidden hover:shadow-2xl transition duration-300 h-full">
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-4 right-4">
                      <service.icon className="w-8 h-8 text-[#FFCB05]" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col justify-between min-h-[340px]">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">{service.title}</h3>
                      <p className="text-[#CCCCCC] text-sm mb-4">{service.description}</p>

                      {/* Features */}
                      <ul className="space-y-2 mb-6">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center text-[#B0B0B0] text-sm">
                            <div className="w-2 h-2 bg-[#FFCB05] rounded-full mr-3"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA */}
                    <div className="flex justify-end">
                      <button className="bg-[#FFCB05] text-black px-5 py-2 rounded-full font-medium hover:bg-[#e6b800] transition">
                        Explore
                      </button>
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