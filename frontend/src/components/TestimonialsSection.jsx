import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Quote, Star, ArrowRight } from "lucide-react";

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [isMobile, setIsMobile] = useState(false);
  const [testimonials, setTestimonials] = useState([]);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch(`${VITE_BACKEND_URL}/api/feedback`);
        const data = await response.json();
        const reviews = data.reviews || [];
        setTestimonials(reviews);

        const total = reviews.reduce(
          (sum, review) => sum + parseFloat(review.rating || 0),
          0
        );
        setAverageRating((total / reviews.length).toFixed(1));
      } catch (error) {
        console.error("Failed to fetch testimonials:", error);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <section id="reviews" className="bg-transparent text-white py-20 px-4 md:px-10">
      <div className="max-w-6xl mx-auto text-center text-[#FFCB05]" ref={ref}>
        <motion.h2
          className="text-2xl md:text-4xl font-bold mb-2"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Crazy Capture Studio, <span className="text-[#CCCCCC]">Tirupur</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex justify-center items-center mb-4 text-yellow-400 text-xl font-semibold gap-2"
        >
          {averageRating}/5
          <Star className="w-5 h-5 fill-current" />
        </motion.div>

        <motion.p
          className="text-[#CCCCCC] max-w-2xl mx-auto mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Here's what our happy customers have to say about our services.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-10"
        >
          <a
            href="https://www.google.com/search?q=Crazy+Capture+Studio+Tirupur"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#FFCB05] hover:underline transition"
          >
            View More Reviews on Google
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>

        {/* Navigation Arrows */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={isMobile ? 1 : 2}
            loop={true}
            autoplay={{ delay: 4000 }}
            pagination={{ clickable: true }}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            className="pb-12"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-xl p-8 h-full flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-4">
                    <Quote className="w-6 h-6 text-[#FFCB05]" />
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
                      alt="Google"
                      className="h-6"
                    />
                  </div>

                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < parseInt(testimonial.rating)
                            ? "text-[#FFCB05]"
                            : "text-white/20"
                        } fill-current`}
                      />
                    ))}
                  </div>

                  <p className="text-[#CCCCCC] mb-4 text-base leading-relaxed">
                    "{testimonial.comment}"
                  </p>

                  {testimonial.date && (
                    <p className="text-sm text-white/40 mb-4 text-right">
                      {new Date(testimonial.date).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  )}

                  <div className="flex items-center mt-auto pt-4 border-t border-white/10">
                    <div className="w-12 h-12 rounded-full bg-[#FFCB05] text-black font-bold flex items-center justify-center mr-4">
                      {testimonial.image || testimonial.description?.charAt(0)}
                    </div>
                    <h4 className="font-semibold text-white text-sm">
                      {testimonial.description}
                    </h4>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <div className="swiper-button-prev text-white !left-0" />
          <div className="swiper-button-next text-white !right-0" />
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
