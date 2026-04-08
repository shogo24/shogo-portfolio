export default function Resume() {
  const resumePath = "/images/resume.pdf";
  const BG_IMAGE = "/images/compressed/trees.webp";

  return (
    <div
      className="relative min-h-screen overflow-hidden pt-24 pb-16"
      style={{ backgroundImage: `url(${BG_IMAGE})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0b1f1e]/90 via-[#0f2e2a]/80 to-teal-900/70" />

      {/* Decorative orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-teal-400/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-emerald-400/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6">

        {/* Header — outside the card like web/game dev pages */}
        <div className="mb-8">
          <p className="text-teal-300 tracking-[0.3em] uppercase text-xs mb-3 font-mono">Documents</p>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="font-['Playfair_Display'] text-5xl font-bold text-white mb-1">
                My <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-emerald-300">Resume</span>
              </h1>
            </div>
            <a
              href={resumePath}
              download
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-teal-400 text-[#0b1f1e] font-semibold text-sm hover:bg-teal-300 transition-colors shadow-lg shadow-teal-500/20"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download PDF
            </a>
          </div>
          <div className="h-px w-24 bg-gradient-to-r from-teal-400/60 to-transparent mt-4" />
        </div>

        {/* Glass card — just the PDF viewer */}
        <div className="rounded-3xl bg-white/5 border border-teal-500/20 backdrop-blur-xl shadow-2xl shadow-black/40 p-4 md:p-6">
          <div className="rounded-2xl overflow-hidden border border-teal-500/10">
            <iframe
              src={resumePath}
              className="w-full"
              style={{ height: "80vh" }}
              title="Shogo Hardy Resume"
            />
          </div>
          <p className="text-white/30 text-xs text-center mt-4 font-mono">
            Can't see the PDF?{" "}
            <a href={resumePath} download className="text-teal-400 hover:text-teal-300 underline">
              Download it instead
            </a>
          </p>
        </div>

      </div>
    </div>
  );
}