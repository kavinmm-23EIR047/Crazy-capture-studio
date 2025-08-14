import { useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ArrowLeft, X } from "lucide-react";
import { Link } from "react-router-dom";

// ------------------- Featured Images -------------------
const featuredImages = [
  "https://res.cloudinary.com/dxm3glvjq/image/upload/v1754575418/get_ty5cuf.jpg",
  "https://res.cloudinary.com/dxm3glvjq/image/upload/v1754574461/dm_for_more_enquire.......8124787002_1_gwlgmr.jpg",
  "https://res.cloudinary.com/dxm3glvjq/image/upload/v1754574980/Recent_shoot_with_pradeep_kumar1123_trending_livemusic_loveislove_songs_idk6ur.jpg",
  "https://res.cloudinary.com/dxm3glvjq/image/upload/v1754575850/441211858_1516889262195295_5631550106516590248_n_ztz91b.jpg",
  "https://res.cloudinary.com/demo/image/upload/v1/gallery/featured5.jpg",
];

// ------------------- Gallery Images -------------------
const weddingImages = [
  { src: "https://res.cloudinary.com/dxm3glvjq/image/upload/v1754497314/VIDE5698_xpws5g.jpg", category: "Wedding" },
  { src: "https://res.cloudinary.com/dxm3glvjq/image/upload/v1754497253/VIDE6810_bou4c1.jpg", category: "Wedding" },
  { src: "https://res.cloudinary.com/dxm3glvjq/image/upload/v1754497289/VIDE9208_wakqic.jpg", category: "Wedding" },
  { src: "https://res.cloudinary.com/dxm3glvjq/image/upload/v1754497090/DSC00810_yk3mts.jpg", category: "Wedding" },
  { src: "https://res.cloudinary.com/dxm3glvjq/image/upload/v1754497283/VIDE8942_kthszx.jpg", category: "Wedding" },
  { src: "https://res.cloudinary.com/dxm3glvjq/image/upload/v1754497082/DSC02822_kzph6q.jpg", category: "Wedding" },
  { src: "https://res.cloudinary.com/dxm3glvjq/image/upload/v1754497079/DONE6877_wbi80g.jpg", category: "Wedding" },
  { src: "https://res.cloudinary.com/dxm3glvjq/image/upload/v1754496991/CRZY4744_rrhqsh.jpg", category: "Wedding" },
  { src: "https://res.cloudinary.com/dxm3glvjq/image/upload/v1754496988/CRZY9081_f4n5sb.jpg", category: "Wedding" },
  { src: "https://res.cloudinary.com/dxm3glvjq/image/upload/v1754496984/CRZY5834_uczsgg.jpg", category: "Wedding" },
  { src: "https://res.cloudinary.com/dxm3glvjq/image/upload/v1754496977/CRZY0319_ufbjae.jpg", category: "Wedding" },
  { src: "https://res.cloudinary.com/dxm3glvjq/image/upload/v1754496957/Carousal5_nevc6u.jpg", category: "Wedding" },
  { src: "https://res.cloudinary.com/dxm3glvjq/image/upload/v1754496913/1C8A8580_ladwlo.jpg", category: "Wedding" },
  { src: "https://res.cloudinary.com/dxm3glvjq/image/upload/v1754496929/Carousal1_zatgdd.jpg", category: "Wedding" },
  { src: "https://res.cloudinary.com/dxm3glvjq/image/upload/v1754496911/02_kn968l.jpg", category: "Wedding" },
  { src: "https://res.cloudinary.com/dxm3glvjq/image/upload/v1754575418/get_ty5cuf.jpg", category: "Wedding" },
  { src: "https://res.cloudinary.com/dxm3glvjq/image/upload/v1754576215/get_3_dquye5.jpg", category: "Wedding" },
];

const birthdayImages = [
  { src: "https://res.cloudinary.com/dxm3glvjq/image/upload/v1754574463/dm_for_more_enquire.......8124787002_t4rvoa.jpg", category: "Birthday" },
  { src: "https://res.cloudinary.com/dxm3glvjq/image/upload/v1754574464/317273066_854165815854107_4457544914850071124_n_j5nwf1.jpg", category: "Birthday" },
  { src: "https://res.cloudinary.com/dxm3glvjq/image/upload/v1754574464/HELLO_ALL_HOPE_YOU_ALL_ARE_GOOD_AND_SAFE_%EF%B8%8F_Yes_we_are_back_With_all_your_blessings_here_is_ou_1_zxaczf.jpg", category: "Birthday" },
  { src: "https://res.cloudinary.com/dxm3glvjq/image/upload/v1754574461/dm_for_more_enquire.......8124787002_1_gwlgmr.jpg", category: "Birthday" },
  { src: "https://res.cloudinary.com/dxm3glvjq/image/upload/v1754574464/317146553_3370299676574390_6411223539222079084_n_qaagqe.jpg", category: "Birthday" },
  { src: "https://res.cloudinary.com/dxm3glvjq/image/upload/v1754574465/HELLO_ALL_HOPE_YOU_ALL_ARE_GOOD_AND_SAFE_%EF%B8%8F_Yes_we_are_back_With_all_your_blessings_here_is_ou_dpvfwz.jpg", category: "Birthday" },
];

const babyshowerImages = [
  { src: "https://res.cloudinary.com/dxm3glvjq/image/upload/v1754575850/441499064_405687615669094_7523321045747557921_n_t74lsd.jpg", category: "BabyShower" },
  { src: "https://res.cloudinary.com/dxm3glvjq/image/upload/v1754575850/get_2_q82lgm.jpg", category: "BabyShower" },
  { src: "https://res.cloudinary.com/dxm3glvjq/image/upload/v1754575850/441211858_1516889262195295_5631550106516590248_n_ztz91b.jpg", category: "BabyShower" },
  { src: "https://res.cloudinary.com/dxm3glvjq/image/upload/v1754575847/get_1_xn6txa.jpg", category: "BabyShower" },
  { src: "https://res.cloudinary.com/dxm3glvjq/image/upload/v1754575847/Someone_special_someone_dear_someone_new_to_love_is_here_PPL_Who_Collaborated_with_us_%EF%B8%8F_bu76ns.jpg", category: "BabyShower" },
];

const corporateImages = [{ src: "https://res.cloudinary.com/demo/image/upload/corporate1.jpg", category: "Corporate" }];
const festivalImages = [{ src: "https://res.cloudinary.com/demo/image/upload/festival1.jpg", category: "Festival" }];
const concertImages = [
  { src: "https://res.cloudinary.com/dxm3glvjq/image/upload/v1754574980/Recent_shoot_with_pradeep_kumar1123_trending_livemusic_loveislove_songs_idk6ur.jpg", category: "Concert" },
  { src: "https://res.cloudinary.com/dxm3glvjq/image/upload/v1754574979/It_is_more_important_to_click_with_people_than_to_click_the_shutter_Thanks_for_Capturing_the_m_-_Copy_ffa4xi.webp", category: "Concert" },
  { src: "https://res.cloudinary.com/dxm3glvjq/image/upload/v1754574978/Modeling_shoot_EVERYONEHASTALENT..._Teamwork_makes_the_Dreamwork_Inframe_-_methagu_lead_c_omidzp.jpg", category: "Concert" },
  { src: "https://res.cloudinary.com/dxm3glvjq/image/upload/v1754574978/Recent_shoot_with_pradeep_kumar1123_trending_livemusic_loveislove_songs_1_fgsjlm.jpg", category: "Concert" },
  { src: "https://res.cloudinary.com/dxm3glvjq/image/upload/v1754574969/sanjeevalayamanasa_Stunning_Moments_Captured_Featuring_the_radiant_sanjeevalayamanasa_vsht6w.jpg", category: "Concert" },
];

// Merge all images
const allImages = [...weddingImages, ...birthdayImages, ...babyshowerImages, ...corporateImages, ...festivalImages, ...concertImages];

// Categories
const categories = ["All", "Wedding", "Birthday", "BabyShower", "Corporate", "Festival", "Concert"];

// ------------------- GalleryPage Component -------------------
const GalleryPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [expandedIndex, setExpandedIndex] = useState(null);

  const filteredImages = activeCategory === "All" ? allImages : allImages.filter(img => img.category === activeCategory);

  const handleToggleExpand = (index) => setExpandedIndex(index === expandedIndex ? null : index);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen text-white pt-24 px-4 md:px-8"
      style={{ backgroundColor: "#031128", backdropFilter: "blur(8px)" }}
    >
      {/* Back Button */}
      <div className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center text-yellow-500 px-5 py-2 rounded-full hover:bg-yellow-500 hover:text-black transition text-base font-medium shadow-md border border-yellow-500"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Home
        </Link>
      </div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-bold text-center mb-12"
      >
        Gallery
      </motion.h1>

      {/* Swiper Featured Slider */}
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-12">
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          autoplay={{ delay: 3000 }}
          navigation
          pagination={{ el: ".custom-swiper-pagination", clickable: true }}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{ 640: { slidesPerView: 1 }, 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
        >
          {featuredImages.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="relative h-72 rounded-lg overflow-hidden group">
                <img src={image} alt={`Featured ${index + 1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4">
                  <span className="bg-[#FFCB05] text-black px-3 py-1 rounded-full text-sm font-semibold">Featured</span>
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
            onClick={() => { setActiveCategory(cat); setExpandedIndex(null); }}
            className={`px-4 py-2 rounded-full border transition-colors duration-300 text-sm ${activeCategory === cat ? "bg-[#FFCB05] text-black font-bold" : "border-[#FFCB05] text-white hover:bg-[#FFCB05] hover:text-black"}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid Gallery */}
      <motion.div className="grid grid-cols-2 md:grid-cols-3 gap-4 pb-20" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        {filteredImages.map((img, index) => {
          const isExpanded = expandedIndex === index;
          return (
            <div
              key={index}
              className={`relative group bg-[#020e22] border border-[#FFCB05]/10 rounded-xl overflow-hidden shadow-md transition-all duration-300 cursor-pointer ${isExpanded ? "col-span-2 md:col-span-3" : ""}`}
              onClick={() => handleToggleExpand(index)}
            >
              <img src={img.src} alt={img.category} className={`w-full transition-all duration-300 ${isExpanded ? "max-h-[80vh] object-contain" : "aspect-square object-cover"}`} />
              <div className="absolute top-2 right-2 bg-yellow-400 text-black text-xs font-semibold px-3 py-1 rounded-full shadow-md">{img.category}</div>

              {/* Close Icon */}
              {isExpanded && (
                <button
                  onClick={(e) => { e.stopPropagation(); setExpandedIndex(null); }}
                  className="absolute top-3 left-3 bg-[#031128dd] hover:bg-yellow-500 text-yellow-400 hover:text-black border border-yellow-400 hover:border-yellow-500 p-1.5 rounded-full transition-all duration-200"
                >
                  <X size={22} />
                </button>
              )}
            </div>
          );
        })}
      </motion.div>

      {/* Swiper Pagination Styling */}
      <style>{`
        .swiper-pagination-bullet { background-color: #4B5563; opacity: 1; }
        .swiper-pagination-bullet-active { background-color: #FFCB05; }
      `}</style>
    </motion.div>
  );
};

export default GalleryPage;
