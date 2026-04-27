import React from "react";
import { FaInstagram, FaWhatsapp, FaFacebook, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const FooterSection = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-transparent text-white pt-20 pb-10 overflow-hidden">
      {/* Decorative Background Element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent" />
      
      <div className="max-w-screen-xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20 pb-16">
          
          {/* Brand Identity */}
          <div className="md:col-span-5 space-y-8">
            <div className="flex items-center gap-5 group">
              <div className="w-20 h-20 overflow-hidden group-hover:scale-105 transition-transform duration-500">
                <img src="/Crazylogo.jpg" alt="Crazy Capture Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <h2 className="text-2xl font-black tracking-tighter uppercase leading-none">
                  Crazy Capture <span className="text-yellow-400">Studio</span>
                </h2>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mt-1">
                  Professional Photography
                </p>
              </div>
            </div>
            
            <p className="text-white/50 text-sm leading-relaxed max-w-sm">
              We specialize in capturing cinematic moments that last a lifetime. 
              From weddings to professional portraits, we turn your stories into timeless visual art.
            </p>

            <div className="flex gap-4">
              {[
                { 
                  icon: FaInstagram, 
                  link: "https://www.instagram.com/crazy_capture_studio/", 
                  bg: "bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888]" 
                },
                { 
                  icon: FaWhatsapp, 
                  link: "https://wa.me/918124787002", 
                  bg: "bg-[#25D366]" 
                },
                { 
                  icon: FaFacebook, 
                  link: "https://www.facebook.com/people/%F0%9D%91%AA%F0%9D%92%93%F0%9D%92%82%F0%9D%92%9B%F0%9D%92%9A-%F0%9D%91%AA%F0%9D%92%82%F0%9D%92%91%F0%9D%92%95%F0%9D%92%96%F0%9D%92%93%F0%9D%92%86-%F0%9D%91%BA%F0%9D%92%95%F0%9D%92%96%F0%9D%92%85%F0%9D%92%8A%F0%9D%92%90/61565983881585/", 
                  bg: "bg-[#1877F2]" 
                }
              ].map((social, i) => (
                <a 
                  key={i} 
                  href={social.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`w-11 h-11 rounded-full ${social.bg} flex items-center justify-center text-white shadow-lg transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:brightness-110`}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3 space-y-6">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-yellow-400">Navigation</h3>
            <ul className="space-y-4">
              {['Home', 'Services', 'Gallery', 'About', 'Contact'].map((item) => (
                <li key={item}>
                  <a 
                    href={item === 'Gallery' ? '/gallery' : `#${item.toLowerCase()}`}
                    className="text-white/40 hover:text-white text-sm font-medium transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-0 h-[1px] bg-yellow-400 group-hover:w-4 transition-all duration-300" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-4 space-y-6">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-yellow-400">Get in Touch</h3>
            <div className="space-y-6">
              <a href="tel:+918124787002" className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-yellow-400 border border-white/10 group-hover:bg-yellow-400 group-hover:text-black transition-all">
                  <FaPhoneAlt size={14} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/30">Phone</p>
                  <p className="text-sm font-bold">+91 81247 87002</p>
                </div>
              </a>

              <a href="mailto:crazycapturestudio@gmail.com" className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-yellow-400 border border-white/10 group-hover:bg-yellow-400 group-hover:text-black transition-all">
                  <FaEnvelope size={14} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/30">Email</p>
                  <p className="text-sm font-bold">crazycapturestudio@gmail.com</p>
                </div>
              </a>

              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-yellow-400 border border-white/10 transition-all">
                  <FaMapMarkerAlt size={14} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/30">Location</p>
                  <p className="text-sm font-bold leading-relaxed">Mangalam, Avinashi,<br />Tiruppur, Tamil Nadu</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/30 text-[11px] font-medium tracking-wide">
            © {currentYear} <span className="text-white">Crazy Capture Studio</span>. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="text-white/20 text-[10px] uppercase font-black tracking-widest">Powered by</span>
            <a 
              href="https://akwebflairtechnologies.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/60 hover:text-yellow-400 text-[11px] font-bold transition-all underline decoration-white/10 underline-offset-4"
            >
              AK WebFlair Technologies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
