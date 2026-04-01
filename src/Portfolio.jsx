import { useState, useEffect } from "react";
import { SideNavTrigger } from "./components/SideNav.jsx";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

const PHOTOS = {
  heroBg: "public/images/fuji.JPG",
  projectsBg: "public/images/hotel.jpg",
  headshot: "public/images/profilePhotoTransparent.png",
  projects: {
    RespAi:         "public/images/RespAiHome.png",
    coursePilot:    "public/images/pilotCourses.png",
    nest:           "public/images/nestHomepage.png",
  },
};

const NAV_LINKS = ["About", "Skills", "Projects", "Contact"];

const SKILLS = [
  { name: "React", tooltip: "A JavaScript library for building user interfaces" },
  { name: "Next.js", tooltip: "A React framework for server-side rendering and static sites" },
  { name: "JavaScript", tooltip: "Programming language for web development" },
  { name: "TypeScript", tooltip: "JavaScript with type safety" },
  { name: "HTML", tooltip: "Markup language for creating web pages" },
  { name: "CSS", tooltip: "Stylesheet language for web design" },
  { name: "Tailwind CSS", tooltip: "Utility-first CSS framework for rapid UI development" },
  { name: "Node.js", tooltip: "JavaScript runtime for server-side development" },
  { name: "Express.js", tooltip: "Web framework for Node.js" },
  { name: ".NET", tooltip: "Microsoft framework for building applications" },
  { name: "C#", tooltip: "Programming language used with .NET and Unity" },
  { name: "SQL Server", tooltip: "Relational database management system by Microsoft" },
  { name: "Supabase", tooltip: "Open-source Firebase alternative" },
  { name: "MongoDB", tooltip: "NoSQL database for flexible data storage" },
  { name: "Azure", tooltip: "Microsoft cloud computing platform" },
  { name: "AWS S3", tooltip: "Cloud storage service from Amazon" },
  { name: "Jenkins", tooltip: "Automation server for CI/CD pipelines" },
  { name: "CI/CD", tooltip: "Continuous Integration and Deployment practices" },
  { name: "Git", tooltip: "Version control system" },
  { name: "GitHub", tooltip: "Platform for hosting Git repositories" },
  { name: "REST APIs", tooltip: "Web APIs following REST principles" },
  { name: "JSON", tooltip: "Data format for structured data exchange" },
  { name: "Unity", tooltip: "Game engine for 2D/3D games" },
  { name: "Unreal Engine", tooltip: "High-end game engine for 3D games" },
  { name: "Figma", tooltip: "UI/UX design and prototyping tool" },
  { name: "UI/UX Design", tooltip: "Designing user interfaces and experiences" },
  { name: "Responsive Design", tooltip: "Designing layouts for multiple screen sizes" },
  { name: "Form Validation", tooltip: "Ensuring correct input in forms" },
  { name: "Authentication", tooltip: "Verifying user identity" },
];

const PROJECTS = [
  {
    key: "RespAi",
    title: "RespAI Hub",
    tags: ["React", "Node.js", "TypeScript", "Serverless APIs", "REST APIs", "Data Integration"],
    color: "#4BA89A",
    desc: "A full-stack platform that helps fire departments identify and prioritize outreach opportunities using public datasets, automated workflows, and lead-scoring, with a secure CRM dashboard for managing and tracking prospects.",
    link: "/webdev",
  },
  {
    key: "coursePilot",
    title: "CoursePilot",
    tags: ["React", "Node.js", "Express", "SQL Server", "Azure"],
    color: "#2D7D9A",
    desc: "A full-stack course management platform built with React, Express, and SQL Server on Azure, featuring user authentication, course enrollment, and real-time data handling through a scalable REST API.",
    link: "/webdev",
  },
  {
    key: "nest",
    title: "Nest Trading App",
    tags: ["C#", ".NET", "Supabase", "Figma"],
    color: "#5D8A6E",
    desc: "A .NET-based trading application with Supabase-powered authentication and storage, featuring a custom-designed interface from Figma and real-time data handling for managing trades and user activity.",
    link: "/webdev",
  },
];

function Placeholder({ label, className = "" }) {
  return (
    <div className={`flex items-center justify-center bg-teal-900/40 border border-teal-500/30 text-teal-300/60 text-xs font-mono select-none ${className}`}>
      {label}
    </div>
  );
}

function NavBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${scrolled ? "bg-[#0b1f1e]/80 backdrop-blur-lg shadow-lg shadow-black/30" : "bg-transparent"}`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <span className="font-['Playfair_Display'] text-2xl font-bold tracking-tight text-teal-300">
          SH<span className="text-white">.</span>
        </span>
        <ul className="hidden md:flex gap-8">
          {NAV_LINKS.map((l) => (
            <li key={l}>
              <a href={`#${l.toLowerCase()}`} className="text-sm tracking-widest uppercase text-white/60 hover:text-white transition-colors duration-200">
                {l}
              </a>
            </li>
          ))}
        </ul>
        <SideNavTrigger />
      </div>
    </nav>
  );
}

function TypingText() {
  const full = "Hello, I'm Shogo.";
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (displayed.length >= full.length) return;
    const t = setTimeout(() => {
      setDisplayed(full.slice(0, displayed.length + 1));
    }, 80);
    return () => clearTimeout(t);
  }, [displayed, full.length]);

  useEffect(() => {
    if (displayed.length >= full.length) {
      setDone(true);
    }
  }, [displayed.length, full.length]);

  const plain = "Hello, I'm ";
  const dispPlain = displayed.slice(0, Math.min(displayed.length, plain.length));
  const dispName  = displayed.length > plain.length ? displayed.slice(plain.length) : "";

  return (
    <>
      {dispPlain}
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-emerald-300">
        {dispName}
      </span>
      {!done && (
        <span className="inline-block w-0.5 h-12 md:h-16 bg-teal-300 ml-1 align-middle animate-pulse" />
      )}
    </>
  );
}

function Hero() {
  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ backgroundImage: `url(${PHOTOS.heroBg})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#0b1f1e]/85 via-[#0f2e2a]/70 to-teal-900/50" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-teal-400/10 blur-3xl pointer-events-none" />
      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full pt-24 pb-16">
        <div className="flex flex-col-reverse md:flex-row items-center gap-12">
          <div className="flex-1">
            <p className="text-teal-300 tracking-[0.3em] uppercase text-xs mb-4 font-mono">Software Developer & Designer</p>
            <h1 className="font-['Playfair_Display'] text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
                <TypingText />
            </h1>
            <p className="text-white/70 text-lg leading-relaxed max-w-lg mb-8">
            A full-stack developer passionate about building modern web applications and exploring new technologies.  
            This is my site, where I showcase my side projects and experiments.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link to="/resume" className="px-7 py-3 rounded-full bg-teal-400 text-[#0b1f1e] font-semibold text-sm tracking-wide hover:bg-teal-300 transition-colors shadow-lg shadow-teal-500/20">
                View Resume
              </Link>
              <Link to="/contact" className="px-7 py-3 rounded-full border border-teal-400/50 text-teal-300 font-semibold text-sm tracking-wide hover:bg-teal-400/10 transition-colors">
                Get in Touch
              </Link>
            </div>
          </div>
          <div className="flex-shrink-0">
            <div className="relative w-52 h-52 md:w-64 md:h-64">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-teal-400/30 to-emerald-600/20 blur-xl" />
              {PHOTOS.headshot ? (
                <img src={PHOTOS.headshot} alt="Shogo" className="relative z-10 w-full h-full object-cover rounded-2xl border border-teal-500/30 shadow-2xl" />
              ) : (
                <Placeholder label="headshot.jpg" className="relative z-10 w-full h-full rounded-2xl" />
              )}
            </div>
          </div>
        </div>
        <div className="mt-16 flex justify-center">
          <div className="flex flex-col items-center gap-2 text-white/30 animate-bounce">
            <span className="text-xs tracking-widest uppercase font-mono">Scroll</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="py-28 bg-[#0d2422]">
      <div className="max-w-6xl mx-auto px-6">
        <SectionLabel>Technical Experience</SectionLabel>
        <p className="text-white/50 mt-4 mb-12 max-w-xl">
          Technologies I've worked with across web development, cloud, game development, and design.
        </p>
        <div className="flex flex-wrap gap-3">
          {SKILLS.map((skill, i) => (
            <span
              key={skill.name}
              title={skill.tooltip} // <-- shows definition on hover
              className="px-4 py-2 rounded-full text-sm font-mono text-teal-300 border border-teal-500/30 bg-teal-500/10 hover:bg-teal-500/20 hover:border-teal-400/60 transition-all duration-200 cursor-default"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              {skill.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }) {
  const img = PHOTOS.projects[project.key];
  return (
    <div className="group rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-teal-400/40 backdrop-blur-sm shadow-xl hover:shadow-teal-500/10 transition-all duration-300 hover:-translate-y-1 flex flex-col md:flex-row">
      <div className="md:w-56 h-44 md:h-auto flex-shrink-0 overflow-hidden">
        {img ? (
          <img src={img} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <Placeholder label={`${project.key}.png`} className="w-full h-full" />
        )}
      </div>
      <div className="p-6 flex flex-col justify-between flex-1">
        <div>
          <h3 className="font-['Playfair_Display'] text-xl font-bold mb-2 group-hover:text-teal-300 transition-colors" style={{ color: project.color }}>
            {project.title}
          </h3>
          <p className="text-white/60 text-sm leading-relaxed mb-4">{project.desc}</p>
        </div>
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-teal-900/60 text-teal-300/80 border border-teal-700/40 font-mono">{t}</span>
            ))}
          </div>
          <Link to={project.link} className="text-teal-400 hover:text-teal-200 transition-colors flex items-center gap-1 text-sm font-medium">
            View
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

function Projects() {
  return (
    <section
      id="projects"
      className="relative py-28"
      style={{
        backgroundImage: `url(${PHOTOS.projectsBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay so text is readable */}
      <div className="absolute inset-0 bg-black/60" />
      
      <div className="relative max-w-6xl mx-auto px-6">
        <SectionLabel>Projects</SectionLabel>
        <p className="text-white/50 mt-4 mb-12 max-w-xl">
          A selection of things I’ve built - check out the Projects page for more.
        </p>
        <div className="flex flex-col gap-6">
          {PROJECTS.map((p) => <ProjectCard key={p.key} project={p} />)}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-28 bg-[#0d2422]">
      <div className="max-w-6xl mx-auto px-6">
        <SectionLabel>Contact</SectionLabel>
        <p className="text-white/50 mt-4 mb-12 max-w-xl">Want to work together or just say hi? Reach out below.</p>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm p-8 flex flex-col gap-6">
            <ContactRow
              icon="mdi:email-outline"
              label="Email"
              value="shogo.a.hardy@gmail.com"
              href="mailto:shogo.a.hardy@gmail.com"
            />
            <ContactRow
              icon="mdi:linkedin"
              label="LinkedIn"
              value="linkedin.com/in/shogo"
              href="https://linkedin.com"
            />
            <ContactRow
              icon="mdi:github"
              label="GitHub"
              value="github.com/shogo"
              href="https://github.com"
            />
          </div>
          <div className="rounded-2xl bg-teal-900/20 border border-teal-700/30 backdrop-blur-sm p-8 flex flex-col justify-center">
            <p className="text-teal-300/80 text-sm font-mono mb-3">Currently available for</p>
            <ul className="text-white/70 text-sm space-y-2">
              {["Internships & co-ops", "Freelance projects", "Collaborative side projects", "Connecting with developers and mentors"].map((i) => (
                <li key={i} className="flex items-center gap-2"><span className="text-teal-400">→</span> {i}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactRow({ icon, label, value, href }) {
  return (
    <a href={href} className="flex items-center gap-4 group">
      <div className="w-10 h-10 rounded-xl bg-teal-900/50 border border-teal-500/20 flex items-center justify-center text-teal-300 group-hover:bg-teal-800/60 group-hover:border-teal-400/40 transition-all duration-200">
        <Icon icon={icon} className="w-5 h-5" />
      </div>
      <div>
        <p className="text-white/40 text-xs uppercase tracking-widest font-mono">{label}</p>
        <p className="text-teal-300 group-hover:text-teal-100 transition-colors text-sm">{value}</p>
      </div>
    </a>
  );
}

function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-4">
      <h2 className="font-['Playfair_Display'] text-3xl font-bold text-white">{children}</h2>
      <div className="flex-1 max-w-24 h-px bg-gradient-to-r from-teal-400/60 to-transparent" />
    </div>
  );
}

export default function Portfolio() {
  return (
    <div className="min-h-screen text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <Hero />
      <Skills />
      <Projects />
      <Contact />
    </div>
  );
}