import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="relative min-h-screen bg-[#0b1f1e] flex items-center justify-center px-6 overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-teal-400/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-emerald-400/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 text-center">
        <p className="text-teal-300 tracking-[0.3em] uppercase text-xs mb-4 font-mono">Error 404</p>
        <h1 className="font-['Playfair_Display'] text-8xl font-bold text-white mb-4">
          4<span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-emerald-300">0</span>4
        </h1>
        <p className="text-white/50 text-lg mb-8">This page doesn't exist or was moved.</p>
        <Link
          to="/"
          className="px-7 py-3 rounded-full bg-teal-400 text-[#0b1f1e] font-semibold text-sm tracking-wide hover:bg-teal-300 transition-colors shadow-lg shadow-teal-500/20"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}