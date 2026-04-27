import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ArrowLeft, X, ExternalLink, ZoomIn } from "lucide-react";
import { Link } from "react-router-dom";

const FEATURED = [
  "https://res.cloudinary.com/dxm3glvjq/image/upload/v1754575418/get_ty5cuf.jpg",
  "https://res.cloudinary.com/dxm3glvjq/image/upload/v1754574461/dm_for_more_enquire.......8124787002_1_gwlgmr.jpg",
  "https://res.cloudinary.com/dxm3glvjq/image/upload/v1754574980/Recent_shoot_with_pradeep_kumar1123_trending_livemusic_loveislove_songs_idk6ur.jpg",
  "https://res.cloudinary.com/dxm3glvjq/image/upload/v1754575850/441211858_1516889262195295_5631550106516590248_n_ztz91b.jpg",
];

const WEDDING = [
  "https://res.cloudinary.com/dxm3glvjq/image/upload/v1754576215/get_3_dquye5.jpg",
  "https://res.cloudinary.com/dxm3glvjq/image/upload/v1754575418/get_ty5cuf.jpg",
  "https://res.cloudinary.com/dxm3glvjq/image/upload/v1754497314/VIDE5698_xpws5g.jpg",
  "https://res.cloudinary.com/dxm3glvjq/image/upload/v1754497289/VIDE9208_wakqic.jpg",
  "https://res.cloudinary.com/dxm3glvjq/image/upload/v1754497283/VIDE8942_kthszx.jpg",
  "https://res.cloudinary.com/dxm3glvjq/image/upload/v1754497253/VIDE6810_bou4c1.jpg",
  "https://res.cloudinary.com/dxm3glvjq/image/upload/v1754497090/DSC00810_yk3mts.jpg",
  "https://res.cloudinary.com/dxm3glvjq/image/upload/v1754497082/DSC02822_kzph6q.jpg",
  "https://res.cloudinary.com/dxm3glvjq/image/upload/v1754497079/DONE6877_wbi80g.jpg",
  "https://res.cloudinary.com/dxm3glvjq/image/upload/v1754496991/CRZY4744_rrhqsh.jpg",
  "https://res.cloudinary.com/dxm3glvjq/image/upload/v1754496988/CRZY9081_f4n5sb.jpg",
  "https://res.cloudinary.com/dxm3glvjq/image/upload/v1754496984/CRZY5834_uczsgg.jpg",
  "https://res.cloudinary.com/dxm3glvjq/image/upload/v1754496977/CRZY0319_ufbjae.jpg",
  "https://res.cloudinary.com/dxm3glvjq/image/upload/v1754496957/Carousal5_nevc6u.jpg",
  "https://res.cloudinary.com/dxm3glvjq/image/upload/v1754496929/Carousal1_zatgdd.jpg",
  "https://res.cloudinary.com/dxm3glvjq/image/upload/v1754496913/1C8A8580_ladwlo.jpg",
  "https://res.cloudinary.com/dxm3glvjq/image/upload/v1754496911/02_kn968l.jpg",
].map(src => ({ src, category: "Wedding" }));

const BIRTHDAY = [
  "https://res.cloudinary.com/dxm3glvjq/image/upload/v1754574465/HELLO_ALL_HOPE_YOU_ALL_ARE_GOOD_AND_SAFE_%EF%B8%8F_Yes_we_are_back_With_all_your_blessings_here_is_ou_dpvfwz.jpg",
  "https://res.cloudinary.com/dxm3glvjq/image/upload/v1754574464/317146553_3370299676574390_6411223539222079084_n_qaagqe.jpg",
  "https://res.cloudinary.com/dxm3glvjq/image/upload/v1754574464/317273066_854165815854107_4457544914850071124_n_j5nwf1.jpg",
  "https://res.cloudinary.com/dxm3glvjq/image/upload/v1754574464/HELLO_ALL_HOPE_YOU_ALL_ARE_GOOD_AND_SAFE_%EF%B8%8F_Yes_we_are_back_With_all_your_blessings_here_is_ou_1_zxaczf.jpg",
  "https://res.cloudinary.com/dxm3glvjq/image/upload/v1754574461/dm_for_more_enquire.......8124787002_1_gwlgmr.jpg",
  "https://res.cloudinary.com/dxm3glvjq/image/upload/v1754574463/dm_for_more_enquire.......8124787002_t4rvoa.jpg",
].map(src => ({ src, category: "Birthday" }));

const BABYSHOWER = [
  "https://res.cloudinary.com/dxm3glvjq/image/upload/v1754575850/441499064_405687615669094_7523321045747557921_n_t74lsd.jpg",
  "https://res.cloudinary.com/dxm3glvjq/image/upload/v1754575850/get_2_q82lgm.jpg",
  "https://res.cloudinary.com/dxm3glvjq/image/upload/v1754575850/441211858_1516889262195295_5631550106516590248_n_ztz91b.jpg",
  "https://res.cloudinary.com/dxm3glvjq/image/upload/v1754575847/get_1_xn6txa.jpg",
  "https://res.cloudinary.com/dxm3glvjq/image/upload/v1754575847/Someone_special_someone_dear_someone_new_to_love_is_here_PPL_Who_Collaborated_with_us_%EF%B8%8F_bu76ns.jpg",
].map(src => ({ src, category: "BabyShower" }));

const CONCERT = [
  "https://res.cloudinary.com/dxm3glvjq/image/upload/v1754574980/Recent_shoot_with_pradeep_kumar1123_trending_livemusic_loveislove_songs_idk6ur.jpg",
  "https://res.cloudinary.com/dxm3glvjq/image/upload/v1754574979/It_is_more_important_to_click_with_people_than_to_click_the_shutter_Thanks_for_Capturing_the_m_-_Copy_ffa4xi.webp",
  "https://res.cloudinary.com/dxm3glvjq/image/upload/v1754574979/Recent_shoot_with_pradeep_kumar1123_trending_livemusic_loveislove_songs_2_e4lvon.jpg",
  "https://res.cloudinary.com/dxm3glvjq/image/upload/v1754574978/Modeling_shoot_EVERYONEHASTALENT..._Teamwork_makes_the_Dreamwork_Inframe_-_methagu_lead_c_omidzp.jpg",
  "https://res.cloudinary.com/dxm3glvjq/image/upload/v1754574978/Recent_shoot_with_pradeep_kumar1123_trending_livemusic_loveislove_songs_1_fgsjlm.jpg",
  "https://res.cloudinary.com/dxm3glvjq/image/upload/v1754574975/Modeling_shoot_EVERYONEHASTALENT..._Teamwork_makes_the_Dreamwork_Inframe_-_methagu_lead_c_1_sdcpuz.jpg",
  "https://res.cloudinary.com/dxm3glvjq/image/upload/v1754574969/sanjeevalayamanasa_Stunning_Moments_Captured_Featuring_the_radiant_sanjeevalayamanasa_vsht6w.jpg",
  "https://res.cloudinary.com/dxm3glvjq/image/upload/v1754574963/aranthainisha_special_thanks_to_d_squad_studio_unique_surprise_plannerss_likes_like_follow_a8ocpp.jpg",
].map(src => ({ src, category: "Concert" }));

const ALL = [...WEDDING, ...BIRTHDAY, ...BABYSHOWER, ...CONCERT];
const CATS = ["All", "Wedding", "Birthday", "BabyShower", "Concert"];

const LABEL_COLOR = {
  Wedding: "bg-rose-500",
  Birthday: "bg-purple-500",
  BabyShower: "bg-pink-400",
  Concert: "bg-blue-500",
};

export default function GalleryPage() {
  const [cat,      setCat]      = useState("All");
  const [lightbox, setLightbox] = useState(null);

  const images = cat === "All" ? ALL : ALL.filter(i => i.category === cat);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen text-white"
      style={{ background: "#070710" }}
    >
      {/* Hero banner */}
      <div className="relative h-56 sm:h-72 md:h-80 overflow-hidden flex items-center justify-center">
        <img
          src={FEATURED[0]}
          alt="Gallery banner"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#070710]" />
        <div className="relative z-10 text-center px-4">
          <p className="eyebrow text-[#E8B84B] mb-3">Our Portfolio</p>
          <h1 className="display-lg text-white">Photo Gallery</h1>
          <p className="text-white/50 text-sm sm:text-base font-light mt-3 max-w-md mx-auto">
            Every frame tells a story — explore our complete collection
          </p>
        </div>
      </div>

      <div className="container pb-20">
        {/* Back + Pixieset */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 py-6 mb-4">
          <Link to="/"
            className="inline-flex items-center gap-2 text-[#E8B84B] text-sm font-medium
                       hover:text-white transition-colors border border-[#E8B84B]/30 hover:border-[#E8B84B]
                       px-4 py-2 rounded-full"
          >
            <ArrowLeft size={15} /> Back to Home
          </Link>
          <a href="https://crazycapturestudio.pixieset.com/crazycapturesamples/"
            target="_blank" rel="noopener noreferrer"
            className="btn btn-primary btn-sm gap-2"
          >
            <ExternalLink size={13} />
            View on Pixieset
          </a>
        </div>

        {/* Featured Swiper */}
        <div className="mb-10 sm:mb-14">
          <p className="eyebrow text-[#E8B84B] mb-4">Featured Shots</p>
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            autoplay={{ delay: 3200, disableOnInteraction: false }}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={16}
            breakpoints={{
              0:   { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024:{ slidesPerView: 3 },
            }}
            className="services-swiper pb-12"
          >
            {FEATURED.map((src, i) => (
              <SwiperSlide key={i}>
                <div
                  className="relative h-56 sm:h-64 md:h-72 rounded-2xl overflow-hidden group cursor-pointer"
                  onClick={() => setLightbox(src)}
                >
                  <img src={src} alt={`Featured ${i + 1}`}
                    className="w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-600"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300
                                  flex items-center justify-center">
                    <ZoomIn size={28} className="text-white" />
                  </div>
                  <span className="absolute bottom-3 left-3 bg-[#E8B84B] text-black text-[10px] font-bold
                                   px-3 py-1 rounded-full">Featured</span>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Filter pills */}
        <div className="flex flex-wrap gap-2 sm:gap-3 mb-8 sm:mb-10">
          {CATS.map(c => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-250 border ${
                cat === c
                  ? "bg-[#E8B84B] text-black border-[#E8B84B]"
                  : "border-white/15 text-white/60 hover:border-[#E8B84B]/50 hover:text-white"
              }`}
            >
              {c}
            </button>
          ))}
          <span className="flex items-center text-white/25 text-xs ml-1">
            {images.length} photos
          </span>
        </div>

        {/* Grid */}
        <motion.div
          key={cat}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4"
        >
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.03, duration: 0.4 }}
              className="relative group aspect-square rounded-xl overflow-hidden cursor-pointer
                         border border-white/8 hover:border-[#E8B84B]/40 transition-all duration-300"
              onClick={() => setLightbox(img.src)}
            >
              <img
                src={img.src}
                alt={img.category}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-[1.07] transition-transform duration-600"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100
                              transition-opacity duration-300 flex items-center justify-center">
                <ZoomIn size={22} className="text-white" />
              </div>
              {/* Category badge */}
              <span className={`absolute top-2 right-2 text-white text-[9px] font-semibold px-2 py-0.5
                               rounded-full opacity-0 group-hover:opacity-100 transition-opacity ${LABEL_COLOR[img.category] || "bg-gray-600"}`}>
                {img.category}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[600] bg-black/92 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.85 }}
              transition={{ type: "spring", stiffness: 280, damping: 26 }}
              className="relative max-w-5xl w-full max-h-[88vh]"
              onClick={e => e.stopPropagation()}
            >
              <img
                src={lightbox}
                alt="Gallery lightbox"
                className="w-full max-h-[88vh] object-contain rounded-2xl shadow-2xl"
              />
              <button
                onClick={() => setLightbox(null)}
                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/70 border border-white/20
                           text-white flex items-center justify-center hover:bg-[#E8B84B] hover:text-black transition-all"
              >
                <X size={16} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .swiper-pagination-bullet { background-color: #4B5563; opacity: 1; }
        .swiper-pagination-bullet-active { background-color: #E8B84B; }
      `}</style>
    </motion.div>
  );
}
