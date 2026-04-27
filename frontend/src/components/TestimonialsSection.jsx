import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Quote, Star, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [testimonials, setTestimonials] = useState([]);
  const [avgRating, setAvgRating]       = useState(0);
  const [prevEl, setPrevEl] = useState(null);
  const [nextEl, setNextEl] = useState(null);

  useEffect(() => {
    fetch(`${VITE_BACKEND_URL}/api/feedback`)
      .then(r => r.json())
      .then(data => {
        const reviews = data.reviews || [];
        setTestimonials(reviews);
        if (reviews.length) {
          const total = reviews.reduce((s, r) => s + parseFloat(r.rating || 0), 0);
          setAvgRating((total / reviews.length).toFixed(1));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section id="reviews" className="section bg-transparent" ref={ref}>
      <div className="container">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="section-header"
        >
          <p className="eyebrow">Client Love</p>
          <div className="divider-gold" />
          <h2 className="display-md text-white mt-4">
            Voices of <span className="text-[#E8B84B]">Trust</span>
          </h2>

          {/* Rating row */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-5">
            <div className="flex text-[#E8B84B] gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className="fill-current" />
              ))}
            </div>
            <span className="text-white font-bold text-lg">{avgRating}<span className="text-white/40 font-light text-sm">/5</span></span>
            <span className="text-white/35 text-sm">·</span>
            <a
              href="https://g.page/r/CfwRSN0vyqTgEAI/review"
              target="_blank" rel="noopener noreferrer"
              className="text-[#E8B84B] text-sm font-medium hover:underline inline-flex items-center gap-1.5"
            >
              View on Google <ArrowRight size={13} />
            </a>
          </div>

          <p className="body-lg text-white/50 mt-4 max-w-xl">
            Here's what our happy customers have to say about our professional photography services.
          </p>
        </motion.div>

        {/* Carousel */}
        {testimonials.length > 0 && (
          <div className="relative group">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={20}
              breakpoints={{
                0:    { slidesPerView: 1 },
                640:  { slidesPerView: 1.2 },
                768:  { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              loop autoplay={{ delay: 4200, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              navigation={{ prevEl, nextEl }}
              className="pb-16"
            >
              {testimonials.map((t, i) => (
                <SwiperSlide key={i} className="h-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.55, delay: i * 0.1 }}
                    className="glass glass-hover card h-full flex flex-col gap-5 p-5 sm:p-6 md:p-7"
                    style={{ borderRadius: 'var(--radius-lg)' }}
                  >
                    {/* Top row */}
                    <div className="flex items-center justify-between">
                      <Quote size={28} className="text-[#E8B84B]" />
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
                        alt="Google"
                        className="h-5 opacity-50"
                        loading="lazy"
                      />
                    </div>

                    {/* Stars */}
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} size={14}
                          className={j < parseInt(t.rating) ? "text-[#E8B84B] fill-current" : "text-white/10 fill-current"}
                        />
                      ))}
                    </div>

                    {/* Comment */}
                    <p className="body-md text-white/55 flex-1 italic">"{t.comment}"</p>

                    {/* Author */}
                    <div className="flex items-center gap-3 pt-4 border-t border-white/8">
                      <div className="w-10 h-10 rounded-full bg-[#E8B84B] text-black font-bold text-sm
                                      flex items-center justify-center shrink-0">
                        {(t.description || "A").charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-white font-semibold text-sm leading-tight">{t.description}</p>
                        {t.date && (
                          <p className="text-white/30 text-[10px] font-light tracking-wide mt-0.5">
                            {new Date(t.date).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Nav */}
            <button ref={n => setPrevEl(n)}
              className="absolute top-[42%] -translate-y-1/2 -left-3 sm:-left-5 z-10
                         w-10 h-10 sm:w-11 sm:h-11 rounded-full glass border border-white/10 text-white
                         hover:bg-[#E8B84B] hover:text-black hover:border-[#E8B84B] transition-all
                         flex items-center justify-center
                         opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft size={18} />
            </button>
            <button ref={n => setNextEl(n)}
              className="absolute top-[42%] -translate-y-1/2 -right-3 sm:-right-5 z-10
                         w-10 h-10 sm:w-11 sm:h-11 rounded-full glass border border-white/10 text-white
                         hover:bg-[#E8B84B] hover:text-black hover:border-[#E8B84B] transition-all
                         flex items-center justify-center
                         opacity-0 group-hover:opacity-100"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
