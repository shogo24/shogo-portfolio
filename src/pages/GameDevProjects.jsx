import { useState } from "react";
import { Icon } from "@iconify/react";

const BG_IMAGE = "/images/compressed/fakeTree.webp";

const PROJECTS = [
  {
    key: "codetype",
    title: "CodeType",
    subtitle: "Unity Typing Game",
    tags: ["Unity", "C#", "UI Animation", "Input Systems"],
    color: "#4BA89A",
    desc: "A Unity-based typing game where players write real C# code to complete challenges, designed to make learning programming interactive through real-time syntax validation and responsive feedback systems.",
    bullets: [
      "Built a custom input system to validate typed C# syntax in real time",
      "Implemented responsive UI animations for instant feedback on keystrokes",
      "Structured a modular and maintainable codebase using C# in Unity",
      "Explored Unity UI Toolkit and event systems for dynamic interaction handling",
    ],
    github: "https://github.com/shogo24/CodeType",
    live: null,
    video: "/videos/compressed/CodeType.mp4",
    images: [],
    captions: ["Demo"],
  },
  {
    key: "harrowing",
    title: "Harrowing",
    subtitle: "Unreal Engine Farming Horror — Work in Progress",
    tags: ["Unreal Engine", "Blueprints", "Game Design", "UI/UX"],
    color: "#5D8A6E",
    desc: "A farming simulation game built in Unreal Engine that blends resource management with atmospheric horror, where players manage crops while uncovering unsettling elements hidden within the environment.",
    bullets: [
      "Developed core farming systems including planting, growth cycles, and harvesting",
      "Built gameplay systems using Unreal Engine Blueprints for rapid prototyping",
      "Implemented dynamic GameMode logic and UI widget management",
      "Designed an evolving atmosphere that transitions from calm to psychological tension",
    ],
    github: null,
    live: null,
    video: null,
    images: ["/images/compressed/harrowingHouse.webp", "/images/compressed/harrowingFarm.webp", "/images/compressed/harrowingGameover.webp"],
    captions: ["House", "Farm", "Game Over"],
  },
];

function ProjectImageSlider({ images, video, title, captions }) {
  const [current, setCurrent] = useState(0);

  const allMedia = [
    ...(video ? [{ type: "video", src: video }] : []),
    ...(images || []).map((src) => ({ type: "image", src })),
  ];

  if (allMedia.length === 0) {
    return (
      <div className="w-full h-full bg-teal-900/30 flex items-center justify-center border-b border-teal-500/10">
        <span className="font-['Playfair_Display'] text-3xl font-bold text-teal-500/30">{title}</span>
      </div>
    );
  }

  if (allMedia.length === 1) {
    const item = allMedia[0];
    return (
      <div className="relative w-full h-full">
        {item.type === "video"
          ? <video src={item.src} className="w-full h-full object-cover" autoPlay muted loop playsInline />
          : <img src={item.src} alt={title} className="w-full h-full object-cover" />
        }
        {captions?.[0] && (
          <div className="absolute bottom-2 left-0 right-0 flex justify-center z-10">
            <span className="px-3 py-1 rounded-full bg-black/60 text-white/70 text-[10px] font-mono border border-white/10">
              {captions[0]}
            </span>
          </div>
        )}
      </div>
    );
  }

  const item = allMedia[current];

  return (
    <div className="relative w-full h-full">
      {allMedia.map((m, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-500"
          style={{ opacity: i === current ? 1 : 0, pointerEvents: i === current ? "auto" : "none" }}
        >
          {m.type === "video" ? (
            <video src={m.src} className="w-full h-full object-cover" autoPlay muted loop playsInline />
          ) : (
            <img src={m.src} alt={`${title} ${i + 1}`} className="w-full h-full object-cover" />
          )}
        </div>
      ))}

      {item.type === "video" && (
        <div className="absolute top-2 left-2 z-10 flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/60 text-white/70 text-[10px] font-mono border border-white/10">
          <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
          Demo
        </div>
      )}

      <button
        onClick={(e) => { e.stopPropagation(); setCurrent((c) => (c === 0 ? allMedia.length - 1 : c - 1)); }}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-black/60 border border-white/20 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
      >
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); setCurrent((c) => (c === allMedia.length - 1 ? 0 : c + 1)); }}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-black/60 border border-white/20 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
      >
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5 z-10">
        {allMedia.map((_, i) => (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
            className={`rounded-full transition-all duration-200 ${i === current ? "bg-white w-4 h-1.5" : "bg-white/40 w-1.5 h-1.5"}`}
          />
        ))}
      </div>

      {captions?.[current] && (
        <div className="absolute bottom-7 left-0 right-0 flex justify-center z-10 px-4">
          <span className="px-3 py-1 rounded-full bg-black/60 text-white/70 text-[10px] font-mono border border-white/10">
            {captions[current]}
          </span>
        </div>
      )}

      <div className="absolute top-2 right-2 z-10 px-2 py-0.5 rounded-full bg-black/60 text-white/70 text-[10px] font-mono">
        {current + 1}/{allMedia.length}
      </div>
    </div>
  );
}

export default function GameDevProjects() {
  const [expanded, setExpanded] = useState(null);

  function toggle(key) {
    setExpanded((prev) => (prev === key ? null : key));
  }

  return (
    <div
      className="relative min-h-screen overflow-hidden pt-24 pb-16"
      style={{ backgroundImage: `url(${BG_IMAGE})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#0b1f1e]/90 via-[#0f2e2a]/80 to-teal-900/70" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-teal-400/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-emerald-400/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-10">
          <p className="text-teal-300 tracking-[0.3em] uppercase text-xs mb-3 font-mono">Portfolio</p>
          <h1 className="font-['Playfair_Display'] text-5xl font-bold text-white mb-2">
            Game Dev <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-emerald-300">Projects</span>
          </h1>
          <div className="h-px w-24 bg-gradient-to-r from-teal-400/60 to-transparent mt-4" />
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {PROJECTS.map((p) => (
            <div
              key={p.key}
              className={`rounded-3xl bg-white/5 border backdrop-blur-xl shadow-2xl shadow-black/40 flex flex-col overflow-hidden transition-all duration-300 ${
                expanded === p.key ? "border-teal-400/50" : "border-teal-500/20 hover:border-teal-500/40"
              }`}
            >
              {/* Thumbnail / Slider */}
              <div className="h-72 overflow-hidden flex-shrink-0 relative">
                <ProjectImageSlider
                  images={p.images}
                  video={p.video}
                  title={p.title}
                  captions={p.captions}
                />
              </div>
              {/* Body */}
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <h2 className="font-['Playfair_Display'] text-xl font-bold" style={{ color: p.color }}>
                      {p.title}
                    </h2>
                    <p className="text-white/40 text-xs font-mono mt-0.5">{p.subtitle}</p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    {p.github && (
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-lg bg-teal-900/50 border border-teal-500/20 flex items-center justify-center text-teal-300 hover:bg-teal-800/60 hover:border-teal-400/40 transition-all"
                        title="GitHub"
                      >
                        <Icon icon="mdi:github" className="w-4 h-4" />
                      </a>
                    )}
                    {p.live && (
                      <a
                        href={p.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-lg bg-teal-900/50 border border-teal-500/20 flex items-center justify-center text-teal-300 hover:bg-teal-800/60 hover:border-teal-400/40 transition-all"
                        title="Live Site"
                      >
                        <Icon icon="mdi:open-in-new" className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {p.tags.map((t) => (
                    <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-teal-900/60 text-teal-300/80 border border-teal-700/40 font-mono">
                      {t}
                    </span>
                  ))}
                </div>

                <p className="text-white/60 text-sm leading-relaxed mb-4">{p.desc}</p>

                {/* Expand button */}
                <button
                  onClick={() => toggle(p.key)}
                  className="mt-auto flex items-center gap-2 text-teal-400 hover:text-teal-200 text-sm font-medium transition-colors"
                >
                  <Icon icon={expanded === p.key ? "mdi:chevron-up" : "mdi:chevron-down"} className="w-4 h-4" />
                  {expanded === p.key ? "Show less" : "Show more"}
                </button>

                {/* Expanded bullets */}
                {expanded === p.key && (
                  <ul className="mt-4 flex flex-col gap-2 border-t border-teal-500/20 pt-4">
                    {p.bullets.map((b, i) => (
                      <li key={i} className="flex items-start gap-2 text-white/60 text-sm">
                        <span className="text-teal-400 mt-0.5 flex-shrink-0">→</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}