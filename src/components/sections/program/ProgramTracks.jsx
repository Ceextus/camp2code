"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TRACKS = [
  {
    name: "Web Engineering",
    icon: "code",
    iconFill: true,
    description:
      "Master the modern web stack. From responsive frontend architectures using React to robust backend systems with Node.js and scalable database design.",
    bullets: [
      "Full-stack application deployment",
      "API design and integration",
    ],
    tags: ["// REACT", "// NODE.JS", "// POSTGRES"],
    span: "md:col-span-8",
    variant: "light",
  },
  {
    name: "Mobile",
    icon: "smartphone",
    description:
      "Build native-quality applications for iOS and Android using modern cross-platform frameworks. Focus on performance and fluid UX.",
    bullets: ["State management", "Offline-first architecture"],
    tags: [],
    span: "md:col-span-4",
    variant: "dark",
  },
  {
    name: "Game Dev",
    icon: "videogame_asset",
    description:
      "Create immersive experiences. Learn physics, rendering pipelines, and game logic using industry-standard engines.",
    bullets: [],
    tags: ["// UNITY", "// C#"],
    span: "md:col-span-4",
    variant: "light",
  },
  {
    name: "Product",
    icon: "design_services",
    iconFill: true,
    description:
      "Master UI/UX principles, user research, and wireframing. Design interfaces that are intuitive and visually compelling.",
    bullets: [],
    tags: ["// FIGMA", "// UX LABS"],
    span: "md:col-span-4",
    variant: "accent",
  },
  {
    name: "Business",
    icon: "trending_up",
    description:
      "The essential non-technical skills: project management, agile methodologies, and leadership in tech environments.",
    bullets: [],
    tags: ["// AGILE", "// LEADERSHIP"],
    span: "md:col-span-4",
    variant: "light",
  },
];

function TrackCard({ name, icon, iconFill, description, bullets, tags, span, variant }) {
  const isDark = variant === "dark";
  const isAccent = variant === "accent";

  return (
    <div
      className={`track-card ${span} rounded-xl p-xl paper-shadow transition-all duration-300 flex flex-col justify-between ${
        isDark
          ? "bg-indigo-dark text-white"
          : "bg-white border border-outline-variant/20 hover:shadow-lg hover:-translate-y-1"
      } ${isAccent ? "border-t-4 border-t-coral-primary" : ""}`}
    >
      <div>
        {/* Icon + title */}
        <div className="flex items-center space-x-4 mb-lg">
          <span
            className={`material-symbols-outlined text-[40px] ${
              isDark ? "text-white" : "text-coral-primary"
            }`}
            style={iconFill ? { fontVariationSettings: "'FILL' 1" } : undefined}
          >
            {icon}
          </span>
          <h3
            className={`font-headline-md text-headline-md ${
              isDark ? "text-white" : "text-indigo-dark"
            }`}
          >
            {name}
          </h3>
        </div>

        {/* Description */}
        <p
          className={`font-body-md text-body-md mb-lg max-w-2xl ${
            isDark ? "text-surface-variant" : "text-on-surface-variant"
          }`}
        >
          {description}
        </p>

        {/* Bullet points */}
        {bullets.length > 0 && (
          <ul
            className={`space-y-2 mb-lg font-body-md text-body-md ${
              isDark ? "text-white" : "text-indigo-dark"
            }`}
          >
            {bullets.map((b) => (
              <li key={b} className="flex items-start">
                <span
                  className={`material-symbols-outlined mr-2 text-[20px] ${
                    isDark ? "text-[#8ddc11]" : "text-coral-primary"
                  }`}
                >
                  check
                </span>
                {b}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-auto">
          {tags.map((t) => (
            <span
              key={t}
              className={`px-3 py-1 rounded-full font-label-mono text-[12px] ${
                isDark
                  ? "bg-white/10 text-white/80"
                  : "bg-coral-primary/10 text-coral-primary"
              }`}
            >
              {t}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProgramTracks() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (reduce) {
        gsap.set(".track-card", { opacity: 1, y: 0 });
        gsap.set(".tracks-heading", { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        ".tracks-heading",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        ".track-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        }
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="py-xxl px-margin-mobile md:px-lg bg-surface-container-low"
    >
      <div className="max-w-container-max mx-auto">
        {/* Section header */}
        <div className="tracks-heading mb-xl">
          <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-indigo-dark mb-2">
            Specialized Tracks
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant ">
            Choose your focus. Each track is designed with industry-leading
            outcomes, combining rigorous technical instruction with practical
            project execution.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter auto-rows-[minmax(280px,auto)]">
          {TRACKS.map((track) => (
            <TrackCard key={track.name} {...track} />
          ))}
        </div>
      </div>
    </section>
  );
}
