import { useState, useEffect } from "react";

const BG_IMAGE = "/images/flower.jpg";

const GALLERY = [
  { src: "/images/debuggingDucks.jpg", caption: "Debugging Ducks club showcase" },
  { src: "/images/teaching.png",       caption: "Python instruction session" },
  { src: "/images/ClassPhoto.png",     caption: "Class Photo" },
];

const AUTO_ADVANCE_MS = 6000;

export default function About() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setCurrent((i) => (i === GALLERY.length - 1 ? 0 : i + 1));
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(t);
  }, []);

  function prev() { setCurrent((i) => (i === 0 ? GALLERY.length - 1 : i - 1)); }
  function next() { setCurrent((i) => (i === GALLERY.length - 1 ? 0 : i + 1)); }
  function getIndex(offset) { return (current + offset + GALLERY.length) % GALLERY.length; }

  return (
    <div
      className="relative min-h-screen overflow-hidden pt-24 pb-16"
      style={{ backgroundImage: `url(${BG_IMAGE})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#0b1f1e]/90 via-[#0f2e2a]/80 to-teal-900/70" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-teal-400/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-emerald-400/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto px-6">

        {/* Header — outside the card */}
        <div className="mb-8">
          <p className="text-teal-300 tracking-[0.3em] uppercase text-xs mb-3 font-mono">About Me</p>
          <h1 className="font-['Playfair_Display'] text-5xl font-bold text-white mb-1">
            Hi! I'm{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-emerald-300">Shogo.</span>
          </h1>
          <div className="h-px w-24 bg-gradient-to-r from-teal-400/60 to-transparent mt-4" />
        </div>

        {/* Glass card — just the content */}
        <div className="rounded-3xl bg-white/5 border border-teal-500/20 backdrop-blur-xl shadow-2xl shadow-black/40 p-8 md:p-12">

          <p className="text-white/70 leading-relaxed mb-6">
            I am a <span className="text-teal-300 font-medium">Full-Stack Developer</span> dedicated to building
            digital experiences that are as functional as they are engaging.
          </p>
          <p className="text-white/70 leading-relaxed mb-6">
            My journey in tech has always been about more than just writing code. It's about fostering a community
            of builders. At Bow Valley College, I founded{" "}
            <span className="text-teal-300 font-medium">Debugging Ducks</span>, a student coding club designed to
            bridge the gap between classroom theory and real-world project execution. Leading this initiative
            sharpened my ability to manage complex workflows and mentor emerging talent.
          </p>
          <p className="text-white/70 leading-relaxed mb-8">
            Beyond development, I've spent time as a <span className="text-teal-300 font-medium">Coding Instructor</span>,
            translating complex logic into approachable concepts for young learners. This experience didn't just sharpen
            my coding skills, it taught me how to communicate technical ideas clearly to any audience.
          </p>

          {/* Gallery */}
          <div className="mb-8">
            <p className="text-teal-300/60 text-xs uppercase tracking-widest font-mono mb-4">Gallery</p>
            <div className="relative flex items-center justify-center gap-3 h-56 md:h-72 overflow-hidden">

              {/* Prev panel */}
              <div
                onClick={prev}
                className="absolute left-0 w-[22%] h-[75%] rounded-xl overflow-hidden border border-teal-500/20 cursor-pointer opacity-50 hover:opacity-70 transition-opacity z-10"
                style={{ transform: "perspective(600px) rotateY(12deg) translateX(-10%)" }}
              >
                <img src={GALLERY[getIndex(-1)].src} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-[#0b1f1e]/40" />
              </div>

              {/* Main panel */}
              <div className="relative w-[60%] h-full rounded-2xl overflow-hidden border border-teal-400/30 shadow-2xl shadow-black/50 z-20 flex-shrink-0">
                {GALLERY.map((item, i) => (
                  <img
                    key={i}
                    src={item.src}
                    alt={item.caption}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ opacity: i === current ? 1 : 0, transition: "opacity 0.6s ease-in-out" }}
                  />
                ))}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-3 z-10">
                  <p className="text-white/80 text-xs font-mono">{GALLERY[current].caption}</p>
                </div>
              </div>

              {/* Next panel */}
              <div
                onClick={next}
                className="absolute right-0 w-[22%] h-[75%] rounded-xl overflow-hidden border border-teal-500/20 cursor-pointer opacity-50 hover:opacity-70 transition-opacity z-10"
                style={{ transform: "perspective(600px) rotateY(-12deg) translateX(10%)" }}
              >
                <img src={GALLERY[getIndex(1)].src} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-[#0b1f1e]/40" />
              </div>

              {/* Left arrow */}
              <button
                onClick={prev}
                className="absolute left-[20%] z-30 w-8 h-8 rounded-full bg-[#0b1f1e]/80 border border-teal-500/30 text-teal-300 flex items-center justify-center hover:bg-teal-900 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Right arrow */}
              <button
                onClick={next}
                className="absolute right-[20%] z-30 w-8 h-8 rounded-full bg-[#0b1f1e]/80 border border-teal-500/30 text-teal-300 flex items-center justify-center hover:bg-teal-900 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-4">
              {GALLERY.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-1.5 rounded-full transition-all duration-200 ${i === current ? "bg-teal-300 w-6" : "bg-white/30 w-1.5"}`}
                />
              ))}
            </div>
          </div>

          {/* Currently */}
          <div className="rounded-2xl bg-teal-900/20 border border-teal-700/30 px-6 py-5">
            <p className="text-teal-300/80 text-xs uppercase tracking-widest font-mono mb-2">Currently</p>
            <p className="text-white/70 leading-relaxed">
              I'm blending logic with creativity through{" "}
              <span className="text-teal-300 font-medium">full-stack web applications</span> and{" "}
              <span className="text-teal-300 font-medium">experimental game design</span>. I love projects that require a
              mix of clean architecture and interactive storytelling.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}