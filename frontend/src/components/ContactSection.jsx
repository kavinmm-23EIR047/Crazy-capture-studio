import { useState, useRef, useEffect } from "react";
import { useInView, motion } from "framer-motion";
import {
  Mail, Phone, User, CalendarDays,
  MessageCircle, CheckCircle
} from "lucide-react";

const ContactSection = () => {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", eventName: "", comment: "", captcha: ""
  });
  const [loading, setLoading] = useState(false);
  const [captchaQuestion, setCaptchaQuestion] = useState("");
  const [captchaAnswer, setCaptchaAnswer] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => { generateCaptcha(); }, []);

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
    if (formData.captcha !== captchaAnswer) {
      alert("❌ Incorrect CAPTCHA. Try again.");
      generateCaptcha();
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        setShowPopup(true);
        setFormData({ name: "", email: "", phone: "", eventName: "", comment: "", captcha: "" });
        generateCaptcha();
      } else {
        alert(data.message || "Something went wrong. Try again.");
      }
    } catch (err) {
      console.error("❌ Form error:", err);
      alert("Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-16 px-4 sm:px-6 bg-transparent text-white"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent pointer-events-none" />

      {/* Hero with GIF */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto text-center mb-10"
      >
        <div className="mx-auto w-40 h-43 rounded-full bg-[#071a3d] flex items-center justify-center shadow-lg mb-4 overflow-hidden">
  <motion.img
    src="https://mir-s3-cdn-cf.behance.net/project_modules/source/edb8f056053335.5a01cb22f2786.gif"
    alt="Camera lens rotating animation"
    className="w-full h-full object-contain"
    initial={{ scale: 0.85, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.5, delay: 0.15 }}
  />
</div>


        <h2 className="text-3xl sm:text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-200">
          Let’s Connect
        </h2>
        <p className="text-gray-300 max-w-xl mx-auto mb-6">
          Have a creative idea or an upcoming event? Tell us the spark — we’ll handle the rest.
        </p>
      </motion.div>

      {/* Form */}
      <div ref={formRef} className="max-w-5xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-10 shadow-lg"
        >
          {/* ... form fields and button unchanged from previous version ... */}
          {/* Name & Email */}
          <div className="grid sm:grid-cols-2 gap-5">
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

          {/* Phone & Event Name */}
          <div className="grid sm:grid-cols-2 gap-5 mt-5">
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

          {/* Message */}
          <div className="relative mt-5">
            <MessageCircle className="absolute left-3 top-4 text-yellow-400" size={18} />
            <textarea
              name="comment"
              rows="5"
              placeholder="Your Message"
              value={formData.comment}
              onChange={handleInputChange}
              className="w-full pl-10 bg-white/10 p-4 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>

          {/* CAPTCHA */}
          <div className="grid sm:grid-cols-2 gap-4 items-center mt-5">
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
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            type="submit"
            disabled={loading}
            className="w-full mt-6 bg-gradient-to-r from-yellow-400 to-yellow-200 text-black font-semibold py-3 px-6 rounded-lg hover:shadow-lg hover:shadow-yellow-400/30 transition"
          >
            {loading ? "Sending..." : "Send Message"}
          </motion.button>
        </form>
      </div>

      {/* Success Popup */}
      {showPopup && (
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
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
