"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function MembersHero() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (reduce) {
        gsap.set("[data-animate]", { opacity: 1, y: 0 });
        gsap.set(".members-hero-title-line", { yPercent: 0 });
        return;
      }

      gsap.set("[data-animate]", { opacity: 0, y: 20 });
      gsap.set(".members-hero-title-line", { yPercent: 105 });

      const tl = gsap.timeline({
        defaults: { duration: 0.8, ease: "power3.out" },
        delay: 0.15,
      });

      tl.to(".members-hero-badge", { opacity: 1, y: 0 })
        .to(
          ".members-hero-title-line",
          { yPercent: 0, duration: 0.8, stagger: 0.1, ease: "power4.out" },
          "-=0.6"
        )
        .to(".members-hero-copy", { opacity: 1, y: 0 }, "-=0.6");
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="pt-xxl pb-xl px-margin-mobile md:px-lg max-w-container-max mx-auto"
    >
      <div className="max-w-3xl">
        <div
          data-animate
          className="members-hero-badge inline-flex items-center space-x-2 bg-coral-primary/10 rounded-full px-4 py-1.5 mb-8 w-max"
        >
          <span className="font-label-mono text-label-mono text-coral-primary font-bold uppercase tracking-wider">
            {"// LEADERSHIP"}
          </span>
        </div>

        <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface mb-6 leading-tight">
          <span className="block overflow-hidden pb-1">
            <span className="members-hero-title-line block">
              Meet the minds behind
            </span>
          </span>
          <span className="block overflow-hidden pb-1">
            <span className="members-hero-title-line block">
              Abuja&apos;s next generation.
            </span>
          </span>
        </h1>

        <p
          data-animate
          className="members-hero-copy font-body-lg text-body-lg text-on-surface-variant max-w-2xl"
        >
          Our board and mentors are seasoned professionals bridging the gap
          between world-class tech education and local talent development. We are
          designers, engineers, and educators committed to your growth.
        </p>
      </div>
    </section>
  );
}
