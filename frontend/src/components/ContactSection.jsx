import { useState, useRef, useEffect } from "react";
import { useInView, motion } from "framer-motion";
import {
  Mail, Phone, User, CalendarDays,
  MessageCircle, CheckCircle, Battery, Aperture, Clock
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
  const [timecode, setTimecode] = useState("00:00:00:00");

  useEffect(() => { 
    generateCaptcha();
    const timer = setInterval(() => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      const s = String(now.getSeconds()).padStart(2, '0');
      const f = String(Math.floor(Math.random() * 60)).padStart(2, '0');
      setTimecode(`${h}:${m}:${s}:${f}`);
    }, 40);
    return () => clearInterval(timer);
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
        setLoading(false);
      } else {
        alert(data.message || "Something went wrong. Try again.");
        setLoading(false);
      }
    } catch (err) {
      console.error("❌ Form error:", err);
      alert("Network error. Please try again later.");
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-12 md:py-24 px-4 bg-transparent text-white overflow-hidden"
    >
      {/* Background HUD Decor */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center">
        <Aperture className="w-[800px] h-[800px] animate-spin-slow" />
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-8 md:mb-16 text-center md:text-left"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-8">
            <div>
              <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-[#E8B84B] mb-2 md:mb-4">Transmission Channel</p>
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-white font-heading tracking-tighter uppercase leading-tight">
                Let's <span className="gradient-text">Connect</span>
              </h2>
              <div className="w-16 md:w-24 h-[3px] md:h-[4px] bg-[#E8B84B] rounded-full mt-2 md:mt-4 mx-auto md:mx-0" />
            </div>
            
            <div className="hidden md:block text-right">
              <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest font-body">Data Stream Status</p>
              <p className="text-[#E8B84B] font-mono text-xl">CONNECTED // ENCRYPTED</p>
            </div>
          </div>
        </motion.div>

        {/* Camera Style Form Container */}
        <div className="max-w-4xl mx-auto relative group">
          {/* Corner Brackets */}
          <div className="absolute -top-2 -left-2 md:-top-4 md:-left-4 w-6 h-6 md:w-12 md:h-12 border-t-2 border-l-2 border-[#E8B84B]/40 group-hover:border-[#E8B84B] transition-colors duration-500" />
          <div className="absolute -top-2 -right-2 md:-top-4 md:-right-4 w-6 h-6 md:w-12 md:h-12 border-t-2 border-r-2 border-[#E8B84B]/40 group-hover:border-[#E8B84B] transition-colors duration-500" />
          <div className="absolute -bottom-2 -left-2 md:-bottom-4 md:-left-4 w-6 h-6 md:w-12 md:h-12 border-b-2 border-l-2 border-[#E8B84B]/40 group-hover:border-[#E8B84B] transition-colors duration-500" />
          <div className="absolute -bottom-2 -right-2 md:-bottom-4 md:-right-4 w-6 h-6 md:w-12 md:h-12 border-b-2 border-r-2 border-[#E8B84B]/40 group-hover:border-[#E8B84B] transition-colors duration-500" />

          <form
            onSubmit={handleSubmit}
            className="relative bg-white/[0.04] border-2 border-white/10 backdrop-blur-3xl rounded-xl p-5 md:p-10 shadow-2xl overflow-hidden"
          >
            {/* Top HUD Row */}
            <div className="flex justify-between items-center mb-6 md:mb-10 text-[9px] md:text-xs font-bold font-mono text-[#E8B84B] tracking-widest border-b border-white/10 pb-3 md:pb-4">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 md:w-2.5 md:h-2.5 bg-red-600 rounded-full animate-pulse" />
                REC 001
              </div>
              <div className="hidden sm:block">4K RAW // 60FPS</div>
              <div className="flex items-center gap-2">
                100% <Battery className="w-3 h-3 md:w-4 md:h-4 text-green-500" />
              </div>
            </div>

            {/* Input Grid */}
            <div className="grid md:grid-cols-2 gap-x-10 gap-y-5 md:gap-y-10">
              {/* Name */}
              <div className="relative group/field">
                <label className="text-[10px] md:text-xs font-black text-[#E8B84B] uppercase tracking-widest mb-1 md:mb-3 block font-heading">
                  Your Name
                </label>
                <div className="relative">
                  <User className="absolute left-0 top-1/2 -translate-y-1/2 text-white/50 group-focus-within/field:text-[#E8B84B] transition-colors" size={14} />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Full Name"
                    className="w-full bg-transparent border-b-2 border-white/20 py-2 md:py-3 pl-7 md:pl-10 text-white focus:outline-none focus:border-[#E8B84B] transition-all font-body placeholder:text-white/30 text-xs md:text-base"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="relative group/field">
                <label className="text-[10px] md:text-xs font-black text-[#E8B84B] uppercase tracking-widest mb-1 md:mb-3 block font-heading">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-0 top-1/2 -translate-y-1/2 text-white/50 group-focus-within/field:text-[#E8B84B] transition-colors" size={14} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email Address"
                    className="w-full bg-transparent border-b-2 border-white/20 py-2 md:py-3 pl-7 md:pl-10 text-white focus:outline-none focus:border-[#E8B84B] transition-all font-body placeholder:text-white/30 text-xs md:text-base"
                    required
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="relative group/field">
                <label className="text-[10px] md:text-xs font-black text-[#E8B84B] uppercase tracking-widest mb-1 md:mb-3 block font-heading">
                  Phone
                </label>
                <div className="relative">
                  <Phone className="absolute left-0 top-1/2 -translate-y-1/2 text-white/50 group-focus-within/field:text-[#E8B84B] transition-colors" size={14} />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+91 00000 00000"
                    className="w-full bg-transparent border-b-2 border-white/20 py-2 md:py-3 pl-7 md:pl-10 text-white focus:outline-none focus:border-[#E8B84B] transition-all font-body placeholder:text-white/30 text-xs md:text-base"
                  />
                </div>
              </div>

              {/* Event Dropdown */}
              <div className="relative group/field">
                <label className="text-[10px] md:text-xs font-black text-[#E8B84B] uppercase tracking-widest mb-1 md:mb-3 block font-heading">
                  Service Type
                </label>
                <div className="relative">
                  <CalendarDays className="absolute left-0 top-1/2 -translate-y-1/2 text-white/50 group-focus-within/field:text-[#E8B84B] transition-colors pointer-events-none" size={14} />
                  <select
                    name="eventName"
                    value={formData.eventName}
                    onChange={handleInputChange}
                    className="w-full bg-transparent border-b-2 border-white/20 py-2 md:py-3 pl-7 md:pl-10 text-white focus:outline-none focus:border-[#E8B84B] transition-all font-body text-xs md:text-base appearance-none cursor-pointer"
                    required
                  >
                    <option value="" className="bg-[#111]">SELECT SERVICE</option>
                    <option value="Baby Shoot" className="bg-[#111]">Baby Shoot</option>
                    <option value="Wedding Photography" className="bg-[#111]">Wedding Photography</option>
                    <option value="Baby Shower" className="bg-[#111]">Baby Shower Photography</option>
                    <option value="Corporate" className="bg-[#111]">Corporate & Advertisement</option>
                    <option value="Puberty Shoot" className="bg-[#111]">Puberty Shoot</option>
                    <option value="Birthday Shoot" className="bg-[#111]">Birthday Shoot</option>
                    <option value="Others" className="bg-[#111]">Others / Custom Project</option>
                  </select>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-[#E8B84B] opacity-40 group-focus-within/field:opacity-100">
                    ▼
                  </div>
                </div>
              </div>
            </div>

            {/* Message */}
            <div className="relative group/field mt-6 md:mt-10">
              <label className="text-[10px] md:text-xs font-black text-[#E8B84B] uppercase tracking-widest mb-1 md:mb-3 block font-heading">
                Message
              </label>
              <div className="relative">
                <MessageCircle className="absolute left-0 top-3 text-white/50 group-focus-within/field:text-[#E8B84B] transition-colors" size={14} />
                <textarea
                  name="comment"
                  rows="3"
                  value={formData.comment}
                  onChange={handleInputChange}
                  placeholder="Describe your vision..."
                  className="w-full bg-transparent border-b-2 border-white/20 py-2 md:py-3 pl-7 md:pl-10 text-white focus:outline-none focus:border-[#E8B84B] transition-all font-body placeholder:text-white/30 text-xs md:text-base resize-none"
                  required
                />
              </div>
            </div>

            {/* Footer HUD Row */}
            <div className="flex flex-wrap justify-between items-center mt-6 md:mt-10 gap-4 md:gap-8">
              {/* Captcha */}
              <div className="flex items-center gap-3 bg-white/5 px-4 py-2 md:py-4 rounded-xl border border-white/10 w-full sm:w-auto">
                <div className="font-bold text-[10px] md:text-sm text-white/60 uppercase tracking-widest font-heading">Check:</div>
                <div className="text-[#E8B84B] font-black text-sm md:text-lg font-mono tracking-tighter">{captchaQuestion}</div>
                <input
                  type="text"
                  name="captcha"
                  value={formData.captcha}
                  onChange={handleInputChange}
                  className="w-14 md:w-20 bg-white/10 border-b-2 border-[#E8B84B] text-center py-1 md:py-2 text-[#E8B84B] focus:outline-none font-bold text-sm md:text-lg"
                  required
                />
              </div>

              {/* Timecode Decor */}
              <div className="hidden lg:block font-mono text-2xl text-white/30 font-bold">
                {timecode}
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto bg-[#E8B84B] text-black font-black px-8 md:px-12 py-4 md:py-5 rounded-xl hover:shadow-[0_0_40px_rgba(232,184,75,0.4)] transition-all flex items-center justify-center gap-3 md:gap-4 font-heading uppercase text-sm md:text-base group"
              >
                {loading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="w-6 h-6 border-2 border-t-black border-l-black border-b-transparent border-r-transparent rounded-full"
                  />
                ) : (
                  <>
                    <div className="w-3.5 h-3.5 bg-red-600 rounded-full animate-pulse shadow-[0_0_15px_rgba(220,38,38,0.8)]" />
                    SEND MESSAGE
                  </>
                )}
              </motion.button>
            </div>
          </form>
          
          {/* Technical Info Bottom */}
          <div className="mt-8 flex justify-between text-[8px] font-mono text-white/20 uppercase tracking-[0.3em]">
             <div>Crazy Capture Studio // Hub-01</div>
             <div>Signal Strength: 100% // Stable</div>
             <div>Studio ID: 8124787002</div>
          </div>
        </div>
      </div>

      {/* Success Popup */}
      {showPopup && (
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4"
        >
          <div className="bg-[#111] border border-[#E8B84B]/30 rounded-sm p-12 text-center max-w-sm shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#E8B84B]" />
            <CheckCircle className="text-[#E8B84B] mx-auto mb-6" size={64} />
            <h3 className="text-2xl font-black text-white font-heading mb-4 uppercase tracking-tighter">Transmission Successful</h3>
            <p className="text-white/60 text-xs mb-8 font-mono uppercase tracking-widest">Signal received. Our crew will debrief you shortly.</p>
            <button
              onClick={() => setShowPopup(false)}
              className="w-full bg-white text-black py-4 rounded-sm font-black text-xs uppercase tracking-widest hover:bg-[#E8B84B] transition-colors"
            >
              CLOSE CHANNEL
            </button>
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default ContactSection;
