import React from "react";
import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaWhatsapp,
  FaFacebook,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import CrazyLogo from "../assets/Crazylogo.png";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
  { label: "Gallery", href: "/gallery", isLink: true },
];

const SOCIALS = [
  {
    Icon: FaInstagram,
    bg: "bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888]",
    href: "https://www.instagram.com/crazy_capture_studio/",
    label: "Instagram",
  },
  {
    Icon: FaWhatsapp,
    bg: "bg-[#25D366]",
    href: "https://wa.me/918124787002",
    label: "WhatsApp",
  },
  {
    Icon: FaFacebook,
    bg: "bg-[#1877F2]",
    href: "https://www.facebook.com/",
    label: "Facebook",
  },
];

const CONTACTS = [
  {
    Icon: FaPhoneAlt,
    label: "Phone",
    value: "+91 81247 87002",
    href: "tel:+918124787002",
  },
  {
    Icon: FaEnvelope,
    label: "Email",
    value: "crazycapturestudio@gmail.com",
    href: "mailto:crazycapturestudio@gmail.com",
  },
  {
    Icon: FaMapMarkerAlt,
    label: "Location",
    value: "Mangalam, Avinashi, Tiruppur, Tamil Nadu",
    href: "https://www.google.com/maps/search/?api=1&query=Crazy+Capture+Studio+Avinashi+Tamil+Nadu",
  },
];

export default function FooterSection() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-[#050508] text-white pt-16 sm:pt-20 pb-8 overflow-hidden">
      {/* Top Glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#E8B84B]/25 to-transparent" />

      {/* Watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none">
        <img
          src={CrazyLogo}
          alt=""
          className="w-[340px] h-[340px] object-contain"
        />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        {/* Main Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 sm:gap-12 pb-12 sm:pb-16">
          {/* Brand */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-4">
              <div className="relative shrink-0">
                <div className="absolute -inset-2 rounded-2xl bg-[#E8B84B]/12 blur-lg" />
                <img
                  src={CrazyLogo}
                  alt="Crazy Capture Studio"
                  className="relative w-16 h-16 rounded-xl object-contain"
                />
              </div>

              <div>
                <h2 className="text-lg font-black uppercase tracking-tight">
                  Crazy Capture{" "}
                  <span className="text-[#E8B84B]">Studio</span>
                </h2>

                <p className="text-[10px] tracking-[0.25em] uppercase text-white/35 mt-1">
                  Professional Photography
                </p>
              </div>
            </div>

            <p className="text-white/45 text-sm leading-relaxed max-w-sm">
              We specialize in capturing cinematic moments that last a lifetime.
              From weddings to portraits, we turn your stories into timeless
              visual art.
            </p>

            <div className="flex gap-3">
              {SOCIALS.map(({ Icon, bg, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`w-10 h-10 rounded-full ${bg} flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300`}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2 space-y-5">
            <h3 className="text-[#E8B84B] uppercase text-xs tracking-[0.3em] font-bold">
              Navigation
            </h3>

            <ul className="space-y-3">
              {NAV_LINKS.map(({ label, href, isLink }) => (
                <li key={label}>
                  {isLink ? (
                    <Link
                      to={href}
                      className="group flex items-center gap-2 text-sm text-white/45 hover:text-white transition-all"
                    >
                      <span className="w-0 h-px bg-[#E8B84B] group-hover:w-4 transition-all duration-300" />
                      {label}
                    </Link>
                  ) : (
                    <a
                      href={href}
                      className="group flex items-center gap-2 text-sm text-white/45 hover:text-white transition-all"
                    >
                      <span className="w-0 h-px bg-[#E8B84B] group-hover:w-4 transition-all duration-300" />
                      {label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3 space-y-5">
            <h3 className="text-[#E8B84B] uppercase text-xs tracking-[0.3em] font-bold">
              Get in Touch
            </h3>

            <div className="space-y-5">
              {CONTACTS.map(({ Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 group"
                >
                  <div className="w-9 h-9 rounded-xl border border-white/10 flex items-center justify-center text-[#E8B84B] group-hover:bg-[#E8B84B] group-hover:text-black transition-all">
                    <Icon size={13} />
                  </div>

                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-white/30">
                      {label}
                    </p>
                    <p className="text-sm text-white/80">{value}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Map */}
          <div className="lg:col-span-3 space-y-5">
            <h3 className="eyebrow text-[#E8B84B]">Find Us</h3>

            <a
              href="https://www.google.com/maps/search/?api=1&query=Crazy+Capture+Studio+Avinashi+Tamil+Nadu"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <div className="relative rounded-2xl overflow-hidden border border-white/10 group aspect-video lg:aspect-square shadow-xl">
                <iframe
                  title="Crazy Capture Studio Location"
                  src="https://www.google.com/maps?q=Crazy+Capture+Studio+Avinashi+Tamil+Nadu&z=16&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                />

                <div className="absolute inset-0 border border-white/5 rounded-2xl pointer-events-none" />
              </div>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-7 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/25 text-[11px] text-center sm:text-left">
            © {year}{" "}
            <span className="text-white/50">
              Crazy Capture Studio
            </span>. All rights reserved.
          </p>

          <div className="flex items-center gap-1.5 text-[11px]">
            <span className="text-white/20">Designed by</span>

            <a
              href="https://akwebflairtechnologies.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#E8B84B]/70 hover:text-[#E8B84B] underline"
            >
              AK WebFlair Technologies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}