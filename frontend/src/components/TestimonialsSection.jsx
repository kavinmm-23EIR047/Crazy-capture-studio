import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Star, Quote } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const testimonials = [
    {
      name: 'Ananya Mehta',
      role: 'Bride | Chennai Wedding',
      image: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
      text: 'The photos made us relive our wedding all over again! Every moment was captured so beautifully — full of emotion and joy. Truly cinematic and professional.',
    },
    {
      name: 'Rohit Sharma',
      role: 'Startup Founder',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 4,
      text: 'We hired the team for our brand shoot. The lighting, the direction, and the editing were just top-notch. They understood our vision and executed it perfectly.',
    },
    {
      name: 'Natasha Pillai',
      role: 'Fashion Influencer',
      image: 'https://images.pexels.com/photos/2100063/pexels-photo-2100063.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
      text: 'Every photo from the editorial shoot was a masterpiece. I felt like a true model — confident, elegant, and powerful. Highly recommend their creative team!',
    },
    {
      name: 'Rahul & Priya',
      role: 'Engagement Shoot Clients',
      image: 'https://images.pexels.com/photos/1441122/pexels-photo-1441122.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
      text: 'The pictures were more than just images — they were memories frozen in time. From candid moments to posed elegance, they captured it all.',
    },
    {
      name: 'Sofia Thomas',
      role: 'Event Host',
      image: 'https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 4,
      text: 'They covered our corporate gala night and the pictures turned out phenomenal. The team was punctual, polite, and incredibly talented.',
    },
  ];

  return (
    <section id="testimonials" className="py-24 bg-transparent text-white relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            What Our <span className="text-[#FFCB05]">Clients Say</span>
          </h2>
          <p className="text-xl text-[#B0B0B0] max-w-3xl mx-auto">
            Real feedback from people who trusted us with their most special moments.
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
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
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="testimonials-swiper pb-16"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-xl p-8 h-full flex flex-col justify-between"
                >
                  {/* Quote Icon */}
                  <Quote className="w-8 h-8 text-[#FFCB05] mb-4" />

                  {/* Rating */}
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-[#FFCB05] fill-current" />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-[#CCCCCC] mb-6 text-base leading-relaxed">
                    "{testimonial.text}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center mt-auto pt-4 border-t border-white/10">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h4 className="font-semibold text-white text-sm">{testimonial.name}</h4>
                      <p className="text-[#B0B0B0] text-xs">{testimonial.role}</p>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
