import { useState } from "react";
import { Icon } from "@iconify/react";

const BG_IMAGE = "/images/compressed/river.webp";

const PROJECTS = [
  {
    key: "respai",
    title: "RespAI Hub",
    subtitle: "Fire Department CRM Platform",
    tags: ["JavaScript", "Angular", "Figma", "Node.js", "Vite", "Git", "GitHub", "Postman", "React", "TypeScript"],
    color: "#4BA89A",
    desc: "A full-stack platform built to help identify, prioritize, and manage outreach opportunities for fire departments across the U.S. Combines public datasets including FEMA and wildfire-related data, automated data sync workflows, and lead-scoring logic to surface high-value prospects.",
    bullets: [
      "Integrated FEMA and wildfire public datasets for lead generation",
      "Built automated data sync workflows and lead-scoring logic",
      "Developed a secure CRM dashboard for managing fire department outreach",
      "Serverless API functions and database models for scalable data operations",
    ],
    github: "https://github.com/dondonherrera02/Fire-Department-Lead-Generation-CRM-System",
    live: null,
    video: "/videos/compressed/RespAiDemo.mp4",
    images: ["/images/compressed/RespAiHome.webp", "/images/compressed/RespAiDashboard.webp", "/images/compressed/RespAiDepartments.webp", "/images/compressed/RespAiUserManagement.webp", "/images/compressed/RespAiSettings.webp"],
    captions: ["Demo", "Homepage", "Dashboard", "Department View", "User Management", "Settings"],
  },
  {
    key: "coursepilot",
    title: "CoursePilot",
    subtitle: "Course Registration Web App",
    tags: ["React", "Node.js", "Express", "SQL Server", "Azure"],
    color: "#2D7D9A",
    desc: "A full-stack course management platform built with React, Express, and SQL Server on Azure, enabling users to browse, enroll, and manage courses through a secure, scalable system with RESTful APIs.",
    bullets: [
      "Developed a full-stack application with React front-end and Node/Express back-end",
      "Implemented course browsing, registration, and user management features",
      "Integrated SQL Server on Azure for secure and scalable data storage",
      "Built and tested RESTful APIs using Postman for reliable data operations",
      "Designed responsive UI/UX and application flow using Figma",
    ],
    github: "https://github.com/ShadeKnightly/CoursePilot",
    live: null,
    video: "/videos/compressed/CoursePilot.mp4",
    images: ["/images/compressed/pilotCourses.webp", "/images/compressed/pilotPreview.webp", "/images/compressed/pilotFigma.webp"],
    captions: ["Demo", "Courses Page", "Preview Page", "Figma Design"],
  },
  {
    key: "nest",
    title: "Nest",
    subtitle: "Day Trading Application",
    tags: ["C#", ".NET Framework", "Supabase", "Figma"],
    color: "#5D8A6E",
    desc: "A .NET-based trading application designed for beginner investors, featuring portfolio tracking, watchlists, and real-time market data, with secure authentication and a clean UI built from custom Figma designs.",
    bullets: [
      "Built a desktop trading application using C# and .NET Framework",
      "Implemented secure authentication and cloud data storage with Supabase",
      "Developed portfolio tracking, watchlists, and real-time price updates via EODHD API",
      "Designed intuitive user interfaces and workflows using Figma prototypes",
      "Structured application logic for scalable and maintainable trading features",
    ],
    github: "https://github.com/ShadeKnightly/Day-trading-app",
    live: null,
    video: "/videos/compressed/NestTradingApp.mp4",
    images: ["/images/compressed/nestHomepage.webp", "/images/compressed/nestWatchlist.webp", "/images/compressed/nestStockview.webp", "/images/compressed/nestFigma.webp"],
    captions: ["Demo", "Homepage", "Watchlist", "Stock View", "Figma Design"],
  },
  {
    key: "debuggingDucks",
    title: "Debugging Ducks",
    subtitle: "Student Coding Club Website",
    tags: ["HTML", "CSS", "JavaScript"],
    color: "#4BA89A",
    desc: "The official website for Debugging Ducks, a student-led coding club I founded, designed to showcase events, resources, and projects while supporting student collaboration and real-world development experience.",
    bullets: [
      "Founded and led a coding club focused on hands-on development and teamwork",
      "Designed and built the club website from scratch using HTML, CSS, and JavaScript",
      "Created pages for events, resources, and member engagement",
      "Optimized the site for accessibility, responsiveness, and usability",
      "Managed club operations including marketing, sponsorships, and event planning",
    ],
    github: "https://github.com/shogo24/Debugging-Ducks",
    live: "https://debugging-ducks.vercel.app/",
    video: "/videos/compressed/DebuggingDucksDemo.mp4",
    images: ["/images/compressed/ddHome.webp", "/images/compressed/ddProjects.webp", "/images/compressed/ddCalendar.webp", "/images/compressed/ddContact.webp", "/images/compressed/ddFigma.webp"],
    captions: ["Demo", "Homepage", "Projects", "Calendar", "Contact", "Figma Design"],
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
      {/* Stacked media with crossfade */}
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

      {/* Left arrow */}
      <button
        onClick={(e) => { e.stopPropagation(); setCurrent((c) => (c === 0 ? allMedia.length - 1 : c - 1)); }}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-black/60 border border-white/20 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
      >
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Right arrow */}
      <button
        onClick={(e) => { e.stopPropagation(); setCurrent((c) => (c === allMedia.length - 1 ? 0 : c + 1)); }}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-black/60 border border-white/20 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
      >
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots */}
      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5 z-10">
        {allMedia.map((_, i) => (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
            className={`rounded-full transition-all duration-200 ${i === current ? "bg-white w-4 h-1.5" : "bg-white/40 w-1.5 h-1.5"}`}
          />
        ))}
      </div>

      {/* Caption */}
      {captions?.[current] && (
        <div className="absolute bottom-7 left-0 right-0 flex justify-center z-10 px-4">
          <span className="px-3 py-1 rounded-full bg-black/60 text-white/70 text-[10px] font-mono border border-white/10">
            {captions[current]}
          </span>
        </div>
      )}

      {/* Counter */}
      <div className="absolute top-2 right-2 z-10 px-2 py-0.5 rounded-full bg-black/60 text-white/70 text-[10px] font-mono">
        {current + 1}/{allMedia.length}
      </div>
    </div>
  );
}

export default function WebDevProjects() {
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
            Web Dev <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-emerald-300">Projects</span>
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
                <div className="absolute bottom-0 left-0 right-0 h-0.5 z-10" style={{ backgroundColor: p.color }} />
              </div>

              {/* Body */}
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <h2 className="font-['Playfair_Display'] text-xl font-bold" style={{ color: p.color }}>{p.title}</h2>
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
                    <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-teal-900/60 text-teal-300/80 border border-teal-700/40 font-mono">{t}</span>
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