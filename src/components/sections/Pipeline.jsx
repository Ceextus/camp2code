"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    n: "1",
    title: "Register",
    body: "Sign up for the upcoming cohort. We'll evaluate your current skill level to place you in the appropriate track.",
  },
  {
    n: "2",
    title: "Join the WhatsApp Group",
    body: "Connect instantly with mentors and peers. This is your primary hub for announcements, quick questions, and community building.",
  },
  {
    n: "3",
    title: "Learn & Build",
    body: "Dive into the curriculum, attend live sessions, and start contributing to real-world projects immediately.",
    last: true,
  },
];

export default function Pipeline() {
  const rootRef = useRef(null);
  const lineFillRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (reduce) {
        gsap.set(".pipeline-intro", { opacity: 1, x: 0 });
        gsap.set(".pipeline-badge", { scale: 1 });
        gsap.set(".pipeline-step-content", { opacity: 1, x: 0 });
        gsap.set(lineFillRef.current, { scaleY: 1 });
        return;
      }

      // Intro column reveal
      gsap.from(".pipeline-intro", {
        opacity: 0,
        x: -30,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        },
      });

      // Connector line scroll-drawing (scrubbed)
      if (lineFillRef.current) {
        gsap.fromTo(
          lineFillRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: ".pipeline-track",
              start: "top 62%",
              end: "bottom 78%",
              scrub: true,
            },
          }
        );
      }

      // Badge zoom-pop stagger
      gsap.fromTo(
        ".pipeline-badge",
        { scale: 0 },
        {
          scale: 1,
          duration: 0.5,
          stagger: 0.12,
          ease: "back.out(1.6)",
          scrollTrigger: {
            trigger: ".pipeline-track",
            start: "top 65%",
            toggleActions: "play none none none"
          },
        }
      );

      // Text stagger slide-in
      gsap.fromTo(
        ".pipeline-step-content",
        { opacity: 0, x: 25 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".pipeline-track",
            start: "top 65%",
            toggleActions: "play none none none"
          },
        }
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="py-xxl px-margin-mobile md:px-lg max-w-container-max mx-auto border-t border-outline-variant/10 overflow-hidden"
    >
      <div className="grid grid-cols-4 md:grid-cols-12 gap-gutter">
        {/* Intro */}
        <div className="pipeline-intro col-span-4 md:col-span-4 flex flex-col justify-center mb-10 md:mb-0">
          <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-indigo-dark mb-4">
            The Pipeline.
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-8">
            A streamlined process designed to get you building and collaborating
            as quickly as possible.
          </p>
          <div className="hidden md:block w-16 h-1.5 bg-coral-primary rounded-full" />
        </div>

        {/* Steps track */}
        <div className="pipeline-track col-span-4 md:col-span-7 md:col-start-6 relative">
          {/* Background guide track line */}
          <div className="absolute left-4 top-4 bottom-4 w-[2px] bg-[#E7E6E0] -translate-x-[1px] pointer-events-none" />
          
          {/* Scroll-drawn filling line */}
          <div
            ref={lineFillRef}
            className="absolute left-4 top-4 bottom-4 w-[2px] bg-coral-primary -translate-x-[1px] origin-top scale-y-0 pointer-events-none"
          />

          {STEPS.map(({ n, title, body, last }) => (
            <div
              key={n}
              className="pipeline-step relative pl-12 md:pl-16 pb-12 last:pb-0"
            >
              {/* Badge */}
              <div
                className={`pipeline-badge absolute w-8 h-8 rounded-full left-0 top-0 flex items-center justify-center font-label-mono text-label-mono font-bold z-10 transition-all duration-300 shadow-sm ${
                  last
                    ? "bg-coral-primary text-white"
                    : "bg-white border-2 border-coral-primary text-coral-primary"
                }`}
              >
                {n}
              </div>

              {/* Text content */}
              <div className="pipeline-step-content">
                <h3 className="font-stat-lg text-stat-lg text-indigo-dark mb-2 -mt-1">
                  {title}
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  {body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
