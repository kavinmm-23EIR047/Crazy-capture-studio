import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { X } from "lucide-react";

const QUICK_MSGS = [
  "Hi! I'd like to book a wedding shoot 📸",
  "Can I get pricing details?",
  "I want to enquire about baby shoot 👶",
  "Please share your portfolio",
];

export default function WhatsAppChatbot() {
  const [open,      setOpen]      = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const phone = "918124787002";

  /* Auto-open after 2.5s on first load, auto-close after 7s */
  useEffect(() => {
    if (dismissed) return;
    const openTimer  = setTimeout(() => setOpen(true),  2500);
    const closeTimer = setTimeout(() => setOpen(false), 7000);
    return () => { clearTimeout(openTimer); clearTimeout(closeTimer); };
  }, [dismissed]);   // only on mount

  const handleClose = () => {
    setOpen(false);
    setDismissed(true);   // don't auto-reopen after user manually closes
  };

  const handleToggle = () => {
    setOpen(p => !p);
    setDismissed(true);   // user is now in manual control
  };

  const send = (msg) => {
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, "_blank");
    setOpen(false);
    setDismissed(true);
  };

  return (
    <div className="fixed bottom-6 left-4 sm:left-6 z-[400]">
      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 10 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute bottom-16 left-0 w-72 sm:w-80 rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            style={{ background: "#1a1a2e" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#25D366]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <FaWhatsapp size={16} className="text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm leading-none">Crazy Capture Studio</p>
                  <p className="text-white/70 text-[10px] mt-0.5">Typically replies instantly</p>
                </div>
              </div>
              <button onClick={handleClose}
                className="text-white/70 hover:text-white transition-colors">
                <X size={16} />
              </button>
            </div>

            {/* Body */}
            <div className="p-4 space-y-3">
              <div className="bg-white/8 rounded-xl rounded-tl-none px-3.5 py-2.5">
                <p className="text-white/80 text-sm font-light">
                  👋 Hi! How can we help you today? Choose a quick message or type your own on WhatsApp.
                </p>
              </div>

              <div className="space-y-2">
                {QUICK_MSGS.map((msg) => (
                  <button
                    key={msg}
                    onClick={() => send(msg)}
                    className="w-full text-left text-sm text-white/70 hover:text-white font-light
                               px-3.5 py-2.5 rounded-xl border border-white/10 hover:border-[#25D366]/60
                               hover:bg-[#25D366]/10 transition-all duration-200"
                  >
                    {msg}
                  </button>
                ))}
              </div>

              <button
                onClick={() => send("Hi! I'd like to know more about your services.")}
                className="w-full btn bg-[#25D366] text-white hover:bg-[#1ebe5d] py-2.5 rounded-xl text-sm gap-2 justify-center"
              >
                <FaWhatsapp size={15} />
                Open WhatsApp
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.93 }}
        onClick={handleToggle}
        aria-label="WhatsApp Chat"
        className="w-13 h-13 w-[52px] h-[52px] rounded-full bg-[#25D366] text-white flex items-center justify-center
                   shadow-[0_4px_20px_rgba(37,211,102,0.45)] relative"
      >
        <AnimatePresence mode="wait">
          {open
            ? <motion.div key="x" initial={{rotate:-90,opacity:0}} animate={{rotate:0,opacity:1}} exit={{rotate:90,opacity:0}} transition={{duration:0.18}}>
                <X size={22} />
              </motion.div>
            : <motion.div key="wa" initial={{rotate:90,opacity:0}} animate={{rotate:0,opacity:1}} exit={{rotate:-90,opacity:0}} transition={{duration:0.18}}>
                <FaWhatsapp size={24} />
              </motion.div>
          }
        </AnimatePresence>
        {/* Ping ring */}
        {!open && (
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
        )}
      </motion.button>
    </div>
  );
}