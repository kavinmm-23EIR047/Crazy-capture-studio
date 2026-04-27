import React, { useRef, useState, useEffect, useCallback } from "react";
import {
  Camera, Trash2, Download, X, Check, RefreshCw,
  Heart, MessageCircle, Send, Bookmark, Aperture, Zap, ZapOff
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════
   CrazyCaptureBox — Canon UI + MediaPipe BG Removal
   Uses @mediapipe/selfie_segmentation for real-time
   body detection & background replacement in Passport mode.
═══════════════════════════════════════════════════════════ */

const MODES   = ["STANDARD", "INSTA", "PASSPORT"];
const FILTERS = [
  { label: "NORMAL", value: "none",                                            dot: "#888" },
  { label: "GOLD",   value: "contrast(110%) saturate(140%) brightness(105%)", dot: "#f5c842" },
  { label: "MONO",   value: "grayscale(100%) contrast(115%)",                 dot: "#ccc" },
  { label: "WARM",   value: "sepia(40%) saturate(120%) brightness(102%)",     dot: "#d4875a" },
];
const BG_COLORS = { blue: "#0058aa", white: "#f5f5f5" };

/* ── tiny LCD label ── */
const LCD = ({ children, className = "" }) => (
  <span style={{ fontFamily: "'Share Tech Mono',monospace" }}
    className={`tracking-widest text-[#c8f0a0] ${className}`}>
    {children}
  </span>
);

/* ─────────────────────────────────
   Helper: load external script once
───────────────────────────────── */
function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) { resolve(); return; }
    const s = document.createElement("script");
    s.src = src; s.async = true;
    s.onload = resolve; s.onerror = reject;
    document.head.appendChild(s);
  });
}

/* ═══════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════ */
export default function CrazyCaptureBox({ isOpen = true, onClose = () => {}, inline = false }) {
  const wrapRef    = useRef(null);
  const videoRef   = useRef(null);
  const canvasRef  = useRef(null);   // live composite shown in viewfinder
  const captureRef = useRef(null);   // hidden canvas for final snapshot
  const finalRef   = useRef(null);
  const rafRef     = useRef(null);
  const segRef     = useRef(null);   // MediaPipe instance
  const streamRef  = useRef(null);
  const timerRef   = useRef(null);

  const [mode,         setMode]         = useState("STANDARD");
  const [passportBg,   setPassportBg]   = useState("blue");
  const [filter,       setFilter]       = useState("none");
  const [count,        setCount]        = useState(3);
  const [counting,     setCounting]     = useState(false);
  const [captured,     setCaptured]     = useState(null);
  const [showConfirm,  setShowConfirm]  = useState(false);
  const [loading,      setLoading]      = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [privacy,      setPrivacy]      = useState(false);
  const [flash,        setFlash]        = useState(false);
  const [segReady,     setSegReady]     = useState(false);
  const [segLoading,   setSegLoading]   = useState(false);
  const [permissionDenied, setPermissionDenied] = useState(false);

  /* Refs mirror state to avoid stale closures in rAF */
  const modeRef       = useRef(mode);
  const filterRef     = useRef(filter);
  const passportBgRef = useRef(passportBg);
  useEffect(() => { modeRef.current = mode; },         [mode]);
  useEffect(() => { filterRef.current = filter; },     [filter]);
  useEffect(() => { passportBgRef.current = passportBg; }, [passportBg]);

  /* ─────────────────────────────────
     LOAD MEDIAPIPE (lazy, once)
  ───────────────────────────────── */
  const loadSeg = useCallback(async () => {
    if (segRef.current || segLoading) return;
    setSegLoading(true);
    try {
      await loadScript(
        "https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation@0.1/selfie_segmentation.js"
      );
      const seg = new window.SelfieSegmentation({
        locateFile: (f) =>
          `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation@0.1/${f}`,
      });
      seg.setOptions({ modelSelection: 1, selfieMode: true });
      // Store latest results on the instance itself
      seg.onResults((r) => { seg._last = r; });
      await seg.initialize();
      segRef.current = seg;
      setSegReady(true);
    } catch (e) {
      console.warn("MediaPipe load failed:", e);
    }
    setSegLoading(false);
  }, [segLoading]);

  /* ─────────────────────────────────
     CAMERA
  ───────────────────────────────── */
  const startCamera = useCallback(async () => {
    if (streamRef.current) return;
    try {
      const media = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });
      streamRef.current = media;
      if (videoRef.current) {
        videoRef.current.srcObject = media;
        videoRef.current.onloadedmetadata = async () => {
          try {
            await videoRef.current.play();
            setCameraActive(true);
            setPrivacy(false);
            setPermissionDenied(false);
            beginRenderLoop();
          } catch (e) {
            console.warn("Video play error:", e);
          }
        };
      }
    } catch (e) { 
      console.warn("Camera error:", e); 
      setPermissionDenied(true);
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (rafRef.current)   cancelAnimationFrame(rafRef.current);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    if (videoRef.current) videoRef.current.srcObject = null;
    setCameraActive(false);
  }, []);

  /* ─────────────────────────────────
     RENDER LOOP
  ───────────────────────────────── */
  const beginRenderLoop = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    const tick = async () => {
      const video  = videoRef.current;
      const canvas = canvasRef.current;
      if (!video || !canvas || !streamRef.current) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }
      if (video.readyState < 2) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      const vw = video.videoWidth  || 640;
      const vh = video.videoHeight || 480;
      if (canvas.width !== vw)  canvas.width  = vw;
      if (canvas.height !== vh) canvas.height = vh;

      const ctx  = canvas.getContext("2d");
      const curMode = modeRef.current;
      const curBg   = passportBgRef.current;
      const seg     = segRef.current;

      if (curMode === "PASSPORT" && seg) {
        if (seg._last) {
          /* ── Solid bg + segmented person ── */
          // 1. Fill background
          ctx.fillStyle = BG_COLORS[curBg];
          ctx.fillRect(0, 0, vw, vh);

          // 2. Build person layer on offscreen
          const off = new OffscreenCanvas(vw, vh);
          const oct = off.getContext("2d");
          // Flip horizontally (selfie)
          oct.save();
          oct.translate(vw, 0); oct.scale(-1, 1);
          oct.drawImage(video, 0, 0, vw, vh);
          oct.restore();
          // Cut out only the person using mask
          oct.globalCompositeOperation = "destination-in";
          oct.drawImage(seg._last.segmentationMask, 0, 0, vw, vh);

          // 3. Composite person over bg
          ctx.drawImage(off, 0, 0);

          // Feed next frame (non-blocking)
          seg.send({ image: video }).catch(() => {});
        } else {
          // No mask yet — plain mirrored video while we wait
          ctx.save();
          ctx.translate(vw, 0); ctx.scale(-1, 1);
          ctx.drawImage(video, 0, 0, vw, vh);
          ctx.restore();
          seg.send({ image: video }).catch(() => {});
        }
      } else {
        /* ── Standard / Insta — plain mirrored video ── */
        ctx.save();
        ctx.translate(vw, 0); ctx.scale(-1, 1);
        ctx.drawImage(video, 0, 0, vw, vh);
        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
  }, []);

  /* Restart render loop when relevant state changes */
  useEffect(() => {
    if (cameraActive) beginRenderLoop();
  }, [mode, passportBg, segReady]);

  /* Load MediaPipe when passport is selected */
  useEffect(() => {
    if (mode === "PASSPORT" && !segRef.current) loadSeg();
  }, [mode]);

  /* ─────────────────────────────────
     LIFECYCLE
  ───────────────────────────────── */
  useEffect(() => {
    if (isOpen || inline) startCamera();
    else stopCamera();
    return stopCamera;
  }, [isOpen, inline]);

  useEffect(() => {
    const h = () => {
      if (document.hidden) { stopCamera(); setPrivacy(true); }
      else if (!captured)   startCamera();
    };
    document.addEventListener("visibilitychange", h);
    return () => document.removeEventListener("visibilitychange", h);
  }, [captured]);

  /* IntersectionObserver — scroll privacy */
  useEffect(() => {
    if (!wrapRef.current) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) { stopCamera(); setPrivacy(true); }
        else if (!captured)      startCamera();
      },
      { threshold: 0.15 }
    );
    obs.observe(wrapRef.current);
    return () => obs.disconnect();
  }, [captured]);

  /* ─────────────────────────────────
     CAPTURE
  ───────────────────────────────── */
  const startCountdown = () => {
    if (!cameraActive || counting) return;
    setCount(3); setCounting(true);
    timerRef.current = setInterval(() => {
      setCount(p => {
        if (p <= 1) { clearInterval(timerRef.current); doCapture(); return 0; }
        return p - 1;
      });
    }, 1000);
  };

  const doCapture = async () => {
    const src = canvasRef.current;
    const dst = captureRef.current;
    if (!src || !dst) return;
    dst.width  = src.width;
    dst.height = src.height;
    const ctx = dst.getContext("2d");
    const f   = filterRef.current;
    if (f !== "none") ctx.filter = f;
    ctx.drawImage(src, 0, 0);
    ctx.filter = "none";
    
    const drawRR = (x, y, w, h, r) => {
      if (ctx.roundRect) ctx.roundRect(x, y, w, h, r);
      else ctx.rect(x, y, w, h);
    };

    // Add overlays if standard or insta
    if (modeRef.current === "STANDARD") {
      const logo = new Image();
      logo.src = "/Crazylogo.jpg";
      await new Promise(r => { logo.onload = r; logo.onerror = r; });
      ctx.save();
      
      const logoH = 28;
      let logoW = 28;
      if (logo.complete && logo.naturalHeight > 0) {
        logoW = logoH * (logo.naturalWidth / logo.naturalHeight);
      }
      
      const boxW = Math.max(180, 12 + logoW + 10 + 100);
      const boxH = 50;
      const x = dst.width - boxW - 16, y = dst.height - boxH - 16;
      
      ctx.fillStyle = "rgba(0,0,0,0.6)";
      ctx.beginPath(); drawRR(x, y, boxW, boxH, 12); ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,0.1)"; ctx.stroke();

      if (logo.complete && logo.naturalWidth > 0) {
        ctx.save();
        ctx.beginPath(); drawRR(x + 12, y + 11, logoW, logoH, 4); ctx.clip();
        ctx.drawImage(logo, x + 12, y + 11, logoW, logoH);
        ctx.restore();
      }

      ctx.fillStyle = "#fff";
      ctx.font = "900 13px 'Barlow Condensed', sans-serif";
      ctx.fillText("CRAZY CAPTURE", x + 12 + logoW + 10, y + 24);
      ctx.fillStyle = "#4ade80";
      ctx.font = "bold 11px sans-serif";
      ctx.fillText("● LIVE", x + 12 + logoW + 10, y + 40);
      ctx.restore();
    } else if (modeRef.current === "INSTA") {
      const logo = new Image();
      logo.src = "/Crazylogo.jpg";
      await new Promise(r => { logo.onload = r; logo.onerror = r; });
      
      ctx.save();
      const topH = 65;
      ctx.fillStyle = "rgba(255,255,255,0.95)";
      ctx.fillRect(0, 0, dst.width, topH);
      ctx.fillStyle = "rgba(0,0,0,0.1)";
      ctx.fillRect(0, topH - 1, dst.width, 1);
      
      const logoH = 32;
      let logoW = 32;
      if (logo.complete && logo.naturalHeight > 0) {
        logoW = logoH * (logo.naturalWidth / logo.naturalHeight);
      }

      if (logo.complete && logo.naturalWidth > 0) {
        ctx.save();
        ctx.beginPath(); drawRR(16, topH/2 - 16, logoW, logoH, 4); ctx.clip();
        ctx.drawImage(logo, 16, topH/2 - 16, logoW, logoH);
        ctx.restore();
      }
      
      const textX = 16 + logoW + 12;
      ctx.fillStyle = "#000";
      ctx.font = "bold 15px sans-serif";
      ctx.fillText("crazycapture_studio", textX, topH/2 - 2);
      ctx.fillStyle = "#ef4444";
      ctx.font = "bold 11px sans-serif";
      ctx.fillText("● LIVE NOW", textX, topH/2 + 14);
      
      ctx.fillStyle = "#ef4444";
      ctx.beginPath(); drawRR(dst.width - 65, topH/2 - 12, 50, 24, 4); ctx.fill();
      ctx.fillStyle = "#fff";
      ctx.font = "900 11px sans-serif";
      ctx.fillText("LIVE", dst.width - 53, topH/2 + 4);

      const botH = 80;
      const botY = dst.height - botH;
      ctx.fillStyle = "rgba(255,255,255,0.95)";
      ctx.fillRect(0, botY, dst.width, botH);
      ctx.fillStyle = "rgba(0,0,0,0.1)";
      ctx.fillRect(0, botY, dst.width, 1);
      
      ctx.font = "20px sans-serif";
      ctx.fillStyle = "#000";
      ctx.fillText("♡  💬  ⌲", 16, botY + 28);
      ctx.fillText("⚲", dst.width - 32, botY + 28); 

      ctx.font = "bold 14px sans-serif";
      ctx.fillText("Crazy Capture Studio", 16, botY + 52);
      ctx.fillStyle = "#6b7280";
      ctx.font = "13px sans-serif";
      ctx.fillText("Live photo preview ✨", 16, botY + 70);
      
      ctx.restore();
    }

    setCaptured(dst.toDataURL("image/jpeg", 0.95));
    setCounting(false);
    setShowConfirm(true);
    stopCamera();
  };

  const retake = async () => { setCaptured(null); setShowConfirm(false); await startCamera(); };

  const saveJPG = () => {
    if (!captured) return;
    const link = document.createElement("a");
    link.href = captured;
    link.download = `CrazyCapture_${Date.now()}.jpg`;
    link.click();
  };

  const savePDF = async () => {
    if (!captured) return;
    try {
      setLoading(true); setShowConfirm(false);
      await loadScript("https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js");
      const img = new Image();
      img.src = captured;
      await new Promise(r => { img.onload = r; });
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF({
        orientation: img.width > img.height ? "landscape" : "portrait",
        unit: "px", format: [img.width, img.height],
      });
      pdf.addImage(captured, "JPEG", 0, 0, img.width, img.height);
      pdf.save(`CrazyCapture_${Date.now()}.pdf`);
      setLoading(false); setCaptured(null); await startCamera();
    } catch { setLoading(false); }
  };

  if (!isOpen && !inline) return null;

  const activeModeLabel   = mode;
  const activeFilterLabel = FILTERS.find(f => f.value === filter)?.label ?? "NORMAL";

  /* ─────────────────────────────────
     JSX
  ───────────────────────────────── */
  return (
    <div
      ref={wrapRef}
      className={inline
        ? "w-full flex items-center justify-center py-4"
        : "fixed inset-0 z-[999] bg-black/95 flex items-center justify-center backdrop-blur-xl p-4"
      }
    >
      {!inline && (
        <button onClick={() => { stopCamera(); onClose(); }}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 z-[200]">
          <X size={18} />
        </button>
      )}

      {/* ════ CANON BODY ════ */}
      <div className="cc-body">

        {/* Top bar */}
        <div className="cc-topbar">
          <div className="flex items-center gap-2">
            <Aperture size={13} className="text-[#c8f0a0]" />
            <LCD className="text-[10px]">CRAZY CAPTURE</LCD>
          </div>
          <LCD className="text-[9px] opacity-60">
            {activeModeLabel} · {activeFilterLabel}
            {mode === "PASSPORT" && (segLoading ? " · LOADING AI…" : segReady ? " · BG REMOVE ✓" : "")}
          </LCD>
        </div>

        {/* Lens housing */}
        <div className="cc-lens-housing">
          <div className="cc-rim-outer">
            <div className="cc-rim-inner">

              {/* ═══ VIEWFINDER ═══ */}
              <div className="cc-viewfinder" ref={finalRef}>

                {/* Privacy or Permission screen */}
                {permissionDenied && !captured && (
                  <div className="absolute inset-0 bg-black flex flex-col items-center justify-center gap-3 z-30">
                    <div className="w-14 h-14 rounded-full border-2 border-red-500/30 flex items-center justify-center">
                      <Camera size={24} className="text-red-400" />
                    </div>
                    <LCD className="text-[9px] text-red-400 opacity-80">PLEASE ALLOW CAMERA ACCESS</LCD>
                  </div>
                )}
                {(privacy || !cameraActive) && !permissionDenied && !captured && (
                  <div className="absolute inset-0 bg-black flex flex-col items-center justify-center gap-3 z-30">
                    <div className="w-14 h-14 rounded-full border-2 border-white/15 flex items-center justify-center">
                      <Camera size={24} className="text-white/25" />
                    </div>
                    <LCD className="text-[9px] opacity-40">LENS CAP ON · PRIVACY ACTIVE</LCD>
                  </div>
                )}

                {/* Live canvas */}
                {!captured && (
                  <canvas ref={canvasRef}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ filter: mode !== "PASSPORT" ? filter : "none" }}
                  />
                )}

                {/* Captured still */}
                {captured && (
                  <img src={captured} className="absolute inset-0 w-full h-full object-cover" />
                )}

                {/* STANDARD watermark */}
                {mode === "STANDARD" && !captured && cameraActive && (
                  <div className="absolute bottom-3 right-3 z-20 flex items-center gap-3 bg-black/60 px-4 py-2.5 rounded-xl border border-white/10 backdrop-blur-md">
                    <img
                      src="/Crazylogo.jpg"
                      alt="Crazy Capture"
                      className="h-8 w-auto object-contain rounded-sm"
                      draggable="false"
                    />
                    <div>
                      <p className="text-white text-[11px] font-black tracking-widest leading-none whitespace-nowrap">CRAZY CAPTURE</p>
                      <p className="text-green-400 text-[10px] tracking-widest leading-none mt-1.5">● LIVE</p>
                    </div>
                  </div>
                )}

                {/* INSTA overlay */}
                {mode === "INSTA" && !captured && (
                  <div className="absolute inset-0 flex flex-col pointer-events-none z-20">
                    <div className="bg-white/95 px-3 py-3 sm:py-2 flex items-center gap-3 border-b border-black/10 min-h-[58px] sm:min-h-[48px]">
                      <img
                        src="/Crazylogo.jpg"
                        alt="Crazy Capture"
                        className="h-8 w-auto object-contain rounded-sm border border-black/10 shrink-0"
                        draggable="false"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-black text-[12px] font-bold leading-none truncate">crazycapture_studio</p>
                        <p className="text-red-500 text-[10px] font-semibold tracking-widest leading-none mt-1.5">● LIVE NOW</p>
                      </div>
                      <div className="bg-red-500 text-white text-[9px] font-black px-2.5 py-1 rounded tracking-widest">LIVE</div>
                    </div>
                    <div className="flex-1" />
                    <div className="bg-white/95 px-3 py-3 sm:py-2 border-t border-black/10 min-h-[72px] sm:min-h-[58px]">
                      <div className="flex items-center gap-4 text-black mb-2">
                        <Heart size={16} /><MessageCircle size={16} /><Send size={16} />
                        <div className="flex-1" /><Bookmark size={16} />
                      </div>
                      <p className="text-black text-[10px] font-bold leading-none">Crazy Capture Studio</p>
                      <p className="text-gray-500 text-[9px] mt-1">Live photo preview ✨</p>
                    </div>
                  </div>
                )}

                {/* PASSPORT guide */}
                {mode === "PASSPORT" && !captured && cameraActive && (
                  <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center">
                    <div style={{
                      width:"38%", height:"62%",
                      border:"2px dashed rgba(255,255,255,0.55)",
                      borderRadius:"50%",
                    }}>
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black/70 text-white text-[8px] font-mono px-2 py-0.5 rounded tracking-widest whitespace-nowrap">
                        ALIGN FACE
                      </div>
                    </div>
                    {/* AI status badge */}
                    <div className="absolute top-3 left-3 bg-black/65 px-2 py-1 rounded-lg border border-white/10 backdrop-blur-md">
                      <LCD className="text-[8px]">
                        {segLoading ? "⏳ LOADING AI" : segReady ? "✓ BG REMOVED" : "PLAIN MODE"}
                      </LCD>
                    </div>
                    {/* BG color label */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/60 px-3 py-1 rounded-full border border-white/10 backdrop-blur-md">
                      <LCD className="text-[8px]">
                        BG: {passportBg.toUpperCase()}
                      </LCD>
                    </div>
                  </div>
                )}

                {/* Countdown */}
                {counting && (
                  <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/55 backdrop-blur-sm">
                    <div className="relative">
                      <div className="absolute inset-0 rounded-full bg-yellow-400/20 animate-ping scale-[2.5]" />
                      <span className="relative text-white font-black italic drop-shadow-2xl"
                        style={{ fontSize: "clamp(5rem,18vw,9rem)", lineHeight:1, fontFamily:"'Barlow Condensed',sans-serif" }}>
                        {count}
                      </span>
                    </div>
                  </div>
                )}

                {/* VF corner brackets */}
                <div className="vfc vfc-tl"/><div className="vfc vfc-tr"/>
                <div className="vfc vfc-bl"/><div className="vfc vfc-br"/>

                {/* Crosshair */}
                {!captured && cameraActive && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                    <div className="relative w-8 h-8">
                      <div className="absolute top-1/2 left-0 right-0 h-px bg-white/20" />
                      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/20" />
                    </div>
                  </div>
                )}

              </div>{/* /viewfinder */}
            </div>
          </div>
        </div>{/* /lens-housing */}

        {/* ════ CONTROL PANEL ════ */}
        <div className="cc-controls">

          {/* ROW 1 — MODE */}
          <div className="cc-ctrl-row">
            <LCD className="cc-ctrl-lbl">MODE</LCD>
            <div className="cc-mode-bar">
              {MODES.map(m => (
                <button key={m} onClick={() => setMode(m)}
                  className={`cc-mode-btn ${mode === m ? "cc-mode-btn--on" : ""}`}>
                  {m}
                </button>
              ))}
            </div>
            {/* Passport BG swatches */}
            <div className={`cc-swatches ${mode === "PASSPORT" ? "cc-swatches--show" : ""}`}>
              <button onClick={() => setPassportBg("blue")}
                className={`cc-swatch cc-swatch-blue ${passportBg === "blue" ? "cc-swatch--sel" : ""}`} />
              <button onClick={() => setPassportBg("white")}
                className={`cc-swatch cc-swatch-white ${passportBg === "white" ? "cc-swatch--sel" : ""}`} />
            </div>
          </div>

          <div className="cc-divider" />

          {/* ROW 2 — FILTER */}
          <div className="cc-ctrl-row">
            <LCD className="cc-ctrl-lbl">FILTER</LCD>
            <div className="cc-filter-bar">
              {FILTERS.map(f => (
                <button key={f.label} onClick={() => setFilter(f.value)}
                  className={`cc-filter-btn ${filter === f.value ? "cc-filter-btn--on" : ""}`}>
                  <span className="cc-filter-dot" style={{ background: f.dot }} />
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div className="cc-divider" />

          {/* ROW 3 — SHUTTER + STATUS */}
          <div className="cc-shutter-row">
            <div className="cc-shutter-area">
              <div className="cc-shutter-ring">
                <button disabled={!cameraActive || counting} onClick={startCountdown}
                  className="cc-shutter-btn">
                  <Camera size={20} className="text-black" />
                </button>
              </div>
              <div>
                <LCD className="text-[9px]">SHUTTER</LCD>
                <p style={{ fontFamily:"'Share Tech Mono',monospace" }} className="text-white/30 text-[8px] mt-0.5">
                  {cameraActive ? "READY" : "STANDBY"}
                </p>
              </div>
            </div>

            <button onClick={() => setFlash(p => !p)}
              className={`cc-flash-btn ${flash ? "cc-flash-btn--on" : ""}`}>
              {flash ? <Zap size={13}/> : <ZapOff size={13}/>}
              <LCD className="text-[8px]">{flash ? "FLASH ON" : "NO FLASH"}</LCD>
            </button>

            <div className="cc-status">
              {[
                { d: cameraActive ? "#4ade80" : "#444", t: cameraActive ? "CAM ON" : "CAM OFF" },
                { d: mode === "PASSPORT" && segReady ? "#c8f0a0" : mode === "PASSPORT" && segLoading ? "#f5c842" : "#444",
                  t: mode === "PASSPORT" ? (segReady ? "AI READY" : segLoading ? "LOADING" : "NO AI") : "STD MODE" },
                { d: "#c8f0a0", t: "JPEG · HQ" },
              ].map((s, i) => (
                <div key={i} className="cc-status-row">
                  <span className="cc-status-dot" style={{ background: s.d }} />
                  <LCD className="text-[8px]">{s.t}</LCD>
                </div>
              ))}
            </div>
          </div>

        </div>{/* /controls */}

        <div className="cc-strip">
          <LCD className="text-[7px] opacity-25">EOS CRAZY · DIGITAL STUDIO CAPTURE · BROWSER ONLY · NO SERVER UPLOAD</LCD>
        </div>

      </div>{/* /canon-body */}

      {/* ════ CONFIRM MODAL ════ */}
      {showConfirm && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/85 backdrop-blur-lg p-4">
          <div className="cc-confirm">
            {captured && (
              <div className="cc-confirm-preview">
                <img src={captured} className="w-full h-full object-cover" />
              </div>
            )}
            <div className="cc-confirm-body">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Check className="text-green-600" size={20} />
              </div>
              <h2 style={{ fontFamily:"'Barlow Condensed',sans-serif" }}
                className="text-black text-xl font-black uppercase tracking-tighter text-center mb-1">
                Perfect Capture
              </h2>
              <p className="text-gray-400 text-[9px] font-mono text-center mb-5 tracking-widest">
                {activeModeLabel} · {activeFilterLabel}
                {mode === "PASSPORT" && segReady ? " · BG REMOVED" : ""}
              </p>
              <div className="flex items-center gap-2">
                <button onClick={retake} className="cc-action-btn cc-action-retake flex-1">
                  <Trash2 size={14}/><span>RETAKE</span>
                </button>
                <button onClick={saveJPG} className="cc-action-btn cc-action-save flex-1">
                  <Download size={14}/><span>JPG</span>
                </button>
                <button onClick={savePDF} className="cc-action-btn cc-action-save flex-1">
                  {loading
                    ? <RefreshCw size={14} className="animate-spin"/>
                    : <><Download size={14}/><span>PDF</span></>
                  }
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hidden elements */}
      <video ref={videoRef} autoPlay muted playsInline className="hidden" />
      <canvas ref={captureRef} className="hidden" />

      {/* ════ STYLES ════ */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;700;900&family=Share+Tech+Mono&display=swap');

        .cc-body {
          width:100%; max-width:760px;
          background:linear-gradient(160deg,#2c2c2c 0%,#1a1a1a 45%,#222 100%);
          border-radius:20px; border:1px solid #383838;
          box-shadow:0 0 0 1px #111, 0 32px 80px rgba(0,0,0,0.85),
                     inset 0 1px 0 rgba(255,255,255,0.05);
          overflow:hidden; font-family:'Barlow Condensed',sans-serif;
        }
        .cc-topbar {
          background:#0e0e0e; border-bottom:1px solid #282828;
          padding:8px 16px; display:flex; align-items:center; justify-content:space-between;
        }
        .cc-lens-housing { padding:12px 16px 8px; background:linear-gradient(180deg,#1c1c1c,#242424); }
        .cc-rim-outer {
          border-radius:14px; padding:3px;
          background:linear-gradient(135deg,#3a3a3a,#111,#333,#111);
          box-shadow:0 4px 20px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.04);
        }
        .cc-rim-inner {
          border-radius:12px; padding:3px;
          background:linear-gradient(135deg,#222,#444,#1a1a1a);
          box-shadow:inset 0 2px 8px rgba(0,0,0,0.6);
        }
        .cc-viewfinder {
          position:relative; width:100%; aspect-ratio:4/3;
          background:#000; border-radius:9px; overflow:hidden;
        }
        .vfc { position:absolute; width:16px; height:16px; border-color:rgba(200,240,160,0.45); border-style:solid; z-index:15; pointer-events:none; }
        .vfc-tl { top:7px;    left:7px;   border-width:2px 0 0 2px; border-radius:3px 0 0 0; }
        .vfc-tr { top:7px;    right:7px;  border-width:2px 2px 0 0; border-radius:0 3px 0 0; }
        .vfc-bl { bottom:7px; left:7px;   border-width:0 0 2px 2px; border-radius:0 0 0 3px; }
        .vfc-br { bottom:7px; right:7px;  border-width:0 2px 2px 0; border-radius:0 0 3px 0; }
        .cc-controls {
          background:#191919; padding:12px 16px;
          border-top:1px solid #282828;
          display:flex; flex-direction:column; gap:8px;
        }
        .cc-ctrl-row { display:flex; align-items:center; gap:8px; flex-wrap:wrap; }
        .cc-ctrl-lbl { font-family:'Share Tech Mono',monospace; font-size:9px; color:#c8f0a0; letter-spacing:3px; min-width:44px; opacity:.65; }
        .cc-divider { height:1px; background:linear-gradient(90deg,transparent,#2e2e2e,transparent); }
        .cc-mode-bar {
          display:flex; gap:3px; flex:1;
          background:#111; border-radius:10px; padding:3px; border:1px solid #272727;
        }
        .cc-mode-btn {
          flex:1; padding:7px 2px; border-radius:7px;
          font-family:'Barlow Condensed',sans-serif; font-size:11px; font-weight:900;
          letter-spacing:1px; color:rgba(255,255,255,.3);
          background:transparent; border:none; cursor:pointer; transition:all .15s; white-space:nowrap;
        }
        .cc-mode-btn:hover { color:rgba(255,255,255,.6); }
        .cc-mode-btn--on { background:#f5c842; color:#000!important; box-shadow:0 2px 8px rgba(245,200,66,.4); }
        .cc-swatches { display:flex; gap:5px; overflow:hidden; max-width:0; opacity:0; transition:max-width .3s,opacity .3s; align-items:center; }
        .cc-swatches--show { max-width:70px; opacity:1; }
        .cc-swatch { width:20px; height:20px; border-radius:50%; border:2px solid transparent; cursor:pointer; transition:transform .15s,border-color .15s; flex-shrink:0; }
        .cc-swatch-blue  { background:#0058aa; }
        .cc-swatch-white { background:#f0f0f0; box-shadow:inset 0 0 0 1px #ccc; }
        .cc-swatch--sel  { border-color:#f5c842; transform:scale(1.15); }
        .cc-filter-bar { display:flex; gap:3px; flex:1; }
        .cc-filter-btn {
          display:flex; align-items:center; gap:4px; flex:1;
          padding:6px 4px; border-radius:8px;
          font-family:'Barlow Condensed',sans-serif; font-size:10px; font-weight:700;
          letter-spacing:.4px; color:rgba(255,255,255,.3);
          background:#111; border:1px solid #252525; cursor:pointer; transition:all .15s; white-space:nowrap; justify-content:center;
        }
        .cc-filter-btn:hover { border-color:#3a3a3a; color:rgba(255,255,255,.6); }
        .cc-filter-btn--on { background:#fff; color:#000!important; border-color:#fff; }
        .cc-filter-dot { width:5px; height:5px; border-radius:50%; flex-shrink:0; }
        .cc-shutter-row { display:flex; align-items:center; gap:10px; flex-wrap:wrap; }
        .cc-shutter-area { display:flex; align-items:center; gap:10px; }
        .cc-shutter-ring {
          width:56px; height:56px; border-radius:50%; padding:4px; flex-shrink:0;
          background:linear-gradient(135deg,#555,#222,#444);
          box-shadow:0 4px 14px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,.08);
        }
        .cc-shutter-btn {
          width:100%; height:100%; border-radius:50%;
          background:linear-gradient(135deg,#f5c842,#e6b800);
          border:none; cursor:pointer;
          display:flex; align-items:center; justify-content:center;
          box-shadow:0 2px 10px rgba(245,200,66,.5), inset 0 1px 0 rgba(255,255,255,.25);
          transition:transform .1s,box-shadow .1s;
        }
        .cc-shutter-btn:hover  { transform:scale(1.05); box-shadow:0 4px 18px rgba(245,200,66,.7); }
        .cc-shutter-btn:active { transform:scale(0.93); }
        .cc-shutter-btn:disabled { opacity:.35; cursor:not-allowed; }
        .cc-flash-btn {
          display:flex; align-items:center; gap:5px;
          background:#111; border:1px solid #272727; border-radius:8px; padding:6px 10px;
          cursor:pointer; color:rgba(255,255,255,.3); transition:all .15s;
        }
        .cc-flash-btn:hover { border-color:#3a3a3a; color:rgba(255,255,255,.5); }
        .cc-flash-btn--on { border-color:#f5c842; color:#f5c842; }
        .cc-status {
          display:flex; flex-direction:column; gap:4px;
          background:#111; border:1px solid #252525; border-radius:10px; padding:7px 10px; margin-left:auto;
        }
        .cc-status-row { display:flex; align-items:center; gap:6px; }
        .cc-status-dot { width:5px; height:5px; border-radius:50%; flex-shrink:0; }
        .cc-strip { background:#0d0d0d; border-top:1px solid #222; padding:5px 16px; text-align:center; }
        .cc-confirm {
          background:#fff; border-radius:24px; overflow:hidden; width:100%; max-width:340px;
          box-shadow:0 30px 80px rgba(0,0,0,0.8);
        }
        .cc-confirm-preview { width:100%; height:180px; overflow:hidden; }
        .cc-confirm-body { padding:0 20px 20px; }
        .cc-action-btn {
          display:flex; align-items:center; justify-content:center; gap:6px;
          padding:13px 8px; border-radius:13px; border:none; cursor:pointer;
          font-family:'Barlow Condensed',sans-serif; font-size:12px; font-weight:900;
          letter-spacing:1.5px; transition:all .15s;
        }
        .cc-action-retake { background:#f3f4f6; color:#555; }
        .cc-action-retake:hover { background:#e5e7eb; }
        .cc-action-save { background:#f5c842; color:#000; box-shadow:0 4px 14px rgba(245,200,66,.4); }
        .cc-action-save:hover { background:#e6b800; }

        /* Responsive */
        @media (max-width:479px) {
          .cc-body { border-radius:14px; width: 100%; max-width: 100%; overflow: hidden; }
          .cc-lens-housing { padding:7px 8px 5px; }
          .cc-viewfinder { aspect-ratio: 3/4; min-height: auto; }
          .cc-controls { padding:9px; gap:7px; }
          .cc-ctrl-lbl { min-width:34px; font-size:8px; }
          .cc-mode-btn { font-size:9px; padding:6px 1px; }
          .cc-filter-btn { font-size:8px; padding:5px 3px; }
          .cc-filter-dot { display:none; }
          .cc-shutter-ring { width:48px; height:48px; }
          .cc-status { padding:5px 7px; }
        }
        @media (min-width:480px) and (max-width:767px) {
          .cc-body { max-width:520px; margin:0 auto; }
        }
        @media (min-width:768px) {
          .cc-controls { flex-direction:row; align-items:center; flex-wrap:wrap; }
          .cc-ctrl-row { flex:1 1 200px; }
          .cc-divider { display:none; }
          .cc-shutter-row { flex:0 0 auto; }
          .cc-mode-btn { font-size:12px; }
          .cc-filter-btn { font-size:10px; }
        }
        @media (min-width:1024px) { .cc-body { max-width:760px; } }
      `}</style>
    </div>
  );
}