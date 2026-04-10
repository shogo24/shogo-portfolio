import { useState, useEffect } from "react";
import { SideNavTrigger } from "./SideNav.jsx";
import { useLocation, Link } from "react-router-dom";

const NAV_LINKS = [
  { label: "About", href: "#home" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${scrolled ? "bg-[#0b1f1e]/80 backdrop-blur-lg shadow-lg shadow-black/30" : "bg-transparent"}`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="font-['Playfair_Display'] text-2xl font-bold tracking-tight text-teal-300 hover:text-teal-200 transition-colors">
            SH<span className="text-white">.</span>
        </Link>

        {/* Only show scroll links on home page */}
        {isHome && (
          <ul className="hidden md:flex gap-8">
            {NAV_LINKS.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="text-sm tracking-widest uppercase text-white/60 hover:text-white transition-colors duration-200"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        )}

        {/* On other pages show current page name instead */}
        {!isHome && (
          <span className="text-white/40 text-xs uppercase tracking-widest font-mono hidden md:block">
            {location.pathname === "/about"   && "About Me"}
            {location.pathname === "/resume"  && "Resume"}
            {location.pathname === "/webdev"  && "Web Dev Projects"}
            {location.pathname === "/gamedev" && "Game Dev Projects"}
            {location.pathname === "/game"    && "Game Job Hunt"}
            {location.pathname === "/contact" && "Contact"}
          </span>
        )}

        <SideNavTrigger />
      </div>
    </nav>
  );
}