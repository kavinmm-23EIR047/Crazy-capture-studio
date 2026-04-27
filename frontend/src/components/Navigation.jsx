import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Home, User, Camera, Star, Image, PhoneCall, Aperture } from "lucide-react";
import CrazyLogo from "../assets/Crazylogo.png";

const NAV_ITEMS = [
  { id: "home",      label: "Home",       icon: Home },
  { id: "about",     label: "About",      icon: User },
  { id: "services",  label: "Services",   icon: Camera },
  { id: "studio-box",label: "Studio 📸",  icon: Aperture },
  { id: "reviews",   label: "Reviews",    icon: Star },
];

export default function Navigation() {
  const [scrolled,    setScrolled]    = useState(false);
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [active,      setActive]      = useState("home");
  const [scrollTarget,setScrollTarget]= useState(null);

  const location = useLocation();
  const navigate  = useNavigate();

  /* ── scroll state ── */
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn, { passive: true });
    fn();
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* ── close on route change ── */
  useEffect(() => setMenuOpen(false), [location.pathname]);

  /* ── scroll after navigate ── */
  useEffect(() => {
    if (location.pathname === "/" && scrollTarget) {
      const el = document.getElementById(scrollTarget);
      if (el) setTimeout(() => { el.scrollIntoView({ behavior: "smooth" }); setScrollTarget(null); }, 350);
    }
  }, [location, scrollTarget]);

  /* ── active section observer ── */
  useEffect(() => {
    if (location.pathname !== "/") return;
    const sections = document.querySelectorAll("section[id]");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && setActive(e.target.id)),
      { threshold: 0.45 }
    );
    sections.forEach(s => obs.observe(s));
    return () => sections.forEach(s => obs.unobserve(s));
  }, [location.pathname]);

  const scrollTo = (id) => {
    setMenuOpen(false);
    if (location.pathname === "/") {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      setScrollTarget(id);
      navigate("/");
    }
  };

  const isActive = (id) => active === id;

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-400 ${
          menuOpen || scrolled
            ? "bg-[#080810]/95 backdrop-blur-xl shadow-[0_1px_0_rgba(255,255,255,0.06)]"
            : "bg-transparent"
        }`}
      >
        <div className="container">
          <div className="flex items-center justify-between h-[70px] md:h-[76px]">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group shrink-0" onClick={() => scrollTo("home")}>
              <div className="relative">
                {/* Soft glow behind logo */}
                <div className="absolute -inset-2 rounded-2xl bg-[#E8B84B]/15 blur-lg group-hover:bg-[#E8B84B]/30 transition-all duration-400" />
                <img src={CrazyLogo} alt="Crazy Capture Studio Logo"
                  className="relative w-13 h-13 md:w-[58px] md:h-[58px] object-contain rounded-xl drop-shadow-lg"
                  style={{ width: '52px', height: '52px', minWidth: '52px' }}
                  draggable={false} loading="eager"
                />
              </div>
              <div className="hidden sm:block leading-none">
                <div className="text-white font-bold text-base tracking-tight">Crazy Capture</div>
                <div className="text-[#E8B84B] text-[11px] font-light tracking-[0.2em] uppercase mt-0.5">Studio</div>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-1 lg:gap-2">
              {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className={`relative flex items-center gap-1.5 px-3 lg:px-4 py-2 rounded-full text-[13px] lg:text-sm font-medium transition-all duration-250 ${
                    isActive(id)
                      ? "text-[#E8B84B] bg-[#E8B84B]/10"
                      : "text-white/70 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon size={14} className="shrink-0" />
                  {label}
                  {isActive(id) && (
                    <motion.div layoutId="nav-dot"
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#E8B84B]"
                    />
                  )}
                </button>
              ))}

              <Link to="/gallery"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className={`flex items-center gap-1.5 px-3 lg:px-4 py-2 rounded-full text-[13px] lg:text-sm font-medium transition-all duration-250 ${
                  location.pathname === "/gallery"
                    ? "text-[#E8B84B] bg-[#E8B84B]/10"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
              >
                <Image size={14} className="shrink-0" />
                Gallery
              </Link>

              <button
                onClick={() => scrollTo("contact")}
                className="btn btn-primary btn-sm ml-2 gap-1.5"
              >
                <PhoneCall size={13} />
                Contact
              </button>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMenuOpen(p => !p)}
              className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-full glass border border-white/10 text-white transition-all"
              aria-label="Menu"
            >
              <AnimatePresence mode="wait">
                {menuOpen
                  ? <motion.div key="x"  initial={{rotate:-90,opacity:0}} animate={{rotate:0,opacity:1}} exit={{rotate:90,opacity:0}} transition={{duration:0.2}}><X size={18}/></motion.div>
                  : <motion.div key="m"  initial={{rotate:90,opacity:0}}  animate={{rotate:0,opacity:1}} exit={{rotate:-90,opacity:0}} transition={{duration:0.2}}><Menu size={18}/></motion.div>
                }
              </AnimatePresence>
            </button>

          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 z-[90] md:hidden"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              key="drawer"
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
              className="fixed top-0 right-0 bottom-0 w-[78vw] max-w-[320px] z-[95] md:hidden
                         bg-[#0c0c18]/98 backdrop-blur-2xl border-l border-white/8 flex flex-col"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between p-5 border-b border-white/8">
                <div className="flex items-center gap-3">
                  <img src={CrazyLogo} alt="Logo"
                    className="object-contain rounded-xl drop-shadow-md"
                    style={{ width: '46px', height: '46px', minWidth: '46px' }}
                  />
                  <div>
                    <div className="text-white font-bold text-sm">Crazy Capture</div>
                    <div className="text-[#E8B84B] text-[10px] font-light tracking-widest uppercase mt-0.5">Studio</div>
                  </div>
                </div>
                <button onClick={() => setMenuOpen(false)}
                  className="w-8 h-8 rounded-full glass flex items-center justify-center text-white/60 hover:text-white"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Drawer Links */}
              <div className="flex-1 overflow-y-auto p-5 space-y-1">
                {NAV_ITEMS.map(({ id, label, icon: Icon }, i) => (
                  <motion.button
                    key={id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    onClick={() => scrollTo(id)}
                    className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all ${
                      isActive(id)
                        ? "bg-[#E8B84B]/15 text-[#E8B84B] border border-[#E8B84B]/20"
                        : "text-white/70 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Icon size={16} className="shrink-0" />
                    {label}
                  </motion.button>
                ))}

                <Link to="/gallery"
                  onClick={() => { setMenuOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all ${
                    location.pathname === "/gallery"
                      ? "bg-[#E8B84B]/15 text-[#E8B84B] border border-[#E8B84B]/20"
                      : "text-white/70 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Image size={16} className="shrink-0" />
                  Gallery
                </Link>
              </div>

              {/* Drawer Footer */}
              <div className="p-5 border-t border-white/8">
                <button
                  onClick={() => scrollTo("contact")}
                  className="btn btn-primary w-full gap-2 justify-center"
                >
                  <PhoneCall size={15} />
                  Book a Session
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
