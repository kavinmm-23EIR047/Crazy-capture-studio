import { useState, useRef, useEffect } from "react";
import {
  FaAward, FaUsers, FaInstagram, FaPlay, FaPause,
  FaVolumeUp, FaVolumeMute, FaHeart,
  FaStar, FaTrophy, FaCamera
} from "react-icons/fa";
import { motion } from "framer-motion";

const AboutAndAchievements = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [aboutVisible, setAboutVisible] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const [counters, setCounters] = useState({
    clients: 0, awards: 0, projects: 0, experience: 0, satisfaction: 0, events: 0
  });

  const videoRef = useRef(null);
  const aboutRef = useRef(null);
  const statsRef = useRef(null);

  const stats = [
    { key: "clients", target: 1222, icon: FaUsers, label: "Clients", suffix: "+" },
    { key: "awards", target: 50, icon: FaAward, label: "Awards", suffix: "+" },
    { key: "projects", target: 2500, icon: FaCamera, label: "Projects", suffix: "+" },
    { key: "experience", target: 8, icon: FaTrophy, label: "Years", suffix: "+" },
    { key: "satisfaction", target: 98, icon: FaHeart, label: "Satisfaction", suffix: "%" },
    { key: "events", target: 350, icon: FaStar, label: "Events", suffix: "+" }
  ];

  const animateCounter = (target, key, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        start = target;
        clearInterval(timer);
      }
      setCounters(prev => ({ ...prev, [key]: Math.floor(start) }));
    }, 16);
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target === aboutRef.current) {
          if (entry.isIntersecting) {
            setTimeout(() => setAboutVisible(true), 150);
          } else {
            setAboutVisible(false);
          }
        }
        if (entry.target === statsRef.current) {
          if (entry.isIntersecting && !statsVisible) {
            setStatsVisible(true);
            stats.forEach((stat, i) => {
              setTimeout(() => animateCounter(stat.target, stat.key), i * 200);
            });
          }
        }
      });
    }, { threshold: 0.3 });

    if (aboutRef.current) observer.observe(aboutRef.current);
    if (statsRef.current) observer.observe(statsRef.current);

    return () => observer.disconnect();
  }, [statsVisible]);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (videoRef.current) {
        if (entry.isIntersecting) {
          videoRef.current.play();
          setIsPlaying(true);
        } else {
          videoRef.current.pause();
          setIsPlaying(false);
        }
      }
    }, { threshold: 0.5 });

    if (videoRef.current) observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) videoRef.current.pause();
    else videoRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="bg-transparent text-white">
      {/* About */}
      <section
        ref={aboutRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20"
      >
       <div className="text-center mb-12 px-2 sm:px-0">
  <h1 className="text-3xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-200 leading-tight">
    About Us
  </h1>
  <div className="w-16 h-1 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-200 mx-auto mt-4 rounded-full shadow-lg"></div>
  <p className="mt-6 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed text-gray-300">
    Capturing{" "}
    <span className="text-yellow-300 font-semibold">golden moments</span>{" "}
    and sealing them in{" "}
    <span className="text-gray-400 font-semibold">timeless frames</span>{" "}
    to live{" "}
    <span className="text-yellow-200 font-semibold">forever</span>.
  </p>
</div>


        <div className="flex flex-col lg:flex-row items-center gap-10">
          {/* Video Frame */}
          <div className="flex-1 max-w-md w-full flex justify-center">
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative p-[6px] bg-gradient-to-br from-gray-900 to-gray-700 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.6)]"
              style={{
                width: "380px",
                height: "280px",
                boxShadow: "inset 0 0 10px rgba(0,0,0,0.5), 0 8px 25px rgba(0,0,0,0.4)"
              }}
            >
              <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 p-[4px] rounded-lg">
                <div className="relative w-full h-full rounded-md overflow-hidden shadow-lg border border-gray-600">
                  <video
                    src="https://res.cloudinary.com/dxm3glvjq/video/upload/v1754756318/Passionate_work_enjoyable_crazy_capture_studio_praba_prince_love_passion_work_enjoy_nrkz1c.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                    style={{
                      filter: "grayscale(1) brightness(0.7) contrast(1.3)"
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/25 to-transparent pointer-events-none"></div>
                  <div className="absolute top-2 left-2 flex items-center space-x-2 bg-black/60 px-2 py-1 rounded-md">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-white font-semibold text-xs tracking-wider">REC</span>
                  </div>
                  <div className="absolute top-2 right-2 bg-black/60 p-1.5 rounded-full shadow-md">
                    <FaCamera className="text-white text-sm" />
                  </div>
                  {/* Corner markers */}
                  {["top-0 left-0", "top-0 right-0", "bottom-0 left-0", "bottom-0 right-0"].map((pos, idx) => (
                    <div key={idx}>
                      <div className={`absolute ${pos.split(" ")[0]} ${pos.split(" ")[1]} w-6 h-0.5 bg-yellow-400`}></div>
                      <div className={`absolute ${pos.split(" ")[0]} ${pos.split(" ")[1]} h-6 w-0.5 bg-yellow-400`}></div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Text Content */}
          <div
            className={`flex-1 space-y-6 text-center lg:text-left transform transition-all duration-1000 px-2 sm:px-0 ${
              aboutVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <p className="text-base sm:text-lg leading-relaxed text-gray-300">
              Hello and welcome! I’m <span className="text-yellow-300 font-semibold">Prabakaran</span>, 
              the founder and CEO of <span className="text-yellow-400 font-semibold">Crazy Capture Studio</span>. 
              Photography has been more than a profession for me—it’s been my lifelong passion. 
              Every frame we capture is a story, a memory, a feeling frozen in time.
            </p>
            <p className="text-base sm:text-lg leading-relaxed text-gray-300">
              When I started Crazy Capture Studio, my vision was simple: to create images that don’t just look beautiful 
              but also make people feel something every time they see them. Our team blends 
              <span className="text-yellow-200 font-semibold"> creativity</span> with 
              <span className="text-gray-400 font-semibold"> technical mastery</span>, 
              ensuring that every shot is crafted with care, precision, and heart.
            </p>
            <p className="text-base sm:text-lg leading-relaxed text-gray-300">
              We believe in making every client experience personal, stress-free, and unforgettable—because great photography 
              is not just about the camera; it’s about <span className="text-yellow-300 font-semibold">connection</span>.
            </p>
            <p className="text-gray-400 italic">
              “Thank you for trusting us to tell your story through our lens. We look forward to creating timeless memories with you.”
            </p>
            <p className="text-sm text-gray-500 mt-4">
              — Prabakaran, Founder & CEO, Crazy Capture Studio
            </p>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section ref={statsRef} className="bg-transparent py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 px-2 sm:px-0">
            <h2 className="text-2xl sm:text-4xl font-bold text-[#FFCB05] leading-tight">
              Our Achievements
            </h2>
            <p className="text-[#B0B0B0] text-sm sm:text-base max-w-xl mx-auto">
              Moments turned into milestones.
            </p>
          </div>

          {/* Award Video */}
          <div className="mt-12 bg-white/5 border border-white/10 backdrop-blur-md rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 max-w-xl mx-auto">
            <div className="relative aspect-video">
              <video
                ref={videoRef}
                src="https://res.cloudinary.com/dxm3glvjq/video/upload/v1754840452/Honored_to_receive_this_photography_award.Behind_every_frame_is_a_story_thank_you_for_seeing_m_1_pdopyf.mp4"
                className="w-full h-full object-cover"
                muted={isMuted}
              />
              <a
                href="https://instagram.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-3 right-3 bg-black/50 p-2 rounded-full text-white hover:bg-black/70"
              >
                <FaInstagram />
              </a>
              <div className="absolute bottom-3 left-3 flex gap-2">
                <button
                  onClick={togglePlay}
                  className="bg-black/50 p-2 rounded-full text-white hover:bg-black/70"
                >
                  {isPlaying ? <FaPause /> : <FaPlay />}
                </button>
                <button
                  onClick={toggleMute}
                  className="bg-black/50 p-2 rounded-full text-white hover:bg-black/70"
                >
                  {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                </button>
              </div>
            </div>
            <div className="p-4">
              <h4 className="text-lg font-bold text-white">Unique Awards</h4>
              <p className="text-[#B0B0B0] text-sm">
                Received <span className="text-[#FFCB05] font-semibold">Best Photographer</span> award.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-12 px-2 sm:px-0">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.key}
                  className={`bg-white/5 border border-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 text-center transform transition-all duration-700 hover:shadow-2xl ${
                    statsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  }`}
                  style={{ transitionDelay: `${i * 150}ms` }}
                >
                  <Icon className="text-[#FFCB05] text-2xl sm:text-4xl mb-2" />
                  <div className="text-xl sm:text-3xl font-bold text-white">
                    {counters[stat.key]}
                    {stat.suffix}
                  </div>
                  <p className="text-[#B0B0B0] text-xs sm:text-sm">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutAndAchievements;
