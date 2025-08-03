import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Phone, Mail, MapPin, Facebook, Instagram, Twitter, Send, CheckCircle
} from 'lucide-react';
import logo from '../assets/Crazylogo.png';

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', eventName: '', comment: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        setFormSubmitted(true);
        setFormData({
          name: '', email: '', phone: '', eventName: '', comment: ''
        });
        setTimeout(() => setFormSubmitted(false), 4000);
      }
    } catch (err) {
      console.error('❌ Form error:', err);
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    { icon: Phone, title: 'Phone', value: '+91 96007 32162', href: 'tel:+919600732162' },
    { icon: Mail, title: 'Email', value: 'kavinmm200@gmail.com', href: 'mailto:kavinmm200@gmail.com' },
    { icon: MapPin, title: 'Address', value: 'Tiruppur, Tamil Nadu, India', href: '#' },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
  ];

  return (
    <>
      <section id="contact" className="relative bg-transparent text-white py-16 z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <img
            src="https://www.svgrepo.com/show/303397/envelope-send-mail.svg"
            alt="bg pattern"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-6"
          >
            <img src={logo} alt="Crazy Capture Logo" className="mx-auto w-20 object-contain" />
          </motion.div>

          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Contact <span className="text-[#FFCB05]">Us</span></h2>
            <p className="text-md text-[#B0B0B0] max-w-xl mx-auto">
              Have a project in mind? Let's bring it to life.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full max-w-md mx-auto"
            >
              <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4 text-center">Send a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {[
                    { name: 'name', label: 'Your Name' },
                    { name: 'email', label: 'Your Email', type: 'email' },
                    { name: 'phone', label: 'Phone Number' },
                    { name: 'eventName', label: 'Event Name' },
                    { name: 'comment', label: 'Message', isTextArea: true }
                  ].map((field) => (
                    <div key={field.name}>
                      <label htmlFor={field.name} className="block text-sm mb-1">
                        {field.label}
                      </label>
                      {field.isTextArea ? (
                        <textarea
                          id={field.name}
                          name={field.name}
                          rows={4}
                          value={formData[field.name]}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded text-sm"
                          placeholder={field.label}
                        />
                      ) : (
                        <input
                          type={field.type || 'text'}
                          id={field.name}
                          name={field.name}
                          value={formData[field.name]}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded text-sm"
                          placeholder={field.label}
                        />
                      )}
                    </div>
                  ))}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#FFCB05] text-black py-2 rounded font-medium hover:bg-[#e6b800] transition"
                  >
                    {loading ? 'Sending...' : 'Send Message'}
                    <Send className="inline ml-2 w-4 h-4" />
                  </button>
                </form>

                {formSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="mt-4 p-3 rounded-md bg-green-900/30 text-green-300 border border-green-500 text-sm flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4" /> Message Sent!
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-10"
            >
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start">
                    <info.icon className="w-5 h-5 text-[#FFCB05] mt-1" />
                    <div className="ml-3">
                      <h4 className="text-sm font-medium text-white">{info.title}</h4>
                      <a href={info.href} className="text-[#B0B0B0] hover:text-[#FFCB05] text-sm">
                        {info.value}
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 bg-white/5 border border-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-[#B0B0B0] hover:text-[#FFCB05]"
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-transparent text-[#B0B0B0] text-xs py-4 text-center border-t border-white/10">
        <p>© {new Date().getFullYear()} Crazy Capture. All rights reserved.</p>
        <p className="mt-1">
          Developed by{' '}
          <a
            href="https://github.com/yourgithub"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#FFCB05] hover:underline"
          >
            Ak WebFlair Technologies
          </a>
        </p>
      </footer>
    </>
  );
};

export default ContactSection;
