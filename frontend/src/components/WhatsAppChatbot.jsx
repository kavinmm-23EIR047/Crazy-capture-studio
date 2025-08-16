import React, { useEffect, useState } from "react";

const WhatsAppChatbot = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const phoneNumber = "918124787002";

  const sendToWhatsApp = (text) => {
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${phoneNumber}?text=${encoded}`, "_blank");
  };

  useEffect(() => {
    const timer = setTimeout(() => setOpen(true), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
{/* Chat Window */}
<div
  className={`fixed bottom-1/4 right-2 sm:right-12 
    w-[78%] xs:w-[70%] sm:w-80 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl
    overflow-hidden transition-all duration-300 z-50 transform
    ${open ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0 pointer-events-none"}`}
  style={{ animation: open ? "slideUp 0.35s ease-out" : "none" }}
>


        {/* Header */}
        <div className="bg-gradient-to-r from-[#25D366] to-[#1ebe5d] px-2 sm:px-4 py-2 sm:py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4712/4712035.png"
              alt="Chatbot"
              className="w-5 h-5 sm:w-8 sm:h-8 animate-bounce"
            />
            <div>
              <h4 className="font-semibold text-sm sm:text-lg text-white">
                Crazy Capture Studio
              </h4>
              <span className="text-xs sm:text-sm text-white/90">
                Typically replies in minutes
              </span>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="text-lg sm:text-2xl font-bold text-white/90 hover:text-yellow-300"
          >
            ×
          </button>
        </div>

        {/* Chat Body */}
        <div className="p-2 sm:p-3 space-y-2 sm:space-y-3 max-h-52 sm:max-h-64 overflow-y-auto custom-scroll">
          <div className="bg-white/20 text-white p-2 rounded-lg w-fit max-w-[90%] text-xs sm:text-base">
            👋 Hi! How can we help you today?
          </div>

          {[
            "📸 I want to book a photoshoot",
            "🎉 Do you cover events?",
            "💰 Please send me pricing details",
          ].map((msg, i) => (
            <div
              key={i}
              onClick={() => sendToWhatsApp(msg)}
              className="cursor-pointer bg-[#25D366] text-white font-medium px-2 sm:px-3 py-1 sm:py-2 rounded-lg w-fit max-w-[90%] text-xs sm:text-base hover:bg-[#1ebe5d] transition"
            >
              {msg}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="bg-white/10 p-2 flex items-center gap-2">
          <input
            type="text"
            placeholder="Type a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 px-2 sm:px-3 py-1 sm:py-2 rounded-full border border-white/30 bg-white/10 text-white placeholder-white/60 text-xs sm:text-base focus:outline-none focus:ring-2 focus:ring-[#25D366]"
          />
          <button
            onClick={() => {
              if (message.trim()) sendToWhatsApp(message);
              setMessage("");
            }}
            className="bg-[#25D366] hover:bg-[#1ebe5d] text-white px-3 sm:px-4 py-1 sm:py-2 rounded-full shadow-md text-xs sm:text-base"
          >
            ➤
          </button>
        </div>
      </div>

      {/* Styles */}
      <style>
        {`
          @keyframes slideDown {
            from { transform: translateY(-20px) scale(0.95); opacity: 0; }
            to { transform: translateY(0) scale(1); opacity: 1; }
          }
          .custom-scroll::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scroll::-webkit-scrollbar-thumb {
            background: rgba(255,255,255,0.3);
            border-radius: 10px;
          }
        `}
      </style>
    </>
  );
};

export default WhatsAppChatbot;
