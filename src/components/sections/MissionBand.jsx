"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function MissionBand() {
  const rootRef = useRef(null);
  const dotGridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (reduce) {
        gsap.set(".mission-quote-icon", { scale: 1, rotate: 0, opacity: 1 });
        gsap.set(".mission-line", { yPercent: 0 });
        return;
      }

      // 1. Dot-grid parallax effect
      if (dotGridRef.current) {
        gsap.fromTo(
          dotGridRef.current,
          { y: -40 },
          {
            y: 40,
            ease: "none",
            scrollTrigger: {
              trigger: rootRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }

      // 2. Quote icon pop-bounce
      gsap.fromTo(
        ".mission-quote-icon",
        { scale: 0, rotate: -20, opacity: 0 },
        {
          scale: 1,
          rotate: 0,
          opacity: 1,
          duration: 0.8,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 75%",
            toggleActions: "play none none none"
          },
        }
      );

      // 3. Masked text lines reveal
      gsap.fromTo(
        ".mission-line",
        { yPercent: 105 },
        {
          yPercent: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 70%",
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
      className="py-xxl px-margin-mobile md:px-lg relative overflow-hidden"
      style={{
        backgroundImage: "url('/empower.jpg')",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark overlay for text contrast */}
      <div className="absolute inset-0 bg-indigo-dark/20" />
      {/* Parallax Dot Grid */}
      <div
        ref={dotGridRef}
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="max-w-container-max mx-auto relative z-10 text-center">
        <span
          className="mission-quote-icon material-symbols-outlined text-coral-primary text-5xl mb-6 inline-block"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          format_quote
        </span>
        
        <h2 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-white max-w-4xl mx-auto leading-tight md:leading-tight">
          <span className="block overflow-hidden py-1">
            <span className="mission-line block">Empowering the next generation</span>
          </span>
          <span className="block overflow-hidden py-1">
            <span className="mission-line block">of Abuja developers to build</span>
          </span>
          <span className="block overflow-hidden py-1">
            <span className="mission-line block">global solutions.</span>
          </span>
        </h2>
      </div>
    </section>
  );
}
