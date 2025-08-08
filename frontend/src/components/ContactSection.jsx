import { useState, useRef, useEffect } from "react";
import { useInView, motion } from "framer-motion";
import { Mail, Phone, User, CalendarDays, MessageCircle, CheckCircle } from "lucide-react";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', eventName: '', comment: '', captcha: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [captchaQuestion, setCaptchaQuestion] = useState("");
  const [captchaAnswer, setCaptchaAnswer] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  // Generate a simple captcha
  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const a = Math.floor(Math.random() * 10);
    const b = Math.floor(Math.random() * 10);
    setCaptchaQuestion(`${a} + ${b} = ?`);
    setCaptchaAnswer((a + b).toString());
  };

  const handleInputChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate captcha
    if (formData.captcha !== captchaAnswer) {
      alert("❌ Incorrect CAPTCHA. Try again.");
      generateCaptcha();
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        setShowPopup(true);
        setFormSubmitted(true);
        setFormData({ name: '', email: '', phone: '', eventName: '', comment: '', captcha: '' });
        generateCaptcha(); // Reset captcha
      }
    } catch (err) {
      console.error('❌ Form error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-16 px-6 bg-transparent text-white backdrop-blur-lg"
      style={{ background: "rgba(10, 10, 25, 0.6)" }}
    >
      {/* Corner Decorative Box */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/10 rounded-bl-full blur-2xl" />

      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-yellow-400 mb-4"
        >
          Get in Touch
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="text-lg text-gray-200 mb-10"
        >
          We’d love to hear about your event or project.
        </motion.p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto grid gap-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="relative">
            <User className="absolute left-3 top-4 text-yellow-400" size={18} />
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full pl-10 bg-white/10 p-4 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-3 top-4 text-yellow-400" size={18} />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full pl-10 bg-white/10 p-4 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="relative">
            <Phone className="absolute left-3 top-4 text-yellow-400" size={18} />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full pl-10 bg-white/10 p-4 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div className="relative">
            <CalendarDays className="absolute left-3 top-4 text-yellow-400" size={18} />
            <input
              type="text"
              name="eventName"
              placeholder="Event Name (optional)"
              value={formData.eventName}
              onChange={handleInputChange}
              className="w-full pl-10 bg-white/10 p-4 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
        </div>

        <div className="relative">
          <MessageCircle className="absolute left-3 top-4 text-yellow-400" size={18} />
          <textarea
            name="comment"
            rows="4"
            placeholder="Your Message"
            value={formData.comment}
            onChange={handleInputChange}
            className="w-full pl-10 bg-white/10 p-4 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
        </div>

        {/* CAPTCHA */}
        <div className="grid md:grid-cols-2 gap-4 items-center">
          <p className="text-sm text-gray-300">{captchaQuestion}</p>
          <input
            type="text"
            name="captcha"
            placeholder="Your Answer"
            value={formData.captcha}
            onChange={handleInputChange}
            className="bg-white/10 p-4 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
        </div>

        <motion.button
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={loading}
          className="bg-yellow-400 text-black font-semibold py-3 px-6 rounded-lg hover:bg-yellow-500 transition"
        >
          {loading ? "Sending..." : "Submit"}
        </motion.button>
      </form>

      {/* ✅ Success Popup */}
      {showPopup && (
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="fixed top-0 left-0 w-full h-full bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <div className="bg-white rounded-2xl p-8 text-center text-black max-w-sm shadow-2xl">
            <CheckCircle className="text-green-500 mx-auto mb-4" size={48} />
            <h3 className="text-xl font-bold mb-2">Success!</h3>
            <p className="text-sm mb-4">Your message has been sent successfully. 🎉</p>
            <button
              onClick={() => setShowPopup(false)}
              className="mt-2 bg-yellow-400 text-black px-6 py-2 rounded-lg hover:bg-yellow-500 transition"
            >
              Close
            </button>
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default ContactSection;
