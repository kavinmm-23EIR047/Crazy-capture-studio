import { useState, useRef, useEffect } from "react";
import { useInView, motion } from "framer-motion";
import { Mail, Phone, User, CalendarDays, MessageCircle, CheckCircle } from "lucide-react";

export default function ContactSection() {
  const sectionRef = useRef(null);
  const isInView   = useInView(sectionRef, { once: true, margin: "-80px" });

  const [form, setForm]           = useState({ name:"", email:"", phone:"", eventName:"", comment:"", captcha:"" });
  const [loading, setLoading]     = useState(false);
  const [question, setQuestion]   = useState("");
  const [answer, setAnswer]       = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const genCaptcha = () => {
    const a = Math.floor(Math.random() * 10);
    const b = Math.floor(Math.random() * 10);
    setQuestion(`${a} + ${b} = ?`);
    setAnswer((a + b).toString());
  };

  useEffect(() => { genCaptcha(); }, []);

  const onChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (form.captcha !== answer) { alert("❌ Incorrect CAPTCHA."); genCaptcha(); return; }
    setLoading(true);
    try {
      const res  = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setShowPopup(true);
        setForm({ name:"", email:"", phone:"", eventName:"", comment:"", captcha:"" });
        genCaptcha();
      } else {
        alert(data.message || "Something went wrong.");
      }
    } catch {
      alert("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const FIELDS = [
    { name:"name",    label:"Full Name",  icon:User,         type:"text",  required:true,  placeholder:"Your full name" },
    { name:"email",   label:"Email",      icon:Mail,         type:"email", required:true,  placeholder:"your@email.com" },
    { name:"phone",   label:"Phone",      icon:Phone,        type:"tel",   required:false, placeholder:"+91 00000 00000" },
  ];

  return (
    <section id="contact" ref={sectionRef} className="section bg-transparent">
      <div className="container">
        <div className="max-w-4xl mx-auto">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="section-header text-center"
          >
            <p className="eyebrow">Get In Touch</p>
            <div className="divider-gold mx-auto" />
            <h2 className="display-md text-white mt-4">
              Let's <span className="text-[#E8B84B]">Connect</span>
            </h2>
            <p className="body-lg text-white/50 mt-4 max-w-xl mx-auto">
              Tell us about your vision and we'll capture it beautifully.
            </p>
          </motion.div>

          {/* Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.15 }}
            className="relative"
          >
            {/* Corner brackets */}
            {["tl","tr","bl","br"].map(p => {
              const styles = {
                tl:"top-0 left-0 border-t-2 border-l-2 rounded-tl-2xl",
                tr:"top-0 right-0 border-t-2 border-r-2 rounded-tr-2xl",
                bl:"bottom-0 left-0 border-b-2 border-l-2 rounded-bl-2xl",
                br:"bottom-0 right-0 border-b-2 border-r-2 rounded-br-2xl",
              };
              return (
                <div key={p}
                  className={`absolute -m-3 w-10 h-10 sm:w-12 sm:h-12 border-[#E8B84B]/30 ${styles[p]} transition-colors duration-500 hover:border-[#E8B84B]`}
                />
              );
            })}

            <form
              onSubmit={onSubmit}
              className="glass rounded-3xl p-6 sm:p-8 md:p-10 border border-white/10 shadow-2xl"
            >
              {/* REC indicator */}
              <div className="flex items-center justify-between mb-7 pb-5 border-b border-white/8
                              text-[10px] font-medium font-mono text-[#E8B84B] tracking-widest">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.7)]" />
                  <span className="text-red-400">REC 001</span>
                </div>
                <span className="hidden sm:block text-white/30">4K RAW // SECURE CHANNEL</span>
                <span className="text-white/30">100% ■</span>
              </div>

              {/* Text inputs */}
              <div className="grid sm:grid-cols-2 gap-x-8 sm:gap-x-10 gap-y-7 mb-7">
                {FIELDS.map(({ name, label, icon: Icon, type, required, placeholder }) => (
                  <div key={name} className="group/f relative">
                    <label className="eyebrow text-[10px] text-[#E8B84B] mb-2 block">{label}</label>
                    <div className="relative">
                      <Icon size={14} className="absolute left-0 top-1/2 -translate-y-1/2 text-white/30
                                                 group-focus-within/f:text-[#E8B84B] transition-colors" />
                      <input
                        type={type} name={name} value={form[name]}
                        onChange={onChange} placeholder={placeholder}
                        required={required}
                        className="input-field"
                      />
                    </div>
                  </div>
                ))}

                {/* Service select */}
                <div className="group/f relative">
                  <label className="eyebrow text-[10px] text-[#E8B84B] mb-2 block">Service Type</label>
                  <div className="relative">
                    <CalendarDays size={14} className="absolute left-0 top-1/2 -translate-y-1/2 text-white/30
                                                        group-focus-within/f:text-[#E8B84B] transition-colors pointer-events-none" />
                    <select
                      name="eventName" value={form.eventName} onChange={onChange}
                      required
                      className="input-field appearance-none cursor-pointer"
                      style={{ background: "transparent" }}
                    >
                      <option value="" className="bg-[#111]">Select Service</option>
                      {["Baby Shoot","Wedding Photography","Baby Shower","Corporate & Ads","Puberty Shoot","Birthday Shoot","Others"].map(s => (
                        <option key={s} value={s} className="bg-[#111]">{s}</option>
                      ))}
                    </select>
                    <span className="absolute right-0 top-1/2 -translate-y-1/2 text-[#E8B84B]/40 pointer-events-none">▼</span>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className="group/f relative mb-7">
                <label className="eyebrow text-[10px] text-[#E8B84B] mb-2 block">Message</label>
                <div className="relative">
                  <MessageCircle size={14} className="absolute left-0 top-3.5 text-white/30
                                                       group-focus-within/f:text-[#E8B84B] transition-colors" />
                  <textarea
                    name="comment" rows={4} value={form.comment} onChange={onChange}
                    placeholder="Describe your vision..." required
                    className="input-field resize-none"
                    style={{ paddingTop: "0.75rem" }}
                  />
                </div>
              </div>

              {/* Captcha + Submit */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                <div className="flex items-center gap-3 glass px-4 py-3 rounded-xl border border-white/10 shrink-0">
                  <span className="text-[10px] text-white/50 uppercase tracking-widest">Check:</span>
                  <span className="text-[#E8B84B] font-black text-base font-mono">{question}</span>
                  <input
                    type="text" name="captcha" value={form.captcha} onChange={onChange}
                    className="w-14 bg-white/10 border-b-2 border-[#E8B84B] text-center py-1
                               text-[#E8B84B] text-base font-bold outline-none"
                    required
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                  type="submit" disabled={loading}
                  className="btn btn-primary btn-lg w-full sm:w-auto gap-3"
                >
                  {loading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 0.9, ease: "linear" }}
                      className="w-5 h-5 rounded-full border-2 border-t-black border-l-black border-b-transparent border-r-transparent"
                    />
                  ) : (
                    <>
                      <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>

        </div>
      </div>

      {/* Success popup */}
      {showPopup && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[500] p-4"
        >
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 280, damping: 22 }}
            className="glass border border-[#E8B84B]/30 rounded-3xl p-8 sm:p-10 text-center max-w-sm w-full shadow-2xl relative"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#E8B84B] rounded-t-3xl" />
            <CheckCircle size={56} className="text-[#E8B84B] mx-auto mb-5" />
            <h3 className="heading-lg text-white mb-3">Message Sent!</h3>
            <p className="text-white/50 text-sm font-light mb-7">
              Our crew will get back to you shortly. Thank you!
            </p>
            <button onClick={() => setShowPopup(false)} className="btn btn-primary w-full justify-center">
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
