import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  MessageCircle,
} from "lucide-react";
import logo from "../assets/Crazylogo.png";

const FooterSection = () => {
  return (
    <footer className="w-full bg-transparent text-gray-300 pt-10 px-6">
      <div className="max-w-screen-xl mx-auto grid md:grid-cols-4 gap-10 pb-10 border-b border-gray-700">

        {/* Logo & Tagline - Centered on mobile */}
        <div className="space-y-4 text-center md:text-left flex flex-col items-center md:items-start">
          <img src={logo} alt="Logo" className="h-16" />
          <p className="text-sm text-gray-400 max-w-xs">
            Capturing Memories, Creating Stories.
          </p>
        </div>

        {/* Quick Links */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold text-yellow-400 mb-4">Quick Links</h3>
          <ul className="space-y-2">
            {['Home', 'About', 'Services', 'Gallery', 'Testimonials', 'Contact'].map((item) => (
              <li key={item}>
                <a href={`#${item.toLowerCase()}`} className="hover:text-yellow-300 transition">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold text-yellow-400 mb-4">Contact Us</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex justify-center md:justify-start items-center gap-2">
              <Phone size={18} className="text-yellow-400" /> +91 96007 32162
            </li>
            <li className="flex justify-center md:justify-start items-center gap-2">
              <Mail size={18} className="text-yellow-400" /> kavinmm200@gmail.com
            </li>
            <li className="flex justify-center md:justify-start items-center gap-2">
              <MapPin size={18} className="text-yellow-400" /> Tiruppur, Tamil Nadu
            </li>
          </ul>
        </div>

        {/* Follow Us */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold text-yellow-400 mb-4">Follow Us</h3>
          <div className="flex justify-center md:justify-start gap-4 mt-2">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full bg-[#1877F2] text-white hover:scale-110 transition"
            >
              <Facebook size={20} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500 text-white hover:scale-110 transition"
            >
              <Instagram size={20} />
            </a>
            <a
              href="https://wa.me/919600732162"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full bg-[#25D366] text-white hover:scale-110 transition"
            >
              <MessageCircle size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Credits */}
      <div className="text-center text-sm text-gray-500 pt-6 pb-4">
  © {new Date().getFullYear()}{" "}
  <span className="text-white font-medium">Crazy Capture Studio</span>. All Rights Reserved.
  <br />
  <span className="text-xs text-gray-400">
    Developed by{" "}
    <a
      href="https://akwebflairtechnologies.vercel.app/"
      target="_blank"
      rel="noopener noreferrer"
      className="underline text-blue-400 hover:text-blue-200"
    >
      AK WebFlair Technologies
    </a>
  </span>
</div>

    </footer>
  );
};

export default FooterSection;
