import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Quote, Star, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [isMobile, setIsMobile] = useState(false);
  const [testimonials, setTestimonials] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [prevEl, setPrevEl] = useState(null);
  const [nextEl, setNextEl] = useState(null);

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
    <section id="reviews" className="bg-transparent text-white py-24 px-6">
      <div className="max-w-[1400px] mx-auto" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <p className="text-xs font-bold uppercase tracking-widest text-[#E8B84B] mb-3">Client Love</p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 font-heading">
            Voices of <span>Trust</span>
          </h2>
          <div className="w-16 h-[3px] bg-[#E8B84B] rounded-full mb-8" />
          
          <div className="flex items-center gap-3 mb-4">
             <div className="flex text-[#E8B84B]">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
             </div>
             <span className="text-xl font-bold font-heading">{averageRating}/5</span>
          </div>

          <p className="text-lg text-white/60 max-w-2xl leading-relaxed font-body">
            Here's what our happy customers have to say about our professional photography services.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-10"
        >
          <a
            href="https://g.page/r/CfwRSN0vyqTgEAI/review"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#E8B84B] hover:underline transition font-bold font-body"
          >
            View More Reviews on Google
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>

        {/* Navigation Arrows & Carousel */}
        <div className="relative group px-0 lg:px-4">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            loop={true}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            navigation={{ prevEl, nextEl }}
            className="pb-16"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-8 h-full flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-6">
                    <Quote className="w-8 h-8 text-[#E8B84B]" />
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
                      alt="Google"
                      className="h-6 opacity-60"
                    />
                  </div>

                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < parseInt(testimonial.rating)
                            ? "text-[#E8B84B]"
                            : "text-white/10"
                        } fill-current`}
                      />
                    ))}
                  </div>

                  <p className="text-white/60 mb-6 text-[15px] leading-relaxed font-body">
                    "{testimonial.comment}"
                  </p>

                  <div className="flex items-center mt-auto pt-6 border-t border-white/10">
                    <div className="w-12 h-12 rounded-full bg-[#E8B84B] text-black font-bold flex items-center justify-center mr-4 font-heading text-xl">
                      {testimonial.image || testimonial.description?.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-base font-heading">
                        {testimonial.description}
                      </h4>
                      {testimonial.date && (
                        <p className="text-[10px] text-white/30 uppercase tracking-widest font-bold">
                          {new Date(testimonial.date).toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <button ref={(node) => setPrevEl(node)} className="absolute top-[40%] -translate-y-1/2 -left-4 lg:-left-6 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-black/60 border border-white/10 text-white hover:bg-[#E8B84B] hover:text-black transition-all backdrop-blur-md opacity-0 group-hover:opacity-100 disabled:opacity-0 disabled:cursor-not-allowed">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button ref={(node) => setNextEl(node)} className="absolute top-[40%] -translate-y-1/2 -right-4 lg:-right-6 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-black/60 border border-white/10 text-white hover:bg-[#E8B84B] hover:text-black transition-all backdrop-blur-md opacity-0 group-hover:opacity-100 disabled:opacity-0 disabled:cursor-not-allowed">
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
