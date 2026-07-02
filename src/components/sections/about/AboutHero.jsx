"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutHero() {
  const rootRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (reduce) {
        gsap.set("[data-animate]", { opacity: 1, y: 0 });
        gsap.set(".about-hero-title-line", { yPercent: 0 });
        gsap.set(imageRef.current, { opacity: 1, scale: 1 });
        return;
      }

      // Initial states
      gsap.set("[data-animate]", { opacity: 0, y: 20 });
      gsap.set(".about-hero-title-line", { yPercent: 105 });
      gsap.set(imageRef.current, { opacity: 0, scale: 1.08 });

      // Entrance timeline
      const tl = gsap.timeline({
        defaults: { duration: 0.8, ease: "power3.out" },
        delay: 0.15,
      });

      tl.to(".about-hero-badge", { opacity: 1, y: 0 })
        .to(
          ".about-hero-title-line",
          { yPercent: 0, duration: 0.8, stagger: 0.1, ease: "power4.out" },
          "-=0.6"
        )
        .to(".about-hero-copy", { opacity: 1, y: 0 }, "-=0.6")
        .to(
          imageRef.current,
          { opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" },
          "-=0.8"
        );

      // Subtle parallax on the hero image
      gsap.to(imageRef.current, {
        yPercent: 8,
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
        <div className="md:col-span-8 md:col-start-1 flex flex-col justify-center">
          <div
            data-animate
            className="about-hero-badge inline-flex items-center space-x-2 bg-coral-primary/10 rounded-full px-4 py-1.5 mb-8 w-max"
          >
            <span className="font-label-mono text-label-mono text-coral-primary font-bold uppercase tracking-wider">
              {"// OUR MISSION"}
            </span>
          </div>

          <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface mb-6 leading-tight">
            <span className="block overflow-hidden pb-1">
              <span className="about-hero-title-line block">
                From Technology
              </span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span className="about-hero-title-line block">
                Consumption to Creation.
              </span>
            </span>
          </h1>

          <p
            data-animate
            className="about-hero-copy font-body-lg text-body-lg text-on-surface-variant max-w-2xl"
          >
            We believe in empowering the next generation of Abuja developers.
            We&apos;re shifting the paradigm from passively consuming technology
            to actively building the future.
          </p>
        </div>

        {/* Visual column */}
        <div className="md:col-span-4 mt-lg md:mt-0">
          <div
            ref={imageRef}
            className="relative w-full min-h-[300px] md:min-h-[380px] rounded-2xl overflow-hidden paper-shadow"
          >
            <Image
              src="/about-hero.jpg"
              alt="Diverse young students intensely focused on coding at laptops in a bright, modern classroom"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
