import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const BG_IMAGE = "/images/city.webp";

function sanitize(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function Contact() {
  const [form, setForm] = useState({ from_name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("idle");
  const [errors, setErrors] = useState({});
  const honeypotRef = useRef(null);
  const submitTimeRef = useRef(Date.now());

  function validate() {
    const e = {};
    if (!form.from_name.trim())           e.from_name = "Name is required";
    if (!isValidEmail(form.email))        e.email     = "Enter a valid email";
    if (!form.subject.trim())             e.subject   = "Subject is required";
    if (form.message.trim().length < 10)  e.message   = "Message must be at least 10 characters";
    return e;
  }

  async function handleSubmit() {
    if (honeypotRef.current?.value) return;
    const elapsed = (Date.now() - submitTimeRef.current) / 1000;
    if (elapsed < 3) { setStatus("error"); return; }
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setErrors({});
    setStatus("sending");
    try {
      await emailjs.send(
        SERVICE_ID, TEMPLATE_ID,
        {
          from_name: sanitize(form.from_name),
          reply_to:  sanitize(form.email),
          subject:   sanitize(form.subject),
          message:   sanitize(form.message),
          to_email:  "shogo.a.hardy@gmail.com",
        },
        PUBLIC_KEY
      );
      setStatus("sent");
    } catch (error) {
      console.error("EmailJS Error:", error);
      setStatus("error");
    }
  }

  function handleChange(field, value) {
    const clean = value.replace(/<[^>]*>/g, "");
    setForm((prev) => ({ ...prev, [field]: clean }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  return (
    <div
      className="relative min-h-screen overflow-hidden pt-24 pb-16 flex items-center"
      style={{ backgroundImage: `url(${BG_IMAGE})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#0b1f1e]/90 via-[#0f2e2a]/80 to-teal-900/70" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-teal-400/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-emerald-400/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-lg mx-auto px-6">

        {/* Header — outside the card */}
        <div className="mb-8">
          <p className="text-teal-300 tracking-[0.3em] uppercase text-xs mb-3 font-mono">Get In Touch</p>
          <h1 className="font-['Playfair_Display'] text-5xl font-bold text-white mb-1">
            Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-emerald-300">Me.</span>
          </h1>
          <div className="h-px w-24 bg-gradient-to-r from-teal-400/60 to-transparent mt-4" />
        </div>

        {/* Glass card — just the form */}
        <div className="rounded-3xl bg-white/5 border border-teal-500/20 backdrop-blur-xl shadow-2xl shadow-black/40 p-8 md:p-10">
          <p className="text-white/50 mb-8 text-sm">Send me a message and I'll get back to you.</p>

          {status === "sent" ? (
            <div className="rounded-2xl bg-teal-500/10 border border-teal-500/30 p-8 text-center">
              <p className="text-teal-300 text-lg font-medium">Message sent! I'll be in touch soon.</p>
              <button
                onClick={() => {
                  setStatus("idle");
                  setForm({ from_name: "", email: "", subject: "", message: "" });
                  submitTimeRef.current = Date.now();
                }}
                className="mt-4 text-teal-300 underline text-sm"
              >
                Send another?
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              <input ref={honeypotRef} type="text" name="website" tabIndex={-1} autoComplete="off" style={{ display: "none" }} />

              <Field label="Name" error={errors.from_name}>
                <input
                  type="text"
                  value={form.from_name}
                  onChange={(e) => handleChange("from_name", e.target.value)}
                  placeholder="Your Name"
                  maxLength={100}
                  className={inputClass(errors.from_name)}
                />
              </Field>

              <Field label="Your Email" error={errors.email}>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="you@example.com"
                  maxLength={200}
                  className={inputClass(errors.email)}
                />
              </Field>

              <Field label="Subject" error={errors.subject}>
                <input
                  type="text"
                  value={form.subject}
                  onChange={(e) => handleChange("subject", e.target.value)}
                  placeholder="Project Inquiry"
                  maxLength={150}
                  className={inputClass(errors.subject)}
                />
              </Field>

              <Field label="Message" error={errors.message}>
                <textarea
                  value={form.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  placeholder="What's on your mind?"
                  rows={6}
                  maxLength={2000}
                  className={`${inputClass(errors.message)} resize-none`}
                />
                <p className="text-white/20 text-xs text-right mt-1">{form.message.length}/2000</p>
              </Field>

              {status === "error" && (
                <p className="text-red-400 text-sm text-center">
                  Something went wrong. Email me directly at{" "}
                  <a href="mailto:shogo.a.hardy@gmail.com" className="underline">shogo.a.hardy@gmail.com</a>
                </p>
              )}

              <button
                onClick={handleSubmit}
                disabled={status === "sending"}
                className="w-full py-3 rounded-xl bg-teal-400 text-[#0b1f1e] font-semibold hover:bg-teal-300 transition-colors shadow-lg shadow-teal-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "sending" ? "Sending..." : "Send Message"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ label, error, children }) {
  return (
    <div>
      <label className="text-white/50 text-xs uppercase tracking-widest font-mono mb-2 block">{label}</label>
      {children}
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  );
}

function inputClass(error) {
  return `w-full bg-white/5 border ${error ? "border-red-400/50" : "border-white/10"} rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-teal-500/50 transition-colors`;
}