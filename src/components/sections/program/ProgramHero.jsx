"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ProgramHero() {
  const rootRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (reduce) {
        gsap.set("[data-animate]", { opacity: 1, y: 0 });
        gsap.set(".program-hero-title-line", { yPercent: 0 });
        gsap.set(imageRef.current, { opacity: 1, scale: 1 });
        return;
      }

      gsap.set("[data-animate]", { opacity: 0, y: 20 });
      gsap.set(".program-hero-title-line", { yPercent: 105 });
      gsap.set(imageRef.current, { opacity: 0, scale: 1.06 });

      const tl = gsap.timeline({
        defaults: { duration: 0.8, ease: "power3.out" },
        delay: 0.15,
      });

      tl.to(".program-hero-badge", { opacity: 1, y: 0 })
        .to(
          ".program-hero-title-line",
          { yPercent: 0, duration: 0.8, stagger: 0.1, ease: "power4.out" },
          "-=0.6"
        )
        .to(".program-hero-copy", { opacity: 1, y: 0 }, "-=0.6")
        .to(".program-hero-cta", { opacity: 1, y: 0 }, "-=0.5")
        .to(
          imageRef.current,
          { opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" },
          "-=0.8"
        );

      // Subtle parallax on the hero image
      gsap.to(imageRef.current, {
        yPercent: 6,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="pt-xxl pb-xxl px-margin-mobile md:px-lg max-w-container-max mx-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">
        {/* Copy column */}
        <div className="md:col-span-7 flex flex-col gap-lg">
          <div
            data-animate
            className="program-hero-badge inline-flex items-center space-x-2 bg-coral-primary/10 rounded-full px-4 py-1.5 w-max"
          >
            <span className="font-label-mono text-label-mono text-coral-primary font-bold uppercase tracking-wider">
              {"// THE CURRICULUM"}
            </span>
          </div>

          <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-indigo-dark leading-tight">
            <span className="block overflow-hidden pb-1">
              <span className="program-hero-title-line block">
                Architecting the Next
              </span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span className="program-hero-title-line block">
                Generation of Builders
              </span>
            </span>
          </h1>

          <p
            data-animate
            className="program-hero-copy font-body-lg text-body-lg text-on-surface-variant max-w-2xl"
          >
            Our program is designed not just to teach syntax, but to engineer
            problem-solving mindsets. We bridge the gap between academic theory
            and high-stakes startup reality across six specialized tracks.
          </p>

          <div data-animate className="program-hero-cta pt-2">
            <Link
              href="/register"
              className="inline-block bg-coral-primary text-white font-label-mono text-label-mono px-xl py-4 rounded-lg hover:bg-coral-primary-dark transition-all duration-300 font-semibold shadow-lg shadow-coral-primary/20 hover:scale-[1.02] active:scale-[0.97]"
            >
              Register for Cohort
            </Link>
          </div>
        </div>

        {/* Visual column */}
        <div className="md:col-span-5 mt-xl md:mt-0 relative">
          <div
            ref={imageRef}
            className="w-full aspect-square rounded-xl overflow-hidden paper-shadow relative bg-surface-variant"
          >
            <Image
              src="/program-hero.jpg"
              alt="Overhead view of diverse tech students collaborating around a table with laptops and notebooks"
              fill
              className="object-cover mix-blend-multiply opacity-90"
              sizes="(max-width: 768px) 100vw, 40vw"
              priority
            />
          </div>
          {/* Floating stat badge */}
          <div className="absolute -bottom-6 -left-6 bg-white p-lg rounded-xl paper-shadow w-56 z-10">
            <div className="font-stat-lg text-stat-lg text-coral-primary mb-1">
              6 Tracks
            </div>
            <div className="font-label-mono text-label-mono text-on-surface-variant">
              Comprehensive Pathways
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
