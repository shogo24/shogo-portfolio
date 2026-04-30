import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Terminal, Activity } from "lucide-react";
import { SideNavContext, useSideNav } from "./SideNavContext";

const LINKS = [
  { label: "Home",              path: "/" },
  { label: "More About Me",     path: "/about" },
  { label: "Resume",            path: "/resume" },
  { label: "Web Dev Projects",  path: "/webdev" },
  { label: "Game Dev Projects", path: "/gamedev" },
  { label: "Job Hunt",          path: "/game" },
  { label: "Contact",           path: "/contact" },
];

export function SideNavProvider({ children }) {
  const [open, setOpen] = useState(false);
  return (
    <SideNavContext.Provider value={{ open, setOpen }}>
      {children}
    </SideNavContext.Provider>
  );
}

export function SideNavTrigger() {
  const { open, setOpen } = useSideNav();
  return (
    <button
      onClick={() => setOpen((p) => !p)}
      className="w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-xl bg-teal-900/60 backdrop-blur-md border border-teal-500/30 hover:bg-teal-800/70 transition-all duration-200 relative z-[100]"
      aria-label="Toggle menu"
    >
      <span className={`block w-5 h-0.5 bg-teal-300 transition-all duration-300 origin-center ${open ? "rotate-45 translate-y-2" : ""}`} />
      <span className={`block w-5 h-0.5 bg-teal-300 transition-all duration-300 ${open ? "opacity-0 scale-x-0" : ""}`} />
      <span className={`block w-5 h-0.5 bg-teal-300 transition-all duration-300 origin-center ${open ? "-rotate-45 -translate-y-2" : ""}`} />
    </button>
  );
}

export default function SideNav() {
  const { open, setOpen } = useSideNav();
  const location = useLocation();

  useEffect(() => { setOpen(false); }, [location, setOpen]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <style>{`
        @keyframes subtle-glitch {
          0% { transform: translate(0); }
          20% { transform: translate(-2px, 1px); opacity: 0.8; }
          40% { transform: translate(2px, -1px); opacity: 0.9; }
          60% { transform: translate(-1px, 0); opacity: 1; }
          100% { transform: translate(0); }
        }
        .glitch-hover:hover .glitch-layer {
          animation: subtle-glitch 0.15s infinite;
          display: block;
        }
        @keyframes hacked-pulse {
          0%, 100% { box-shadow: 0 0 10px rgba(239, 68, 68, 0.15); border-color: rgba(239, 68, 68, 0.3); }
          50% { box-shadow: 0 0 25px rgba(239, 68, 68, 0.45); border-color: rgba(239, 68, 68, 0.6); }
        }
        .active-hacked-glow {
          animation: hacked-pulse 2s infinite ease-in-out;
        }
        .text-aberration {
          filter: drop-shadow(-1.5px 0 1px #3b82f6) drop-shadow(1.5px 0 1px #ef4444) saturate(1.5);
        }
      `}</style>

      {/* Backdrop */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-[90] bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />

      {/* Sidebar panel */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 z-[95] bg-[#0b1f1e]/95 backdrop-blur-xl border-r border-teal-500/20 shadow-2xl shadow-black/50 transition-transform duration-300 ease-in-out ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Logo */}
        <div className="px-8 pt-8 pb-6 border-b border-teal-500/20">
          <span className="font-['Playfair_Display'] text-2xl font-bold text-teal-300">
            SH<span className="text-white">.</span>
          </span>
          <p className="text-white/40 text-xs font-mono mt-1 tracking-widest uppercase">Portfolio</p>
        </div>

        {/* Nav links */}
        <nav className="px-6 py-8 flex flex-col gap-2">
          {LINKS.map(({ label, path }) => {
            const active = location.pathname === path;
            const isResume = path === "/resume";
            const isGame = path === "/game";

            return (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group relative overflow-hidden glitch-hover ${
                  active
                    ? isGame
                      ? "bg-red-950/20 text-red-100 border border-red-500/50 active-hacked-glow"
                      : "bg-teal-500/20 text-teal-300 border border-teal-500/30 shadow-[0_0_15px_rgba(45,212,191,0.1)]"
                    : isGame
                    ? "text-red-400/60 hover:text-red-300 hover:bg-red-500/10 border border-transparent hover:border-red-500/30"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                {/* Icon */}
                {isGame ? (
                  <Terminal size={14} className={`${active ? "text-red-300 drop-shadow-[0_0_5px_#ef4444]" : "text-red-500/40 group-hover:text-red-300 transition-colors"}`} />
                ) : (
                  <span className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                    active
                      ? "bg-teal-400 shadow-[0_0_8px_#2dd4bf]"
                      : isResume
                      ? "bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]"
                      : "bg-white/20 group-hover:bg-teal-400/50"
                  }`} />
                )}

                {/* Label */}
                <div className="relative">
                  <span className={`relative z-10 ${isGame ? "font-mono tracking-tight text-aberration" : ""}`}>
                    {label}
                  </span>
                  {isGame && (
                    <>
                      <span className="glitch-layer hidden absolute top-0 left-0 z-0 text-blue-500/60 mix-blend-screen font-mono tracking-tight">{label}</span>
                      <span className="glitch-layer hidden absolute top-0 left-0 z-0 text-red-500/60 mix-blend-screen font-mono tracking-tight" style={{ marginLeft: "1px" }}>{label}</span>
                    </>
                  )}
                </div>

                {/* Status tags */}
                {isResume && (
                  <span className="ml-auto text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-md border border-emerald-500/20 uppercase tracking-tighter animate-pulse shadow-[0_0_5px_rgba(16,185,129,0.2)]">
                    New
                  </span>
                )}
                {isGame && (
                  <span className={`ml-auto text-[9px] font-mono uppercase flex items-center gap-1 ${active ? "text-red-200" : "text-red-500/30 group-hover:text-red-300"}`}>
                    {active ? (<><Activity size={10} className="animate-pulse drop-shadow-[0_0_2px_#ef4444]" /> Live</>) : "Locked"}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom panel */}
        <div className="absolute bottom-8 left-0 right-0 px-8">

          {/* Social icons */}
          <div className="flex justify-center gap-3 mb-4">
            <a
              href="https://linkedin.com/in/shogo-hardy"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-xl bg-teal-900/50 border border-teal-500/20 flex items-center justify-center text-teal-300/60 hover:text-teal-300 hover:bg-teal-800/60 hover:border-teal-400/40 transition-all duration-200"
              title="LinkedIn"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <a
              href="https://github.com/Shogo24"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-xl bg-teal-900/50 border border-teal-500/20 flex items-center justify-center text-teal-300/60 hover:text-teal-300 hover:bg-teal-800/60 hover:border-teal-400/40 transition-all duration-200"
              title="GitHub"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
          </div>

          <p className="text-white/20 text-[10px] font-mono text-center tracking-widest uppercase flex justify-center items-center gap-2">
            System Status: <span className="text-emerald-500/50">Online</span>
          </p>
          <p className="text-white/10 text-[9px] font-mono text-center mt-2 tracking-tighter">
            © {new Date().getFullYear()} Shogo Hardy
          </p>
        </div>
      </aside>
    </>
  );
}