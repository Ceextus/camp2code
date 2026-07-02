"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { siteConfig } from "@/config/site";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const SKILL_TRACKS = [
  { value: "frontend", label: "// FRONTEND" },
  { value: "backend", label: "// BACKEND" },
  { value: "design", label: "// DESIGN" },
  { value: "data", label: "// DATA" },
  { value: "mobile", label: "// MOBILE" },
  { value: "web3", label: "// WEB3" },
];

export default function RegisterForm() {
  const rootRef = useRef(null);
  const cardRef = useRef(null);
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (reduce) {
        gsap.set(cardRef.current, { opacity: 1, y: 0, scale: 1 });
        gsap.set(".register-field", { opacity: 1, y: 0 });
        return;
      }

      // Card entrance
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 40, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out", delay: 0.15 }
      );

      // Form fields stagger
      gsap.fromTo(
        ".register-field",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.06,
          ease: "power2.out",
          delay: 0.4,
        }
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const toggleTrack = (value) => {
    setSelectedTracks((prev) => {
      if (prev.includes(value)) {
        return prev.filter((v) => v !== value);
      }
      if (prev.length < 2) {
        return [...prev, value];
      }
      // Shake the chip if at max
      const chipEl = document.querySelector(`[data-chip="${value}"]`);
      if (chipEl) {
        gsap.fromTo(
          chipEl,
          { x: -3 },
          { x: 0, duration: 0.4, ease: "elastic.out(1, 0.3)" }
        );
      }
      return prev;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Open the WhatsApp tab *synchronously*, while we still have the user's
    // click gesture — otherwise the popup blocker kills a window.open() that
    // runs after the `await` below. We point it at the URL once it's built.
    const waWindow = window.open("", "_blank");

    const formData = new FormData(e.target);
    const payload = {
      fullName: formData.get("fullName"),
      age: formData.get("age"),
      phone: formData.get("phone"),
      email: formData.get("email") || "",
      location: formData.get("location") || "",
      selectedTracks: selectedTracks.join(", "),
    };

    // Fire-and-forget POST to API (registration proceeds even if this fails)
    try {
      await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch {
      // Redirect to WhatsApp regardless
    }

    // Build WhatsApp message
    const message = [
      `🚀 *New Camp2Code Registration*`,
      ``,
      `*Name:* ${payload.fullName}`,
      `*Age:* ${payload.age}`,
      `*Phone:* ${payload.phone}`,
      payload.email ? `*Email:* ${payload.email}` : null,
      payload.location ? `*Location:* ${payload.location}` : null,
      payload.selectedTracks
        ? `*Tracks:* ${payload.selectedTracks}`
        : null,
    ]
      .filter(Boolean)
      .join("\n");

    const whatsappUrl = buildWhatsAppUrl(siteConfig.whatsappNumber, message);

    if (waWindow) {
      // Pre-opened tab survived the blocker — send it to WhatsApp.
      waWindow.location.href = whatsappUrl;
    } else {
      // Blocked (or unsupported) — fall back to navigating this tab.
      window.location.href = whatsappUrl;
    }

    setIsSubmitting(false);
  };

  return (
    <section
      ref={rootRef}
      className="relative w-full min-h-[calc(100vh-80px)] flex items-center justify-center py-xxl px-margin-mobile md:px-lg overflow-hidden"
      style={{
        backgroundImage: "url('/empower.jpg')",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark overlay with dynamic glassmorphism blur */}
      <div className="absolute inset-0 bg-[#050716]/80 backdrop-blur-[3px] pointer-events-none" />

      {/* Form Card */}
      <div
        ref={cardRef}
        className="w-full max-w-2xl bg-surface-container-lowest/95 rounded-2xl p-xl md:p-12 border border-white/10 paper-shadow relative overflow-hidden z-10"
      >
        {/* Top accent bar */}
        <div className="absolute top-0 left-0 w-full h-1 bg-primary" />

        {/* Header */}
        <div className="register-field mb-xl">
          <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-background tracking-tight mb-md">
            Join Camp2Code
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant ">
            Reserve your spot for the next cohort. Fill out the details below,
            and we&apos;ll finalize your registration via WhatsApp.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-xl">
          {/* Personal Details */}
          <div className="space-y-lg">
            {/* Name + Age row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
              <div className="register-field flex flex-col">
                <label
                  htmlFor="fullName"
                  className="font-label-mono text-label-mono text-on-surface-variant mb-xs"
                >
                  Full Name <span className="text-primary">*</span>
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  placeholder="e.g. Jane Doe"
                  className="input-editorial font-body-md text-body-md w-full transition-colors focus:outline-none"
                />
              </div>
              <div className="register-field flex flex-col">
                <label
                  htmlFor="age"
                  className="font-label-mono text-label-mono text-on-surface-variant mb-xs"
                >
                  Age <span className="text-primary">*</span>
                </label>
                <input
                  id="age"
                  name="age"
                  type="number"
                  required
                  min="8"
                  max="99"
                  placeholder="e.g. 14"
                  className="input-editorial font-body-md text-body-md w-full transition-colors focus:outline-none"
                />
              </div>
            </div>

            {/* Phone + Email row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
              <div className="register-field flex flex-col">
                <label
                  htmlFor="phone"
                  className="font-label-mono text-label-mono text-on-surface-variant mb-xs"
                >
                  WhatsApp Number <span className="text-primary">*</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  placeholder="+234..."
                  className="input-editorial font-body-md text-body-md w-full transition-colors focus:outline-none"
                />
              </div>
              <div className="register-field flex flex-col">
                <label
                  htmlFor="email"
                  className="font-label-mono text-label-mono text-on-surface-variant mb-xs"
                >
                  Email{" "}
                  <span className="text-on-surface-variant/50 text-xs">
                    (Optional)
                  </span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="jane@example.com"
                  className="input-editorial font-body-md text-body-md w-full transition-colors focus:outline-none"
                />
              </div>
            </div>

            {/* Location */}
            <div className="register-field flex flex-col">
              <label
                htmlFor="location"
                className="font-label-mono text-label-mono text-on-surface-variant mb-xs"
              >
                Location in Abuja{" "}
                <span className="text-on-surface-variant/50 text-xs">
                  (Optional)
                </span>
              </label>
              <input
                id="location"
                name="location"
                type="text"
                placeholder="e.g. Garki, Wuse"
                className="input-editorial font-body-md text-body-md w-full transition-colors focus:outline-none"
              />
            </div>
          </div>

          {/* Skill Tracks */}
          <div className="register-field">
            <label className="font-label-mono text-label-mono text-on-surface-variant block mb-md">
              Interested Tracks{" "}
              <span className="text-on-surface-variant/50 text-xs">
                (Select up to 2)
              </span>
            </label>
            <div className="flex flex-wrap gap-sm">
              {SKILL_TRACKS.map(({ value, label }) => {
                const isSelected = selectedTracks.includes(value);
                return (
                  <button
                    key={value}
                    type="button"
                    data-chip={value}
                    onClick={() => toggleTrack(value)}
                    className={`px-md py-sm rounded-full font-label-mono text-label-mono transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? "bg-coral-primary/10 text-coral-primary border border-coral-primary"
                        : "bg-transparent text-on-surface-variant border border-surface-container-highest hover:border-outline-variant"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit Section */}
          <div className="register-field pt-md border-t border-surface-container-high flex flex-col items-start gap-md">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-coral-primary hover:bg-coral-primary-dark text-white font-body-md text-body-md font-semibold py-md px-lg rounded-lg transition-all duration-300 w-full md:w-auto flex items-center justify-center gap-sm group hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-coral-primary/20"
            >
              {isSubmitting ? "Registering..." : "Register & Continue on WhatsApp"}
              <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </button>
            <p className="font-body-md text-body-md text-sm text-on-surface-variant flex items-center gap-xs">
              <span className="material-symbols-outlined text-[16px]">
                lock
              </span>
              Your details are secure. We respect your privacy.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
