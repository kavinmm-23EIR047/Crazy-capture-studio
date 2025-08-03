import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Heart, Palette, Camera, Calendar } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const services = [
    {
      icon: Heart,
      title: 'Cinematic Wedding Films',
      description: 'We craft visually stunning wedding stories that are heartfelt and timeless.',
      image: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: ['Cinematic Edits', 'Drone Footage', 'Candid Moments', 'Full-Day Coverage'],
      price: 'From ₹50,000',
    },
    {
      icon: Palette,
      title: 'Creative Fashion Shoots',
      description: 'Bold editorial photography that captures your unique style and elegance.',
      image: 'https://images.pexels.com/photos/157675/fashion-men-s-individuality-black-and-white-157675.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: ['Lookbook Shoots', 'Themed Concepts', 'Retouching', 'Studio & Outdoor'],
      price: 'From ₹15,000',
    },
    {
      icon: Camera,
      title: 'Modern Studio Portraits',
      description: 'Polished portraits perfect for professionals, artists, and families.',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: ['Personal Branding', 'Family Sessions', 'Product Showcase', 'Headshots'],
      price: 'From ₹5,000',
    },
    {
      icon: Calendar,
      title: 'Corporate & Event Coverage',
      description: 'Capture every key moment at your conference, party, or launch.',
      image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: ['Full Event Coverage', 'Real-Time Edits', 'Candid Highlights', 'Press Kits'],
      price: 'From ₹10,000',
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
                  <div className="p-6">
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

                    {/* Pricing and CTA */}
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-[#FFCB05]">{service.price}</span>
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
