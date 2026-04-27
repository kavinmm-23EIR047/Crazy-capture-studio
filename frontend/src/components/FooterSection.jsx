import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaWhatsapp, FaFacebook, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
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
  { Icon: FaInstagram, bg: "bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888]", href: "https://www.instagram.com/crazy_capture_studio/", label: "Instagram" },
  { Icon: FaWhatsapp, bg: "bg-[#25D366]", href: "https://wa.me/918124787002", label: "WhatsApp" },
  { Icon: FaFacebook, bg: "bg-[#1877F2]", href: "https://www.facebook.com/people/%F0%9D%91%AA%F0%9D%92%93%F0%9D%92%82%F0%9D%92%9B%F0%9D%92%9A-%F0%9D%91%AA%F0%9D%92%82%F0%9D%92%91%F0%9D%92%95%F0%9D%92%96%F0%9D%92%93%F0%9D%92%86-%F0%9D%91%BA%F0%9D%92%95%F0%9D%92%96%F0%9D%92%85%F0%9D%92%8A%F0%9D%92%90/61565983881585/", label: "Facebook" },
];

const CONTACTS = [
  { Icon: FaPhoneAlt, label: "Phone", value: "+91 81247 87002", href: "tel:+918124787002" },
  { Icon: FaEnvelope, label: "Email", value: "crazycapturestudio@gmail.com", href: "mailto:crazycapturestudio@gmail.com" },
  { Icon: FaMapMarkerAlt, label: "Location", value: "Mangalam, Avinashi, Tiruppur, Tamil Nadu", href: "https://maps.app.goo.gl/35mvtRsqVqZPC5Xv8" },
];

export default function FooterSection() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-[#050508] text-white pt-16 sm:pt-20 pb-8 overflow-hidden">
      {/* Top border glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#E8B84B]/25 to-transparent" />

      {/* Background logo watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.025] pointer-events-none">
        <img src={CrazyLogo} alt="" className="w-[400px] h-[400px] object-contain" />
      </div>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 sm:gap-12 pb-12 sm:pb-16">

          {/* Brand */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-4">
              <div className="relative shrink-0">
                <div className="absolute -inset-2 rounded-2xl bg-[#E8B84B]/12 blur-lg" />
                <img src={CrazyLogo} alt="Crazy Capture Studio Logo"
                  className="relative object-contain rounded-xl drop-shadow-lg"
                  style={{ width: '64px', height: '64px', minWidth: '64px' }}
                  loading="lazy" />
              </div>
              <div>
                <h2 className="text-lg font-black tracking-tight uppercase leading-none text-white">
                  Crazy Capture <span className="text-[#E8B84B]">Studio</span>
                </h2>
                <p className="text-[10px] font-light tracking-[0.25em] uppercase text-white/35 mt-1">
                  Professional Photography
                </p>
              </div>
            </div>

            <p className="body-md text-white/45 max-w-sm leading-relaxed">
              We specialize in capturing cinematic moments that last a lifetime.
              From weddings to portraits, we turn your stories into timeless visual art.
            </p>

            <div className="flex gap-3">
              {SOCIALS.map(({ Icon, bg, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className={`w-10 h-10 rounded-full ${bg} flex items-center justify-center text-white
                              shadow-lg hover:scale-110 hover:-translate-y-0.5 transition-all duration-250`}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2 space-y-5">
            <h3 className="eyebrow text-[#E8B84B]">Navigation</h3>
            <ul className="space-y-3">
              {NAV_LINKS.map(({ label, href, isLink }) => (
                <li key={label}>
                  {isLink ? (
                    <Link to={href}
                      className="group flex items-center gap-2.5 text-sm font-light text-white/40
                                 hover:text-white transition-colors duration-250"
                    >
                      <span className="w-0 h-px bg-[#E8B84B] group-hover:w-4 transition-all duration-300" />
                      {label}
                    </Link>
                  ) : (
                    <a href={href}
                      className="group flex items-center gap-2.5 text-sm font-light text-white/40
                                 hover:text-white transition-colors duration-250"
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
            <h3 className="eyebrow text-[#E8B84B]">Get in Touch</h3>
            <div className="space-y-5">
              {CONTACTS.map(({ Icon, label, value, href }) => {
                const inner = (
                  <div className="flex items-start gap-3.5 group">
                    <div className="w-9 h-9 rounded-xl glass border border-white/8 flex items-center justify-center
                                    text-[#E8B84B] shrink-0 group-hover:bg-[#E8B84B] group-hover:text-black
                                    group-hover:border-[#E8B84B] transition-all duration-250">
                      <Icon size={13} />
                    </div>
                    <div>
                      <p className="text-[10px] font-light uppercase tracking-widest text-white/30 mb-0.5">{label}</p>
                      <p className="text-sm font-medium text-white/80 leading-snug">{value}</p>
                    </div>
                  </div>
                );
                return href ? (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer">{inner}</a>
                ) : (
                  <div key={label}>{inner}</div>
                );
              })}
            </div>
          </div>

          {/* Map */}
          <div className="lg:col-span-3 space-y-5">
            <h3 className="eyebrow text-[#E8B84B]">Find Us</h3>
            <div className="relative rounded-2xl overflow-hidden border border-white/10 group aspect-video lg:aspect-square">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d1001.9483804215233!2d77.2746591666875!3d11.11175868588738!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTHCsDA2JzQ0LjgiTiA3N8KwMTYnMzEuMSJF!5e1!3m2!1sen!2sin!4v1777303387808!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
              />
              <div className="absolute inset-0 pointer-events-none border border-white/5 rounded-2xl" />
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-7 border-t border-white/6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/25 text-[11px] font-light tracking-wide text-center sm:text-left">
            © {year} <span className="text-white/50">Crazy Capture Studio</span>. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5 text-[11px]">
            <span className="text-white/20 font-light">Designed by</span>
            <a href="https://akwebflairtechnologies.vercel.app/" target="_blank" rel="noopener noreferrer"
              className="text-[#E8B84B]/70 hover:text-[#E8B84B] font-medium transition-colors underline-offset-2 hover:underline">
              AK WebFlair Technologies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
