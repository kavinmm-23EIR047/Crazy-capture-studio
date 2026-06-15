import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Home, User, Camera, Star, Image, PhoneCall, Aperture } from "lucide-react";
import CrazyLogo from "../assets/Crazylogo.png";

const NAV_ITEMS = [
  { id: "home",       label: "Home",      icon: Home },
  { id: "about",      label: "About",     icon: User },
  { id: "services",   label: "Services",  icon: Camera },
  { id: "studio-box", label: "Studio 📸", icon: Aperture },
  { id: "reviews",    label: "Reviews",   icon: Star },
];

export default function Navigation() {
  const [scrolled,     setScrolled]     = useState(false);
  const [menuOpen,     setMenuOpen]     = useState(false);
  const [active,       setActive]       = useState("home");
  const [scrollTarget, setScrollTarget] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  /* ── scroll state ── */
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn, { passive: true });
    fn();
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* ── close on route change ── */
  useEffect(() => setMenuOpen(false), [location.pathname]);

  /* ── lock body scroll when drawer open ── */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

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
      {/* ═══════════════════════════════════════
          NAVBAR — hidden on mobile when drawer is open
      ═══════════════════════════════════════ */}
      <motion.nav
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500
          ${menuOpen ? "md:block hidden" : "block"}
          ${scrolled
            ? "bg-[#06060f]/90 backdrop-blur-2xl shadow-[0_1px_40px_rgba(0,0,0,0.6),0_1px_0_rgba(232,184,75,0.08)]"
            : "bg-transparent"
          }`}
      >
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#E8B84B]/40 to-transparent" />

        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-[72px] md:h-[80px]">

            {/* ── Logo ── */}
            <Link
              to="/"
              onClick={() => scrollTo("home")}
              className="flex items-center gap-3 group shrink-0 select-none"
            >
              <div className="relative">
                <div className="absolute -inset-2 rounded-2xl bg-[#E8B84B]/10 blur-xl
                                group-hover:bg-[#E8B84B]/25 transition-all duration-500" />
                <img
                  src={CrazyLogo}
                  alt="Crazy Capture Studio"
                  draggable={false}
                  loading="eager"
                  className="relative object-contain rounded-xl"
                  style={{ width: 52, height: 52, minWidth: 52 }}
                />
              </div>
              <div className="hidden sm:block leading-none">
                <div className="text-white font-bold text-[15px] tracking-tight">Crazy Capture</div>
                <div className="text-[#E8B84B] text-[10px] font-light tracking-[0.25em] uppercase mt-0.5">
                  Studio
                </div>
              </div>
            </Link>

            {/* ── Desktop Menu ── */}
            <div className="hidden md:flex items-center gap-0.5 lg:gap-1">
              {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className="relative group flex items-center gap-2 px-4 lg:px-5 py-2.5
                             text-[13px] lg:text-[13.5px] font-medium transition-all duration-300
                             rounded-lg overflow-hidden"
                >
                  <span className="absolute inset-0 rounded-lg bg-white/0 group-hover:bg-white/[0.04] transition-all duration-300" />
                  {isActive(id) && (
                    <motion.span
                      layoutId="nav-active-bg"
                      className="absolute inset-0 rounded-lg bg-[#E8B84B]/10"
                      transition={{ type: "spring", stiffness: 380, damping: 36 }}
                    />
                  )}
                  <Icon size={13} className={`relative shrink-0 transition-colors duration-300 ${
                    isActive(id) ? "text-[#E8B84B]" : "text-white/40 group-hover:text-white/70"
                  }`} />
                  <span className={`relative transition-colors duration-300 ${
                    isActive(id) ? "text-[#E8B84B]" : "text-white/60 group-hover:text-white/90"
                  }`}>
                    {label}
                  </span>
                  {isActive(id) && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-3 right-3 h-[1.5px] rounded-full bg-[#E8B84B]/70"
                      transition={{ type: "spring", stiffness: 380, damping: 36 }}
                    />
                  )}
                </button>
              ))}

              {/* Gallery */}
              <Link
                to="/gallery"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className={`relative group flex items-center gap-2 px-4 lg:px-5 py-2.5
                            text-[13px] lg:text-[13.5px] font-medium transition-all duration-300
                            rounded-lg overflow-hidden ${
                              location.pathname === "/gallery"
                                ? "text-[#E8B84B]"
                                : "text-white/60 hover:text-white/90"
                            }`}
              >
                <span className="absolute inset-0 rounded-lg bg-white/0 group-hover:bg-white/[0.04] transition-all duration-300" />
                {location.pathname === "/gallery" && (
                  <motion.span
                    layoutId="nav-active-bg"
                    className="absolute inset-0 rounded-lg bg-[#E8B84B]/10"
                    transition={{ type: "spring", stiffness: 380, damping: 36 }}
                  />
                )}
                <Image size={13} className={`relative shrink-0 transition-colors duration-300 ${
                  location.pathname === "/gallery" ? "text-[#E8B84B]" : "text-white/40 group-hover:text-white/70"
                }`} />
                <span className="relative">Gallery</span>
                {location.pathname === "/gallery" && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-3 right-3 h-[1.5px] rounded-full bg-[#E8B84B]/70"
                    transition={{ type: "spring", stiffness: 380, damping: 36 }}
                  />
                )}
              </Link>

              {/* Divider */}
              <div className="w-px h-5 bg-white/10 mx-2" />

              {/* Contact CTA */}
              <button
                onClick={() => scrollTo("contact")}
                className="relative group flex items-center gap-2 px-5 py-2.5 rounded-lg overflow-hidden
                           text-[13px] font-semibold text-[#0a0a14] transition-all duration-300"
              >
                <span className="absolute inset-0 bg-gradient-to-br from-[#f0c65a] via-[#E8B84B] to-[#c9912a]
                                  group-hover:from-[#f5d06e] group-hover:via-[#f0c65a] group-hover:to-[#d4a030]
                                  transition-all duration-300" />
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
                                  bg-[linear-gradient(105deg,transparent_30%,rgba(255,255,255,0.25)_50%,transparent_70%)]" />
                <PhoneCall size={13} className="relative shrink-0" />
                <span className="relative">Contact</span>
              </button>
            </div>

            {/* ── Mobile Hamburger — only when drawer closed ── */}
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl
                         bg-white/5 border border-white/10 text-white
                         hover:bg-white/10 hover:border-white/20 transition-all duration-200"
            >
              <Menu size={18} />
            </button>

          </div>
        </div>
      </motion.nav>

      {/* ═══════════════════════════════════════
          MOBILE DRAWER — completely standalone
      ═══════════════════════════════════════ */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[110] md:hidden bg-black/80 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
            />

            {/* Drawer panel */}
            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 32 }}
              className="fixed top-0 right-0 bottom-0 z-[120] md:hidden
                         w-[78vw] max-w-[300px] bg-[#0a0a14] flex flex-col"
            >
              {/* Gold left accent stripe */}
              <div className="absolute top-0 left-0 bottom-0 w-[2px] pointer-events-none
                              bg-gradient-to-b from-transparent via-[#E8B84B]/50 to-transparent" />

              {/* ── Header — logo + close only ── */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
                <div className="flex items-center gap-3">
                  <img
                    src={CrazyLogo}
                    alt="Crazy Capture Studio"
                    className="rounded-xl object-contain"
                    style={{ width: 44, height: 44, minWidth: 44 }}
                  />
                  <div className="leading-none">
                    <div className="text-white font-bold text-[13.5px] tracking-tight">Crazy Capture</div>
                    <div className="text-[#E8B84B] text-[9px] font-light tracking-[0.28em] uppercase mt-1">
                      Studio
                    </div>
                  </div>
                </div>

                {/* Close button */}
                <button
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                  className="flex items-center justify-center w-9 h-9 rounded-xl
                             bg-white/5 border border-white/10 text-white/50
                             hover:text-white hover:bg-white/10 transition-all duration-200"
                >
                  <X size={16} />
                </button>
              </div>

              {/* ── Nav Links ── */}
              <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
                {NAV_ITEMS.map(({ id, label, icon: Icon }, i) => (
                  <motion.button
                    key={id}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.055, ease: "easeOut", duration: 0.3 }}
                    onClick={() => scrollTo(id)}
                    className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl
                                text-[13.5px] font-medium transition-all duration-200 ${
                      isActive(id)
                        ? "bg-[#E8B84B]/[0.12] text-[#E8B84B] border border-[#E8B84B]/20"
                        : "text-white/55 hover:text-white hover:bg-white/[0.05] border border-transparent"
                    }`}
                  >
                    <Icon size={15} className={`shrink-0 ${isActive(id) ? "text-[#E8B84B]" : "text-white/30"}`} />
                    {label}
                    {isActive(id) && (
                      <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#E8B84B]" />
                    )}
                  </motion.button>
                ))}

                {/* Gallery */}
                <motion.div
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: NAV_ITEMS.length * 0.055, ease: "easeOut", duration: 0.3 }}
                >
                  <Link
                    to="/gallery"
                    onClick={() => { setMenuOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                    className={`flex items-center gap-3 px-4 py-3.5 rounded-xl
                                text-[13.5px] font-medium transition-all duration-200 ${
                      location.pathname === "/gallery"
                        ? "bg-[#E8B84B]/[0.12] text-[#E8B84B] border border-[#E8B84B]/20"
                        : "text-white/55 hover:text-white hover:bg-white/[0.05] border border-transparent"
                    }`}
                  >
                    <Image size={15} className={`shrink-0 ${
                      location.pathname === "/gallery" ? "text-[#E8B84B]" : "text-white/30"
                    }`} />
                    Gallery
                    {location.pathname === "/gallery" && (
                      <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#E8B84B]" />
                    )}
                  </Link>
                </motion.div>
              </nav>

              {/* ── Footer ── */}
              <div className="px-4 pb-6 pt-3 border-t border-white/[0.06]">
                <p className="text-white/25 text-[10.5px] text-center tracking-widest uppercase mb-3">
                  Book Your Moment
                </p>
                <button
                  onClick={() => scrollTo("contact")}
                  className="relative w-full flex items-center justify-center gap-2.5
                             py-3.5 rounded-xl overflow-hidden
                             text-[#0a0a14] text-[13.5px] font-bold tracking-wide
                             transition-all duration-300 active:scale-[0.97]"
                >
                  <span className="absolute inset-0 bg-gradient-to-br from-[#f0c65a] via-[#E8B84B] to-[#c9912a]" />
                  <span className="absolute inset-0 bg-[linear-gradient(105deg,transparent_35%,rgba(255,255,255,0.22)_50%,transparent_65%)]" />
                  <PhoneCall size={15} className="relative shrink-0" />
                  <span className="relative">Book a Session</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
