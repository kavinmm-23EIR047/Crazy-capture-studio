import { useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const featuredImages = [
  "https://images.pexels.com/photos/3171837/pexels-photo-3171837.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/1024965/pexels-photo-1024965.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/2906602/pexels-photo-2906602.jpeg?auto=compress&cs=tinysrgb&w=800",
];

const allImages = [
  {
    src: "https://images.pexels.com/photos/6130052/pexels-photo-6130052.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Wedding",
  },
  {
    src: "https://images.pexels.com/photos/2072169/pexels-photo-2072169.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Birthday",
  },
  {
    src: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Corporate",
  },
  {
    src: "https://images.pexels.com/photos/1206101/pexels-photo-1206101.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Festival",
  },
  {
    src: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Concert",
  },
];

const categories = ["All", "Wedding", "Birthday", "Corporate", "Festival", "Concert"];

const GalleryPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredImages =
    activeCategory === "All"
      ? allImages
      : allImages.filter((img) => img.category === activeCategory);

  return (
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  className="min-h-screen text-white pt-24 px-4 md:px-8"
  style={{
    backgroundColor: "rgba(3,17,40,0.6)",
    backdropFilter: "blur(8px)",
  }}
>
  {/* Back to Home Button inside section */}
 <div className="mb-6">
  <Link
    to="/"
    className="inline-flex items-center text-yellow-500 px-5 py-2 rounded-full hover:bg-yellow-500 hover:text-white transition text-base font-medium shadow-md border border-yellow-500"
  >
    <ArrowLeft size={20} className="mr-2 p-0.5 rounded-lg shadow" />
    Back to Home
  </Link>
</div>


  {/* Page Title */}
  <motion.h1
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="text-3xl md:text-4xl font-bold text-center mb-12"
  >
    Gallery
  </motion.h1>




      {/* Featured Slider */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-12"
      >
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          autoplay={{ delay: 3000 }}
          navigation
          pagination={{ el: ".custom-swiper-pagination", clickable: true }}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {featuredImages.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="relative h-72 rounded-lg overflow-hidden group">
                <img
                  src={image}
                  alt={`Featured ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4">
                  <span className="bg-[#FFCB05] text-black px-3 py-1 rounded-full text-sm font-semibold">
                    Featured
                  </span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="custom-swiper-pagination mt-6 flex justify-center gap-2" />
      </motion.div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() =>
              setActiveCategory((prev) => (prev === cat ? "All" : cat))
            }
            className={`px-4 py-2 rounded-full border transition-colors duration-300 text-sm ${
              activeCategory === cat
                ? "bg-[#FFCB05] text-black font-bold"
                : "border-[#FFCB05] text-white hover:bg-[#FFCB05] hover:text-black"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {filteredImages.map((img, index) => (
          <div
            key={index}
            className="relative group rounded-xl overflow-hidden shadow-lg"
          >
            <img
              src={img.src}
              alt={img.category}
              className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
            />
           <div className="absolute top-2 right-2 bg-yellow-400 text-black text-xs font-semibold px-3 py-1 rounded-full shadow-md">
  {img.category}
</div>

          </div>
        ))}
      </motion.div>

      {/* Swiper Custom Styling */}
      <style>
        {`
          .swiper-pagination-bullet {
            background-color: #4B5563;
            opacity: 1;
          }
          .swiper-pagination-bullet-active {
            background-color: #FFCB05;
          }
        `}
      </style>
    </motion.div>
  );
};

export default GalleryPage;
