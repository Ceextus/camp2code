"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MEMBERS = [
  {
    name: "Aisha Bello",
    role: "Founder & Lead Instructor",
    bio: "Former senior engineer at top-tier tech firms, Aisha returned to Abuja to build a curriculum that emphasizes practical, scalable software engineering over theory.",
    image: "/member-aisha.jpg",
  },
  {
    name: "David Okafor",
    role: "Head of Design Systems",
    bio: "David brings a decade of experience crafting editorial minimalism and intuitive user experiences, translating complex SaaS patterns into approachable learning modules.",
    image: "/member-david.jpg",
    offsetTop: true,
  },
  {
    name: "Nneka Uzo",
    role: "Community & Operations",
    bio: "Ensuring our learning environment remains rigorous yet supportive, Nneka manages the daily rhythms of Camp2Code and fosters our growing alumni network.",
    image: "/member-nneka.jpg",
  },
];

export default function MembersGrid() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (reduce) {
        gsap.set(".member-card", { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        ".member-card",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 80%",
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
      className="pb-xxl px-margin-mobile md:px-lg max-w-container-max mx-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
        {MEMBERS.map(({ name, role, bio, image, offsetTop }) => (
          <div
            key={name}
            className={`member-card col-span-1 md:col-span-4 bg-surface-container-lowest rounded-xl p-md paper-shadow flex flex-col h-full border border-outline-variant/30 ${
              offsetTop ? "mt-0 lg:mt-xl" : ""
            }`}
          >
            {/* Portrait */}
            <div className="w-full aspect-square rounded-lg overflow-hidden mb-md relative bg-surface-variant">
              <Image
                src={image}
                alt={`Portrait of ${name}`}
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>

            {/* Info */}
            <div className="flex-grow">
              <h3 className="font-headline-md text-headline-md text-on-surface mb-1">
                {name}
              </h3>
              <p className="font-label-mono text-label-mono text-coral-primary mb-md">
                {role}
              </p>
              <p className="font-body-md text-body-md text-on-surface-variant line-clamp-3">
                {bio}
              </p>
            </div>

            {/* Footer link */}
            <div className="mt-lg pt-md border-t-2 border-outline-variant/30 flex gap-md">
              <span className="material-symbols-outlined text-on-surface-variant hover:text-coral-primary transition-colors cursor-pointer">
                open_in_new
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
