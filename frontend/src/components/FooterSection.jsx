import { FaInstagram, FaWhatsapp, FaFacebook } from "react-icons/fa";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import logo from "../assets/Crazylogo.png";

const FooterSection = () => {
  return (
    <footer className="w-full bg-transparent text-gray-300 pt-10 px-6">
      <div className="max-w-screen-xl mx-auto grid md:grid-cols-4 gap-10 pb-10 border-b border-gray-700">
        
        {/* Logo & Tagline */}
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
      <FaPhoneAlt size={16} className="text-yellow-400" />
      <a
        href="tel:+918124787002"
        className="hover:underline hover:text-yellow-300 transition-colors"
      >
        +91 81247 87002
      </a>
    </li>
    <li className="flex justify-center md:justify-start items-center gap-2">
      <FaEnvelope size={16} className="text-yellow-400" />
      <a
        href="mailto:crazycapturestudio@gmail.com"
        className="hover:underline hover:text-yellow-300 transition-colors"
      >
        crazycapturestudio@gmail.com
      </a>
    </li>
    <li className="flex justify-center md:justify-start items-center gap-2">
      <FaMapMarkerAlt size={16} className="text-yellow-400" />
      <a
        href="https://www.google.com/maps?q=Kumar+Nagar,+Tiruppur"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline hover:text-yellow-300 transition-colors"
      >
        Kumar Nagar, Tiruppur
      </a>
    </li>
  </ul>
</div>




      {/* Follow Us */}
<div className="text-center md:text-left">
  <h3 className="text-lg font-semibold text-yellow-400 mb-4">Follow Us</h3>
  <div className="flex justify-center md:justify-start gap-4 mt-1">
    <a
      href="https://instagram.com"
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 flex items-center justify-center rounded-full transition hover:scale-110"
      style={{ backgroundColor: "#E1306C" }}
    >
      <FaInstagram size={22} />
    </a>
    <a
      href="https://wa.me/919600732162"
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 flex items-center justify-center rounded-full transition hover:scale-110"
      style={{ backgroundColor: "#25D366" }}
    >
      <FaWhatsapp size={22} />
    </a>
    <a
      href="https://facebook.com"
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 flex items-center justify-center rounded-full transition hover:scale-110"
      style={{ backgroundColor: "#1877F2" }}
    >
      <FaFacebook size={22} />
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
